const Message = require("./messages");
const { successAction, failAction } = require("./response");

module.exports = async function (req, res, next) {
  try {
    const {
      body = {},
      user = {},
      query = {},
      params = {},
      files = [],
      file = {},
      headers,
    } = req;
    const { isRequestValidateRequired = false, schemaValidate = {} } = this;
    if (isRequestValidateRequired) {
      const { error } = schemaValidate.validate(body);
      if (error)
        return res
          .status(400)
          .json(
            failAction(
              error.details[0].message.toString().replace(/[\""]+/g, "")
            )
          );
    }
    this["modelService"]({
      body,
      user,
      query,
      params,
      files,
      file,
      headers,
    }).then(
      (success) =>
        res.status(200).json(successAction(success, Message.success)),
      (error) => {
        console.error("than catch error=>", error);
        let errorMessage = Message[error.message]
          ? Message[error.message]
          : error.message;
        return res.status(400).json(failAction(errorMessage));
      }
    );
  } catch (e) {
    console.error("catch block error=>", e);
    res.status(400).json(failAction(Message.systemError));
  }
};
