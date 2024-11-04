export interface user {
  _id: string;
  organisation: string;
  userName: string;
  date: string;
  email: string;
  phoneNumber: string;
  status: "inactive" | "blacklisted" | "active" | "pending";
  withLoan: boolean;
  withSavings: boolean;
  userTier: number;
  bankDetails: {
    bankName: string;
    accountNumber: number;
  };
  uniqueId: string;
  userDetails: UserDetails;
}
// Social media link structure
export interface Social {
  name: string;
  link: string;
}

// Guarantor details structure
export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

// User details structure
export interface UserDetails {
  userTier: number;
  fullName: string;
  phoneNumber: string;
  accountBalance: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  socials: Social[];
  guarantors: Guarantor[];
}

// Main user data structure returned from the API
export interface UserData {
  userDetails: UserDetails;
}

// Response structure for API
export interface ApiResponse {
  message: string;
  data: UserData;
}
