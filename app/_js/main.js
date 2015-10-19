var SPREADSHEET_URL = 'https://spreadsheets.google.com/feeds/list/1rTzEY0sEEHvHjZebIogoKO1qfTez2T6xNj0AScO6t24/default/public/values?alt=json';

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

};


// Org coin toss
if (!util.getParameterByName('org')) {
    var coinToss = Math.random();

    if (coinToss > .5)
        window.org = 'fftf';
    else
        window.org = 'rt4';

    console.log('coin toss: ', window.org);
}
var org = util.getParameterByName('org') || window.org;

if (org == 'rt4')
    window.DONATE_URL = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=245ZSF2CHHYXN';
else
    window.DONATE_URL = 'https://donate.fightforthefuture.org/?tag=decidethefuture';


var onDomContentLoaded = function() {

    if (politicians.models().length == 0) {
        var spinner = util.generateSpinner();
        document.getElementById('scoreboard_data').appendChild(spinner);
    }


    // JL HACK ~ ---------------------------------------------------------------
    if (util.getParameterByName('scorecard') == 'dev')
        if (document.getElementById('scoreboard_corporate'))
            document.getElementById('scoreboard_corporate').style.display = 'block';
    // -------------------------------------------------------------------------

    (function (doc, win) {
        "use strict";

        var
            viewMoreLinks = doc.getElementsByClassName('expand-me'),
            links = viewMoreLinks.length;

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
    })(document, window);
};

// Wait for DOM content to load.
if (document.readyState == "complete" || document.readyState == "loaded" || document.readyState == "interactive") {
    onDomContentLoaded();
} else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
}
