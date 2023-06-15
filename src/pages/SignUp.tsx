import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContextType, useAuth } from "../security/AuthContext";

interface FormValues {
  username: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useAuth() as AuthContextType;
  // const [failMessage, setFailMessage] = useState<boolean>(false);

  const toLogin = () => {
    navigate("/login");
  };

  // async function handleSubmit(values: FormValues) {
  //   if (await auth.signUp(values.username, values.password)) {
  //     navigate(`/profile`);
  //   } else {
  //     setFailMessage(true);
  //   }
  // }

  async function handleSubmit(values: FormValues) {
    await auth.signUp(values.username, values.password)
    navigate(`/profile`);
  }

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
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
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
                  {...formik.getFieldProps("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...formik.getFieldProps("confirmPassword")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                SignUp
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account ?{" "}
                <button
                  type="button"
                  onClick={() => toLogin()}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500">
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
