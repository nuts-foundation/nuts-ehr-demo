let rp = require('request-promise');

module.exports = {


  friendlyName: 'Add external care provider',


  description: '',


  inputs: {
    query: {
      type: 'string'
    },
    organizationId: {
      type: 'string'
    },
    organizationName: {
      type: 'string'
    },
    patientId: {
      type: 'string'
    }
  },


  exits: {
    view: {
      responseType: 'view',
      viewTemplatePath: 'pages/patients/external-care-providers'
    },
    backToPatient: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {
    let organizations = [];
    // let patient = await Patient.findOne({id: inputs.patientId});

    if (inputs.organizationId) {
      try {
        await ExternalCareProvider.create({
          patientId: inputs.patientId,
          organizationId: inputs.organizationId,
          organizationName: inputs.organizationName,
        })
        return exits.backToPatient('/patients/' + inputs.patientId);
      } catch(err) {
        console.log(err);
      }
    }

    if (inputs.query) {
      try {
        organizations = await rp({
          uri: `http://localhost:1323/api/organizations?query=${inputs.query}`,
          method: 'GET',
          json: true,
        })
      } catch (e) {
        // in case of failure, just say invalid. No fancy error handling needed in this demo.
        console.log("error while validating Nuts contract:", e);
        return exits.error(e);
      }
    }
    return exits.view({query: inputs.query, organizations})
  }


};
