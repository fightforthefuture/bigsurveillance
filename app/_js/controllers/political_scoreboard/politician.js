var PoliticianController = Composer.Controller.extend({

    events: {
        'click button.tweet_link': 'tweet',
        'click button.info_link': 'info',
        'click h4': 'tweet',
        'click .headshot': 'tweet',
        'click .inline_tweet': 'tweet',
        'click .peekaboo': 'click'
    },

    elements: {
        '.peekaboo': 'hidden'
    },

    model: null,
    noGrade: false,
    extraInfo: false,
    masterCollection: null,

    init: function () {
        this.render();
    },

    render: function () {

        if (this.masterCollection && this.masterCollection.state)
            var state = this.masterCollection.state;
        else
            var state = null;

        var div = PoliticianView({
            state: state,
            politician: this.model.toJSON(),
            noGrade: this.noGrade,
            extraInfo: this.extraInfo
        });

        this.html(div);

        if (state == 'all' || state == 'senate' || state == 'house')
            this.el.className = 'block';
        else
            this.el.className = 'politician';
    },

    tweet: function (e) {
        e.preventDefault();

        var name = this.model.get('twitter');
        if (name) {
            // name = '@' + name;
            name = '.@' + name;
        } else {
            if (this.model.get('organization') == 'House')
                name = 'Rep. ' + this.model.get('last_name');
            else
                name = 'Sen. ' + this.model.get('last_name');
        }
        if (this.model.get('grade').charAt(0) == 'A' || this.model.get('grade').charAt(0) == 'F')
            var article = 'an';
        else
            var article = 'a';

        var url = window.location.protocol + '//' + window.location.host + '?politician='+ this.model.get('bioguide');

        // var txt = encodeURIComponent('Here\'s why '+name+' got '+article+' '+this.model.get('grade')+' on surveillance: '+url+' #StopCISA');
        var txt = encodeURIComponent(name+' please vote no on McCain Amendment 4787! Don\'t give the FBI warrantless access to our private data. '+url);
        window.open('https://twitter.com/intent/tweet?text=' + txt);
    },

    info: function (e) {
        if (e)
            e.preventDefault();

        new PoliticianModalController({model: this.model});
    },

    click: function(e) {
        if (e)
            e.preventDefault();

        if (e.target && this.hidden && e.target == this.hidden)
            this.info();
    }
});
