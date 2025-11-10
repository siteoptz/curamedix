# HubSpot + Next.js Integration Guide for CuraMedix

## Overview
This guide provides multiple approaches to integrate your Next.js application with HubSpot, from simple iframe embedding to advanced form integrations.

## Method 1: Iframe Embedding (Recommended for Quick Setup)

### Step 1: Deploy Your Next.js App
1. Deploy your Next.js application to Vercel, Netlify, or your preferred hosting platform
2. Note the public URL (e.g., `https://curamedix-nextjs.vercel.app`)

### Step 2: Embed in HubSpot
1. Log into your HubSpot account
2. Go to **Marketing > Website > Website Pages**
3. Create a new page or edit an existing one
4. Add an **HTML module**
5. Insert this code:

```html
<iframe 
  src="https://your-nextjs-app.vercel.app" 
  width="100%" 
  height="800px" 
  style="border:none; border-radius: 8px;"
  frameborder="0"
  allowfullscreen>
</iframe>
```

### Step 3: Configure Responsive Design
Add this CSS to your HubSpot page for better mobile experience:

```css
<style>
  .iframe-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  
  .iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    .iframe-container {
      padding-bottom: 100%; /* Square aspect ratio for mobile */
    }
  }
</style>

<div class="iframe-container">
  <iframe src="https://your-nextjs-app.vercel.app" frameborder="0" allowfullscreen></iframe>
</div>
```

## Method 2: HubSpot Forms in Next.js (Advanced)

### Step 1: Install Dependencies
```bash
npm install next-hubspot
```

### Step 2: Setup Environment Variables
Create a `.env.local` file:
```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
NEXT_PUBLIC_HUBSPOT_FORM_ID=your_form_id
```

### Step 3: Configure Your App
The files I've created show how to:
- Wrap your app with `HubspotProvider`
- Use `useHubspotForm` hook to embed forms
- Handle form errors and loading states

### Step 4: Get Your HubSpot IDs
1. **Portal ID**: Found in your HubSpot account settings
2. **Form ID**: 
   - Go to Marketing > Lead Capture > Forms
   - Click on your form
   - The ID is in the URL or form embed code

## Method 3: HubSpot CMS as Headless CMS

### Step 1: Create HubSpot API Integration
1. Go to HubSpot Settings > Integrations > Private Apps
2. Create a new private app with CMS read permissions
3. Copy the API key

### Step 2: Fetch Content in Next.js
```javascript
// pages/api/hubspot-content.js
export default async function handler(req, res) {
  const response = await fetch(`https://api.hubapi.com/cms/v3/pages`, {
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
  });
  
  const data = await response.json();
  res.json(data);
}
```

### Step 3: Use in Your Components
```javascript
// components/HubspotContent.js
import { useState, useEffect } from 'react';

export default function HubspotContent() {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    fetch('/api/hubspot-content')
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);
  
  return (
    <div>
      {content && content.results.map(page => (
        <div key={page.id}>
          <h2>{page.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: page.html_title }} />
        </div>
      ))}
    </div>
  );
}
```

## Method 4: HubSpot Tracking Integration

### Step 1: Add HubSpot Tracking Script
```javascript
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/YOUR_PORTAL_ID.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Step 2: Track Custom Events
```javascript
// utils/analytics.js
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window._hsq) {
    window._hsq.push(['trackEvent', {
      id: eventName,
      value: properties
    }]);
  }
};

// Usage in components
import { trackEvent } from '../utils/analytics';

const handleButtonClick = () => {
  trackEvent('Button Click', {
    button_name: 'Schedule Demo',
    page: 'Homepage'
  });
};
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Option 2: Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Option 3: Static Export
If you want to host on any static hosting:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

Then run: `npm run build && npm run export`

## Best Practices

### 1. SEO Considerations
- Use Next.js `Head` component for meta tags
- Implement proper structured data
- Ensure iframe content is accessible

### 2. Performance Optimization
- Use Next.js Image component for optimized images
- Implement lazy loading for iframes
- Minimize bundle size

### 3. Security
- Validate all form inputs
- Use HTTPS for all communications
- Implement proper CORS policies

### 4. Analytics
- Set up proper event tracking
- Monitor Core Web Vitals
- Track conversion funnels

## Troubleshooting

### Common Issues:

1. **Iframe not loading**: Check CORS settings and HTTPS
2. **Forms not submitting**: Verify HubSpot portal and form IDs
3. **Styling issues**: Ensure CSS is properly scoped
4. **Mobile responsiveness**: Test on various devices

### Debug Steps:
1. Check browser console for errors
2. Verify environment variables
3. Test HubSpot API endpoints
4. Validate form configurations

## Next Steps

1. Choose your preferred integration method
2. Set up your HubSpot account and get necessary IDs
3. Deploy your Next.js application
4. Test the integration thoroughly
5. Monitor performance and user engagement

## Support Resources

- [HubSpot Developer Documentation](https://developers.hubspot.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [HubSpot Forms API](https://developers.hubspot.com/docs/api/marketing/forms)















