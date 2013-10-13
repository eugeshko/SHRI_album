var student_model_type = Backbone.Model.extend({});

var students_collection_type = Backbone.Collection.extend({
    model: student_model_type
});

var students = new students_collection_type();

var lection_model_type = Backbone.Model.extend({});

var lections_collection_type = Backbone.Collection.extend({
    model: lection_model_type
});

var lections = new lections_collection_type();

var school_model_type = Backbone.Model.extend({});

var school = new school_model_type();

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
        $(".slides").hide();
        $(".student > .about_student").hide();
        $("#" + id + ".student").prependTo($("#students"));
        $("#" + id + " > .about_student").show(500);
        $('html, body').animate({
            scrollTop: $("#students").offset().top
        }, 100);
    }
});

var lection_view_type = Backbone.View.extend({
    tagName: "div",
    className: "lection",

    render: function() {
        var source = $("#lections_entry_template").html();
        var template = Handlebars.compile(source);
        if (this.model !== undefined){
            this.model.each(function(lection) {
                var html = template(lection.attributes);
                $("#lections").append(html);    
            });
        };
        return this;
    },

    initialize: function() {
        this.listenTo(lections, "change", this.render);
    },

    open_about: function(id) {
        $(".student > .about_student").hide();
        $(".slides").hide();
        $(".lection > .slides").hide(100);
        $("#" + id + ".lection").prependTo($("#lections"));
        $("#" + id + " > .sources > .slides").show(500);
        $('html, body').animate({
            scrollTop: $("#lections").offset().top
        }, 100);
    }
});

var school_view_type = Backbone.View.extend({
    tagName: "div",
    className: "school",

    render: function() {
        var source = $("#school_entry_template").html();
        var template = Handlebars.compile(source);
        var html = template(school.attributes);
        $("#school").append(html);    
        return this;
    },

    initialize: function() {
        this.listenTo(school, "change", this.render);
    }
});

var students_view = new student_view_type({model: students});
var lections_view = new lection_view_type({model: lections});
var school_view = new school_view_type({model: school});

$.ajax({
    type: 'GET',
    url: '/js/students_JSON.json',
    dataType: 'json',
    success: function(data) {
        _.map(data, function(student_data){ 
            var student = new student_model_type(student_data);
            students.push(student);
            });
        students_view.render();
        },
    data: {},
    async: false
});

$.ajax({
    type: 'GET',
    url: '/js/lections_JSON.json',
    dataType: 'json',
    success: function(data) {
        _.map(data, function(lection_data){ 
            var lection = new student_model_type(lection_data);
            lections.push(lection);
            });
        lections_view.render();
        },
    data: {},
    async: false
});

$.ajax({
    type: 'GET',
    url: '/js/school_JSON.json',
    dataType: 'json',
    success: function(data) {
        school = new student_model_type(data);
        school_view.render();
        },
    data: {},
    async: false
});

var students_workspace = Backbone.Router.extend({
    routes: {
        "!/students/:id": "open_about_student",
        "!/lections/:id": "open_about_lection"
    },

    open_about_student: function(id) {
        students_view.open_about(id);
    },

    open_about_lection: function(id) {
        lections_view.open_about(id);
    }
});

var controller = new students_workspace();

Backbone.history.start();
