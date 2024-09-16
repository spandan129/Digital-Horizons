import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import AdminSidebar from "../adminSidebar";
import apiClient from "config/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School, BookOpen, TrendingUp, Book } from "lucide-react";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const LazyBar = lazy(() =>
  import("react-chartjs-2").then((module) => ({ default: module.Bar }))
);
const LazyPie = lazy(() =>
  import("react-chartjs-2").then((module) => ({ default: module.Pie }))
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const colors = useMemo(
    () => [
      "rgba(75, 192, 192, 0.8)",
      "rgba(54, 162, 235, 0.8)",
      "rgba(153, 102, 255, 0.8)",
      "rgba(255, 159, 64, 0.8)",
      "rgba(255, 205, 86, 0.8)",
      "rgba(201, 203, 207, 0.8)",
      "rgba(99, 255, 132, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(150, 75, 0, 0.8)",
      "rgba(128, 128, 128, 0.8)",
    ],
    []
  );

  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalSchools: 0,
    totalCourses: 0,
    totalMentors: 0,
    schoolCourseData: [],
    popularCourses: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          studentsResponse,
          schoolsResponse,
          totalCoursesResponse,
          schoolCourseDataResponse,
          popularCoursesResponse,
          totalMentorResponse,
        ] = await Promise.all([
          apiClient.get("/student"),
          apiClient.get("/school"),
          apiClient.get("/course"),
          apiClient.get("/student_per_course"),
          apiClient.get("/popular_courses"),
          apiClient.get("/teacher"),
        ]);
        console.log(studentsResponse);

        setDashboardData({
          totalStudents: studentsResponse.data?.data?.length || 0,
          totalSchools: schoolsResponse.data?.data?.length || 0,
          totalCourses: totalCoursesResponse.data?.data?.length || 0,
          totalMentors: totalMentorResponse.data?.length || 0,
          schoolCourseData: schoolCourseDataResponse.data?.data || [],
          popularCourses:
            popularCoursesResponse.data?.data?.map((course, index) => ({
              courseName: course.courseName,
              students: course.students,
              color: colors[index % colors.length],
            })) || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [colors]);

  const schoolCourseChartData = useMemo(
    () => ({
      labels: dashboardData.schoolCourseData.map((item) => item.schoolName),
      datasets: Object.keys(dashboardData.schoolCourseData[0] || {})
        .filter((key) => key !== "schoolName")
        .map((course, index) => ({
          label: course,
          data: dashboardData.schoolCourseData.map((item) => item[course]),
          backgroundColor: colors[index % colors.length],
        })),
    }),
    [dashboardData.schoolCourseData, colors]
  );

  const popularCoursesChartData = useMemo(
    () => ({
      labels: dashboardData.popularCourses.map((course) => course.courseName),
      datasets: [
        {
          data: dashboardData.popularCourses.map((course) => course.students),
          backgroundColor: dashboardData.popularCourses.map(
            (course) => course.color
          ),
        },
      ],
    }),
    [dashboardData.popularCourses]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Course Statistics" },
      },
    }),
    []
  );

  const pieChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Most Popular Courses" },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed || 0;
              const sum = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / sum) * 100).toFixed(2) + "%";
              return `${label}: ${value} (${percentage})`;
            },
          },
        },
      },
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8 ml-56">
          <div className="grid grid-cols-4 md:grid-cols-5 gap-1 mb-8 ml-2">
            <StatCard
              title="Students Enrolled"
              value={dashboardData.totalStudents}
            />
            <StatCard
              title="Partnered Schools"
              value={dashboardData.totalSchools}
            />
            <StatCard
              title="Mentors Registered"
              value={dashboardData.totalMentors}
            />
            <div className="block">
              <div className="h-[32rem]">
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyPie
                    data={popularCoursesChartData}
                    options={pieChartOptions}
                    className="bg-none"
                  />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="gap-8 absolute bottom-16 w-1/3">
            <h1 className="text-lg">Students per course</h1>
            <div className="h-96 w-[100%]">
              <Suspense fallback={<LoadingSpinner />}>
                <LazyBar data={schoolCourseChartData} options={options} />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="block">
    <div className="text-lg font-medium mb-2 text-center">{title}</div>
    <div className="text-6xl font-bold text-center">{value}</div>
  </div>
);

export default AdminDashboard;
