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
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Lock from "@mui/icons-material/Lock";
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import { PLANS } from "../../constants/plans";
import PricingCard from "../pricing/PricingCard";

const PAYPAL_CLIENT_ID = (import.meta.env.VITE_PAYPAL_CLIENT_ID || "").trim();
const HAS_PAYPAL_CLIENT =
  Boolean(PAYPAL_CLIENT_ID) && PAYPAL_CLIENT_ID !== "test";

function resolvePaypalPlanId(catalogEntry, billingCycle) {
  if (!catalogEntry) return null;
  const id =
    billingCycle === "annual"
      ? catalogEntry.paypalPlanIdAnnual
      : catalogEntry.paypalPlanIdMonthly;
  if (!id || /_ID$/.test(id) || id.includes("PLACEHOLDER")) return null;
  return id;
}

function isPlaceholderPlanId(id) {
  return !id || /_ID$/.test(id) || String(id).includes("PLACEHOLDER");
}

export default function StepPlanPayment({
  form,
  errors,
  onChange,
  onBack,
  catalog,
  authSession,
  onPrepareAccount,
  onStartTrial,
  onPayPalApprove,
  loading,
}) {
  const [readyForPayPal, setReadyForPayPal] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [startingTrial, setStartingTrial] = useState(false);
  const [localError, setLocalError] = useState("");

  const selectedPlan = PLANS.find((p) => p.id === form.plan) || PLANS[1];

  const catalogEntry = useMemo(
    () => catalog.find((c) => c.landingId === form.plan),
    [catalog, form.plan],
  );

  const paypalPlanId = resolvePaypalPlanId(catalogEntry, form.billingCycle);
  const planIdsConfigured = Boolean(paypalPlanId);

  const displayPrice =
    form.billingCycle === "annual"
      ? (catalogEntry?.priceAnnual ?? selectedPlan.price * 12 * 0.8)
      : (catalogEntry?.priceMonthly ?? selectedPlan.price);

  const handleStartTrial = async () => {
    setLocalError("");
    setStartingTrial(true);
    try {
      await onStartTrial();
    } catch (err) {
      setLocalError(err?.message || "No se pudo crear la cuenta de prueba");
    } finally {
      setStartingTrial(false);
    }
  };

  const handleContinueToPayPal = async () => {
    setLocalError("");
    if (!HAS_PAYPAL_CLIENT) {
      setLocalError(
        "El pago con PayPal no está disponible en este momento. Puedes empezar tu prueba gratis de 14 días y conectar el pago más adelante.",
      );
      return;
    }
    if (!planIdsConfigured) {
      setLocalError(
        "Aún no podemos conectar el cobro en línea. Empieza la prueba gratis o escribe a soporte si necesitas ayuda.",
      );
      return;
    }
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

  const busy = preparing || startingTrial || loading;

  const paymentBody = (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Elige tu plan
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        14 días de prueba gratis. Sin tarjeta. Puedes añadir PayPal cuando
        quieras.
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
          <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
            <PricingCard
              plan={{
                ...plan,
                price:
                  form.billingCycle === "annual"
                    ? Math.round(plan.price * 12 * 0.8)
                    : plan.price,
                billingAnnual: form.billingCycle === "annual",
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
          Total después del trial
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: selectedPlan.color }}
        >
          ${Math.round(displayPrice)} USD /{" "}
          {form.billingCycle === "annual" ? "año" : "mes"}
        </Typography>
      </Box>

      {!readyForPayPal ? (
        <Stack spacing={2} sx={{ mb: 3 }} alignItems="stretch">
          <Button
            variant="contained"
            size="large"
            disabled={busy}
            onClick={handleStartTrial}
            startIcon={
              startingTrial ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <RocketLaunch />
              )
            }
            sx={{ py: 1.5, fontWeight: 800 }}
          >
            {startingTrial
              ? "Creando cuenta…"
              : "Empezar prueba gratis (14 días)"}
          </Button>

          <Divider>
            <Typography variant="caption" color="text.secondary">
              o
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center" }}>
            <Lock sx={{ fontSize: 28, color: "text.disabled", mb: 0.5 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              Opcional: conecta PayPal ahora para facturar al terminar el
              trial.
            </Typography>
            {!HAS_PAYPAL_CLIENT && (
              <Alert severity="info" sx={{ mb: 2, textAlign: "left" }}>
                El cobro con PayPal no está disponible aquí por ahora. Usa la
                prueba gratis de 14 días; podrás conectar el pago más adelante
                desde tu panel.
              </Alert>
            )}
            {HAS_PAYPAL_CLIENT &&
              catalogEntry &&
              isPlaceholderPlanId(
                form.billingCycle === "annual"
                  ? catalogEntry.paypalPlanIdAnnual
                  : catalogEntry.paypalPlanIdMonthly,
              ) && (
                <Alert severity="info" sx={{ mb: 2, textAlign: "left" }}>
                  Aún no podemos completar el cobro en línea para este plan.
                  Empieza la prueba gratis y vuelve cuando el pago esté listo.
                </Alert>
              )}
            <Button
              variant="outlined"
              size="large"
              disabled={busy || !HAS_PAYPAL_CLIENT || !planIdsConfigured}
              onClick={handleContinueToPayPal}
              startIcon={
                preparing ? (
                  <CircularProgress size={18} color="inherit" />
                ) : null
              }
            >
              {preparing ? "Preparando…" : "Añadir PayPal ahora (opcional)"}
            </Button>
          </Box>
        </Stack>
      ) : (
        <Box sx={{ mb: 3, minHeight: 120 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Cuenta creada. Confirma el pago con PayPal para vincular tu
            suscripción, o continúa solo con la prueba.
          </Alert>
          {paypalPlanId && HAS_PAYPAL_CLIENT ? (
            <PayPalButtons
              style={{ layout: "vertical", shape: "pill", label: "subscribe" }}
              createSubscription={(_data, actions) =>
                actions.subscription.create({
                  plan_id: paypalPlanId,
                  custom_id: authSession?.churchId,
                })
              }
              onApprove={(data) => onPayPalApprove(data.subscriptionID)}
              onError={() =>
                setLocalError(
                  "No se pudo completar el pago. Inténtalo de nuevo o continúa con la prueba gratis.",
                )
              }
            />
          ) : (
            <Alert severity="info">
              No podemos mostrar el botón de pago ahora. Continúa con la prueba
              gratis y conecta el cobro más adelante.
            </Alert>
          )}
          <Button
            variant="text"
            sx={{ mt: 2 }}
            disabled={busy}
            onClick={handleStartTrial}
          >
            Continuar solo con la prueba (sin PayPal)
          </Button>
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
          disabled={busy}
        >
          Atrás
        </Button>
      </Box>
    </Box>
  );

  if (!HAS_PAYPAL_CLIENT) {
    return paymentBody;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        intent: "subscription",
        vault: true,
        currency: "USD",
      }}
    >
      {paymentBody}
    </PayPalScriptProvider>
  );
}
