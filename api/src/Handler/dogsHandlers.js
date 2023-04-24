
const { CcreateDog, CgetBreedId, CsearchDogByName, CgetAllDogs } = require("../Controllers/dogsController");



//const urlApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getBreedsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const results = name ? await CsearchDogByName(name) : await CgetAllDogs();
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getBreedsById = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const dog = await CgetBreedId(id, source);
        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




const postDog = async (req, res) => {
    const { image, name, heightMin, heightMax, weightMin, weightMax, life_span, temperaments } = req.body;

    try {
        const newDog = await CcreateDog(image, name, heightMin, heightMax, weightMin, weightMax, life_span, temperaments);
        res.status(200).json({ message: "raza creada", newDog: newDog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// res.send(`NIY: crear un nuevo perro con estos datos:
// id: ${id},
// name: ${name},
// height: ${height},
// weight: ${weight},
// life_span: ${life_span},
// temperament: ${temperament},
// image: ${image},
// `)




module.exports = {
    getBreedsByName,
    getBreedsById,
    postDog,
}