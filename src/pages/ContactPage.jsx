import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  alpha,
  useTheme,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { SUBMIT_CONTACT_INQUIRY } from "../graphql/operations";
import { PLANS } from "../constants/plans";

export default function ContactPage() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    churchName: "",
    email: "",
    planInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [submit, { loading, error }] = useMutation(SUBMIT_CONTACT_INQUIRY);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit({ variables: form });
      setSubmitted(true);
    } catch {
      /* error state from Apollo */
    }
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 400px)`,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
              {t("contact.title")}
            </Typography>
            <Typography color="text.secondary">{t("contact.subtitle")}</Typography>
          </Box>

          <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            {submitted ? (
              <Alert severity="success">{t("contact.success")}</Alert>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <TextField
                  required
                  label={t("contact.name")}
                  value={form.name}
                  onChange={handleChange("name")}
                  fullWidth
                />
                <TextField
                  required
                  label={t("contact.church")}
                  value={form.churchName}
                  onChange={handleChange("churchName")}
                  fullWidth
                />
                <TextField
                  required
                  type="email"
                  label={t("contact.email")}
                  value={form.email}
                  onChange={handleChange("email")}
                  fullWidth
                />
                <TextField
                  select
                  label={t("contact.plan")}
                  value={form.planInterest}
                  onChange={handleChange("planInterest")}
                  fullWidth
                >
                  <MenuItem value="">{t("contact.planAny")}</MenuItem>
                  {PLANS.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {t(p.nameKey)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  multiline
                  minRows={4}
                  label={t("contact.message")}
                  value={form.message}
                  onChange={handleChange("message")}
                  fullWidth
                />
                {error && <Alert severity="error">{t("contact.error")}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? t("contact.sending") : t("contact.send")}
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
