const CHAR_LIMIT = 20;

function validateFilename(name) {
  if (!name.trim()) {
    return [false, "Please provide a valid name"];
  }

  if (!/^[0-9a-zA-Z]+$/.test(name.trim())) {
    return [false, `Provided name ${name} is not alphanumeric`];
  }

  if (name.trim().length > CHAR_LIMIT) {
    return [false, "Sorry the provided name is longer than 20 characters"];
  }

  return [true];
}

module.exports = validateFilename;
