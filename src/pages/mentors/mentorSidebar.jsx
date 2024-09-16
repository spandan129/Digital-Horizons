import React from "react";
import { Button } from "@/components/ui/button";
import { Home, School, NotebookText, UserRoundPen, LogOut } from "lucide-react";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const MentorSidebar = () => {
  const navigate = useNavigate();

  const mentorDashboard = () => {
    navigate("/mentor/dashboard");
  };

  const schools = () => {
    navigate("/mentor/school");
  };

  const journals = () => {
    navigate("/mentor/journals");
  };

  const profile = () => {
    navigate("/mentor/profile");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  return (
    <aside className="w-56 bg-[#34486B] text-white font-archivo h-screen fixed">
      <div className="flex bg-[#EAEFFB] items-center justify-center flex-col mt-10">
        <div className="bg-[#34486B] p-4">
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full cursor-pointer mb-6"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex-grow w-full">
          <Button
            className={`w-56 justify-start p-6 rounded-none text-sm bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/mentor/dashboard"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/mentor/school"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={mentorDashboard}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/mentor/school")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/mentor/dashboard"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/mentor/journals"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={schools}
          >
            <School className="mr-2 h-5 w-5" />
            Schools
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/mentor/journals")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/mentor/school"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/mentor/profile"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={journals}
          >
            <NotebookText className="mr-2 h-5 w-5" />
            Journal
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/mentor/profile")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/mentor/journals"
                ? "rounded-tr-lg"
                : ""
            }`}
            onClick={profile}
          >
            <UserRoundPen className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start p-6 text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/mentor/logout"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/mentor/profile"
                ? "rounded-tr-lg"
                : ""
            }`}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </aside>
  );
};

export default MentorSidebar;
