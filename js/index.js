var student_model_type = Backbone.Model.extend({
    paint: function() {
        var source = $("#students_entry_template").html();
        var template = Handlebars.compile(source);
        var html = template(this.attributes);
        $("#students").append(html);
    }
});

var students_collection_type = Backbone.Collection.extend({
    model: student_model_type,
    paint: function(){
        this.each(function(student) {
            student.paint();
        });
    }
});

var student_view_type = Backbone.View.extend({
    tagName: "div",
    className: "student",
    render: function() {
        $.getJSON("/js/students_JSON.json", function(data){
            _.map(data, function(student){ 
                var student = new student_model_type(student);
                students.push(student);
            });
        students.paint();
        });
    }
});

var students = new students_collection_type;

var students_view = new student_view_type;

students_view.render();
