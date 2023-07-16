import type { CreateAction } from "@wasp/crud/Messages";
import type { Message } from "@wasp/entities";
import type {
  GetUserUnsentMessages,
  GetPublicUnsentMessages,
} from "@wasp/queries/types";
import HttpError from "@wasp/core/HttpError.js";

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

export const getUserUnsentMessages: GetUserUnsentMessages<
  void,
  Message[]
> = async (_args, context) => {
  const { user } = context;
  const { Message } = context.entities;

  if (!user) {
    throw new HttpError(401, "You must be logged in to see your messages.");
  }

  const messages = await Message.findMany({
    where: {
      author: user,
      isSent: false,
    },
    orderBy: {
      sendAt: "asc",
    },
  });

  return messages;
};

export const getPublicUnsentMessages: GetPublicUnsentMessages<
  void,
  Message[]
> = async (_args, context) => {
  const { Message } = context.entities;

  const messages = await Message.findMany({
    where: {
      isPublic: true,
      isSent: false,
    },
    orderBy: {
      sendAt: "asc",
    },
    take: 10,
  });

  return messages;
};
