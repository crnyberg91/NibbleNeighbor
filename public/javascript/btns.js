$("#logInLink").on("click", (e) => {
    e.preventDefault();
    if(localStorage.getItem("userId")){
     window.location.replace("/user"); 
    }
    else { $("#logInModal").addClass("is-active");
  };
  });

  $("#signUpLink").on("click", (e) => {
    e.preventDefault();
    $("#signUpModal").addClass("is-active");
  });

  $("#signUpSubmitBtn").on("click", (e) => {
    function checkForm() {
          let valid = true;
          if (!$("#signUpUsernameInput") && !$("#signUpEmailInput") && !$("#signUpNameInput")) {
            alert("Fill in all required fields please");
            return (valid = false);
          };
          return valid;
        };

        if(checkForm()){
          const newUser = {
            username: $("#signUpUsernameInput").val().trim(),
            name: $("#signUpNameInput").val().trim(),
            email: $("#signUpEmailInput").val().trim()
          }
          $.post("api/newuser", newUser).then(data => {
            console.log(data);
            if(data){
              localStorage.setItem("userId", data.id);
              window.location.replace("/user");
              $("#signUpUsernameInput").empty();
              $("#signUpNameInput").empty();
              $("#signUpEmailInput").empty();
            }; 
          });
        }
  });

  $(".close-modal").on("click",(e) => {
    e.preventDefault();
    $("#logInModal").removeClass("is-active");
    $("#signUpModal").removeClass("is-active");
    
  });

  $("#logInSubmitBtn").on("click", (e) => {
    e.preventDefault();
    $.get("/api/users", (data)=> {
      console.log("Here");


      let isUser = false;
      let currentUser = $("#logInInput").val();
      data.forEach(user => {
        if(user.email === currentUser) {
          isUser = true;
          localStorage.setItem("userId", user.id);
          window.location.replace("/user");
        };
      });
      console.log(isUser);
    });
  });

  $("#signOutBtn").on("click", (e)=> {
    e.preventDefault();
    localStorage.clear();
    window.location.replace("/");
  });