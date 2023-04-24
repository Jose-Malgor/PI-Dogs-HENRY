const { createTemp } = require("../Controllers/tempsController")

const createTempHandler = async (req, res) => {
    
    try {
        const newTemps = await createTemp();
        res.status(200).json(newTemps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


module.exports = {
    createTempHandler,
};