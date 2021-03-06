function postSurvey () {
        console.log('begin postSurvey');
        var newSurvey = {
            label: $('#title').val(),
            sublabel: $('#subtitle').val(),
            firstChoice: $('#choiceA').val(),
            secondChoice: $('#choiceB').val(),
            category: $('#category').val(),
            answer: undefined,
            date_start: $('#dateBegin').val(),
            date_end: $('#duration').val()+this.date_start
        };
        var choiceAiSAnswer = $('#choiceAIsAnswer').val();
        var choiceBIsAnswer = $('#choiceBIsAnswer').val();
        if (choiceAiSAnswer) {
            newSurvey.answer =choiceAiSAnswer;
        } else {
            if (choiceBiSAnswer) {
                newSurvey.answer = $('#');
            }
        }
        console.log(newSurvey);
        addSurvey(newSurvey)
        .done(function (results) {
            //console.log(results);
            checkValide();
        })
        .fail(function (error) {
            //console.log(error);
            checkValide($('#dateBegin').val(), $('#duration').val());
        });
    }

    function checkValide(date, duration){
        //date = date.split('-');
        date = new Date(date);
        now = new Date(Date.now());
        var endDate = moment(date).add(duration, 'days');
        var dumpDate = moment("03.10.2017");
        if (moment(date).isSame(now) || moment(date).isBefore(now)) {
            alert('Veuillez sélectionner une date plus tard que aujourdhui');
        } else {
            console.log(endDate, dumpDate);
            if (moment(endDate).isBefore(dumpDate) || moment(endDate).isSame(dumpDate)) {
                alert('Les dates chevauchent le sondage courant');
            } else {
                window.location('index.html');
            }
        }
    }
 function newLigneTop10(index, name, firstname, victoryCount){
        var html = '<tr>'
                      +'<td style="width:140px;">'+ index + "</td>"
                      +'<td><a href="#">'+name+'</a></td>'
                      +'<td><a href="">'+firstname+'</a></td>'
                      +'<td>'+victoryCount+" victoires</td>"
                  +"</tr>";
        return html;
    }

    function newLigneSurvey(date, label, category, answer){
        var html = '<tr>'
                      +'<td style="width:140px;">'+date+'</td>'
                      +'<td>"+label+"</td>'
                      +'<td><a href="?category='+category+'>'+category+'</a></td>'
                      +'<td>'+answer+'</td>'
                  +'</tr>';
        return html;
    }
jQuery(function($){
    
	/*if($('#surveyResult').length > 0){
		var id = getUrlParameter('id');
		getSurvey(id).done(function(results){
			$('#currentSurveyLabel').html(results.data.survey.label);
            $('#currentSurveySubLabel').val(results.data.survey.subLabel);
            $('#currentSurveyFirstChoice').html(results.data.survey.firstChoice);
            $('#currentSurveySecondChoice').html(results.data.survey.secondChoice);
			$('.choice1').html(results.data.survey.firstChoice);
			$('.choice2').html(results.data.survey.secondChoice);
			$('.nbChoice1').html(results.data.countFirstChoice);
            console.log($('.choice1'));
			$('.nbChoice2').html(results.data.countSecondChoice);
			var nbContributors = results.data.contributers.length;
			$('#nbContributors').html(nbContributors);

            $('.visualize').trigger('visualizeRefresh');
		});
	}*/

    if($('#currentSurvey').length > 0){
        getCurrentSurvey()
        .done(function(results) {
            var json  = {
                label: "Quel est le meilleur projet embarqué ?",
                sublabel: "C'est une question rhétorique bien sur",
                date_start: Date.now(),
                date_end: Date.now()+1,
                firstChoice: "ADPEC",
                secondChoice: "Un autre projet",
                answer: undefined,
                category: "foot"
            }
            console.log(json);
            $('#currentSurveyLabel').html(json.label);
            $('#currentSurveySubLabel').html(json.subLabel);
            $('#currentSurveyFirstChoice').html(json.firstChoice);
            $('#currentSurveySecondChoice').html(json.secondChoice);
        })
        .fail(function(error) {
            console.log(error);
        });

       getSurveys()
        .done(function(results) {
            console.log(results);
             var jsonSurveys = results.data;
             jsonSurveys.forEach(function(survey,index){
                $('#surveysHistory').append(newLigneSurvey(survey.date_end, survey.label, survey.category, survey.answer));
            });
        })
        .fail(function(error) {
            console.log(error);
        });
    }
    
    if($('#top10Loop').length > 0){
        var json = getTop10Players();
        json.forEach(function(player,index){
            $('#top10Loop').append(newLigneTop10(index, player.name, player.firstname, player.victoryCount));
        });
    }

    if($('#flop10Loop').length > 0){
        var json = getFlop10Players();
        json.forEach(function(player,index){
            $('#flop10Loop').append(newLigneTop10(index, player.name, player.firstname, player.victoryCount));
        });
    }

   


     /**
	disable 2nd choice
     **/
    $("#choiceBIsAnswer").click( function(){
		if($(this).is(":checked")){
		    $("#choiceAIsAnswer").prop( "checked", false).parent().removeClass('checked');
		}
    });

     $("#choiceAIsAnswer").click(function(){
	if($(this).is(":checked")){
	    $("#choiceBIsAnswer").prop( "checked", false ).parent().removeClass('checked');
	}
     } );    
	/**
     * Slide toggle for blocs
     * */
     $('.bloc .title').append('<a href="#" class="toggle"></a>');
     $('.bloc .title .tabs').parent().find('.toggle').remove(); 
     $('.bloc .title .toggle').click(function(){
         $(this).toggleClass('hide').parent().parent().find('.content').slideToggle(300);
         return false; 
     });
     $('.bloc.hidden').each(function(){
      var e = $(this); 
      e.find('.content').hide(); 
      e.find('.toggle').addClass('hide');
     })
     
    
    /**
     * Create charts from table with "graph" class, Use graph-:type class to define chart type
     * http://www.filamentgroup.com/lab/update_to_jquery_visualize_accessible_charts_with_html5_from_designing_with/
     **/ 
     $('table.graph').each(function(){
         var matches = $(this).attr('class').split(/type\-(area|bar|pie|line)/g);
         var options = {
             height:'300px',
             width : parseInt($(this).width())-100,
             colors :['#c21c1c','#f1dc2b','#9ccc0a','#0accaa','#0a93cc','#8734c8','#26a4ed','#f45a90','#e9e744']
         };
         if(matches[1] != undefined){
             options.type = matches[1];
         }
         if($(this).hasClass('dots')){
           options.lineDots = 'double';
         }
          if($(this).hasClass('tips')){
            options.interaction =  true;
            options.multiHover  = 15,
            options.tooltip     =  true,
            options.tooltiphtml = function(data) {
                    var html ='';
                    for(var i=0; i<data.point.length; i++){
                            html += '<p class="stats_tooltip"><strong>'+data.point[i].value+'</strong> '+data.point[i].yLabels[0]+'</p>';
                    }	
                    return html;
           }
          }
         $(this).hide().visualize(options);
     });

    
    /**
     * Animated Scroll for anchos
     * */
    $('a[href^="#"][href!="#"]').click(function() {
            cible=$(this).attr('href');
            if(cible=="#"){ return false; }
            scrollTo(cible);
            return false;
    });

    
    /**
     * iPhone Checkboxes on every input with "iphone" class
     * http://awardwinningfjords.com/2009/06/16/iphone-style-checkboxes.html
     * Triggers error on IE... Disabled waiting for a new version
     * */
    if(!$.browser.msie){
        $('.iphone').iphoneStyle({ checkedLabel: 'YES', uncheckedLabel: 'NO' });
    }
    
      
    /**
     * Jquery UI 
     * Automate jQuery UI insertion (no need to add more code)(and unfirm)
     * input.datepicker become a datepicker
     * input.range become a slider (value is inserted in the input) 
    **/
    $("select,.input input:checkbox, input:radio, input:file").uniform();
   
    $( ".datepicker" ).datepicker();
    
    $('.range').each(function(){
        var cls = $(this).attr('class'); 
        var matches = cls.split(/([a-zA-Z]+)\-([0-9]+)/g);
        var options = {
            animate : true
        };
        var elem = $(this).parent(); 
        elem.append('<div class="uirange"></div>'); 
        for (i in matches) {
          i = i*1; 
          if(matches[i] == 'max'){
             options.max = matches[i+1] * 1
          }
          if(matches[i] == 'min'){
             options.min = matches[i+1] * 1
          }
        }
        options.slide = function(event,ui){
             elem.find('span:first').empty().append(ui.value);
             elem.find('input:first').val(ui.value); 
        }
        elem.find('span:first').empty().append(elem.find('input:first').val());
        options.range = 'min';
        options.value = elem.find('input:first').val();
        elem.find('.uirange').slider(options);
        $(this).hide(); 
    });

   
    /**
     * Autohide errors when an input with error is focused
     * */
    $('.input.error input,.input textarea,.input select').focus(function(){
       $(this).parent().removeClass('error'); 
       $(this).parent().find('.error-message').fadeTo(500,0).slideUp(); 
       $(this).unbind('focus'); 
    });
    
    /**
     * Hide notification when close button is pressed
    **/
   $('.notif .close').click(function(){
       $(this).parent().fadeTo(500,0).slideUp(); 
       return false; 
   });
    
     /**
     * Tabs 
     */
    var anchor = window.location.hash;  // On récup l'ancre dans l'url http://......#ancre
    $('.tabs').each(function(){
        var current = null;             // Permet de connaitre l'élément courant
        var id = $(this).attr('id');    // ID de ma barre d'onglet
        // Si on a une ancre
        if(anchor != '' && $(this).find('a[href="'+anchor+'"]').length > 0){
            current = anchor;
        // Si on a une valeur de cookie
        }else if($.cookie('tab'+id) && $(this).find('a[href="'+$.cookie('tab'+id)+'"]').length > 0){
            current = $.cookie('tab'+id);
        // Sinon current = premier lien
        }else{
            current = $(this).find('a:first').attr('href');
        }
        
        $(this).find('a[href="'+current+'"]').addClass('active');   // On ajoute la classe active sur le lien qui correspond
        $(current).siblings().hide();                               // On masque les éléments
        $(this).find('a').click(function(){
           var link = $(this).attr('href'); 
           // On a cliqué sur l'élément déja active
           if(link == current){
               return false;
           }else{
               // On ajoute la class active sur l'onglet courant et on la supprime des autres onglets
               $(this).addClass('active').siblings().removeClass('active'); 
               $(link).show().siblings().hide();    // On masque/affiche les div suivant les cas
               current = link;                      // On change la valeur de l'onglet courant
               $.cookie('tab'+id,current);          // On stocke l'onglet courant dans les cookie
           }
        });
    });
    
    /**
     * CheckAll, if the checkbox with checkall class is checked/unchecked all checkbox would be checked
     * */
    $('#content .checkall').change(function(){
        $(this).parents('table:first').find('input').attr('checked', $(this).is(':checked')); 
    });
    
    /** 
     * Sidebar menus
     * Slidetoggle for menu list
     * */
    var currentMenu = null; 
    $('#sidebar>ul>li').each(function(){
        if($(this).find('li').length == 0){
            $(this).addClass('nosubmenu');
        }
    })
    $('#sidebar>ul>li:not([class*="current"])>ul').hide();
    $('#sidebar>ul>li:not([class*="nosubmenu"])>a').click(function(){
       e = $(this).parent();
       if(e.hasClass('current')){ e.removeClass('current').find('ul:first').slideUp(); return false;  }
       $('#sidebar>ul>li.current').removeClass('current').find('ul:first').slideUp();
       e.addClass('current').find('ul:first').slideDown();  
    });

    var htmlCollapse = $('#menucollapse').html(); 
    if($.cookie('isCollapsed') === 'true'){
      $('body').addClass('collapsed'); 
      $('#menucollapse').html('&#9654;');
    } 
    $('#menucollapse').click(function(){
      var body = $('body'); 
      body.toggleClass('collapsed');
      isCollapsed = body.hasClass('collapsed');
      if(isCollapsed){
        $(this).html('&#9654;');
      }else{
        $(this).html(htmlCollapse); 
      }
      $.cookie('isCollapsed',isCollapsed); 
      return false; 
    });


    /**
     * Fake Placeholder
     * User labels as placeholder for the next input
     * */
    $('.placeholder,#content.login .input').each(function(){
       var label = $(this).find('label:first');
	   var input = $(this).find('input:first,textarea:first'); 
       if(input.val() != ''){
           label.stop().hide(); 
       }
       input.focus(function(){
           if($(this).val() == ''){
                label.stop().fadeTo(500,0.5);  
           }
           $(this).parent().removeClass('error').find('.error-message').fadeOut(); 
       });
       input.blur(function(){
           if($(this).val() == ''){
                label.stop().fadeTo(500,1);  
           }
       });
       input.keypress(function(){
          label.stop().hide(); 
       });
       input.keyup(function(){
           if($(this).val() == ''){
                label.stop().fadeTo(500,0.5); 
           }
       });
	   input.bind('cut copy paste', function(e) {
			label.stop().hide(); 
	   });
    }); 
    
    $('.close').click(function(){$(this).parent().fadeTo(500,0).slideUp();});
    
    /** 
     * When window is resized
     * */
    $(window).resize(function(){
         /**
          * All "center" class block are centered
          * used for float left centering 
          * */
         $('.center').each(function(){
             $(this).css('display','inline'); 
             var width = $(this).width(); 
             if(parseInt($(this).height()) < 100){
                 $(this).css({width:'auto'}); 
             }else{
                 $(this).css({width:width}); 
             }
             $(this).css('display','block'); 
         }); 
         
         /**
          * Calendar sizing (all TD with same height
          * */
         $('.calendar td').height($('.calendar td[class!="padding"]').width());
    });
    
    $(window).trigger('resize'); 

    function scrollTo(cible){
            if($(cible).length>=1){
                    hauteur=$(cible).offset().top;
            }else{
                    return false;
            }
            hauteur -= (windowH()-$(cible).height())/2;
            $('html,body').animate({scrollTop: hauteur}, 1000,'easeOutQuint');
            return false;
    }    

    function windowH(){
    	if (window.innerHeight) return window.innerHeight  ;
    	else{return $(window).height();}
    }

});
