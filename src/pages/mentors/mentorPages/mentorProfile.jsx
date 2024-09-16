import React, { useState, useEffect } from "react";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import MentorSidebar from "../mentorSidebar";
import ProfilePictureAvatar from "../../../userDefined_components/profileimage/ProfileImage";

const IndividualMentor = () => {
  const mentorId = localStorage.getItem("teacher_id");
  const [teacher, setTeacher] = useState(null);
  const [schoolsData, setSchoolsData] = useState({});
  const [classesData, setClassesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <p className="text-red-500 text-xl font-semibold mb-8">Error</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <MentorSidebar />
      <main className="flex-1 overflow-auto p-6 ml-56">
        <h1 className="text-3xl font-bold mb-4  text-[#34486B]">
          Mentor Profile
        </h1>
        <hr className="w-full  h-[1px] border-0 bg-[#34486B]"></hr>
        <div className="flex h-[71vh]">
          <div className="w-1/2">
            <Card className="bg-transparent h-[10px] arent w-full mr-0  ">
              <CardContent className="p-0 pt-6 pb-6 pl-6">
                <div className="flex justify-between items-start  ">
                  <div className="w-full">
                    <div className="flex items-center justify-center w-full">
                      <div className="rounded-2xl overflow-hidden ">
                        <ProfilePictureAvatar
                          profilePicture={teacher.profile_picture}
                          studentName={teacher.name}
                          className="w-full h-full object-fill"
                        />
                      </div>
                    </div>

                    <h2 className="text-heading font-bold w-full text-[#34486B] mt-5 mb-2">
                      {teacher.name}
                    </h2>
                    <p className="text-[#6C6C6C] pt-6 ">{teacher.username}</p>
                    <hr className="border-t border-gray-800 my-2 " />
                    <div className="space-y-2 ">
                      <p className="flex items-center pt-6 text-[#6C6C6C]">
                        {teacher.phone_num}
                      </p>
                      <hr className="border-t border-gray-800 my-2 " />

                      <p className="flex items-center pt-6 text-[#6C6C6C]">
                        {teacher.address}
                      </p>
                      <hr className="border-t border-gray-800 my-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-[100%] w-[1px] bg-black"></div>
          <div className="w-1/3 space-y-6">
            <Card className="bg-transparent ">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#34486B]">
                  Schools
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.schools && teacher.schools.length > 0 ? (
                  <ul className="space-y-2">
                    {teacher.schools.map((school) => (
                      <li
                        key={school.school_id}
                        className="flex items-center text-[#6C6C6C]"
                      >
                        {schoolsData[school.school_id]?.school_name ||
                          `School ${school.school_id}`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#6C6C6C]">No schools assigned</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#34486B]">
                  Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {teacher.schools && teacher.schools.length > 0 ? (
                  <ul className="space-y-2">
                    {teacher.schools.flatMap((school) =>
                      school.classes.map((classId) => (
                        <li
                          key={classId}
                          className="flex items-center text-[#6C6C6C]"
                        >
                          {classesData[classId]?.class_name ||
                            `Class ${classId}`}
                        </li>
                      ))
                    )}
                  </ul>
                ) : (
                  <p className="text-[#6C6C6C]">No classes assigned</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IndividualMentor;
