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

const ISidebar = () => {
  const navigate = useNavigate();

  const schools = () => {
    navigate("../admin/schools");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("school_admin_id");
    navigate("/");
  };

  const schoolOverview = () => {
    navigate("/school");
  };
  const classes = () => {
    navigate("/school/classes");
  };
  const courses = () => {
    navigate("/school/courses");
  };
  const academicCalendar = () => {
    navigate("/school/calendar");
  };
  const profile = () => {
    navigate("/school/profile");
  };

  return (
    <aside className="w-56 bg-[#34486B] text-white font-archivo h-screen fixed">
      <div className="flex bg-[#EAEFFB] items-center justify-center flex-col mt-10">
        <div
          className={`bg-[#34486B] p-4 ${
            window.location.pathname === "/school" ? "rounded-br-lg" : ""
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
            className={`w-56 justify-start p-6 rounded-none text-sm bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/schools/overview"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/school/classes"
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
              window.location.pathname === "/school/overview"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/school/courses"
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
              window.location.pathname === "/school/classes"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/school/calendar"
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
              window.location.pathname === "/school/calendar"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/school/courses"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname === "/school/profile"
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
              window.location.pathname === "/school/profile"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/school/calendar"
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
              window.location.pathname === "/school/logout"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/school/profile"
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

export default ISidebar;
