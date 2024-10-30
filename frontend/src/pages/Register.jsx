import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import './register.css';

const Register = () => {
  return (
    <section className="container flex justify-center items-center pt-28 overflow-x-hidden">
      <Card color="transparent" shadow={true} className=" min-w-72 py-3 ">
        <div className="px-6">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! <br /> Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2  max-w-screen-lg ">
            <div className="mb-1 flex flex-col gap-6 ">
              <Typography variant="h6" color="blue-gray" className="-mb-5">
                Name
              </Typography>
              <Input
                size="lg"
                placeholder="Enter Name"
                className="input border-2 rounded-md px-2 !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-5">
                Email
              </Typography>
              <Input
                size="lg"
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
                size="lg"
                placeholder="********"
                className="input border-2 rounded-md px-2  !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="text-center">
              <Button className="mt-6 px-20 pt-2 text-slate-700 ">
                Sign up
              </Button>
            </div>
            <Typography color="gray" className="mt-4 py-2 font-normal">
              Already have an account? {" "}
              <a href="#" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Register;
