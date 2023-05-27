import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../models/userSchema.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse.js";
import { sendMailResetPassword } from "../services/Sendmail.js";
import { body, validationResult } from "express-validator";
export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: { email: string; password: string } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please! Enter Email and Password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    const ismatch = await user.matchPassword(password);
    if (!ismatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const { accessToken, refreshToken } = user.getSignedToken();

    // send refreshtoken to client in cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    // send accesstoken to client
    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const signup: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, dob, gender }: IUser = req.body;

  if (!name || !email || !password || !dob || !gender) {
    return next(new ErrorResponse("Incorrect data", 400));
  }

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return next(new ErrorResponse("Email already exists", 409));
    }

    user = await User.create({ name, email, password, dob, gender });

    res.status(201).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const refresh: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: string | undefined = req.cookies.refreshtoken;
  if (!refreshToken) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  // verify the refresh token
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY as string
    ) as JwtPayload;
    if (!decoded || !decoded.id) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      {
        expiresIn: "5s",
      }
    );
    res.status(201).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }
    const resetPasswordToken = await user.getResetPasswordToken();
    const reseturl = `${process.env.CLIENT_BASE_URL}/auth/reset-password?t=${resetPasswordToken}`;
    const name = user.name;
    await sendMailResetPassword(email, reseturl, name);
    res
      .status(200)
      .json({ success: true, message: "Password Reset Email sent" });
  } catch (error) {
    next(error);
  }
};

export const resetpassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resetPasswordToken: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    resetPasswordToken = req.headers.authorization.split(" ")[1];
  }

  if (!resetPasswordToken) {
    return next(new ErrorResponse("Unauthoriazed", 401));
  }
  try {
    const decoded = jwt.verify(
      resetPasswordToken,
      process.env.RESET_PASSWORD_SECRET_KEY as string
    ) as JwtPayload;
    const { password }: { password: string } = req.body;
    const user = await User.findOne({ _id: decoded.id, resetPasswordToken });
    if (!user) {
      return next(new ErrorResponse("Wrong Reset Password token", 404));
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    await user.save();
    console.log(user);
    res
      .status(200)
      .json({ success: true, message: "Password Reset successfully" });
    next();
  } catch (error) {
    next(error);
  }
};
