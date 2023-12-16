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

export async function fetchSavingsByUserId(email: string) {
  try {
    if (email === "") return null;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    const savingsRecords = await prisma.savingsRecord.findMany({
      where: {
        userId: user.id,
      },
    });

    return savingsRecords;
  } catch (error: any) {
    throw new Error(`Error fetching savings records: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

export async function checkIfPaid(email: string) {
  try {
    if (email === "") return null;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found.`);
    }

    // Get the start and end of the current day
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59
    );

    const savingsRecords = await prisma.savingsRecord.findFirst({
      where: {
        userId: user.id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    console.log(savingsRecords);

    return savingsRecords ? true : false;
  } catch (error: any) {
    throw new Error(`Error fetching savings records: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}
