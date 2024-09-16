import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfilePictureAvatar from "pages/mentors/mentorPages/profilePictureAvator";
import { useSchoolContext } from "context/AdminSchoolContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import apiClient from "config/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Upload, Info, ArrowRight } from "lucide-react";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import RoundedProfilePicture from "userDefined_components/profileimage/RoundedProfileImage";

const initialSchoolState = {
  school_name: "",
  email: "",
  password: "",
  address: "",
  logo: null,
};

const InfoIcon = ({ text }) => (
  <div className="relative group">
    <Info className="w-5 h-5 text-gray-500 cursor-pointer" />
    <div className="absolute left-0 top-full mt-2 w-48 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      {text}
    </div>
  </div>
);

const SchoolCard = ({ school, onRedirect }) => (
  <div className="bg-white rounded-lg border border-spacing-2 border-gray-200 p-6">
    <div className="flex justify-center items-center">
      <RoundedProfilePicture
        profilePicture={school.logo}
        studentName={school.logo}
        className="w-auto h-auto"
      />
    </div>
    <h2 className="text-xl font-semibold text-center mb-2 mt-4">
      {school.school_name}
    </h2>
    <p className="text-gray-600 text-center mb-2">{school.email}</p>
    <p className="text-gray-600 text-center">{school.address}</p>
    <div className="flex justify-end mt-4">
      <Button
        className="flex items-center underline bg-white hover:bg-white space-x-2 text-gray-800 rounded-lg"
        onClick={() => onRedirect(school.id)}
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  </div>
);

const SchoolsPage = () => {
  const { toast } = useToast();
  const [schoolData, setSchoolData] = useState([]);
  const [newSchool, setNewSchool] = useState(initialSchoolState);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const navigate = useNavigate();
  const { schoolId, setSchoolId } = useSchoolContext();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/school");
      setSchoolData(response.data.data);
    } catch (error) {
      console.error("Error fetching schools:", error);
      toast({
        title: "Error",
        description: "Failed to fetch schools. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewSchool((prev) => ({ ...prev, logo: file }));
    setPreviewLogo(URL.createObjectURL(file));
  };

  const validateSchoolData = (schoolData) => {
    const requiredFields = ["school_name", "email", "password", "address"];
    for (let field of requiredFields) {
      if (!schoolData[field]) {
        return `${field.replace("_", " ")} is required`;
      }
    }
    return null; // No errors
  };

  const addSchool = async () => {
    const validationError = validateSchoolData(newSchool);
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsAddDialogOpen(false);

    toast({
      title: "Processing",
      description: "Adding school...",
    });

    try {
      const formData = new FormData();
      Object.keys(newSchool).forEach((key) => {
        if (key === "logo") {
          if (newSchool[key]) {
            formData.append(key, newSchool[key]);
          }
        } else {
          formData.append(key, newSchool[key]);
        }
      });

      const response = await apiClient.post("/school", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === "success") {
        setNewSchool(initialSchoolState);
        setPreviewLogo(null);
        await fetchSchools();
        toast({
          title: "Success",
          description: "School added successfully",
          variant: "success",
        });
      } else {
        throw new Error(response.data.message || "Failed to add school");
      }
    } catch (error) {
      console.error("Error adding school:", error);
      toast({
        title: "Error",
        description: "Failed to add school. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRedirect = (schoolId) => {
    setSchoolId(schoolId);
    navigate("/admin/schools/overview");
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-56">
          <div className="flex justify-between">
            <div className="flex ">
              <h1 className="text-4xl font-bold mb-6">School Management</h1>
              <div className="pt-1.5 ml-4">
                <InfoIcon text="Click on the icon to go to the dashboard." />
              </div>
            </div>
            <div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="mb-4"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add School
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New School</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="school_name" className="text-right">
                        School Name
                      </Label>
                      <Input
                        id="school_name"
                        name="school_name"
                        value={newSchool.school_name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newSchool.email}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={newSchool.password}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={newSchool.address}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="logo" className="text-right">
                        Logo
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="logo"
                          name="logo"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <Label
                          htmlFor="logo"
                          className="cursor-pointer flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 hover:bg-gray-50"
                        >
                          {previewLogo ? (
                            <img
                              src={previewLogo}
                              alt="Logo preview"
                              className="max-h-24 max-w-full"
                            />
                          ) : (
                            <div className="flex flex-col items-center">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">
                                Upload school logo
                              </span>
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addSchool}>Save School</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Display schools */}
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {schoolData.length > 0 ? (
                schoolData.map((school) => (
                  <SchoolCard
                    key={school.id}
                    school={school}
                    onRedirect={handleRedirect}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No schools available
                </p>
              )}
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </div>
  );
};
export default SchoolsPage;
