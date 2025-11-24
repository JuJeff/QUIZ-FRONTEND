import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const missions = await prisma.mission.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(missions);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMission = await prisma.mission.create({
    data: {
      name: body.name,
      agency: body.agency,
      description: body.description,
      status: body.status,
    },
  });
  return NextResponse.json(newMission, { status: 201 });
}