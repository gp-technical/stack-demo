const userColorMap = new Map()

const hueFactory = (initialValue, increment) => {
  let nextHueValue = initialValue
  return () => {
    const hue = nextHueValue
    nextHueValue += increment
    return hue
  }
}

const HUE_INITIAL_VALUE = 0
const HUE_INCREMENT = 200

const getHue = hueFactory(HUE_INITIAL_VALUE, HUE_INCREMENT)

const getSaturation = () => 40

const getLightness = () => 70

const getAlpha = () => 0.1

const newColorValues = () => {
  return [getHue(), getSaturation(), getLightness(), getAlpha()]
}

const toHslaStyle = ([hue, saturation, lightness, alpha]) =>
  `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`

const getColor = user => {
  let color = userColorMap.get(user)
  if (!color) {
    color = toHslaStyle(newColorValues())
    userColorMap.set(user, color)
  }
  return color
}

const getColorStyle = user => ({
  backgroundColor: getColor(user)
})

export default getColorStyle
