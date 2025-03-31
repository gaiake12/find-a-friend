/*
  Warnings:

  - A unique constraint covering the columns `[e-mail]` on the table `org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "org_e-mail_key" ON "org"("e-mail");
