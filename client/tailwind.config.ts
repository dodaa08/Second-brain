import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
            colors : {
                purple : {
                    100 : "#ede1f0",
                    200 : "#ac68e8",
                    400 : "#884eba",
                    600  : "#a44eba"
                }
            }
    },
  },
  plugins: [],
};

export default config;