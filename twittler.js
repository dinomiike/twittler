$(document).ready(function(){
  var globalUser = '';

  var formatDate = function(dateSource) {
    var month = dateSource.getMonth() + 1;
    var day = dateSource.getDate();
    var hours = dateSource.getHours();
    var minutes = dateSource.getMinutes() < 10 ? '0' + dateSource.getMinutes() : dateSource.getMinutes();
    var timePeriod = '';
    
    switch (month) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;
      case 8:
        month = "Sep";
        break;
      case 9:
        month = "Oct";
        break;
      case 10:
        month = "Nov";
        break;
      case 11:
        month = "Dec";
        break;
    }

    if (hours > 12) {
      hours -= 12;
      timePeriod = "pm";
    } else {
      timePeriod = "am";
    }

    return month + ' ' + day + ', ' + hours + ':' + minutes + timePeriod;
  };

  var grabTweets = function (user) {
    var $body = $('.tweets');
    $body.html('');

    if (user.length === 0) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        $tweet.html('<a href="#" class="' + tweet.user + '">@' + tweet.user + '</a>: ' + tweet.message + ' <em>' + formatDate(tweet.created_at) + '</em>');
        $tweet.appendTo($body);
        index -= 1;
      }
    } else {
      var tweetList = '';
      for (tweetList in streams.home) {
        if (streams.home[tweetList].user === user) {
          var tweet = streams.home[tweetList];
          var $tweet = $('<div class="tweet"></div>');
          $tweet.html('<a href="#">@' + tweet.user + '</a>: ' + tweet.message);
          $tweet.appendTo($body);
        }
      }
    }
  };

  // On page load, fire the function to grab new tweets once
  grabTweets(globalUser);

  // Display a list of users we follow
  var users = '';
  for (key in streams.users) {
    users += '<li><a href="#" class="' + key + '">' + key + '</a></li>';
  }
  $("aside").html("<ul>" + users + "</ul>");

  // Event handler for the "More Tweets" button
  var $button = $("button");
  $button.on("click", function () {
    grabTweets(globalUser);
  });

  $(".tweet a, li a").on("click", function (event) {
    event.preventDefault();
    $(".tweets").html('');
    globalUser = this.className;
    grabTweets(this.className);
  });
});
