if (!util) var util = {};

util.generateSpinner = function() {
    var spinContainer = $c('div');
    spinContainer.className = 'spinnerContainer';

    var spinner = $c('div');
    spinner.className = 'spinner';
    spinContainer.appendChild(spinner);

    for (var i = 1; i <= 12; i++) {
        var blade = $c('div');
        blade.className = 'blade d' + (i < 10 ? '0'+i : i);

        var subdiv = $c('div');
        blade.appendChild(subdiv);

        spinner.appendChild(blade);
    }
    return spinContainer;
};

util.getReferrerTag = function() {
    var ref = document.referrer;
    if (ref.indexOf('facebook.com') !== -1)
        return 'from-facebook';
    else if (ref.indexOf('twitter.com') !== -1 || ref.indexOf('t.co') !== -1)
        return 'from-twitter';
    else if (ref.indexOf('reddit.com') !== -1)
        return 'from-reddit';
    else if (window.location.href.indexOf('_src=ga') !== -1)
        return 'from-google-adwords';
    else if (ref.indexOf('google.com') !== -1)
        return 'from-google';
}

util.parseQueryString = function () {
    var
        i,
        pairs,
        queryObject = {},
        queryString = window.location.search;

    if (queryString[0] === '?') {
        queryString = queryString.substr(1);
    }

    pairs = queryString.split('&');
    i = pairs.length;

    while (i--) {
        queryObject[pairs[i].split('=')[0]] = pairs[i].split('=')[1];
    }

    return queryObject;
}
