export interface UaceSubjects {
    compulsory: string;
    subsidiaries: string[];
    optionals: string[];
}

export interface UniveristyPrograms {
    name: string;
    description: string[];
    careers: string[];
    lastUpdated: string;
    source: string;
    university: string;
}


export interface Programs{
    programs: UniveristyPrograms[];
}