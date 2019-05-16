module.exports = {


  friendlyName: 'Show',


  description: 'Show patients.',


  inputs: {
    id: {
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

    let patient = await Patient.findOne({id: inputs.id});
    console.log(patient);

    return exits.success({patient})

  }


};
