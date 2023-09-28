import { redirect } from "next/navigation";
import LogoutButtons from "./components/LogoutButtons";
import { getAuthSession } from "./lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  if (session) {
    redirect("/chat");
  }
  return (
    <>
      <div className="max-w-lg p-4 mx-auto space-y-8 text-black border rounded shadow-sm sm:p-10">
        <p className="text-3xl font-semibold text-center">Login to use chat</p>
        <div className="flex flex-col gap-2">
          <p className="text-center opacity-80">Login with GitHub</p>
          <LogoutButtons session={session} />
        </div>
      </div>
    </>
  );
}
