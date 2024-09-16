import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  BookOpen,
  Calendar,
  GraduationCap,
  NotebookPen,
  LogOut,
  Home,
} from "lucide-react";
import { History } from "lucide-react";
import Cookies from "js-cookie";
import logo from "gallery/images/logo.png";
import { useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("is_password_changed");
    navigate("/");
  };

  // const classesClick = () => {
  //   navigate("/student/classes");
  // };

  const studentDashboard = () => {
    navigate("/student");
  };

  const studentProfile = () => {
    navigate("/student/profile");
  };

  const Attendance = () => {
    const studentId = localStorage.getItem("student_id");
    navigate(`/student/attendances/${studentId}`);
  };

  const Assignment = () => {
    navigate(`/student/assignment`);
  };

  return (
    <aside className="w-56 bg-[#34486B] text-white font-archivo h-screen lg:visible md:visible max-sm:hidden max-sm:invisible">
      <div className=" flex bg-[#EAEFFB] items-center justify-center flex-col mt-10  ">
        <div
          className={`bg-[#34486B] p-4  ${
            window.location.pathname === "/student" ? " rounded-br-lg" : ""
          }`}
        >
          <img
            src={logo}
            alt="Digital Horizon"
            className={`h-full w-full cursor-pointer`}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <nav className="flex-grow w-[full]">
          <Button
            className={`w-56 justify-start p-8 pl-6 rounded-none font-semibold text-sm bg-[#34486B] hover:bg-[#203457]  hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/student"
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 font-extrabold hover:bg-[#EAEFFB] hover:text-[#3e70c2]"
                : ""
            } ${
              window.location.pathname === "/student/classes"
                ? " rounded-br-lg "
                : ""
            }
                 ${
              window.location.pathname.includes("/student/calendar")
                ? " rounded-br-lg "
                : ""
            }`}
            onClick={(e) => studentDashboard()}
          >
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          {/* <Button
            variant="ghost"
            className={`w-full p-6 justify-start text-sm rounded-none bg-[#34486B]  hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/classes")
                ? "bg-[#EAEFFB] text-[#3e70c2]  hover:bg-[#EAEFFB] hover:text-[#3e70c2]"
                : ""
            } ${
              window.location.pathname === "/student" ? " rounded-tr-lg" : ""
            } ${
              window.location.pathname.includes("/student/calendar")
                ? " rounded-br-lg "
                : ""
            }
                `}
            onClick={classesClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Classes
          </Button> */}
          <Button
            variant="ghost"
            className={`w-full justify-start text-sm rounded-none font-semibold p-8 pl-6 bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/calendar")
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 font-extrabold hover:bg-[#EAEFFB] hover:text-[#3e70c2]"
                : ""
            } ${
              window.location.pathname === "/student/classes"
                ? " rounded-tr-lg "
                : ""
            } 
                ${
              window.location.pathname === "/student" ? " rounded-tr-lg" : ""
            }
                ${
                  window.location.pathname.includes("/student/attendances")
                    ? " rounded-br-lg "
                    : ""
                }`}
            onClick={(e) => navigate("/student/calendar")}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Academic Calendar
          </Button>
          <Button
            variant="ghost"
            className={`w-full  justify-start p-8 text-sm rounded-none font-semibold pl-6 bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/attendances")
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 font-extrabold hover:bg-[#EAEFFB] hover:text-[#3e70c2] "
                : ""
            } ${
              window.location.pathname.includes("/student/calendar")
                ? " rounded-tr-lg"
                : ""
            } ${
              window.location.pathname.includes("/student/assignment")
                ? " rounded-br-lg "
                : ""
            } `}
            onClick={Attendance}
          >
            <History className="mr-2 h-5 w-5" />
            Attendance History
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-sm rounded-none font-semibold p-8 pl-6 bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/assignment")
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 font-extrabold hover:bg-[#EAEFFB] hover:text-[#3e70c2] "
                : ""
            } ${
              window.location.pathname.includes("/student/attendances")
                ? " rounded-tr-lg "
                : ""
            }
                 ${
                   window.location.pathname.includes("/student/profile")
                     ? " rounded-br-lg"
                     : ""
                 }`}
            onClick={Assignment}
          >
            <NotebookPen className="mr-2 h-5 w-5" />
            Assignments
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start p-8 text-sm rounded-none font-semibold pl-6 bg-[#34486B] hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname.includes("/student/profile")
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 font-extrabold hover:bg-[#EAEFFB] hover:text-[#3e70c2]"
                : ""
            } ${
              window.location.pathname.includes("/student/assignment")
                ? " rounded-tr-lg"
                : ""
            } `}
            onClick={studentProfile}
          >
            <User className="mr-2 h-5 w-5" />
            Profile
          </Button>
        
          
         
        </nav>
      </div>
      <div className=" h-[45%] pl-4 w-full flex justify-end items-end">
      <Button
            variant="ghost"
            className={`w-full justify-start p-8 text-sm rounded-none font-semibold pl-6 bg-[#34486B] hover:bg-[#34486B] hover:text-white transition-all duration-300 ease-in-out ${
              window.location.pathname === "/student/logout"
                ? "bg-[#EAEFFB] text-[#3e70c2] p-6 hover:bg-[#EAEFFB] hover:text-[#3e70c2]"
                : ""
            }
                ${
                  window.location.pathname.includes("/student/profile")
                    ? " rounded-tr-lg "
                    : ""
                }`}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
          </div>
    </aside>
  );
};

export default StudentSidebar;
