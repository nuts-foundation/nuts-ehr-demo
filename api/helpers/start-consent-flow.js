let rp = require('request-promise');

module.exports = {

  friendlyName: 'Nuts consent logic',


  description: '',


  inputs: {
    actors: {
      type: 'ref',
      description: 'list of urns of all involved parties',
      required: true
    },
    custodian: {
      type: 'string',
      description: 'the urn of this care provider',
      default: 'urn:oid:2.16.840.1.113883.2.4.6.1:00000012' // Fixme: this default should come from a config
    },
    subject: {
      type: 'string',
      description: 'urn of the patient',
      required: true
    },
    performer: {
      type: 'string',
      description: 'urn of the current user who administers the consent',
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    try {
      // make this consent 60 days valid
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 60);
      let body = {
        subject: inputs.subject,
        custodian: sails.config.custom.agb,
        performer: inputs.performer,
        actors: inputs.actors,
        period: {
          start: new Date().toJSON(),
          end: endDate.toJSON()
        }
      };

      sails.log(body)

      const response = await rp({
        uri: `http://localhost:1323/api/consent`,
        method: 'POST',
        json: true,
        body: body
      });
      console.log("results:", response);
      return exits.success(Promise.resolve(response))
    } catch (e) {
      console.log(e)
      throw 'httpError'
    }
  }


};

