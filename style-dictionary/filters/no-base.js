const noBase = {
    name: 'no-base',
    filter: (token, options) => {
        return !token.filePath.endsWith('core.json');
    },
};
export { noBase };