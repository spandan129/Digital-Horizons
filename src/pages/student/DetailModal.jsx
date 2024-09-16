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

const DetailModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer group">
          <p className="underline text-md text-[#3e70c2] ">Details</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto max-sm:text-sm">
        <DialogHeader>
          <DialogTitle>Course Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about the courses that you are currently
            taking.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="html_css">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="html_css">HTML/CSS</TabsTrigger>
            <TabsTrigger value="cybersecurity">Cybersecurity</TabsTrigger>
            <TabsTrigger value="scratch">Scratch</TabsTrigger>
          </TabsList>
          <TabsContent value="html_css">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2 max-sm:text-lg">
                HTML/CSS
              </h3>
              <p className="mb-2 max-sm:text-sm">
                HTML (Hypertext Markup Language) is the standard language used
                to create the structure and content of web pages, including
                elements like headings, paragraphs, images, and links. CSS
                (Cascading Style Sheets) is used to style and design the
                appearance of these web pages, controlling layout, color, fonts,
                and overall visual presentation.
              </p>
              <p className="mb-2">
                Artificial Intelligence (AI) can enhance web development by
                automating tasks, providing personalized user experiences, and
                offering intelligent features like chatbots and content
                recommendations. Prompting refers to guiding AI systems by
                giving them specific inputs or questions to generate desired
                responses or actions.
              </p>
              <h4 className="font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>HTML Basics: Structure, tags, and semantic markup</li>
                <li>CSS Fundamentals: Selectors, properties, and values</li>
                <li>Responsive Design: Media queries and flexible layouts</li>
                <li>Advanced CSS: Positioning, transitions, and animations</li>
                <li>HTML5 and CSS3: New features and enhancements</li>
                <li>Web Accessibility: Ensuring inclusivity and compliance</li>
                <li>
                  Performance Optimization: Minifying, caching, and image
                  optimization
                </li>
                <li>
                  Browser Compatibility: Cross-browser support and modernization
                </li>
              </ul>
            </motion.div>
          </TabsContent>
          <TabsContent value="cybersecurity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2">Cybersecurity</h3>
              <p className="mb-2">
                Cybersecurity is the practice of protecting systems, networks,
                and data from digital attacks, theft, and damage. It involves
                implementing technologies, processes, and controls to safeguard
                computer systems, networks, and sensitive information from cyber
                threats.
              </p>
              <p className="mb-2">
                The main aim of this module is to provide students with
                foundational knowledge in cybersecurity and introduce them to
                the potential of AI in this field. The course encourages
                creativity, logical thinking, and problem-solving skills by
                teaching students how to protect digital assets and understand
                cyber threats.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  Threat Analysis: Identifying and categorizing cyber threats
                </li>
                <li>
                  Network Security: Firewalls, VPNs, and intrusion detection
                  systems
                </li>
                <li>
                  Encryption: Symmetric and asymmetric encryption algorithms
                </li>
                <li>Access Control: User authentication and authorization</li>
                <li>
                  Incident Response: Preparation and mitigation strategies
                </li>
                <li>
                  Cloud Security: Protecting cloud infrastructure and data
                </li>
                <li>IoT Security: Securing connected devices and networks</li>
                <li>
                  Penetration Testing: Ethical hacking and vulnerability
                  assessment
                </li>
              </ul>

              <h4 className="text-lg font-semibold mt-4 mb-2">
                Ethical Considerations:
              </h4>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  Privacy and Data Protection: Balancing security needs with
                  individual rights
                </li>
                <li>
                  Legal Compliance: Adhering to data protection regulations
                </li>
                <li>
                  Transparency: Communicating security measures to stakeholders
                </li>
                <li>Responsible AI: Ethical use of AI in cybersecurity</li>
                <li>
                  Human Factors: Addressing psychological aspects of
                  cybersecurity awareness
                </li>
              </ul>
            </motion.div>
          </TabsContent>
          <TabsContent value="scratch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-4"
            >
              <h3 className="text-xl font-bold mb-2">Scratch</h3>
              <p className="mb-2">
                Scratch is a visual programming language developed by MIT,
                designed to introduce children and beginners to the world of
                coding. It uses a simple drag-and-drop interface, allowing users
                to create interactive stories, games, and animations.
              </p>
              <p className="mb-2">
                This course aims to equip students with basic programming skills
                in a fun and engaging way while also fostering creativity and
                logical thinking.
              </p>
              <h4 className="text-lg font-semibold mt-4 mb-2">Key Topics:</h4>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  Basic Programming Concepts: Sequences, loops, conditionals,
                  and variables
                </li>
                <li>
                  Event-Driven Programming: Responding to user interactions
                </li>
                <li>
                  Object-Oriented Programming: Creating and managing sprites and
                  scripts
                </li>
                <li>
                  Game Design: Developing interactive games and challenges
                </li>
                <li>Storytelling: Creating narratives and animations</li>
                <li>
                  Collaboration Tools: Sharing projects and collaborating with
                  others
                </li>
                <li>Debugging Techniques: Troubleshooting common issues</li>
                <li>
                  Advanced Features: Using blocks for complex algorithms and
                  data structures
                </li>
                <li>
                  Project Ideas: Applying Scratch to real-world problems and
                  creative pursuits
                </li>
              </ul>
              <h4 className="text-lg font-semibold mt-4 mb-2">
                AI Integration:
              </h4>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  Code Generation: AI-assisted creation of Scratch scripts
                </li>
                <li>
                  Project Analysis: AI-powered insights into student-created
                  projects
                </li>
                <li>
                  Personalized Learning Paths: AI-driven recommendations for
                  skill development
                </li>
              </ul>
            </motion.div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
