import { prisma } from "./lib/prisma";

async function testConnection() {
  try {
    const units = await prisma.unit.findMany();
    console.log("Imóveis encontrados:", units);
  } catch (error) {
    console.error("Erro ao conectar ao banco via Prisma:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
