import { Subject } from "@/models/Subject";
import axios from "axios";
import { create } from "zustand";

interface SubjectsState {
    subjects: Subject[]
    getSubjects: () => Promise<void>
}

export const useSubjectsStore = create<SubjectsState>((set) => ({
    subjects: [],
    async getSubjects() {
        const subjects = await axios.get<Subject[]>('http://localhost:5000/api/subjects').then(res => res.data)

        console.log(subjects)

        set(state => ({ subjects }))
    }
})) 