import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: 200,
    message: 'Hello, world!'
  });
}