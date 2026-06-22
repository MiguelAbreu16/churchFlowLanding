import { Box, Container, Grid, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PricingCard from "../pricing/PricingCard";
import PricingComparisonTable from "./PricingComparisonTable";
import { PLANS } from "../../constants/plans";

export default function PricingSection({ showComparison = true }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box id="pricing" className="section" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 2,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            {t("pricing.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: "2rem", md: "2.75rem" } }}>
            {t("pricing.title")}
            <br />
            <Box component="span" sx={{ color: "primary.main" }}>
              {t("pricing.titleHighlight")}
            </Box>
          </Typography>
          <Typography sx={{ maxWidth: 520, mx: "auto", color: "text.secondary", fontSize: "1.1rem" }}>
            {t("pricing.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={2} alignItems="stretch">
          {PLANS.map((plan) => (
            <Grid item xs={12} sm={4} key={plan.id}>
              <PricingCard
                plan={plan}
                onSelect={() => navigate(`/register?plan=${plan.id}`)}
              />
            </Grid>
          ))}
        </Grid>

        {showComparison && <PricingComparisonTable />}

        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {t("pricing.contactCustom")}{" "}
            <Box
              component={Link}
              to="/contacto"
              sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}
            >
              {t("pricing.contactLink")}
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
