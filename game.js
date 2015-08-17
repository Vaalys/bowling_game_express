var express = require('express'),
  app = exports.app = express();

app.get('/', function (req, res) {
  // res.send(statusMessage("ready") + "\n" + usageMessage());
  res.send("Ready.");
});

function statusMessage(status) {
  return "Bowling Game is " + status + ".";
}

function usageMessage(){
  return "<ul>  <li>Start a new game: '/start'</li> <li>Record pins: '/bowl/:pins'</li> <li>Get current score: '/score'</li> </ul>";
  // return "<ul> \
  //   <li>Start a new game: '/start'</li> \
  //   <li>Record pins: '/bowl/:pins'</li> \
  //   <li>Get current score: '/score'</li> \
  // </ul>";
}

var results = [];
var attempt = 0;
app.get('/start', function (req, res) {
  results = [];
  for(var i = 0; i < 21; i++) {
  	results[i] = 0;
  }
  attempt = 0;
  // res.send('Started.');
});

app.post('/bowl/:pins', function (req, res) {
  var pins = parseInt(req.params.pins);
  results[attempt] = pins;
  attempt++;
  // res.send('Recorded ' + pins);
});

app.get('/score', function (req, res) {
  var total = 0;
  var ball = 0;
  for(var frame=0; frame<10; frame++) {
    // console.log("Ball:", results[ball]);
    // console.log("Ball+1:", results[ball+1]);
  	total += results[ball] + results[ball+1];
  	if (results[ball] == 10) {
  		total += results[ball+2];
  		ball++;
  	} else {
	  	if (results[ball] + results[ball+1] == 10) {
	  		total += results[ball+2];
	  	}
	  	ball += 2;
	  }
    // console.log("Frame:", frame + 1, "Score:", total);
  }
  var result = { score: total, balls: attempt };
  res.json(result);
});

app.listen(process.env.PORT || 3000);
