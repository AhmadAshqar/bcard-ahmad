import React from "react";
import Typography from "@mui/material/Typography";
import CardInterface from "../interfaces/CardInterface";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import Cards from "./Cards";

type Props = { 
  isLoading: boolean;
  error: string | null;
  cards: CardInterface[] | null;
};

const CardsFeedback: React.FC<Props> = ({ isLoading, error, cards }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <Error errorMessage={error} />;
  }
  if (cards && cards.length) {
    return <Cards cards={cards} />;
  }
  if (cards && !cards.length) {
    return (
      <Typography>
        Opss... it seems that there are no business cards to display...
      </Typography>
    );
  }
  return null;
};

export default CardsFeedback;
