import { PersonnelMember } from "./types";

export const personnel: PersonnelMember[] = [
  // Chief / Deputy Chief
  {
    id: "1",
    name: "Habibi Kabibi",
    rank: "Chief",
    rankShort: "Chief",
    callsign: "XE-100",
    joinDate: "2024-01-15",
    lastPromoDemoDate: "2025-06-01",
    promoDemo: "Promoted to Chief",
    jobStatus: "active",
    post: "High Command",
    ftd: true,
    bikeUnit: true,
    medivac: true,
    fto: true,
    discordTag: "1133639998470623272"
  },
  {
    id: "2",
    name: "Max Royal",
    rank: "Deputy Chief",
    rankShort: "DC",
    callsign: "XE-101",
    joinDate: "2026-06-15",
    lastPromoDemoDate: "2026-06-15",
    promoDemo: "Promoted to Deputy Chief",
    jobStatus: "loa",
    post: "High Command",
    ftd: true,
    bikeUnit: true,
    medivac: true,
    fto: true,
    discordTag: "1058987142757494928"
  },

  // Resident
  {
    id: "3",
    name: "James Walker",
    rank: "Resident",
    rankShort: "R",
    callsign: "R-600",
    joinDate: "2026-06-16",
    lastPromoDemoDate: "2026-07-13",
    promoDemo: "Promoted to Resident",
    jobStatus: "active",
    post: "Medic",
    ftd: false,
    bikeUnit: false,
    medivac: false,
    fto: false,
    discordTag: "646331398000476160"
  },

  // Advanced EMT
  {
    id: "4",
    name: "Glenn Walker",
    rank: "Advanced EMT",
    rankShort: "AE",
    callsign: "AE-651",
    joinDate: "2026-07-12",
    lastPromoDemoDate: "2026-07-12",
    promoDemo: "Promoted to Advanced EMT",
    jobStatus: "inactive",
    post: "Medic",
    ftd: false,
    bikeUnit: false,
    medivac: false,
    fto: false,
    discordTag: "712927120581722142"
  },

  // EMT
  {
    id: "5",
    name: "Rollexx Lynxx",
    rank: "EMT",
    rankShort: "E",
    callsign: "E-700",
    joinDate: "2026-07-12",
    lastPromoDemoDate: "2026-07-12",
    promoDemo: "Promoted to EMT",
    jobStatus: "active",
    post: "Medic",
    ftd: false,
    bikeUnit: false,
    medivac: false,
    fto: false,
    discordTag: "1191418402502344804"
  },

  // Student
  {
    id: "6",
    name: "Theeran Asher",
    rank: "Student",
    rankShort: "ST",
    callsign: "ST-900",
    joinDate: "2026-07-17",
    lastPromoDemoDate: "2026-07-17",
    promoDemo: "Joined as Student",
    jobStatus: "active",
    post: "Medic in Training",
    ftd: false,
    bikeUnit: false,
    medivac: false,
    fto: false,
    discordTag: "946115829404164146"
  },

  // EMT
  {
    id: "7",
    name: "Shannu U",
    rank: "EMT",
    rankShort: "E",
    callsign: "E-701",
    joinDate: "2026-07-18",
    lastPromoDemoDate: "2026-07-18",
    promoDemo: "Joined As EMT",
    jobStatus: "active",
    post: "Medic",
    ftd: false,
    bikeUnit: false,
    medivac: false,
    fto: false,
    discordTag: "798228964686299208"
  }
];
export const rankHierarchy = [
  { rank: "Chief", emoji: "👑", category: "High Command", color: "#d97706" },
  { rank: "Deputy Chief", emoji: "⭐", category: "High Command", color: "#f59e0b" },
  { rank: "Captain", emoji: "🛡", category: "Medic Command", color: "#2563eb" },
  { rank: "Surgeon", emoji: "🩺", category: "Medic Command", color: "#7c3aed" },
  { rank: "Senior Doctor", emoji: "👨‍⚕️", category: "Medic Supervisor", color: "#6366f1" },
  { rank: "Doctor", emoji: "👨‍⚕️", category: "Medic Supervisor", color: "#4f46e5" },
  { rank: "Junior Doctor", emoji: "🩺", category: "Medic Supervisor", color: "#8b5cf6" },
  { rank: "Senior Paramedic", emoji: "🚑", category: "Medic", color: "#dc2626" },
  { rank: "Paramedic", emoji: "🚑", category: "Medic", color: "#ef4444" },
  { rank: "Resident", emoji: "🩹", category: "Medic", color: "#f97316" },
  { rank: "Advanced EMT", emoji: "💉", category: "Medic", color: "#ec4899" },
  { rank: "EMT", emoji: "💉", category: "Medic", color: "#f472b6" },
  { rank: "Student", emoji: "🎓", category: "Medic in Training", color: "#6b7280" },
];

export const postOptions = [
  "High Command",
  "Medic High Command",
  "Medic Command",
  "Medic Supervisor",
  "Medic",
  "Medic in Training",
];

export const jobStatusOptions = ["active", "inactive", "loa"] as const;
