import { NextResponse } from "next/server";
import Patient from "@/models/Patient";
import connectDB from "@/config/database";
import Hospital from "@/models/Hospital";
export async function GET(req) {
  const email = req.headers.get("email");
  // Ensure email is provided
  if (!email) {
    return NextResponse.json(
      { error: "Email header is missing" },
      { status: 400 }
    );
  }
  // Connect to the database
  await connectDB();
  const user = await Patient.findOne({ email: email }).populate(
    "hospital",
    "name"
  );

  return NextResponse.json({ profile: user });
}

export async function POST() {
  return NextResponse.json({ message: "This is a POST request" });
}
