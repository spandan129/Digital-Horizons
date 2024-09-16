import ProtectedSchool from "@/utils/protectedSchoo";

import ClassAttendancePage from "pages/admin/admin_pages/school_pages/classAttendance";

import SchoolDashboard from "pages/school/schoolOverview";
import SchoolClasses from "pages/school/schoolClasses";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { NewSchoolContextProvider } from "context/NewSchoolContext";
import SchoolCoursesPage from "pages/school/coursesPage";
import NewSchoolCalendar from "pages/school/schoolCalendar";
import NewSchoolProfile from "pages/school/schoolProfile";
import SchoolClassDetails from "pages/school/schoolClassDetails";
import SchoolClassAttendance from "pages/school/schoolClassAttendance";

const SchoolRoutesProtection = (
  <NewSchoolContextProvider>
    <Routes>
      <Route element={<ProtectedSchool />}>
        {/* <Route path="/admin/" element={< />} /> */}
        <Route path="/school" element={<SchoolDashboard />} />
        <Route path="/school/classes" element={<SchoolClasses />} />
        <Route
          path="/school/classes/:classId"
          element={<SchoolClassDetails />}
        />
        <Route path="/school/courses" element={<SchoolCoursesPage />} />
        <Route path="/school/calendar" element={<NewSchoolCalendar />} />
        <Route path="/school/profile" element={<NewSchoolProfile />} />
        <Route
          path="/school/class/attendance/:classId"
          element={<SchoolClassAttendance />}
        />
      </Route>
    </Routes>
  </NewSchoolContextProvider>
);

export default SchoolRoutesProtection;
