
import { Skill } from "./types";

export const skillsData: Skill[] = [
  // Programming & Scripting
  {
    id: "python",
    name: "Python",
    category: "Programming & Scripting",
    description: "Versatile general-purpose language used for web development, data analysis, AI, and automation.",
    connections: ["javascript", "bash", "unity", "nodejs"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "Programming & Scripting",
    description: "Dynamic language that powers interactive web experiences and cross-platform applications.",
    connections: ["react", "reactnative", "python", "typescript", "nodejs", "npm"],
  },
  {
    id: "bash",
    name: "Bash",
    category: "Programming & Scripting",
    description: "Command line shell and scripting language for Unix-based systems and automation.",
    connections: ["linux", "python", "docker", "git"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Programming & Scripting",
    description: "Strongly typed programming language that builds on JavaScript with static type definitions.",
    connections: ["javascript", "react", "nodejs", "npm"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Programming & Scripting",
    description: "JavaScript runtime built on Chrome's V8 engine for building scalable network applications.",
    connections: ["javascript", "express", "npm", "typescript"],
  },
  
  // Cloud & DevOps
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & DevOps",
    description: "Microsoft's cloud computing platform for building, deploying, and managing applications and services.",
    connections: ["terraform", "docker", "okta", "prometheus", "ansible"],
  },
  {
    id: "terraform",
    name: "Terraform",
    category: "Cloud & DevOps",
    description: "Infrastructure as Code tool for provisioning and managing cloud infrastructure.",
    connections: ["azure", "docker", "ansible"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & DevOps",
    description: "Platform for developing, shipping, and running applications in containers.",
    connections: ["terraform", "azure", "bash", "cicd"],
  },
  {
    id: "git",
    name: "Git",
    category: "Cloud & DevOps",
    description: "Distributed version control system for tracking changes in source code during development.",
    connections: ["cicd", "bash", "npm"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "Cloud & DevOps",
    description: "Development practice that combines continuous integration and continuous deployment for rapid delivery.",
    connections: ["git", "docker", "ansible"],
  },
  {
    id: "ansible",
    name: "Ansible",
    category: "Cloud & DevOps",
    description: "Open-source software provisioning, configuration management, and application-deployment tool.",
    connections: ["terraform", "azure", "cicd"],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    category: "Cloud & DevOps",
    description: "Open-source monitoring and alerting toolkit designed for reliability and scalability.",
    connections: ["docker", "azure"],
  },
  
  // Networking & Security
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Networking & Security",
    description: "Network protocol analyzer for network troubleshooting and analysis.",
    connections: ["qualys", "automox", "siem"],
  },
  {
    id: "automox",
    name: "Automox",
    category: "Networking & Security",
    description: "Cloud-native endpoint management platform for patch management and system hygiene.",
    connections: ["wireshark", "okta", "siem"],
  },
  {
    id: "qualys",
    name: "Qualys",
    category: "Networking & Security",
    description: "Cloud-based security and compliance platform for identifying vulnerabilities.",
    connections: ["wireshark", "okta", "siem"],
  },
  {
    id: "okta",
    name: "Okta",
    category: "Networking & Security",
    description: "Identity management service for secure user authentication and authorization.",
    connections: ["qualys", "automox", "azure", "siem"],
  },
  {
    id: "siem",
    name: "SIEM",
    category: "Networking & Security",
    description: "Security Information and Event Management software for real-time analysis of security alerts.",
    connections: ["qualys", "automox", "wireshark", "okta"],
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
    connections: ["javascript", "reactnative", "unity", "typescript"],
  },
  {
    id: "reactnative",
    name: "React Native",
    category: "Mobile & Game Development",
    description: "Framework for building native mobile applications using React and JavaScript.",
    connections: ["react", "javascript"],
  },
  
  // Web Development
  {
    id: "express",
    name: "Express",
    category: "Web Development",
    description: "Fast, unopinionated, minimalist web framework for Node.js for building web applications and APIs.",
    connections: ["nodejs", "rest", "mongodb", "mysql"],
  },
  {
    id: "rest",
    name: "REST",
    category: "Web Development",
    description: "Architectural style for distributed hypermedia systems, commonly used for web APIs.",
    connections: ["express", "mongodb", "mysql"],
  },
  {
    id: "lighthouse",
    name: "Lighthouse Analytics",
    category: "Web Development",
    description: "Open-source automated tool for improving web page quality and performance.",
    connections: ["react", "npm"],
  },
  {
    id: "npm",
    name: "NPM",
    category: "Web Development",
    description: "Package manager for JavaScript and the world's largest software registry.",
    connections: ["javascript", "nodejs", "typescript", "git"],
  },
  
  // Databases
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Databases",
    description: "Cross-platform document-oriented NoSQL database program using JSON-like documents.",
    connections: ["express", "rest", "mysql"],
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Databases",
    description: "Open-source relational database management system based on SQL.",
    connections: ["express", "rest", "mongodb"],
  },
];
