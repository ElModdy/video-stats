var selectors;

$(function(){
   setYears();
   selectors = [
     $('#select-year')[0],
     $('#select-track')[0],
     $('#select-championship')[0],
     $('#select-session')[0]
   ];

   $('#select-session').change(function(){changeSession();});

   $('.selectors').change(function(){changeSelect(this);});
})

function changeSession(){
  $('#time-selector').val('');
  $('#time-selector-wrapper').hide();
  $('#button-confirm').prop('disabled', true);
  $('#display-time').text('');
}

function changeSelect(element){
  var indexOfElement = selectors.indexOf(element);
  var nextElement = selectors[indexOfElement + 1];
  var disabled = ($(element).val() != '') ? false : true;
  $(nextElement).prop('disabled', disabled);
  createDefaultOption(nextElement);
}

function createDefaultOption(element){
  $(element).html('<option value="">Select ' + element.id.split('-')[1] + '</option>');
  if(element == $('#select-session')[0]){
    changeSession();
  }else{
    changeSelect(element);
  }
}

function setYears(){
   var yearsHtml = '';
   for(var i=2017, thisYear = new Date().getFullYear(); i <= thisYear; i++){
      yearsHtml += '<option value="http://www.motogp.com/it/ajax/results/selector/' + i + '">' + i + '</option>';
   }
   $('#select-year').append(yearsHtml);
}

function setTrack(){
   var url = $('#select-year').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var trackHtml = '';
            for(var i=1, len = Object.keys(result).length; i <= len; i++){
               trackHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].title + '</option>'
            }
            $("#select-track").append(trackHtml);
         }
      });
   }
}

function setChampionship(){
   var url = $('#select-track').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var championshipHtml = '';
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               championshipHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].name + '</option>'
            }
            $("#select-championship").append(championshipHtml);;
         }
      });
   }
}

var regURL = /[^\/][^\/]*/g;

function setSession(){
   var url = $('#select-championship').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var sessionHtml = '';
            var details = [4];
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               details = result[i].url.match(regURL).slice(4,8);
               sessionHtml += '<option value="anno=' + details[0] +
                                             '&pista=' + details[1] +
                                             '&campionato=' + details[2] +
                                             '&sessione=' + details[3] +
                                             '">' + result[i].name + '</option>'
            }
            $("#select-session").append(sessionHtml);
         }
      });
   }
}

var time

function getTimestamp(){
  $('#loading').show();
   var url = $('#select-session').val();
   if(url != ""){
      $.ajax({url: '/gettimestamp?' + url,
        dataType: 'json',
        success: function(result){
          $("#loading").hide();
           if(typeof result == 'number'){
             displayTime(result);
          }else if (result == "") {
             $('#display-time').text('Comunication error! Retry');
          }else {
             $('#time-selector-wrapper').show();
           }
           time = result;
           $('#button-confirm').prop('disabled', false);
        }
      });
    }
}

function displayTime(result){
  $('#display-time').text(new Date(result).toString());
}

function displayTimeKeyPress(){
  $('#display-time').text(new Date(time + " " + $('#time-selector').val()).toString());
}
