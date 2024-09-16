import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight } from "lucide-react";

const EnrolledCoursesModal = ({ coursesData }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer group">
          <h2 className="text-subheading font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
            Enrolled Courses
          </h2>
          <ArrowUpRight className="ml-2 h-6 w-6 group-hover:text-gray-700 transition-colors" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Enrolled Courses</DialogTitle>
          <DialogDescription>
            Detailed information about your enrolled courses.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="why">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="why">Introduction</TabsTrigger>
            <TabsTrigger value="vision">Our Vision</TabsTrigger>
            <TabsTrigger value="approach">Our Approach</TabsTrigger>
          </TabsList>
          <TabsContent value="why">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">
                Introduction to this program
              </h3>
              <p>
                In today's rapidly evolving digital economy, it is crucial to
                equip our students with the skills they need to navigate and
                excel in this environment. Digital literacy, much like
                traditional literacy and numeracy, has become an essential
                skill. The sooner students begin developing these abilities, the
                better prepared they will be for the challenges and
                opportunities ahead.
              </p>
              <p>
                The current IT education curriculum, while comprehensive, may
                not fully address the demands of the changing global digital
                landscape. With this vision in mind, we have introduced a
                mentorship programme tailored specifically for young students.
                This programme is designed not as a traditional classroom
                experience but as a hands-on, practical approach to becoming
                digitally skilled and literate.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent value="vision">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">Our Vision and Ambition</h3>
              <p>
                Our ambition is to equip students with the tools they need to
                succeed in a digital world. By starting young, we ensure that
                they build a strong foundation of digital literacy that will
                serve them throughout their educational journey and beyond.
              </p>
              <p>
                We invite students and parents to embrace this opportunity to
                gain invaluable skills that will be crucial in the years to
                come. Together, we can pave the way for a future where our youth
                are not only prepared to face the digital landscape but are also
                empowered to excel within it and easily progress towards being
                an entrepreneur or making a career in it.
              </p>
            </motion.div>
          </TabsContent>
          <TabsContent value="approach">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-lg font-semibold">Learning by Doing</h3>
              <p>
                Our philosophy is rooted in the belief that students learn best
                by doing. Therefore, our programme, which is run in a more
                workshop style, focuses on engaging students in skill
                development activities right from the start. This approach is
                more akin to teaching how to play the piano or the guitar rather
                than teaching subjects like physics or chemistry in a
                traditional classroom setting.
              </p>
              <h3 className="text-lg font-semibold">Why a workshop?</h3>
              <p>
                We have chosen to run this in a workshop style because we aim to
                foster an environment of active participation and practical
                learning. The workshops will be facilitated by young, skilled
                mentors with whom the students can relate well. Rather than
                teaching theoretical concepts, we emphasise real-world
                applications and interactive experiences aimed towards solving a
                problem. Students will be immersed in a variety of modules
                designed to develop essential digital skills in a dynamic and
                supportive setting.
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnrolledCoursesModal;
