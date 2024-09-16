import { Route, Routes } from "react-router-dom";
import SchoolOverview from "pages/admin/admin_pages/school_pages/schoolOverview";
import SchoolProfile from "pages/admin/admin_pages/school_pages/schoolProfile";
import { SchoolContextProvider } from "context/AdminSchoolContext";
import SchoolsPage from "pages/admin/admin_pages/schoolsPage";
import SchoolClasses from "pages/admin/admin_pages/school_pages/schoolClasses";
import SchoolCourses from "pages/admin/admin_pages/school_pages/schoolCourses";
import ClassDetails from "pages/admin/admin_pages/class_details/classDetails";
import SchoolCalendar from "pages/admin/admin_pages/school_pages/schoolCalendar";
import ProtectedAdmin from "@/utils/protectedAdmin";
import ClassAttendancePage from "pages/admin/admin_pages/school_pages/classAttendance";

const SchoolRoutes = (
  <SchoolContextProvider>
    <Routes>
      <Route element={<ProtectedAdmin />}>
        <Route path="/admin/schools" element={<SchoolsPage />} />
        <Route path="/admin/schools/overview" element={<SchoolOverview />} />
        <Route path="/admin/schools/classes" element={<SchoolClasses />} />
        <Route
          path="/admin/schools/classes/:classId"
          element={<ClassDetails />}
        />
        <Route path="/admin/schools/courses" element={<SchoolCourses />} />
        <Route path="/admin/schools/calendar" element={<SchoolCalendar />} />
        <Route path="/admin/schools/profile" element={<SchoolProfile />} />
        <Route
          path="/admin/class/attendance/:classId"
          element={<ClassAttendancePage />}
        />
      </Route>
    </Routes>
  </SchoolContextProvider>
);

export default SchoolRoutes;
