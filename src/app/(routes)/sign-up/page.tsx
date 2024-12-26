import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid place-items-center h-screen">
      <SignUp forceRedirectUrl={"/"} />
    </div>
  );
}
