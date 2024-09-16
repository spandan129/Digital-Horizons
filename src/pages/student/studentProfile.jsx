import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Edit, Save } from "lucide-react";
import { baseURL } from "@/utils/axiosInstance";
import StudentSidebar from "./studentSidebar";
import Arpit from "../../gallery/members/Arpit1.png";
import ProfilePictureAvatar from "pages/mentors/mentorPages/profilePictureAvator";
import DisplayProfile from "userDefined_components/profileimage/ProfileImage";
import MobileSidebar from "./studentMobileSidebar";

const StudentsProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    id: "",
    student_name: "",
    age: "",
    phone_num: "",
    student_email: "",
    address: "",
    studentId: "",
    profile_picture: "",
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    const student_id = localStorage.getItem("student_id");
    try {
      const response = await axios.get(`${baseURL}/student/${student_id}`);
      const { data } = response.data;
      setStudentData({
        student_name: data.student_name,
        age: data.age,
        phone_num: data.phone_num,
        student_email: data.student_email,
        address: data.address,
        school_id: data.school_id,
        course_id: data.course_id,
        class_id: data.class_id,
        studentId: data.studentId,
        profile_picture: data.profile_picture,
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <StudentSidebar />
      <MobileSidebar/>
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-28 overflow-y-scroll max-sm:mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-[#34486B]">
          Students Profile
        </h1>
        <hr className="w-full border border-gray-600" />

        <div className="flex flex-col md:flex-row w-full h-full">
          <div className="w-full md:w-3/5 lg:w-2/3  mb-8 md:mb-0 grid items-end ">
            <h1 className="text-4xl mt-8 md:text-5xl lg:text-7xl font-semibold mb-8 md:mb-0 text-[#01183FF2]">
              {studentData.student_name}
            </h1>
            <div className="mt-4 md:mt-8">
              <InfoItem label={studentData.studentId} id={"id"} />
              <InfoItem label={studentData.phone_num} id={"num"} />
              <InfoItem label={studentData.address} id={"add"} />
            </div>
          </div>
          <div className="hidden md:block w-[1.5px] h-full bg-gray-600 self-stretch" />
          <div className="w-full md:w-2/5 lg:w-2/5 flex flex-col  justify-end">
            <div className="p-9">
              <div className="rounded-lg overflow-hidden">
                <DisplayProfile
                  profilePicture={studentData?.profile_picture}
                  studentName={studentData?.student_name}
                  className="w-44 h-44 mb-8 "
                />
              </div>
              <h1 className="mt-8 text-3xl md:text-4xl max-sm:text-center font-bold text-[#01183FF2]">
                Coding 10A
              </h1>
              <h1 className="mt-4 text-xl md:text-xl max-sm:text-center font-semibold text-[#01183FF2]">
                SVI123
              </h1>
            </div>
            <hr className="w-full border border-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, id }) => (
  <>
    <h2
      className={`text-lg py-4 ${
        id === "id" ? "text-[#607496]" : "text-[#8B8C8E]"
      }`}
    >
      {label}
    </h2>
    <hr className="w-full border border-gray-600" />
  </>
);

export default StudentsProfile;
