/* eslint-disable no-unused-vars */
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import "./register.css";

import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { api } from "../utils/api";
import AuthContext from "../context/AuthContext";

import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "./../utils/firebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const topRef = useRef(null);
  const { updateUser, currentUser } = useContext(AuthContext);
  const location = useLocation();

  const auth = getAuth();
  const from = location.state?.from || "/";

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      // await signInWithRedirect(auth, googleProvider);
      const user = result.user;
      // After redirection
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        console.log(user);
      }

      console.log(result);
      const response = await api.post("/auth/social-login", {
        id: user.uid,
        email: user.email,
        username: user.displayName,
        image: user.photoURL,
      });
      console.log(response);
      updateUser(response.data);
      console.log(user.photoURL);
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  // useEffect(() => {
  //   handleGoogleLogin();
  // }, [])

  useEffect(() => {
    topRef.current && topRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      updateUser(response.data);
      toast.success("Logged in Successfully.");
      navigate(from, { replace: true });
    } catch (error) {
      console.log("error in login", error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    await api.post("/auth/logout");
    updateUser(null);
    toast.success("Logged out Successfully.");
    navigate("/login");
  };

  return (
    <section
      ref={topRef}
      className="container flex justify-center items-center pt-28 overflow-x-hidden"
    >
      <Card color="transparent" shadow={true} className=" min-w-72 py-3 ">
        <div className="px-6">
          {currentUser ? (
            <div className="">
              <Typography variant="h5" color="blue-gray">
                You are already logged in as {currentUser.user?.username}
              </Typography>
              <button
                onClick={handleLogout}
                color="black"
                className="py-1 px-2 text-sm rounded-md bg-gray-400 font-"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Welcome Back! <br /> Enter your details to login.
              </Typography>
            </div>
          )}

          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 mt-8 border-blue-gray-200 items-center justify-center gap-2"
            fullWidth
            onClick={handleGoogleLogin}
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            SIGN IN WITH GOOGLE
          </Button>
          <form onSubmit={handleSubmit} className="mt-8 mb-2  max-w-screen-lg ">
            <div className="mb-1 flex flex-col gap-6 ">
              <Typography variant="h6" color="blue-gray" className="-mb-5">
                Email
              </Typography>
              <Input
                size="lg"
                name="email"
                type="email"
                placeholder="Enter Email"
                className={`input border-2 rounded-md px-2 !border-t-blue-gray-200 focus:!border-t-gray-900`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-5">
                Password
              </Typography>
              <Input
                security="password"
                autoComplete="current-password"
                type="password"
                name="password"
                size="lg"
                placeholder="********"
                className={`input border-2 rounded-md px-2 !border-t-blue-gray-200 focus:!border-t-gray-900`}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div>
                {error && <span className="mt-4 text-red-800">{error}</span>}
              </div>
              <a className="" href="/">
                Forgot Password?
              </a>
            </div>

            <div className="text-center">
              <Button
                disabled={loading}
                type="submit"
                className="mt-6 px-28 pt-2 py-4 bg-primary  text-slate-700 "
              >
                {loading ? (
                  <div className="flexCenter justify-center container ">
                    <PuffLoader
                      color={"#123abc"}
                      size={20}
                      radius={0}
                      aria-label="puff-loading"
                    />
                  </div>
                ) : (
                  <p className="text-base"> Sign in</p>
                )}
              </Button>
            </div>

            <Typography color="gray" className="mt-4 py-2 font-normal">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Login;
