/*
  Warnings:

  - A unique constraint covering the columns `[videoId,spaceId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_videoId_spaceId_key" ON "Video"("videoId", "spaceId");
