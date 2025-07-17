const noFigma = {
    name: 'no-figma',
    filter: (token, options) => {
        return !token.path.includes('figma');
    },
};
export { noFigma };