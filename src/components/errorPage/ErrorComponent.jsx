import { useNavigate, useRouteError } from "react-router";
import Header from "../header/Header";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error("Route Error:", error);

  const getMessage = () => {
    if (typeof error === "string") return error;
    if (error?.message) return error.message;
    if (error?.statusText) return error.statusText;
    return "Something went wrong!";
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-700 mb-6">{getMessage()}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorComponent;
