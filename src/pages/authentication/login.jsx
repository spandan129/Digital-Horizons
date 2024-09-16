import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, School, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Logo from "../../gallery/Logo.png";
import Blur from "../../gallery/images/blur.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

function SignInPage() {
  const navigate = useNavigate();
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("student");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let endpoint;
      switch (userType) {
        case "student":
          endpoint = "/student/login";
          break;
        case "admin":
          endpoint = "/admin/login";
          break;
        case "teacher":
          endpoint = "/mentor/login";
          break;
        case "school":
          endpoint = "/school/login";
          break;
        default:
          throw new Error("Invalid user type");
      }

      const response = await axiosInstance.post(endpoint, {
        email,
        password,
      });

      const { access_token, token_type } = response.data;
      const encryptedToken = CryptoJS.AES.encrypt(
        access_token,
        SECRET_KEY
      ).toString();
      Cookies.set("access_token", encryptedToken, { expires: 7 });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `${token_type} ${access_token}`;

      if (["student", "teacher", "school"].includes(userType)) {
        const decodedToken = jwtDecode(access_token);
        const id = decodedToken.id || decodedToken.sub;

        if (userType === "school") {
          localStorage.setItem("school_admin_id", id);
        } else {
          localStorage.setItem(`${userType}_id`, id);
        }

        if (userType === "student") {
          const is_password_changed = decodedToken.is_password_changed;
          console.log(is_password_changed);
          localStorage.setItem("is_password_changed", is_password_changed);
        }

        console.log(
          `${userType.charAt(0).toUpperCase() + userType.slice(1)} ID:`,
          id
        );
      }

      switch (userType) {
        case "student":
          navigate("/student");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/mentor/dashboard");
          break;
        case "school":
          navigate("/school");
          break;
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
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

  const getUserTypeDisplayName = (type) => {
    switch (type) {
      case "student":
        return "as a student";
      case "teacher":
        return "as a mentor";
      case "school":
        return "as a school manager";
      case "admin":
        return "as an admin";
      default:
        return type.charAt(0) + type.slice(1);
    }
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

          <h2 className="text-4xl lg:text-4xl font-bold mb-6 text-gray-800 font-san mb-1">
            Sign in{" "}
            <span className="text-regular lg:text-regular font-light mb-6 text-gray-800 font-sans">
              {getUserTypeDisplayName(userType)}
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

            <div className="flex items-end mt-4 font-sans">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-50 font-sans flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Help
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader className="text-center">
                    <DialogTitle className="flex justify-center items-center gap-2 text-2xl mb-2">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                      Help Information
                    </DialogTitle>
                    <DialogDescription className="mt-4 space-y-3">
                      <p className="flex flex-col items-center gap-2 text-center">
                        For Student's password, the mentor will do onboarding
                        for you.
                      </p>
                      <p className="flex flex-col items-center mb-4 gap-2 text-center">
                        For any issues, please contact the school administrator
                        or the page administrator.
                      </p>
                      <p className="flex flex-col items-center gap-2 mb-4 text-center">
                        Contact us at: hub@digitalhorizons.com
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
