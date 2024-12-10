/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			Primary: {
  				'light-blue': '#ADD8E6',
  				'dark-blue': '#4169E1',
  				'white': '#FFFFFF',
  				'dark-Green': '#27AE60',
  				'light-Green': '#98FF98'
  			},
  			Accent: {
  				'golden': '#FFD700',
  				'light-Yellow': '#FFFACD',
  				'dark-Coral-Red': '#DC1417',
  				'light-Coral-Red': '#FF7070'
  			},
  			Additional: {
  				'gray': '#D3D3D3',
  				'dark-gray': '#A9A9A9',
  				'medium-teal': '#008080',
  				'light-teal': '#20B2AA'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}