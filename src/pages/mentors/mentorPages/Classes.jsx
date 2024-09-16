import apiClient from "config/apiClient";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import MentorSidebar from "../mentorSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, UserCheck, PenSquare, Loader2 } from "lucide-react";

const ClassItem = ({ classData }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-4 rounded-lg overflow-hidden">
      <div className="flex h-full mt-8">
        <div className="group">
          <Button
            variant=""
            className="h-full flex items-center bg-[#6A7B99] hover:bg-[#424f65]"
            onClick={() => navigate("/mentor/students/" + classData.id)}
          >
            <ArrowUpRight className="h-28 w-28 text-zinc-700 group-hover:text-white" />
          </Button>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <h3 className="text-3xl font-bold mb-2 text-[#34486B]">
            {classData.class_name}
          </h3>
          <div className="flex flex-row space-x-6 mt-4">
            <Button
              variant="link"
              className="p-0 h-auto text-[#3E70C2] hover:no-underline flex items-center text-lg underline"
              onClick={() => navigate("/mentor/attendances/" + classData.id)}
            >
              Attendance
            </Button>
            <Button
              variant="link"
              className="p-0 h-auto text-[#3E70C2] hover:no-underline flex items-center text-lg underline"
              onClick={() => navigate("/mentor/assignment/" + classData.id)}
            >
              Assignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SchoolClasses = () => {
  const { schoolId } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  const [classesData, setClassesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClassesData = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const classIds = searchParams.get("classes")?.split(",") || [];

        const classPromises = classIds.map((classId) =>
          apiClient.get(`/class/${classId}`)
        );

        const classResponses = await Promise.all(classPromises);
        const classesData = classResponses.map(
          (response) => response.data.data
        );

        setClassesData(classesData);
      } catch (error) {
        console.error("Error fetching classes data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch classes data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassesData();
  }, [schoolId, location.search, toast]);

  const filteredClasses = classesData.filter((classData) =>
    classData.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <MentorSidebar />
      <div className="flex-1 overflow-auto ml-56">
        <main className="p-14 w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Class selection
          </h1>
          {/* <div className="mb-6">
            <Input
              type="text"
              placeholder="Search"
              className="w-full bg-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-[#000000]" />
            </div>
          ) : filteredClasses.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredClasses.map((classData, index) => (
                <ClassItem key={index} classData={classData} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md"
            >
              <p className="font-bold">No Classes Found</p>
              <p>There are no classes matching your search.</p>
            </motion.div>
          )}
        </main>
      </div>
      <Toaster duration={1000} />
    </div>
  );
};

export default SchoolClasses;
