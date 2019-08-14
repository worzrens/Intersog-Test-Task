API_KEY = "AIzaSyDKHmG_iim8s1FRpgUxlG5JYtIH4R-8wSo";
CLIENT_ID = "138029415830-13pnjkeu8bs2536vhj3t1n1ngvsil6i5.apps.googleusercontent.com"



function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
            .then(() => console.log("Sign-in successful") ,
                  (err) => console.error("Error signing in", err) )
}

function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then( () => console.log("Google API client loaded"),
              (err) => console.error("Error loading Google API client", err) )
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