import Header from "./components/Header";
// import './App.css'
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header className="top-0 left-0 w-full bg-gray-800 text-white p-4">
        <div className="container mx-auto px-4">
          <Header />
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default App;
