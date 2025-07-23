import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

interface PokemonDetails {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export default function DetailsPage() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [name]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!pokemon) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ maxWidth: 650, mx: "auto", textAlign: "center" }}>
        <CardMedia
          component="img"
          height="200"
          image={pokemon.sprites.front_default}
          alt={pokemon.name}
          sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
        />
        <CardContent>
          <Typography variant="h4" sx={{ textTransform: "capitalize", mb: 2 }}>
            {pokemon.name}
          </Typography>

          <Typography sx={{ mb: 1 }} variant="h6">
            Types
          </Typography>
          <Box sx={{ mb: 2 }}>
            {pokemon.types.map((type) => (
              <Chip
                key={type.type.name}
                label={type.type.name}
                color="primary"
                sx={{ m: 0.5, textTransform: "capitalize" }}
              />
            ))}
          </Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Abilities
          </Typography>
          <Box sx={{ mb: 2 }}>
            {pokemon.abilities.map((ability) => (
              <Chip
                key={ability.ability.name}
                label={ability.ability.name}
                color="primary"
                sx={{ m: 0.5, textTransform: "capitalize" }}
              />
            ))}
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Stats
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {pokemon.stats.map((stat) => (
              <Grid xs={6} key={stat.stat.name}>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Button sx={{ mb: 4 }} variant="outlined" component={Link} to="/">
          POKEDEX
        </Button>
      </Card>
    </Container>
  );
}
