import { Announcement } from "./types";

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "LSEMS Portal Now Live",
    date: "2026-07-10",
    author: "Director Habibi Kabibi",
    category: "general",
    content: "We are proud to announce the launch of the official SAMS/LSEMS Documentation Portal. This portal contains all SOPs, roster information, and operational documentation in one centralized location. All personnel are expected to familiarize themselves with the portal."
  },
  {
    id: "2",
    title: "Updated Rank Structure",
    date: "2026-07-12",
    author: "Director Habibi Kabibi",
    category: "operations",
    content: "The SAMS rank structure and callsign system has been updated to reflect current organizational needs. All personnel should review the updated SOP for the latest rank hierarchy and assigned callsigns."
  },
  {
    id: "3",
    title: "MEDIVAC Requirements Updated",
    date: "2026-07-14",
    author: "Deputy Chief Mitchell",
    category: "training",
    content: "MEDIVAC pilot flight hour requirements have been reduced to 50 flight hours and Flight Medic field hour requirements to 100 field hours. Eligible personnel may apply through the FTD."
  },
  {
    id: "4",
    title: "Recruitment Now Open",
    date: "2026-07-15",
    author: "HR Department",
    category: "recruitment",
    content: "SAMS/LSEMS is currently accepting EMS appointments and walk-in candidates. Contact department members through Discord for more information or attend the next scheduled walk-in session."
  },
  {
    id: "5",
    title: "Minimum Duty Hours Updated",
    date: "2026-07-17",
    author: "Director Habibi Kabibi",
    category: "operations",
    content: "The minimum weekly duty hours requirement has been updated to 8 hours per week. All active personnel should ensure they meet this requirement to remain in good standing."
  },
];

export const departmentStats = [
  { label: "Active Personnel", value: 9, icon: "Users", color: "text-ems-blue" },
  { label: "On Duty Now", value: 3, icon: "Radio", color: "text-emerald-500" },
  { label: "Calls Today", value: 34, icon: "Phone", color: "text-ems-red" },
  { label: "Avg Response Time", value: "3.1m", icon: "Clock", color: "text-amber-500" },
  { label: "Active Units", value: 3, icon: "Ambulance", color: "text-violet-500" },
  { label: "MEDIVAC Status", value: "Ready", icon: "Plane", color: "text-cyan-500" },
];

export const recruitmentStatus = {
  isOpen: true,
  positionsAvailable: 10,
  currentApplications: 2,
  lastCohort: "July 2026",
  nextAcademy: "July 2026",
};

export const directorsMessage = {
  name: "Habibi Kabibi",
  title: "Director of SAMS · Chief of LSEMS",
  message: "Welcome to the official SAMS/LSEMS Documentation Portal. As we continue to grow and improve our services to the citizens of Los Santos, this portal serves as your centralized resource for all departmental policies, procedures, and training materials. Our mission is to provide the highest quality emergency medical care to every person in need.",
};
