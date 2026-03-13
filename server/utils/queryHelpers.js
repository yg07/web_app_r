async function executeQuery(query, res) {
  try {
    const connection = require('../config/database').getConnection();
    const [rows] = await connection.query(query);
    return rows;
  } catch (err) {
    console.log(err.sqlMessage);
    throw err;
  }
}

function sendResponse(res, data, status = 200) {
  res.status(status).send(data);
}

function sendError(res, err, status = 500) {
  res.status(status).send({ 
    status, 
    data: null, 
    message: err.sqlMessage || err.message 
  });
}

module.exports = { executeQuery, sendResponse, sendError };
