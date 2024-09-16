import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Shield, ArrowLeft, Check } from "lucide-react";
import apiClient from "config/apiClient";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function FirstTimeLoginDialog({ isOpen, onClose, studentId }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(studentId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newPassword);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Call the API to change the password
      const response = await apiClient.put(
        `/student/changePassword/${studentId}?new_password=${newPassword}`
      );

      // Handle success
      if (response.data && response.data.message) {
        // Store the response message in localStorage
        localStorage.setItem("is_password_changed", response.data.message);

        // Close the dialog
        onClose(false);
      } else {
        setError(
          "An error occurred while changing the password. Please try again."
        );
      }
    } catch (error) {
      setError(
        "An error occurred while changing the password. Please try again."
      );
    }
  };

  const handleReturnHome = () => {
    // Remove the access_token from cookies
    Cookies.remove("access_token");
    localStorage.removeItem("student_id");
    localStorage.removeItem("teacher_id");
    localStorage.removeItem("school_id");
    // Redirect to home page (you may need to adjust this depending on your routing setup)
    navigate("/");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {}}
      onEscapeKeyDown={(e) => e.preventDefault()}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-zinc-600">
            Welcome to Digital Horizon
          </DialogTitle>
          <div className="text-center space-y-2">
            <Shield className="w-16 h-16 mx-auto text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700">
              Create Your New Password
            </h3>
            <p className="text-sm text-gray-500">
              For your security, please set a new password for your student
              account.
            </p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                  placeholder="Enter your new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-4 py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                  placeholder="Confirm your new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}
          <DialogFooter className="flex flex-col ">
            <Button
              type="button"
              onClick={handleReturnHome}
              className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Go back
            </Button>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Check className="mr-2 h-4 w-4" /> Save Password
            </Button>
          </DialogFooter>
        </form>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Note: Please ensure you remember this password or store it securely.
            You'll need it for future logins to access your Digital Horizon
            account.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FirstTimeLoginDialog;
