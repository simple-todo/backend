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
    };
    errorJSON.errors.push(newError);
    res.json(errorJSON);
  }

  responseSuccess(res, data) {
    res.setHeader("content-type", "application/vnd.api+json");
    console.error("capture data ===>", data);

    let newError = {
      status: 200,
      success: true,
      data: data
    };

    res.json(newError);
  }
}

module.exports = ResponseTemplate;
