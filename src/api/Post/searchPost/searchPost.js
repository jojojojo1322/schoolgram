import { prisma } from "../../../../generated/prisma-client";
//지역검색은 시작단어만 검색되게
export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { location_starts_with: args.term },
            { caption_starts_with: args.term },
          ],
        },
      }),
  },
};
