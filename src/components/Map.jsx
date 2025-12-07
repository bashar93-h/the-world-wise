import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";

import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeoLocation from "../hooks/useGeoLocation";

import styles from "./Map.module.css";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

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


function Map() {
    const {cities} = useCities();

    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition
    } = useGeoLocation();
    
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(function(){
        if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(function(){
        if(geoLocationPosition) 
            setMapPosition([geoLocationPosition.lat,
            geoLocationPosition.lng])
    }, [geoLocationPosition])

    return(
        <div className={styles.mapContainer}>

            {!geoLocationPosition && <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? 'loading...' : 'Use your position'}
            </Button>}
            <MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map(city => ( 
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{flagemojiToPNG(city.emoji)}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={ mapPosition }/>
                <DetectClick />
            </MapContainer>
        </div>
    )

}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvent({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}
export default Map;