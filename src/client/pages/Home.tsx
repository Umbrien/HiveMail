import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "@wasp/auth/useAuth";
import { Messages } from "@wasp/crud/Messages";
import { MainLayout } from "../layouts/MainLayout";
import { H1 } from "../components/headers";
import { IconSend, IconCircleCheckFilled } from "@tabler/icons-react";
import { prettyDateFromString } from "../utils";

export function Home() {
  const { data: user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sendAt, setSendAt] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const createMessage = Messages.create.useAction();

  const handleCreateMessage = () => {
    if (!title || !body || !receiver || !sendAt) {
      alert("Please fill in all fields.");
      return;
    }
    createMessage({
      title,
      body,
      isPublic,
      sendAt: new Date(sendAt),
      receiver,
    }).then(() => {
      setIsSent(true);
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center my-4 p-4">
        <H1>Send message to the future!</H1>
        <div className="flex flex-col w-[300px] sm:w-[500px]  md:w-[700px] my-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Hello"
              className="border rounded p-2 mb-4 max-w-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <label htmlFor="message-body" className="text-gray-700">
            Message
          </label>
          <textarea
            id="message-body"
            placeholder="Hello, ..."
            className="border rounded p-2 mb-4 w-full"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col">
              <label htmlFor="receiver" className="text-gray-700">
                Receiver
              </label>
              <input
                id="receiver"
                type="email"
                placeholder="receiver@example.com"
                className="border rounded p-2 mb-4 max-w-sm"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sendAt" className="text-gray-700">
                Send At
              </label>
              <input
                id="sendAt"
                type="date"
                className="border rounded p-2 mb-4 max-w-sm"
                value={sendAt}
                onChange={(e) => setSendAt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <input
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              id="make-public-checkbox"
              type="checkbox"
              className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="make-public-checkbox" className="ml-2 text-sm">
              Make public
            </label>
          </div>
        </div>

        <button
          onClick={handleCreateMessage}
          className="flex w-fit gap-2 bg-primary-700 hover:bg-primary-600 text-primary-50 font-bold py-2 px-4 rounded"
        >
          <IconSend size="20" className="self-center" />
          Send
        </button>

        {!user && (
          <p className="text-gray-500 text-sm mt-4">
            <Link to="/login" className="underline hover:text-primary-500">
              Log in
            </Link>{" "}
            to see your messages here later.
          </p>
        )}

        {isSent && (
          <div
            className="flex items-center p-4 my-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
            role="alert"
          >
            <IconCircleCheckFilled className="flex-shrink-0 inline w-5 h-5 mr-3" />
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Message saved!</span> It will be
              sent at {prettyDateFromString(new Date(sendAt))}.
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
