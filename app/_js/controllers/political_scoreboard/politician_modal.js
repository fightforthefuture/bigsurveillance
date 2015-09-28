var PoliticianModalController = BaseShareModalController.extend({

    init: function() {
        this.render();
        this.show();
        console.log(this.model.toJSON());
    },

    render: function() {
        var overlay = this.base_render();

        overlay.firstChild.appendChild(PoliticianModalView({
            positions: this.model.get('score_criteria'),
            name: this.model.get('first_name') +" "+ this.model.get('last_name')

        }));

        this.html(overlay);
    }
});
