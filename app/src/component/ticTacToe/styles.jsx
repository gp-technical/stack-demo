const direction = (x = 'row') => ` display: flex; flex-direction: ${x};`
const alignment = ({ main = 'center', cross = 'center' } = {}) =>
  `justify-content: ${main}; align-items: ${cross};`
const px = n => `${(n * 100) / 1440}vw`
const font = ({ weight = 'normal', size = 17 } = {}) =>
  `font-size: ${px(size)}; font-weight: ${weight};`

export { direction, alignment, px, font }
