import { company1,company2, company3, company4 } from "../assets";


const   smapleInternships = [
  {
    _id: 2,
    image: company1,
    title: "Accenture",
    description: "This is Accenture internships",
    duration: 3,
    skills: "HTML, CSS, JavaScript",
  },
  {
    _id: 3, 
    image: company2,
    title: "Capgemini",
    description: "This is Capgemini internships",
    duration: 3,
    skills: "HTML, CSS, JavaScript, PHP",
  },
  {
    _id: 4,
    image: company3,
    title: "TCS",
    description: "This is TCS internships",
    duration: 3,
    skills: "HTML, CSS, JavaScript",
  },
  {
    _id: 5,
    image: company4,
    title: "Deloitte",
    description: "This is Deloitte internships",
    duration: 3,
    skills: "HTML, CSS, JavaScript, PHP",
    
  }
]

export const internshipDetails = [
  {
    program_id: 2,
    heading: "Accenture",
    description: "This is Accenture internships",
    duration: 3,
    skills: ["HTML", "CSS", "JavaScript", "PHP", "Python", "C++", "Skill Development", "Project Management"],
    keywords: ["HTML", "CSS", "JavaScript"],
    price: "2000",
    image: company1
  },
  {
    program_id: 3,
    heading: "Accenture",
    description: "This is Accenture internships",
    duration: 3,
    skills: ["HTML", "CSS", "JavaScript"],
    keywords: ["HTML", "CSS", "JavaScript"],
    price: "2000",
    image: company1
  },
  {
    program_id: 4,
    heading: "Accenture",
    description: "This is Accenture internships",
    duration: 3,
    skills: ["HTML", "CSS", "JavaScript"],
    keywords: ["HTML", "CSS", "JavaScript"],
    price: "2000",
    image: company1
  },
]

export const tasks = [
  {
    heading: "Task 1",
    description: "This is Accenture internships task 1",
    program_id: 2,
    skills: ["HTML", "CSS", "JavaScript"],
    level: "Easy",
  },
  {
    heading: "Task 2",
    description: "This is Accenture internships task 2",
    program_id: 2,
    skills: ["PHP"],
    level: "Intermediate",
  },
  {
    heading: "Task 3",
    description: "This is Accenture internships task 3",
    program_id: 2,
    skills: ["C++","Python"],
    level: "Hard",
  },

];

export default smapleInternships