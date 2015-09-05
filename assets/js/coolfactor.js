var OAUTH_TOKEN = "4ddcabffd6bc9645a36fca588e118b6d81d48c31";

var github = new Github({
  token: OAUTH_TOKEN,
  auth: "oauth"
});

var user = github.getUser();
var username;

function getUsername() {
  var coolfactor = 0;

  console.log($('#URLform').val());
  username = $('#URLform').val();

  user.show(username, function(err, user) {
    console.log(user);

    if(user.avatar_url) {
      coolfactor += 10;
    }

    if(user.created_at) {
      var currentDate = new Date(); // Todays date
      var createdDate = new Date(user.created_at);
      var updateDate = new Date(user.updated_at);

      // console.log(createdDate);
      // console.log(updateDate);

      var oneDay  = 24*60*60*1000;
      var profileAge = Math.abs((createdDate.getTime() - currentDate.getTime()) / oneDay);
      var recentUpdate = Math.abs((updateDate.getTime() - currentDate.getTime()) / oneDay);

      // console.log(profileAge/1000);
      // console.log("ru: " +  recentUpdate);
      // console.log("hjhk: " + 10/recentUpdate);

      coolfactor += (10/recentUpdate + profileAge/1000);
    }

    if(user.followers) {
      coolfactor += user.followers;
    }

    if(user.following) {
      coolfactor -= user.following/2;
    }

    if(user.owned_private_repos) {
      coolfactor += user.owned_private_repos;
    }

    if(user.private_gists) {
      coolfactor += user.private_gists;
    }

    if(user.public_repos) {
      coolfactor += user.public_repos;
    }

    console.log(coolfactor);

    document.getElementById("score").innerHTML = '<img src="' + user.avatar_url + '" /><br><br>' + (user.name ? user.name : user.login) + '<br><br>'+ Math.round(coolfactor);
  });
}

// Show user information for a particular username. Also works for organizations.


// List all gists of a particular user. If username is ommitted gists of the current authenticated user are returned.
// user.userGists(username, function(err, gists) {
//   console.log(gists);
//   console.log(err);
// });
