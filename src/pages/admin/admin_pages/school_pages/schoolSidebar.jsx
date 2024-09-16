import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  User,
  BookOpen,
  Calendar,
  ArrowLeft,
  GraduationCap,
  LogOut,
} from "lucide-react";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SchoolSidebar = () => {
  const navigate = useNavigate();

  const schools = () => {
    navigate("../admin/schools");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  const schoolOverview = () => {
    navigate("/admin/schools/overview");
  };
  const classes = () => {
    navigate("/admin/schools/classes");
  };
  const courses = () => {
    navigate("/admin/schools/courses");
  };
  const academicCalendar = () => {
    navigate("/admin/schools/calendar");
  };
  const profile = () => {
    navigate("/admin/schools/profile");
  };

  return (
    <aside className="w-56 bg-[#34486B] text-white font-archivo h-screen fixed">
      <div className="flex bg-[#EAEFFB] items-center justify-center flex-col mt-10">
        <div
          className={`bg-[#34486B] p-4 ${
            window.location.pathname === "/admin/schools/overview"
              ? "rounded-br-lg"
              : ""
          }`}
        >
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full cursor-pointer mb-6"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex-grow w-full">
          <Button
            className="w-56 justify-start p-6 rounded-none text-sm bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out"
            onClick={() => navigate("/admin/schools")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Dashboard
          </Button>
          <Button
            className={`w-56 justify-start p-6 rounded-none text-sm bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/overview"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/classes"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={schoolOverview}
          >
            <Home className="mr-2 h-5 w-5" />
            Overview
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/classes"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/overview"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/admin/schools/courses"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={classes}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Classes
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/courses"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/classes"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/admin/schools/calendar"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={courses}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Programs
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/calendar"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/courses"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/admin/schools/profile"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={academicCalendar}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Academic Calendar
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/profile"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/calendar"
                ? "rounded-tr-lg"
                : ""
            }`}
            onClick={profile}
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start p-6 text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/logout"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools/profile"
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

export default SchoolSidebar;
