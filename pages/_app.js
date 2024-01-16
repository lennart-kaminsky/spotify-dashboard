import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }
  return response.json();
};

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />;
      </SWRConfig>
    </SessionProvider>
  );
}
