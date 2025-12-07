import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

import styles from "./City.module.css";

import BackButton from "./BackButton";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const flagemojiToPNG = (flag) => {
    if(!flag) return;
    try {
      const countryCode = Array.from(flag,
           (codeUnit) => codeUnit.codePointAt())
           .map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
      return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
    } catch(e) {
      return null;
    }
}


function City() {
  const {id} = useParams();
  const {currentCity, getCity} = useCities();
  
  useEffect(function(){
    getCity(id)
  }, [id, getCity])


  const { cityName, emoji, date, notes } = currentCity;
  
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagemojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
