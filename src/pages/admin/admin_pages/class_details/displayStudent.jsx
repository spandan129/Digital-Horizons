import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "config/apiClient";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const StudentList = ({ students, onEditStudent, onDeleteStudent }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const { toast } = useToast();

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsDialogOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingStudent({
      ...editingStudent,
      [name]: value,
    });
  };

  const handleUpdateStudent = async () => {
    try {
      const updatedStudent = { ...editingStudent };
      const updateStudent = {
        student_name: editingStudent.student_name,
        address: editingStudent.address,
        age: editingStudent.age,
        phone_num: editingStudent.phone_num,
        class_id: editingStudent.class_id,
        school_id: editingStudent.school_id,
        course_id: editingStudent.course_id || [],
      };
      console.log(updateStudent);

      console.log(updatedStudent);
      const response = await apiClient.put(
        `/student/${editingStudent.id}`,
        updateStudent
      );
      console.log(response);

      if (response.data.status === "success") {
        toast({
          title: "Success",
          description: "Student updated successfully",
        });
        onEditStudent();
        setIsDialogOpen(false);
      } else {
        toast({
          title: "Error",
          description: "Failed to update student. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "An error occurred while updating. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded shadow">
      <h2 className="text-2xl font-bold p-4 border-b">Students</h2>
      {students && students.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Avatar className="h-16 w-16">
                    {student.profile_picture_content ? (
                      <AvatarImage
                        src={`data:image/png;base64,${student.profile_picture_content}`}
                        alt={student.student_name}
                      />
                    ) : (
                      <AvatarFallback>
                        {student?.student_name?.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.student_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.phone_num}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEditStudent(student)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteStudent(student.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center mt-3">
          <p className="font-bold">No Students Found</p>
          <p>
            Start by adding new students to this class using the 'Add Student'
            button above.
          </p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-zinc-900 text-center">
              Edit Student
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Label
              htmlFor="student_name"
              className="text-sm font-medium text-gray-700"
            >
              Name
            </Label>
            <Input
              id="student_name"
              name="student_name"
              value={editingStudent?.student_name || ""}
              onChange={handleInputChange}
              className="mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <Label htmlFor="text" className="text-sm font-medium text-gray-700">
              Age
            </Label>
            <Input
              id="age"
              name="age"
              value={editingStudent?.age || ""}
              onChange={handleInputChange}
              className="mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <Label
              htmlFor="phone_num"
              className="text-sm font-medium text-gray-700"
            >
              Phone
            </Label>
            <Input
              id="phone_num"
              name="phone_num"
              value={editingStudent?.phone_num || ""}
              onChange={handleInputChange}
              className="mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={editingStudent?.address || ""}
              onChange={handleInputChange}
              className="mt-1 mb-0 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <DialogFooter className="mt-1">
            <Button
              onClick={handleUpdateStudent}
              className="bg-zinc-600 hover:bg-zinc-900 text-white font-bold py-2 px-4 rounded-full mx-auto"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster duration="1000" />
    </div>
  );
};

export default StudentList;
