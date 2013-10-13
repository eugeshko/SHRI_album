var student_model_type = Backbone.Model.extend({});

var students_collection_type = Backbone.Collection.extend({
    model: student_model_type,
});

var students = new students_collection_type();

var student_view_type = Backbone.View.extend({
    tagName: "div",
    className: "student",
    render: function() {
        var source = $("#students_entry_template").html();
        var template = Handlebars.compile(source);
        if (this.model !== undefined){
            this.model.each(function(student) {
                var html = template(student.attributes);
                $("#students").append(html);    
            });
        };
        return this;
    },
    initialize: function() {
        this.listenTo(students, "change", this.render);
    },
    open_about: function(id) {
        $(".student > .about_student").hide(100);
        $("#" + id + ".student").prependTo($("#students"));
        $("#" + id + " > .about_student").show(1000);
        $('html, body').animate({
        scrollTop: $("#students").offset().top
        }, 1000);
    }
});

var students_view = new student_view_type({model: students});

$.getJSON("/js/students_JSON.json", function(data){
    _.map(data, function(student_data){ 
        var student = new student_model_type(student_data);
        students.push(student);
    });
    students_view.render();
});


var students_workspace = Backbone.Router.extend({
    routes: {
        "!/students/:id": "open_about"
    },
    open_about: function(id) {
        students_view.open_about(id);
    }
});

var controller = new students_workspace();

Backbone.history.start();
