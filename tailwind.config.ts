import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        main: "0.8rem",
      },
      colors: {
        white: {
          main: "#ffffff",
          "100": "#efefef",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929",
        },
        black: {
          "50": "#f6f6f6",
          "100": "#e7e7e7",
          "200": "#d1d1d1",
          "300": "#b0b0b0",
          "400": "#888888",
          "500": "#6d6d6d",
          "600": "#5d5d5d",
          "700": "#4f4f4f",
          "800": "#454545",
          "900": "#3d3d3d",
          main: "#000000",
        },
        fondo: {
          "50": "#f4f7fb",
          "100": "#e8edf6",
          "200": "#ccdaeb",
          "300": "#9fbcda",
          "400": "#6c99c4",
          "500": "#497dae",
          "600": "#376392",
          main: "#2e5077",
          "800": "#294563",
          "900": "#263b54",
          "950": "#1a2637",
        },
        secundario: {
          "50": "#f1f9fa",
          "100": "#dcf0f1",
          "200": "#bee2e3",
          "300": "#90cbd0",
          main: "#4da1a9",
          "500": "#40919a",
          "600": "#387782",
          "700": "#33626b",
          "800": "#30525a",
          "900": "#2c454d",
          "950": "#192d33",
        },
        primario: {
          "50": "#f2fbf8",
          "100": "#d3f4e9",
          "200": "#a7e8d5",
          main: "#79d7be",
          "400": "#46bb9f",
          "500": "#2ca086",
          "600": "#21806d",
          "700": "#1e6759",
          "800": "#1c5349",
          "900": "#1c453e",
          "950": "#0a2925",
        },
      },
      gridTemplateColumns: {
        ...Object.fromEntries(
          Array.from({ length: 30 }, (_, i) => [
            `${i + 1}`,
            `repeat(${i + 1}, minmax(0, 1fr))`,
          ])
        ),
      },
    },
  },
  plugins: [],
} satisfies Config;
