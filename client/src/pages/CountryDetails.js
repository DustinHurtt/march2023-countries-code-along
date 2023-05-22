import { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import { LoadingContext } from "../context/loading.context";

import { getImage } from "../services/countries";

import { post } from "../services/authService";

const CountryDetails = () => {
  const { countries, country, findCountry, getCountries, user, setUser } = useContext(LoadingContext);

  const [mapPosition, setMapPosition] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate()

  let myIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [22, 36],
    iconAnchor: [11, 18],
    className: "marker",
  });

  const ChangeMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  const addCountry = (thisCountry) => {
    let addedCountry = {
        commonName: thisCountry.name.common,
        officialName: thisCountry.name.official,
        capital: thisCountry.capital[0],
        region: thisCountry.region,
        currencies: Object.values(thisCountry.currencies),
        languages: Object.values(thisCountry.languages),
        flag: getImage(thisCountry.alpha2Code),
        coordinates: thisCountry.latlng,
        country_id: thisCountry._id
    }
    post('/countries/create', addedCountry)
        .then((results) => {
            console.log("add country results", results.data)
            setUser(results.data)
            navigate('/profile')
        })
        .catch((err) => {
            console.log(err)
        })
  }

  useEffect(() => {
    if (country) {
      let position = [country.latlng[0], country.latlng[1]];
      setMapPosition(position);
    }
  }, [id, country]);


  useEffect(() => {
    if (!countries.length) {
      getCountries();
    } else {
        console.log("ID", id)
      findCountry(id);
    }
  }, [countries]);

  return (
    <div>
      {country ? (
        <div id="country">
          <h1>Country Details</h1>

          {user ? (
            <button onClick={()=>(addCountry(country))}>Add to visited countries</button>
          ) : (
            <p>Signup or Login to add to list of Visited Countries</p>
          )}

          <div id="country-details">
            <img src={getImage(country.alpha2Code)} alt="country" />

            <h2>{country.name.common}</h2>

            <h4>Official Name: {country.name.official}</h4>
            <h4>Capital: {country.capital[0]}</h4>
            <h4>Region: {country.region}</h4>

            {Object.values(country.languages).length ? (
              <>
                <p>
                  Languages:
                  <span> {Object.values(country.languages).join(", ")}</span>
                </p>
              </>
            ) : (
              <p>No official langauges</p>
            )}

            {Object.values(country.currencies).length ? (
              <>
                <p>
                  Currencies:
                  <span>
                    {" "}
                    {Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(" ")}
                  </span>
                  <span>
                    {" "}
                    {Object.values(country.currencies)
                      .map((currency) => currency.symbol)
                      .join(", ")}
                  </span>
                </p>
              </>
            ) : (
              <p>No currencies</p>
            )}

            {mapPosition ? (
              <div id="map-container">
                <MapContainer
                  id="map"
                  center={mapPosition}
                  zoom={4}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={mapPosition} icon={myIcon}>
                    <Popup>
                      <span>Location of {country.name.common}</span>
                    </Popup>
                  </Marker>
                  <ChangeMapView coords={mapPosition} />
                </MapContainer>
              </div>
            ) : (
              <p>No map available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountryDetails;

