import React, { useState } from "react";
// import { updateLogin } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/userSlice";
import { useNavigate } from "react-router";
import { addChannel } from "../../slices/channelSlice";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../../URL.js";
function SignPage() {
  // Toggle between signup (true) and signin (false) modes
  const [isLog, setIsLog] = useState(true);

  // Dynamic state initialization based on current mode (signup or signin)
  // For signup: initialize with all required fields
  // For signin: only username and password are needed
  const [user, setUser] = useState(() =>
    isLog
      ? {
          username: "",
          email: "",
          avatar: "",
          password: "",
        }
      : { username: "", password: "" }
  );

  // Toast notification helper function
  const notify = (x) => toast(x);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form submission handler
  const handleClick = (e) => {
    e.preventDefault();
    post(user);
  };

  // Handle form input changes by updating specific field while preserving other data
  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle API communication for both signup and signin
  async function post(data) {
    try {
      // Dynamic endpoint selection based on current mode (signup/signin)
      const res = await fetch(`${URL}/${isLog ? "signup" : "signin"}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      // Process API response and handle different success scenarios
      const userdata = await res.json();

      // Case 1: User successfully authenticated with token
      // Save user data to Redux and session storage, then redirect to home
      if (userdata?.token) {
        dispatch(addUser(userdata));
        sessionStorage.setItem("user", JSON.stringify(userdata));
        navigate("/");
      }

      // Case 2: New user with channel was created
      // Save channel data to Redux and session storage
      // Note: The duplicate dispatch call appears intentional for redundancy
      if (userdata?.newuser?.channel) {
        dispatch(
          addChannel({
            newChannel: userdata?.newuser?.channel,
            channelState: true,
          })
        );
        sessionStorage.setItem(
          "channel",
          JSON.stringify({
            newChannel: userdata.newuser.channel,
            channelState: true,
          })
        );
        dispatch(
          addChannel({
            newChannel: userdata.newuser.channel,
            channelState: true,
          })
        );
        navigate("/");
      }

      // Case 3: Successful signup but needs to proceed to signin
      // Switch to signin mode and pre-fill username from signup
      if (userdata?.state) {
        notify("Sign-Up sucessfully");
        setIsLog(false);
        dispatch(addUser(userdata));
        const { username, password } = userdata?.newUser;
        setUser({ username, password: "" });
      }

      // Case 4: Error message from server
      if (!userdata.sucess) {
        notify(userdata.message);
      }
    } catch (error) {
      // Handle any network or unexpected errors
      notify(error);
      // console.log("error", error.message);
    }
  }

  // Render different form fields based on current mode (signup/signin)
  return (
    <div className="flex justify-center items-center min-h-screen  mt-20">
      {/* Toast notification configuration */}
      <Toaster
        toastOptions={{
          duration: 2000,
          removeDelay: 1000,
          style: {
            fontWeight: "bold",
            background: "white",
            color: "black",
          },
        }}
      />
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {isLog ? "Create Account" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-8">
          {/* Conditional rendering based on isLog state */}
          {isLog ? (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Avatar URL
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="avatar"
                    id="avatar"
                    value={user.avatar}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleClick}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => handlechange(e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleClick}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* Toggle between signup and signin modes */}
          <div className="mt-6 flex items-center justify-center">
            <div className="text-sm">
              <span className="text-gray-500">
                {isLog ? "Already have an account?" : "Don't have an account?"}
              </span>{" "}
              <button
                onClick={() => setIsLog(!isLog)}
                className="font-medium text-red-600 hover:text-red-500 ml-1"
              >
                {isLog ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignPage;
