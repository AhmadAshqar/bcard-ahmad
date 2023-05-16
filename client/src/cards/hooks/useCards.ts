import { useState } from "react";
import CardInterface from "../interfaces/CardInterface";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApi";
import useAxios from "../../hooks/useAxios";

type ErrorType = null | string;
type CardsType = CardInterface[] | null;
type CardType = CardInterface | null;

const useCards = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [cards, setCards] = useState<CardsType>(null);
  const [card, setCard] = useState<CardType>(null);

  useAxios();

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    cards: CardsType,
    card: CardType
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setCards(cards);
    setCard(card);
  };

  const handleGetCards = async () => {
    try {
      setLoading(true);
      const cards = await getCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleGetMyCards = async () => {
    try {
      setLoading(true);
      const cards = await getMyCards();
      requestStatus(false, null, cards, null);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleGetCard = async (cardId: string) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleCreateCard = async (cardFromClient: CardInterface) => {
    try {
      setLoading(true);
      const card = await createCard(cardFromClient);
      requestStatus(false, null, null, card);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleUpdateCard = async (cardFromClient: CardInterface) => {
    try {
      setLoading(true);
      const card = await editCard(cardFromClient);
      requestStatus(false, null, null, card);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      requestStatus(false, null, null, null);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  const handleLikeCard = async (cardId: string) => {
    try {
      setLoading(true);
      const card = await changeLikeStatus(cardId);
      const cards = await getCards();
      requestStatus(false, null, cards, card);
    } catch (error) {
      if (typeof error === "string") {
        requestStatus(false, error, null, null);
      }
    }
  };

  return {
    isLoading,
    error,
    cards,
    card,
    handleGetCards,
    handleGetCard,
    handleCreateCard,
    handleDeleteCard,
    handleUpdateCard,
    handleLikeCard,
    handleGetMyCards,
  };
};

export default useCards;
