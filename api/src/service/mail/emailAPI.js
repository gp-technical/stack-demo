const SparkPost = require('sparkpost')
//43a7d7c56574c2846141526e8707cfd9b517cec1
const client = new SparkPost('43a7d7c56574c2846141526e8707cfd9b517cec1')
export default async (email) => {
  try {
    const result = await client.transmissions.send({
      options: {
        sandbox: false
      },
      content: {
        from: 'support@goodpractice.com',
        subject: 'Test email from stack-demo!',
        html: '<html><body><p>Hello Developer, use this with moderation because it costs $$</p></body></html>'
      },
      recipients: [
        {address: email}
      ]
    })
    console.log(result)
    return 'Sent'
  } catch (error) {
    console.log(error)
    return 'Error -> see logs'
  }
}

//() => new Promise((resolve, reject) => setTimeout(() => resolve('Error -> see logs'),3000))