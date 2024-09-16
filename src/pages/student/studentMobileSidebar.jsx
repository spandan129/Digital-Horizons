import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  User,
  Calendar,
  NotebookPen,
  LogOut,
  Home,
  Menu,
  ChevronRight,
} from "lucide-react";
import { History } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "gallery/images/logo.png";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("access_token");
    localStorage.removeItem("is_password_changed");
    navigate("/");
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/student" },
    { icon: Calendar, label: "Academic Calendar", path: "/student/calendar" },
    {
      icon: History,
      label: "Attendance History",
      path: "/student/attendances",
    },
    { icon: NotebookPen, label: "Assignments", path: "/student/assignment" },
    { icon: User, label: "Profile", path: "/student/profile" },
  ];

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-6 w-6 text-[#34486B]" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[280px] bg-[#34486B] font-semibold text-white p-0 overflow-y-auto"
        >
          <motion.nav
            className="flex flex-col h-full"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 flex justify-center items-center">
              <img
                src={logo}
                alt="Digital Horizon"
                className="h-12 cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
              />
            </div>
            <div className="flex-1 py-6 px-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-between p-4 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out rounded-lg mb-2 ${
                      window.location.pathname === item.path
                        ? "bg-[#EAEFFB] text-[#34486B] hover:bg-[#EAEFFB] hover:text-[#34486B]"
                        : ""
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4"
            >
              <Button
                variant="ghost"
                className="w-full justify-between p-4 text-sm hover:bg-[#203457] hover:text-white transition-all duration-300 ease-in-out rounded-lg"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center " >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </div>
                
              </Button>
            </motion.div>
          </motion.nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
