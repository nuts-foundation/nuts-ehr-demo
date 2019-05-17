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
    }
  },

  datastore: 'disk',
};
