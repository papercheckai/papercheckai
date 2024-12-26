import { Prisma } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditEvaluator from "../modal/edit-evaluator";
import { DeleteEvaluatorDialog } from "../modal/delete-evaluator";

type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
  classes: Prisma.ClassGetPayload<{}>[];
  active?: boolean;
  onClick?: (
    evaluator: Prisma.EvaluatorGetPayload<{
      include: { class: true; evaluation: true };
    }>
  ) => void;
};

const EvaluatorCard = ({
  evaluator,
  classes,
  onClick,
  active = false,
}: Props) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-4" onClick={() => onClick?.(evaluator)}>
        <CardTitle className="text-base font-bold">{evaluator.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0" hidden={!active}>
        <div className="grid grid-cols-2 space-x-2">
          <EditEvaluator evaluator={evaluator} classes={classes} />
          <DeleteEvaluatorDialog evaluator={evaluator} />
        </div>
      </CardContent>
    </Card>
  );
};

export default EvaluatorCard;
