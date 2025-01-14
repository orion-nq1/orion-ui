module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './public/**/*.html',
  ],
  theme: {
    extend: {
      width: {
        sidebar: "320px",
        search: "400px",
      },
      rotate: {
        137: "137deg",
      },
      backgroundColor: {
        packed: "#EEF6FF",
        // packed: "#f2f2f2", you can use this color if you like
      },
      colors: {
        primary: "#ffffff",
        secondary: "#f7f7f7",
        offWhite: "#f2f2f2",
        offGreen: "#dcf6b9",
        greenMain: "#65C900",
        moneyGreen: "#16BF6F",
        border: "#6001ff66",
        limen: "#caff04",
        purple: "#6001ff",
        offPurple1: "#151527",
        offPurple2: "#202038",
        modal: "#231743",
        sell: "#ff6f6f",
        buy: "#caff04",
        textPurp: "#b482ff"
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jersey: ['"Jersey 15"', 'serif'],
        megrim: ['"Megrim Regular"', 'serif'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marqueePaused: 'marquee 25s linear infinite paused',
        marquee2: 'marquee2 25s linear infinite',
        marquee2Paused: 'marquee2 25s linear infinite paused',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};
