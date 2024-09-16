import React from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  School,
  Users,
  LogOut,
  Calendar,
  GraduationCap,
} from "lucide-react";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const adminDashboard = () => {
    navigate("/admin");
  };

  const homeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("schoolId");
    navigate("/");
  };

  const schools = () => {
    navigate("/admin/schools");
  };

  const mentors = () => {
    navigate("/admin/mentors");
  };

  const courses = () => {
    navigate("/admin/courses");
  };

  const events = () => {
    navigate("/admin/events");
  };

  return (
    <aside className="w-56 bg-[#34486B] text-white font-archivo h-screen fixed">
      <div className="flex bg-[#EAEFFB] items-center justify-center flex-col mt-10">
        <div
          className={`bg-[#34486B] p-4 ${
            window.location.pathname === "/admin" ? "rounded-br-lg" : ""
          }`}
        >
          <img
            src={logo}
            alt="Digital Horizon"
            className="h-full w-full cursor-pointer mb-6"
            onClick={homeClick}
          />
        </div>
        <nav className="flex-grow w-full">
          <Button
            className={`w-56 justify-start p-6 rounded-none text-sm bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools"
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={adminDashboard}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/admin/schools")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${window.location.pathname === "/admin" ? "rounded-tr-lg" : ""} ${
              window.location.pathname.includes("/admin/mentors")
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
              window.location.pathname.includes("/admin/mentors")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname === "/admin/schools"
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname.includes("/admin/courses")
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={mentors}
          >
            <Users className="mr-2 h-5 w-5" />
            Mentors
          </Button>
          <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/admin/courses")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname.includes("/admin/mentors")
                ? "rounded-tr-lg"
                : ""
            } ${
              window.location.pathname.includes("/admin/events")
                ? "rounded-br-lg"
                : ""
            }`}
            onClick={courses}
          >
            <GraduationCap className="mr-2 h-5 w-5" />
            Programs
          </Button>
          {/* <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/admin/events")
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname.includes("/admin/courses")
                ? "rounded-tr-lg"
                : ""
            }`}
            onClick={events}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Events
          </Button> */}
          <Button
            variant="ghost"
            className={`w-full justify-start p-6 text-sm rounded-none bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/admin/logout"
                ? "bg-[#EAEFFB] text-black hover:bg-[#EAEFFB] hover:text-black"
                : ""
            } ${
              window.location.pathname.includes("/admin/courses") ||
              window.location.pathname.includes("/admin/events")
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

export default AdminSidebar;
