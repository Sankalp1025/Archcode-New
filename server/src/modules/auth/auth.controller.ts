import { Request, Response } from "express";

import * as authService from "./auth.service";

import jwt from "jsonwebtoken";

import { prisma } from "../../config/db";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export const signup = async (
  req:Request,
  res:Response
) => {
  try {
    const{ name, email, password } =
      req.body;

    const user = await authService.signup(
     name,
     email,
     password
    );

    return res.status(201).json(user);

  } catch(error: any) {

    return res.status(400).json({
      message:
        error.message || "Signup failed",
    });
  }
};

export const login = async (
  req:Request,
  res:Response
) => {
  try {
    const { email, password } =
      req.body;

    const tokens =
      await authService.login(
        email,
        password
      );

    return res.status(200).json(tokens);

  } catch (error: any) {

    return res.status(401).json({
      message:
        error.message ||
        "Invalid email or password",
    });
  }
};

export const refresh = async (
  req:Request,
  res:Response
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string };

    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

    if (
      !user ||
      user.refreshToken !== refreshToken
    ) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    const newAccessToken =
      generateAccessToken(user.id);

    const newRefreshToken =
      generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },

      data: {
        refreshToken:
        newRefreshToken,
      },
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error) {

    return res.status(403).json({
      message:
        "Token expired or invalid",
    });
  }
};