// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F0C29",      // Deep dark blue
        secondary: "#302B63",    // Muted purple
        accent1: "#FF2E63",      // Hot pink
        accent2: "#00C9FF",      // Cyan/light blue (optional)
        neutralbg: "#1B1B2F",    // Background container
        textlight: "#F5F5F5",
      },
    },
  },
  plugins: [],
}
