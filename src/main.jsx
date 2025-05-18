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

// Code splitting with lazy loading to improve initial load performance
// Components are only loaded when they're needed rather than all at once
// This reduces the initial bundle size and improves application startup time
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

// Router configuration using React Router's createBrowserRouter
// This defines the application's routing structure and component hierarchy
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root component that wraps all routes
    errorElement: <ErrorComponent />, // Global error boundary for route errors
    children: [
      // Nested routes that will render inside App's Outlet component
      {
        path: "/",
        element: <Home />, // Home page is eagerly loaded (not lazy)
      },
      {
        path: "/video/:videoID", // Dynamic route with URL parameter
        element: (
          // Suspense provides a fallback UI while the lazy component loads
          // MainShimmer is a loading placeholder specifically designed for video pages
          <Suspense fallback={<MainShimmer />}>
            <MainVideoPage />
          </Suspense>
        ),
      },
      {
        path: "/sign",
        element: (
          // React will use the nearest parent fallback or show nothing
          <Suspense>
            <SignPage />
          </Suspense>
        ),
      },
      {
        path: "/channel/:id", // Dynamic route for channel pages
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
        path: "/video/update/:id", // Dynamic route for editing videos
        element: (
          <Suspense>
            <EditVideoForm />
          </Suspense>
        ),
      },
    ],
  },
]);

// Wrapping the app with Provider gives all components access to Redux store
// RouterProvider activates the router configuration
createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
);
