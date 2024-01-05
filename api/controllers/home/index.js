
module.exports = {
  friendlyName: 'Index',
  description: 'Index home.',
  
  inputs: {

  },
  
  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/index'
    }
  },
 

  fn: async function () {
    const shortUrls = await UrlShortener.find().sort('createdAt DESC');
    return { shortUrls : shortUrls };
  }


};
