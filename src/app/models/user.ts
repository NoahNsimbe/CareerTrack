export interface User {
    profilePic?: File;
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?:string;
    linkedIn?:any;
    faceBook?:any;
    careerInterests?:string[];
    uaceResults?:any;
    uceResults?:any;
    profession?:string;
    twitter?:any;
    password?:string;
}

export interface UserLogin{
    email?: string;
    userName?: string;
    password?:string;
}
