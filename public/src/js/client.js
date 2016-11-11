import React from "react";
import ReactDOM from "react-dom";

import Container from "./components/Container.js";
import TestContainer from "./components/TestContainer"
import store from "./store"
import { Provider } from "react-redux"

const app = document.getElementById('app');
{/*ReactDOM.render(<Container/>, app);*/}
ReactDOM.render(<Provider store={store}>
    <Container/>
    </Provider>, app)
