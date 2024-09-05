import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchFeatures() {
  try {
    const features = await prisma.feature.findMany();
    return features;
  } catch (error) {
    console.error("Erro ao buscar características:", error);
    return [];
  }
}
