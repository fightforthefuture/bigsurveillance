var PoliticianView = function(data) {
    var
        div = $c('div'),
        headshot = $c('div'),
        tweetLink = $c('button'),
        twitterLogo = $c('img'),
        tweetText = $c('span'),
        infoLink = $c('button'),
        name = $c('h4'),
        grade = $c('h3'),
        rollover = $c('div');

    headshot.style.backgroundImage = 'url(congress/' + data.politician.image + ')';
    headshot.classList.add('headshot');

    if (data.politician.score >= 6) {
        headshot.classList.add('good');
    } else if (data.politician.score >= 0) {
        headshot.classList.add('neutral');
    } else {
        headshot.classList.add('bad');
    }

    div.appendChild(headshot);

    name.textContent = data.politician.last_name;
    div.appendChild(name);

    grade.textContent = data.politician.grade;
    div.appendChild(grade);

    rollover.classList.add('rollover');

    if (data.politician.twitter) {
        tweetLink.classList.add('tweet_link');
        twitterLogo.src = 'images/tw_white.png';
        tweetLink.appendChild(twitterLogo);
        tweetText.textContent = 'Tweet';
        tweetLink.appendChild(tweetText);
        rollover.appendChild(tweetLink);
    }
    infoLink.classList.add('info_link');
    infoLink.textContent = 'Grade Info';
    rollover.appendChild(infoLink);

    div.appendChild(rollover);

    return div;
};
