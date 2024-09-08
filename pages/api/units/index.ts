import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        address,
        addressNumber,
        unitNumber,
        typeId, // Use typeId ao invés de type
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

      // Certifique-se de que typeId seja válido e faça a relação corretamente
      const createdUnit = await prisma.unit.create({
        data: {
          address,
          addressNumber,
          unitNumber,
          typeId, // Relaciona com o UnitType
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
            connect: features.map((featureId: number) => ({ id: featureId })),
          },
          furnished,
          leaseStartDate: leaseStartDate ? new Date(leaseStartDate) : null,
          leaseEndDate: leaseEndDate ? new Date(leaseEndDate) : null,
          currentTenantId,
          rentalContractId,
        },
      });

      res.status(200).json(createdUnit);
    } catch (error) {
      console.error("Erro ao criar unidade:", error);
      res.status(500).json({ error: "Erro ao criar unidade" });
    }
  } else if (req.method === "GET") {
    try {
      const units = await prisma.unit.findMany({
        include: {
          unitType: true, // Incluir o tipo da unidade nas respostas GET
        },
      });
      res.status(200).json(units);
    } catch (error) {
      console.error("Erro ao buscar unidades:", error);
      res.status(500).json({ error: "Erro ao buscar unidades" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
