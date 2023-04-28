const { Router } = require('express');

const tempRouter = Router();
const {getTempHandler} = require ("../Handler/temperamentHandlers")

    // tempRouter.get("/", (req, res) => {
    //     res.send("NIY: Obtengo los temperamentos existentes")
    // });

tempRouter.get("/", getTempHandler);


module.exports = tempRouter;