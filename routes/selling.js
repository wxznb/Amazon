const express = require("express");
const router = express.Router();
const Request = require("request");

const getDomainUrl = "https://d2h8zr0m6mus4x.cloudfront.net/primesignup/package.json";
const amazonAreaLetters = {
    "us": "美国站",
    "uk": "英国站",
    "ca": "加拿大站",
    "de": "德国站",
    "es": "西班牙站",
    "fr": "法国站",
    "it": "意大利站",
    "jp": "日本站",
    "in": "印度站",
    "cn": "中国站",
    "sg": "新加坡站",
    "mx": "墨西哥站",
    "ae": "澳洲站"
};

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

router.get("/amazonArea", function (request, responce, next) {
    Request({
        url: getDomainUrl,
        method: "GET"
    }, function (error, requestResponce, data) {
        if ( !error &&
             requestResponce.statusCode === 200 ) {
            data = JSON.parse(data);
            let area = new Array();
            
            Object.keys(data["domain"]).forEach(function (key) {
                area.push(amazonAreaLetters[key]);
            });

            responce.send({
                code: 0,
                data: area
            });
        } else {
            responce.send({
                code: 1001,
                message: error
            });
        }
    });
});

router.post("", function (request, responce, next) {
});

module.exports = router;
