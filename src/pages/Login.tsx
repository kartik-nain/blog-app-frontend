import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "../security/AuthContext";
import { useState } from "react";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const auth = useAuth() as AuthContextType;

  async function handleSubmit(values: FormValues) {
    if (await auth.login(values.username, values.password)) {
      console.log(values.password);
      const usrname = values.username;
      navigate(`/home`);
    } else {
      setFailMessage(true);
    }
  }

  const [failMessage, setFailMessage] = useState<boolean>(false);

  function validate(values: FormValues) {
    let errors: Partial<FormValues> = {};
    if (!values.username) {
      errors.username = "Please enter a username";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  })

  return (
              <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your username
                          </label>
                          <input
                            type="email"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="name@company.com"
                            {...formik.getFieldProps("username")}
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...formik.getFieldProps("password")}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="remember"
                                aria-describedby="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="text-gray-500 dark:text-gray-300">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Sign in
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet?{" "}
                          <a
                            href="#"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Sign up
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
  );
};

export default Login;