let rp = require('request-promise');

module.exports = {
  friendlyName: "Validate Nuts session",

  description: "Validate the Nuts session by performing a server call to the Nuts node",

  inputs: {
    nuts_auth_token: {
      required: true,
      description: "The string containing the Nuts contract",
      type: 'string',
    }
  },

  exits: {
    success: {
      description: "Return contents of the validation result when the session is valid."
    },
    invalidSession: {
      description: "Return contents of the validation result when the session is invalid."
    }
  },

  fn: async function (inputs, exits) {
    const body = {
      contract_format: 'jwt',
      contract_string: inputs.nuts_auth_token,
      acting_party_cn: 'Demo EHR',
    };

    sails.log(inputs.nuts_auth_token)

    let validationResponse;

    try {
      validationResponse = await rp({
        uri: 'http://localhost:3000/auth/contract/validate',
        method: 'POST',
        json: true,
        body: body,
      });
    } catch (e) {
      // in case of failure, just say invalid. No fancy error handling needed in this demo.
      console.log("error while validating Nuts contract:", e);
      return exits.error(e);
    }
    console.log(validationResponse);

    const sessionIsValid = validationResponse.validation_result === "VALID";

    if (!sessionIsValid) {
      return exits.invalidSession(validationResponse)
    }

    return exits.success(validationResponse)
  }
};
