import { useNavigate } from "react-router-dom";

const MustBeLoggedin = () => {
  const navigate = useNavigate();
  return (
    <>
      <h3>You Must Be Logged in to View this page</h3>
      <a href="#" onClick={() => navigate("/login")} className="text-blue-600">
        Click below to login
      </a>
    </>
  );
};

export default MustBeLoggedin;
