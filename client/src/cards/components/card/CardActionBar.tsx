import React from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import ROUTES from "../../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import CardInterface from "../../interfaces/CardInterface";
import useCards from "../../hooks/useCards";

type Props = {
  cardId: string;
};

const CardActionBar: React.FC<Props> = ({ cardId }) => {
  const {handleDeleteCard, handleLikeCard} = useCards()
  const navigate = useNavigate();
  const handleDelete = (cardId: string) => handleDeleteCard(cardId)

  return (
    <CardActions disableSpacing sx={{ pt: 0, justifyContent: "space-between" }}>
      <Box>
        <IconButton onClick={() => handleDelete(cardId)} aria-label="delete card">
          <DeleteIcon />
        </IconButton>

        <IconButton onClick={() => navigate(`${ROUTES.CARD_EDIT}/${cardId}`)} aria-label="edit card">
          <EditIcon />
        </IconButton>
      </Box>

      <Box>
        <IconButton aria-label="call business">
          <CallIcon />
        </IconButton>
        <IconButton onClick={()=> handleLikeCard(cardId)} aria-label="add to fav">
          <FavoriteIcon />
        </IconButton>
      </Box>
    </CardActions>
  );
};

export default CardActionBar;
