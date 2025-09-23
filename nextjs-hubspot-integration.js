// Example: Integrating HubSpot forms into Next.js
import { HubspotProvider } from 'next-hubspot';
import { useHubspotForm } from 'next-hubspot';

// Wrap your app with HubspotProvider
const MyApp = ({ Component, pageProps }) => (
  <HubspotProvider>
    <Component {...pageProps} />
  </HubspotProvider>
);

// Component to embed HubSpot form
const HubspotForm = () => {
  const { isFormCreated, isError, error } = useHubspotForm({
    portalId: 'YOUR_PORTAL_ID', // Replace with your HubSpot portal ID
    formId: 'YOUR_FORM_ID',     // Replace with your HubSpot form ID
    target: '#hubspot-form-wrapper',
  });

  if (isError) {
    console.error('HubSpot form error:', error);
  }

  return (
    <div className="hubspot-form-container">
      <h3>Book Your Consultation</h3>
      <div id="hubspot-form-wrapper" />
    </div>
  );
};

export default HubspotForm;

