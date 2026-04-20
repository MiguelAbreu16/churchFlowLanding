import { Box, Container, Typography, alpha, useTheme } from "@mui/material";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import PricingSection from "../components/home/PricingSection";

export default function PricingPage() {
  const theme = useTheme();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: 16,
          pb: 4,
          textAlign: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="caption"
            sx={{
              fontWeight: 900,
              letterSpacing: 3,
              color: "primary.light",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            Precios Transparentes
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, mb: 3 }}>
            Sin sorpresas.{" "}
            <Box component="span" className="gradient-text">
              Sin letra pequeña.
            </Box>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            Elige el plan que mejor se adapta al tamaño de tu iglesia. Cambia o cancela en
            cualquier momento.
          </Typography>
        </Container>
      </Box>
      <PricingSection showAll />
      <Footer />
    </>
  );
}
