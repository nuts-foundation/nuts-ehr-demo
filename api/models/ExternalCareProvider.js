module.exports = {
  attributes: {
    id: {type: 'number', autoIncrement: true},
    patientId: {
      type: 'string',
      required: true,
    },
    organizationId: {
      type: 'string',
      required: true,
    },
    organizationName: {
      type:'string',
      required: true,
    },
    uniqueId: {
      type: 'string',
      required: true,
      unique: true
    }
  },

  datastore: 'disk',
};
