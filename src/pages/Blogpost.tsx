import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListAParticularBlogApi } from "../api/ApiService";

interface Blog {
  author: string;
  category: string;
  title: string;
  content: string;
}

const Blogpost = () => {
  const [blog, setBlog] = useState<Blog>({
    author: "",
    category: "",
    title: "",
    content: "",
  });
  const params = useParams<{ userId?: string }>();

  useEffect(() => {
    if (params.userId) {
      ListAParticularBlogApi(params.userId)
        .then((res) => {
          setBlog(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.userId]);

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="mr-4 w-16 h-16 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Jese Leos"></img>
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.author}
                  </a>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400">
                    Category: {blog.category}
                  </p>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                </div>
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              Title: {blog.title}
            </h1>
          </header>
          <p className="lead">{blog.content}</p>
        </article>
      </div>
    </main>
  );
};

export default Blogpost;
