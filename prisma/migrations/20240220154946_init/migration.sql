/*
  Warnings:

  - Added the required column `phone` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Borrow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `bid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Member`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_bid_fkey` FOREIGN KEY (`bid`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
