const byMode = {
    name: 'byMode',
    filter: (token, options) => {
        return token.path[0] === options.mode;
    },
};
export { byMode };