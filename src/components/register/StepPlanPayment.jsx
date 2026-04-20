import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Alert,
  CircularProgress,
  alpha,
  useTheme,
  Chip,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Lock from "@mui/icons-material/Lock";
import Rocket from "@mui/icons-material/Rocket";
import { PLANS } from "../home/PricingSection";
import PricingCard from "../pricing/PricingCard";

export default function StepPlanPayment({
  form,
  errors,
  onChange,
  onSubmit,
  onBack,
  loading,
}) {
  const theme = useTheme();
  const selectedPlan = PLANS.find((p) => p.id === form.plan) || PLANS[1];

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Elige tu plan
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Todos los planes incluyen 14 días de prueba gratuita. Sin tarjeta de crédito requerida ahora.
      </Typography>

      {/* Plan selector */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {PLANS.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <PricingCard
              plan={plan}
              selected={form.plan === plan.id}
              onSelect={() => onChange("plan", plan.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Payment placeholder */}
      <Box
        sx={{
          p: 4,
          borderRadius: 3,
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          mb: 4,
          textAlign: "center",
        }}
      >
        <Lock sx={{ fontSize: 36, color: "text.disabled", mb: 1.5 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Pago Seguro con Stripe
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 400, mx: "auto" }}>
          Integración de pago disponible próximamente. Por ahora, tu cuenta se creará en modo de
          prueba gratuita de 14 días sin necesidad de tarjeta de crédito.
        </Typography>
        <Chip
          label="🔒  Próximamente: Visa, Mastercard, PayPal"
          size="small"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.08),
            color: "text.disabled",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Summary */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: alpha(selectedPlan.color, 0.05),
          border: `1px solid ${alpha(selectedPlan.color, 0.15)}`,
          mb: 4,
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Resumen de tu registro:
        </Typography>
        <Stack spacing={0.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Iglesia
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
              {form.churchName || "—"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Administrador
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
              {form.adminName || "—"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Plan seleccionado
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 800, color: selectedPlan.color }}
            >
              {selectedPlan.name}
              {selectedPlan.price ? ` — $${selectedPlan.price}/mes` : " — A convenir"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary">
              Período de prueba
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "success.main" }}>
              14 días gratis
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Errors */}
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {errors.submit}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          id="register-step3-back"
          variant="text"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ color: "text.secondary" }}
          disabled={loading}
        >
          Atrás
        </Button>
        <Button
          id="register-step3-submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Rocket />}
          onClick={onSubmit}
          disabled={loading}
          sx={{ px: 6, py: 1.8, fontSize: "1rem" }}
        >
          {loading ? "Creando tu iglesia..." : "Crear mi Iglesia"}
        </Button>
      </Box>
    </Box>
  );
}
