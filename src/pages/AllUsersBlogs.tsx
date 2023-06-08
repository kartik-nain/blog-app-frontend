import { useEffect, useState } from "react";
import Blog from "../components/Blog";
import { ListAllBlogsApi } from "../api/ApiService";
import Header from '../components/Header'

const AllUsersBlogs = () => {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    ListAllBlogsApi()
      .then((res) => {
        setBlogsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [activeTab, setActiveTab] = useState("forYou");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const list = blogsList.length === 0 ? console.log("Empty list") : blogsList.map(b => (<Blog {...b}/>))

  return (
    // <div className="w-9/12 flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    //     <div className="w-full flex-grow pt-1 px-3 grid gap-8 lg:grid-rows">
    //     {blogsList.map(b => (<Blog {...b}/>))}
    //     </div>
    // </div>
    <div className="bg-gray-100">

  {/* Main Content */}
  <div className="container mx-auto px-4 py-8 mt-8">
    <div className="flex flex-wrap">
      {/* Main Article */}
      <div className="w-full md:w-2/3 px-4 mb-8 md:mb-0 order-last md:order-first">
        <div className="bg-white shadow-lg rounded-lg p-4">
          {/* Replace with your main article content */}
          <h2 className="text-2xl font-bold mb-4">Main Article</h2>
          
          {/* Add more main article content as needed */}
          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "forYou"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("forYou")}
            >
              For You
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "following"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabChange("following")}
            >
              Following
            </button>
          </div>

          {/* Content */}
          {activeTab === "forYou" && (
            <div>
              {/* Render content for "For You" tab */}
              {blogsList.map((b) => (
                <Blog {...b} />
              ))}
              {/* Add your content here */}
            </div>
          )}
          {activeTab === "following" && (
            <div>
              {/* Render content for "Following" tab */}
              <h3>Following Content</h3>
              {/* Add your content here */}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-1/3 px-4 order-first md:order-last">
        <div className="sticky top-16">
          <div className="bg-white shadow-lg rounded-lg p-4">
            {/* Replace with your sidebar content */}
            <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
            <p>Some sidebar content goes here.</p>
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
