var PoliticianView = function(data) {
    var
        div = $c('div'),
        headshot = $c('div'),
        tweetLink = $c('button'),
        infoLink = $c('button'),
        name = $c('h4'),
        grade = $c('h3'),
        rollover = $c('div');

    headshot.style.backgroundImage = 'url(congress/' + data.politician.image + ')';
    headshot.classList.add('headshot');

    if (data.politician.score >= 6) {
        div.classList.add('good');
    } else if (data.politician.score >= 0) {
        div.classList.add('neutral');
    } else {
        div.classList.add('bad');
    }

    div.appendChild(headshot);

    name.textContent = data.politician.last_name;
    div.appendChild(name);

    grade.textContent = data.politician.grade;
    div.appendChild(grade);

    rollover.classList.add('rollover');

    tweetLink.classList.add('tweet_link');
    rollover.appendChild(tweetLink);

    infoLink.classList.add('info_link');
    infoLink.textContent = 'i';
    rollover.appendChild(infoLink);

    div.appendChild(rollover);

    if (data.state == 'all' || data.state == 'senate' || data.state == 'house'){

        var block = $c('div');
        if (data.politician.state_short)
            block.textContent = data.politician.state_short;
        else
            block.textContent = '?';
        if (data.politician.score >= 6) {
            block.classList.add('good');
        } else if (data.politician.score >= 0) {
            block.classList.add('neutral');
        } else {
            block.classList.add('bad');
        }
        var hidden = $c('div');
        hidden.className = 'peekaboo';
        var politician = $c('div');
        politician.className = 'politician';
        politician.appendChild(div)
        hidden.appendChild(politician);
        block.appendChild(hidden);


        return block;
    } else
        return div;
};
