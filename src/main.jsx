import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home.jsx";
import ErrorComponent from "./components/errorPage/ErrorComponent.jsx";
import appStore from "./store/appStore.js";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import MainShimmer from "./components/videodetailpage/MainShimmer.jsx";

// Lazy-loaded routes
const MainVideoPage = lazy(() =>
  import("./components/videodetailpage/MainVideoPage.jsx")
);
const SignPage = lazy(() => import("./components/sign-signup/SignPage.jsx"));
const ChannelPage = lazy(() => import("./components/chanel/ChanelPage.jsx"));
const CreateChannel = lazy(() =>
  import("./components/chanel/CreateChanel.jsx")
);
const VideoForm = lazy(() => import("./components/chanel/VideoForm.jsx"));
const EditVideoForm = lazy(() =>
  import("./components/chanel/EditVideoForm.jsx")
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
        element: (
          <Suspense>
            <SignPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/:id",
        element: (
          <Suspense>
            <ChannelPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/create",
        element: (
          <Suspense>
            <CreateChannel />
          </Suspense>
        ),
      },
      {
        path: "/video/upload",
        element: (
          <Suspense>
            <VideoForm />
          </Suspense>
        ),
      },
      {
        path: "/video/update/:id",
        element: (
          <Suspense>
            <EditVideoForm />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
