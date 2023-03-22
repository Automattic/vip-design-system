module.exports = ( path, options ) => {
	// mocks the icons to allow testing, see https://github.com/antfu/unplugin-icons/issues/108#issuecomment-1111948120
	if ( path.startsWith( '~icons' ) ) {
		return 'test/iconMock.js';
	}
	// TODO: check that we have static type checking for icon imports

	// Call the defaultResolver, so we leverage its cache, error handling, etc.
	return options.defaultResolver( path, options );
};
