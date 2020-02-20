
$(function () {
    $.ajax({
        type: "GET",
        url: "/api/user?role=2"
    }).done(function (professors) {
        $(function () {
            $.ajax({
                type: "GET",
                url: "/api/subject"
            }).done(function (subjects) {
                $(function () {
                    $.ajax({
                        type: "GET",
                        url: "/api/studentgroup"
                    }).done(function (studentGroups) {

                        var MyDateField = function(config) {
                            jsGrid.Field.call(this, config);
                        };
                     
                        MyDateField.prototype = new jsGrid.Field({
                            sorter: function(date1, date2) {
                                return new Date(date1) - new Date(date2);
                            },
                     
                            itemTemplate: function(value) {
                                return new Date(value).toDateString();
                            },
                     
                            insertTemplate: function(value) {
                                return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date() });
                            },
                     
                            editTemplate: function(value) {
                                return this._editPicker = $("<input>").datepicker().datepicker("setDate", new Date(value));
                            },
                     
                            insertValue: function() {
                                return this._insertPicker.datepicker("getDate").toISOString();
                            },
                     
                            editValue: function() {
                                return this._editPicker.datepicker("getDate").toISOString();
                            }
                        });
                     
                        jsGrid.fields.myDateField = MyDateField;

                        $("#bookings").jsGrid({
                            width: null,
                            shrinkToFit: false,
                            filtering: false,
                            inserting: true,
                            editing: true,
                            sorting: true,
                            paging: true,
                            autoload: true,
                            pageSize: 10,
                            pageButtonCount: 5,
                            deleteConfirm: "Do you really want to delete booking?",
                            controller: {
                                loadData: function (filter) {
                                    return $.ajax({
                                        url: "/api/booking",
                                        dataType: "json",
                                        data: filter
                                    });
                                },
                                insertItem: function (item) {
                                    return $.ajax({
                                        type: "POST",
                                        url: "/api/booking",
                                        data: item
                                    });
                                },
                                updateItem: function (item) {
                                    return $.ajax({
                                        type: "PUT",
                                        url: "/api/booking",
                                        data: item
                                    });
                                },
                                deleteItem: function (item) {
                                    return $.ajax({
                                        type: "DELETE",
                                        url: "/api/booking",
                                        data: item
                                    });
                                }
                            },
                            fields: [
                                { name: "studentGroupId", type: "select", items: studentGroups, valueField: "_id", textField: "name", title: "Student group" },
                                { name: "subjectId", type: "select", items: subjects, valueField: "_id", textField: "name", title: "Subject" },
                                { name: "professorId", type: "select", items: professors, valueField: "_id", textField: "email", title: "Professor" },
                                { name: "semester", type: "number", title: "Semester" },
                                { name: "date", type: "myDateField", title: "Date" },
                                { name: "startHour", type: "number", title: "Start time" },
                                { name: "endHour", type: "number", title: "End time" },
                                { name: "isExternal", type: "checkbox", title: "External" },
                                { type: "control" }
                            ]
                        });
                    });
                });
            });
        });
    });
}); 