const CHAR_LIMIT = 20;

function validateFilename(name, ext) {
  if (!name.trim()) {
    return [false, "Please provide a valid name"];
  }

  if (!/^[0-9a-zA-Z]+$/.test(name.trim())) {
    return [false, `Provided name ${name} is not alphanumeric`];
  }

  if (name.trim().length > CHAR_LIMIT) {
    return [false, "Sorry the provided name is longer than 20 characters"];
  }

  if (ext) {
    if (ext !== ".jpg" && ext !== ".jpeg") {
      return [false, "Sorry we are only supporting jpeg and jpg for now"];
    }
  }

  return [true];
}

export default validateFilename;
