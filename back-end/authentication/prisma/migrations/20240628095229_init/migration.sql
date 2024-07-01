/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `device` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ipAddress` on table `device` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "device" ALTER COLUMN "ipAddress" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "device_ipAddress_key" ON "device"("ipAddress");
