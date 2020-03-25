const pgoptions = {
  connect(client, isFresh) {
    if (isFresh) {
      client.on('notice', (msg) => {
      });
    }
  },
  query(e){
  },
};
const pgp = require('pg-promise')(pgoptions);

const conString = `${process.env.DATABASE_URL}`;
const db = pgp(conString);


exports.sample_function = (callbackFunction) => {
  // Make database calls 
  db.any('sample query', variable)
    .then((data) => {
      return callbackFunction(null, data);
    })
    .catch((err) => {
      return callbackFunction(err, null);
    });
};
