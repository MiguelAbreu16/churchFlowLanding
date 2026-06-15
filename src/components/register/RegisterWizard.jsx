import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  REGISTER_CHURCH,
  ATTACH_PAYPAL,
  PLAN_CATALOG,
} from "../../graphql/operations";
import StepChurchInfo from "./StepChurchInfo";
import StepAdminAccount from "./StepAdminAccount";
import StepPlanPayment from "./StepPlanPayment";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import Church from "@mui/icons-material/Church";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const STEPS = [
  { label: "Tu Iglesia", icon: <Church /> },
  { label: "Tu Cuenta", icon: <Person /> },
  { label: "Plan y Pago", icon: <CreditCard /> },
];

const INITIAL_FORM = {
  churchName: "",
  city: "",
  denomination: "",
  memberCount: "",
  adminName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  marketingOptIn: false,
  plan: "pro",
  billingCycle: "monthly",
};

export default function RegisterWizard() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data: catalogData } = useQuery(PLAN_CATALOG);

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    plan: params.get("plan") || "pro",
  });
  const [errors, setErrors] = useState({});
  const [authSession, setAuthSession] = useState(null);

  const [registerChurch, { loading: registering }] = useMutation(
    REGISTER_CHURCH,
    {
      onCompleted: ({ registerChurch: payload }) => {
        sessionStorage.setItem("cf_token", payload.token);
        if (payload.exchangeCode) {
          sessionStorage.setItem("cf_exchange", payload.exchangeCode);
        }
        setAuthSession({
          token: payload.token,
          exchangeCode: payload.exchangeCode,
          churchId: payload.user.churchId,
        });
      },
      onError: (err) => {
        setErrors({ submit: err.message });
      },
    },
  );

  const [attachPayPal, { loading: attaching }] = useMutation(ATTACH_PAYPAL, {
    onCompleted: ({ attachPayPalSubscription: payload }) => {
      sessionStorage.setItem("cf_token", payload.token);
      const code =
        sessionStorage.getItem("cf_exchange") || authSession?.exchangeCode;
      navigate(
        `/success?plan=${form.plan}${code ? `&code=${code}` : ""}`,
      );
    },
    onError: (err) => {
      setErrors({ submit: err.message });
    },
  });

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 0) {
      if (!form.churchName.trim())
        newErrors.churchName = "El nombre de la iglesia es requerido";
      if (!form.city.trim()) newErrors.city = "La ciudad es requerida";
      if (!form.memberCount)
        newErrors.memberCount = "Selecciona una cantidad aproximada";
    }
    if (step === 1) {
      if (!form.adminName.trim())
        newErrors.adminName = "Tu nombre es requerido";
      if (!form.email.trim()) newErrors.email = "El correo es requerido";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        newErrors.email = "Correo inválido";
      if (!form.password) newErrors.password = "La contraseña es requerida";
      else if (form.password.length < 8)
        newErrors.password = "Mínimo 8 caracteres";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      if (!form.acceptTerms)
        newErrors.acceptTerms = "Debes aceptar los términos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setErrors({});
  };

  const handlePrepareAccount = () => {
    if (authSession) return Promise.resolve(authSession);
    return registerChurch({
      variables: {
        name: form.churchName,
        adminName: form.adminName,
        email: form.email,
        password: form.password,
        plan: form.plan,
        memberCount: form.memberCount,
        marketingOptIn: form.marketingOptIn,
        billingCycle: form.billingCycle,
      },
    }).then(({ data }) => ({
      token: data.registerChurch.token,
      exchangeCode: data.registerChurch.exchangeCode,
      churchId: data.registerChurch.user.churchId,
    }));
  };

  const handlePayPalApprove = async (subscriptionId) => {
    await attachPayPal({
      variables: {
        paypalSubscriptionId: subscriptionId,
        billingCycle: form.billingCycle,
      },
    });
  };

  const catalog = catalogData?.planCatalog || [];

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
        {STEPS.map((step, i) => (
          <Step key={step.label} completed={i < activeStep}>
            <StepLabel
              StepIconProps={{
                sx: {
                  "&.Mui-active": { color: "primary.main" },
                  "&.Mui-completed": { color: "success.main" },
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: i === activeStep ? "primary.light" : "text.disabled",
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <StepChurchInfo
          form={form}
          errors={errors}
          onChange={updateForm}
          onNext={handleNext}
        />
      )}
      {activeStep === 1 && (
        <StepAdminAccount
          form={form}
          errors={errors}
          onChange={updateForm}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {activeStep === 2 && (
        <StepPlanPayment
          form={form}
          errors={errors}
          onChange={updateForm}
          onBack={handleBack}
          catalog={catalog}
          authSession={authSession}
          onPrepareAccount={handlePrepareAccount}
          onPayPalApprove={handlePayPalApprove}
          loading={registering || attaching}
        />
      )}
    </Box>
  );
}
