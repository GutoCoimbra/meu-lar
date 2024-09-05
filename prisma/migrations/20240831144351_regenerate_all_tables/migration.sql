-- CreateTable
CREATE TABLE "Renter" (
    "idRenter" SERIAL NOT NULL,
    "nameRenter" TEXT NOT NULL,
    "emailRenter" TEXT NOT NULL,
    "phoneRenter" TEXT NOT NULL,
    "addressRenter" TEXT NOT NULL,
    "cpfRenter" BIGINT NOT NULL,
    "idtRenter" BIGINT NOT NULL,
    "idtSenderRenter" TEXT NOT NULL,
    "maritalStatusRenter" TEXT NOT NULL,
    "birthdateRenter" TIMESTAMP(3) NOT NULL,
    "ciaWorksRenter" TEXT NOT NULL,
    "admissionDataRenter" TIMESTAMP(3) NOT NULL,
    "salaryRenter" DOUBLE PRECISION NOT NULL,
    "idUnitIntended" INTEGER,
    "bankAccount" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "creditScore" INTEGER NOT NULL,
    "preferredContactMethod" TEXT NOT NULL,
    "newsletterSubscribed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "documentURL" TEXT[],
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactRelationship" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("idRenter")
);

-- CreateTable
CREATE TABLE "RentalHistory" (
    "id" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "tenantId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "feedback" TEXT,

    CONSTRAINT "RentalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "idItem" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("idItem")
);

-- CreateTable
CREATE TABLE "UnitItem" (
    "idUnitItem" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "UnitItem_pkey" PRIMARY KEY ("idUnitItem")
);

-- CreateTable
CREATE TABLE "RentalContract" (
    "idContract" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "renterId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "contractTerms" TEXT NOT NULL,
    "monthlyRent" DOUBLE PRECISION NOT NULL,
    "securityDeposit" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "renewalOption" BOOLEAN NOT NULL,
    "penaltyTerms" TEXT,
    "notes" TEXT,

    CONSTRAINT "RentalContract_pkey" PRIMARY KEY ("idContract")
);

-- CreateTable
CREATE TABLE "Payment" (
    "idPayment" SERIAL NOT NULL,
    "contractId" INTEGER NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "lateFee" DOUBLE PRECISION,
    "paymentReference" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("idPayment")
);

-- CreateTable
CREATE TABLE "MaintenanceRequest" (
    "idRequest" SERIAL NOT NULL,
    "unitId" INTEGER NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedTo" TEXT,
    "completionDate" TIMESTAMP(3),
    "priority" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION NOT NULL,
    "actualCost" DOUBLE PRECISION,

    CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY ("idRequest")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Notification" (
    "idNotification" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notificationType" TEXT NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("idNotification")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RentalHistory" ADD CONSTRAINT "RentalHistory_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitItem" ADD CONSTRAINT "UnitItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitItem" ADD CONSTRAINT "UnitItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("idItem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalContract" ADD CONSTRAINT "RentalContract_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalContract" ADD CONSTRAINT "RentalContract_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("idRenter") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "RentalContract"("idContract") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("idUnit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
