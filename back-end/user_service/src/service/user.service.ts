import { CheckUniqueEmail, createUserDB } from "../database/userdb";
import bcrypt from "bcrypt";
import { BadRequest } from "../util/response/client_error.response";
import Logger from "../lib/logger";

async function createUser(username: string, password: string, email: string) {
  // * Check if email exist
  if (await CheckUniqueEmail(email)) {
    try {
      const saltRounds = Number(process.env.SALTROUND) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return await createUserDB(email, username, hashedPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      throw new BadRequest("Error creating user");
    }
  } else {
    throw new BadRequest("Email already exists");
  }
}
export { createUser };
