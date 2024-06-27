import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async findFirst({ model, operation, args, query }) {
        const user = await query(args);

        if (user?.password) {
          if (!(args.select?.password === true)) {
            user.password = "************";
          }
        }

        return user;
      },
    },
  },
});

export default prisma;
