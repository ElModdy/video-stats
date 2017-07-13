
$(function(){
   setYears();
})


function setYears(){
   var yearsHtml = '<option value="">Choose year</option>';
   for(var i=2017, thisYear = new Date().getFullYear(); i <= thisYear; i++){
      yearsHtml += '<option value="http://www.motogp.com/it/ajax/results/selector/' + i + '">' + i + '</option>';
   }
   document.getElementById("select-year").innerHTML = yearsHtml;
}

function setTrack(){
   var url = $('#select-year').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var trackHtml = '<option value="">Choose track</option>';
            for(var i=1, len = Object.keys(result).length; i <= len; i++){
               trackHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].title + '</option>'
            }
            document.getElementById("select-track").innerHTML = trackHtml;
         }
      });
      document.getElementById("select-track-wrapper").style.visibility = "visible";
   }else{
      document.getElementById("select-track-wrapper").style.visibility = "hidden";
   }
   document.getElementById("select-championship-wrapper").style.visibility = "hidden";
   document.getElementById("select-session-wrapper").style.visibility = "hidden";
   document.getElementById("time-selector-wrapper").style.height = "0px";
   document.getElementById("confirm-displayed").style.visibility = "hidden";
}

function setChampionship(){
   var url = $('#select-track').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var championshipHtml = '<option value="">Choose championship</option>';
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               championshipHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].name + '</option>'
            }
            document.getElementById("select-championship").innerHTML = championshipHtml;
         }
      });
      document.getElementById("select-championship-wrapper").style.visibility = "visible";
   }else{
      document.getElementById("select-championship-wrapper").style.visibility = "hidden";
   }
   document.getElementById("select-session-wrapper").style.visibility = "hidden";
   document.getElementById("time-selector-wrapper").style.height = "0px";
   document.getElementById("confirm-displayed").style.visibility = "hidden";
}

var regURL = /[^\/][^\/]*/g;

function setSession(){
   var url = $('#select-championship').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var sessionHtml = '<option value="">Choose session</option>';
            var details = [4];
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               details = result[i].url.match(regURL).slice(4,8);
               sessionHtml += '<option value="anno=' + details[0] +
                                             '&pista=' + details[1] +
                                             '&campionato=' + details[2] +
                                             '&sessione=' + details[3] +
                                             '">' + result[i].name + '</option>'
            }
            document.getElementById("select-session").innerHTML = sessionHtml;
         }
      });
      document.getElementById("select-session-wrapper").style.visibility = "visible";
   }else {
      document.getElementById("select-session-wrapper").style.visibility = "hidden";
   }
   document.getElementById("time-selector-wrapper").style.height = "0px";
   document.getElementById("confirm-displayed").style.visibility = "hidden";
}

var time
function getTimestamp(){
  $('#display-time').text("");
  document.getElementById("time-selector-wrapper").style.height = "0px";
  document.getElementById("time-selector").value = "";
  document.getElementById("confirm-displayed").style.visibility = "hidden";
   var url = $('#select-session').val();
   if(url != ""){
      $.ajax({url: "/gettimestamp?" + url,
        dataType: "json",
        success: function(result){
           if(typeof result == "number"){
             console.log(result);
             displayTime(result);
             document.getElementById("time-selector-wrapper").style.height = "0px";
           }else {
             console.log(result);
             document.getElementById("time-selector-wrapper").style.height = "auto";
           }
           time = result;
           document.getElementById("confirm-displayed").style.visibility = "visible";
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
