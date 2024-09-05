/*
  Warnings:

  - You are about to drop the column `securityFeatures` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Unit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "securityFeatures",
DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER;

-- CreateTable
CREATE TABLE "UnitType" (
    "idType" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "UnitType_pkey" PRIMARY KEY ("idType")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnitType_typeName_key" ON "UnitType"("typeName");

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "UnitType"("idType") ON DELETE SET NULL ON UPDATE CASCADE;
