module.exports = {

  friendlyName: 'Login',

  description: 'Accept a Nuts-contract. Check its validity, if correct, set the Nuts-contract in the session.',

  inputs: {
    nuts_auth_token: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: {
      description: 'The Nuts-contract is valid.',
    },
    invalid: {
      description: 'The Nuts-contract is invalid.',
      responseType: 'unauthorized'
    },
  },

  fn: async function (inputs, exits) {
    let contract = inputs.nuts_auth_token;
    sails.log(contract)

    try {
      await sails.helpers.validateNutsSession(contract)
    } catch (err) {
      return exits.invalid();
    }

    this.req.session.nuts_session = contract;

    return exits.success();
  }
};
