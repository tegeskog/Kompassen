
$(document).ready(function () {
    var status = true;
    // Setup initial page parameters.
    Page.setup({
        numberOfColumnsPerRow: 3,
        studentsUrl: "http://localhost:45959/api/students/",
        coursesUrl: "http://localhost:45959/api/courses/",
        defaultPlaceholder: $("#defaultPlaceholder"),
        courseDetailsPlaceholder: $("#courseDetailsPlaceholder"),
        studentDetailsPlaceholder: $("#studentDetailsPlaceholder"),
        courseDetailsStudentListPlaceholder: $("#courseDetailsStudentListPlaceholder"),
        studentDetailsCourseListPlaceholder: $("#studentDetailsCourseListPlaceholder"),
        courseDetailsStudentSelectList: $("#courseDetailsStudentSelectList"),
        studentDetailsCourseSelectList: $("#studentDetailsCourseSelectList"),
        courseListPlaceholder: $("#courseListPlaceholder"),
        studentListPlaceholder: $("#studentListPlaceholder")
    });

    // Do some page bootstrapping.
    Page.init();


    // Inaktivate Course

    $("#courseListTable").on("click", function (event) {
        event.preventDefault();
        console.log("$(event.target).data('item-id'): " + $(event.target).data('item-id'));
        console.log("$(event.target).data('item-active'): " + $(event.target).data('item-active'));
        debugger;
        var id = $(event.target).data('item-id');
        var active = $(event.target).data('item-active');
        
        Page.activatCourseDetails(id);

        if (!active) {
            $("#btn-activate").css("background-color", "red");
        }
    });



    //$("#courseListTable").on("click", "#btn-activate", function (event) {

    //    var id = $(event.target).data("itemId");
    //    Page.activatCourseDetails(id);
    //    var test = $(event.target).hasClass("btn-aktive");
        
    //    $(this).css('background-color', '#D7FFFF');
    //    $(this).text('Inaktiverad');

    //    // Hämta kurs
    //    // Kolla om kursen är aktiv
    //    // Om aktiv gör om till inaktiv kurs
    //    // Om inaktiv gör om till aktiv kurs
    //    // Posta kursen igen

    //});



    $("#studentListTable").on("click", "#btn-activate", function () {
        // Hämta student med id...
        // render to page
        var test = $(event.target).hasClass("btn-aktive"),
            id = $(event.target).data("itemId");
            student = $(event.target).hasClass("list-group-item");
            debugger;
            Page.displayStudentDetails(id);


    });

    //Page.displayStudentDetails(id);
    // Display course details for clicked course.
    $("#defaultPlaceholder").on("click", ".list-item", function (event) {
        

        var isUser = $(event.target).hasClass("glyphicon-edit");
        //var isUser = $(event.target).hasClass("list-group-item");
        var isToggleVisability = $(event.target).hasClass("glyphicon-user");
        var isCourse = $(event.target).hasClass("data-course-item");
        var id = $(event.target).data("itemId");
        
        //debugger;
        if (isToggleVisability) {
            debugger;

            //$(this).next(".effect").toggle("slow");
            $(".effect").slideToggle("slow");
        }
        if (isUser) {
            //var id = $(event.target).data("itemId");
            console.log("Userlist");
            console.log("[#defaultPlaceholder.click]: Student id clicked: " + id);
            Page.displayStudentDetails(id);
        } 
        if(isCourse) {
            //var id = $(event.target).data("itemId");
            console.log("[#defaultPlaceholder.click]: Course list clicked: " + id);
           
            Page.displayCourseDetails(id);
        }

        
    });

     //Save the Student details.
    $("#studentDetailsForm").submit(function (event) {
        
        event.preventDefault();
        console.log("[courseDetailsForm.submit]: Submitted course details form.");

        var student = Utilities.formToJson(this);
        student.students = [];
        
        //var student = null;
        $(".registered-student").each(function () {
            student = {
                id: $(this).data("id"),
                firstName: $(this).data("firstName"),
                lastName: $(this).data("lastName"),
                ssn: $(this).data("ssn")
            }
            course.students.push(student);
        });

        Page.saveStudentDetails(student);
        
        
    });

    // Cancel the course details view.
    $("#courseDetailsCancelButton").on("click", function (event) {
        console.log("[#courseDetailsCancelButton.click]: Course details canceled.");

        // De-scelect the top menu button.
        Page.deselectMenu();

        Page.displayDefault();
    });

    // Save the course details.
    $("#courseDetailsForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseDetailsForm.submit]: Submitted course details form.");

        var course = Utilities.formToJson(this);
        course.students = [];
        debugger;
        var student = null;
        $(".registered-student").each(function () {
            student = {
                id: $(this).data("id"),
                firstName: $(this).data("firstName"),
                lastName: $(this).data("lastName")
            }
            course.students.push(student);
        });

        Page.saveCourseAndDisplayDefault(course);
    });

    // Remove a registered student.
    $("#courseDetailsStudentListPlaceholder").on("click", ".remove-registered-student", function (event) {
        var item = $(this).closest(".list-group-item")[0];
 
        // Append to the option list.
        var id = $(item).data("id");
        var firstName = $(item).data("firstName");
        var lastName = $(item).data("lastName");
        var student = { id: id, firstName: firstName, lastName: lastName }
        if(id => 1){
            Page.appendStudentSelectOption(student);

            // Remove from the registered list.
            $(item).remove();
        }
        

    });

    // Register a student.
    $("#registerSelectedStudentButton").on('click', function (event) {
        
       
            Page.registerSelectedStudent();
       
        
    });

    $("#registerSelectedCourseButton").on('click', function (event) {

        Page.registerSelectedCourse();
    });
    // Sets activ to the active bar.
    $('.navbar li, a').click(function (e) {
        $('.navbar li.active').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }

        e.preventDefault();
    });

    $(".navigation").on("click", function () {
        var panel = this.href.substr(this.href.indexOf("#") + 1);

        console.log(panel);

        Page.navigate(panel);
    });

    // Save the new course details from the course list view.
    $("#courseListAddCourseForm").submit(function (event) {
        event.preventDefault();
        console.log("[courseListAddCourseForm.submit]: Submitted the new course form.");
        debugger;
        var course = Utilities.formToJson(this);
        course.students = [];
        $(this)[0].reset();

        Page.saveCourseDetails(course);
    });

    // Save the new student details from the student list view.
    $("#studentListAddCourseForm").submit(function (event) {
        event.preventDefault();
        console.log("[studentListAddCourseForm.submit]: Submitted the new Student form.");
        debugger;
        var student = Utilities.formToJson(this);
        student.students = [];
        $(this)[0].reset();

        Page.saveStudentDetails(student);
    });




    // render a new page after register a new course
    $(document).on("courseSavedCustomEvent", function (event) {
        console.log("[courseSavedCustomEvent]: " + event.message.description);
        console.log("[courseSavedCustomEvent]: " + event.message.data);

        Page.displayCourseList();


    });
    // render a new studentpage after register a new student
    $(document).on("studentSavedCustomEvent", function (event) {
        console.log("[studentSavedCustomEvent]: " + event.message.description);
        console.log("[studentSavedCustomEvent]: " + event.message.data);

        Page.displayStudentList();


    });


    $(document).on("avaktiveraCours", function (event) {
        console.log("[avaktiveraCoursEvent]: " + event.message.description);
        console.log("[avaktiveraCoursEvent]: " + event.message.data);

        Page.displayStudentList();


    });
});
