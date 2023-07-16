import type { CreateAction } from "@wasp/crud/Messages";
import type { Message } from "@wasp/entities";

type Input = {
  title: Pick<Message, "title">["title"];
  body: Pick<Message, "body">["body"];
  isPublic: Pick<Message, "isPublic">["isPublic"];
  sendAt: Pick<Message, "sendAt">["sendAt"];
  receiver: Pick<Message, "receiver">["receiver"];
};
type Output = Message;

export const createMessage: CreateAction<Input, Output> = async (
  args,
  context
) => {
  const { title, body, isPublic, sendAt, receiver } = args;
  const { user } = context;
  const { Message } = context.entities;

  const message = user
    ? await Message.create({
        data: {
          title,
          body,
          isPublic,
          sendAt,
          receiver,
          author: {
            connect: {
              id: user?.id,
            },
          },
        },
      })
    : await Message.create({
        data: {
          title,
          body,
          isPublic,
          sendAt,
          receiver,
        },
      });

  return message;
};
