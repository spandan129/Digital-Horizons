import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/utils/axiosInstance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "config/apiClient";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import StudentSidebar from "./studentSidebar";
import { Check, X } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { baseURL } from "@/utils/axiosInstance";
import { useNewSchoolContext } from "context/NewSchoolContext";
import MobileSidebar from "./studentMobileSidebar";

const StudentAttendance = () => {
  const studentId = localStorage.getItem("student_id");
  console.log("Student ID:", studentId);
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [course, setCourse] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedRemarks, setSelectedRemarks] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await apiClient.get(`/student/${studentId}`);
        setStudent(studentResponse.data.data);
        let classid = studentResponse.data.data.class_id;

        if (classid && classid.length > 0) {
          const attendanceResponse = await apiClient.get(
            `/attendances/student/${studentId}/class/${classid}/month/${selectedYear}/${selectedMonth
              .toString()
              .padStart(2, "0")}`
          );
          setAttendance(attendanceResponse.data.data.attendances);
        }

        if (
          studentResponse.data.data.course_id &&
          studentResponse.data.data.course_id.length > 0
        ) {
          const courseResponse = await apiClient.get(
            `/course/${studentResponse.data.data.course_id[0]}`
          );
          setCourse(courseResponse.data.data);
        }

        await fetchStudentData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentId, selectedMonth, selectedYear]);

  if (!student) {
    return <LoadingSpinner />;
  }

  const generateMonthDates = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month - 1, i + 1);
      return date.toISOString().split("T")[0];
    });
  };

  const monthDates = generateMonthDates(selectedYear, selectedMonth);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <StudentSidebar className="w-full md:w-auto" />
      <MobileSidebar />
      <div className="flex-1 p-4 md:p-8 bg-[#EAEFFB] flex flex-col overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pl-2 md:pl-8 pr-2 md:pr-16 mb-4 ml-4 lg:ml-0 mt-8 lg:mt-0">
          <div>
            <h1 className="text-2xl md:text-5xl font-bold mt-2">
              {studentData.student_name}
            </h1>
          </div>
          <div className="mt-2 md:mt-0">
            <h1 className="text-[#7189B2]">Attendance History</h1>
          </div>
        </div>
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
              <div className="w-full sm:w-auto">
                <Select
                  value={selectedMonth.toString()}
                  onValueChange={(value) => setSelectedMonth(parseInt(value))}
                >
                  <SelectTrigger className="w-full sm:w-[150px] bg-[#EAEFFB] border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value.toString()}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-[90%] ml-2 h-[2px] bg-[#B9B9B9]"></div>
              </div>
              <div className="w-full sm:w-auto">
                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                  className="border border-black"
                >
                  <SelectTrigger className="w-full sm:w-[150px] bg-[#EAEFFB] border-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="w-[90%] ml-2 h-[2px] bg-[#B9B9B9]"></div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/4 text-sm md:text-xl">Date</TableHead>
                      <TableHead className=" w-1/5 text-sm md:text-xl">
                        <span className="ml-0 md:ml-[-2.5rem]">Attendance</span>
                      </TableHead>
                      <TableHead className="text-center text-sm md:text-xl w-1/3">
                        Remarks
                      </TableHead>
                      <TableHead className="text-center text-sm md:text-xl w-1/4">
                        Laptop Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
              <div className="overflow-y-auto flex-1">
                <Table>
                  <TableBody>
                    {monthDates.map((date) => {
                      const attendanceRecord = attendance.find(
                        (record) => record.date === date
                      );
                      return (
                        <TableRow key={date}>
                          <TableCell className="w-1/4 p-4 md:p-6 pl-2 md:pl-4 ">
                            {window.innerWidth <= 460 ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                          </TableCell>
                          <TableCell className="w-1/5">

                            {attendanceRecord ? attendanceRecord.status : "N/A"}

                          </TableCell>
                          <TableCell className="text-center w-1/3 ">

                            {attendanceRecord ? (
                              <div className="space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button className="text-blue-600">
                                      {attendanceRecord.remarks || "N/A"}
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogTitle>Remarks</DialogTitle>
                                    <p>{attendanceRecord.remarks}</p>
                                    <DialogClose asChild>
                                      <button>Close</button>
                                    </DialogClose>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            ) : (
                              "N/A "
                            )}

                            <div className="w-full h-[1px] bg-black"> </div>
                          </TableCell>
                          <TableCell className="text-center w-1/4">
                            {attendanceRecord
                              ? attendanceRecord.laptopStatus
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendance;
