import type { Config } from "tailwindcss"

const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        arvo: ["Arvo", "serif"],
        aleo: ["Aleo", "serif"],
        lato: ["Lato", "sans-serif"],
        "montserrat-alternates": ["Montserrat Alternates", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        fasterOne: ["Faster One", "sans-serif"],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      fontStyle: {
        normal: 'normal',
        italic: 'italic',
      },
      lato: {
        '100-normal': { fontWeight: '100', fontStyle: 'normal' },
        '300-normal': { fontWeight: '300', fontStyle: 'normal' },
        '400-normal': { fontWeight: '400', fontStyle: 'normal' },
        '700-normal': { fontWeight: '700', fontStyle: 'normal' },
        '900-normal': { fontWeight: '900', fontStyle: 'normal' },
        '100-italic': { fontWeight: '100', fontStyle: 'italic' },
        '300-italic': { fontWeight: '300', fontStyle: 'italic' },
        '400-italic': { fontWeight: '400', fontStyle: 'italic' },
        '700-italic': { fontWeight: '700', fontStyle: 'italic' },
        '900-italic': { fontWeight: '900', fontStyle: 'italic' },
      },
      "montserrat-alternates": {
        '100-normal': { fontWeight: '100', fontStyle: 'normal' },
        '200-normal': { fontWeight: '200', fontStyle: 'normal' },
        '300-normal': { fontWeight: '300', fontStyle: 'normal' },
        '400-normal': { fontWeight: '400', fontStyle: 'normal' },
        '500-normal': { fontWeight: '500', fontStyle: 'normal' },
        '600-normal': { fontWeight: '600', fontStyle: 'normal' },
        '700-normal': { fontWeight: '700', fontStyle: 'normal' },
        '800-normal': { fontWeight: '800', fontStyle: 'normal' },
        '900-normal': { fontWeight: '900', fontStyle: 'normal' },
        '100-italic': { fontWeight: '100', fontStyle: 'italic' },
        '200-italic': { fontWeight: '200', fontStyle: 'italic' },
        '300-italic': { fontWeight: '300', fontStyle: 'italic' },
        '400-italic': { fontWeight: '400', fontStyle: 'italic' },
        '500-italic': { fontWeight: '500', fontStyle: 'italic' },
        '600-italic': { fontWeight: '600', fontStyle: 'italic' },
        '700-italic': { fontWeight: '700', fontStyle: 'italic' },
        '800-italic': { fontWeight: '800', fontStyle: 'italic' },
        '900-italic': { fontWeight: '900', fontStyle: 'italic' },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config

export default config