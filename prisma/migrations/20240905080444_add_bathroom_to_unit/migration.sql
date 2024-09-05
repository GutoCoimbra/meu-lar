-- DropIndex
DROP INDEX "UnitType_typeName_key";

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "bathroom" INTEGER NOT NULL DEFAULT 1;
