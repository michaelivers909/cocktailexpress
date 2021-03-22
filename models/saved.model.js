const pool = require("../config/mysql.config");

async function add(res, drink, user_Id) {
  try {
    if (
      !drink.drink_Id ||
      drink.drink_Id < 1 ||
      drink.drink_Id > 40 ||
      isNaN(drink.drink_Id)
    ) {
      throw "Unable to retrieve cocktail data.";
    }
    await pool.query(
      "INSERT into saved(user_Id, gif, drink_Id, drink, ingredients, instructions) VALUES(?,?,?,?,?,?,?)",
      [
        user_Id,
        drink.gif,
        drink.drink_Id,
        drink.drink,
        drink.ingredients,
        drink.instructions,
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

async function remove(res, id, user_Id) {
  try {
    await pool.query("DELETE from saved WHERE saved.id = ?", [id]);
    return res.send({
      success: true,
      data: " Saved cocktail successfully deleted.",
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

async function byUser_id(res, user_Id) {
  try {
    const [user_Id] = await pool.query(
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
