import { useState, useMemo } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Lock from "@mui/icons-material/Lock";
import { PLANS } from "../../constants/plans";
import PricingCard from "../pricing/PricingCard";

const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID || "test";

function resolvePaypalPlanId(catalogEntry, billingCycle) {
  if (!catalogEntry) return null;
  return billingCycle === "annual"
    ? catalogEntry.paypalPlanIdAnnual
    : catalogEntry.paypalPlanIdMonthly;
}

export default function StepPlanPayment({
  form,
  errors,
  onChange,
  onBack,
  catalog,
  authSession,
  onPrepareAccount,
  onPayPalApprove,
  loading,
}) {
  const theme = useTheme();
  const [readyForPayPal, setReadyForPayPal] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [localError, setLocalError] = useState("");

  const selectedPlan =
    PLANS.find((p) => p.id === form.plan) || PLANS[1];

  const catalogEntry = useMemo(
    () => catalog.find((c) => c.landingId === form.plan),
    [catalog, form.plan],
  );

  const paypalPlanId = resolvePaypalPlanId(catalogEntry, form.billingCycle);

  const displayPrice =
    form.billingCycle === "annual"
      ? catalogEntry?.priceAnnual ?? selectedPlan.price * 12 * 0.8
      : catalogEntry?.priceMonthly ?? selectedPlan.price;

  const handleContinueToPayPal = async () => {
    setLocalError("");
    setPreparing(true);
    try {
      await onPrepareAccount();
      setReadyForPayPal(true);
    } catch (err) {
      setLocalError(err?.message || "No se pudo crear la cuenta");
    } finally {
      setPreparing(false);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        intent: "subscription",
        vault: true,
        currency: "USD",
      }}
    >
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Elige tu plan
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          14 días de prueba gratis. PayPal es obligatorio para activar tu cuenta.
        </Typography>

        <ToggleButtonGroup
          value={form.billingCycle}
          exclusive
          onChange={(_, v) => v && onChange("billingCycle", v)}
          size="small"
          sx={{ mb: 3 }}
        >
          <ToggleButton value="monthly">Mensual</ToggleButton>
          <ToggleButton value="annual">Anual (-20%)</ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {PLANS.map((plan) => (
            <Grid item xs={12} md={4} key={plan.id}>
              <PricingCard
                plan={{
                  ...plan,
                  price:
                    form.billingCycle === "annual"
                      ? Math.round(plan.price * 12 * 0.8)
                      : plan.price,
                  period: form.billingCycle === "annual" ? "año" : "mes",
                }}
                selected={form.plan === plan.id}
                onSelect={() => onChange("plan", plan.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: alpha(selectedPlan.color, 0.05),
            border: `1px solid ${alpha(selectedPlan.color, 0.15)}`,
            mb: 3,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Total seleccionado
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: selectedPlan.color }}>
            ${Math.round(displayPrice)} USD /{" "}
            {form.billingCycle === "annual" ? "año" : "mes"}
          </Typography>
        </Box>

        {!readyForPayPal ? (
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Lock sx={{ fontSize: 32, color: "text.disabled", mb: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Crearemos tu cuenta y luego conectarás PayPal de forma segura.
            </Typography>
            <Button
              variant="contained"
              size="large"
              disabled={preparing || loading}
              onClick={handleContinueToPayPal}
              startIcon={
                preparing ? <CircularProgress size={18} color="inherit" /> : null
              }
            >
              {preparing ? "Creando cuenta…" : "Continuar con PayPal"}
            </Button>
          </Box>
        ) : (
          <Box sx={{ mb: 3, minHeight: 120 }}>
            {paypalPlanId ? (
              <PayPalButtons
                style={{ layout: "vertical", shape: "pill", label: "subscribe" }}
                createSubscription={(_data, actions) =>
                  actions.subscription.create({
                    plan_id: paypalPlanId,
                    custom_id: authSession?.churchId,
                  })
                }
                onApprove={(data) => onPayPalApprove(data.subscriptionID)}
                onError={(err) =>
                  setLocalError(err?.message || "Error en PayPal")
                }
              />
            ) : (
              <Alert severity="warning">
                Plan PayPal no configurado para este tier. Contacta soporte o
                usa el entorno de desarrollo con IDs de prueba en el backend.
              </Alert>
            )}
          </Box>
        )}

        {(errors.submit || localError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit || localError}
          </Alert>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            onClick={onBack}
            disabled={loading || preparing}
          >
            Atrás
          </Button>
        </Box>
      </Box>
    </PayPalScriptProvider>
  );
}
