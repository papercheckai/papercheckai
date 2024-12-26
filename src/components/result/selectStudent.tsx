import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Result } from "@/types/evaluation-result";

type Props = {
  results: Result[];
  selectedStudent: string | undefined;
  setSelectedStudent: (studentId: string | null) => void;
};

const SelectStudent = ({
  results,
  setSelectedStudent,
  selectedStudent,
}: Props) => {
  return (
    <Select onValueChange={setSelectedStudent} value={selectedStudent}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Student" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Student</SelectLabel>
          {results?.map((result) => (
            <SelectItem key={result.studentId} value={result.studentId}>
              {result.result.roll_no + ". " + result.result.student_name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectStudent;
