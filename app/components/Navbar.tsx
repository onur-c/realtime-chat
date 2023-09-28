import Image from "next/image";
import { getAuthSession } from "../lib/auth";
import LogoutButtons from "./LogoutButtons";

export default async function Navbar() {
  const session = await getAuthSession();

  return (
    <nav className="fixed top-0 left-0 flex items-end justify-between w-full px-10 py-5 bg-white">
      <h1 className="text-3xl font-extrabold">
        Runo<span className="text-purple-700">Chat</span>
      </h1>
      <div className="flex gap-4">
        {session?.user && (
          <div className="flex items-center gap-2">
            <p>{session.user.name}</p>
            <Image
              src={session.user.image!}
              alt="User Image"
              className="rounded-full outline outline-1 outline-primary/50"
              width={40}
              height={40}
            />
          </div>
        )}
        <LogoutButtons session={session} />
      </div>
    </nav>
  );
}
