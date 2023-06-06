import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 32.109333,
  lng: 	34.855499,
};

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const { value, handleGetCard } = useCards();
  const { card, error, isLoading } = value;

  useEffect(() => {
    if (cardId) handleGetCard(cardId);
  }, []);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (!isLoading && !card) return <p>No card to display...</p>;

  if (!isLoading && card)
    return (
      <Container>
        <PageHeader
          title="Business Details"
          subtitle="Here you can see details of the business"
        />
        <div className="profile-page">
          <div className="profile-container">
            <img
              src={card.image.url}
              alt={card.image.alt}
              style={{ width: "200px" }}
            />
            <div className="profile-info center">
              <div className="profile-row">
                <h3>Title:</h3>
                <p>{card.title}</p>
              </div>
              <div className="profile-row">
                <h3>SubTitle:</h3>
                <p>{card.subtitle}</p>
              </div>
              <div className="profile-row">
                <h3>Phone:</h3>
                <p>{card.phone}</p>
              </div>
              <div className="profile-row">
                <h3>Email:</h3>
                <p>{card.email}</p>
              </div>
              <div className="profile-row">
                <h3>Country:</h3>
                <p>{card.address.country}</p>
              </div>
              <div className="profile-row">
                <h3>State:</h3>
                <p>{card.address.state}</p>
              </div>
              <div className="profile-row">
                <h3>City:</h3>
                <p>{card.address.city}</p>
              </div>
              <div className="profile-row">
                <h3>Street:</h3>
                <p>{card.address.street}</p>
              </div>
              <div className="profile-row">
                <h3>House Number:</h3>
                <p>{card.address.houseNumber}</p>
              </div>
              <LoadScript googleMapsApiKey="AIzaSyCE2GFg0xxeKkuGchNO5WkZ2JrIlizCXws">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </Container>
    );

  return null;
};

export default CardDetailsPage;
