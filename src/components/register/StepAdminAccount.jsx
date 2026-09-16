import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TermsContent from "../legal/TermsContent";

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
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsRead, setTermsRead] = useState(Boolean(form.termsRead));
  const scrollRef = useRef(null);

  const strength = getPasswordStrength(form.password);
  const { label: strengthLabel, color: strengthColor } = getStrengthLabel(strength);

  const handleTermsScroll = () => {
    const el = scrollRef.current;
    if (!el || termsRead) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
    if (nearBottom) {
      setTermsRead(true);
      onChange("termsRead", true);
    }
  };

  const markReadAndClose = () => {
    setTermsRead(true);
    onChange("termsRead", true);
    setTermsOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Crea tu cuenta de administrador
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Esta será la cuenta principal con acceso completo a Kahal Zerem.
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
          <Button
            id="register-open-terms"
            variant="outlined"
            size="small"
            onClick={() => setTermsOpen(true)}
            sx={{ mb: 1 }}
          >
            Leer Términos y Condiciones
          </Button>
          {!termsRead && (
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 1 }}>
              Debes abrir y leer los términos (desplázate hasta el final) antes de aceptarlos.
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                id="register-accept-terms"
                checked={form.acceptTerms}
                disabled={!termsRead}
                onChange={(e) => onChange("acceptTerms", e.target.checked)}
                sx={{ color: errors.acceptTerms ? "error.main" : undefined }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Acepto los{" "}
                <Link component={RouterLink} to="/legal/terminos" target="_blank" rel="noopener">
                  Términos de Uso
                </Link>{" "}
                y la{" "}
                <Link component={RouterLink} to="/legal/privacidad" target="_blank" rel="noopener">
                  Política de Privacidad
                </Link>
              </Typography>
            }
          />
          {errors.acceptTerms && (
            <FormHelperText error sx={{ ml: 4 }}>
              {errors.acceptTerms}
            </FormHelperText>
          )}
          <FormControlLabel
            control={
              <Checkbox
                id="register-marketing-opt-in"
                checked={form.marketingOptIn}
                onChange={(e) => onChange("marketingOptIn", e.target.checked)}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                Deseo recibir novedades y correos promocionales (opcional)
              </Typography>
            }
          />
        </Box>
      </Stack>

      <Dialog
        open={termsOpen}
        onClose={() => setTermsOpen(false)}
        fullWidth
        maxWidth="md"
        aria-labelledby="terms-dialog-title"
      >
        <DialogTitle id="terms-dialog-title">Términos y Condiciones</DialogTitle>
        <DialogContent
          dividers
          ref={scrollRef}
          onScroll={handleTermsScroll}
          sx={{ maxHeight: "60vh" }}
        >
          <TermsContent />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTermsOpen(false)}>Cerrar</Button>
          <Button
            id="register-terms-confirm-read"
            variant="contained"
            onClick={markReadAndClose}
          >
            He leído los términos
          </Button>
        </DialogActions>
      </Dialog>

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
