# Visual Product Matcher - Testing Guide

## ✅ Application Status

Your Visual Product Matcher application is now fully configured and ready for testing!

### Current Configuration:
- ✅ **Database**: Supabase with 50 sample products
- ✅ **Environment**: .env configured with correct credentials
- ✅ **Build**: Production build completed in `/dist`
- ✅ **Server**: Preview server running at http://localhost:4174/
- ✅ **Seed Script**: `npm run seed` available for database management

## 🧪 Manual Testing Checklist

### 1. Basic Application Load Test
- [ ] Open http://localhost:4174/ in your browser
- [ ] Verify the page loads without errors
- [ ] Check that the header shows "Visual Product Matcher"
- [ ] Confirm the "How It Works" section is visible

### 2. Image Upload Component Test
- [ ] Click "Upload File" button
- [ ] Verify file picker opens
- [ ] Test uploading a valid image file (JPG, PNG)
- [ ] Test uploading an invalid file type (should show error)
- [ ] Switch to "Image URL" mode
- [ ] Enter a valid image URL and test loading
- [ ] Enter an invalid URL and verify error handling

### 3. Database Integration Test
- [ ] Upload any image to trigger a search
- [ ] Verify that products load from database (should see loading spinner)
- [ ] Check that search results display products
- [ ] Verify product information displays correctly (name, price, category)

### 4. Visual Matching Algorithm Test
- [ ] Upload a shoe image and verify shoe products appear first
- [ ] Upload a clothing image and check clothing results
- [ ] Test similarity scores (should be 0-100%)
- [ ] Verify results are sorted by similarity (highest first)

### 5. Search Results & Filtering Test
- [ ] Check that search results show your uploaded image
- [ ] Test similarity filter slider (0-100%)
- [ ] Test category filter dropdown
- [ ] Verify "New Search" button resets the application
- [ ] Test "Reset Filters" when no results match

### 6. Error Handling Test
- [ ] Test with no internet connection (should handle gracefully)
- [ ] Upload very large image files
- [ ] Test with corrupted image files
- [ ] Verify error messages are user-friendly

### 7. UI/UX Test
- [ ] Test responsive design on different screen sizes
- [ ] Verify loading states and animations
- [ ] Check hover effects on product cards
- [ ] Test keyboard navigation
- [ ] Verify accessibility (alt text, focus states)

## 🔧 Troubleshooting

### If products don't load:
1. Check browser console for errors
2. Verify .env file has correct Supabase credentials
3. Run `npm run seed` to ensure database has products
4. Check network tab for failed API calls

### If image analysis fails:
1. Verify image URLs are accessible
2. Check browser console for CORS errors
3. Test with different image formats

### If build fails:
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check for TypeScript errors: `npm run typecheck`
3. Verify all dependencies are installed

## 🚀 Deployment Testing

### Vercel Deployment Test:
```bash
npm install -g vercel
cd project
vercel --prod
```

### Netlify Deployment Test:
```bash
npm install -g netlify-cli
cd project
netlify deploy --prod --dir=dist
```

## 📊 Expected Test Results

### Success Criteria:
- [ ] Application loads without console errors
- [ ] Image upload works for both files and URLs
- [ ] Database queries return products
- [ ] Visual matching produces relevant results
- [ ] Filters work correctly
- [ ] UI is responsive and user-friendly
- [ ] Error states are handled gracefully

### Performance Benchmarks:
- Image upload: < 5 seconds
- Database query: < 2 seconds
- Image analysis: < 10 seconds for 50 products
- Page load: < 3 seconds

## 🐛 Known Issues & Solutions

1. **CORS Issues**: Ensure image URLs allow cross-origin requests
2. **Large Images**: Consider adding image compression
3. **Slow Analysis**: Algorithm could be optimized for production
4. **Memory Usage**: Large product catalogs may need pagination

## 📞 Support

If you encounter issues during testing:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Test with the seed script: `npm run seed`
4. Check Supabase dashboard for database status
