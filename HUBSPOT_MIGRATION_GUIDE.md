# CuraMedix HubSpot Migration Guide

## Overview
This guide provides step-by-step instructions for migrating the CuraMedix website to your HubSpot account.

## Prerequisites
- HubSpot account with CMS Hub Professional or Enterprise
- Access to Design Manager in HubSpot
- FTP access or HubSpot CLI tools (optional but recommended)

## Migration Steps

### Step 1: Upload Assets to HubSpot

1. **Navigate to Marketing > Files and Templates > Design Tools**
2. **Create folder structure:**
   ```
   /curamedix/
   ├── assets/
   │   ├── images/
   │   ├── css/
   │   └── js/
   ├── modules/
   └── templates/
   ```

3. **Upload image files to `/curamedix/assets/images/`:**
   - logo.jpg
   - image2.png
   - image3.png
   - image4.png
   - image5.png
   - Untitled design (15).png
   - Untitled design (16).png
   - Untitled design (17).png
   - All SVG icon files

4. **Upload CSS file:**
   - Upload `hubspot-assets/curamedix-styles.css` to `/curamedix/assets/css/`

5. **Upload JavaScript file:**
   - Upload `hubspot-assets/curamedix-scripts.js` to `/curamedix/assets/js/`

### Step 2: Create Custom Modules

1. **In Design Manager, create new modules:**
   
   a. **Hero Section Module**
      - Name: `curamedix_hero_section`
      - Copy content from `hubspot-modules/hero-section.module.html`
      - Configure fields using `hero-section.module.json` as reference
   
   b. **Section 179 Tax Module**
      - Name: `curamedix_section_179`
      - Copy content from `hubspot-modules/section-179-tax.module.html`
   
   c. **Booking Form Module**
      - Name: `curamedix_booking_form`
      - Copy content from `hubspot-modules/booking-form.module.html`

### Step 3: Create Page Template

1. **In Design Manager, create new template:**
   - Name: `CuraMedix Landing Page`
   - Type: Page template
   - Copy content from `hubspot-templates/main-template.html`

2. **Configure template settings:**
   - Enable drag-and-drop areas
   - Set responsive breakpoints
   - Link CSS and JS files

### Step 4: Create HubSpot Form

1. **Navigate to Marketing > Lead Capture > Forms**
2. **Create new form with these fields:**
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Phone (required)
   - Organization (required)
   - Specialty (dropdown - required)
   - Primary Interest (dropdown - required)
   - Additional Information (textarea - optional)
   - Newsletter Opt-in (checkbox)

3. **Copy the Form ID** for use in the Booking Form module

### Step 5: Configure Page Settings

1. **Create new landing page:**
   - Navigate to Marketing > Website > Website Pages
   - Create new page using "CuraMedix Landing Page" template

2. **Page settings:**
   - Page Title: "Shockwave Therapy Equipment | Save 100% with Section 179 | CuraMedix"
   - Meta Description: "FDA-approved shockwave therapy equipment with 95% success rate. Write off 100% with Section 179 tax deduction. Get instant ROI analysis. Limited time offer."
   - URL: `/shockwave-therapy-equipment` (or your preferred URL)

### Step 6: Add Content Modules

1. **Drag and drop modules into the page:**
   - Hero Section
   - Urgency Banner
   - Trust Section
   - Solutions Section
   - Technology Section
   - Results Section
   - Section 179 Tax Benefits
   - ROI Calculator CTA
   - Testimonials
   - About Section
   - Final CTA
   - Footer

2. **Configure each module** with the appropriate content from the original site

### Step 7: HubSpot-Specific Configuration

1. **Set up tracking:**
   - Enable HubSpot analytics
   - Configure conversion tracking for form submissions
   - Set up goal tracking for CTA clicks

2. **Configure forms integration:**
   - Link form submissions to HubSpot CRM
   - Set up automated email responses
   - Configure lead scoring rules

3. **Set up workflows (optional):**
   - Create automated email sequence for form submissions
   - Set up internal notifications for sales team
   - Configure lead assignment rules

### Step 8: Testing Checklist

- [ ] All images load correctly
- [ ] Fonts display properly (Rubik font family)
- [ ] Mobile responsiveness works
- [ ] Forms submit to HubSpot CRM
- [ ] CTAs track clicks
- [ ] Smooth scrolling works
- [ ] Modal popup functions correctly
- [ ] Countdown timer displays
- [ ] All links work
- [ ] Page loads quickly

### Step 9: Launch

1. **Pre-launch:**
   - Review all content for accuracy
   - Test on multiple devices and browsers
   - Set up 301 redirects if replacing existing page
   - Configure SSL certificate

2. **Launch:**
   - Publish the page
   - Submit to search engines
   - Monitor initial traffic and conversions

3. **Post-launch:**
   - Monitor page performance
   - Review form submission data
   - A/B test different elements
   - Optimize based on analytics

## Important Notes

### HubSpot Form Integration
Replace the fallback form in the Booking Form module with your actual HubSpot form ID:
```javascript
portalId: "YOUR_PORTAL_ID",
formId: "YOUR_FORM_ID"
```

### Custom Domain
If using a custom domain, configure it in:
Settings > Website > Domains & URLs

### Performance Optimization
- Use HubSpot's built-in CDN for images
- Enable browser caching
- Minify CSS and JavaScript files
- Use HubSpot's lazy loading for images

### SEO Considerations
- Set up proper URL structure
- Configure canonical URLs
- Submit XML sitemap to search engines
- Set up schema markup for medical equipment

## Support Resources

- [HubSpot CMS Documentation](https://developers.hubspot.com/docs/cms)
- [HubSpot Academy - CMS Hub](https://academy.hubspot.com/courses/cms-hub-implementation)
- [HubSpot Community](https://community.hubspot.com/)

## File Structure Created

```
/curamedix/
├── hubspot-templates/
│   └── main-template.html
├── hubspot-modules/
│   ├── hero-section.module.html
│   ├── hero-section.module.json
│   ├── section-179-tax.module.html
│   └── booking-form.module.html
├── hubspot-assets/
│   ├── curamedix-styles.css
│   └── curamedix-scripts.js
└── HUBSPOT_MIGRATION_GUIDE.md
```

## Next Steps

1. Review all created files
2. Customize module fields as needed
3. Test thoroughly before going live
4. Set up HubSpot reporting dashboards
5. Train team on HubSpot CMS usage

For questions or assistance, consult HubSpot support or documentation.