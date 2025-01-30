import { prisma } from "@/lib/prisma";

export async function getAvailableUnits() {
  return await prisma.unit.findMany({
    where: { available: true }, // Somente imóveis disponíveis
    orderBy: { createdAt: "desc" }, // Ordenação por data de criação
  });
}
