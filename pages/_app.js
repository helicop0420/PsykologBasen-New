import "../public/assets/css/style.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { wrapper, store } from "../store/store";


function MyApp({ Component, pageProps }) {

    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp;
