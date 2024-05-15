import { User } from "../entity/User";
import AppDataSource from "./postgresql/connect.postgresql";

// * Find user in DB by email return true with no record
export async function CheckUniqueEmail(email: string): Promise<Boolean> {
  const user = await AppDataSource.getRepository(User).findOneBy({ email });

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
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.username = username;
  user.email = email;
  user.password = password;
  
  await userRepository.save(user);
  return user.id;
}
