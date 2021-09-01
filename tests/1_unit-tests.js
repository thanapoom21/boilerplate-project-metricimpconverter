const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", (done) => {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test("Fractional Input", (done) => {
      let input = "32/3L";
      assert.equal(convertHandler.getNum(input), 32 / 3);
      done();
    });

    test("Fractional Input w/ Decimal", (done) => {
      let input = "9/3.3L";
      assert.equal(convertHandler.getNum(input), 9 / 3.3);
      done();
    });

    test("Invalid Input (double fraction)", (done) => {
      let input = "32/3/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No Numerical Input", (done) => {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach((ele, index) => {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });

    test("Unknown Unit Input", (done) => {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      //see above example for hint
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", (done) => {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", (done) => {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", (done) => {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", (done) => {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", (done) => {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", (done) => {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});
