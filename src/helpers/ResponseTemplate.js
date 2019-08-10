class ResponseTemplate {
  responseError(res, err) {
    res.setHeader("content-type", "application/vnd.api+json");
    res.status(err.status || 400);
    let errorJSON = {
      errors: []
    };

    console.error("capture error ===>", err);

    let newError = {
      status: err.status || 400,
      detail: err.detail || "Bad request.",
      message: err.message || err.sqlMessage
      // source: err.source || undefined,
      // code: err.code || undefined,
      // title: err.title || undefined,
    };
    errorJSON.errors.push(newError);
    res.json(errorJSON);
  }
}

module.exports = ResponseTemplate;
