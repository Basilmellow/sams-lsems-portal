export interface SOPChapter {
  id: string;
  title: string;
  category: string;
  icon: string;
  lastUpdated: string;
  content: string;
}

export interface PersonnelMember {
  id: string;
  name: string;
  rank: string;
  rankShort: string;
  callsign: string;
  joinDate: string;
  lastPromoDemoDate: string;
  promoDemo: string;
  jobStatus: "active" | "inactive" | "loa";
  post: string;
  ftd: boolean;
  bikeUnit: boolean;
  medivac: boolean;
  fto: boolean;
  discordTag: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  author: string;
  category: "general" | "training" | "operations" | "recruitment" | "urgent";
  content: string;
}

export interface StatCard {
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  color: string;
}

export interface MenuItem {
  label: string;
  href: string;
  icon: string;
  children?: MenuItem[];
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  icon: string;
}
