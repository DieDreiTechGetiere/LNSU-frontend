/*
 //typo3 minimized build
 //node r.js -o build.js
 */

({
	baseUrl : 'app/js',
	paths: {
		finalize: 'app/js/config'
	},
	exclude: [],
	mainConfigFile: 'app/js/config.js',
	name: 'config',
	out: 'app/js/finalize-built.js'
})