var PoliticianController = Composer.Controller.extend({

    events: {
        'click button.tweet_link': 'tweet',
        'click button.info_link': 'info',
        'click h4': 'tweet',
        'click .headshot': 'tweet'
    },

    model: null,

    init: function () {
        this.render();
    },

    render: function () {

        var div = PoliticianView({
            politician: this.model.toJSON()
        });

        this.html(div);
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
