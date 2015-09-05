var PoliticalScoreboardView = function(data) {
    var div = $c('div');

    var label = $c('label');
    label.textContent = 'Choose state:';
    label.htmlFor = '_ps_choose_state';
    div.appendChild(label);

    var select = $c('select');
    select.id = '_ps_choose_state';

    for (var key in STATES)
        if (STATES.hasOwnProperty(key)) {
            var option = $c('option');
            option.value = key;
            option.textContent = STATES[key];
            if (key == data.state)
                option.selected = true;
            select.appendChild(option);
        }

    div.appendChild(select);

    var politicians = $c('div');
    politicians.className = 'politicians';
    div.appendChild(politicians);

    var good = $c('div');
    good.className = 'good panel';

    var h3 = $c('h3');
    h3.textContent = 'Team Internet';
    good.appendChild(h3);

    var em = $c('em');
    em.textContent = 'These politicians are standing up for the free Internet and oppose mass surveillance.';
    good.appendChild(em);

    var filtered = $c('div');
    filtered.className = 'filtered';
    good.appendChild(filtered);

    div.appendChild(good);

    var bad = $c('div');
    bad.className = 'bad panel';

    var h3 = $c('h3');
    h3.textContent = 'Team Control';
    bad.appendChild(h3);

    var em = $c('em');
    em.textContent = 'These politicians are working to expand the surveillance state and control the Internet.';
    bad.appendChild(em);

    var filtered = $c('div');
    filtered.className = 'filtered';
    bad.appendChild(filtered);

    div.appendChild(bad);

    var meh = $c('div');
    meh.className = 'meh panel';

    var h3 = $c('h3');
    h3.textContent = 'Unclear';
    meh.appendChild(h3);

    var filtered = $c('div');
    filtered.className = 'filtered';
    meh.appendChild(filtered);

    div.appendChild(meh);

    return div;
};