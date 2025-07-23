import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { CircularProgress, Alert, Pagination } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const limit = 20; // liczba pokemonów na stronę
  const offset = (page - 1) * limit;

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setCount(Math.ceil(data.count / limit));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [offset]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        {pokemons.map((pokemon) => (
          <Grid xs={12} sm={6} md={3} key={pokemon.name}>
            <PokemonCard name={pokemon.name} url={pokemon.url} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={count}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
