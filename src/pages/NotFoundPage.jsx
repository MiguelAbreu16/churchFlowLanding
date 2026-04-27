import { Box, Container, Typography, Button } from "@mui/material";
import Home from "@mui/icons-material/Home";
import SentimentVeryDissatisfied from "@mui/icons-material/SentimentVeryDissatisfied";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          pt: 12,
        }}
      >
        <Container maxWidth="sm">
          <SentimentVeryDissatisfied sx={{ fontSize: 100, color: "text.disabled", mb: 4, opacity: 0.5 }} />
          
          <Typography variant="h1" sx={{ fontSize: { xs: "5rem", md: "8rem" }, lineHeight: 1, mb: 1 }}>
            404
          </Typography>
          
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
            Página no encontrada
          </Typography>
          
          <Typography color="text.secondary" sx={{ mb: 6, fontSize: "1.1rem" }}>
            Lo sentimos, la página que estás buscando no existe o ha sido movida temporalmente.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{ px: 6, py: 1.8 }}
          >
            Volver al Inicio
          </Button>
        </Container>
      </Box>
    </>
  );
}
