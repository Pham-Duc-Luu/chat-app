import { log } from 'console';
import * as crypto from 'crypto';
class UtilService {
    /*randomDigital(length: number): string {
        let result = "";
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        console.log(result);
        
        return result;
    }*/


    // create OTP --- result 6 digits
    generateOTP(secret: string, window: number): { otp: string, timeStep: number } {
        //log(Math.round(Date.now() / 1000));
        const epoch = Math.round(Date.now() / 1000);
        let timeSteps = Math.floor(epoch / window);
        //console.log(Math.floor(epoch / window));
        const timeStep= timeSteps;
        const timeBuffer = Buffer.alloc(8);
        for (let i = 7; i >= 0; i--) {
          timeBuffer.writeUInt8(timeSteps & 0xff, i);
          timeSteps >>= 8;
        }
      
        const hmac = crypto.createHmac('sha1', secret).update(timeBuffer).digest();
        const start = hmac[hmac.length - 1] & 0x0f;
        const codeData = hmac.slice(start, start + 4);
      
        const fullcode = codeData.readUInt32BE(0) & 0x7fffffff;
        const code = fullcode % 1000000;
        console.log(code.toString().padStart(6, '0'), timeStep);
        return { otp: code.toString().padStart(6, '0'), timeStep: timeStep };
    }

    // Check expried OTP timing conditions
    isOTPExpired(timeStep: number, window: number): boolean {
        const currentTimeStep = Math.floor(Math.round(Date.now() / 1000) / window);
        console.log(currentTimeStep !== timeStep);
        
        return currentTimeStep !== timeStep;
    }
}
const utilService = new UtilService();
export default utilService;
