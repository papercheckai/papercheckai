export interface Result {
  studentId: string;
  result: Result2;
}

export interface Result2 {
  student_name: string;
  roll_no: number;
  class: string;
  subject: string;
  answers: Answer[];
}

export interface Answer {
  question_no: number;
  question: string;
  answer: string;
  score: number[];
  remarks: string;
  confidence: number;
}
