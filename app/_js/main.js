var TWEET_BLASTER_URL = 'https://tweet-congress.herokuapp.com';
//var TWEET_BLASTER_URL = 'http://metacube:9000';
var SPREADSHEET_URL = 'https://spreadsheets.google.com/feeds/list/1rTzEY0sEEHvHjZebIogoKO1qfTez2T6xNj0AScO6t24/default/public/values?alt=json';

var DEFAULT_TWEETS = [
    "Let S. 702 of F.A.A. lapse 12/2017 - NSA & FBI killing our privacy.",
]

var STATES = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming',
};

var politicians = new Politicians();
var unfilteredPoliticians = new Politicians();
var geocode = null;

// get the spreadsheet from google
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        var res = JSON.parse(xhr.response);
        for (var i = 0; i < res.feed.entry.length; i++) {
            var entry = res.feed.entry[i];
            var politician = new Politician();
            politician.populateFromGoogle(entry);
            politicians.add(politician);
            unfilteredPoliticians.add(politician);
        }

        // convert to a filter collection (which allows us to filter on state)
        politicians = new PoliticiansFilter(politicians);

        checkIfFinishedWithXHRs();
    }
};
xhr.open("get", SPREADSHEET_URL, true);
xhr.send();

// grab the user's location
var xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4) {
        var res = JSON.parse(xhr2.response);

        geocode = res;
        checkIfFinishedWithXHRs();
    }
};
xhr2.open("get", 'https://fftf-geocoder.herokuapp.com', true);
xhr2.send();



// only initialize scoreboard if the spreadsheet & location have loaded via XHR
var checkIfFinishedWithXHRs = function () {
    if (politicians.models().length && geocode)
        initializeScoreboard();
};

var renderTopStateSelector = function() {
    if (!document.getElementById('placeholder_state_name'))
      return;
    document.getElementById('placeholder_state_name').style.display = 'none';
    var select = $c('select');
    for (var state in STATES) {
        if (STATES.hasOwnProperty(state)) {
            var option = $c('option');
            option.textContent = STATES[state];
            option.value = state;
            if (politicians.state == state)
                option.selected = true;
            select.appendChild(option)
        }
    }
    select.onchange = function() {
        var state = this.options[this.options.selectedIndex].value;
        var sbState = document.getElementById('_ps_choose_state');
        for (var i = 0; i < sbState.options.length; i++) {
            if (sbState.options[i].value == state)
                sbState.options[i].selected = true;
        }
        var event = new UIEvent("change", {
            "view": window,
            "bubbles": true,
            "cancelable": true
        });
        sbState.dispatchEvent(event);
        setTimeout(function() {
            loadTopPoliticiansByState();
        }, 10);
    }
    select.onclick = function() {
        document.getElementById('just_state').checked = true;
        handleTweetSelectorLabels();
    }
    document.getElementById('state_selector').appendChild(select);
}

var topPoliticians = [null, null];
var hasTweeted = false;

var generateTweetTextFromTopPoliticians = function() {
    var tweet = '';

    if (topPoliticians[0].model.get('twitter'))
        tweet += '.@'+topPoliticians[0].model.get('twitter')+', ';
    else
        tweet += 'Sen. '+topPoliticians[0].model.get('last_name')+', ';

    if (topPoliticians[1].model.get('twitter'))
        tweet += '@'+topPoliticians[1].model.get('twitter')+' ';
    else
        tweet += 'Sen. '+topPoliticians[1].model.get('last_name')+' ';

    tweet += document.getElementById('tweet_text').value;

    // tweet += ' http://decidethefuture.org';

    console.log('tweet:', tweet);
    return tweet;
}

var loadTopPoliticiansByState = function() {
    var senators = politicians.select({organization: 'Senate'});
    for (var i=0; i < senators.length; i++) {
        if (topPoliticians[i])
            topPoliticians[i].release();

        topPoliticians[i] = new PoliticianController({
            model: senators[i],
            noGrade: true,
            extraInfo: true,
            inject: '#targets .side'+i
        });
    }
}

var handleTweetSelectorLabels = function() {
    if (!document.getElementById('EVERYONE'))
      return;

    if (document.getElementById('EVERYONE').checked) {
        document.getElementById('EVERYONE_label').className = 'sel';
        document.getElementById('just_state_label').className = '';
        document.getElementById('tweet_blaster_frame').style.display = 'block';
        document.getElementById('tweet_your_state').style.display = 'none';
    } else {
        document.getElementById('EVERYONE_label').className = '';
        document.getElementById('just_state_label').className = 'sel';
        document.getElementById('tweet_blaster_frame').style.display = 'none';
        document.getElementById('tweet_your_state').style.display = 'block';
    }
}

var handleRemainingTweetText = function() {
    if (!document.getElementById('tweet_text'))
      return;
    var remaining = 105 - document.getElementById('tweet_text').value.length;
    document.getElementById('remaining').textContent = remaining;
    if (remaining <= 10)
        document.getElementById('remaining').className = 'danger';
    else
        document.getElementById('remaining').className = '';
}

var initializeScoreboard = function () {

    // select the state if the geocoder didn't give us something bogus
    if (
        geocode.subdivisions
        &&
        geocode.subdivisions.length
        &&
        geocode.subdivisions[0].iso_code
        &&
        STATES.hasOwnProperty(geocode.subdivisions[0].iso_code)
    )
        politicians.state = geocode.subdivisions[0].iso_code;

    politicians.refresh();
    renderTopStateSelector();
    loadTopPoliticiansByState();

    if (util.getParameterByName('autotweet')) {
        var tweetText = generateTweetTextFromTopPoliticians();
        window.location.replace('https://twitter.com/intent/tweet?text='+encodeURIComponent(tweetText));
    }


    var spinner = document.querySelector('#scoreboard_data .spinnerContainer');

    if (spinner)
        spinner.remove();

    new PoliticalScoreboardController({
        collection: politicians,
        inject: '#scoreboard_data'
    });

    var bioguide = util.getParameterByName('politician');
    if (bioguide) {
        var model = unfilteredPoliticians.select_one({bioguide: bioguide});
        if (model)
            new PoliticianModalController({model: model});
        window.location.replace('#scoreboard');
    }
    var searchInput = document.getElementById("nameSearch");
    searchInput.addEventListener("keyup",filterByPartialName)



};



var filterByPartialName = function(){

    var name = document.getElementById("nameSearch").value;

    var names = name.toLowerCase().split(" ")

    var distanceThreshold = 3;

    function levenshteinDistance (str1, str2) {
        if (typeof(str1) !== 'string' || typeof(str2) !== 'string') throw new Error('Pass two strings!')

        var distances = []

        for (var i = 0; i <= str1.length; ++i) distances[i]    = [ i ]
        for (var i = 0; i <= str2.length; ++i) distances[0][i] =   i

        for (var j = 1; j <= str2.length; ++j)
            for (var i = 1; i <= str1.length; ++i)

            distances[i][j] =

                str1[i - 1] === str2[j - 1] ? // if the characters are equal
                distances[i - 1][j - 1] :     // no operation needed
                                            // else
                Math.min.apply(Math, [        // take the minimum between
                distances[i - 1][  j  ] + 1 // a  deletion
                , distances[  i  ][j - 1] + 1 // an insertion
                , distances[i - 1][j - 1] + 1 // a  substitution
            ])

        return distances[str1.length][str2.length]
    }
    var results =[]

    for (var i =0;i < names.length;i++){
        var n = names[i];
        if (n.length < 3){
            continue;
        }

        var filtered = unfilteredPoliticians.filter(function(m){
        var fname = m.get("first_name").toLowerCase();
        if (levenshteinDistance(n,fname) < distanceThreshold){
            return true;
        }
        if (fname.match(n)){
            return true;
        }
        var lname = m.get("last_name").toLowerCase();
        if (levenshteinDistance(n,lname) < distanceThreshold){
            return true;
        }
        if(lname.match(n)){
            return true;
        }
        return false;
    })
        results = results.concat(filtered);

    }
    console.log(results);

    var results_elem = document.getElementById('nameResults');
    while (results_elem.firstChild) {
        results_elem.removeChild(results_elem.firstChild);
    }
    var frag = document.createDocumentFragment()
    for(var i =0; i < results.length;i++){
        var div = document.createElement("div");
        var button = document.createElement("button");
        var text = document.createTextNode(results[i].get("first_name") + " " +results[i].get("last_name") + ": " + results[i].get("grade"));
        var score = results[i].get("score");


        if (score >= 6) {
            div.classList.add('good');
        } else if (score >= 0) {
            div.classList.add('neutral');
        } else {
            div.classList.add('bad');
        }
        button.appendChild(text);

        var cb = (function(model){
            return function (){new PoliticianModalController({model: model });}
        })(results[i]);

        button.addEventListener("click", cb);

        var br = document.createElement("br");
        div.appendChild(button)
        frag.appendChild(div);
        frag.appendChild(br);
        frag.appendChild(br);
    }
    results_elem.appendChild(frag);
}


var alreadyBlasted = false;

window.onhashchange = function () {
    if (window.location.hash == '#blast' && alreadyBlasted == false) {
        document.getElementById('tweet_blaster_frame').src = TWEET_BLASTER_URL+'/blast?tweet='+encodeURIComponent(document.getElementById('tweet_text').value);
        window.location.hash = '#';
        alreadyBlasted = true;
        popCallModal(true);
    }
}


// Org coin toss
if (!util.getParameterByName('org')) {
    var coinToss = Math.random();

    if (coinToss > .1)
        window.org = 'fftf';
    else
        window.org = 'rt4';
}
var org = util.getParameterByName('org') || window.org;

if (org == 'rt4')
    window.DONATE_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=245ZSF2CHHYXN';
else
    window.DONATE_URL = 'https://donate.fightforthefuture.org/?tag=decidethefuture';

var popCallModal = function(tweeted) {
    new CallModalController({
        headline:   (tweeted ? 'Thanks for tweeting! Now can you call Congress?' : 'Can you call Congress to #StopCISA?'),
        campaign:   'cisa-cloture-fax',
        cta:        'Congress needs to understand that CISA is a dirty mass surveillance bill that won\'t protect us from cyber attacks. Enter your phone number and we\'ll connect you to Congress, or dial 1-985-222-CISA on your phone.',
        callScript: 'Please oppose CISA, the Cybersecurity Information Sharing Act. CISA won\'t fix the cybersecurity problems we face in the U.S.—it will only lead to more warrantless mass surveillance of millions of Americans. We need real cybersecurity legislation, and it\'s not CISA.',
        shareText:  'We\'re up against some of the most powerful corporate lobbyists in the country, but that hasn\'t stopped us before. If a critical mass of citizens speak out against CISA, our voices will be impossible to ignore.',
    });
}

var onDomContentLoaded = function() {

    if (politicians.models().length == 0) {
        var spinner = util.generateSpinner();
        if (document.getElementById('scoreboard_data'))
          document.getElementById('scoreboard_data').appendChild(spinner);
    }

    if (document.querySelector('.action a.tweet'))
      document.querySelector('.action a.tweet').addEventListener('click', function(e){
          e.preventDefault();
          if (!topPoliticians[0])
              return alert('Hold on, still loading your senators :)');

          var tweetText = generateTweetTextFromTopPoliticians();
          var win = window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(tweetText), 'zetsubou_billy', 'width=500, height=300, toolbar=no, status=no, menubar=no');

          var pollTimer = window.setInterval(function() {
              if (win.closed !== false) { // !== is required for compatibility with Opera
                  window.clearInterval(pollTimer);
                  if (hasTweeted == false)
                      popCallModal(true);
                  hasTweeted = true;
              }
          }, 200);
      });


    handleTweetSelectorLabels();
    if (document.getElementById('EVERYONE'))
      document.getElementById('EVERYONE').addEventListener('change', function() {
          handleTweetSelectorLabels();
      });
    if (document.getElementById('just_state'))
      document.getElementById('just_state').addEventListener('change', function() {
          handleTweetSelectorLabels();
      });
    if (document.getElementById('tweet_text')) {
      document.getElementById('tweet_text').addEventListener('change', function() {
          handleRemainingTweetText();
      });
      document.getElementById('tweet_text').addEventListener('keyup', function() {
          handleRemainingTweetText();
      });
    }
    if (document.getElementById('call_congress'))
      document.getElementById('call_congress').addEventListener('click', function(e) {
          e.preventDefault();
          popCallModal();
      });
    if (util.getParameterByName('call')) {
        popCallModal();
    }
    var random_tweet = DEFAULT_TWEETS[Math.floor(Math.random()*DEFAULT_TWEETS.length)];
    if (document.getElementById('tweet_text'))
      document.getElementById('tweet_text').value = random_tweet;

    handleRemainingTweetText();

    if (document.getElementById('dumbcalltool')) {
        document.getElementById('dumbcalltool').addEventListener('submit', function(e) {
            e.preventDefault();

            if (!util.validatePhone(document.getElementById('dumbphonenumber').value)) {
                alert('Please enter a valid phone number!');
                return false;
            }

            var data = new FormData();
            data.append('campaignId', 'smh');
            data.append('org', window.org || 'fftf')
            data.append('userPhone', util.validatePhone(document.getElementById('dumbphonenumber').value));

            var url = 'https://call-congress.fightforthefuture.org/create';

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    console.log('sent!', xhr.response);
                }
            }.bind(this);
            xhr.open("post", url, true);
            xhr.send(data);

            new CallScriptModalController({
                callHeadline: 'Awesome! We\'re calling your phone!',
                callInstruction: 'Please be polite and tell your lawmaker:',
                callScript: 'Please stop the dangerous Rule 41 change and refuse to expand surveillance powers. Vote to pass the Stop Mass Hacking Act.',
            });

            return false;
        });
    }



    (function (doc, win) {
        "use strict";

        var
            viewMoreLinks = doc.getElementsByClassName('expand-me'),
            links = viewMoreLinks.length;

// -------------------------------------------------------------------------
// This is here until the links that make up each company on the Corporate
// scoreboard are ready to turn into tweets.
if (doc.getElementById('scoreboard_corporate')) {

        var
            i, j,
            corporateScoreboard = doc.getElementById('scoreboard_corporate').getElementsByTagName('table'),
            tableLinks;

        i = corporateScoreboard.length;
        while (i--) {

            tableLinks = corporateScoreboard[i].getElementsByTagName('a');
            j = tableLinks.length;

            while (j--) {
                tableLinks[j].addEventListener('click', function (e) {
                    e.preventDefault();
                });
            }
        }
}

// -------------------------------------------------------------------------

        function expandArticle(e) {
            e.preventDefault();

            console.log('derp');

            var
                href = e.target.getAttribute('href').replace(/#/, '');
            doc.getElementById(href).classList.add('expanded');
        }

        while (links--) {
            viewMoreLinks[links].addEventListener('click', expandArticle);
        }

        if (document.getElementById('petition-form'))
          win.components.petitions(doc, win);

        if (document.getElementById('whiplist'))
          win.components.whiplist(doc, win);

    })(document, window);
};

// Wait for DOM content to load.
if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
    onDomContentLoaded();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
}

(function (doc, win) {
  "use strict";

  win.callbacks = win.callbacks || {};
  win.callbacks.petitions = {
    preSubmit: function() {
      document.body.querySelector('[type="submit"]').disabled = true;
    },

    loadSignatureResponse: function(e) {
      var xhr = e.target;
      if (xhr.status >= 200 && xhr.status < 400) {

        // popCallModal();
        var
          form = document.getElementById('petition-form'),
          thanks = document.getElementById('thanks');
        document.getElementById('form-headline').classList.add('hidden');
        thanks.classList.remove('hidden');
        form.removeAttribute('style');
        form.innerHTML = '';
        form.appendChild(thanks);

      } else {
         handleSigningError(xhr);
      }
    },

    handleSigningError: function(e) {
      document.body.querySelector('[type="submit"]').disabled = false;
      console.log('AN ERROR OCCURRED WHILE SENDING YOUR PETITION: ', e);
      alert('AN ERROR OCCURRED WHILE SENDING YOUR PETITION');
    }
  }

})(document, window);
