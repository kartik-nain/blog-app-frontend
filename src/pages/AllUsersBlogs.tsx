import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { ListAllBlogsApi, ListUserBlogApi } from "../api/ApiService";
import { useAuth } from "../security/AuthContext";

type BlogType = {
  author: string;
  category: string;
  content: string;
  creationDate: Date;
  title: string;
  userId: string;
  __v: number;
  _id: string;
  favorite: boolean;
  toggleFavorite: (blogId: string) => void;
};

const AllUsersBlogs = () => {
  const [blogsList, setBlogsList] = useState<BlogType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("forYou");
  const [activeCategory, setActiveCategory] = useState<string>("");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  function shuffle(blogs: BlogType[]) {
    let i = blogs.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = blogs[i];
      blogs[i] = blogs[j];
      blogs[j] = temp;
    }
    return blogs;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let blogs: BlogType[] = [];
        if (activeTab === "forYou") {
          const response = await ListAllBlogsApi();
          blogs = shuffle(response.data);
        } else if (activeTab === "byYou") {
          const response = await ListUserBlogApi();
          if (response.data.message) {
            blogs = [];
          } else {
            blogs = shuffle(response.data);
          }
        } else {
          console.log("Invalid Entry");
        }
        setBlogsList(blogs);
      } catch (error) {
        console.log(error);
        setBlogsList([]);
      }
    };

    fetchData();
  }, [activeTab]);

  const AuthContext = useAuth();
  AuthContext.getUserId();

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="flex flex-wrap">
          {/* Main Article */}
          <div className="w-full md:w-2/3 px-4 mb-8 md:mb-0 order-last md:order-first">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
              {/* Replace with your main article content */}
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Main Article
              </h2>

              {/* Add more main article content as needed */}
              {/* Tabs */}
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "forYou"
                      ? "text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                  onClick={() => handleTabChange("forYou")}
                >
                  For You
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "byYou"
                      ? "text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}
                  onClick={() => handleTabChange("byYou")}
                >
                  By You
                </button>
              </div>

              {/* Content */}
              {activeTab === "forYou" && (
                <div>
                  {/* Render content for "For You" tab */}
                  {blogsList
                    .filter(
                      (blog) =>
                        blog.category === activeCategory || activeCategory === ""
                    )
                    .map((blog) => (
                      <Blog
                        {...blog}
                        key={blog._id}
                      />
                    ))}
                  {/* Add your content here */}
                </div>
              )}
              {activeTab === "byYou" && (
                <div>
                  {blogsList
                    .filter(
                      (blog) =>
                        blog.category === activeCategory || activeCategory === ""
                    )
                    .map((blog) => (
                      <Blog
                        {...blog}
                        key={blog._id}
                      />
                    ))}
                  {/* Add your content here */}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3 px-4 order-first md:order-last">
            <div className="sticky top-16">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                {/* Replace with your sidebar content */}
                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                  Categories
                </h2>
                {[
                  ...new Set(blogsList.map((blog) => blog.category.toLowerCase())),
                ].map((category) => (
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      activeCategory === category
                        ? "text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 my-2 lg:py-2.5 capitalize dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 mr-2"
                        : "bg-gray-200 m-1 text-gray-800 dark:bg-gray-800 dark:text-gray-200 mr-2 capitalize"
                    }`}
                    onClick={() => handleCategoryChange(category)}
                    key={category} // Add a unique key for each button
                  >
                    {category}
                  </button>
                ))}
                {/* Add more sidebar content as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          {/* Replace with your footer content */}
          <p>&copy; 2023 Medium. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AllUsersBlogs;
