const client = require('./client');


const create_table_query = `
CREATE TABLE IF NOT EXISTS eliga_user (
  id SERIAL PRIMARY KEY,
  username varchar,
  position varchar,
  password varchar
);
`;

const create_drinking_table_query = `
CREATE TABLE IF NOT EXISTS eliga_drinking (
  id SERIAL PRIMARY KEY,
  user_id int,
  is_tea BOOLEAN DEFAULT false,
  is_milk BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  is_morning BOOLEAN DEFAULT false,
  is_evening BOOLEAN DEFAULT false,
  CONSTRAINT fk_eliga_user FOREIGN KEY(user_id) REFERENCES eliga_user(id)
);
`;

client
  .query(create_table_query)
  .then(result => {
    console.log('user table created successfully');
    client
    .query(create_drinking_table_query)
    .then(result => {
      console.log('drinking table created successfully');
    })
    .catch(e => console.error('drinking db connection error', e.stack))
  })
  .catch(e => console.error('user db connection error', e.stack))


const createUserRow = (request, callback) => {
  const { username, position, password } = request;

  client.query(
    "INSERT INTO eliga_user (username, position, password) VALUES ($1, $2, $3) RETURNING *",
    [username, position, password],
    (error, result) => {
      if (error) {
        // throw error;
        callback(error, null);
      }
      callback(error, result.rows[0]);
    }
  );
};

const updatePasswordRow = (request, callback) => {
  const { id, password } = request;

  client.query(
    `UPDATE eliga_user set password = ${password} where id = ${id} RETURNING *`,
    (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result.rows[0]);
    }
  );
};

const selectUser = (id, callback) => {
  client.query(`select * from eliga_user where id = '${id}'`, (err, res) => {
    console.log("response...", res);
    if(err) {
      throw err;
    } else {
      callback(err, res.rows[0]);
    }
  })
}

const selectUsers = (callback) => {
  client.query(`select * from eliga_user`, (err, res) => {
    console.log("response...", res);
    if(err) {
      throw err;
    } else {
      callback(err, res.rows);
    }
  })
}

const selectDrinkings = (callback) => {
  client.query(`select * from eliga_drinking`, (err, res) => {
    console.log("response...", res);
    if(err) {
      throw err;
    } else {
      callback(err, res.rows);
    }
  })
}

const createDrinkingRow = (request, callback) => {
  const { user_id } = request;
  const created_at = '2022-03-16T00:04:19.676Z';
  const is_tea = request?.is_tea ? true : false;
  const is_milk = request?.is_milk ? true : false;
  const is_morning = request?.is_morning ? true : false;
  const is_evening = request?.is_evening ? true : false;
  client.query(
    "INSERT INTO eliga_drinking (user_id, is_tea, is_milk, created_at, is_morning, is_evening) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [user_id, is_tea, is_milk, created_at, is_morning, is_evening],
    (error, result) => {
      if (error) {
        throw error;
      }
      callback(error, result.rows[0]);
    }
  );
};

const selectDrinkingByUserId = (id, callback) => {
  client.query(`select * from eliga_drinking where user_id = '${id}'`, (err, res) => {
    console.log("response...", res);
    if(err) {
      callback(err, null);
    } else {
      callback(err, res.rows);
    }
  })
}

const checkUserDrinkingAlready = (id, callback) => {
  client.query(`select * from eliga_drinking WHERE eliga_drinking.user_id = ${id} AND eliga_drinking.created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()`, (err, res) => {
    if(err) {
      callback(err, null);
    } else {
      callback(err, res.rows);
    }
  })
}

module.exports = {
  createUserRow, createDrinkingRow, updatePasswordRow, selectUser, selectUsers, selectDrinkings, selectDrinkingByUserId, checkUserDrinkingAlready
}
// 