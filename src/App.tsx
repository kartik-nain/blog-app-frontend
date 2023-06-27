import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { Outlet } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Header />
      {token === null && <LandingPage />}
      <Outlet />
    </>
  );
}

export default App;
