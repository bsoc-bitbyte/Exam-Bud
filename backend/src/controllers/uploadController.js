const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
const cloudinary = require('cloudinary').v2
const { ApiError } = require('../utils/ApiError');
const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const fetchUploads = asyncHandler(async (req, res, next) => {
  const uploads = await prisma.upload.findMany({
    where: { subjectId: +req.params.sid },
    include: { user: true }
  });
  res.json(new ApiResponse(200, uploads, "fetched uploads successfully"));
});

const uploadMaterial = asyncHandler(async (req, res, next) => {
    const { title, url } = req.body;

    if (!title || !url) {
      return next(new ApiError(400, "Title and Cloudinary URL are required"));
    }

    const upload = await prisma.upload.create({
      data: {
        title,
        url, // Directly use the 'url' received from the frontend (Cloudinary URL)
        subjectId: +req.params.sid,
        userId: req.user.id
      }
    });
    res.status(201).json(new ApiResponse(201, upload, "material uploaded successfully"))
});

const deleteUpload = asyncHandler(async (req, res, next) => {
  // First delete from cloudinary
  const file = await prisma.upload.findUnique({
    where: {id: +req.params.id},
  })

  if (!file) {
    return res.status(404).json(new ApiResponse(404, null, "File Not Found"))
  }

  const public_id = file.title
  await cloudinary.uploader.destroy(public_id).then(result=>console.log(result));

  // Then delete from prisma db
  const deleted = await prisma.upload.delete({
    where: { id: +req.params.id }
  });
  res.status(200).json(new ApiResponse(200, " ", deleted, " Deleted Succesfully"));
});

module.exports = { fetchUploads, uploadMaterial, deleteUpload };
