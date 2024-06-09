module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
};
/*
npm init
npm i axios
npm install --save-dev typescript ts-jest jest @types/jest tslib
npx tsc --init
 */
// npm install --save-dev babel-jest @babel/core @babel/preset-env
// npm install --save-dev @babel/preset-typescript