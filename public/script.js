
$(function(){
   setYears();
})


function setYears(){
   var yearsHtml = "";
   for(var i=2014, thisYear = new Date().getFullYear(); i <= thisYear; i++){
      yearsHtml += '<option value="http://www.motogp.com/it/ajax/results/selector/' + i + '">' + i + '</option>';
   }
   document.getElementById("select-year").innerHTML += yearsHtml;
}

function setTrack(){
   var url = $('#select-year').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var trackHtml = "";
            for(var i=1, len = Object.keys(result).length; i <= len; i++){
               trackHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].title + '</option>'
            }
            document.getElementById("select-track").innerHTML += trackHtml;
         }
      });
      document.getElementById("select-track-wrapper").style.visibility = "visible";
   }else{
      document.getElementById("select-track-wrapper").style.visibility = "hidden";
   }
   document.getElementById("select-championship-wrapper").style.visibility = "hidden";
   document.getElementById("select-session-wrapper").style.visibility = "hidden";
}

function setChampionship(){
   var url = $('#select-track').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var championshipHtml = "";
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               championshipHtml += '<option value=http://www.motogp.com' + result[i].url + '>' + result[i].name + '</option>'
            }
            document.getElementById("select-championship").innerHTML += championshipHtml;
         }
      });
      document.getElementById("select-championship-wrapper").style.visibility = "visible";
   }else{
      document.getElementById("select-championship-wrapper").style.visibility = "hidden";
   }
   document.getElementById("select-session-wrapper").style.visibility = "hidden";
}

var regURL = /[^\/][^\/]*/g;

function setSession(){
   var url = $('#select-championship').val();
   if(url != ""){
      $.ajax({url: url,
         dataType: "json",
         success: function(result){
            var sessionHtml = "";
            var details = [4];
            for(var i=0, len = Object.keys(result).length; i < len; i++){
               details = result[i].url.match(regURL).slice(4,8);
               sessionHtml += '<option value="anno=' + details[0] +
                                             '&pista=' + details[1] +
                                             '&campionato=' + details[2] +
                                             '&sessione=' + details[3] +
                                             '">' + result[i].name + '</option>'
            }
            document.getElementById("select-session").innerHTML += sessionHtml;
         }
      });
      document.getElementById("select-session-wrapper").style.visibility = "visible";
   }else {
      document.getElementById("select-session-wrapper").style.visibility = "hidden";
   }
}

function getTimestamp(){
   var url = $('#select-session').val();
   console.log(url);
   if(url != ""){
      $.ajax({url: "/gettimestamp?" + url,
      dataType: "json",
      success: function(result){
         console.log(result);
      }
   });
}
}
