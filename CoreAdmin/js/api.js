


    var apiUrl = "http://localhost:3000/";

	
    var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	    for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
		    return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	    }
	};

    function surveyAlreadyExist(){
	alert("Il existe déja un sondage pour aujourd'hui");
    }

    function addSurvey(newSurvey) {
        return $.ajax({
            type: "POST",
            url: [apiUrl, "survey"].join(''),
            body: newSurvey
        });
    }

    function getSurveys(category){
        if(category != null){
            category = "/" + category;
        }
        else {
            category = "";
        }
        return $.ajax({
            url: apiUrl+"survey/",
        });
    }

    function getCurrentSurvey(){
        return $.ajax({
            url: apiUrl+"survey/current",
        });
    }

    function getSurvey(id){
        return $.ajax({
            url: apiUrl+"survey/contributers/"+id,
        });
    }

    function getSurveysCharts(){
        $.ajax({
            url: apiUrl+"survey/charts",
        }).done(function(results) {
            return results.body.data;
        }).fail(function() {
            return "error getting surveys" ;
        });
    }

    function getSurveyChart(id){
        $.ajax({
            url: apiUrl+"survey/"+id+"/charts",
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

