const app = require('../index'); // root index.js ka path

export default async function handler(req, res) {
    await app(req, res);
}
