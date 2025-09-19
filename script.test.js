const getSentiment = require('./script');

describe('getSentiment', () => {
    test('should return "Positive" for a positive sentence', () => {
        expect(getSentiment('This is a great and amazing product!')).toBe('Positive');
    });

    test('should return "Negative" for a negative sentence', () => {
        expect(getSentiment('This is a bad and terrible experience.')).toBe('Negative');
    });

    test('should return "Neutral" for a neutral sentence', () => {
        expect(getSentiment('This is a product.')).toBe('Neutral');
    });

    test('should return "Neutral" for an empty string', () => {
        expect(getSentiment('')).toBe('Neutral');
    });

    test('should return "Neutral" when positive and negative words are balanced', () => {
        expect(getSentiment('The product is good but the shipping was bad.')).toBe('Neutral');
    });

    test('should be case-insensitive', () => {
        expect(getSentiment('This is a GREAT and AMAZING product!')).toBe('Positive');
    });

    test('should handle punctuation correctly', () => {
        expect(getSentiment('This is a great, amazing product!')).toBe('Positive');
    });
});
