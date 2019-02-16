
const { Schema, Types } = require('../db');

export default new Schema({
  username: { type: Types.String, required: true, pattern: /^[0-9A-z_]{6,32}$/ },
  password: { type: Types.String, required: true, pattern: /^[0-9A-z]{32}$ / }
});
