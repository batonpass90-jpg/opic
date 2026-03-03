import { create } from 'zustand';

export type UserType = 'worker' | 'student' | null;

interface AppState {
  userType: UserType;
  setUserType: (type: UserType) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  examQuestions: string[];
  setExamQuestions: (questions: string[]) => void;
  feedback: string | null;
  setFeedback: (feedback: string | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  userType: null,
  setUserType: (type) => set({ userType: type }),
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  examQuestions: [],
  setExamQuestions: (questions) => set({ examQuestions: questions }),
  feedback: null,
  setFeedback: (feedback) => set({ feedback }),
  reset: () => set({ userType: null, currentStep: 0, examQuestions: [], feedback: null }),
}));
