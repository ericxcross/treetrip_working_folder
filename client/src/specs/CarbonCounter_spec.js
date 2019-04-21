const CarbonCounter = require('../models/CarbonCounter.js');
const assert = require('assert');

describe('CarbonCounter', () => {
    let carbonCounter;

    beforeEach(() => {
        carbonCounter = new CarbonCounter();
    })

    it('should calculate total CO2 diesel car', () => {
        assert.strictEqual(carbonCounter.calculateCO2e(0.14533, 100, 2), 7.2665);
    });
    it('should calculate number of trees diesel car', () => {
        assert.strictEqual(carbonCounter.calculateTrees(7.2665), 120.5578409090909);
    });
    it('should calculate social cost diesel car', () => {
        assert.strictEqual(carbonCounter.calculateSocialCost(7.2665), 0.0018166249999999999);
    });
    it('should calculate total CO2 flight canada', () => {
        assert.strictEqual(carbonCounter.calculateCO2e(0.01783, 5340, 1), 95.2122);
    });
    it('should calculate number of trees flight canada', () => {
        assert.strictEqual(carbonCounter.calculateTrees(95.2122), 1579.6569545454545);
    });
    it('should calculate social cost flight canada', () => {
        assert.strictEqual(carbonCounter.calculateSocialCost(95.2122), 0.02380305);
    });

});