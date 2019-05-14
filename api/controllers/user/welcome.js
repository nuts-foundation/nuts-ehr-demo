module.exports = {

  friendlyName: 'Welcome user',

  description: 'Look up the specified user and welcome them, or redirect to a signup page if no user was found.',

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/user/welcome'
    },
    unauthorized: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'redirect',
    }
  },

  fn: async function (inputs, exits) {

    let contract = this.req.session.nuts_session;

    if (contract === undefined) {
      return exits.unauthorized('/login');
    }
    let validationResponse;
    try {
      validationResponse = await sails.helpers.validateNutsSession(contract)
    } catch (err) {
      return {unauthorized: '/login'}
    }

    // Display the welcome view.
    return exits.success({validationResponse: JSON.stringify(validationResponse)});
  }
};
