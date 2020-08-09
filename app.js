var express = require("express");
var { analyzeEmotions } = require("./watsonService");
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  authenticator: new IamAuthenticator({
    apikey: 'LF3syP7ty0uAMdTd7VHi19DICKmrGeFowDvdwF5JPEY8',
  }),
  url: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/7da2d33b-1371-4e33-9ce7-3ce6a4446719',
});

var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

var router = express.Router();
var analyzeEmotions = express.Router();

router.get('/', function (req, res, next) {
  res.json({status: 'UP'});
});

analyzeEmotions.post('/', function(req, res, next) {
  const html = '<html><head><title>Fruits</title></head><body><p>' + req.body.survey + '</p></body></html>';
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
});

app.use("/health", router);
app.use("/analyzeEmotions", analyzeEmotions);

app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
