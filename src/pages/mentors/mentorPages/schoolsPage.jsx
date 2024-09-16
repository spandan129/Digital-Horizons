import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { School, Mail, MapPin, Search, Eye } from "lucide-react";
import TeacherSidebar from "../mentorSidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import apiClient from "config/apiClient";

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacher_id = localStorage.getItem("teacher_id");
        if (!teacher_id) {
          throw new Error("Teacher ID not found in localStorage");
        }

        const teacherResponse = await apiClient.get(`/teacher/${teacher_id}`);
        const teacherData = teacherResponse.data;
        console.log(teacherData);

        if (teacherData.status !== "success") {
          throw new Error("Failed to fetch teacher data");
        }

        const schoolPromises = teacherData.data.schools.map(async (school) => {
          const schoolResponse = await apiClient.get(
            `/school/${school.school_id}`
          );
          const schoolData = schoolResponse.data;
          return {
            ...schoolData.data,
            classes: school.classes,
          };
        });

        const schoolsData = await Promise.all(schoolPromises);

        setSchools(schoolsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredSchools = schools.filter((school) =>
    school.school_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewClasses = (school) => {
    const classesString = school.classes.join(",");
    navigate(`/mentor/classes?classes=${classesString}`);
  };

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="p-6 bg-[#EAEFFB] min-h-screen w-full ml-56">
        <h1 className="text-3xl font-bold mb-6">Schools</h1>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="pl-10 pr-4 py-2 w-full max-w-md"
            type="text"
            placeholder="Search schools..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredSchools.map((school) => (
            <div className="border border-gray-300 border-spacing-1 bg-white">
              <Card key={school.id} className="overflow-hidden  duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <School className="h-5 w-5 text-blue-500" />
                    <span>{school.school_name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 ">
                      {/* <Mail className="h-4 w-4 text-gray-400" /> */}
                      <span className="text-sm text-gray-600 mt-4 mb-2">
                        {school.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* <MapPin className="h-4 w-4 text-gray-400" /> */}
                      <span className="text-sm text-gray-600 mb-4">
                        {school.address}
                      </span>
                    </div>
                    <div className="w-full">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-900 hover:text-white"
                        onClick={() => handleViewClasses(school)}
                      >
                        <span className="text-white">View Classes</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage;
