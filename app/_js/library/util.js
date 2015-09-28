if (!util) var util = {};

util.generateSpinner = function() {
    var spinContainer = $c('div');
    spinContainer.className = 'spinnerContainer';

    var spinner = $c('div');
    spinner.className = 'spinner';
    spinContainer.appendChild(spinner);

    for (var i = 1; i <= 12; i++) {
        var blade = $c('div');
        blade.className = 'blade d' + (i < 10 ? '0'+i : i);

        var subdiv = $c('div');
        blade.appendChild(subdiv);

        spinner.appendChild(blade);
    }
    return spinContainer;
};
