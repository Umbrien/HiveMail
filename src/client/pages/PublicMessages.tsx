import { Message } from "@wasp/entities";
import { useQuery } from "@wasp/queries";
import { MainLayout } from "../layouts/MainLayout";
import getPublicUnsentMessages from "@wasp/queries/getPublicUnsentMessages";
import { H1 } from "../components/headers";
import { prettyDateFromString } from "../utils";

function MessageCard({
  id,
  title,
  description,
  sendAt,
}: {
  id: Pick<Message, "id">["id"];
  title: Pick<Message, "title">["title"];
  description: Pick<Message, "body">["body"];
  sendAt: Pick<Message, "sendAt">["sendAt"];
}) {
  const prettyDate = prettyDateFromString(sendAt);

  return (
    <div className="bg-gray-100 p-4 my-4 rounded-lg w-fit">
      <div className="flex w-full justify-between">
        <div className="flex gap-4 mr-8">
          <span className="font-medium">{title}</span>
          <span className="text-gray-500">{prettyDate}</span>
        </div>
      </div>
      <div className="my-2">
        {description.slice(0, 100)}
        {description.length > 100 && "..."}
      </div>
    </div>
  );
}

export function PublicMessages() {
  const {
    data: messages,
    isLoading,
    error,
  } = useQuery(getPublicUnsentMessages);

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  return (
    <MainLayout>
      <div className="flex flex-col my-4 p-4">
        <H1 className="self-center mb-4">Public messages</H1>
        {messages.map((message: Message) => (
          <MessageCard
            key={message.id}
            id={message.id}
            title={message.title}
            description={message.body}
            sendAt={message.sendAt}
          />
        ))}
      </div>
    </MainLayout>
  );
}
