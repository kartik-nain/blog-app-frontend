import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "../security/AuthContext";

interface FormValues {
  emailAddress: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth() as AuthContextType;

  const [failMessage, setFailMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(values: FormValues) {
    try {
      if (await auth.login(values.emailAddress, values.password)) {
        navigate(`/home`);
      } else {
        setFailMessage(true);
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      setFailMessage(true);
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login Error:", error);
    }
  }

  function validate(values: FormValues) {
    let errors: Partial<FormValues> = {};
    if (!values.emailAddress) {
      errors.emailAddress = "Please provide an email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailAddress)) {
      errors.emailAddress = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const toSignup = () => {
    navigate("/signup");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="login" target="blank">
          <img
            style={{ width: "40%" }}
            className="mb-4 mx-auto"
            src="src/assets/logo11.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
          {failMessage && (
                <div className="text-red-500 text-center">{errorMessage}</div>
              )}
            <h1 className="font-bold text-xl leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Login and unlock a world of possibilities!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className={`${
                    formik.touched.emailAddress && formik.errors.emailAddress
                      ? "border-red-500"
                      : ""
                  } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Enter Email"
                  {...formik.getFieldProps("emailAddress")}
                />
                {formik.touched.emailAddress && formik.errors.emailAddress && (
                  <div className="text-red-500">{formik.errors.emailAddress}</div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  {...formik.getFieldProps("password")}
                  id="password"
                  placeholder="Enter Password"
                  className={`${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : ""
                  } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign In
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => toSignup()}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
