module.exports = {


  friendlyName: 'Observations',


  description: 'Show observations for patient.',


  inputs: {
    patientId: {
      type: 'string',
      description: 'The bsn of the patient'
    }
  },


  exits: {
    success: {
      description: "a list of observations for this patient"
    }
  },


  fn: async function (inputs, exits) {
    const observation = {
      "resourceType": "Observation",
      "id": "f001",
      "status": "final",
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "15074-8",
            "display": "Glucose [Moles/volume] in Blood"
          }
        ]
      },
      "subject": {
        "reference": "Patient/999999990",
      },
      "effectivePeriod": {
        "start": "2013-04-02T09:30:10+01:00"
      },
      "issued": "2013-04-03T15:30:10+01:00",
      "performer": [
        {
          "reference": "Practitioner/f005",
        }
      ],
      "valueQuantity": {
        "value": 6.3,
        "unit": "mmol/l",
        "system": "http://unitsofmeasure.org",
        "code": "mmol/L"
      },
    };

    const observations = {
      999999990: [observation],
      999999989: [observation],
      999999977: [observation],
      999999965: [observation],
      999999953: [observation]

    };

    return exits.success(observations[inputs.patientId]);
  }


};
