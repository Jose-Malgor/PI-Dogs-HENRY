const { Dog, Temperament } = require("../db");  // me traigo el modelo Dog
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const Sequelize = require('sequelize');


const CcleanArray = (arr) =>
    arr.map((dog) => {
        const [heightMin, heightMax] = dog.height.metric
            ? dog.height.metric.split(" - ")
            : [null, null];

        const [weightMin, weightMax] = dog.weight.metric
            ? dog.weight.metric.split(" - ")
            : [null, null];

        //const temperaments = dog.temperament
        //?dog.temperament.split(", ")
        //:[null];

        return {
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span: dog.life_span,
            temperaments: dog.temperament,
            created: false
        };
    });


const CcreateDog = async (image, name, heightMin, heightMax, weightMin, weightMax, life_span, temperaments) => {
    const newDog = await Dog.create({ image, name, heightMin, heightMax, weightMin, weightMax, life_span });

//     console.log("temperaments", temperaments);

//     const tempDb = await Temperament.findAll({
//         where: { name: temperaments }
//     });
//     console.log('tempDB:', tempDb)

//     newDog.addTemperaments(tempDb);

//     return newDog;
// };

const temperamentsId = [];
// se busca en la tabla Temperaments el registro correspondiente al temp en cuestion con FindOne

for (const temp of temperaments) {                        // temperaments es un array de temperamentos
  const temperametsOfDog = await Temperament.findOne({
    where: {
      name: temp,
    },
  });
  // se agrega el id del temperamento al array
  if (temperametsOfDog) {
    temperamentsId.push(temperametsOfDog.id);
  }
}
//se asocia los temp seleccionado al dog nuevo
await newDog.addTemperament(temperamentsId);

return newDog;
}







const CgetBreedId = async (id, source) => {
    let dog;

    if (source === "api") {
        const apiDogsRaw = (
            await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            // await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)
        ).data;

        dog = CcleanArray(apiDogsRaw).find(dog => dog.id === id || dog.id === Number(id));
    } else {
        dog = await Dog.findByPk(id, { include: Temperament });
    }
    return dog;
};

const CgetAllDogs = async () => {
    const dataBaseDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], // Seleccionar solo la columna name de la tabla Temperament
            through: {            // Accedo a la table intermedia
                attributes: [] // Excluye el objeto dog_temperament
            }
        }
    });

    const dataBaseDogsF = dataBaseDogs.map(dog => {
        const temperaments = dog.Temperaments.map(temp => temp.name).join(", ");  // para que me lo muestre como una cadena de strings separados por , y no dentro de un array
        return {
            ...dog.toJSON(),
            Temperaments: temperaments
        };
    });

    

    const apiDogsRaw = (
        await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;

    const apiDogs = CcleanArray(apiDogsRaw);

    return [...dataBaseDogsF, ...apiDogs];

};


const CsearchDogByName = async (name) => {

    const dataBaseDogs = await Dog.findAll({
        where: {
            name: { [Sequelize.Op.iLike]: name }
        }, include: Temperament
    });  // Like para busqueda inexacta

    const apiDogsRaw = (
        await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data;

    const apiDogs = CcleanArray(apiDogsRaw);

    const filteredApi = apiDogs.filter((dog) => {     // Inlcude para buscqueda inexacta
        return name.toLowerCase() === dog.name.toLowerCase()
    });

    if (!filteredApi.length && !dataBaseDogs.length) throw new Error(`Dont found name ${name}`);

    return [...dataBaseDogs, ...filteredApi];
};




module.exports = { CcreateDog, CgetBreedId, CsearchDogByName, CgetAllDogs };