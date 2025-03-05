import connectDatabase from "@/app/lib/mongo";
import User from "@/app/api/_models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connectDatabase();
    const body = await request.json();

    const { email, password } = body;
    if (!email || !password)
      return NextResponse.json(
        { message: "Missing fields." },
        {
          status: 400,
        }
      );

    const user = await User.findOne({
      email,
    });

    if (!user)
      return NextResponse.json(
        { message: "User not found." },
        {
          status: 400,
        }
      );

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return NextResponse.json(
        { message: "Invalid password." },
        {
          status: 400,
        }
      );
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
    return NextResponse.json({
      message: err?.message || "Internal Server Error",
    });
  }
}
