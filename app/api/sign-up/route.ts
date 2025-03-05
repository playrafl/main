import connectDatabase from "@/app/lib/mongo";
import User from "@/app/api/_models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const body = await request.json();

    const { fullName, email, password, confirmPassword } = body;
    if (!fullName || !email || !password || !confirmPassword)
      return NextResponse.json({ error: "Missing fields." });
    if (password !== confirmPassword)
      return NextResponse.json(
        {
          message: "Password do not match.",
        },
        {
          status: 400,
        }
      );
    if (password.length < 8)
      return NextResponse.json(
        {
          message: "Password must be at least 8 characters.",
        },
        {
          status: 400,
        }
      );
    const userExisted = await User.findOne({
      email,
    });

    if (userExisted)
      return NextResponse.json(
        { message: "User already existed." },
        {
          status: 400,
        }
      );

    const hashPassword = await bcrypt.hash(password, 10);
    const randomNumber = Math.floor(Math.random() * 9999);
    const userName = `user_${randomNumber}`;
    const user = await User.create({
      userName,
      fullName,
      email,
      password: hashPassword,
    });

    await axios.post(`${process.env.WEBHOOKS_URI}`, {
      full_name: fullName,
      email,
    });

    const token = jwt.sign(
      {
        id: user.id || user._id,
        email: user.email,
        userName: user?.userName,
        fullName: user.fullName,
      },
      "jwt-secret"
    );
    return NextResponse.json({
      user: {
        id: user.id || user._id,
        email: user.email,
        userName: user?.userName,
        fullName: user.fullName,
      },
      token,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
