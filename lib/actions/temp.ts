"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Get the start and end of today
const today = new Date();
const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  0,
  0,
  0
);
const endOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  23,
  59,
  59
);

// Get the start and end of yesterday
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const startOfYesterday = new Date(
  yesterday.getFullYear(),
  yesterday.getMonth(),
  yesterday.getDate(),
  0,
  0,
  0
);
const endOfYesterday = new Date(
  yesterday.getFullYear(),
  yesterday.getMonth(),
  yesterday.getDate(),
  23,
  59,
  59
);

// Get the start and end of yesterday
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const startOfTomorrow = new Date(
  tomorrow.getFullYear(),
  tomorrow.getMonth(),
  tomorrow.getDate(),
  0,
  0,
  0
);
const endOfTomorrow = new Date(
  tomorrow.getFullYear(),
  tomorrow.getMonth(),
  tomorrow.getDate(),
  23,
  59,
  59
);

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

    const existingRecord = await fetchTodayRecord(email);

    if (!existingRecord) return null;

    await prisma.savingsRecord.update({
      where: {
        id: existingRecord.id,
      },
      data: {
        savedAmount,
        metGoal,
      },
    });

    return existingRecord;
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

export async function Checker(email: string) {
  const user = await checkUser(email);
  if (!user) return null;

  let yesterdaySavings = await fetchYesterdayRecord(email);
  let todaySavings = await fetchTodayRecord(email);

  console.log(yesterdaySavings, todaySavings);

  const newGoal =
    yesterdaySavings && yesterdaySavings.metGoal === false
      ? (todaySavings?.goal || 100) + 50
      : 100;

  if (
    yesterdaySavings &&
    yesterdaySavings.metGoal === false &&
    todaySavings &&
    !todaySavings.addedPenalty
  ) {
    console.log("Yesterday not met, so add 50");
    todaySavings = await prisma.savingsRecord.update({
      where: {
        id: todaySavings.id,
      },
      data: {
        goal: newGoal,
        addedPenalty: true,
      },
    });
  }

  return todaySavings;
}

// IN HERE
async function fetchYesterdayRecord(email: string) {
  const user = await checkUser(email);
  if (!user) return null;

  let saving;
  saving = await prisma.savingsRecord.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: startOfYesterday,
        lte: endOfYesterday,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  if (!saving) {
    saving = await prisma.savingsRecord.create({
      data: {
        userId: user.id,
        date: yesterday,
        savedAmount: 0,
        metGoal: false,
        goal: 100,
      },
    });
  }

  return saving;
}
async function fetchTodayRecord(email: string) {
  const user = await checkUser(email);
  if (!user) return null;

  let saving;
  saving = await prisma.savingsRecord.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  if (!saving) {
    saving = await prisma.savingsRecord.create({
      data: {
        userId: user.id,
        date: today,
        savedAmount: 0,
        metGoal: false,
        goal: 100,
      },
    });
  }

  return saving;
}
async function checkUser(email: string) {
  if (email === "") return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error(`User with email ${email} not found.`);
  }

  return user;
}
