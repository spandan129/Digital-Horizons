import React, { useEffect, useState } from "react";
import { useSchoolContext } from "context/AdminSchoolContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Users, BookOpen, School } from "lucide-react";
import { Bar } from "react-chartjs-2";
import apiClient from "@/utils/axiosInstance";
import ISidebar from "./sidebarSchool";
import CurriculumModal from "./curriculumModal";
import { Button } from "@/components/ui/button";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { baseURL } from "@/utils/axiosInstance";
import { useNewSchoolContext } from "../../context/NewSchoolContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SchoolDashboard = () => {
  const { schoolId } = useNewSchoolContext();
  const [events, setEvents] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [classes, setClasses] = useState(0);

  const fetchStudentCount = async () => {
    try {
      const response = await apiClient.get(`/student/school/${schoolId}`);
      const courseResponse = await apiClient.get(`/school/${schoolId}`);
      const classResponse = await apiClient.get(`/class/school/${schoolId}`);
      setStudentCount(response.data.data?.length || 0);
      setCourseCount(courseResponse.data.data.course_id?.length || 0);
      setName(courseResponse.data.data?.school_name || 0);
      setClasses(classResponse.data.data?.length || 0);
    } catch (error) {
      console.error("Error fetching student count:", error);
      setStudentCount(0);
    }
  };

  fetchStudentCount();

  useEffect(() => {
    const fetchEvents = async () => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const response = await fetch(
        `calendar/${currentYear}/${schoolId}/${currentMonth}`
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        const allEvents =
          data.data &&
          data.data.length > 0 &&
          data.data.schools[0].events.flatMap((monthEvents) =>
            monthEvents.days.flatMap((day) =>
              day.events.map((event) => ({
                ...event,
                month: monthEvents.month,
                day: day.day,
              }))
            )
          );
        setEvents(allEvents);
      }
    };
    fetchEvents();
  }, [schoolId]);

  const studentPerCourseData = {
    labels: ["HTML/CSS", "Scratch", "Cybersecurity"],
    datasets: [
      {
        label: "Students registered",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Statistics",
      },
    },
  };

  const getMonthAbbreviation = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let number = monthNumber - 1;
    return months[number];
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ISidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8 ml-64">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 mt-4">
            <Card>
              <CardHeader className="flex flex-col items-center justify-center pb-2">
                <CardTitle className="text-[18px] font-medium text-center">
                  Total Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-heading font-bold text-center">
                  {studentCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center justify-center pb-2">
                <CardTitle className="text-[18px] font-medium text-center">
                  Total Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-heading font-bold text-center">
                  {courseCount}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-col items-center justify-center pb-2">
                <CardTitle className="text-[18px] font-medium text-center">
                  Total Number of Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-heading font-bold text-center">
                  {classes}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="text-subheading">
                  Students registered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={studentPerCourseData} options={options} />
              </CardContent>
            </Card>
            <Card className="lg:row-span-2">
              <CardHeader>
                <CardTitle className="text-subheading">
                  Events for (Month name)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {events &&
                    events.length > 0 &&
                    events.map((event) => (
                      <div key={event.id} className="flex">
                        <div className="flex-shrink-0">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white text-xs flex-col">
                            <div
                              className="font-bold"
                              style={{ letterSpacing: "1px" }}
                            >
                              {getMonthAbbreviation(event.month)}
                            </div>
                            <div>{event.day}</div>
                          </span>
                        </div>
                        <div className="ml-4 flex-1 space-y-2">
                          <p className="text-sm font-medium leading-5">
                            {event.event_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event.event_description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
            <div className="w-1/2 ml-6">
              <CurriculumModal />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;
