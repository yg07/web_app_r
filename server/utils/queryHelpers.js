async function executeQuery(query, params = [], res) {
  try {
    const connection = require('../config/database').getConnection();
    
    // Если передан массив параметров, используем параметризованный запрос
    if (params && params.length > 0) {
      const [rows] = await connection.query(query, params);
      return rows;
    } else {
      // Если параметров нет, выполняем обычный запрос
      const [rows] = await connection.query(query);
      return rows;
    }
  } catch (err) {
    console.log('SQL Error:', err.sqlMessage || err.message);
    console.log('Failed Query:', err.sql || query);
    throw err;
  }
}

function sendResponse(res, data, status = 200) {
  res.status(status).json(data);
}

function sendError(res, err, status = 500) {
  console.error('Error details:', err);
  
  res.status(status).json({ 
    status, 
    data: null, 
    message: err.sqlMessage || err.message,
    ...(process.env.NODE_ENV === 'development' && { sql: err.sql }) // Добавляем SQL только в режиме разработки
  });
}

module.exports = { executeQuery, sendResponse, sendError };