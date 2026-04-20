import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";

const MEMBER_OPTIONS = [
  { value: "lt50", label: "Menos de 50 personas" },
  { value: "50-200", label: "50 – 200 personas" },
  { value: "200-500", label: "200 – 500 personas" },
  { value: "500-1000", label: "500 – 1,000 personas" },
  { value: "gt1000", label: "Más de 1,000 personas" },
];

export default function StepChurchInfo({ form, errors, onChange, onNext }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Cuéntanos sobre tu iglesia
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Esta información nos ayuda a configurar ChurchFlow para tus necesidades.
      </Typography>

      <Stack spacing={3}>
        <TextField
          id="register-church-name"
          label="Nombre de la iglesia *"
          value={form.churchName}
          onChange={(e) => onChange("churchName", e.target.value)}
          error={!!errors.churchName}
          helperText={errors.churchName}
          fullWidth
          placeholder="Ej: Iglesia Cristiana Renovación"
        />

        <TextField
          id="register-church-city"
          label="Ciudad / País *"
          value={form.city}
          onChange={(e) => onChange("city", e.target.value)}
          error={!!errors.city}
          helperText={errors.city}
          fullWidth
          placeholder="Ej: Bogotá, Colombia"
        />

        <TextField
          id="register-church-denomination"
          label="Denominación (opcional)"
          value={form.denomination}
          onChange={(e) => onChange("denomination", e.target.value)}
          fullWidth
          placeholder="Ej: Evangélica, Bautista, Pentecostal..."
        />

        <TextField
          id="register-church-members"
          select
          label="Cantidad aproximada de miembros *"
          value={form.memberCount}
          onChange={(e) => onChange("memberCount", e.target.value)}
          error={!!errors.memberCount}
          helperText={errors.memberCount}
          fullWidth
        >
          {MEMBER_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}>
        <Button
          id="register-step1-next"
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
