import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "../security/AuthContext";

interface FormValues {
  emailAddress: string;
  password: string;
  confirmPassword: string;
  checkPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth() as AuthContextType;
  const [, setFailMessage] = useState<boolean>(false);

  const toLogin = () => {
    navigate("/login");
  };

  async function handleSubmit(values: FormValues) {
    if (values.password === values.confirmPassword) {
      if (await auth.signUp(values.emailAddress, values.password)) {
        navigate(`/profile`);
      } else {
        setFailMessage(true);
      }
    } else {
      setFailMessage(true);
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
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password do not match";
    }
    if (values.password.length < 8) {
      errors.checkPassword = "Password should be at least 8 characters long.";
    } else if (!/[!@#$%&*]/.test(values.password)) {
      errors.checkPassword =
        "Password should include at least one special character.";
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
      checkPassword: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" target="blank">
          <img
            style={{ width: "40%" }}
            className="mb-4 mx-auto"
            src="src/assets/logo11.png"
            alt="logo"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
              Create an account and elevate your experience!
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("emailAddress")}
                />
                {formik.errors.emailAddress && formik.touched.emailAddress && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.emailAddress}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {formik.errors.checkPassword && formik.touched.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.checkPassword}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?{" "}
                <button
                  type="button"
                  onClick={() => toLogin()}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
