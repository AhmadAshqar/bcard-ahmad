import React, {useState, useEffect} from "react";
import PageHeader from "../../components/PageHeader";
import { Container } from "@mui/material";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

const CardsPage = () => {
  const {cards, error, isLoading, handleGetMyCards} = useCards()
  
  useEffect(()=>{
    handleGetMyCards()
  },[])


  return (
    <Container>
      <PageHeader
        title="My Cards Page"
        subtitle="Here you can find all types of business cards"
      />
      <CardsFeedback isLoading={isLoading} error={error} cards={cards} />
    </Container>
  );
};

export default CardsPage;
