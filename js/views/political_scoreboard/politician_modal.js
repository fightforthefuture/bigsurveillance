var PoliticianModalView = function (data) {
    var
        modal = $c('div'),
        close = $c('button'),
        title = $c('h2'),
        voteList = $c('ul');

    modal.classList.add('modal', 'politician_modal');
    close.classList.add('close');
    close.textContent = '⨉';
    title.textContent = 'How They Voted…';

    modal.appendChild(close);
    modal.appendChild(title);


    for (var i = 0; i < data.positions.length; i++) {
        var
            position = $c('li');
        position.textContent = data.positions[i].info;
        voteList.appendChild(position);
    }

    modal.appendChild(voteList);

    return modal;
};
