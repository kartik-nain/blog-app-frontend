import { useEffect, useState } from "react";
import { ListAParticularBlogApi, setFavoriteApi } from "../api/ApiService";
import { useLocation } from "react-router-dom";
import hollowheart from "/src/assets/hollow-heart.svg";
import filledheart from "/src/assets/filled-heart.svg";

interface Blog {
  author: string;
  category: string;
  title: string;
  content: string;
  favorite: boolean;
}

const Blogpost = () => {
  const location = useLocation();
  const { blogId } = location.state;
  const [blog, setBlog] = useState<Blog>({
    author: "",
    category: "",
    title: "",
    content: "",
    favorite: false,
  });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    ListAParticularBlogApi(blogId)
      .then((res) => {
        setBlog(res.data[0]);
        setIsFavorite(res.data[0].favorite);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogId, isFavorite]);

  const toggleFavorite = () => {
    setFavoriteApi(blogId)
      .then((res) => {
        setIsFavorite(res.data.favorite);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
        <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  className="w-10 mr-5"
                  src="/src/assets/woman.png"
                  alt=""></img>
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.author}
                  </a>
                  <p className="">
                    <span className="bg-primary-100  text-primary-800 text-xs font-medium items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                      {blog.category}
                    </span>
                  </p>
                  <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                </div>
              </div>
              <img
                className="w-5 h-5 cursor-pointer mb-4"
                src={isFavorite ? filledheart : hollowheart}
                alt="Favorite"
                onClick={toggleFavorite}
              />
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {blog.title}
            </h1>
          </header>
          <p className="lead">{blog.content}</p>
        </article>
      </div>
    </main>
  );
};

export default Blogpost;
