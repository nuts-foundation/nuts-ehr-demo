module.exports = {


  friendlyName: 'Show',


  description: 'Show patients.',


  inputs: {
    patientId: {
      type: 'string',
      description: 'The internal patient id'
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/patients/show'
    }

  },


  fn: async function (inputs, exits) {

    let patient = await Patient.findOne({id: inputs.patientId});

    let externalCareProviders = await ExternalCareProvider.find({where: {patientId: patient.id}});

    return exits.success({patient, externalCareProviders})
  }


};
