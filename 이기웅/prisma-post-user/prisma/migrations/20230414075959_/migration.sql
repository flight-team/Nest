/*
  Warnings:

  - You are about to drop the column `roleName` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_roleName_fkey`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `roleName`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_role_fkey` FOREIGN KEY (`role`) REFERENCES `Role`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
