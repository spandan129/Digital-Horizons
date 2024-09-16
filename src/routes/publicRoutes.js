import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "pages/authentication/login";
import LandingPage from "../pages/landingPage";
import ContactUs from "pages/contactus/contactus";
import AdminLogin from "pages/authentication/adminlogin";
import MentorLogin from "pages/authentication/mentorlogin";
import StudentDashboard from "pages/student/studentDashboard";
import TestLogin from "pages/authentication/onetimelogin";

const PublicRoutes = [
  <Routes>
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="auth" path="/login" element={<SignInPage />} />,
    <Route key="auth" path="/mlogin" element={<MentorLogin />} />,
    <Route key="auth" path="/admin/login" element={<AdminLogin />} />,
    {/* <Route key="aboutus" path="/about" element={<AboutUs />} />, */}
    {/* <Route key="courses" path="/courses" element={<Courses />} />, */}
    <Route key="contact" path="/contact" element={<ContactUs />} />
    <Route key="test" path="/test" element={<TestLogin />} />
  </Routes>,
];

export default PublicRoutes;
