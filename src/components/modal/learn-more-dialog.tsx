"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Upload } from "lucide-react";
import { useLearnMoreDialog } from "@/stores/learn-more-dialog";

interface LearnMoreDialogProps {}

export function LearnMoreDialog({}: LearnMoreDialogProps) {
  const { isOpen, closeLearnMore } = useLearnMoreDialog();

  return (
    <Dialog open={isOpen} onOpenChange={closeLearnMore}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>How ExamAI Works</DialogTitle>
          <DialogDescription>
            Discover how our AI-powered system transforms exam evaluation
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="answer-key">Answer Key</TabsTrigger>
            <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Upload Question Papers
                  </h3>
                  <p className="text-muted-foreground">
                    Simply upload your exam question papers in PDF or image
                    format. Our system supports multiple question types
                    including multiple choice, short answer, and essay
                    questions.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="answer-key">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Submit Answer Keys
                  </h3>
                  <p className="text-muted-foreground">
                    Provide answer keys for each question. You can set scoring
                    criteria, marking schemes, and acceptable variations for
                    answers. Our system understands context and semantic
                    similarities.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="evaluate">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI Evaluation</h3>
                  <p className="text-muted-foreground">
                    Our advanced AI evaluates student answers using natural
                    language processing. It understands context, handles partial
                    credit, and provides detailed feedback. The system learns
                    from your grading patterns to improve accuracy.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
