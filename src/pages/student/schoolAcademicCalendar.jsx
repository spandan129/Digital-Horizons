import React, { useState, useEffect } from "react";
import { useSchoolContext } from "context/SchoolContext";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import apiClient from "config/apiClient";
import { isAdmin } from "pages/authentication/util";
import { format, isSaturday } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import StudentSidebar from "./studentSidebar";
import { motion, AnimatePresence } from "framer-motion";
import App from "App";
import MobileSidebar from "./studentMobileSidebar";

const SchoolCalendar = () => {
  const [schoolId, setSchoolId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlyEvents, setMonthlyEvents] = useState([]);
  const [dailyEvents, setDailyEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [holidays, setHolidays] = useState([]);

  const fetchMonthlyEvents = async () => {
    try {
      const response = await apiClient.get(
        `calendar/${selectedDate.getFullYear()}/${schoolId}/${
          selectedDate.getMonth() + 1
        }`
      );
      const eventData = response.data.data.schools[0].events[0]?.days || [];
      setMonthlyEvents(eventData);
    } catch (error) {
      console.error("Error fetching monthly events:", error);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentId = localStorage.getItem("student_id");
        if (!studentId) {
          throw new Error("Student ID not found in localStorage");
        }
        const response = await apiClient.get(`/student/${studentId}`);
        const { data } = response.data;
        setSchoolId(data.school_id);
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudentData();
  }, []);

  const fetchDailyEvents = async () => {
    try {
      const response = await apiClient.get(
        `calendar/${selectedDate.getFullYear()}/${schoolId}/${
          selectedDate.getMonth() + 1
        }/${selectedDate.getDate()}`
      );
      const eventData =
        response.data.data.schools[0].events[0]?.days[0]?.events || [];
      setDailyEvents(eventData);
    } catch (error) {
      console.error("Error fetching daily events:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyEvents();
    fetchDailyEvents();
  }, [selectedDate, schoolId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    if (isAdmin()) {
      if (event.day) {
        const newDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          event.day
        );
        setSelectedDate(newDate);
      }
      setSelectedEvent(event);
      setIsOpen(true);
      setValue("event_name", event.event_name);
      setValue("event_description", event.event_description);
    }
  };

  const onSubmit = async (formData) => {
    if (!isAdmin()) return;

    const eventData = {
      year: selectedDate.getFullYear(),
      schools: [
        {
          school_id: schoolId,
          months: [
            {
              month: selectedDate.getMonth() + 1,
              days: [
                {
                  day: selectedDate.getDate(),
                  events: [
                    {
                      id: selectedEvent ? selectedEvent.id : "event_id",
                      event_name: formData.event_name,
                      event_description: formData.event_description,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const updatedData = {
      event_name: formData.event_name,
      event_description: formData.event_description,
    };

    try {
      if (selectedEvent) {
        await apiClient.put(
          `calendar/${selectedDate.getFullYear()}/${schoolId}/${
            selectedDate.getMonth() + 1
          }/${selectedDate.getDate()}/${selectedEvent.id}`,
          updatedData
        );
      } else {
        await apiClient.post("calendar", eventData);
      }
      fetchDailyEvents();
      fetchMonthlyEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }

    reset();
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const isHoliday = (date) => {
    return holidays.some(
      (holiday) => holiday.date === date.toISOString().split("T")[0]
    );
  };

  const getDayClass = (date) => {
    let classes = "w-8 h-8 rounded-full flex items-center justify-center";
    if (isSaturday(date)) {
      classes += " text-red-500 font-bold";
    }
    if (isHoliday(date)) {
      classes += " bg-red-100";
    }
    return classes;
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      days.push(
        <div
          key={day}
          className={`${getDayClass(
            date
          )} cursor-pointer hover:bg-blue-100 ml-2 `}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (<>
    <div className="flex h-screen bg-[#EAEFFB] ">
      <StudentSidebar />
      <MobileSidebar />
      <div className="min-h-screen p-8 w-full bg-[#EAEFFB] max-sm:p-4 max-sm:mt-8">
        <div className="max-w-7xl mx-auto ">
          <div className="grid grid-cols-5 gap-8 max-sm:grid-cols-1">
            <div className="col-span-2 space-y-8 max-sm:col-span-1">
              <Card className="h-[40vh] border-none max-sm:h-auto ">
                <CardContent className="p-6 max-sm:p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Button
                      variant="outline"
                      className="bg-[#EAEFFB]"
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth() - 1,
                            1
                          )
                        )
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold text-gray-700 max-sm:text-lg">
                      {format(selectedDate, "MMMM yyyy")}
                    </h2>
                    <Button
                      variant="outline"
                      className="bg-[#EAEFFB]"
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth() + 1,
                            1
                          )
                        )
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center max-sm:gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="font-medium text-gray-500 bg-[#EAEFFB] max-sm:text-xs"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>
              <Card className="h-[50vh] border-none max-sm:h-auto ">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700 ml-4 max-sm:text-lg max-sm:ml-2">
                    Events for {format(selectedDate, "MMMM d, yyyy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-4 overflow-y-auto max-sm:space-y-2"
                    style={{ maxHeight: "calc(45vh - 120px)" }}
                  >
                    <AnimatePresence>
                      {dailyEvents.length > 0 ? (
                        dailyEvents.map((event) => (
                          <div key={event.id}>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                              className={`p-4 rounded-lg cursor-pointer transition max-sm:p-2 ${
                                isSaturday(selectedDate)
                                  ? "border-red-300"
                                  : "border-gray-200"
                              }`}
                              onClick={() => handleEventClick(event)}
                            >
                              <h3
                                className={`text-lg font-medium max-sm:text-base ${
                                  isSaturday(selectedDate)
                                    ? "text-red-600"
                                    : "text-black"
                                }`}
                              >
                                {event.event_name}
                              </h3>
                              <p className="text-gray-600 max-sm:text-sm">
                                {event.event_description}
                              </p>
                              <div className="w-full h-[1px] bg-black mb-[-30px] mt-[30px] max-sm:mt-[15px] max-sm:mb-[-15px]"></div>
                            </motion.div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 ml-4 max-sm:ml-2 max-sm:text-sm">
                          No events for this day.
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                  {isAdmin() && (
                    <Button
                      className="mt-4 w-full max-sm:mt-2"
                      onClick={() => {
                        setSelectedEvent(null);
                        setIsOpen(true);
                      }}
                    >
                      Add Event
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3 max-sm:col-span-1 max-sm:h-screen bg-[#EAEFFB] max-sm:w-screen max-sm:ml-[-15px]  ">
              <Card className="lg:h-[94vh] border-none bg-[#EAEFFB] ">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold ml-4 text-gray-800 max-sm:text-xl max-sm:ml-2">
                    Monthly Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-4 overflow-y-auto max-sm:space-y-2 bg-[#EAEFFB]"
                    style={{ maxHeight: "calc(93vh - 100px)" }}
                  >
                    <AnimatePresence>
                      {monthlyEvents.flatMap((day) =>
                        day.events.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-lg bg-[#EAEFFB] transition max-sm:p-2 ${
                              isSaturday(
                                new Date(
                                  selectedDate.getFullYear(),
                                  selectedDate.getMonth(),
                                  day.day
                                )
                              )
                                ? "border-red-300"
                                : "border-gray-200"
                            }`}
                            onClick={() =>
                              handleEventClick({ ...event, day: day.day })
                            }
                          >
                            <div className="flex justify-between max-sm:flex-col bg-[#EAEFFB]">
                              <h3
                                className={`text-lg font-medium max-sm:text-base bg-[#EAEFFB] ${
                                  isSaturday(
                                    new Date(
                                      selectedDate.getFullYear(),
                                      selectedDate.getMonth(),
                                      day.day
                                    )
                                  )
                                    ? "text-red-600"
                                    : "text-black"
                                }`}
                              >
                                {event.event_name}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="mb-2 hover:bg-[#EAEFFB] bg-[#EAEFFB] max-sm:mb-1 max-sm:ml-[-10px] max-sm:text-xs"
                              >
                                {format(
                                  new Date(
                                    selectedDate.getFullYear(),
                                    selectedDate.getMonth(),
                                    day.day
                                  ),
                                  "MMMM d, yyyy"
                                )}
                              </Badge>
                            </div>
                            <p className="text-gray-600 max-sm:text-sm max-sm:mb-4">
                              {event.event_description}
                              
                            </p>
                            
                          </motion.div>
                          
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {isAdmin() && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px] max-sm:max-w-[90vw]">
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent ? "Edit Event" : "Add Event"}
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent
                    ? "Make changes to the event. Click save when you're done."
                    : "Fill out the event details. Click save when you're done."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4 max-sm:grid-cols-1">
                    <Label
                      htmlFor="event_name"
                      className="text-right max-sm:text-left"
                    >
                      Event Name
                    </Label>
                    <Input
                      id="event_name"
                      {...register("event_name")}
                      className="col-span-3 max-sm:col-span-1"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 max-sm:grid-cols-1">
                    <Label
                      htmlFor="event_description"
                      className="text-right max-sm:text-left"
                    >
                      Description
                    </Label>
                    <Input
                      id="event_description"
                      {...register("event_description")}
                      className="col-span-3 max-sm:col-span-1"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
    </>
  );
};

export default SchoolCalendar;
