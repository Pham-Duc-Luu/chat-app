
import { Router } from 'express';
import geoip from 'geoip-lite';
import userService from '../../services/user.service';
const changePassRoute = Router();

changePassRoute.route('/user/sendCode').post(userService.sendCode);
changePassRoute.route('/user/forgot-password').post(userService.changePass);
export default changePassRoute;