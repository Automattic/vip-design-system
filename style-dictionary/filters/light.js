const light = {
    name: 'light',
    filter: (token, options) => {
        return token.filePath.endsWith('wpvip-product_light.json');
    },
};
export { light };