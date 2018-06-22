import gpapi from 'stack-pack-gpapi'

const getSubscription = tenantKey => gpapi.get(`subscription/url/${tenantKey}`)

const extractTenantKey = ({ query = '' }) => query.split('=')[1]

const initialiser = async (user, websocketOpts) => {
  const tenantKey = extractTenantKey(websocketOpts)
  return tenantKey && getSubscription(tenantKey)
}

export default initialiser
