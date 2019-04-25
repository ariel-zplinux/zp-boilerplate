const calculatePasswordCombinations = require('./calculatePasswordCombinations.js');

describe('calculatePasswordCombinations', () => {
  it('Should generate correct output', () => {
    const tests = [
      {
        input: {
          "x": 4,
          "l": {
            "x": 5,
            "l": {
              "x": 4,
              "l": {
                "x": 5,
                "l": null,
                "r": null
              },
              "r": null
            },
            "r": null
          },
          "r": {
            "x": 6,
            "l": {
              "x": 1,
              "l": null,
              "r": null
            },
            "r": {
              "x": 6,
              "l": null,
              "r": null
            }
          }
        },
        output:
          [ '4545', '461', '466' ]
      }
    ]

    tests.forEach((test) => {
      expect(calculatePasswordCombinations(test.input)).toEqual(test.output);
    })
  })
});
