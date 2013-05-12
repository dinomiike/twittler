$(document).ready(function(){
  var globalUser = '';
  var grabTweets = function (user) {
    var $body = $('.tweets');
    $body.html('');

    if (user.length === 0) {
      var index = streams.home.length - 1;
      while(index >= 0){
        var tweet = streams.home[index];
        var $tweet = $('<div class="tweet"></div>');
        $tweet.html('<a href="#" class="' + tweet.user + '">@' + tweet.user + '</a>: ' + tweet.message);// + ' (' + tweet.created_at + ')');
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
