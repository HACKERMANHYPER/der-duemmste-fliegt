// in this node version .ts is bugged with random warnings so we need to go with .js

import colors from 'tailwindcss/colors';

export default {
    theme: {
        extend: {
            colors: {
                primary: colors.neutral,
            },
            fontFamily: {
                bodyfam: ['Times', 'sans-serif'],
                displayfamFirst: ['Times', 'sans-serif'],
                displayfamSecondary: ['Times', 'sans-serif'],
            },
        },
    },
};
