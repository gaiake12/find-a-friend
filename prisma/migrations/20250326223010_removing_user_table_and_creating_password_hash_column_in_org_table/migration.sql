/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password_hash` to the `org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org" ADD COLUMN     "password_hash" TEXT NOT NULL;

-- DropTable
DROP TABLE "user";
