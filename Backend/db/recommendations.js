const { generateError } = require("../helpers");
const { getConnection } = require("./db");

//Crear una recomendación en la base de datos y devuelve su id
const createRecommendation = async (
  userId,
  title,
  category,
  location,
  sumary,
  details,
  image = ""
) => {
  let connection;
  try {
    connection = await getConnection();
    //Crear una recomendacion

    const [newRecommendation] = await connection.query(
      `
      INSERT INTO recommendations (user_id, title, category, location, summary, details, image) 
      VALUES (?,?,?,?,?,?,?);
    `,
      [userId, title, category, location, sumary, details, image]
    );

    //Devolver la id
    return newRecommendation.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//muestra los datos de un registro de la tabla Recommendations
const getRecommendationById = async (id) => {
  if (!id) {
    throw generateError("No se proporcionó un ID.", 400);
  }
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM recommendations WHERE id = ?
    `,
      [id]
    );

    const [userResult] = await connection.query(
      `
      SELECT username FROM users WHERE id = ?
    `,
      [result[0].user_id]
    );

    if (result.length === 0) {
      throw generateError(`La recomendación con ID: ${id} no existe`, 404);
    }

    const [votes] = await connection.query(
      "SELECT SUM(value) as votes FROM votes WHERE recommendation_id = ?",
      [id]
    );

    const [comments] = await connection.query(
      "SELECT comments.*, users.username FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.recommendation_id = ? ORDER BY comments.created_at DESC",
      [id]
    );

    const recommendation = {
      result: result[0],
      votes: votes[0].votes,
      comments: comments,
      userResult: userResult[0],
    };

    return [recommendation];
  } finally {
    if (connection) connection.release();
  }
};

//Muestra el resultado de la busqueda de recomendaciones por lugar o categoria
const getRecommendation = async (location, category) => {
  let connection;

  try {
    connection = await getConnection();

    let searchQuery =
      "SELECT r.*, (SELECT COUNT(*) FROM votes v WHERE v.recommendation_id = r.id) as votes FROM recommendations r WHERE 1=1";
    let searchParams = [];

    if (location) {
      searchQuery += " AND r.location = ?";
      searchParams.push(location);
    }

    if (category) {
      searchQuery += " AND r.category = ?";
      searchParams.push(category);
    }

    searchQuery += " ORDER BY votes DESC";

    const [rows] = await connection.query(searchQuery, searchParams);

    return rows;
  } finally {
    if (connection) connection.release();
  }
};

//Elimina tu propia recomendación
const deleteRecommendationById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM recommendations WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const recommendationOrderedByVotes = async () => {
  let connection;

  try {
    connection = await getConnection();
    const [query] = await connection.query(`
      SELECT r.*, COALESCE(SUM(v.value), 0) AS votes
      FROM recommendations r
      LEFT JOIN votes v ON v.recommendation_id = r.id
      GROUP BY r.id
      ORDER BY votes DESC;
    `);

    return query;
  } finally {
    if (connection) connection.release();
  }
};

const recommendationByUser = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [recommendation] = await connection.query(
      `
    SELECT r.*, (SELECT COUNT(*) FROM votes v WHERE v.recommendation_id = r.id) AS votes FROM recommendations r WHERE r.user_id = ?
    `,
      [id]
    );

    if (recommendation.length === 0) {
      throw generateError("Este usuario no tiene recomendaciones.", 404);
    }

    return recommendation;
  } finally {
    if (connection) connection.release();
  }
};


const updateRecommendation = async (
  userId,
  title,
  category,
  location,
  summary,
  details,
  image,
  id
) => {
  let connection;
  try {
    connection = await getConnection();
    // Crear una lista de actualizaciones que se aplicarán en la consulta
    const updates = [];
    const params = [];

    // Verificar qué columnas deben actualizarse y agregarlas a la lista de actualizaciones
    if (title !== undefined) {
      updates.push("title = ?");
      params.push(title);
    }
    if (category !== undefined) {
      updates.push("category = ?");
      params.push(category);
    }
    if (location !== undefined) {
      updates.push("location = ?");
      params.push(location);
    }
    if (summary !== undefined) {
      updates.push("summary = ?");
      params.push(summary);
    }
    if (details !== undefined) {
      updates.push("details = ?");
      params.push(details);
    }
    if (image !== undefined) {
      updates.push("image = ?");
      params.push(image);
    }

    // Verificar si se proporcionaron columnas para actualizar
    if (updates.length === 0) {
      throw generateError("No se proporcionaron datos para actualizar.", 400);
    }

    // Generar la consulta SQL dinámica con las actualizaciones
    const sql = `UPDATE recommendations
      SET ${updates.join(", ")}
      WHERE id = ?;`;

    // Agregar el ID al final de los parámetros
    params.push(id);

    // Ejecutar la consulta con los parámetros
    const [result] = await connection.query(sql, params);

    // Devolver la id de la recomendación actualizada
    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createRecommendation,
  getRecommendation,
  getRecommendationById,
  deleteRecommendationById,
  recommendationOrderedByVotes,
  recommendationByUser,
  updateRecommendation,
};
