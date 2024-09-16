import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentSidebar from "./studentSidebar";
import axios from "@/utils/axiosInstance";
import { baseURL } from "@/utils/axiosInstance";
import MobileSidebar from "./studentMobileSidebar";

const AssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const studentId = localStorage.getItem("student_id");
      try {
        const studentResponse = await axios.get(`${baseURL}/student/${studentId}`);
        const classId = studentResponse.data.data.class_id;
        if (classId) {
          const assignmentsResponse = await axios.get(`${baseURL}/assignments/class/${classId}`);
          setAssignments(assignmentsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#EAEFFB]">
      <StudentSidebar className="w-full md:w-64 flex-shrink-0" />
      <MobileSidebar />
      <main className="flex-grow p-4 md:p-8 max-sm:mt-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <div key={assignment._id} className=" p-4 rounded-lg ">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Start: {formatDate(assignment.start_date)}</span>
                      <span>End: {formatDate(assignment.end_date)}</span>
                    </div>
                    <div className="h-[1px] w-full bg-black mt-4"></div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No assignments available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AssignmentPage;
