export const MARKDOWN_RENDER_OPTIONS = {
  forceWrapper: true,
  overrides: {
    h1: {
      props: {
        className: 'text-5xl mb-12 font-bold'
      }
    },
    h2: {
      props: {
        className: 'text-3xl my-8 font-bold'
      }
    },
    p: {
      props: {
        className: 'text-lg leading-8 mb-4'
      }
    }
  }
}

export const AUTOSAVE_TIMER = 60000

export const ROMAN_NUMBERS_MAP = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII'
}
