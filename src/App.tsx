import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
