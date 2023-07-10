import { useNavigate } from "react-router-dom";

const MustBeLoggedIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h3 className="text-2xl font-bold mb-8">
        You Must Be Logged in to View This Page
      </h3>
      <div className="flex flex-col items-center">
        <p className="mb-4">Please login to access the content.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-primary-600 text-white rounded cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default MustBeLoggedIn;
