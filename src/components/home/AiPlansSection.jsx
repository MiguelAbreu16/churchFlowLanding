import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Paper,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

import { AI_PLANS, AI_CREDIT_PACKS } from "../../constants/aiPlans";

export default function AiPlansSection() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      id="ai-plans"
      component="section"
      sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default" }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 1.5,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            Planes de IA
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "1.85rem", md: "2.5rem" } }}
          >
            Paga por el uso de IA,
            <br />
            no por administrar keys
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: "auto",
              color: "text.secondary",
              fontSize: "1.05rem",
            }}
          >
            Independientes de Semilla, Crecimiento y Reino. El cupo se mide en
            dólares reales (tokens → costo). Cuando se acaba, compras créditos.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {AI_PLANS.map((plan) => (
            <Grid key={plan.id} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: plan.popular
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.popular ? (
                  <Chip
                    label="Más elegido"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      fontWeight: 700,
                    }}
                  />
                ) : null}
                <Typography variant="h6" fontWeight={800}>
                  {plan.name}
                </Typography>
                <Stack direction="baseline" spacing={0.5} mt={1} mb={1}>
                  <Typography variant="h3" fontWeight={800}>
                    ${plan.priceMonthly}
                  </Typography>
                  <Typography color="text.secondary">/mes</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Cupo incluido: ${plan.budgetUsd}/mes · anual ${plan.priceAnnual}
                </Typography>
                <Typography variant="body2" mb={2} sx={{ flexGrow: 0 }}>
                  {plan.description}
                </Typography>
                <Stack spacing={1} mb={3} sx={{ flexGrow: 1 }}>
                  {plan.highlights.map((h) => (
                    <Stack key={h} direction="row" spacing={1} alignItems="center">
                      <Check sx={{ fontSize: 18, color: "success.main" }} />
                      <Typography variant="body2">{h}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button
                  variant={plan.popular ? "contained" : "outlined"}
                  fullWidth
                  onClick={() => navigate("/register")}
                  sx={{ fontWeight: 700 }}
                >
                  Empezar
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="subtitle1" fontWeight={700} mb={1}>
            Créditos extra (no se reinician)
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {AI_CREDIT_PACKS.map((p) => (
              <Chip
                key={p.id}
                label={`+$${p.usd}`}
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
