var PoliticianModalView = function (data) {
    var
        modal = $c('div'),
        close = $c('button'),
        title = $c('h2'),
        voteList = $c('ul');

    modal.classList.add('modal', 'politician_modal');
    close.classList.add('close');
    close.textContent = '⨉';
    title.textContent = 'How '+data.name+' Voted…';

    modal.appendChild(close);
    modal.appendChild(title);


    for (var i = 0; i < data.positions.length; i++) {
      if (data.positions[i].url === undefined){
        var position = $c('li');
        position.textContent = data.positions[i].info;
        voteList.appendChild(position);
      }
      else {
        var position_link = $c('a');
        position_link.href = data.positions[i].url;
        position_link.target = "_blank";
        position_link.textContent = data.positions[i].info;
        var position = $c('li');
        position.appendChild(position_link);
        voteList.appendChild(position);

      }
    }

    modal.appendChild(voteList);

    return modal;
};
