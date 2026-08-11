// ---------- Role ----------

export const Role = {
  CANDIDATE: "CANDIDATE",
  EMPLOYER: "EMPLOYER",
  ADMIN: "ADMIN",
} as const;

export type TRole = (typeof Role)[keyof typeof Role];

// ---------- Job related enums ----------

export const JobType = {
  REMOTE: "REMOTE",
  ONSITE: "ONSITE",
  HYBRID: "HYBRID",
} as const;

export type TJobType = (typeof JobType)[keyof typeof JobType];

export const JobStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CLOSED: "CLOSED",
} as const;

export type TJobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export const ApplicationStatus = {
  APPLIED: "APPLIED",
  SHORTLISTED: "SHORTLISTED",
  INTERVIEW: "INTERVIEW",
  HIRED: "HIRED",
  REJECTED: "REJECTED",
} as const;

export type TApplicationStatus =
  (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

// ---------- User / Profile ----------

export type ICandidateProfile = {
  skills: string[];
  experience: string | null;
  bio: string | null;
  resumeUrl: string | null;
};

export type ICompanyProfile = {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  isVerified: boolean;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
  profilePhoto?: string | null;
  isVerified: boolean;
  candidateProfile?: ICandidateProfile | null;
  company?: ICompanyProfile | null;
};

// ---------- Category ----------

export type ICategory = {
  id: string;
  name: string;
  icon?: string | null;
  _count?: { jobs: number };
};

// ---------- Job ----------

export type IJob = {
  id: string;
  title: string;
  description: string;
  location: string;
  type: TJobType;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: string;
  deadline: string;
  status: TJobStatus;
  createdAt: string;
  company: { name: string; logo?: string | null };
  category?: { name: string };
};

// ---------- Application ----------

export type IApplication = {
  id: string;
  status: TApplicationStatus;
  appliedAt: string;
  job: {
    title: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    company: { name: string };
  };
};

// ---------- SavedJob ----------

export type ISavedJob = {
  id: string;
  job: {
    id: string;
    title: string;
    location: string;
    salaryMin: number;
    salaryMax: number;
    company: { name: string };
  };
};

export type IEmployerJob = {
  id: string;
  title: string;
  location: string;
  type: TJobType;
  status: TJobStatus;
  salaryMin: number;
  salaryMax: number;
  vacancy: number;
  deadline: string;
  createdAt: string;
  category: { name: string };
};

export type IApplicantRow = {
  id: string;
  status: TApplicationStatus;
  appliedAt: string;
  resumeUrl: string;
  coverLetter?: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
  };
  job: {
    id: string;
    title: string;
  };
};

export type IEmployerJobDetail = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: TJobType;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: string;
  vacancy: number;
  deadline: string;
  category: { id: string; name: string };
};

export type IAdminUser = {
  id: string;
  name: string;
  email: string;
  role: TRole;
  profilePhoto?: string | null;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: string;
};

export type IAdminJob = {
  id: string;
  title: string;
  location: string;
  type: TJobType;
  status: TJobStatus;
  salaryMin: number;
  salaryMax: number;
  createdAt: string;
  category: { name: string };
  company: { name: string; logo?: string | null };
};

export type IAdminCompany = {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  isVerified: boolean;
  createdAt: string;
  user: {
    email: string;
    isBanned: boolean;
    createdAt: string;
  };
  _count: {
    jobs: number;
    reviews: number;
  };
};

export type IJobDetail = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: TJobType;
  salaryMin: number;
  salaryMax: number;
  experienceLevel: string;
  vacancy: number;
  deadline: string;
  status: TJobStatus;
  createdAt: string;
  company: {
    id: string;
    name: string;
    logo?: string | null;
    description?: string | null;
    isVerified: boolean;
  };
  category: { id: string; name: string };
  relatedJobs: IJob[];
};

export type IPublicCompany = {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  isVerified: boolean;
  _count: { jobs: number };
};

export type ICompanyDetail = {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  website?: string | null;
  isVerified: boolean;
  createdAt: string;
  jobs: {
    id: string;
    title: string;
    status: TJobStatus;
    createdAt: string;
  }[];
  reviews: {
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
  }[];
  _count: { jobs: number; reviews: number };
};