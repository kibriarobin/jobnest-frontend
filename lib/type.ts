// ---------- Role ----------

export const Role = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  ADMIN: 'ADMIN',
} as const;

export type TRole = (typeof Role)[keyof typeof Role];

// ---------- Job related enums ----------

export const JobType = {
  REMOTE: 'REMOTE',
  ONSITE: 'ONSITE',
  HYBRID: 'HYBRID',
} as const;

export type TJobType = (typeof JobType)[keyof typeof JobType];

export const JobStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CLOSED: 'CLOSED',
} as const;

export type TJobStatus = (typeof JobStatus)[keyof typeof JobStatus];

export const ApplicationStatus = {
  APPLIED: 'APPLIED',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW: 'INTERVIEW',
  HIRED: 'HIRED',
  REJECTED: 'REJECTED',
} as const;

export type TApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];

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