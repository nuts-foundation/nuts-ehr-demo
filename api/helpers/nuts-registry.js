let rp = require('request-promise');

module.exports = {


  friendlyName: 'Nuts registry',


  description: 'Query the Nuts registry',


  inputs: {
    query: {
      type: 'string',
      example: 'Zorggroep',
      description: '(part of) the name of a care provider to search for',
      required: false
    },
    id: {
      type: 'string',
      example: 'urn:oid:2.16.840.1.113883.2.4.6.1:00000000',
      description: 'the identification urn of a care provider',
      required: false
    }


  },


  exits: {

    success: {
      description: 'array of care providers if there was a query, a careProvider if it was an id',
    },
    invalidParameters: {
      description: 'either an id or query param should be given. Not both, at least one.'
    },
    notFound: {
      description: 'the careProvider with the given id is not found',
    },
    httpError: {
      description: 'something went wrong while communicating with the nuts registry'
    }

  },


  fn: async function (inputs, exits) {
    if (inputs.id) {
      // find careProvider by id
    } else if (inputs.query) {
      // find careProviders by query
      try {
        const response = await rp({
          uri: `http://localhost:1323/api/organizations?query=${inputs.query}`,
          method: 'GET',
          json: true,
        });
        console.log("results:", response);
        return exits.success(Promise.resolve(response))
      } catch (e) {
        console.log(e)
        throw 'httpError'
      }
    } else {
      throw 'invalidParameters'
    }
  }


};

