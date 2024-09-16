import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "config/apiClient";
import { useSchoolContext } from "context/AdminSchoolContext";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import ISidebar from "./sidebarSchool";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import { useNewSchoolContext } from "context/NewSchoolContext";

const initialClassState = {
  class_name: "",
  school_id: "",
};

const SchoolClasses = () => {
  const { schoolId } = useNewSchoolContext();

  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classResponse, setClassResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newClass, setNewClass] = useState({
    ...initialClassState,
    school_id: schoolId,
  });
  const [updatingClass, setUpdatingClass] = useState(null);
  const [deletingClass, setDeletingClass] = useState(null);

  const fetchClasses = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/class/school/${schoolId}`);
      const classesWithDetails = await Promise.all(
        response.data.data.map(async (classItem) => {
          const detailsResponse = await apiClient.get(
            `/class/school/${classItem.id}`
          );
          return {
            ...classItem,
            ...detailsResponse.data.data,
          };
        })
      );
      setClassResponse(classesWithDetails);
    } catch (error) {
      console.log("Error fetching classes", error);
      setClassResponse([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setNewClass((prev) => ({ ...prev, school_id: schoolId }));
    fetchClasses();
  }, [schoolId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value, school_id: schoolId }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatingClass((prev) => ({ ...prev, [name]: value }));
  };

  const sortedClasses = useMemo(() => {
    return Array.isArray(classResponse)
      ? [...classResponse].sort((a, b) =>
          a.class_name.localeCompare(b.class_name)
        )
      : [];
  }, [classResponse]);

  const addClass = async () => {
    try {
      const response = await apiClient.post("/class", newClass);
      if (response.data.status === "success") {
        setNewClass({ ...initialClassState, school_id: schoolId });
        toast({
          title: "Success",
          description: "Class Added Successfully",
        });
        fetchClasses();
        setIsAddDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to add class. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding class:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while adding the class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateClass = async () => {
    try {
      const response = await apiClient.put(`/class/${updatingClass.id}`, {
        class_name: updatingClass.class_name,
      });

      if (response.data.status === "success") {
        fetchClasses();
        toast({
          title: "Success",
          description: "Class Updated Successfully",
        });
        setIsUpdateDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update class. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating class:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while updating the class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteClass = async () => {
    try {
      const response = await apiClient.delete(`/class/${deletingClass.id}`);
      if (response.data.status === "success") {
        fetchClasses();
        toast({
          title: "Success",
          description: "Class Deleted Successfully",
        });
        setIsDeleteDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to delete class. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the class. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (classId) => {
    navigate(`/school/classes/${classId}`);
  };

  const handleViewAttendance = (classId) => {
    navigate(`/school/class/attendance/${classId}`);
  };

  const handleUpdateClick = (classItem) => {
    setUpdatingClass(classItem);
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = (classItem) => {
    setDeletingClass(classItem);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ISidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-64">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Class Management
            </h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="flex items-center">
                    <FaPlus className="mr-2" />
                    <span>Add Class</span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Class</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Label htmlFor="class_name">Class Name</Label>
                  <Input
                    id="class_name"
                    name="class_name"
                    value={newClass.class_name}
                    onChange={handleInputChange}
                  />
                </div>
                <DialogFooter className="mt-6">
                  <Button onClick={addClass}>Save Class</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <LoadingSpinner />
          ) : sortedClasses.length > 0 ? (
            <Table className="bg-white">
              <TableHeader className="text-white hover:text-white">
                <TableRow className="bg-[#34486B] hover:bg-[#34486B]">
                  <TableHead className="text-white text-center">
                    Class Name
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Students
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Courses
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Mentors
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="text-center">
                      {classItem.class_name}
                    </TableCell>
                    <TableCell className="text-center">
                      {classItem.students?.length || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {classItem.courses?.length || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {classItem.teachers?.length || 0}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => handleViewDetails(classItem.id)}
                        size="sm"
                        className="bg-[#34486B] hover:bg-[#203457] text-white"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleViewAttendance(classItem.id)}
                        variant="outline"
                        size="sm"
                        className="ml-2 border-[#34486B] text-[#34486B] hover:bg-[#34486B] hover:text-white"
                      >
                        View Attendance
                      </Button>
                      <Button
                        onClick={() => handleUpdateClick(classItem)}
                        variant="secondary"
                        size="sm"
                        className="ml-2 bg-[#EAEFFB] text-[#34486B] hover:bg-[#34486B] hover:text-white"
                      >
                        <FaEdit className="mr-2" /> Update
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(classItem)}
                        variant="destructive"
                        size="sm"
                        className="ml-2"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>
                No Classes Found. Start by adding a new class using the 'Add
                Class' button above.
              </p>
            </motion.div>
          )}

          <Dialog
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Class</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <Label htmlFor="update_class_name">Class Name</Label>
                <Input
                  id="update_class_name"
                  value={updatingClass?.class_name || ""}
                  onChange={handleUpdateInputChange}
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  onClick={updateClass}
                  className="bg-[#34486B] hover:bg-[#203457]"
                >
                  Update Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the class "
                  {deletingClass?.class_name}"? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  className="border-[#34486B] text-[#34486B] hover:bg-[#34486B] hover:text-white"
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={deleteClass}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default SchoolClasses;
