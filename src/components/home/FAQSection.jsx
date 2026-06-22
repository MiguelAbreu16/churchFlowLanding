import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

const FAQ_KEYS = ["trial", "paypal", "email", "plans", "cancel", "reino"];

export default function FAQSection() {
  const { t } = useTranslation();

  return (
    <Box id="faq" className="section" sx={{ bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              letterSpacing: 1.5,
              color: "primary.main",
              textTransform: "uppercase",
              display: "block",
              mb: 2,
            }}
          >
            {t("faq.eyebrow")}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
            {t("faq.title")}
          </Typography>
        </Box>

        {FAQ_KEYS.map((key) => (
          <Accordion
            key={key}
            disableGutters
            elevation={0}
            sx={{
              mb: 1.5,
              borderRadius: "12px !important",
              border: "1px solid",
              borderColor: "divider",
              "&:before": { display: "none" },
              overflow: "hidden",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography sx={{ fontWeight: 700 }}>{t(`faq.items.${key}.q`)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t(`faq.items.${key}.a`)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
