const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class CategController {
  async getAll(req, res) {
    try {
      const query = `SELECT id, name FROM categ`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { name } = req.body;
      const query = `INSERT INTO categ(name) VALUES('${name}')`;
      
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
      
      const { id, name } = req.body;
      const query = `UPDATE categ SET name = '${name}' WHERE id = ${id}`;
      
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
      const query = `DELETE FROM categ WHERE id = ${id}`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new CategController();
