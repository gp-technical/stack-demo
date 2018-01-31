import { makeProcessor } from '@gp-technical/stack-pack-api'
import { persistAnalyticsData } from './setup'

const processor = async action => {
  var { types, type, data } = action
  if (type.endsWith("_RESPONSE")) return

  persistAnalyticsData({time: Date.now(), type, data})
}

export default makeProcessor(processor)
