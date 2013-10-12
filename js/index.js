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
    },
    open_about: function(id) {
        $(".student > .about_student").hide(100);
        $("#" + id + ".student").prependTo($("#students"));
        $("#" + id + " > .about_student").show(1000);
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

var students_workspace = Backbone.Router.extend({
    routes: {
        "!/students/:id": "open_about"
    },
    open_about: function(id) {
        students.open_about(id);
    }
});

var students = new students_collection_type;

var students_view = new student_view_type;

var controller = new students_workspace();

Backbone.history.start();
students_view.render();

