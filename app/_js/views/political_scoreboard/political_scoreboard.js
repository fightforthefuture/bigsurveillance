var PoliticalScoreboardView = function (data) {
    var
        container = $c('div'),
        politicians = $c('div'),
        good = $c('div'),
        bad = $c('div'),
        meh = $c('div'),
        goodPoliticians = $c('div'),
        badPoliticians = $c('div'),
        mehPoliticians = $c('div'),
        label = $c('label'),
        select = $c('select'),
        chamberOptGroup = $c('optgroup'),
        stateOptGroup = $c('optgroup'),
        allCongress = $c('option'),
        senate = $c('option'),
        house = $c('option'),
        goodHeadline = $c('h3'),
        badHeadline = $c('h3'),
        mehHeadline = $c('h3'),
        goodSubHead = $c('em'),
        badSubHead = $c('em');

    label.textContent = 'Choose view:';
    label.htmlFor = '_ps_choose_state';
    container.appendChild(label);

    select.id = '_ps_choose_state';

    chamberOptGroup.label = 'View by Chamber';

    allCongress.value = 'all';
    allCongress.textContent = 'All Congress';
    chamberOptGroup.appendChild(allCongress);

    senate.value = 'senate';
    senate.textContent = 'Senate';
    chamberOptGroup.appendChild(senate);

    house.value = 'house';
    house.textContent = 'House';
    chamberOptGroup.appendChild(house);

    select.appendChild(chamberOptGroup);

    stateOptGroup.label = 'View by state';

    for (var key in STATES)
        if (STATES.hasOwnProperty(key)) {
            var state = $c('option');
            state.value = key;
            state.textContent = STATES[key];
            if (key === data.state)
                state.selected = true;
            stateOptGroup.appendChild(state);
        }
    select.appendChild(stateOptGroup);

    container.appendChild(select);

    politicians.className = 'politicians';
    container.appendChild(politicians);

    good.className = 'team internet';

    goodHeadline.textContent = 'Team Internet';
    good.appendChild(goodHeadline);

    goodSubHead.textContent = 'These politicians are standing up for the free Internet and oppose mass surveillance.';
    good.appendChild(goodSubHead);

    goodPoliticians.className = 'filtered';
    good.appendChild(goodPoliticians);

    politicians.appendChild(good);

    bad.className = 'team surveillance';

    badHeadline.textContent = 'Team Surveillance';
    bad.appendChild(badHeadline);

    badSubHead.textContent = 'These politicians are working with monopolies to control the Internet for power and profit.';
    bad.appendChild(badSubHead);

    badPoliticians.className = 'filtered';
    bad.appendChild(badPoliticians);

    politicians.appendChild(bad);

    meh.className = 'team unknown';

    mehHeadline.textContent = 'Unclear';
    meh.appendChild(mehHeadline);

    mehPoliticians.className = 'filtered';
    meh.appendChild(mehPoliticians);

    container.appendChild(meh);

    return container;
};
