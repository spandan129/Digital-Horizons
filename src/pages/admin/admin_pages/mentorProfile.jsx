import React, { useState, useEffect } from "react";
import AdminSidebar from "../adminSidebar";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { useParams } from "react-router-dom";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import {
  User,
  Phone,
  Home,
  School,
  BookOpen,
  Mail,
  MapPin,
  AlertCircle,
  Edit,
} from "lucide-react";
import DisplayProfile from "userDefined_components/profileimage/ProfileImage";

const MentorProfile = () => {
  const { mentorId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [schoolsData, setSchoolsData] = useState({});
  const [classesData, setClassesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedTeacher, setUpdatedTeacher] = useState({});

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await apiClient.get(`/teacher/${mentorId}`);
        setTeacher(response.data.data);
        await fetchSchoolsAndClassesData(response.data.data.schools);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch teacher data");
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [mentorId]);

  const handleEdit = () => {
    setUpdatedTeacher({
      name: teacher?.name || "",
      address: teacher?.address || "",
      username: teacher?.username || "",
      phone_num: teacher?.phone_num || "",
    });
    setIsDialogOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(
        `/teacher/${mentorId}`,
        updatedTeacher
      );
      setTeacher(response.data.data);
      setIsDialogOpen(false);
      const fetchTeacherData = async () => {
        try {
          const response = await apiClient.get(`/teacher/${mentorId}`);
          setTeacher(response.data.data);
          await fetchSchoolsAndClassesData(response.data.data.schools);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch teacher data");
          setLoading(false);
        }
      };

      fetchTeacherData();
    } catch (error) {
      console.error("Failed to update teacher:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const fetchSchoolsAndClassesData = async (schools) => {
    if (!schools) return;
    const schoolPromises = schools.map((school) =>
      getSchoolData(school.school_id)
    );
    const schoolsData = await Promise.all(schoolPromises);

    const classPromises = schools.flatMap((school) =>
      school.classes.map((classId) => getClassData(classId))
    );
    const classesData = await Promise.all(classPromises);

    setSchoolsData(
      Object.fromEntries(schoolsData.map((school) => [school.id, school]))
    );
    setClassesData(
      Object.fromEntries(
        classesData.map((classData) => [classData.id, classData])
      )
    );
  };

  const getSchoolData = async (schoolId) => {
    const response = await apiClient.get(`/school/${schoolId}`);
    return response.data.data;
  };

  const getClassData = async (classId) => {
    const response = await apiClient.get(`/class/${classId}`);
    return response.data.data;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">No teacher data available</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8 ml-64">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Mentor Profile</h1>
            <Button
              onClick={handleEdit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="">
              <CardContent className="flex flex-col items-center pt-6">
                <DisplayProfile
                  profilePicture={teacher.profile_picture}
                  studentName={teacher.name}
                />

                <h2 className="text-2xl font-semibold mb-4">{teacher.name}</h2>
                <Separator className="mb-4" />
                <ul className="w-full space-y-3">
                  <li className="flex items-center">
                    <User className="mr-3 w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{teacher.username}</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="mr-3 w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{teacher.phone_num}</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Home className="mr-3 w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{teacher.address}</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <School className="mr-2 w-6 h-6 text-blue-600" />
                  Schools and Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.schools && teacher.schools.length > 0 ? (
                  teacher.schools.map((school, index) => (
                    <div key={school.school_id} className="mb-6">
                      <div className="bg-white p-4 rounded-lg mb-4">
                        <h3 className="text-xl font-semibold text-blue-600 mb-2">
                          {schoolsData[school.school_id]?.school_name ||
                            `School ID: ${school.school_id}`}
                        </h3>
                        <div className="flex items-center mb-2 text-gray-600">
                          <Mail className="mr-2 w-4 h-4" />
                          <p>{schoolsData[school.school_id]?.email}</p>
                        </div>
                        <div className="flex items-center mb-4 text-gray-600">
                          <MapPin className="mr-2 w-4 h-4" />
                          <p>{schoolsData[school.school_id]?.address}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg ">
                        <h4 className="text-lg font-semibold mb-3 flex items-center">
                          <BookOpen className="mr-2 w-5 h-5 text-gray-600" />
                          Classes
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {school.classes.map((classId) => (
                            <Badge key={classId} variant="secondary">
                              {classesData[classId]?.class_name ||
                                `Class ${classId}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {index < teacher.schools.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-lg text-gray-600">
                      No schools and classes assigned yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Mentor Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdate}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={updatedTeacher.name || ""}
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
                      value={updatedTeacher.address || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      value={updatedTeacher.username || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone_num" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone_num"
                      name="phone_num"
                      value={updatedTeacher.phone_num || ""}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Update Profile</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default MentorProfile;
