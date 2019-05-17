module.exports = {
  attributes: {
    id: {type: 'string', required: true},
    txid: {type: 'string', required: true},
    // ts: {type: 'number', columnType: 'timestamptz', required: true},
    resource: {type: 'string', required: true},
    status: {type: 'string', required: true},
    resource: {type: 'json', required: true},
  }
}
