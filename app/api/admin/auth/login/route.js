import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ADMIN_CREDENTIALS } from "@/lib/config/admins";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    let department = null;

    // Check credentials
    for (const [dept, creds] of Object.entries(ADMIN_CREDENTIALS)) {
      if (creds.username === username && creds.password === password) {
        department = dept;
        break;
      }
    }

    if (!department) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", department },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      department,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}
