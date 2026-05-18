import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "var(--font-geist-sans)",
  fontFamilyMonospace: "var(--font-geist-mono)",
  headings: {
    fontFamily: "var(--font-geist-sans)",
  },
  radius: {
    sm: rem(6),
    md: rem(10),
    lg: rem(14),
  },
});
