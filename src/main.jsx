import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home.jsx";
// import MainVideoPage from "./components/videodetailpage/MainVideoPage.jsx";
import appStore from "./store/appStore.js";
import { Provider } from "react-redux";
import SignPage from "./components/sign-signup/SignPage.jsx";
import ChannelPage from "./components/chanel/ChanelPage.jsx";
import CreateChannel from "./components/chanel/CreateChanel.jsx";
import VideoForm from "./components/chanel/VideoForm.jsx";
import EditVideoForm from "./components/chanel/EditVideoForm.jsx";
import ErrorComponent from "./components/errorPage/ErrorComponent.jsx";

import { lazy, Suspense } from "react";
import MainShimmer from "./components/videodetailpage/MainShimmer.jsx";
const MainVideoPage = lazy(() =>
  import("./components/videodetailpage/MainVideoPage.jsx")
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/video/:videoID",
        element: (
          <Suspense fallback={<MainShimmer />}>
            <MainVideoPage />
          </Suspense>
        ),
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
      {
        path: "/video/upload",
        element: <VideoForm />,
      },
      {
        path: "/video/update/:id",
        element: <EditVideoForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
