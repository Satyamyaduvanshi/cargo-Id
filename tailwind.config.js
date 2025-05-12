/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors:{
        primary: '#4F46E5',       // Indigo
        primary2: '#6366F1',
        success: '#10B981',       // Emerald Green
        background: '#1E293B',    // Slate Gray
        foreground: '#FFFFFF',    // White for contrast
      }

    },
  },
  plugins: [],
}