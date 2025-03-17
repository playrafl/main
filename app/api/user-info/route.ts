import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { isEmpty } from "lodash";
import { IUser } from "../_models/user";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("cookie")?.split("=")[1];
    if (!token)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    const user = jwt.verify(token, "jwt-secret") as unknown as IUser;
    if (isEmpty(user))
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    const _token = jwt.sign(
      {
        id: user.id || user._id,
        email: user.email,
        userName: user?.userName,
        fullName: user.fullName,
      },
      "jwt-secret"
    );
    return NextResponse.json({
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
