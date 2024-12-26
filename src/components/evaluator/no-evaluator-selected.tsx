import { FileQuestion } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import AddEvaluatorDialog from "../modal/add-evaluators";

const NoEvaluatorSelected = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-muted p-3">
              <FileQuestion className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-semibold">No Evaluator Selected</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Please select an evaluator from the sidebar to view their details
            and assignments.
          </p>
          <AddEvaluatorDialog />
        </CardContent>
      </Card>
    </div>
  );
};

export default NoEvaluatorSelected;
