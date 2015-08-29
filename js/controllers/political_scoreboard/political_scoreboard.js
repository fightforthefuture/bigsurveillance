var PoliticalScoreboardController = Composer.ListController.extend({
    elements: {
        'div.politicians': 'el_list',
        'select': 'select',
        'a.sort.grade': 'grade_link',
        'a.sort.name': 'name_link',
    },

    events: {
        'change select': 'filter',
        'click a.name': 'sort_name',
        'click a.grade': 'sort_grade',
    },

    collection: null,

    init: function() {
        this.render();

        
        this.track(this.collection, function(model, options) {
            return new PoliticianController({
                inject: this.el_list,
                model: model
            });
        }.bind(this), {bind_reset: true})
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

    sort_name: function(e) {
        e.preventDefault();

        this.grade_link.className = this.grade_link.className.replace('sel','');

        if (this.name_link.className.indexOf('sel') == -1)
            this.name_link.className = this.name_link.className + ' sel';

        this.collection.sortfn = function(a, b) {
            if (a.get('last_name') < b.get('last_name'))
                return -1;
            if (a.get('last_name') > b.get('last_name'))
                return 1;
            return 0;
        };
        this.collection.sort();
    },

    sort_grade: function(e) {
        e.preventDefault();

        this.name_link.className = this.name_link.className.replace('sel','');
        
        if (this.grade_link.className.indexOf('sel') == -1)
            this.grade_link.className = this.grade_link.className + ' sel';

        this.collection.sortfn = function(a, b) {
            if (a.get('score') < b.get('score'))
                return -1;
            if (a.get('score') > b.get('score'))
                return 1;
            return 0;
        };
        this.collection.sort();
    },
});