import { redirect } from "next/navigation";

type Props = {};

const DashboardPage = async (props: Props) => {
  redirect("/dashboard/evaluators");
};

export default DashboardPage;
