import { emailSender } from "@wasp/email/index.js";

// @ts-ignore
export const sendMessages = async (_args, context) => {
  const { Message } = context.entities;

  const unsentMessages = await Message.findMany({
    where: {
      isSent: false,
      sendAt: {
        lte: new Date(),
      },
    },
  });

  for (const message of unsentMessages) {
    const info = await emailSender.send({
      from: {
        name: "HiveMail",
        email: "hello@hivemail.org",
      },
      to: message.receiver,
      subject: message.title,
      text: message.body,
      html: message.body,
    });

    await Message.update({
      where: { id: message.id },
      data: { isSent: true },
    });
  }

  console.log("job executed");
};
