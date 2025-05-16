import React, { useState } from "react";
// import { updateLogin } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/userSlice";
import { useNavigate } from "react-router";
import { addChannel } from "../../slices/channelSlice";
import toast, { Toaster } from "react-hot-toast";
function SignPage() {
  const [isLog, setIsLog] = useState(true);
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
  const notify = (x) => toast(x);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    post(user);
  };

  const handlechange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function post(data) {
    try {
      const res = await fetch(
        `http://localhost:3000/${isLog ? "signup" : "signin"}`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );

      // handle the response here
      const userdata = await res.json();
      if (userdata?.token) {
        dispatch(addUser(userdata));
        sessionStorage.setItem("user", JSON.stringify(userdata));
        navigate("/");
      }
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
      if (userdata?.state) {
        notify("Sign-Up sucessfully");
        setIsLog(false);
        dispatch(addUser(userdata));
        const { username, password } = userdata?.newUser;
        setUser({ username });
      }
    } catch (error) {
      // handle error here
      console.log("error", error.message);
    }
  }

  // once login remove this sign form show a logo at header
  return (
    <div className="flex justify-center items-center min-h-screen  mt-20">
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
