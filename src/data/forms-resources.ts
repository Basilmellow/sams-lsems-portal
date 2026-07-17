import { Certificate } from "./types";

export const certificates: Certificate[] = [
  {
    id: "medical-certificate",
    title: "Medical Certificate",
    description: "Certifies completion of SAMS/LSEMS medical training and competency in emergency medical procedures.",
    icon: "Heart",
    requirements: [
      "Complete Cadet Academy",
      "Pass all medical examinations (80%+)",
      "Complete 20 supervised field hours",
      "FTO recommendation",
      "Pass final practical evaluation",
      "No active disciplinary actions",
    ],
  },
  {
    id: "medivac-certification",
    title: "MEDIVAC Certification",
    description: "Certifies qualification for air medical transport operations including flight medic duties.",
    icon: "Plane",
    requirements: [
      "Senior Paramedic rank or above",
      "Minimum 100 field duty hours",
      "Complete MEDIVAC training program",
      "Pass altitude physiology exam",
      "Pass practical flight evaluation",
      "Annual recertification",
    ],
  },
  {
    id: "fto-certification",
    title: "FTO Certification",
    description: "Certifies qualification as a Field Training Officer for mentoring and evaluating trainees.",
    icon: "BookOpen",
    requirements: [
      "Senior Paramedic rank or above",
      "Minimum 1 month at current rank",
      "Clean disciplinary record",
      "Pass teaching evaluation",
      "Command recommendation",
    ],
  },
];
