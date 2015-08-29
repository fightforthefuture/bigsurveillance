var PoliticianModalView = function(data) {
    var div = $c('div');
    div.className = 'modal politician_modal';

    var a = $c('a');
    a.className = 'close';
    a.textContent = '×';
    a.href = '#';
    div.appendChild(a);

    var p = $c('p');
    p.textContent = data.positions;
    div.appendChild(p);

    return div;
};
