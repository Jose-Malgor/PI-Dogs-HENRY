const { cGetTemp } = require("../Controllers/tempsController")

const getTempHandler = async (req, res) => {
    
    try {
        const newTemps = await cGetTemp();
        res.status(200).json(newTemps);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


module.exports = {
    getTempHandler,
};