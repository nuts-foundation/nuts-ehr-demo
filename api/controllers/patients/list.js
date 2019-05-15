module.exports = {

  friendlyName: 'List',

  description: 'List patients.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/patients/patients'
    }

  },

  fn: async function (inputs, exits) {

    let patients = await Patient.find({limit: 10});
    // All done.
    return exits.success({patients});
  }


};
