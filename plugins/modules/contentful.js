const contentful = require('contentful')

export default (
  {
    app: {
      $config: { ctfToken: accessToken, ctfSpaceId: space },
    },
  },
  inject
) => {
  const client = contentful.createClient({ space, accessToken })

  inject('contentful', (id) => client.getEntry(id))
}
