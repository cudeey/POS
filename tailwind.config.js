/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{html,js,jsx}"],
  content: ["./src/**/*.{html,js}", "./src/components/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        40: "40px",
        30:"30px",
        20:"20px"
      },
      screens: {
        'xs': '300px',
      },
      colors: {
        "gray-color": "#667085",
        "black-color": "#475467",
        "dark-blue": "#344054",
        "light-pink": "#FEFBF7",
        "lighter-pink": "FFF6EB",
        "light-gray": "#F3EFEA",
        "light-gray-two": "#C2BBB3",
        "light-brown": "#7A7774",
        "light-orange": "#ECB22E",
        "gray-color": "#7B7A7A",
        "dark-gray": "#6b7280",
        "lighter-orange": "#FFB100",
        "lighter-gray": "#7A7774",
        "gray-text": "#828884",
        "lighter-gray": "#9B9B9C",
        "gray-category": "#6F6F6F",
        "lighter-pink-two": "#FFF5E7",
        "dark-orange": "#E09C02",
        "white-color": "#FCF8F3",
        "green-color": "#79B99D",
        "red-color": "#CA0000",
        "light-green": "#ABEFC6",
        "lighter-green": "#ECFDF3",
        "dark-green": "#067647",
        "lighter-red": "#FDF2FA",
        "gray-color-two": "#F5F1EE",
        "darker-gray": "#959CA6",
        "pink-two": "#F9F1E7",
        "gray-light": "#37383AA8",
        "gray-lighter":"#C4C4C4",
        "gray-color-light":" #F8F8F8",
        "gray-color-text":"#37383A42",
        "orange-light" : " #FEF8F0",
        "orange-dark":"#ECB22E",
        "green-light":"#79B99D",
        "gray-light-1":"#C7C4C2",
        "gray-light-2":"#F5F1EE",
        "white-light":"#FBFBFB",
      },
      width: {
        916: "916px",
        1010: "910px",
        286: "286px",
        314: "314px",
        764: "764px",
        1240: "1240px",
        167: "167px",
        593: "593px",
        215: "215px",
        456: "456px",
        450: "450px",
        109: "109px",
        569: "569px",
        74: "74px",
        70: "70px",
        65: "65px",
        120: "120px",
        172: "172px",
        144: "144px",
        939: "939px",
        350: "350px",
        240: "240px",
        491: "491px",
        224: "224px",
        310: "310px",
        659: "659px",
        466: "466px",
        566: "566px",
        729: "729px",
        390: "390px",
        236: "236px",
        950: "901px",
        479: "479px",
        403: "403px",
        72: "72px",

        740: "740px",
        170: "110px",
        80: "80px",

        740:"740px",
        170:"110px",
        80:"80px",
        10:"340px",
        11:"170px",
        340:"340px",
        400:"235px",
        720:"720px"
      },
      height: {
        132: "132px",
        44: "44px",
        24: "24px",
        164: "164px",
        310: "310px",
        400: "400px",
        405: "405px",
        205: "205px",
        96: "96px",
        120: "120px",
        214: "214px",
        157: "157px",
        89: "89px",
        46: "46px",
        464: "464px",
        51: "51px",
        70: "70px",
        1: "1px",
        50: "60px",
        40: "40px",
      },
      margin: {
        650: "650px",
        170: "170px",
        686: "686px",
        20: "20px",
        150:"222px",
        16:"160px"
      },
      gap: {
        180: "180px",
        90: "90px",
      },
    },
  },
  plugins: [],
};