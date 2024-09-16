import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";
import FirstTimeLoginDialog from "./FirstTimeLoginDialog";

function TestLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("student");
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsFirstTimeLogin(true);
  };

  const handleFirstTimeLoginClose = () => {
    setIsFirstTimeLogin(false);
    console.log("Password changed and logged in successfully");
  };

  const homeRedirect = () => {
    navigate("/");
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Half: Placeholder Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 justify-center items-center">
        <img
          src={Blur}
          alt="Placeholder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Half: Sign-In Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-6 lg:p-12 max-sm:p-11">
        <div className="w-full max-w-md">
          {/* Logo at the top */}
          <div className="flex justify-center mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="h-auto w-96"
              onClick={homeRedirect}
            />
          </div>

          <h2 className="text-4xl lg:text-4xl font-bold mb-6 text-gray-800 font-sans">
            Sign in{" "}
            <span className="text-regular lg:text-regular font-light mb-6 text-gray-800 font-sans">
              as a {userType}
            </span>
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* User Type Dropdown */}
            <div>
              <Label
                htmlFor="userType"
                className="block font-medium text-gray-700 font-sans text-lg mb-1"
              >
                User Type
              </Label>
              <Select onValueChange={handleUserTypeChange} value={userType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Mentor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="school">School Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Email/Username Field */}
            <div>
              <Label
                htmlFor="email"
                className="block font-medium text-gray-700 font-sans text-lg"
              >
                {userType === "student" ? "Student ID" : "Email"}
              </Label>
              <Input
                type={userType === "student" ? "text" : "email"}
                id="email"
                placeholder={`Enter your ${
                  userType === "student" ? "student ID" : "email"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label
                htmlFor="password"
                className="block font-medium text-gray-700 font-sans text-lg"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full font-sans border border-gray-200 rounded-md"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm mt-2 font-sans">{error}</div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 font-sans"
            >
              Sign In
            </Button>

            {/* Additional Options */}
            <div className="flex justify-between items-center mt-4 font-sans">
              <a href="#" className="text-blue-600 hover:underline font-sans">
                Forgot Password?
              </a>
              <a href="#" className="text-blue-600 hover:underline font-sans">
                Help
              </a>
            </div>
          </form>
        </div>
      </div>


    </div>
  );
}

export default TestLogin;
