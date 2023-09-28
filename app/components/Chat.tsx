"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Pusher from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

interface ChatProps {
  messages: {
    message: string;
    id: string;
    email: string | null;
    User: {
      image: string | null;
      name: string | null;
    } | null;
  }[];
}

export default function Chat({ messages }: ChatProps) {
  const [totalComments, setTotalComments] = useState(messages);
  const messageEndRef = useRef<HTMLInputElement>(null);

  const session = useSession();

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "eu",
    });

    var channel = pusher.subscribe("chat");
    channel.bind("hello", function (data: any) {
      const parsedComments = JSON.parse(data.message);
      setTotalComments((prev) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [totalComments]);

  return (
    <div className="w-[1200px] mx-auto px-12 py-24 ">
      <div className="flex flex-col gap-4">
        {totalComments &&
          totalComments.map((message) => {
            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-start w-full gap-4 h-fit",
                  message.email === session.data?.user?.email
                    ? ""
                    : "flex-row-reverse"
                )}
              >
                <Image
                  src={message.User?.image!}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full outline outline-primary/50"
                />
                <div className="flex flex-col gap-2 p-4 border rounded-sm shadow-lg border-secondary/20 bg-neutral-700">
                  <p className="text-xs text-secondary/60">
                    {message.User?.name}
                  </p>
                  <p className="break-all whitespace-normal text-secondary/90">
                    {message.message}
                  </p>
                </div>
              </div>
            );
          })}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
