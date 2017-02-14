/**
 * Created by lepadellec on 10/02/2017.
 */

$(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA7jw8zUjq09WDtGC1o28AF7am0q2KgrY0",
        authDomain: "landing-page-bd13e.firebaseapp.com",
        databaseURL: "https://landing-page-bd13e.firebaseio.com",
        storageBucket: "landing-page-bd13e.appspot.com",
        messagingSenderId: "54383203848"
    };
    firebase.initializeApp(config);


    var worker = new Worker("js/workers.js");

/*    // CONNECTION GOOGLE

    var provider = new firebase.auth.GoogleAuthProvider();
    

    $('.connection').on('click', "#googleSign",function () {
        googleSignin();

    });
    $('.connection').on('click', "#googleSignOut", function () {
        googleSignout();

    });

    function googleSignin() {


        firebase.auth()
            .signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
    }*/


// FORMULAIRE
    
    //Onsubmit
    var newsletterSubmit = document.getElementById("newsletterSubmit");
    newsletterSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        var formId = Math.round(Math.random()*3600),
            name = document.getElementById("name").value,
            firstName = document.getElementById("firstName").value,
            email = document.getElementById("email").value,
            message = document.getElementById("message").value;

        writeCatData(formId,name,firstName,email,message);
    });


    //Ajouter des clicks avec le temps
    function writeCatData(formId, name, firstName, email, message) {
        firebase.database().ref('newsletters/' + formId).set({
            name : name,
            firstName : firstName,
            email : email,
            message : message
        });
    }
/*
    var source = document.getElementById("contentTemplate").innerHTML;
    var template = Handlebars.compile(source);
    Handlebars.registerHelper('chats', function() {
        var nom = Handlebars.escapeExpression(this.name),
            age = Handlebars.escapeExpression(this.age);

        return new Handlebars.SafeString(
            "<div>Je suis "+nom+" et j'ai "+age+" ans.</div>"
        );
    });*/
    //Lire dans la base
    var listNewsletters = firebase.database().ref('newsletters');
    listNewsletters.on('value', function(snapshot) {

        var newslettersArray = [];
        for(var formId in snapshot.val()){
            var newsletter = snapshot.val()[formId];
            newslettersArray.push(newsletter);
        }
        console.log(newslettersArray);

/*
        var html = template(catsArray);
        console.log(html)
        document.getElementById("ntm").innerHTML = html;*/


    });

});


$(document).ready(function(){
    $('.parallax').scrolly({bgParallax: true});
});


function onYouTubeIframeAPIReady() {
    var player;
    player = new YT.Player('muteYouTubeVideoPlayer', {
        videoId: 'HSiSIwPq1GA', // YouTube Video ID
        playerVars: {
            height: 720,
            width: 1280,
            autoplay: 1,        // Auto-play the video on load
            controls: 0,        // Show pause/play buttons in player
            showinfo: 0,        // Hide the video title
            modestbranding: 1,  // Hide the Youtube Logo
            loop: 1,            // Run the video in a loop
            fs: 0,              // Hide the full screen button
            cc_load_policy: 1, // Hide closed captions
            iv_load_policy: 1,  // Hide the Video Annotations
            autohide: 1,         // Hide video controls when playing
            rel:1,
            start: 25
        },
        events: {
            onReady: function(e) {
                e.target.mute();
            }
        }
    });
}


