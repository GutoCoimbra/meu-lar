import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Verifica se o ID é fornecido e é um número
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const numericId = Number(id);

  if (req.method === "GET") {
    // Obter uma unidade específica
    try {
      const unit = await prisma.unit.findUnique({
        where: { idUnit: numericId },
        include: {
          unitType: true, // Incluir o tipo da unidade
          features: true, // Incluir as features, se existir relacionamento
        },
      });

      if (!unit) {
        return res.status(404).json({ message: "Unit not found" });
      }

      res.status(200).json(unit);
    } catch (error) {
      console.error("Erro ao buscar unidade:", error);
      res.status(500).json({ error: "Erro ao buscar unidade" });
    }
  } else if (req.method === "PUT") {
    // Atualizar uma unidade específica
    try {
      const {
        address,
        addressNumber,
        unitNumber,
        typeId,
        squareMeter,
        rooms,
        garage,
        floor,
        neighborhood,
        city,
        state,
        zipcode,
        available,
        rentValue,
        condominium,
        waterTax,
        electricityTax,
        internetTax,
        depositValue,
        maintenanceFee,
        lastMaintenanceDate,
        imgUrl,
        accessInstructions,
        documents,
        averageRating,
        petAllowed,
        smokingAllowed,
        listingStatus,
        highlighted,
        description,
        features,
        furnished,
        leaseStartDate,
        leaseEndDate,
        currentTenantId,
        rentalContractId,
      } = req.body;

      const updatedUnit = await prisma.unit.update({
        where: { idUnit: numericId },
        data: {
          address,
          addressNumber,
          unitNumber,
          typeId,
          squareMeter,
          rooms,
          garage,
          floor,
          neighborhood,
          city,
          state,
          zipcode,
          available,
          rentValue,
          condominium,
          waterTax,
          electricityTax,
          internetTax,
          depositValue,
          maintenanceFee,
          lastMaintenanceDate: lastMaintenanceDate
            ? new Date(lastMaintenanceDate)
            : null,
          imgUrl,
          accessInstructions,
          documents,
          averageRating,
          petAllowed,
          smokingAllowed,
          listingStatus,
          highlighted,
          description,
          features: {
            set: features.map((featureId: number) => ({ id: featureId })),
          },
          furnished,
          leaseStartDate: leaseStartDate ? new Date(leaseStartDate) : null,
          leaseEndDate: leaseEndDate ? new Date(leaseEndDate) : null,
          currentTenantId,
          rentalContractId,
        },
      });

      res.status(200).json(updatedUnit);
    } catch (error) {
      console.error("Erro ao atualizar unidade:", error);
      res.status(500).json({ error: "Erro ao atualizar unidade" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
