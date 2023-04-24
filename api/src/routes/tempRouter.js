const { Router } = require('express');

const tempRouter = Router();
const {createTempHandler} = require ("../Handler/temperamentHandlers")

    // tempRouter.get("/", (req, res) => {
    //     res.send("NIY: Obtengo los temperamentos existentes")
    // });

tempRouter.get("/", createTempHandler);


module.exports = tempRouter;