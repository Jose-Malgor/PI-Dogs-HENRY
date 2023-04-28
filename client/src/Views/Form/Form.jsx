import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const [form, setForm] = useState({
        image: "",
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        temperaments: "",
    })

    const [errors, setErrors] = useState({
        image: "",
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        temperaments: ""
    })
    const [temperaments, setTemperaments] = useState([]);

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({ ...form, [property]: value }) // le paso el valor que va a tener el estado para que vayan sincronizados.
        setForm({ ...form, [property]: value })
    }

    const validate = (form) => {
        let expression = /^[a-zA-Z ]+$/gm;
        let aux = {};

        (!form.name) && (aux.name = "Name is required");

        (!form.heightMin) && (aux.heightMin = "Height min is required");

        (!form.heightMax) && (aux.heightMax = "Height max is required");

        (!form.weightMin) && (aux.weightMin = "Weight min is required");

        (!form.weightMax) && (aux.weightMax = "Weight max is required");

        (!form.image) && (aux.image = "Image is required");

        (!form.life_span) && (aux.life_span = "Life span is required");


        if (!isNaN(parseInt(form.name))) {
            (aux.name = "Name is invalid, write a text");
        } else if (!expression.test(form.name)) {
            (aux.name = "Special caracters aren't supported");
        }


        if (form.life_span > 20 || form.life_span < 1) {
            (aux.life_span = " life span must be a number from 1 - 20");
        }

        if (Number(form.weightMin) <= 0 || Number(form.weightMin) >= 100) {
            (aux.weightMin = "Minimum heigh must be a number from 0 - 100");
        }
        if (Number(form.weightMax) <= 0 || Number(form.weightMax) > 150) {
            (aux.weightMax = "Maximun weight must be a number from 0 - 150");
        }
        if (Number(form.heightMin) <= 0 || Number(form.heightMin) >= 100) {
            (aux.heightMin = "Minimun height must be a number from 0 - 100");
        }
        if (Number(form.heightMax) <= 0 || Number(form.heightMax) > 100) {
            (aux.heightMax = "Maximun height must be a number from 0 - 100");
        }
        if (!form.temperaments?.length) {
            (aux. temperaments = "Select at least 1 temperament" );
        }
        setErrors({ ...aux })
        // return errors;
    };

    const submitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/dogs/", form)
            .then(res => alert(res))
            .catch(err => alert(err))
    }

    const reqTempBd = async () => {
        const tempBd = await axios.get("http://localhost:3001/temperaments/");
        console.log(tempBd.data)
        return tempBd.data;
    }

    useEffect(async () => {
        setTemperaments(await reqTempBd())
    }, [])

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>Imagen: </label>
                <input type="text" value={form.image} onChange={changeHandler} name="image" />
                {errors.image && <span>{errors.email}</span>}
            </div>

            <div>
                <label>Nombre: </label>
                <input type="text" value={form.name} onChange={changeHandler} name="name" />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label>Altura Min: </label>
                <input type="text" value={form.heightMin} onChange={changeHandler} name="heightMin" />
                {errors.heightMin && <span>{errors.heightMin}</span>}
            </div>

            <div>
                <label>Altura Max: </label>
                <input type="text" value={form.heightMax} onChange={changeHandler} name="heightMax" />
                {errors.heightMax && <span>{errors.heightMax}</span>}
            </div>

            <div>
                <label>Peso Min: </label>
                <input type="text" value={form.weightMin} onChange={changeHandler} name="weightMin" />
                {errors.weightMin && <span>{errors.weightMin}</span>}
            </div>

            <div>
                <label>Peso Max: </label>
                <input type="text" value={form.weightMax} onChange={changeHandler} name="weightMax" />
                {errors.weightMax && <span>{errors.weightMax}</span>}
            </div>

            <div>
                <label>Años de vida: </label>
                <input type="text" value={form.life_span} onChange={changeHandler} name="life_span" />
                {errors.life_span && <span>{errors.life_span}</span>}
            </div>

            {/* <div>
                <label>Temperamentos: </label>
                <input type="text" value={form.temperaments} onChange={changeHandler} name="temperaments" />
                {errors.temperaments && <span>{errors.temperaments}</span>}
            </div> */}

            {temperaments.length > 0 && temperaments.map((t) => {
                return (<div>
                    <input type='checkbox' id={t.name} name={t.name} />
                    <label>{t.name}</label>
                </div>)
            })}

            <button type="submit">SUBMIT</button>

        </form>
    )
}

export default Form;