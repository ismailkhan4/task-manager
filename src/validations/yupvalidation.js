// yupValidator.js
const yup = require("yup");

// Generic function to create a middleware for schema validation
function createValidator(schema) {
  return function validateData(req, res, next) {
    const dataToValidate = req.body;

    schema
      .validate(dataToValidate, { abortEarly: false })
      .then((validatedData) => {
        req.validatedData = validatedData;
        next();
      })
      .catch((errors) => {
        const formattedErrors = errors.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));

        res.status(400).json({ errors: formattedErrors });
      });
  };
}

module.exports = createValidator;
