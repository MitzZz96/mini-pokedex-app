import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: Props) {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  //Pokeball wyświetlany w momencie kiedy pokemon zamiast img ma null
  const default_img =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.sprites.front_default || default_img);
        setLoading(false);
      })
      .catch(() => {
        setImage("");
        setLoading(false);
      });
  }, [url]);

  return (
    <Card sx={{ maxWidth: 345, textAlign: "center" }}>
      <CardActionArea component={Link} to={`/pokemon/${name}`}>
        {loading ? (
          <Box sx={{ p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {image && (
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={name}
                sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
              />
            )}
            <CardContent>
              <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                {name}
              </Typography>
            </CardContent>
          </>
        )}
      </CardActionArea>
    </Card>
  );
}
