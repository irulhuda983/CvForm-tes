-- CreateTable
CREATE TABLE `profile` (
    `profileCode` VARCHAR(191) NOT NULL,
    `wantedJobTitle` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `postalCode` INTEGER NULL,
    `drivingLicense` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NULL,
    `placeOfBirth` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,
    `photo` VARCHAR(191) NULL,
    `workingExperience` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`profileCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileCode` VARCHAR(191) NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `employer` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `city` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `education` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileCode` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `city` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileCode` VARCHAR(191) NOT NULL,
    `skill` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employment` ADD CONSTRAINT `employment_profileCode_fkey` FOREIGN KEY (`profileCode`) REFERENCES `profile`(`profileCode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `education` ADD CONSTRAINT `education_profileCode_fkey` FOREIGN KEY (`profileCode`) REFERENCES `profile`(`profileCode`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_profileCode_fkey` FOREIGN KEY (`profileCode`) REFERENCES `profile`(`profileCode`) ON DELETE CASCADE ON UPDATE CASCADE;
