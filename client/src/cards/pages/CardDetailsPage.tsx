import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../../components/PageHeader";
import { useParams } from "react-router-dom";
import CardInterface from "../interfaces/CardInterface";
import Card from "../components/card/Card";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const cards: CardInterface[] = [
    {
      _id: "abcd1",
      title: "One",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2023/04/15/17/08/bernese-mountain-dog-7928156_640.jpg",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
    {
      _id: "abcd2",
      title: "Two",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2023/04/15/17/08/bernese-mountain-dog-7928156_640.jpg",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
    {
      _id: "abcd3",
      title: "Three",
      subtitle: "Card Subtitle",
      description: "the card description",
      phone: "050-000000",
      image: {
        url: "https://cdn.pixabay.com/photo/2023/04/15/17/08/bernese-mountain-dog-7928156_640.jpg",
        alt: "test",
      },
      web: "",
      address: {
        state: "",
        country: "israel",
        city: "tel-aviv",
        street: "nahson",
        houseNumber: 5,
        zip: 1234,
      },
      bizNumber: 1000000,
      email: "test@gmail.com",
      likes: [],
      user_id: "123456789",
      createdAt: new Date(),
    },
  ];

  const card = cards.find((card: CardInterface) => card._id === cardId);

  if (!card) return <p>No card to display...</p>;
  // const card =
  return (
    <Container>
      <PageHeader
        title="Business Details"
        subtitle="Here you can see details of the business"
      />
      <div>
        Details of card: {cardId}
        <Card card={card} onDelete={console.log} />
      </div>
    </Container>
  );
};

export default CardDetailsPage;
