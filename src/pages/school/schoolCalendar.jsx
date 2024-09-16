import React, { useState, useEffect } from "react";
import ISidebar from "./sidebarSchool";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import apiClient from "config/apiClient";
import { isAdmin, isSchool } from "pages/authentication/util";
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
import { motion, AnimatePresence } from "framer-motion";
import { useNewSchoolContext } from "context/NewSchoolContext";

const NewSchoolCalendar = () => {
  const { schoolId } = useNewSchoolContext();
  console.log("The school id is", schoolId);
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
    if (isAdmin() || isSchool()) {
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
    if (!isSchool()) return;

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
        await apiClient.post("/calendar", eventData);
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
          className={`${getDayClass(date)} cursor-pointer hover:bg-blue-100 `}
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex h-screen bg-white">
      <ISidebar />
      <div className="min-h-screen p-8 w-full bg-white ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 space-y-8">
              <Card className="h-[40vh] border-none">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <Button
                      variant="outline"
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
                    <h2 className="text-xl font-semibold text-gray-700">
                      {format(selectedDate, "MMMM yyyy")}
                    </h2>
                    <Button
                      variant="outline"
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
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="font-medium text-gray-500 bg-white"
                        >
                          {day}
                        </div>
                      )
                    )}
                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>
              <Card className="h-[50vh] border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-700">
                    Events for {format(selectedDate, "MMMM d, yyyy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-4 overflow-y-auto"
                    style={{ maxHeight: "calc(45vh - 120px)" }}
                  >
                    <AnimatePresence>
                      {dailyEvents.length > 0 ? (
                        dailyEvents.map((event) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition ${
                              isSaturday(selectedDate)
                                ? "border-red-300"
                                : "border-gray-200"
                            }`}
                            onClick={() => handleEventClick(event)}
                          >
                            <h3
                              className={`text-lg font-medium ${
                                isSaturday(selectedDate)
                                  ? "text-red-600"
                                  : "text-black"
                              }`}
                            >
                              {event.event_name}
                            </h3>
                            <p className="text-gray-600">
                              {event.event_description}
                            </p>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-gray-500">No events for this day.</p>
                      )}
                    </AnimatePresence>
                  </div>
                  {isSchool() && (
                    <Button
                      className="mt-4 w-full"
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
            <div className="col-span-3">
              <Card className="h-[94vh] border-none">
                <CardHeader>
                  {" "}
                  <CardTitle className="text-2xl font-semibold text-gray-800">
                    Monthly Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="space-y-4 overflow-y-auto"
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
                            className={`p-4 rounded-lg bg-white border  transition ${
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
                            <div className="flex justify-between ">
                              <h3
                                className={`text-lg font-medium ${
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
                              <Badge variant="secondary" className="mb-2">
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
                            <p className="text-gray-600">
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

        {isSchool() && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent ? "Update Event" : "Add Event"}
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent
                    ? "Make changes to the event. Click save when you're done."
                    : "Fill out the event details. Click save when you're done."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event_name" className="text-right">
                      Event Name
                    </Label>
                    <Input
                      id="event_name"
                      {...register("event_name")}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event_description" className="text-right">
                      Description
                    </Label>
                    <Input
                      id="event_description"
                      {...register("event_description")}
                      className="col-span-3"
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
  );
};

export default NewSchoolCalendar;
