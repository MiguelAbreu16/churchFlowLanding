import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  return score;
}

function getStrengthLabel(score) {
  if (score <= 25) return { label: "Débil", color: "error" };
  if (score <= 50) return { label: "Regular", color: "warning" };
  if (score <= 75) return { label: "Buena", color: "info" };
  return { label: "Fuerte", color: "success" };
}

export default function StepAdminAccount({ form, errors, onChange, onNext, onBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getPasswordStrength(form.password);
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(strength);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Crea tu cuenta de administrador
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Esta será la cuenta principal con acceso completo a ChurchFlow.
      </Typography>

      <Stack spacing={3}>
        <TextField
          id="register-admin-name"
          label="Tu nombre completo *"
          value={form.adminName}
          onChange={(e) => onChange("adminName", e.target.value)}
          error={!!errors.adminName}
          helperText={errors.adminName}
          fullWidth
          placeholder="Ej: Juan García"
        />

        <TextField
          id="register-admin-email"
          label="Correo electrónico *"
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          placeholder="pastor@miiglesia.com"
        />

        <Box>
          <TextField
            id="register-admin-password"
            label="Contraseña *"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {form.password && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={strength}
                color={strengthColor}
                sx={{ height: 4, borderRadius: 2 }}
              />
              <Typography
                variant="caption"
                color={`${strengthColor}.main`}
                sx={{ fontWeight: 700 }}
              >
                Contraseña {strengthLabel}
              </Typography>
            </Box>
          )}
        </Box>

        <TextField
          id="register-admin-confirm-password"
          label="Confirmar contraseña *"
          type={showConfirm ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                id="register-accept-terms"
                checked={form.acceptTerms}
                onChange={(e) => onChange("acceptTerms", e.target.checked)}
                sx={{ color: errors.acceptTerms ? "error.main" : undefined }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Acepto los{" "}
                <Box
                  component="a"
                  href="#"
                  sx={{ color: "primary.light", textDecoration: "none" }}
                >
                  Términos de Uso
                </Box>{" "}
                y la{" "}
                <Box
                  component="a"
                  href="#"
                  sx={{ color: "primary.light", textDecoration: "none" }}
                >
                  Política de Privacidad
                </Box>
              </Typography>
            }
          />
          {errors.acceptTerms && (
            <FormHelperText error sx={{ ml: 4 }}>
              {errors.acceptTerms}
            </FormHelperText>
          )}
        </Box>
      </Stack>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}>
        <Button
          id="register-step2-back"
          variant="text"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ color: "text.secondary" }}
        >
          Atrás
        </Button>
        <Button
          id="register-step2-next"
          variant="contained"
          color="primary"
          size="large"
          endIcon={<ArrowForward />}
          onClick={onNext}
          sx={{ px: 6, py: 1.5 }}
        >
          Continuar
        </Button>
      </Box>
    </Box>
  );
}
