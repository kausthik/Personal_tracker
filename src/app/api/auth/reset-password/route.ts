import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/user";
import { getSessionUserId } from "@/src/lib/getUser";

// Change password for the logged-in user. Needs the current password.
// shortcut: no "forgot password" for logged-out users; add an emailed token flow (PasswordResetToken model) once an email provider is set up
export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId();
    if (!userId) return NextResponse.json({ error: "Please log in first" }, { status: 401 });

    const { currentPassword, password, confirmPassword } = await req.json();

    if (!currentPassword || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user || !(await bcrypt.compare(String(currentPassword), user.password))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    await User.updateOne(
      { _id: user._id },
      { $set: { password: await bcrypt.hash(password, 10), passwordChangedAt: new Date() } }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("reset-password error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
