var pool = require("../config/database");
module.exports = {
  CreatePost: async (userid, username, Title, imagePaths) => {
    const sql =
      "INSERT INTO posts (userid, username, Title , imagePaths) VALUES (?, ?, ?, ?)";
    const imagesString = JSON.stringify(imagePaths);

    var result = await pool.query(sql, [userid, username, Title, imagesString]);
    return result;
  },
  GetPosts: async (user_id) => {
    const sql = "SELECT * FROM posts WHERE userid = ? ORDER BY id DESC";
    try {
      var result = await pool.query(sql, [user_id]);

      return result;
    } catch (error) {
      console.log("Query Error:", error); // Logs any SQL errors
      throw error;
    }
  },
 deletePost: async (postid) => {
  // Queries to delete from each table
  const deletePostQuery = "DELETE FROM posts WHERE id = ?";
  const deleteCommentsQuery = "DELETE FROM posts_comment WHERE postid = ?";
  const deleteLikesQuery = "DELETE FROM posts_like WHERE postid = ?";

  try {
    // Start a transaction to ensure atomic operations
    await pool.query('START TRANSACTION');

    // Delete from posts table
    await pool.query(deletePostQuery, [postid]);

    // Delete related comments
    await pool.query(deleteCommentsQuery, [postid]);

    // Delete related likes
    await pool.query(deleteLikesQuery, [postid]);

    // Commit the transaction if all queries succeed
    await pool.query('COMMIT');
   console.log(postid);
    return { message: "Post and related data deleted successfully." };
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.log("Query Error:", error);
    throw error;
  }
},

};


