import { prisma } from "./postgresql/connect.postgresql";


// * Find user in DB by email return true with no record
export async function CheckUniqueEmail(email: string): Promise<Boolean> {
  const user = await prisma.user.findFirst({
    where :{email},
  })

  console.log(user);

  if (user) {
    return false;
  }
  return true;
}

// * Create a new record
export async function createUserDB(
  email: string,
  username: string,
  password: string
): Promise<Number> {
const user = await prisma.user.create({
    data: {
    email,
    username,
    password,
  },
});
  return user.id;
}
