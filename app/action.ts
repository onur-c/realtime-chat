"use server";

import prisma, { getAuthSession } from "./lib/auth";

export async function postData(formData: FormData) {
  "use server";

  const Pusher = require("pusher");

  const session = await getAuthSession();

  const message = formData.get("message");
  const email = session?.user?.email;

  const data = await prisma.message.create({
    data: {
      message: message as string,
      email,
    },
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true,
  });
  pusher.trigger("chat", "hello", {
    message: `${JSON.stringify(data)}\n\n`,
  });
}
