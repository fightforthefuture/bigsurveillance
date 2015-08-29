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

    var span = $c('span');
    span.textContent = 'Sort by:';
    div.appendChild(span);

    var a = $c('a');
    a.className = 'sort name sel';
    a.href = '#';
    a.textContent = 'Name';
    div.appendChild(a);

    var span = $c('span');
    span.textContent = '|';
    div.appendChild(span);

    var a = $c('a');
    a.className = 'sort grade';
    a.href = '#';
    a.textContent = 'Grade';
    div.appendChild(a);

    var politicians = $c('div');
    politicians.className = 'politicians';
    div.appendChild(politicians);

    return div;
};