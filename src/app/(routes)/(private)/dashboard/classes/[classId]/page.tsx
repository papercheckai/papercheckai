import ClassInformation from "@/components/class/ClassInformation";

type Props = { params: Promise<{ classId: string }> };

const ClassesPage = async ({ params }: Props) => {
  const classId = (await params).classId;
  return <ClassInformation classId={classId} />;
};

export default ClassesPage;
