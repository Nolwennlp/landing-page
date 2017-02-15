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

    /*  // CONNECTION GOOGLE

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

    //Au click sur le bouton submit
    var newsletterSubmit = $("#newsletterSubmit");
    newsletterSubmit.on('click', function(e) {
        e.preventDefault();
        var formId = Math.round(Math.random()*3600),
            name = $("#name").val(),
            firstName = $("#firstName").val(),
            email = $("#email").val(),
            message = $("#message").val();

        writeCatData(formId,name,firstName,email,message);
    });


    //Envoi du form dans firebase
    function writeCatData(formId, name, firstName, email, message) {
        firebase.database().ref('newsletters/' + formId).set({
            name : name,
            firstName : firstName,
            email : email,
            message : message
        });
    }

    //Lors de changements en base
    var listNewsletters = firebase.database().ref('newsletters');
    listNewsletters.on('value', function(snapshot) {

        var newslettersArray = [];
        for(var formId in snapshot.val()){
            var newsletter = snapshot.val()[formId];
            newslettersArray.push(newsletter);
        }
        console.log(newslettersArray);
    });

    //AU CLICK SUR LA CHECKBOX NEWSLETTER
    var currentNbPopOpened = null;

    $('.popupBtn').on('click', function(e) {
        registerPopupOpened();
    });

    var nbPopupOpened = firebase.database().ref('nbPopupOpened');
    nbPopupOpened.on('value', function(snapshot) {
        currentNbPopOpened = snapshot.val();
        console.log(currentNbPopOpened)
    });

    function registerPopupOpened() {
        if (!currentNbPopOpened) {
            firebase.database().ref('nbPopupOpened').set(1);
        }
        else {
            firebase.database().ref('nbPopupOpened').set(parseInt(currentNbPopOpened, 10) ++);
        }
    }
});


$(document).ready(function(){
    $('.parallax').scrolly({bgParallax: true});
});
