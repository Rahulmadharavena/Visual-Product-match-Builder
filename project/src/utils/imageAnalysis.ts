export interface ColorHistogram {
  red: number[];
  green: number[];
  blue: number[];
}

export interface ImageFeatures {
  dominantColors: string[];
  colorHistogram: ColorHistogram;
  brightness: number;
  contrast: number;
}

export async function extractImageFeatures(imageUrl: string): Promise<ImageFeatures> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        const size = 100;
        canvas.width = size;
        canvas.height = size;

        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        const colorCounts: { [key: string]: number } = {};
        let totalBrightness = 0;
        const redHist = new Array(256).fill(0);
        const greenHist = new Array(256).fill(0);
        const blueHist = new Array(256).fill(0);

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          redHist[r]++;
          greenHist[g]++;
          blueHist[b]++;

          const brightness = (r + g + b) / 3;
          totalBrightness += brightness;

          const colorKey = `${Math.floor(r / 51)},${Math.floor(g / 51)},${Math.floor(b / 51)}`;
          colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
        }

        const sortedColors = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([color]) => {
            const [r, g, b] = color.split(',').map(n => parseInt(n) * 51);
            return `rgb(${r},${g},${b})`;
          });

        const avgBrightness = totalBrightness / (data.length / 4);

        let varianceSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          varianceSum += Math.pow(brightness - avgBrightness, 2);
        }
        const contrast = Math.sqrt(varianceSum / (data.length / 4));

        resolve({
          dominantColors: sortedColors,
          colorHistogram: {
            red: redHist,
            green: greenHist,
            blue: blueHist
          },
          brightness: avgBrightness,
          contrast: contrast
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}

export function calculateSimilarity(features1: ImageFeatures, features2: ImageFeatures): number {
  const histSimilarity = compareHistograms(features1.colorHistogram, features2.colorHistogram);
  const brightnessSimilarity = 1 - Math.abs(features1.brightness - features2.brightness) / 255;
  const contrastSimilarity = 1 - Math.abs(features1.contrast - features2.contrast) / 100;

  return (histSimilarity * 0.7 + brightnessSimilarity * 0.15 + contrastSimilarity * 0.15) * 100;
}

function compareHistograms(hist1: ColorHistogram, hist2: ColorHistogram): number {
  const redSim = compareChannelHistogram(hist1.red, hist2.red);
  const greenSim = compareChannelHistogram(hist1.green, hist2.green);
  const blueSim = compareChannelHistogram(hist1.blue, hist2.blue);

  return (redSim + greenSim + blueSim) / 3;
}

function compareChannelHistogram(hist1: number[], hist2: number[]): number {
  let sum = 0;
  let totalSum1 = hist1.reduce((a, b) => a + b, 0);
  let totalSum2 = hist2.reduce((a, b) => a + b, 0);

  for (let i = 0; i < hist1.length; i++) {
    const norm1 = hist1[i] / totalSum1;
    const norm2 = hist2[i] / totalSum2;
    sum += Math.min(norm1, norm2);
  }

  return sum;
}
