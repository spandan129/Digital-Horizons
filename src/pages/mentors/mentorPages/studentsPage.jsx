import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Search, MessageSquareShare } from "lucide-react";
import TeacherSidebar from "../mentorSidebar";
import { Input } from "@/components/ui/input"; // Add this import
import apiClient from "config/apiClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentsPage = () => {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Add this state
  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await apiClient.get(`/class/${classId}`);
        setClassData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch class data");
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId]);

  // Add this function to filter students
  const filteredStudents = classData?.students.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <TeacherSidebar />
      {/* <CardHeader>
            <CardTitle>{classData?.class_name} - Students</CardTitle>
          </CardHeader> */}
      <div className="p-6 bg-[#EAEFFB] min-h-screen w-full ml-56">
        <div className="flex gap-8 p-6">
          <h3 className="text-4xl font-extrabold w-[100px] text-[#34486B]">
            {classData?.class_name}
          </h3>
          <div className="flex w-full justify-center items-center gap-44">
            <h3 className="text-md font-bold ">
              Students <br></br>{" "}
              <span className="flex justify-center items-center font-extrabold text-6xl text-[#34486B]">
                {classData?.students.length}
              </span>
            </h3>
            <h3 className="text-md font-bold">
              Courses <br></br>{" "}
              <span className="flex justify-center items-center font-extrabold text-6xl text-[#34486B]">
                {classData?.courses.length}
              </span>
            </h3>
            <h3 className="text-md font-bold">
              Mentors <br></br>{" "}
              <span className="flex justify-center items-center font-extrabold text-6xl text-[#34486B]">
                {classData?.teachers.length}
              </span>
            </h3>
          </div>
        </div>
        <Card className="border-none shadow-none mt-8 rounded-3xl bg-white">
          <CardContent className="p-6 ">
            <div className="flex items-center ">
              <h3 className="w-[200px] mb-4 text-[#34486B] text-2xl font-bold">
                Student List
              </h3>
              <div className="flex justify-center items-center w-full gap-4">
                <Search className="h-6 w-6 text-[#34486B] mb-3" />
                <Input
                  type="text"
                  placeholder="Search by student name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-4 w-1/2 border-none bg-transparent"
                />
              </div>
            </div>
            <hr className=" bg-gray-100 w-full h-[1px] mb-4"></hr>
            <Table>
              <TableBody>
                {filteredStudents &&
                  filteredStudents.length > 0 &&
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-none">
                      <TableCell>
                        <Avatar className="h-16 w-16">
                          {student.profile_picture_content ? (
                            <AvatarImage
                              src={`data:image/png;base64,${student.profile_picture_content}`}
                              alt={student.student_name}
                            />
                          ) : (
                            <AvatarFallback>
                              {student.student_name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell className="text-center text-[#6C7172] font-semibold">
                        {student.student_name}
                      </TableCell>
                      <TableCell className="text-center text-[#6C7172] font-semibold">
                        {student.age}
                      </TableCell>
                      <TableCell className="text-center text-[#6C7172] font-semibold">
                        {student.phone_num}
                      </TableCell>
                      <TableCell className="text-center text-[#6C7172] font-semibold">
                        {student.student_email}
                      </TableCell>
                      <TableCell className="text-center text-[#6C7172] font-semibold">
                        {student.address}
                      </TableCell>
                      <TableCell className="text-center font-extrabold flex justify-center items-center pt-9 gap-4">
                        <div className="flex justify-center items-center gap-2">
                          <Eye className="text-[#3E70C2]" />
                          <span
                            className="text-[#3E70C2] cursor-pointer"
                            onClick={() =>
                              navigate(`/mentor/attendance/${student.id}`)
                            }
                          >
                            View Attendance
                          </span>
                        </div>
                        <div>
                          <span
                            className="text-[#3E70C2] cursor-pointer ml-4"
                            onClick={() =>
                              navigate(`/mentor/feedback/${student.id}`)
                            }
                          >
                            Give Feedback
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsPage;
