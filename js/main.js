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
        }

        // convert to a filter collection (which allows us to filter on state)
        politicians = new PoliticiansStateFilter(politicians);

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

    document.getElementById('scoreboard_data').getElementsByClassName('spinner')[0].remove();

    new PoliticalScoreboardController({
        collection: politicians,
        inject: '#scoreboard_data'
    });
};
