module.exports = {
  friendlyName: 'Get shorturl',
  description: '',
  inputs: {
    shortId: {
      type: 'string',
      description: 'The short url identifier',
      required: true
    }
  },
  exits: {
    success: {
      responseType: 'redirect'
    },
    notFound: {
      responseType: 'notFound'
    }
  },
  fn: async function ({ shortId }) {
    const shortUrl = await UrlShortener.findOne({ short: shortId });
    if (!shortUrl) {throw 'notFound';}
    const newClicks = shortUrl.clicks + 1;
    await UrlShortener.updateOne({ id: shortUrl.id}).set({
      clicks: newClicks
    });
    return shortUrl.url;
  }
}