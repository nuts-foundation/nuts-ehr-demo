module.exports = {


  friendlyName: 'Add external care provider',


  description: '',


  inputs: {
    patientId: {
      type: 'string'
    }
  },

  exits: {
    backToPatient: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {
    try {
      let externalCareProviders = await ExternalCareProvider.find({where: {patientId: inputs.patientId}});
      let patient = await Patient.findOne({id: inputs.patientId});
      let bsn = sails.jp.query(patient.resource.identifier, '$[?(@.system==\'http://hl7.org/fhir/sid/us-ssn\')].value')

      let contract = this.req.session.nuts_session;
      let validationResponse = await sails.helpers.validateNutsSession(contract)

      await sails.helpers.startConsentFlow.with({
        subject: `urn:oid:2.16.840.1.113883.2.4.6.3:${bsn}`,
        actors: externalCareProviders.map((actor)=> actor.organizationId),
        performer: `urn:oid:2.16.840.1.113883.2.4.6.1:${validationResponse['disclosed_attributes']['irma-demo.nuts.agb.agbcode']}`,
      });

    } catch (err) {
      console.log("error while storing consent", err);
    }
    return exits.backToPatient('/patients/' + inputs.patientId);
  }

};
