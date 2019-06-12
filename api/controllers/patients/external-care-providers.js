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
    let viewModel = {
      errorMsg: null,
      organizations: [],
      query: inputs.query
    };

    if (inputs.organizationId) {
      try {
        await ExternalCareProvider.create({
          patientId: inputs.patientId,
          organizationId: inputs.organizationId,
          organizationName: inputs.organizationName,
          uniqueId: `${inputs.patientId}-${inputs.organizationId}`
        });
        return exits.backToPatient('/patients/' + inputs.patientId);
      } catch (err) {
        if (err.name == "AdapterError" && err.code == 'E_UNIQUE') {
          viewModel['errorMsg'] = "Zorgaanbieder al gekoppeld met deze patient"
        } else {
          console.log("error while storing patient-careProvider relation", err);
        }
      }
    }

    if (inputs.query) {
      try {
        viewModel['organizations'] = await sails.helpers.nutsRegistry.with({query: inputs.query})
      } catch (e) {
        // in case of failure, just say invalid. No fancy error handling needed in this demo.
        console.log("error while searching for organizations:", e);
        viewModel['errorMsg'] = "Er ging iets mis bij het zoeken naar zorginstellingen";
        return exits.error(e);
      }
    }
    return exits.view(viewModel)
  }


};
