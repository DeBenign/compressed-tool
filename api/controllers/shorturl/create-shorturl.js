module.exports = {
  friendlyName: 'Create shorturl',
  description: '',
  inputs: {
    url: {
      type: 'string',
      isURL: true,
      required: true
    }
  },
  exits: {
    success: {
      statusCode: 200,
      description: 'Details supplied successfully',
      //responseType: 'redirect'
    }
  },

  fn: async function ({ url }) {

    url.body
    baseUrl = "localhost:1337";

    const shortCode = Math.random().toString(36).substring(7);

    const shortenedUrl =  `${baseUrl}/${shortCode}`;
   
     await UrlShortener.create({ url, shortenedUrl }).fetch();
     sails.log(`URL successfully saved for ${url}`);
    

    const successResponse = await sails.helpers.successResponse.with({
      message: `URL successfully saved for ${url}`,
      data: shortenedUrl,
    });

    return successResponse;
//, '/' : 'home/index'

  }
};
