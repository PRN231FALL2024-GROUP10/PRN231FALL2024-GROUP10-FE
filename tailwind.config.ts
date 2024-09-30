import defaultTheme from "tailwindcss/defaultTheme";
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-gradient":
          "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(255,0,0,0.7679446778711485) 100%)",
      },
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#1C2434",
      "black-2": "#010101",
      blue: "#2C5DAD",
      bluewhite: "#5479B7",
      "blue-2": "#2563eb",
      body: "#64748B",
      bodydark: "#AEB7C0",
      bodydark1: "#DEE4EE",
      bodydark2: "#8A99AF",
      primary: "#3C50E0",
      secondary: "#80CAEE",
      stroke: "#E2E8F0",
      gray: "#EFF4FB",
      graydark: "#333A48",
      "gray-2": "#F7F9FC",
      "gray-3": "#FAFAFA",
      whiten: "#F1F5F9",
      whiter: "#F5F7FD",
      boxdark: "#24303F",
      "boxdark-2": "#1A222C",
      strokedark: "#2E3A47",
      "form-strokedark": "#3d4d60",
      "form-input": "#1d2a39",
      "meta-1": "#DC3545",
      "meta-2": "#EFF2F7",
      "meta-3": "#10B981",
      "meta-4": "#313D4A",
      "meta-5": "#259AE6",
      "meta-6": "#FFBA00",
      "meta-7": "#FF6766",
      "meta-8": "#F0950C",
      "meta-9": "#E5E7EB",
      success: "#219653",
      "success-2": "#22BB33",
      failed: "#FF3333",
      "failed-2": "#E52D2D",
      danger: "#fb3b13",
      "danger-2": "#ff0000",
      "danger-3": "#D34053",
      warning: "#FFA70B",
    },
    screens: {
      "2xsm": "375px",
      xsm: "425px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },
  },
  darkMode: "class",
  extend: {},
  plugins: [addVariablesForColors, require("@tailwindcss/typography")],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
