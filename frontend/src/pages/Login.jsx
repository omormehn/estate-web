import { Card, Input, Button, Typography } from "@material-tailwind/react";
import "./register.css";

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { api } from "../utils/api";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/user/auth/login", {
        email,
        password,
      });
     updateUser(response.data);
      toast.success("Logged in Successfully.");
      navigate("/");
    } catch (error) {
      console.log("error in register", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container flex justify-center items-center pt-28 overflow-x-hidden">
      <Card color="transparent" shadow={true} className=" min-w-72 py-3 ">
        <div className="px-6">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome Back! <br /> Enter your details to login.
          </Typography>
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
                className="input border-2 rounded-md px-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-5">
                Password
              </Typography>
              <Input
                type="password"
                name="password"
                size="lg"
                placeholder="********"
                className="input border-2 rounded-md px-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="text-center">
              <Button
                disabled={loading}
                type="submit"
                className="mt-6 px-20 pt-2 text-slate-700 "
              >
                {loading ? (
                  <div className="flexCenter justify-center container ">
                    <PuffLoader
                      color={"#123abc"}
                      size={43}
                      radius={1}
                      aria-label="puff-loading"
                    />
                  </div>
                ) : (
                  <h3> Sign in</h3>
                )}
              </Button>
            </div>
            <div className="mt-4">
              {error && <span className="mt-4 text-red-800">Login Failed</span>}
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
