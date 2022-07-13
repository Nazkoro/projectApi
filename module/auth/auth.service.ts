import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { RegDataInterface } from "./types/reg-data.interface";
import UserModel from "../../models/User";
import mailService from "../../service/mail-service";
import tokenService from "./token.service";
import UserDto from "../../dtos/user-dto";
import ApiError from "../../exceptions/api-error";

export class AuthService {
  async registration(body: RegDataInterface) {
    const { email, username, password } = body;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4(); // v34fa-asfasf-142saf-sa-asf

    const user = await UserModel.create({
      email,
      username,
      password: hashPassword,
      activationLink,
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // return { ...tokens, user: userDto };
    return { ...tokens };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(body: RegDataInterface) {
    const { email, password } = body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // return { ...tokens, user: userDto };
    return { ...tokens };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    console.log(refreshToken);
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async checkEmail({ email }): Promise<void> {

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await mailService.sendRecoveryPassword(
      email,
      `${process.env.CLIENT_URL}/recovery-password/?token=${tokens.accessToken}`
    );
  }

  async updPassword(bodyOfPost, id) {
    console.log("bodyOfPost in userservise", bodyOfPost);
    const hashPassword = await bcrypt.hash(bodyOfPost.password, 3);
    const userdata = await UserModel.findByIdAndUpdate(id, {
      $set: { password: hashPassword },
    });
    return "Account has been updated";
  }
}
export default new AuthService();
