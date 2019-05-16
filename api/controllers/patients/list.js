module.exports = {

  friendlyName: 'List',

  description: 'List patients.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/patients/list'
    }

  },

  fn: async function (inputs, exits) {

    let patients = await Patient.find({limit: 10});
    return exits.success({patients});
  }


};
