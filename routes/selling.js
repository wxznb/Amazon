const express = require("express");
const router = express.Router();
const Request = require("request");

router.post("*", function (request, responce, next) {
    responce.header("Access-Control-Allow-Origin", "*");

    next();
});
router.get("*", function (request, responce, next) {
    responce.header("Access-Control-Allow-Origin", "*");

    next();
});

router.get("/", function (request, responce, next) {
    let domain = new Object();
    const getDomainUrl = "https://d2h8zr0m6mus4x.cloudfront.net/primesignup/package.json";

    Request({
        url: getDomainUrl,
        method: "GET"
    }, function (error, requestResponce, data) {
        if ( !error &&
             requestResponce.statusCode === 200 ) {
            data = JSON.parse(data);
            domain = Object.assign(domain, data["domain"]);
            let sellingUrl = "/gp/offer-listing/";
            let asinCode = "B07H97YKQS";

            console.log(`${domain["uk"]}${sellingUrl}${asinCode}`);

            Request({
                url: `${domain["uk"]}${sellingUrl}${asinCode}`,
                method: "GET"
            }, function (error, domainResponce, data) {
                if ( !error &&
                     domainResponce.statusCode === 200 ) {
                    // let sellingRegExp = new RegExp(/\<div class=\"a-row a-spacing-mini olpOffer\" role=\"row\"\>(\w+)\<\/div\>/, "g");
                    // let shopRexExp = new RegExp();

                    responce.send(data);
                } else {
                    responce.send(error);
                }
            });
        }
    });
});

router.post("", function (request, responce, next) {
});

module.exports = router;
