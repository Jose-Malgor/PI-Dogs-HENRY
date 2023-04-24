const {Temperament} = require("../db");
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;




const createTemp = async () =>{
const apiInfo = (
    await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
);

const apiTemp = apiInfo.data
      .flatMap((breed) => breed.temperament ? breed.temperament.split(', ') : [])
      .filter((temp, index, arr) => temp && arr.indexOf(temp) === index);  // para que no se repitan los temperamentos
      

//console.log(apiTemp);

      for (let i = 0; i < apiTemp.length; i++) {
        const name = apiTemp[i];
         await Temperament.findOrCreate({  
          where: {name }, });
      }

      const dbTemp = await Temperament.findAll({
        order: ["name"], raw: true     //Al habilitar la opción raw: true, Sequelize devolverá los resultados de la consulta como objetos planos de JavaScript en lugar de objetos Sequelize. Esto significa que los objetos resultantes no tendrán las funciones y propiedades adicionales que Sequelize agrega a los objetos
      });

//console.log(dbTemp);

 return dbTemp;
}

module.exports={
    createTemp,
}