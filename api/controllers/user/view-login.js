module.exports = {

  friendlyName: 'Login',

  description: 'If there is no valid session, show the login page. Redirect to the /user page otherwise.',

  inputs: {},

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/user/login'
    },
    existingSession: {
      responseType: 'redirect',
      url: '/user'
    },
  },

  fn: async function (inputs, exits) {

    let contract = this.req.session.nuts_session;

    // is there a contract?
    if (!contract) {
      // nope, render the login page
      return exits.success();
    }

    // is it valid?
    try {
      if (await sails.helpers.validateNutsSession(contract))
        return exits.existingSession('/user');
    } catch (e) {
      // ignore errors and show login page
    }

    return exits.success();
  }
};
