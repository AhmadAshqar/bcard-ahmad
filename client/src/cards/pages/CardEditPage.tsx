import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import Card from "../components/card/Card";
import useCards from "../hooks/useCards";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const {card,error,isLoading,handleGetCard} = useCards()

  useEffect(()=>{if(cardId) handleGetCard(cardId)},[])

  if(isLoading) return <Spinner/>
  if(error) return <Error errorMessage={error}/>
  if (!isLoading && !card) return <p>No card to display...</p>;

  if(!isLoading && card) return (
    <Container>
      <PageHeader
        title="Business Edit"
        subtitle="Here you can edit card of the business"
      />
      <div>
        Edit of card: {cardId}
        <Card card={card} />
      </div>

    </Container>
  );
  return null
};

export default CardDetailsPage;
