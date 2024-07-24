export interface CreateUser {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
}

export interface CreatePosting {
    title: string;
    postingDesc: string;
    contactPerson: string;
    contactPersonEmail: string;
    skills?: string[];
    durationRange?: Date[];
    hoursPerWeek?: number;
}

export interface UserSkill {
    id: string;
    name: string;
    lvl: number;
}