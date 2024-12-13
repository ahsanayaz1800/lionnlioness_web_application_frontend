var pool = require("../config/database");

module.exports = {
  vedio_call: async (socket_id, user_name) => {
    const sql = "SELECT * FROM video_call WHERE username=? ";
    const result = await pool.query(sql, [user_name]);

    if (result.length > 0) {
      // Record exists, delete it
      const sql2 = "UPDATE video_call SET socketid=? WHERE username=? ";
      return await pool.query(sql2, [socket_id, user_name]);
    } else {
      // Record does not exist, insert it
      const sql3 = "INSERT INTO video_call (username,socketid) VALUES (?, ?)";
      return await pool.query(sql3, [user_name, socket_id]);
    }
  },

  get_friend_id_to_vedio_call: async (friend_name) => {
    const sql = "SELECT * FROM video_call WHERE username=?";

    const result = await pool.query(sql , [friend_name]);

    return result ; 
  },
};
