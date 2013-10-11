var student_model = Backbone.Model.extend({

  paint: function() {

    var source = $("#students_entry_template").html();
    var template = Handlebars.compile(source);
    var html = template(this.attributes);
    $('#students').append(html);

  }

});

var students_collection = Backbone.Collection.extend({

  model: student_model,
  paint: function(){

    this.each(function(student) {

      student.paint();

    });

  }

});

var students = new students_collection;

$.getJSON('/js/students_JSON.json', function(data){

    for (var i = 0; i < data.length; i++) {

      var student = new student_model(data[i]);
      students.push(student);

    }
    students.paint();
    
});
