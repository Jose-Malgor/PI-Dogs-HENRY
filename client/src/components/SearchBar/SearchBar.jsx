import { useState } from "react";
import { getDogByName } from "../../redux/actions"
import { useDispatch } from "react-redux";
import lupa from "../../img/lupa.png"
import styles from "../SearchBar/SearchBar.module.css"


export default function SearchBar() {
   const [name, setName] = useState("");
   const dispatch = useDispatch();

   function handleSubmit() {
      if (name.length === 0) {
         return alert("Please write a valid name");
      } else {
         dispatch(getDogByName(name));
         setName("");
      }
   }


   return (
      <div className={styles.searchContainer}>
         <input className={styles.input} type='search' placeholder="Search dog by name" onChange={(e) => setName(e.target.value)} />
         <button className={styles.searchButton} onClick={()=>handleSubmit()}><p className={styles.buttonContent} >Search<img src={lupa} alt="lupa" style={{ maxWidth: "25px" }} /></p>
            
         </button>

      </div>
   );
}