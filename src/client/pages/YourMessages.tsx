import { Message } from "@wasp/entities";
import { useQuery } from "@wasp/queries";
import { MainLayout } from "../layouts/MainLayout";
import { H1 } from "../components/headers";
import { IconLock, IconEye } from "@tabler/icons-react";
import { prettyDateFromString } from "../utils";

function MessageCard({
  id,
  title,
  description,
  sendAt,
  isPublic,
}: {
  id: Pick<Message, "id">["id"];
  title: Pick<Message, "title">["title"];
  description: Pick<Message, "body">["body"];
  sendAt: Pick<Message, "sendAt">["sendAt"];
  isPublic: Pick<Message, "isPublic">["isPublic"];
}) {
  const prettyDate = prettyDateFromString(sendAt);

  const deleteMessage = ({ id }: { id: string }) => {
    console.log("message deleted", id);
  };
  return (
    <div className="bg-gray-100 p-4 my-4 rounded-lg w-fit">
      <div className="flex w-full justify-between">
        <div className="flex gap-4 mr-8">
          <span className="font-medium">{title}</span>
          <span className="text-gray-500">{prettyDate}</span>
          {isPublic ? (
            <span className="text-gray-500 flex gap-0.5">
              <IconEye /> Public
            </span>
          ) : (
            <span className="text-gray-500 flex gap-0.5">
              <IconLock /> Private
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <button
            // onClick={() => updateMessage({ id: message.id })}
            className="border border-gray-500 hover:border-primary-700 transition hover:bg-primary-200 text-gray-500 hover:text-primary-700 text-sm px-2 py-0.5 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteMessage({ id })}
            className="border border-gray-500 hover:border-red-700 transition hover:bg-red-200 text-gray-500 hover:text-red-700 text-sm px-2 py-0.5 rounded"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="my-2">
        {description.slice(0, 100)}
        {description.length > 100 && "..."}
      </div>
    </div>
  );
}

export function YourMessages() {
  return (
    <MainLayout>
      <div className="flex flex-col my-4 p-4">
        <H1 className="self-center mb-4">Your unsent messages</H1>
        <MessageCard
          id={"1"}
          title={"message title"}
          description={"message description"}
          sendAt={new Date()}
          isPublic={true}
        />
        <MessageCard
          id={"2"}
          title={"2 message title"}
          description={"message description"}
          sendAt={new Date()}
          isPublic={false}
        />
        <MessageCard
          id={"10"}
          title={"message 10 title"}
          description={"message description"}
          sendAt={new Date()}
          isPublic={true}
        />
      </div>
    </MainLayout>
  );
}
