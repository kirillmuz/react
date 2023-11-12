
export interface Education {
    id: number;
    title: string;
    description: string;
}

export interface WorkExperience {
    id: number;
    workedYears: number;
    description?: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    midleName?: string;
    email: string;
    phoneNumber: string;
    birthDate: string;
    educations: Array<Education>;
    workExpirience: Array<WorkExperience>;
}

export interface Department {
    id: number;
    name: string;
    description?: string;
    employees: Array<Employee>;
}