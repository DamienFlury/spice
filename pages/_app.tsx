import "../styles/styles.css";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";
import AppBar from "../components/AppBar";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AppBar />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
