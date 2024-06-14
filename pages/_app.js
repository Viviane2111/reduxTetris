import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"; 
import tetrisReducer from "../reducers/tetrisReducer";
const store = configureStore({
  reducer: { tetris: tetrisReducer.reducer }, //!
});
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="./tetrisbtn.png" sizes="12x12" type="image/png" />
        <title>Next Tetris</title>
        <meta
          name="description"
          content="A simple Tetris game built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
