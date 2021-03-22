const bcrypt = require("bcrypt");
const pool = require("../config/mysql.config");

function isInvalid(val, min, max) {
  return !val || val.length < min || val > max;
}

async function signUp(res, username, password) {
  try {
    if (isInvalid(username, 7, 20) || isInvalid(password, 7, 20)) {
      throw "Username and Password must be between 7 and 20 characters.";
    }
    let [user] = await pool.query("SELECT * FROM users WHERE users.username = ?", [
      username,
    ]);
    if (user.length > 0) {
      throw "Username is already taken.";
    }
    const encrypted = await bcrypt.hash(password, 7);
    await pool.query("INSERT INTO users (username, password) VALUES (?,?)", [
      username,
      encrypted,
    ]);
    return res.send({
      success: true,
      data: { username: username }, 
      error: null,
    });
  } catch (err) {
    return res.send({ success: false, data: null, error: err });
  }
}



module.exports.signUp = signUp;

