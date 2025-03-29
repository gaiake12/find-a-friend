/*
  Warnings:

  - Added the required column `search` to the `pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pet" ADD COLUMN     "search" TEXT NOT NULL;
