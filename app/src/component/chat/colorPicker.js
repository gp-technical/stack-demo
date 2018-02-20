const userColorMap = new Map()

const hueFactory = () => {
  let nextHueValue = 0
  let hueIncrement = 200
  return () => {
    const hue = nextHueValue
    nextHueValue += hueIncrement
    return hue
  }
}

const getHue = hueFactory()

const getSaturation = () => 40

const getLightness = () => 70

const getAlpha = () => 0.1

const newColor = () => {
  return [getHue(), getSaturation(), getLightness(), getAlpha()]
}

const getColor = user => {
  let color = userColorMap.get(user)
  if (!color) {
    color = newColor()
    userColorMap.set(user, color)
  }
  return color
}

const toHslaStyle = ([hue, saturation, lightness, alpha]) =>
  `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`

const getColorStyle = user => ({
  backgroundColor: toHslaStyle(getColor(user))
})

export default getColorStyle
