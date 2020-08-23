import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){

    const careers = {'careersList':['Accountant', 'Actor', 'Actuary', 'Administrative Assistant',
    'Agriculturist', 'Air Traffic Controller', 'Anesthesiologist', 
    'Animal Trainer', 'Arborist', 'Architect', 'Armed Forces Servicemember', 
    'Artist', 'Assistant', 'Astronaut', 'Astronomer', 'Athlete', 'Attendant', 
    'Audiologist', 'Author', 'Bartender', 'Beautician', 'Biologist', 'Botanist', 
    'Business Owner', 'Cafeteria Worker', 'Captain', 'Carpenter', 'Cashier', 
    'Certified Nurse Midwife', 'Certified Nursing Assistant', 'Chef', 
    'Chemist', 'Chief Executive Officer', 'Chief Financial Officer', 
    'Child Care Provider', 'Chiropractor', 'Civil Engineer', 'Clergy', 
    'Clerk', 'Coach', 'Commissioner', 'Construction Worker', 'Consultant', 
    'Cosmetologist', 'Counselor', 'Court Reporter', 'Deejay', 'Dental Hygienist', 
    'Dentist', 'Designer', 'Dietician', 'Director', 'Doctor', 'Driver', 
    'Ecologist', 'Economist', 'Editor', 'Educator', 'Electrical Worker', 
    'Emergency Medical Technician', 'Engineer', 'Esthetician', 'Farmer', 
    'Financial Advisor', 'Firefighter', 'Florist', 'Geologist', 'Graphic Designer', 
    'Guidance Counselor', 'Gynecologist', 'Hairdresser', 'Horticulturist', 
    'Human Resources', 'Immunologist', 'Insurance Agent', 'Interpreter', 
    'Investor', 'IT Professional', 'anitor', 'Jeweler', 'Journalist', 'Judge', 
    'Lawyer', 'Librarian', 'Maintenance Worker', 'Makeup Artist', 'Manager', 
    'Marketing', 'Massage Therapist', 'Mathematician', 'Medical Assistant', 
    'Meteorologist', 'Mortician', 'Musician', 'Maintenance Worker', 'Makeup Artist', 
    'Manager', 'Marketing', 'Massage Therapist', 'Mathematician', 'Medical Assistant', 
    'Meteorologist', 'Mortician', 'Musician', 'Obstetrician', 'Occupational Therapist', 
    'Optometrist', 'Paleontologist', 'Paralegal', 'Park Ranger', 'Pastor', 
    'Pathologist', 'Pediatrician', 'Personal Assistant', 'Personal Trainer', 
    'Pharmacist', 'Photographer', 'Physical Therapist', 'Physician', 'Physician’s Assistant', 
    'Physicist', 'Pilot', 'Police Officer', 'Politician', 'Postal Worker', 'President', 
    'Priest', 'Principal', 'Producer', 'Professor', 'Programmer', 'Proofreader', 
    'Proprietor', 'Psychiatric Nurse', 'Psychiatrist', 'Psychologist', 'Radiologist', 
    'Realtor', 'Repair Worker', 'Reporter', 'Retail Worker', 'Salesperson', 'Scientist', 
    'Secretary', 'Server', 'Singer', 'Small-Business Owner', 'Social Worker', 'Sociologist', 
    'Speech Therapist', 'Spy', 'Statistician', 'Stenographer', 'Surgeon', 'Surveyor', 
    'Tailor', 'Teacher', 'Technical Writer', 'Technician', 'Therapist', 'Tour Guide', 
    'Trainer', 'Translator', 'Travel Agent', 'Truck Driver', 'Underwriter', 'Veterinarian', 
    'Videographer', 'Virologist', 'Waitstaff', 'Web Designer', 'Writer', 'Zookeeper', 'Zoologist']};
      
    
    const uace_subjects = {
      'compulsory': 'General Paper',
      'subsidiaries':['Mathematics', 'Computer'],
      'optionals' :['Literature', 'Chemistry', 'Biology', 'Geography', 'Physics', 'Kiswahili', 'Mathematics', 'French',  'History']
  }; 
    
    const recom_combinations = {'combinations': [
      {'code':'PCM','lastUpdated':'September 24, 2019','source':'UNEB','subjects':['Physics', 'Chemistry', 'Mathematics'],'description':'PCM description','careers':['Mechanical Engineer', 'Electrical Engineer']},
      {'code':'BCM','lastUpdated':'September 24, 2019','source':'UNEB','subjects': ['Biology', 'Chemistry', 'Mathematics'],'description':'BCM description','careers':['Surgeon', 'Dentist']},
      {'code':'MEG','lastUpdated':'September 24, 2019','source':'UNEB','subjects': ['Economics', 'Geography', 'Mathematics'], 'description':'MEG description','careers':['Pilot', 'Land Surveyor']},
      {'code':'PEM','lastUpdated':'September 24, 2019','source':'UNEB','subjects': ['Physics', 'Economics', 'Mathematics'], 'description':'PEM description','careers':['Mechanical Engineer', 'Civil Engineer']},
      {'code':'HEG','lastUpdated':'September 24, 2019','source':'UNEB','subjects': ['History', 'Economics', 'Geography'], 'description':'HEG description','careers':['Social Activist', 'Politician']},
    ]};

    const recom_programs = {'programs': [
      {'name':'Bachelor of Science in Software Engineering','lastUpdated':'September 24, 2019','university':'Makerere University','source':'Makerere University', 'description':'The program teaches the fundamentals of Software Engineering','careers':['Software Engineer', 'Web Developer']},
      {'name':'Bachelor of Science in Computer Science','lastUpdated':'September 24, 2019','university':'Makerere University Jinja Campus','source':'Makerere University', 'description':'The program teaches the fundamentals of Computer Science','careers':['Application Programmer', 'Data Scientist']},
      {'name':'Bachelor of Science in Information Systems Technology','lastUpdated':'September 24, 2019','university':'Kyambogo University','source':'Kyambogo University', 'description':'The program teaches the fundamentals of Information Systems Technology','careers':['System Admisitrator', 'System Analyst']},
      {'name':'Bachelor of Science in Library and Information Systems','lastUpdated':'September 24, 2019','university':'Gulu University','source':'Gulu University', 'description':'The program teaches the fundamentals of Library and Information Systems','careers':['Libarian', 'Library Attendant']},
      {'name':'Bachelor of Science in Telecommunications','lastUpdated':'September 24, 2019','university':'Mbarara University','source':'Mbarara University', 'description':'The program teaches the fundamentals of Telecommunications','careers':['Communications Engineer', 'Telecom Engineer']},
    ]};

    const post_article = {'title':"articlepostedtitle", "body":"articlepostedbody",
    "datePosted":"articleposteddatePosted","articleLink":"articlepostedarticleLink","blogger":"articlepostedblogger"
  };

    const uce_subjects = {'subjects': ['CRE', 'IRE', 'Literature', 'TD', 'Agriculture', 'Luganda', 'Kiswahili', 'Computer Studies', 'French']};
    
// return{heroes};
  //  return {careers, articles};
    // return {careers, articles, uace_subjects, uce_subjects, heroes};

    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {heroes, uace_subjects, uce_subjects, 
            careers, recom_combinations, recom_programs,
            post_article};
  }
}



// const careers = [{ career: 'Accountant'}, { career: 'Actor'}, { career: 'Actuary'}, { career: 'Administrative Assistant' }, 
// { career: 'Agriculturist'}, { career: 'Air Traffic Controller'}, { career: 'Anesthesiologist' }, 
// { career: 'Animal Trainer'}, { career: 'Arborist'}, { career: 'Architect'}, { career: 'Armed Forces Servicemember' }, 
// { career: 'Artist'}, { career: 'Assistant'}, { career: 'Astronaut'}, { career: 'Astronomer'}, { career: 'Athlete'}, { career: 'Attendant' }, 
// { career: 'Audiologist'}, { career: 'Author'}, { career: 'Bartender'}, { career: 'Beautician'}, { career: 'Biologist'}, { career: 'Botanist' }, 
// { career: 'Business Owner'}, { career: 'Cafeteria Worker'}, { career: 'Captain'}, { career: 'Carpenter'}, { career: 'Cashier' }, 
// { career: 'Certified Nurse Midwife'}, { career: 'Certified Nursing Assistant'}, { career: 'Chef' }, 
// { career: 'Chemist'}, { career: 'Chief Executive Officer'}, { career: 'Chief Financial Officer' }, 
// { career: 'Child Care Provider'}, { career: 'Chiropractor'}, { career: 'Civil Engineer'}, { career: 'Clergy' }, 
// { career: 'Clerk'}, { career: 'Coach'}, { career: 'Commissioner'}, { career: 'Construction Worker'}, { career: 'Consultant' }, 
// { career: 'Cosmetologist'}, { career: 'Counselor'}, { career: 'Court Reporter'}, { career: 'Deejay'}, { career: 'Dental Hygienist' }, 
// { career: 'Dentist'}, { career: 'Designer'}, { career: 'Dietician'}, { career: 'Director'}, { career: 'Doctor'}, { career: 'Driver' }, 
// { career: 'Ecologist'}, { career: 'Economist'}, { career: 'Editor'}, { career: 'Educator'}, { career: 'Electrical Worker' }, 
// { career: 'Emergency Medical Technician'}, { career: 'Engineer'}, { career: 'Esthetician'}, { career: 'Farmer' }, 
// { career: 'Financial Advisor'}, { career: 'Firefighter'}, { career: 'Florist'}, { career: 'Geologist'}, { career: 'Graphic Designer' }, 
// { career: 'Guidance Counselor'}, { career: 'Gynecologist'}, { career: 'Hairdresser'}, { career: 'Horticulturist' }, 
// { career: 'Human Resources'}, { career: 'Immunologist'}, { career: 'Insurance Agent'}, { career: 'Interpreter' }, 
// { career: 'Investor'}, { career: 'IT Professional'}, { career: 'anitor'}, { career: 'Jeweler'}, { career: 'Journalist'}, { career: 'Judge' }, 
// { career: 'Lawyer'}, { career: 'Librarian'}, { career: 'Maintenance Worker'}, { career: 'Makeup Artist'}, { career: 'Manager' }, 
// { career: 'Marketing'}, { career: 'Massage Therapist'}, { career: 'Mathematician'}, { career: 'Medical Assistant' }, 
// { career: 'Meteorologist'}, { career: 'Mortician'}, { career: 'Musician'}, { career: 'Maintenance Worker'}, { career: 'Makeup Artist' }, 
// { career: 'Manager'}, { career: 'Marketing'}, { career: 'Massage Therapist'}, { career: 'Mathematician'}, { career: 'Medical Assistant' }, 
// { career: 'Meteorologist'}, { career: 'Mortician'}, { career: 'Musician'}, { career: 'Obstetrician'}, { career: 'Occupational Therapist' }, 
// { career: 'Optometrist'}, { career: 'Paleontologist'}, { career: 'Paralegal'}, { career: 'Park Ranger'}, { career: 'Pastor' }, 
// { career: 'Pathologist'}, { career: 'Pediatrician'}, { career: 'Personal Assistant'}, { career: 'Personal Trainer' }, 
// { career: 'Pharmacist'}, { career: 'Photographer'}, { career: 'Physical Therapist'}, { career: 'Physician'}, { career: 'Physician’s Assistant' }, 
// { career: 'Physicist'}, { career: 'Pilot'}, { career: 'Police Officer'}, { career: 'Politician'}, { career: 'Postal Worker'}, { career: 'President' }, 
// { career: 'Priest'}, { career: 'Principal'}, { career: 'Producer'}, { career: 'Professor'}, { career: 'Programmer'}, { career: 'Proofreader' }, 
// { career: 'Proprietor'}, { career: 'Psychiatric Nurse'}, { career: 'Psychiatrist'}, { career: 'Psychologist'}, { career: 'Radiologist' }, 
// { career: 'Realtor'}, { career: 'Repair Worker'}, { career: 'Reporter'}, { career: 'Retail Worker'}, { career: 'Salesperson'}, { career: 'Scientist' }, 
// { career: 'Secretary'}, { career: 'Server'}, { career: 'Singer'}, { career: 'Small-Business Owner'}, { career: 'Social Worker'}, { career: 'Sociologist' }, 
// { career: 'Speech Therapist'}, { career: 'Spy'}, { career: 'Statistician'}, { career: 'Stenographer'}, { career: 'Surgeon'}, { career: 'Surveyor' }, 
// { career: 'Tailor'}, { career: 'Teacher'}, { career: 'Technical Writer'}, { career: 'Technician'}, { career: 'Therapist'}, { career: 'Tour Guide' }, 
// { career: 'Trainer'}, { career: 'Translator'}, { career: 'Travel Agent'}, { career: 'Truck Driver'}, { career: 'Underwriter'}, { career: 'Veterinarian' }, 
// { career: 'Videographer'}, { career: 'Virologist'}, { career: 'Waitstaff'}, { career: 'Web Designer'}, { career: 'Writer'}, { career: 'Zookeeper'}, { career: 'Zoologist'}
//               ];
