var PoliticianModalView = function(data) {
    var div = $c('div');
    div.className = 'modal politician_modal';

    var a = $c('a');
    a.className = 'close';
    a.textContent = '×';
    a.href = '#';
    div.appendChild(a);
    var title = $c('h2');
    title.textContent = "How They Voted...";
    div.appendChild(title);

    for (var i = 0; i < data.positions.length; i++) {
      var p = $c('p');
      p.textContent = data.positions[i].info
      div.appendChild(p);

    }

    return div;
};
