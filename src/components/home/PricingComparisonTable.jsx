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
import { comparisonRows } from "../../constants/plans";
import { usePlans } from "../../hooks/usePlans";

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
  if (value?.key) {
    return (
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        {t(value.key, value.params)}
      </Typography>
    );
  }
  return (
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  );
}

function MobilePlanCards({ t, plans, rows }) {
  const theme = useTheme();

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {plans.map((plan, col) => {
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
              sx={{
                mb: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
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
              {rows.map((row) => (
                <Stack
                  key={row.labelKey}
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flex: 1 }}
                  >
                    {t(row.labelKey)}
                  </Typography>
                  <Box sx={{ minWidth: 72, textAlign: "right" }}>
                    <CellValue value={row.cells[col]} t={t} />
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
  const plans = usePlans();
  const rows = comparisonRows(plans);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 800, mb: 3, textAlign: "center" }}
      >
        {t("pricing.compareTitle")}
      </Typography>

      {isMobile ? (
        <MobilePlanCards t={t} plans={plans} rows={rows} />
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
                {plans.map((plan) => (
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
              {rows.map((row) => (
                <TableRow key={row.labelKey} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {t(row.labelKey)}
                  </TableCell>
                  {row.cells.map((cell, col) => (
                    <TableCell key={col} align="center">
                      <CellValue value={cell} t={t} />
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
