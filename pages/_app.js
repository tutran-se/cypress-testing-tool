import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <main className="mx-auto flex h-screen justify-center items-center">
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
