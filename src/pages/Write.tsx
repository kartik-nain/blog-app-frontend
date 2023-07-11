import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PostBlog } from "../api/ApiService";

interface BlogType {
  title: string;
  content: string;
  category: string;
}

const Write = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: BlogType) => {
    PostBlog(values.title, values.content, values.category)
      .then(() => navigate("/home"))
      .catch((error) => console.log(error));
  };

  const initialValues = {
    title: "",
    content: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required."),
    content: Yup.string().required("Content is required."),
    category: Yup.string().required("Please select a category."),
  });

  return (
    <>
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Unleash your blog's potential and make your voice heard.
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form>
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                <div className="sm:col-span-2">
                  <Field
                    type="text"
                    name="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Title"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="sm:col-span-4">
                  <Field
                    as="select"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="">Select Category</option>
                    <option value="sport">Sport</option>
                    <option value="food">Food</option>
                    <option value="education">Education</option>
                    <option value="science">Science</option>
                    <option value="tech">Tech</option>
                    <option value="travel">Travel</option>
                    <option value="entertainment">Entertainment</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="sm:col-span-6">
                  <Field
                    as="textarea"
                    name="content"
                    className="h-96 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=" Enter Content"></Field>
                  <ErrorMessage
                    name="content"
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700">
                Post
              </button>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Write;
