import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid place-items-center h-screen">
      <SignIn />
    </div>
  );
}
