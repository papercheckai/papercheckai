"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { UserMenu } from "./user-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { TabsEnums } from "@/type/enums";
import AddEvaluatorDialog from "../modal/add-evaluators";
import EvaluatorCard from "../evaluator/evaluator-card";
import { Evaluator, useEvaluatorStore } from "@/stores/evaluator-store";
import { useClassStore } from "@/stores/class-store";
import { Separator } from "../ui/separator";
import EvaluatorLimitCount from "../evaluator/evaluator-limit-count";
import Link from "next/link";

type Props = {};
export function AppSidebar({}: Props) {
  const { setActiveEvaluator, activeEvaluator, evaluators } = useEvaluatorStore(
    (state) => state
  );
  const classes = useClassStore((state) => state.classes);

  const pathname = usePathname();
  const router = useRouter();

  const handleEvaluatorSelect = (evaluator: Evaluator) => {
    setActiveEvaluator(evaluator);
    router.push(`/dashboard/evaluators`);
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={"/"}>
          <h1 className="text-xl">Papercheckai</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Tabs defaultValue={"evaluators"}>
            <TabsList className=" w-full">
              <TabsTrigger
                className="w-full"
                value={TabsEnums.Evaluators}
                onClick={() => router.push("/dashboard/evaluators")}
              >
                Evaluators
              </TabsTrigger>
            </TabsList>

            <TabsContent value={TabsEnums.Evaluators} className="space-y-2">
              {evaluators.map((e) => (
                <EvaluatorCard
                  onClick={handleEvaluatorSelect}
                  key={e.id}
                  evaluator={e}
                  classes={classes}
                  active={activeEvaluator?.id === e.id}
                />
              ))}
              <AddEvaluatorDialog />
            </TabsContent>
          </Tabs>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="px-4">
        <Separator orientation="horizontal" />
        <EvaluatorLimitCount />
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
