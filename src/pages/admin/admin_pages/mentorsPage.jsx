import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash, Plus, X, Check, Mail, Phone, MapPin, Eye } from "lucide-react";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "config/apiClient";
import { Label } from "@/components/ui/label"; // Make sure to import Label
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";

const MentorsPage = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [loading, isLoading] = useState(false);
  const [newMentor, setNewMentor] = useState({
    name: "",
    address: "",
    username: "",
    password: "",
    phone_num: "",
    profile_picture: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      isLoading(true);
      const response = await apiClient.get("/teacher");
      setMentors(response.data);
      isLoading(false);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      isLoading(true);
      await apiClient.delete(`/teacher/${id}`);
      fetchMentors();
      isLoading(false);
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    const requiredFields = [
      "name",
      "username",
      "password",
      "phone_num",
      "address",
    ];
    for (const field of requiredFields) {
      if (!newMentor[field].trim()) {
        formIsValid = false;
        errors[field] = `${field.replace("_", " ")} is required`;
      }
    }

    return formIsValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewMentor((prev) => ({ ...prev, profile_picture: files[0] }));
    } else {
      setNewMentor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    if (validateForm()) {
      try {
        isLoading(true);
        const formData = new FormData();
        Object.keys(newMentor).forEach((key) => {
          if (key === "profile_picture") {
            if (newMentor[key]) {
              formData.append(key, newMentor[key]);
            }
          } else {
            formData.append(key, newMentor[key]);
          }
        });
        await apiClient.post("/teacher", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchMentors();
        setNewMentor({
          name: "",
          address: "",
          username: "",
          password: "",
          phone_num: "",
          profile_picture: null,
        });
        isLoading(false);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error creating mentor:", error);
      }
    }
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleOpenDeleteDialog = (id) => {
    setMentorToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const confirmDelete = async () => {
    await handleDelete(mentorToDelete);
    handleCloseDeleteDialog();
  };

  return (
    <div className="flex h-screen bg-[#EAEFFB]">
      <AdminSidebar />
      <div className="ml-56 p-6 flex-1">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold mb-6">Mentors</h1>

          <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="mb-4  bg-[#34496C] hover:bg-[#223960]"
                  onClick={handleOpenDialog}
                >
                  <Plus className="mr-2" />
                  Add Mentors
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Mentor</DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={newMentor.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Address"
                      value={newMentor.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Email</Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Email"
                      value={newMentor.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={newMentor.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone_num">Phone Number</Label>
                    <Input
                      id="phone_num"
                      name="phone_num"
                      placeholder="Phone Number"
                      value={newMentor.phone_num}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile_picture">Profile Picture</Label>
                    <Input
                      id="profile_picture"
                      name="profile_picture"
                      type="file"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="bg-homeText hover:bg-homeText-hover"
                    onClick={handleCreate}
                  >
                    <Check /> Save
                  </Button>
                  <Button
                    className="bg-homeText hover:bg-homeText-hover"
                    onClick={handleCloseDialog}
                  >
                    <X /> Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this mentor?
            </DialogDescription>
            <DialogFooter>
              <Button
                className="bg-green-800 hover:bg-green-700"
                onClick={confirmDelete}
              >
                <Check /> Yes
              </Button>
              <Button
                className="bg-red-800 hover:bg-red-700"
                onClick={handleCloseDeleteDialog}
              >
                <X /> No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner /> {/* Display the spinner while loading */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors && mentors.length > 0 ? (
              mentors.map((mentor) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="bg-slate-900 p-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                          {mentor.profile_picture_content ? (
                            <AvatarImage
                              src={`data:image/png;base64,${mentor.profile_picture_content}`}
                              alt={mentor.name}
                            />
                          ) : (
                            <AvatarFallback className="text-2xl font-bold bg-white text-blue-500">
                              {mentor.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <CardTitle className="text-2xl text-white font-bold">
                          {mentor.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 bg-white">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <Mail className="w-5 h-5 mr-3 text-blue-500" />
                          <span>{mentor.username}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Phone className="w-5 h-5 mr-3 text-blue-500" />
                          <span>{mentor.phone_num}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                          <span>{mentor.address}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-between">
                        <Button
                          variant="outline"
                          className="flex-1 mr-2 bg-blue-50 hover:bg-blue-100 text-blue-600"
                          onClick={() =>
                            navigate(`/admin/mentor_profile/${mentor.id}`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </Button>
                        <Button
                          variant="destructive"
                          className="flex-1 ml-2"
                          onClick={() => handleOpenDeleteDialog(mentor.id)}
                        >
                          <Trash className="w-4 h-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-6 rounded-md text-center mt-3 shadow-md">
                  <p className="font-bold text-xl mb-2">No Mentors Found</p>
                  <p className="text-lg">
                    Start by adding new mentors using the 'Add Mentor' button
                    above.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsPage;
