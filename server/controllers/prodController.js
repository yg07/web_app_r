const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class ProdController {
  async getAll(req, res) {
    try {
      const query = `SELECT p.id, p.name, p.price, c.name as categ 
                     FROM prod p 
                     LEFT JOIN categ c ON p.categ_id = c.id`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { name, price, categ_id } = req.body;
      const query = `INSERT INTO prod(name, price, categ_id) 
                     VALUES('${name}', ${price}, ${categ_id})`;
      
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
      
      const { id, name, price, categ_id } = req.body;
      const query = `UPDATE prod 
                     SET name = '${name}', 
                         price = ${price}, 
                         categ_id = ${categ_id}
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
      const query = `DELETE FROM prod WHERE id = ${id}`;
      
      const result = await executeQuery(query);
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new ProdController();
