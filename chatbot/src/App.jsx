import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import mongoose from "mongoose";
import "./App.css";
import Hero from "./components/Hero/Hero";
import SignupForm from "./components/0Auth/signup";
import DashBoard from "./components/dashboard/dashboard";
import Login from "./components/0Auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
    errorElement: <div>Page found but lost</div>,
  },
  {
    path: "/:type/:param",
    element: <Hero />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);
function App() {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled((perv) => !perv);
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <div className="bg-gradient-to-bl from-gray-950 via-60% via-gray-900 to-gray-950">
    //     <Chatbot isStyled={isToggled} />
    //     <NavBar onToggleStyle={handleToggle} />
    //     <Routes>
    //       <Route path="/" element={<Hero />} />
    //       <Route path="/:type/:param" element={<Hero />} />
    //     </Routes>
    //     <ProfileCarousel />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
