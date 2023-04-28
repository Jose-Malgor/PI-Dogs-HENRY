import { useState } from "react";
import {getDogByName } from "../../redux/actions"
import { useDispatch } from "react-redux";
import lupa from "../../img/lupa.png"


export default function SearchBar({}) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    function handleOnChange(e) {
        setName(e.target.value);
        }


    function handleSubmit(name) {
          if (name.length === 0) {
          return alert("Please write a name");
        } else {
          dispatch(getDogByName(name));
          setName("");
        }
      }


   return (
      <div>
         <input type='search' placeholder="Search dog by name" onChange={handleOnChange} />
         <button onClick={() => handleSubmit(name)}>Search 
         <img src={lupa} alt="lupa" style={{ maxWidth: "23px" }} />
         </button>
         
      </div>
   );
}