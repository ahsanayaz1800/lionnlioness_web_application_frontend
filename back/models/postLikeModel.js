var pool = require("../config/database");

module.exports = {
  post_like_dislike: async (id_who_like, name_who_like, image, postid) => {
    const sql = "SELECT * FROM posts_like WHERE userid=? AND postid=?";
    const result = await pool.query(sql, [id_who_like, postid]);

    if (result.length > 0) {
      // Record exists, delete it
      const sql2 = "DELETE FROM posts_like WHERE userid=? AND postid=?";
      return await pool.query(sql2, [id_who_like, postid]);
    } else {
      // Record does not exist, insert it
      const sql3 =
        "INSERT INTO posts_like (userid, username, image, postid) VALUES (?, ?, ?, ?)";
      return await pool.query(sql3, [
        id_who_like,
        name_who_like,
        image,
        postid,
      ]);
    }
  },

  post_like_count: async (postid) => {
   const sql =
     "SELECT postid, COUNT(*) AS likeCount FROM posts_like WHERE postid = ? GROUP BY postid";

   const result = await pool.query(sql, [postid]);


   return result
  

},

};
