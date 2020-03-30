const request = require("request");
const getJSONFromWWWPromise = url => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: url,
        json: true
      },
      (error, response, body) => {
        if (url === "err") {
          // Reject the Promise with an error
          reject({ result: "some severe error" });
          return;
        } else {
          resolve(body);
        }
      }
    );
  });
};
module.exports = {
  getJSONFromWWWPromise
};
