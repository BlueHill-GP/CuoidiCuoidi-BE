
import express, { Request, Response } from 'express';

import * as crypto from 'crypto';
import * as https from 'https';

export const getQrCode = (request: Request, response: Response) => {
  const { data } = request.body
  console.log(data);
  
  var partnerCode = 'MOMOYQUJ20220505';
  var accessKey = 'XXnuLiwlGqDbQ0Ve';
  var secretkey = '7gadnAGrhiHj5pPQrYyzuo0xdALj34Lr';
  var requestId = data.bookingId;
  var orderId = data.bookingId;
  var orderInfo = 'Thanh toán gói dịch vụ';
  var redirectUrl = 'http://13.54.229.100:4000/api/payment';
  // var redirectUrl = 'http://localhost:4000/api/payment';
  var ipnUrl = 'http://localhost:3000/user-booking';
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = data.price;
  var requestType = 'captureWallet';
  var extraData = ''; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    'accessKey=' +
    accessKey +
    '&amount=' +
    amount +
    '&extraData=' +
    extraData +
    '&ipnUrl=' +
    ipnUrl +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&partnerCode=' +
    partnerCode +
    '&redirectUrl=' +
    redirectUrl +
    '&requestId=' +
    requestId +
    '&requestType=' +
    requestType;
  //puts raw signature
  console.log('--------------------RAW SIGNATURE----------------');
  console.log(rawSignature);
  //signature

  var signature = crypto
    .createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
  console.log('--------------------SIGNATURE----------------');
  console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en',
  });
  //Create the HTTPS objects

  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
      //Call api update payment status
      console.log('Body: ');
      console.log(body);
      response.send(body);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  console.log('Sending....');
  req.write(requestBody);
  req.end();
};
