import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import InfoWindow from "./InfoWindow";
import marker from "../../images/gps-icon-makelaar.png";
import style from "./GoogleMap.module.css";

require("dotenv").config();

const { REACT_APP_GOOGLE_API_KEY } = process.env;

export function MapContainer({ lat, lng, estates }) {
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });
  const [show, setShow] = useState(null);

  useEffect(() => {
    if (estates) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ ...coordinates, lat: latitude, lng: longitude });
        }
      );
    } else {
      setCoordinates({ ...coordinates, lat: lat, lng: lng });
    } // eslint-disable-next-line
  }, [lat, lng, estates]);

  const Marker = ({ onClick, lat, lng }) => {
    return (
      <div className={style.marker} lat={lat} lng={lng} onClick={onClick}>
        <img src={marker} alt={"logo"} className={style.markerIcon} />
      </div>
    );
  };
  const Markers = estates?.map((estate, index) => {
    return (
      <Marker
        lat={estate.lat}
        lng={estate.lng}
        key={index}
        onClick={() =>
          setShow({
            id: estate.id,
            name: estate.name,
            img: estate.Images[0].url,
            address: estate.address,
            transaction: estate.transaction,
            price: estate.price,
          })
        }
      />
    );
  });

  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: { REACT_APP_GOOGLE_API_KEY } }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
      >
        {estates ? (
          Markers
        ) : (
          <Marker lat={coordinates.lat} lng={coordinates.lng} />
        )}
      </GoogleMapReact>
      {show && (
        <InfoWindow
          name={show.name}
          address={show.address}
          img={show.img}
          type={show.type}
          price={show.price}
          id={show.id}
          setShow={setShow}
        />
      )}
    </>
  );
}

export default MapContainer;
