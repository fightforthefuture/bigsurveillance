var PoliticianView = function(data) {
    var
        div = $c('div'),
        headshot = $c('div'),
        img = $c('i'),            // JL NOTE ~ chrome bug fix, remove after issue is gone
        tweetLink = $c('button'),
        infoLink = $c('button'),
        name = $c('h4'),
        grade = $c('h3'),
        rollover = $c('div');

    // JL NOTE ~ removed headshot background due to chrome bug. maybe re-add someday?
    /* headshot.style.backgroundImage = 'url(congress/' + data.politician.image + ')'; */
    headshot.classList.add('headshot');

    if (data.politician.score >= 6) {
        div.classList.add('good');
    } else if (data.politician.score >= 0) {
        div.classList.add('neutral');
    } else {
        div.classList.add('bad');
    }

    // JL NOTE ~ added this to fix chrome bug, bah -----------------------------
    img.classList.add('congressional-head', data.politician.image.replace('.jpg', ''));
    headshot.appendChild(img);
    // -------------------------------------------------------------------------

    div.appendChild(headshot);

    name.textContent = data.politician.last_name;
    div.appendChild(name);

    if (!data.noGrade) {
        grade.classList.add('grade');
        grade.textContent = data.politician.grade;
        div.appendChild(grade);
    }

    rollover.classList.add('rollover');

    tweetLink.classList.add('tweet_link');
    rollover.appendChild(tweetLink);

    infoLink.classList.add('info_link');
    infoLink.textContent = 'i';
    rollover.appendChild(infoLink);

    div.appendChild(rollover);

    if (data.extraInfo) {
        var ul = $c('ul');
        ul.classList.add('extra_info');
        console.log('owl');

        if (data.politician.twitter) {
            var li = $c('li'),
                a = $c('a');
            a.classList.add('inline_tweet');
            a.href = '#';
            a.textContent = '@' + data.politician.twitter;
            li.appendChild(a)
            ul.appendChild(li);
        }
        if (data.politician.phone) {
            var li = $c('li'),
                a = $c('a');
            a.href = 'tel://'+data.politician.phone;
            a.textContent = data.politician.phone;
            li.appendChild(a)
            ul.appendChild(li);
        }
        div.appendChild(ul);
    }

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
