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

import { AI_CREDIT_PACKS } from "../../constants/aiPlans";

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
            Créditos de IA
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 2, fontSize: { xs: "1.85rem", md: "2.5rem" } }}
          >
            Compra créditos fijos,
            <br />
            úsalos cuando quieras
          </Typography>
          <Typography
            sx={{
              maxWidth: 560,
              mx: "auto",
              color: "text.secondary",
              fontSize: "1.05rem",
            }}
          >
            Sin suscripción mensual de IA. Pagas un pack, el saldo se guarda y
            solo baja cuando usas Church AI o Media AI.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {AI_CREDIT_PACKS.map((pack) => (
            <Grid key={pack.id} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: pack.popular
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {pack.popular ? (
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
                  +${pack.usd}
                </Typography>
                <Stack direction="baseline" spacing={0.5} mt={1} mb={1}>
                  <Typography variant="h3" fontWeight={800}>
                    ${pack.usd}
                  </Typography>
                  <Typography color="text.secondary">pago único</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Se guarda hasta gastarlo
                </Typography>
                <Typography variant="body2" mb={2} sx={{ flexGrow: 0 }}>
                  {pack.description}
                </Typography>
                <Stack spacing={1} mb={3} sx={{ flexGrow: 1 }}>
                  {pack.highlights.map((h) => (
                    <Stack
                      key={h}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Check sx={{ fontSize: 18, color: "success.main" }} />
                      <Typography variant="body2">{h}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Button
                  variant={pack.popular ? "contained" : "outlined"}
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
      </Container>
    </Box>
  );
}
