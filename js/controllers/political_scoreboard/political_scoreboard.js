var PoliticalScoreboardController = Composer.Controller.extend({
    elements: {
        '.good .filtered': 'good_list',
        '.bad .filtered': 'bad_list',
        '.meh .filtered': 'meh_list',
        '.panel.meh': 'meh_panel',
        'select': 'select'
    },

    events: {
        'change select': 'filter'
    },

    collection: null,
    good: null,
    bad: null,
    meh: null,

    init: function() {
        this.render();

        this.good = new Composer.FilterCollection(this.collection, {
            filter: function(model) {
                return model.get('score') >= 6;
            }
        });
        this.init_list(this.good, this.good_list);

        this.bad = new Composer.FilterCollection(this.collection, {
            filter: function(model) {
                return model.get('score') < 0;
            }
        });
        this.init_list(this.bad, this.bad_list);

        this.meh = new Composer.FilterCollection(this.collection, {
            filter: function(model) {
                return model.get('score') >= 0 && model.get('score') <= 5;
            }
        });
        this.init_list(this.meh, this.meh_list);
    },

    init_list: function(filterCollection, inject) {
        new Composer.ListController({
            collection: filterCollection,
            inject: inject,
            init: function() {
                this.track(this.collection, function(model, options) {
                    return new PoliticianController({
                        inject: this.el,
                        model: model
                    });
                }.bind(this), {bind_reset: true})
            }
        });
    },

    render: function() {
        var div = PoliticalScoreboardView({state: this.collection.state});
        this.html(div);
    },

    filter: function() {
        var state = this.select.options[this.select.selectedIndex].value;

        this.collection.state = state;
        this.collection.refresh();

        if (this.meh.models().length == 0)
            this.meh_panel.style.display = 'none';
        else
            this.meh_panel.style.display = 'inline-block';
    }
});