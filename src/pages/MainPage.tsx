import PokemonList from "../components/PokemonList";
import { Container, Typography } from "@mui/material";

export default function MainPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" textAlign={"center"} gutterBottom>
        Mini Pokedex
      </Typography>
      <PokemonList />
    </Container>
  );
}
