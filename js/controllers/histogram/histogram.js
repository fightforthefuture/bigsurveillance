var HistogramController = Composer.Controller.extend({
  collection: null,
  inject: null,

  init: function() {
      this.render();
      // this.show();
      // console.log(this.model.toJSON());
  },

  render: function() {

    new HistogramView(this.collection,this.inject);

  }


});
