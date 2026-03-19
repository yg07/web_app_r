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
      
      // Валидация обязательных полей
      if (!prod_id || !kol) {
        return sendError(res, { message: 'prod_id and kol are required' }, 400);
      }

      // Параметризованный запрос
      const query = `INSERT INTO sklad(prod_id, kol) 
                     VALUES(?, ?)`;
      
      const result = await executeQuery(query, [prod_id, kol]);
      
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
      
      const { id, prod_id, kol } = req.body;
      
      // Валидация обязательных полей
      if (!id || !prod_id || !kol) {
        return sendError(res, { message: 'id, prod_id and kol are required' }, 400);
      }

      // Параметризованный запрос
      const query = `UPDATE sklad 
                     SET prod_id = ?, 
                         kol = ? 
                     WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [prod_id, kol, id]);
      
      const result = await executeQuery(query, [prod_id, kol, id]);
      
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
      const query = `DELETE FROM sklad WHERE id = ?`;
      
      console.log('Executing query:', query, 'with params:', [id]);
      
      const result = await executeQuery(query, [id]);
      
      sendResponse(res, { 
        statusText: `Data deleted: ${result.affectedRows} row(s).` 
      });
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения записи склада по ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return sendError(res, { message: 'id is required' }, 400);
      }

      const query = `SELECT s.id, p.name as prod_name, s.prod_id, s.kol
                     FROM sklad s
                     left join prod p on s.prod_id = p.id
                     WHERE s.id = ?`;
      
      const rows = await executeQuery(query, [id]);
      
      if (rows.length === 0) {
        return sendError(res, { message: 'Record not found' }, 404);
      }
      
      sendResponse(res, rows[0]);
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения остатков по продукту
  async getByProductId(req, res) {
    try {
      const { prod_id } = req.params;
      
      if (!prod_id) {
        return sendError(res, { message: 'prod_id is required' }, 400);
      }

      const query = `SELECT s.id, p.name as prod_name, s.kol
                     FROM sklad s
                     left join prod p on s.prod_id = p.id
                     WHERE s.prod_id = ?`;
      
      const rows = await executeQuery(query, [prod_id]);
      
      sendResponse(res, rows);
    } catch (err) {
      sendError(res, err);
    }
  }

  // Дополнительный метод для получения общего количества на складе
  async getTotalKol(req, res) {
    try {
      const query = `SELECT SUM(kol) as total_kol FROM sklad`;
      
      const rows = await executeQuery(query);
      
      sendResponse(res, { total_kol: rows[0].total_kol || 0 });
    } catch (err) {
      sendError(res, err);
    }
  }
}

module.exports = new SkladController();