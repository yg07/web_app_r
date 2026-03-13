const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class SkladController {
  async getAll(req, res) {
    try {
      const query = `SELECT s.id, p.name as prod_name, s.kol
                     FROM sklad s
                     left join prod p on s.prod_id = p.id`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { prod_id, kol } = req.body;
      const query = `INSERT INTO sklad(prod_id, kol) 
                     VALUES('${prod_id}', ${kol})`;
      
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
      
      const { id, prod_id, kol } = req.body;
      const query = `UPDATE sklad 
                     SET prod_id = '${prod_id}', 
                         kol = ${kol} 
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
      const query = `DELETE FROM sklad WHERE id = ${id}`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new SkladController();
