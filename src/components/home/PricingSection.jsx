import { Box, Container, Grid, Typography, alpha, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PricingCard from "../pricing/PricingCard";

export const PLANS = [
  {
    id: "basic",
    name: "Plan Semilla",
    price: 29,
    period: "mes",
    description: "Digitaliza tu iglesia hoy y optimiza tu primer nivel",
    features: [
      "Hasta 500 asientos por evento",
      "1 Nivel de plano (Santuario)",
      "5 Ugieres activos",
      "Monitoreo en tiempo real",
      "Soporte por correo electrónico",
    ],
    color: "#64748B",
    popular: false,
  },
  {
    id: "pro",
    name: "Plan Crecimiento",
    price: 79,
    period: "mes",
    description: "Gestión avanzada y seguridad para congregaciones activas",
    features: [
      "Hasta 2,000 asientos",
      "Niveles e iglesias ilimitadas",
      "20 Ugieres activos",
      "Protocolos de incidentes críticos",
      "Analítica de ocupación por zona",
      "Soporte prioritario 24/7",
    ],
    color: "#eab308", // Amber/Gold
    popular: true,
  },
  {
    id: "enterprise",
    name: "Plan Reino",
    price: 199,
    period: "mes",
    description: "Solución total multisede para ministerios globales",
    features: [
      "Asientos ilimitados",
      "Sedes ilimitadas (Multisitio)",
      "Ugieres ilimitados",
      "Logs de auditoría completos",
      "Acceso a API externa",
      "Gerente de cuenta dedicado",
    ],
    color: "#1E293B",
    popular: false,
  },
];

export default function PricingSection() {
  const theme = useTheme();
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
