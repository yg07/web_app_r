const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class SpecController {
  async getAll(req, res) {
    try {
      const query = `SELECT s.id, o.name as order_name, p.name as prod_name, s.kol
                     FROM spec s
                     left join \`order\` o on s.order_id = o.id
                     left join prod p on s.prod_id = p.id`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async getSpecByOrderID(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { order_id } = req.body;
      
      if (!order_id) {
        return sendError(res, { message: 'order_id is required' }, 400);
      }

      const query = `SELECT s.id, o.name as order_name, p.name as prod_name, s.kol
                     FROM spec s
                     left join \`order\` o on s.order_id = o.id
                     left join prod p on s.prod_id = p.id
                     WHERE s.order_id = ?`;

      console.log('Executing query:', query, 'with params:', [order_id]);
      
      const rows = await executeQuery(query, [order_id]);
      
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { order_id, prod_id, kol } = req.body;
      
      if (!order_id || !prod_id || !kol) {
        return sendError(res, { message: 'order_id, prod_id and kol are required' }, 400);
      }

      const query = `INSERT INTO spec(order_id, prod_id, kol) 
                     VALUES(?, ?, ?)`;
      
      const result = await executeQuery(query, [order_id, prod_id, kol]);
      
      sendResponse(res, { 
        statusText: `Data inserted: ${result.affectedRows} row(s).`,
        insertId: result.insertId 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  async update(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { id, order_id, prod_id, kol } = req.body;
      
      if (!id || !order_id || !prod_id || !kol) {
        return sendError(res, { message: 'id, order_id, prod_id and kol are required' }, 400);
      }

      const query = `UPDATE spec 
                     SET order_id = ?, 
                         prod_id = ?,
                         kol = ?
                     WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [order_id, prod_id, kol, id]);
      
      const result = await executeQuery(query, [order_id, prod_id, kol, id]);
      
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
      
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      const query = `DELETE FROM spec WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [id]);
      
      const result = await executeQuery(query, [id]);
      
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new SpecController();