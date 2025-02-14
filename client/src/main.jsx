import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./components/context/Context.jsx";
import VideoData from "./components/context/VideoInfo.jsx";
import CircleLoading from "./components/loading/CircleLoading.jsx";


createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Context>
        <VideoData>
          <App />
        </VideoData>
      </Context>
    </BrowserRouter>
  </>
);
