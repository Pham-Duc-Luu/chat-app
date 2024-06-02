import { compare, compareSync, genSaltSync, hash, hashSync } from 'bcrypt';
import UserModel from '../models/User.model';
import { config } from 'dotenv';
import RefreshToken from '../models/token.model';
import RefreshTokenModel from '../models/token.model';

config();

class AuthService {
    generateRandomString(length: number): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }
    async authGoogle(email: string) {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            return user;
        }
        const password: string = this.generateRandomString(10);
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const newUser = await UserModel.create({
            email,
            password: hash,
        });

        return newUser;
    }
}
const authService = new AuthService();
export default authService;
