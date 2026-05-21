import {
  ActionIcon,
  Button,
  Drawer,
  Menu,
  Modal,
  Pagination,
  SegmentedControl,
  Select,
  TextInput,
  createTheme,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const theme = createTheme({
  fontFamily: "var(--font-geist-sans)",
  fontFamilyMonospace: "var(--font-geist-mono)",
  primaryColor: "dark",
  defaultRadius: "md",
  cursorType: "pointer",
  headings: {
    fontFamily: "var(--font-geist-sans)",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(28), lineHeight: "1.2" },
      h2: { fontSize: rem(22), lineHeight: "1.25" },
      h3: { fontSize: rem(18), lineHeight: "1.3" },
    },
  },
  shadows: {
    xs: "0 1px 2px rgba(15, 23, 42, 0.04)",
    sm: "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
    md: "0 4px 12px rgba(15, 23, 42, 0.06), 0 2px 4px rgba(15, 23, 42, 0.04)",
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(28),
  },
  components: {
    Button: Button.extend({
      defaultProps: {
        size: "sm",
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: "background-color 150ms ease, border-color 150ms ease, color 150ms ease",
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        radius: "md",
        variant: "subtle",
        color: "gray",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: "sm",
        radius: "md",
      },
      styles: {
        label: {
          fontWeight: 500,
          marginBottom: rem(6),
          fontSize: rem(13),
        },
        description: {
          marginTop: rem(4),
        },
        error: {
          marginTop: rem(4),
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        size: "sm",
        radius: "md",
      },
      styles: {
        label: {
          fontWeight: 500,
          marginBottom: rem(6),
          fontSize: rem(13),
        },
      },
    }),
    Drawer: Drawer.extend({
      defaultProps: {
        radius: "md",
        overlayProps: { backgroundOpacity: 0.35, blur: 4 },
        transitionProps: { duration: 220, transition: "slide-left" },
        position: "right",
      },
      styles: {
        header: {
          padding: `${rem(20)} ${rem(24)} ${rem(16)}`,
          borderBottom: "1px solid var(--dashboard-border)",
        },
        title: {
          fontSize: rem(18),
          fontWeight: 600,
          letterSpacing: "-0.02em",
        },
        body: {
          padding: rem(24),
        },
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        radius: "lg",
        centered: true,
        overlayProps: { backgroundOpacity: 0.4, blur: 3 },
        transitionProps: { duration: 180, transition: "fade" },
      },
      styles: {
        header: {
          padding: `${rem(20)} ${rem(24)} ${rem(12)}`,
        },
        title: {
          fontSize: rem(17),
          fontWeight: 600,
          letterSpacing: "-0.02em",
        },
        body: {
          padding: `0 ${rem(24)} ${rem(20)}`,
          fontSize: rem(14),
          color: "var(--dashboard-muted)",
          lineHeight: 1.55,
        },
        content: {
          boxShadow: "0 16px 48px rgba(15, 23, 42, 0.12)",
        },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        shadow: "md",
        radius: "md",
      },
      styles: {
        dropdown: {
          border: "1px solid var(--dashboard-border)",
          padding: rem(4),
        },
        item: {
          borderRadius: rem(6),
          fontSize: rem(13),
          padding: `${rem(8)} ${rem(10)}`,
        },
      },
    }),
    Pagination: Pagination.extend({
      defaultProps: {
        size: "sm",
        radius: "md",
      },
    }),
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        radius: "md",
        size: "xs",
      },
    }),
    DateInput: DateInput.extend({
      defaultProps: {
        size: "sm",
        radius: "md",
      },
      styles: {
        label: {
          fontWeight: 500,
          marginBottom: rem(6),
          fontSize: rem(13),
        },
      },
    }),
  },
});
