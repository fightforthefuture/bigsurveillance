var PoliticalScoreboardController = Composer.Controller.extend({
    elements: {
        '.internet .filtered': 'good_list',
        '.surveillance .filtered': 'bad_list',
        '.unknown .filtered': 'meh_list',
        '.team.unknown': 'meh_panel',
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
                return model.get('score') >= 6 && model.get('active') !== 'No';
            }
        });
        this.init_list(this.good, this.good_list);

        this.bad = new Composer.FilterCollection(this.collection, {
            filter: function(model) {
                return model.get('score') < 0 && model.get('active') !== 'No';
            }
        });
        this.init_list(this.bad, this.bad_list);

        this.meh = new Composer.FilterCollection(this.collection, {
            filter: function(model) {
                return model.get('score') >= 0 && model.get('score') <= 5 && model.get('active') !==     'No';
            }
        });
        this.init_list(this.meh, this.meh_list);

        // hide the "unclear" section if no politicians in it
        this.with_bind(this.meh, 'reset', this.maybeHideMehPanel.bind(this));

        this.maybeHideMehPanel();
    },

    init_list: function(filterCollection, inject) {

        var masterCollection = this.collection;

        new Composer.ListController({
            collection: filterCollection,
            inject: inject,
            init: function() {
                this.track(this.collection, function(model, options) {
                    return new PoliticianController({
                        inject: this.el,
                        model: model,
                        masterCollection: masterCollection
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
    },

    maybeHideMehPanel: function() {
        if (this.meh.models().length == 0) {
            this.meh_panel.classList.add('hidden');
        } else {
            this.meh_panel.classList.remove('hidden');
        }
    }
});
