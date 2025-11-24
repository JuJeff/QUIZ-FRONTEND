import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,

  { params }: { params: { missionId: string } } 
) {
  try {
    const id = parseInt(params.missionId);

    await prisma.mission.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Mission deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { missionId: string } } 
) {
  try {
    const id = parseInt(params.missionId);
    const body = await request.json();

    const updatedMission = await prisma.mission.update({
      where: { id },
      data: {
        name: body.name,
        agency: body.agency,
        description: body.description,
        status: body.status,
      },
    });

    return NextResponse.json(updatedMission);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}