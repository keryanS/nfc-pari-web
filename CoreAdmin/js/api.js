

    var apiUrl = "http://localhost/";

    function surveyAlreadyExist(){
	alert("Il existe déja un sondage pour aujourd'hui");
    }

    function getSurveys(category){
        if(category != null){
            category = "/" + category;
        }
        else {
            category = "";
        }
        $.ajax({
            url: apiUrl+"get/surveys/",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getCurrentSurvey(){
        $.ajax({
            url: apiUrl+"get/survey/current",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getSurvey(id){
        $.ajax({
            url: apiUrl+"get/survey/"+id,
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getSurveysCharts(){
        $.ajax({
            url: apiUrl+"get/surveys/charts",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getSurveyChart(id){
        $.ajax({
            url: apiUrl+"get/survey/"+id+"/charts",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getTop10Players(){
        $.ajax({
            url: apiUrl+"get/users/top10",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting players" ;
        });
    }

    function getFlop10Players(){
        $.ajax({
            url: apiUrl+"get/users/flop10",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting players" ;
        });
    }

