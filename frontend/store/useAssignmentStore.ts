import { create } from "zustand";

type AssignmentState = {
    assignmentId : string | null;
    setAssignmentId : (id : string) => void;
}

export const useAssignmentState = create<AssignmentState>((set)=>({
    assignmentId : null,
    setAssignmentId : (id) => set({assignmentId : id})
}))
