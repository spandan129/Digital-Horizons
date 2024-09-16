import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, BookOpen, Users, Calendar, Divide } from "lucide-react";
import TeacherSidebar from "../mentorSidebar";
import DailyReflection from "./dailyReflection";
import apiClient from "config/apiClient";
import QuoteComponent from "./quoteComponent";

const MentorDashboard = () => {
  const [teacher, setTeacher] = useState(null);

  const [cardData, setCardData] = useState([
    {
      title: "Classes",
      value: 0,
      description: "Classes currently teaching",
    },
    {
      title: "Schools",
      value: 0,
      description: "Schools currently teaching",
    },
    {
      title: "Students",
      value: 0,
      description: "Students currently teaching",
    },
  ]);

  const mentorId = localStorage.getItem("teacher_id");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await apiClient.get(`/teacher/${mentorId}`);
        setTeacher(response.data.data);
      } catch (err) {
        console.error("Failed to fetch teacher data");
      }
    };

    fetchTeacherData();
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/teacher/classes/${mentorId}`);
        const schoolData = await response.data.data;

        setCardData([
          { ...cardData[0], value: schoolData.classCount },
          { ...cardData[1], value: schoolData.schoolCount },
          { ...cardData[2], value: schoolData.studentCount },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, []);

  const events = [
    {
      name: "Parent-Teacher Meeting",
      description: "Annual meeting with parents",
      date: "2023-06-15",
    },
    {
      name: "Science Fair",
      description: "Students showcase their projects",
      date: "2023-07-10",
    },
    {
      name: "Staff Development Day",
      description: "Professional development workshop",
      date: "2023-08-05",
    },
  ];

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="flex p-6 bg-gray-100 min-h-screen w-full ml-56">
        <div className="w-2/3 pr-6">
          <h1 className="text-3xl font-bold mb-6">
            Hello, look through your Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {cardData.map((card, index) => (
              <Card key={index} className=" ">
                <div className="flex items-center p-5">
                  <div className="flex-grow">
                    <div className="text-[18px] text-gray-600 text-center">
                      {card.description}
                    </div>
                    <div className="text-heading font-bold text-center">
                      {card.value}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <DailyReflection />
          </div>
          <QuoteComponent />
        </div>

        <div className="w-1/3 pl-6 border-l border-gray-300">
          <Card className="  py-4">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Calendar className="mr-2 h-6 w-6" />
                Events for Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6 mt-4">
                {events.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-transparent flex items-center justify-center text-zinc-900 font-semibold text-xl rounded-lg">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {event.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
