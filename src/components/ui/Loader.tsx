import { Loader2 } from "lucide-react";

interface LoaderProps {
  text?: string;
}

export function Loader({ text = "Please wait" }: LoaderProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground">{text}</p>
      </div>
    </div>
  );
}
