const { Router } = require('express');
const { getBreedsByName, getBreedsById, postDog } = require ("../Handler/dogsHandlers")

const dogsRouter = Router();

const validateDog = (req, res, next) =>{
    const { name, heightMax, weightMax, life_span, image } = req.body;
    if (!name || !heightMax || !weightMax || !life_span || !image ) 
    res.status(400).json({ error: "Missing data"});
    next();
};



dogsRouter.get("/", getBreedsByName )

dogsRouter.get("/:id", getBreedsById );


dogsRouter.post("/", validateDog, postDog);


module.exports = dogsRouter;