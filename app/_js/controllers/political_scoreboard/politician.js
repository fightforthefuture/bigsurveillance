var PoliticianController = Composer.Controller.extend({

    events: {
        'click button.tweet_link': 'tweet',
        'click button.info_link': 'info',
        'click h4': 'tweet',
        'click .headshot': 'tweet'
    },

    model: null,
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
            politician: this.model.toJSON()
        });

        this.html(div);

        if (state == 'all' || state == 'senate' || state == 'house')
            this.el.className = 'block';
        else
            this.el.className = 'politician';
    },

    tweet: function (e) {
        e.preventDefault();
        var txt = encodeURIComponent('.@' + this.model.get('twitter') + ', lol');
        window.open('https://twitter.com/intent/tweet?text=' + txt);
    },

    info: function (e) {
        e.preventDefault();

        new PoliticianModalController({model: this.model});
    }
});
