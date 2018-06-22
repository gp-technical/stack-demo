import gpapi from 'stack-pack-gpapi'

// const getBranding = brandingId => gpapi.get(`branding/${brandingId}`)

const initialiser = async (user, { BrandingId } = {}) =>
  BrandingId && (await gpapi.get(`branding/${BrandingId}`)).ResponsiveColour2

export default initialiser
