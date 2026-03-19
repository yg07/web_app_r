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
      
      // Валидация обязательного поля
      if (!name) {
        return sendError(res, { message: 'name is required' }, 400);
      }

      // Параметризованный запрос
      const query = `INSERT INTO categ(name) VALUES(?)`;
      
      const result = await executeQuery(query, [name]);
      
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
      
      const { id, name } = req.body;
      
      // Валидация обязательных полей
      if (!id || !name) {
        return sendError(res, { message: 'id and name are required' }, 400);
      }

      // Параметризованный запрос
      const query = `UPDATE categ SET name = ? WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [name, id]);
      
      const result = await executeQuery(query, [name, id]);
      
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
      const query = `DELETE FROM categ WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [id]);
      
      const result = await executeQuery(query, [id]);
      
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения категории по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      const query = `SELECT id, name FROM categ WHERE id = ?`;
      
      const rows = await executeQuery(query, [id]);
      
      if (rows.length === 0) {
        return sendError(res, { message: 'Category not found' }, 404);
      }
      
      sendResponse(res, rows[0]);
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для поиска категорий по имени
  async searchByName(req, res) {
    try {
      const { name } = req.query;
      
      if (!name) {
        return sendError(res, { message: 'name query parameter is required' }, 400);
      }

      const query = `SELECT id, name FROM categ WHERE name LIKE ?`;
      
      const rows = await executeQuery(query, [`%${name}%`]);
      
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new CategController();