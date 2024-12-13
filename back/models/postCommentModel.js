const { post } = require("request");
var pool = require("../config/database");
module.exports = {
  CreateComment: async (userid, username,image ,postid, comment) => {
    const sql =
      "INSERT INTO posts_comment (userid, username, image ,postid , comment) VALUES (?,?,?, ?, ?)";

    var result = await pool.query(sql, [userid, username, image ,postid, comment]);
    return result;
  },
  GetComment: async (post_id) => {
    const sql = "SELECT * FROM posts_comment WHERE postid = ? ";

    var result = await pool.query(sql, [post_id]);
    return result;
  },
  updateComment: async (commentid, comment) => {
    const sql = "UPDATE posts_comment SET comment = ? WHERE id = ?";

    var result = await pool.query(sql, [comment, commentid]);
    return result;
  },
  deleteComment : async (commentid) => {

    const sql =
      "DELETE FROM posts_comment WHERE id=?";

    var result = await pool.query(sql, [commentid]);
    return result;
    
  }
};