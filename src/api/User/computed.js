import { prisma } from "../../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    amIFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const exists = prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: [user.id] }],
        });
        if (exists) {
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    itsMe: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
