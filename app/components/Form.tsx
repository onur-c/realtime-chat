"use client";

import { SendHorizontal } from "lucide-react";
import { postData } from "../action";
import { Button } from "./ui/button";
import { useState } from "react";

const Form = () => {
  const [input, setInput] = useState("");
  return (
    <form
      action={async (formData) => {
        await postData(formData);
        setInput("");
      }}
      className="fixed bottom-0 w-5/6 p-4 mb-1 -translate-x-1/2 bg-white rounded left-1/2"
    >
      <div className="flex items-center">
        <input
          name="message"
          placeholder="Type a message"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-2 py-4 outline-none"
        />
        <Button variant={"outline"} className="border-none">
          <SendHorizontal />
        </Button>
      </div>
    </form>
  );
};

export default Form;
