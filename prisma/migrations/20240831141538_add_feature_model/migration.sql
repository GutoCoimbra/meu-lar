/*
  Warnings:

  - You are about to drop the column `features` on the `Unit` table. All the data in the column will be lost.
  - You are about to alter the column `squareMeter` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `rentValue` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `condominium` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `waterTax` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `electricityTax` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `internetTax` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `depositValue` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `maintenanceFee` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `averageRating` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaintenanceRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalContract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RentalHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Renter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaintenanceRequest" DROP CONSTRAINT "MaintenanceRequest_unitId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_contractId_fkey";

-- DropForeignKey
ALTER TABLE "RentalContract" DROP CONSTRAINT "RentalContract_renterId_fkey";

-- DropForeignKey
ALTER TABLE "RentalContract" DROP CONSTRAINT "RentalContract_unitId_fkey";

-- DropForeignKey
ALTER TABLE "RentalHistory" DROP CONSTRAINT "RentalHistory_unitId_fkey";

-- DropForeignKey
ALTER TABLE "UnitItem" DROP CONSTRAINT "UnitItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "UnitItem" DROP CONSTRAINT "UnitItem_unitId_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "features",
ALTER COLUMN "squareMeter" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "rentValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "condominium" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "waterTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "electricityTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "internetTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "depositValue" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "maintenanceFee" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "averageRating" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "MaintenanceRequest";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "RentalContract";

-- DropTable
DROP TABLE "RentalHistory";

-- DropTable
DROP TABLE "Renter";

-- DropTable
DROP TABLE "UnitItem";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UnitFeatures" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UnitFeatures_AB_unique" ON "_UnitFeatures"("A", "B");

-- CreateIndex
CREATE INDEX "_UnitFeatures_B_index" ON "_UnitFeatures"("B");

-- AddForeignKey
ALTER TABLE "_UnitFeatures" ADD CONSTRAINT "_UnitFeatures_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UnitFeatures" ADD CONSTRAINT "_UnitFeatures_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit"("idUnit") ON DELETE CASCADE ON UPDATE CASCADE;
