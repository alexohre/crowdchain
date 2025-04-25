export interface CreatorFormData {
  fullName: string;
  email: string;
  walletAddress: string;
  profilePicture: File | null;
  professionalTitle: string;
  linkedIn: string;
  website: string;
  projectCategory: string;
  projectDescription: string;
  verificationDocs: File[];
  termsAgreed: boolean;
}
