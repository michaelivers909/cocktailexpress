const pool = require("../config/mysql.config");

async function add(res, drink, user_id) {
  try {
    console.log(drink)
    console.log(user_id)
    if (
      !drink.drink.drink_id ||
      isNaN(drink.drink.drink_id)
    ) {
      throw "Unable to retrieve cocktail data.";
    }
    console.log("this")
    await pool.query(
      "INSERT INTO saved (drink_id, user_id, gif, thumbnail, ingredients, instructions) VALUES (?,?,?,?,?,?)",
      [
        drink.drink.drink_id,
        user_id,
        drink.gif,
        drink.drink.thumbnail,
        JSON.stringify(drink.drink.ingredients),
        drink.drink.instructions,
      ]
    );

    res.send({
      success: true,
      data: "Successfully added to Saved Cocktails.",
      error: null,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function remove(res, id, user_id) {
  try {
    await pool.query("DELETE from saved WHERE saved.id = ?", [id]);
    return res.send({
      success: true,
      data: "Saved cocktail successfully deleted.",
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function byUser_id(res, user_id) {
  try {
    const [user_id] = await pool.query(
      "SELECT * FROM saved WHERE saved.user_id = ?,"[user_id]
    );
    return res.send({
      success: true,
      data: saved,
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}

async function saved(res) {
  try {
    // get by userID
    const [saved] = await pool.query("SELECT * FROM saved");
    // send success message
    res.send({
      success: true,
      data: saved,
      error: null,
    });
  } catch (err) {
    return res.send({
      success: false,
      data: null,
      error: err,
    });
  }
}


module.exports = { add, remove, byUser_id };
