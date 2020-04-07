const pgoptions = {
    connect(client, dc, isFresh) {
        if (isFresh) {
            client.on('notice', (msg) => {
                console.log('notice: ', msg);
            });
        }
    },
    query(e) {
        console.log(e.query);
    },
};
const pgp = require('pg-promise')(pgoptions);

const conString = `postgres://postgres:1234@localhost:5433/postgres`;
const db = pgp(conString);

export default db;