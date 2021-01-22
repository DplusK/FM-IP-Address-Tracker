module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      height: {
        '60': '60px',
        '280': '280px',
        '300': '300px'
      },
      minHeight: {
        '500': '500px',
        '160': '160px',
      },
      backgroundImage: theme => ({
        'hero-pattern': "url('/images/pattern-bg.png')",
      })
    },
  },
  variants: {},
  plugins: [],
}
