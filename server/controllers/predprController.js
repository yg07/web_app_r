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
      
      // Валидация обязательных полей
      if (!name || !address) {
        return sendError(res, { message: 'name and address are required' }, 400);
      }

      // Параметризованный запрос
      const query = `INSERT INTO predpr(name, address) 
                     VALUES(?, ?)`;
      
      const result = await executeQuery(query, [name, address]);
      
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
      
      const { id, name, address } = req.body;
      
      // Валидация обязательных полей
      if (!id || !name || !address) {
        return sendError(res, { message: 'id, name and address are required' }, 400);
      }

      // Параметризованный запрос
      const query = `UPDATE predpr 
                     SET name = ?, 
                         address = ?
                     WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [name, address, id]);
      
      const result = await executeQuery(query, [name, address, id]);
      
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
      const query = `DELETE FROM predpr WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [id]);
      
      const result = await executeQuery(query, [id]);
      
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения предприятия по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      const query = `SELECT id, name, address FROM predpr WHERE id = ?`;
      
      const rows = await executeQuery(query, [id]);
      
      if (rows.length === 0) {
        return sendError(res, { message: 'Predpr not found' }, 404);
      }
      
      sendResponse(res, rows[0]);
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new PredprController();