/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `MagicLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MagicLink_token_key" ON "MagicLink"("token");
