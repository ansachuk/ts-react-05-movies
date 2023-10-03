import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter basename="ts-react-05-movies">
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
