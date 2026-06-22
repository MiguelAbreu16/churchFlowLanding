import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BRAND } from "../../constants/branding";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();

  const FOOTER_LINKS = {
    [t("footer.product")]: [
      { label: t("footer.modules"), to: "/#modules" },
      { label: t("nav.pricing"), to: "/pricing" },
      { label: t("footer.productTour"), to: "/#product-tour" },
    ],
    [t("footer.company")]: [
      { label: t("footer.about"), to: "/#modules" },
      { label: t("footer.contact"), to: "/contacto" },
      { label: t("footer.privacy"), to: "/legal/privacidad" },
      { label: t("footer.terms"), to: "/legal/terminos" },
    ],
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f8fafc",
        pt: 12,
        pb: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 8 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                component="img"
                src={BRAND.horizontal}
                alt="Kahal Zerem"
                sx={{ height: 36, width: "auto", maxWidth: 220 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320, lineHeight: 1.8 }}>
              {t("footer.tagline")}
            </Typography>
          </Grid>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <Grid item xs={6} md={3} key={title}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, mb: 3, textTransform: "uppercase", letterSpacing: 1 }}
              >
                {title}
              </Typography>
              <Stack spacing={2}>
                {links.map((link) => (
                  <Typography
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            pt: 6,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} Kahal Zerem. {t("footer.rights")}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            {t("footer.madeFor")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
