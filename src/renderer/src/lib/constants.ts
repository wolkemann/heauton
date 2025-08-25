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
