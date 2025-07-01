const COLORS = require('./colors');

module.exports = {
  // Enable dark mode with a CSS class (preferred for explicit control)
  darkMode: 'class',

  // Paths to all template files for purging unused styles
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    // Custom responsive breakpoints tailored to app needs
    screens: {
      sm: '320px', // small phones
      md: '380px', // medium phones
      lg: '425px', // large phones and small tablets
      xl: '768px', // tablets and above
      '2xl': '1024px', // desktops and larger screens
    },

    // Base colors; extended below with project-specific palette
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
    },

    // Font families with sensible fallbacks
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      interMedium: ['InterMedium', 'sans-serif'],
      interSemibold: ['InterSemibold', 'sans-serif'],
    },

    /**
     * Explicit font sizes with pixel values in class names for better developer experience.
     * Using dash '-' instead of slash '/' to avoid escaping issues in class names.
     * 
     * Example usage:
     *   className="text-xs-10px"  // renders 10px font size
     */
    fontSize: {
      'xs-10px': '10px',
      's-12px': '12px',
      'm-14px': '14px',
      'l-16px': '16px',
      'xl-20px': '20px',
      'xxl-32px': '32px',
    },

    extend: {
      colors: COLORS,
    },
  },
};