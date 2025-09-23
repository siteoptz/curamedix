import { HubspotProvider } from 'next-hubspot';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HubspotProvider>
      <Component {...pageProps} />
    </HubspotProvider>
  );
}

export default MyApp;

