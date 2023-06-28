const ManagementClient = require('auth0').ManagementClient;
require('dotenv').config();

const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'create:clients create:client_grants' // ensure you have these scopes in your token
});

const clientData = {
  name: 'node-test-app',
  app_type: 'non_interactive',
  // include other client options here as necessary
};

management.createClient(clientData)
  .then(client => {
    console.log('Created client', client);

    const clientGrant = {
      client_id: client.client_id,
      audience: 'https://test-api-endpoint',
      scope: ['read:msg', 'create:msg'],
    };

    return management.createClientGrant(clientGrant);
  })
  .then(clientGrant => {
    console.log('Created client grant', clientGrant);
  })
  .catch(err => {
    console.error('Error creating client or client grant', err);
  });
