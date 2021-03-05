const bcrypt = require("bcrypt");
const pool = require("../config/mysql.config");

function isInvalid(val, min, max) {
    return !val || val.length < min || val > max;
}

async function signUp(res, username, password) {
    try {
        if(isInvalid(username, 7, 20) || isInvalid(password, 7, 20)) {
            throw "Username and Password must be between 7 and 20 characters.";
        }
        let [
            user,
        ] = await pool.query("SELECT * WHERE users.username = ?", [
            username,
        ]);
        if (user.length > 0){
            throw "Username is already taken.";
        }
        const encrypted = await bcrypt
    }
} 