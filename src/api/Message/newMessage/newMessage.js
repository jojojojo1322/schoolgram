import { prisma } from "../../../../generated/prisma-client";

//실시간 메세지 알림

export default {
  Subscription: {
    newMessage: {
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload) => payload,
    },
  },
};
