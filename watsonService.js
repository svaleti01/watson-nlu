const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: 'LF3syP7ty0uAMdTd7VHi19DICKmrGeFowDvdwF5JPEY8',
  }),
  url: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/7da2d33b-1371-4e33-9ce7-3ce6a4446719',
});

const analyzeEmotions = (params) => {
    const html = '<html><head><title>Fruits</title></head><body><p>' + params + '</p></body></html>';
    const analyzeParams = {
        'html': html,
        'features': {
          'emotion': {
            'targets': [
              'finance',
              'job'
            ]
          }
        }
      };
      console.log(analyzeParams);

      naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
};

module.exports = {
    analyzeEmotions
}