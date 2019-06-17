let rp = require('request-promise');

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
    let viewModel = {
      consentPerCareProvider: {given: {}, received: {}},
      patient: null,
      externalCareProviders: []
    }

    viewModel.patient = await Patient.findOne({id: inputs.patientId});

    let bsn = sails.jp.query(viewModel.patient.resource.identifier, '$[?(@.system==\'http://hl7.org/fhir/sid/us-ssn\')].value')

    viewModel.externalCareProviders = await ExternalCareProvider.find({where: {patientId: viewModel.patient.id}});

    let agb = sails.config.custom.agb;

    for (const actor of viewModel.externalCareProviders) {
      try {
        let response = await rp({
          uri: `http://localhost:1323/consent/check`,
          method: 'POST',
          json: true,
          body: {
            subject: `urn:oid:2.16.840.1.113883.2.4.6.3:${bsn}`,
            custodian: agb,
            actor: actor.organizationId,
            resourceType: "Observation"
          }
        });
        viewModel.consentPerCareProvider['given'][actor.organizationId] = response.consentGiven == 'true'
        response = await rp({
          uri: `http://localhost:1323/consent/check`,
          method: 'POST',
          json: true,
          body: {
            subject: `urn:oid:2.16.840.1.113883.2.4.6.3:${bsn}`,
            custodian: actor.organizationId,
            actor: agb,
            resourceType: "Observation"
          }
        });
        viewModel.consentPerCareProvider['received'][actor.organizationId] = response.consentGiven == 'true'
      } catch (err) {
        sails.log.error(err)
      }
    };

    sails.log(viewModel.consentPerCareProvider)


    return exits.success(viewModel)
  }


};
