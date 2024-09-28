import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Verifica se o ID é fornecido e é uma string válida
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const unitUUID = id.toString();

  if (req.method === "GET") {
    try {
      // Consulta a unidade usando o UUID como string
      const { data: unit, error: unitError } = await supabase
        .from("Unit")
        .select("*")
        .eq("idUnitUUID", unitUUID) // Usa o UUID diretamente
        .single();

      if (unitError || !unit) {
        return res.status(404).json({ message: "Unidade não encontrada" });
      }

      // Busca os tipos de unidade (UnitType) de forma separada
      const { data: unitTypes, error: typeError } = await supabase
        .from("UnitType")
        .select("idType, typeName");

      if (typeError || !unitTypes) {
        return res
          .status(500)
          .json({ message: "Erro ao buscar tipos de unidade" });
      }

      // Encontra o tipo da unidade atual baseado no unit.typeId
      const unitType = unitTypes.find(
        (type: any) => type.idType === unit.typeId
      );

      // Retornar a unidade com o nome do tipo de unidade
      const formattedUnit = {
        ...unit,
        typeName: unitType?.typeName || "Tipo não especificado",
      };

      res.status(200).json(formattedUnit);
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

      const { data: updatedUnit, error: updateError } = await supabase
        .from("Unit")
        .update({
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
          furnished,
          leaseStartDate: leaseStartDate ? new Date(leaseStartDate) : null,
          leaseEndDate: leaseEndDate ? new Date(leaseEndDate) : null,
          currentTenantId,
          rentalContractId,
        })
        .eq("idUnitUUID", unitUUID); // Usa o UUID diretamente

      if (updateError) {
        throw updateError;
      }

      // Atualizar as features da unidade, se necessário
      if (features && features.length > 0) {
        await supabase.from("UnitFeatures").delete().eq("idUnitUUID", unitUUID);

        const featureInsertions = features.map((featureId: number) => ({
          idUnitUUID: unitUUID,
          feature_id: featureId,
        }));

        await supabase.from("UnitFeatures").insert(featureInsertions);
      }

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
