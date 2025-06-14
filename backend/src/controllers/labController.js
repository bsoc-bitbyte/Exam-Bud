const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const { ApiError } = require('../utils/ApiError.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { asyncHandler } = require('../utils/asyncHandler.js');



const fetchLab = async (req, res) => {
  const labMaterial = await prisma.labMaterial.findMany({
    where: { subjectId: +req.params.sid },
    include: { user: true }
  });
  res.json(new ApiResponse(200, labMaterial, "fetched lab material successfully"));
};

const uploadLabMaterial = asyncHandler(async (req, res, next) => {
  const { title, url } = req.body;
  
  if(!title || !url) {
    return next(new ApiError(400, "Title and Cloudinary URL are required"))
  }
  
  const labMaterials = await prisma.labMaterial.create({
    data: {
      title,
      url,
      subjectId: +req.params.sid,
      userId: req.user.id
    }
  });
  res.json(new ApiResponse(201, labMaterials, "lab material uploaded successfully"));
});

const deleteLabMaterial = asyncHandler(async (req, res, next) => {
  const file = await prisma.labMaterial.findUnique({
    where: {id: +req.params.id}
  })

  if(!file){
    return res.status(400).json(new ApiError(404, null, "File Not Found"))
  }

  const public_id = file.title
  await cloudinary.uploader.destroy(public_id).then(result=>console.log(result))

  const labMaterialToDelete = await prisma.labMaterial.delete({
    where: { id: +req.params.id }
  });
  res.status(200).json(new ApiResponse(200, labMaterialToDelete, "lab material deleted successfully"));
});

module.exports = {fetchLab , uploadLabMaterial , deleteLabMaterial};