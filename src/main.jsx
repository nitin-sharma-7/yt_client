import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home.jsx";
import MainVideoPage from "./components/videodetailpage/MainVideoPage.jsx";
import appStore from "./store/appStore.js";
import { Provider } from "react-redux";
import SignPage from "./components/sign-signup/SignPage.jsx";
import ChannelPage from "./components/chanel/ChanelPage.jsx";
import CreateChannel from "./components/chanel/CreateChanel.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/video/:videoID",
        element: <MainVideoPage />,
      },
      {
        path: "/sign",
        element: <SignPage />,
      },
      {
        path: "/channel/:id",
        element: <ChannelPage />,
      },
      {
        path: "/channel/create",
        element: <CreateChannel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
