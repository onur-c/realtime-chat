import Chat from "../components/Chat";
import Form from "../components/Form";
import prisma, { getAuthSession } from "../lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

async function getMessages() {
  const messages = await prisma.message.findMany({
    select: {
      message: true,
      id: true,
      email: true,
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 50,
  });
  return messages;
}
const ChatPage = async () => {
  const session = await getAuthSession();
  const messages = await getMessages();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="relative flex flex-col min-h-screen mt-24 bg-purple-700">
      <Chat messages={messages} />
      <Form />
    </div>
  );
};

export default ChatPage;
