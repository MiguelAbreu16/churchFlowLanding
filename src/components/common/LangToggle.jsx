import LanguageIcon from "@mui/icons-material/Language";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  alpha,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "ht", label: "HT", name: "Kreyòl ayisyen" },
];

export default function LangToggle({ size = "small" }) {
  const { i18n } = useTranslation();
  const base = i18n.language?.split("-")[0] || "es";
  const lang = LANGS.some((l) => l.code === base) ? base : "es";
  const compact = size === "small";

  return (
    <FormControl size="small" sx={{ minWidth: compact ? 72 : 120 }}>
      <Select
        value={lang}
        onChange={(e) => {
          if (e.target.value) i18n.changeLanguage(e.target.value);
        }}
        displayEmpty
        aria-label="language"
        renderValue={(value) => {
          const item = LANGS.find((l) => l.code === value) || LANGS[0];
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                fontWeight: 800,
                fontSize: "0.75rem",
                letterSpacing: 0.4,
              }}
            >
              <LanguageIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              {item.label}
            </Box>
          );
        }}
        sx={{
          height: 32,
          bgcolor: "background.paper",
          borderRadius: 1,
          fontWeight: 800,
          fontSize: "0.75rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1,
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
          },
          "& .MuiSelect-select": {
            py: 0.5,
            pl: 1,
            pr: "28px !important",
            display: "flex",
            alignItems: "center",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: { mt: 0.5, minWidth: 168 },
          },
        }}
      >
        {LANGS.map((item) => (
          <MenuItem key={item.code} value={item.code} dense>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  minWidth: 24,
                  color:
                    lang === item.code ? "primary.main" : "text.secondary",
                }}
              >
                {item.label}
              </Box>
              <Box component="span" sx={{ fontSize: "0.8125rem" }}>
                {item.name}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
