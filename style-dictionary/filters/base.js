const base = {
    name: 'base',
    filter: (token, options) => {
        return token.filePath.endsWith('core_valet-core.json');
    },
};
export { base };