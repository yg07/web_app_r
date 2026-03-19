const { executeQuery, sendResponse, sendError } = require('../utils/queryHelpers');

class OrderController {
  async getAll(req, res) {
    try {
      const query = `SELECT o.id, o.name, p.name as predpr
                     FROM \`order\` o 
                     left join predpr p on o.predpr_id = p.id`;
      const rows = await executeQuery(query);
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  async create(req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      
      const { name, predpr_id } = req.body;
      
      // Валидация обязательных полей
      if (!name || !predpr_id) {
        return sendError(res, { message: 'name and predpr_id are required' }, 400);
      }

      // Параметризованный запрос
      const query = `INSERT INTO \`order\`(name, predpr_id) 
                     VALUES(?, ?)`;
      
      const result = await executeQuery(query, [name, predpr_id]);
      
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
      
      const { id, name, predpr_id } = req.body;
      
      // Валидация обязательных полей
      if (!id || !name || !predpr_id) {
        return sendError(res, { message: 'id, name and predpr_id are required' }, 400);
      }

      // Параметризованный запрос
      const query = `UPDATE \`order\` 
                     SET name = ?, 
                         predpr_id = ?
                     WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [name, predpr_id, id]);
      
      const result = await executeQuery(query, [name, predpr_id, id]);
      
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
      
      // Валидация обязательного поля
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      // Параметризованный запрос
      const query = `DELETE FROM \`order\` WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [id]);
      
      const result = await executeQuery(query, [id]);
      
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения заказа по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      const query = `SELECT o.id, o.name, p.name as predpr, o.predpr_id
                     FROM \`order\` o 
                     left join predpr p on o.predpr_id = p.id
                     WHERE o.id = ?`;
      
      const rows = await executeQuery(query, [id]);
      
      if (rows.length === 0) {
        return sendError(res, { message: 'Order not found' }, 404);
      }
      
      sendResponse(res, rows[0]);
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения заказов по предприятию
  async getByPredprId(req, res) {
    try {
      const { predpr_id } = req.params;
      
      if (!predpr_id) {
        return sendError(res, { message: 'predpr_id is required' }, 400);
      }

      const query = `SELECT o.id, o.name, p.name as predpr
                     FROM \`order\` o 
                     left join predpr p on o.predpr_id = p.id
                     WHERE o.predpr_id = ?`;
      
      const rows = await executeQuery(query, [predpr_id]);
      
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new OrderController();