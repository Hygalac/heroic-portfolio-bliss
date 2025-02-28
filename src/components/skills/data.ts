
import { Skill } from "./types";

export const skillsData: Skill[] = [
  // Programming & Scripting
  {
    id: "python",
    name: "Python",
    category: "Programming & Scripting",
    description: "Versatile general-purpose language used for web development, data analysis, AI, and automation.",
    connections: ["javascript", "bash", "unity"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming & Scripting",
    description: "Dynamic language that powers interactive web experiences and cross-platform applications.",
    connections: ["react", "reactnative", "python"],
  },
  {
    id: "bash",
    name: "Bash",
    category: "Programming & Scripting",
    description: "Command line shell and scripting language for Unix-based systems and automation.",
    connections: ["linux", "python", "docker"],
  },
  
  // Cloud & DevOps
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & DevOps",
    description: "Microsoft's cloud computing platform for building, deploying, and managing applications and services.",
    connections: ["terraform", "docker", "okta"],
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Cloud & DevOps",
    description: "Infrastructure as Code tool for provisioning and managing cloud infrastructure.",
    connections: ["azure", "docker"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & DevOps",
    description: "Platform for developing, shipping, and running applications in containers.",
    connections: ["terraform", "azure", "bash"],
  },
  
  // Networking & Security
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Networking & Security",
    description: "Network protocol analyzer for network troubleshooting and analysis.",
    connections: ["qualys", "automox"],
  },
  {
    id: "automox",
    name: "Automox",
    category: "Networking & Security",
    description: "Cloud-native endpoint management platform for patch management and system hygiene.",
    connections: ["wireshark", "okta"],
  },
  {
    id: "qualys",
    name: "Qualys",
    category: "Networking & Security",
    description: "Cloud-based security and compliance platform for identifying vulnerabilities.",
    connections: ["wireshark", "okta"],
  },
  {
    id: "okta",
    name: "Okta",
    category: "Networking & Security",
    description: "Identity management service for secure user authentication and authorization.",
    connections: ["qualys", "automox", "azure"],
  },
  
  // Operating Systems
  {
    id: "linux",
    name: "Linux (Ubuntu)",
    category: "Operating Systems",
    description: "Open-source operating system built on the Linux kernel, known for stability and security.",
    connections: ["bash", "docker"],
  },
  
  // Mobile & Game Development
  {
    id: "unity",
    name: "Unity",
    category: "Mobile & Game Development",
    description: "Cross-platform game engine for developing 2D and 3D games and interactive content.",
    connections: ["python", "react"],
  },
  {
    id: "react",
    name: "React",
    category: "Mobile & Game Development",
    description: "JavaScript library for building user interfaces, particularly single-page applications.",
    connections: ["javascript", "reactnative", "unity"],
  },
  {
    id: "reactnative",
    name: "React Native",
    category: "Mobile & Game Development",
    description: "Framework for building native mobile applications using React and JavaScript.",
    connections: ["react", "javascript"],
  },
];
