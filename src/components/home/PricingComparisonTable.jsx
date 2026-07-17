import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Stack,
  Paper,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import {
  PLANS,
  PLAN_COMPARISON_ROWS,
  PLAN_COMPARISON_LABELS,
} from "../../constants/plans";

function CellValue({ value, t }) {
  const theme = useTheme();

  if (value === true) {
    return <Check sx={{ color: "success.main", fontSize: 22 }} />;
  }
  if (value === false) {
    return (
      <Close
        sx={{ color: alpha(theme.palette.text.disabled, 0.5), fontSize: 20 }}
      />
    );
  }
  if (value === "comingSoon") {
    return (
      <Chip
        label={t("plans.comingSoon")}
        size="small"
        sx={{
          fontWeight: 700,
          fontSize: "0.7rem",
          bgcolor: alpha(theme.palette.warning.main, 0.12),
          color: "warning.dark",
        }}
      />
    );
  }
  if (typeof value === "string" && value.startsWith("plans.")) {
    return (
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {t(value)}
      </Typography>
    );
  }
  return (
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  );
}

function MobilePlanCards({ t }) {
  const theme = useTheme();
  const planCols = ["basic", "pro", "enterprise"];

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {PLANS.map((plan) => {
        const col = planCols.find((c) => c === plan.id) || plan.id;
        return (
          <Paper
            key={plan.id}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "#fff",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                {t(plan.nameKey)}
              </Typography>
              {plan.popular && (
                <Chip
                  label={t("plans.popular")}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 700, fontSize: "0.65rem" }}
                />
              )}
            </Stack>
            <Stack spacing={1.25}>
              {PLAN_COMPARISON_ROWS.map((row) => (
                <Stack
                  key={row.key}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1 }}
                  >
                    {t(PLAN_COMPARISON_LABELS[row.key])}
                  </Typography>
                  <Box sx={{ minWidth: 72, textAlign: "right" }}>
                    <CellValue value={row[col]} t={t} />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}

export default function PricingComparisonTable() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const planCols = ["basic", "pro", "enterprise"];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        {t("pricing.compareTitle")}
      </Typography>

      {isMobile ? (
        <MobilePlanCards t={t} />
      ) : (
        <TableContainer
          sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: "#fff",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, width: "28%" }} />
                {PLANS.map((plan) => (
                  <TableCell key={plan.id} align="center">
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      {t(plan.nameKey)}
                    </Typography>
                    {plan.popular && (
                      <Chip
                        label={t("plans.popular")}
                        size="small"
                        color="primary"
                        sx={{ mt: 0.5, fontWeight: 700, fontSize: "0.65rem" }}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {PLAN_COMPARISON_ROWS.map((row) => (
                <TableRow key={row.key} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {t(PLAN_COMPARISON_LABELS[row.key])}
                  </TableCell>
                  {planCols.map((col) => (
                    <TableCell key={col} align="center">
                      <CellValue value={row[col]} t={t} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
