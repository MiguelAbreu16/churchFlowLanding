import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PricingCard from "../pricing/PricingCard";

import { PLANS } from "../../constants/plans";

export default function PricingSection() {
  const navigate = useNavigate();

  return (
    <Box id="pricing" className="section" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            Inversión
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            Planes adaptados a tu
            <br />
            <Box component="span" sx={{ color: "primary.main" }}>
              etapa ministerial
            </Box>
          </Typography>
          <Typography sx={{ maxWidth: 520, mx: "auto", color: "text.secondary", fontSize: "1.1rem" }}>
            Prueba cualquier plan gratis por 14 días. Sin contratos forzosos ni cargos ocultos.
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="stretch">
          {PLANS.map((plan) => (
            <Grid item xs={12} sm={4} key={plan.id}>
              <PricingCard 
                plan={plan} 
                onSelect={() => navigate(`/register?plan=${plan.id}`)} 
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            ¿Necesitas algo a medida? <Box component="span" sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer" }}>Contáctanos para un presupuesto personalizado</Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
