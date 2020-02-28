export interface UceSubjects {
    subjects: string[];
}

// export interface UaceCombinations{ 
//     [index: number]: {    
//         code: string;
//         subjects: string[];
//         description: string;
//         careers: string[];
//     };

// }

export interface Combinations{
    combinations: UaceCombinations[];
}


export interface UaceCombinations{    
        code: string;
        subjects: string[];
        description: string;
        careers: string[];
        lastUpdated: string;
        source: string;
}