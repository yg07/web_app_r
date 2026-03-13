const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class PredprController {
  async getAll(req, res) {
    try {
      const query = `SELECT id, name, address FROM predpr`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { name, address } = req.body;
      const query = `INSERT INTO predpr(name, address) VALUES('${name}', '${address}')`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data inserted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  async update(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { id, name, address } = req.body;
      const query = `UPDATE predpr 
                     SET name = '${name}', address = '${address}'
                     WHERE id = ${id}`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data updated: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  async delete(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { id } = req.body;
      const query = `DELETE FROM predpr WHERE id = ${id}`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new PredprController();
