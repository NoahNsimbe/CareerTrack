export interface Programs{
    recommended: Program[];
    non_recommended: Program[];
}

export interface Program{
    code: string;
    name: string;
    description: string;
    university: string;
    college: string;
    duration: number;
    time: string;
    reason? : string;
}

export interface UaceSubjects {
    uace_subjects: uaceSubjects[];
}

export interface uaceSubjects{
    code: string;
    name: string;
    category: string;
    language_subject: boolean;
    general_subject: boolean;
    abbr: string;
}