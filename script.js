function getSentiment(text) {
    if (!text) {
        return 'Neutral';
    }

    const positiveWords = ['good', 'great', 'excellent', 'love', 'amazing', 'happy', 'awesome', 'pleased', 'satisfied'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'sad', 'disappointed', 'poor', 'unhappy', 'frustrated'];

    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    let positiveCount = 0;
    let negativeCount = 0;

    for (const word of words) {
        if (positiveWords.includes(word)) {
            positiveCount++;
        }
        if (negativeWords.includes(word)) {
            negativeCount++;
        }
    }

    if (positiveCount > negativeCount) {
        return 'Positive';
    } else if (negativeCount > positiveCount) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const analyzeBtn = document.getElementById('analyze-btn');
        const feedbackInput = document.getElementById('feedback-input');
        const resultText = document.getElementById('result-text');

        analyzeBtn.addEventListener('click', () => {
            const feedback = feedbackInput.value;
            const sentiment = getSentiment(feedback);
            resultText.textContent = `Sentiment: ${sentiment}`;
        });
    });
}

// For testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = getSentiment;
}
