export interface Combinations{
    combinations: { code : string, subjects: string[] }[];
   // combination: any;
}

export interface UceSubjects {
    uce_subjects: uceSubjects[];
}

export interface uceSubjects{
    code: string;
    name: string;
    category: string;
}
