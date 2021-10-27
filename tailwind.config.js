module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		container: {
			center: true,
		},
	},
	corePlugins: {
		fontFamily: false,
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			scale: ['active'],
		},
		opacity: ({ after }) => after(['disabled']),
	},
	plugins: [],
};
