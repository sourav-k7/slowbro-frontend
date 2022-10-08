module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        'body':'#74777C',
        
      },
     
      colors:{
        'primary':'#4D8CF4',
        'seconday':'#5794F8',
        'screen-body':'#0F1319',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
