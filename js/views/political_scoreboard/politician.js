var PoliticianView = function(data) {
    var div = $c('div');

    var img = $c('div');
    img.style.backgroundImage ='url(congress/'+data.politician.image+')';
    img.style.backgroundSize = '100% auto';
    img.className = 'img ';

    if (data.politician.score >= 6)
        img.className += 'good';
    else if (data.politician.score >= 0)
        img.className += 'neutral';
    else
        img.className += 'bad';

    div.appendChild(img);

    var h4 = $c('h4');
    h4.textContent = data.politician.last_name;
    div.appendChild(h4);

    var h3 = $c('h3');
    h3.textContent = data.politician.grade;
    div.appendChild(h3);

    var rollover = $c('div');
    rollover.className = 'rollover';

    if (data.politician.twitter) {
        var a = $c('a');
        a.className = 'tweet_link';
        a.href = '#';
        var img = $c('img');
        img.src = '../images/tw_white.png';
        a.appendChild(img);
        var span = $c('span');
        span.textContent = 'Tweet';
        a.appendChild(span);
        rollover.appendChild(a);
    }
    var a = $c('a');
    a.className = 'info_link';
    a.textContent = 'Grade Info';
    a.href = '#';
    rollover.appendChild(a);

    div.appendChild(rollover);

    return div;
};