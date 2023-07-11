import { useState } from "react";
import { Link } from "react-router-dom";
import hollowstar from "/src/assets/hollow-heart.svg";
import filledstar from "/src/assets/filled-heart.svg";
import { setFavoriteApi } from "../api/ApiService";

type blogType = {
  userId: string;
  title: string;
  content: string;
  category: string;
  author: string;
  _id: string;
  creationDate: Date;
  favorite: boolean;
};

const Blog = ({
  title,
  content,
  category,
  author,
  _id,
  creationDate,
  favorite,
}: blogType) => {
  let date = new Date(creationDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);

  const [isFavorite, setIsFavorite] = useState(favorite);

  const toggleFavorite = async () => {
    setFavoriteApi(_id)
      .then((res) => {
        setIsFavorite(res.data.favorite);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            {category}
          </span>
          <span className="text-sm flex items-center">
            <span className="mr-3">{formattedDate}</span>
            <img
              className="w-5 h-5 cursor-pointer"
              src={isFavorite ? filledstar : hollowstar}
              alt="Favorite"
              onClick={toggleFavorite}
            />
          </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400 line-clamp-3">
          {content}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center place-items-center space-x-2">
            <a
              href="#"
              target="blank"
              className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2 place-self-center "
                src="src/assets/man.png"
                alt="logo"
              />
            </a>
            <span className="font-medium dark:text-white">{author}</span>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
            state={{ blogId: _id }}
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </article>
      <div className="mt-4"></div>
    </>
  );
};

export default Blog;
