import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import ArrowForward from "@mui/icons-material/ArrowForward";

export default function PricingCard({ plan, onSelect, selected = false }) {
  const theme = useTheme();

  const isPrimary = plan.popular || selected;

  return (
    <Box
      onClick={onSelect}
      sx={{
        position: "relative",
        height: "100%",
        p: 2,
        borderRadius: 3,
        bgcolor: "#fff",
        border: `1px solid ${isPrimary ? theme.palette.primary.main : alpha(theme.palette.divider, 1)}`,
        cursor: onSelect ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        boxShadow: isPrimary 
          ? `0 20px 25px -5px ${alpha(theme.palette.primary.main, 0.1)}, 0 8px 10px -6px ${alpha(theme.palette.primary.main, 0.1)}`
          : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "&:hover": onSelect
          ? {
              borderColor: isPrimary ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
              boxShadow: `0 10px 15px -3px ${alpha(theme.palette.primary.main, 0.1)}`,
              transform: "translateY(-4px)",
            }
          : {},
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <Chip
          label="MÁS RECOMENDADO"
          size="small"
          sx={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "primary.main",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: 0.5,
            px: 1,
          }}
        />
      )}

      {selected && (
        <Chip
          label="SELECCIONADO"
          size="small"
          sx={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "primary.dark",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.7rem",
            letterSpacing: 0.5,
            px: 1,
          }}
        />
      )}

      {/* Plan name */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: isPrimary ? "primary.main" : "text.primary", mb: 0.5 }}
        >
          {plan.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
          {plan.description}
        </Typography>
      </Box>

      {/* Price */}
      <Box sx={{ mb: 2 }}>
        {plan.price !== null ? (
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "2rem",
                color: "text.primary",
                letterSpacing: -1,
              }}
            >
              ${plan.price}
            </Typography>
            <Typography variant="subtitle2" color="text.disabled" sx={{ fontWeight: 600 }}>
              /{plan.period}
            </Typography>
          </Box>
        ) : (
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.75rem",
              color: "text.primary",
              py: 1,
            }}
          >
            Personalizado
          </Typography>
        )}
      </Box>

      {/* Features */}
      <List dense sx={{ flex: 1, mb: 3, p: 0 }}>
        {plan.features.map((feat) => (
          <ListItem key={feat} disableGutters sx={{ alignItems: "flex-start", py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 32, mt: 0.2 }}>
              <Check sx={{ color: "primary.main", fontSize: 18 }} />
            </ListItemIcon>
            <ListItemText
              primary={feat}
              primaryTypographyProps={{ fontSize: "0.9rem", color: "text.secondary", lineHeight: 1.4 }}
            />
          </ListItem>
        ))}
      </List>

      {/* CTA */}
      {onSelect && (
        <Button
          fullWidth
          variant={isPrimary ? "contained" : "outlined"}
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            py: 1.5,
            fontSize: "0.95rem",
            ...(isPrimary ? {} : {
              color: "text.primary",
              borderColor: "#E2E8F0",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
              }
            })
          }}
        >
          {plan.price ? "Comenzar Prueba Gratis" : "Hablar con Ventas"}
        </Button>
      )}
    </Box>
  );
}
