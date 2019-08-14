API_KEY = "AIzaSyDKHmG_iim8s1FRpgUxlG5JYtIH4R-8wSo";
CLIENT_ID = "138029415830-9g9nvgmcmstcbs1ucjb7lupv3v4vftu4.apps.googleusercontent.com"


function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
            .then(() => out.innerText = "Sign-in successful" ,
                  (err) =>  out.innerText = "Error signing in"+err )
}

function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then( () =>  out.innerText = "Google API client loaded",
              (err) =>  out.innerText = "Error loading Google API client"+err )
            .then($("#auth").hide())
                .then($("#request").show());
}

gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: CLIENT_ID});
});

function OAuth(){
    authenticate()
        .then(loadClient)
}