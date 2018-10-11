/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const invalidUnit = 'invalid unit';
      const invalidNumber = 'invalid number';
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      let returnObject = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        'string': toString
      };
      console.log(returnObject, initNum, initUnit);
      if (initNum !== invalidNumber && initUnit !== invalidUnit) {
        res.json(returnObject);
      }
      if (initNum === invalidNumber && initUnit === invalidUnit) {
        res.json({ error: 'invalid number and unit' });
      }
      if (initNum === invalidNumber) {
        res.json({ error: invalidNumber });
      }
      if (initUnit === invalidUnit) {
        res.json({ error: invalidUnit });
      }
    });
    
};
