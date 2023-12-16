"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUser({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Error adding user: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

// Function to add a new savings record for a user
export async function addSavingsRecordByEmail({
  email,
  date,
  savedAmount,
  metGoal,
}: {
  email: string;
  date: Date;
  savedAmount: number;
  metGoal: boolean;
}) {
  try {
    // Fetch user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    // Add savings record for the user
    const savingsRecord = await prisma.savingsRecord.create({
      data: {
        userId: user.id,
        date,
        savedAmount,
        metGoal,
      },
    });

    return savingsRecord;
  } catch (error: any) {
    throw new Error(`Error adding savings record: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
