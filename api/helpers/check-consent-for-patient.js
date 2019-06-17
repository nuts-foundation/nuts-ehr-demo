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
      type:'string',
      description: 'the urn of this care provider',
      default: 'urn:oid:2.16.840.1.113883.2.4.6.1:00000012' // Fixme: this default should come from a config
    },
    subject: {
      type:'string',
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
    // todo
  }


};

