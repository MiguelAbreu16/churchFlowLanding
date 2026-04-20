import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_CHURCH } from "../../graphql/operations";
import StepChurchInfo from "./StepChurchInfo";
import StepAdminAccount from "./StepAdminAccount";
import StepPlanPayment from "./StepPlanPayment";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
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
  plan: "professional",
};

export default function RegisterWizard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    plan: params.get("plan") || "professional",
  });
  const [errors, setErrors] = useState({});

  const [registerChurch, { loading }] = useMutation(REGISTER_CHURCH, {
    onCompleted: ({ registerChurch: payload }) => {
      // Pass the token to the main app via query param for auto-login
      const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";
      sessionStorage.setItem("cf_token", payload.token);
      navigate("/success?plan=" + form.plan);
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
      if (!form.churchName.trim()) newErrors.churchName = "El nombre de la iglesia es requerido";
      if (!form.city.trim()) newErrors.city = "La ciudad es requerida";
      if (!form.memberCount) newErrors.memberCount = "Selecciona una cantidad aproximada";
    }
    if (step === 1) {
      if (!form.adminName.trim()) newErrors.adminName = "Tu nombre es requerido";
      if (!form.email.trim()) newErrors.email = "El correo es requerido";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido";
      if (!form.password) newErrors.password = "La contraseña es requerida";
      else if (form.password.length < 8) newErrors.password = "Mínimo 8 caracteres";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      if (!form.acceptTerms) newErrors.acceptTerms = "Debes aceptar los términos";
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

  const handleSubmit = () => {
    registerChurch({
      variables: {
        name: form.churchName,
        adminName: form.adminName,
        email: form.email,
        password: form.password,
        plan: form.plan,
        memberCount: form.memberCount,
      },
    });
  };

  return (
    <Box>
      {/* Step indicator */}
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

      {/* Step content */}
      {activeStep === 0 && (
        <StepChurchInfo form={form} errors={errors} onChange={updateForm} onNext={handleNext} />
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
          onSubmit={handleSubmit}
          onBack={handleBack}
          loading={loading}
        />
      )}
    </Box>
  );
}
