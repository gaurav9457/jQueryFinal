$(function () {

let display = $("#popupDiv");
let displayRegister = $("#Formcontainer");
let loginDiv = $("#popupChildMain");
let formObj = $("#formObj");
let tablePage=$("#TablePage");

var logBtnName;
var validate = new ValidationFormMain();

$(document).on("paste", function(event) {
                
                event.preventDefault();
				validate.alertDisplay("Error:Pasting is not allowed");
                
            });

$(document).on("input",function(event){
	let elt=event.target;
	
	validate.inputErrorDisplay(elt);
});

$(document).click(function(event){
	
    let  eleId=event.target.id;
	console.log("ele",event.target.innerHTML);
	 if(eleId=="LoginLink"){
	   loginObj.login();
	 }
	 else if(eleId=="popupDiv" || eleId=='Formcontainer' || eleId=='close' || eleId=='closeRegister' || eleId=="tableHome" 
		 || eleId=="tableButton" || eleId=='alertBoxLogoutParent'){
	    loginObj.closePopup();
	 }
	 else if(eleId=="RegisterLink"){
	   loginObj.register();
	 }
	 else if(eleId=="logout"){
	 loginObj.logout();
	 }
	 else if(eleId=="cancle"){
	 loginObj.closePopup() ;
	 }
	 else if(eleId=="Loginbtn"){
	 validate.loginAuth();
	 }
	 else if(event.target.innerHTML=="All USERS"){
	 loginObj.displayTable();
	 }
	 else if(event.target.innerHTML=="LOGOUT"){
	 loginObj.login();
	 }

});


var loginObj = new LoginObjMain();

function LoginObjMain() {
    this.login = login;
    this.closePopup = closePopup;
    this.register = register;
    this.displayTable=displayTable;
	this.logout=logout;
	this.cancel=cancel;

    function login() {
        var LoginLink = $("#LoginLink").html();

        if (LoginLink == "LOGOUT") {
			console.log("loginnnnn")
            validate.alertDisplayLogout("Logging out");
           /* setTimeout(function(){
			$("#LoginLink").html("LOGIN");
            $("#RegisterLink").html("REGISTER");
			$("#RegisterLink").css("color","white");
			},2000);*/
        }
        else {
            console.log("script");
            loginDiv.fadeIn();
            display.fadeIn();
        }

    }
    function closePopup() {
       $("#Username").val("");
        $("#Password").val("");
		$("#UsernameError").html("&nbsp;");
		$("#PasswordError").html("&nbsp;");
       display.hide();
        displayRegister.hide();
        tablePage.hide();
        validate.resetForm();
		$("#alertBoxLogout").hide();
		$("#alertBoxLogoutParent").hide();

    }

    function register() {
        var RegisterLink =$("#RegisterLink").html();
        if (RegisterLink=="REGISTER") {
            loginDiv.fadeOut();
            displayRegister.fadeIn();
		  
        }
        else{
            loginObj.displayTable();
           // validate.alertDisplayLogout("profile update still pending");
        }
        
    }
	function logout(){
		   
	        $("#LoginLink").html("LOGIN");
            $("#RegisterLink").html("REGISTER");
			$("#RegisterLink").css("color","white");
			$("#profileIcon").hide();
			$("#alertBoxLogout").fadeOut();
			$("#alertBoxLogoutParent").fadeOut();
	}

	function cancel(){
		console.log("cancle function");
	  $("#alertBoxLogout").hide();
	  $("#alertBoxLogoutParent").hide();
	  
	}

    function displayTable() {
        
        tablePage.fadeIn();        
    }

}



let submitBtn = $("#submit");


submitBtn.click((e) => {
    e.preventDefault(); 
    validate.validationForm();
})



let storedArray=[];

function ValidationFormMain() {
    this.validationForm = validationForm;
    this.resetForm = resetForm;
    this.inputErrorDisplay = inputErrorDisplay;
    this.loginAuth=loginAuth;
	this.alertDisplay=alertDisplay;
    this.alertDisplayLogout=alertDisplayLogout;
    this.checkPassword=checkPassword;
	this.state=state;
	this.loginValidation=loginValidation;
	

    function validationForm() {
        let fname = $("#fname").val();
        let lname = $("#lname").val();

        let gender = $('input[name="gender"]:checked');
        console.log(gender.val(),"gender");

        let mobile = $("#mobile").val();
        let dob = $("#dob").val();
        let age = $("#age").val();
		let email=$("#email").val();
		let password = $("#password").val();
		let confirmPassword = $("#confirmPassword").val();
        let city = $("#city").val();
        let addressArea = $("#addressArea").val();

        let checkboxes =$('input:checkbox[name=Skills]:checked');
		console.log(checkboxes,"checkbox");
		 let state = $("#state").val();

		let pincode = $("#pincode").val();
		 let dateValidationResult = isValidDate(dob);
        
        let pattern = /^[a-zA-Z]{2,15}$/;
        let num = /\d/;
        let count = /\d{10}$/;
        let ageCount = /\d{1,2}$/;
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        let address = /^.{2,250}$/;

        if (fname == "") {
            //firstnameError.html("Enter first name it is mandatory");
            alertDisplay("Enter first name it is mandatory");

        }
		else if (!fname.match(pattern))
		{
			alertDisplay("First name not contain numbers");
		}
        else if (lname == "") {
           // lastnameError.html("Enter last name it is mandatory");
            alertDisplay("Last name is mandatory");
        }
		else if (!lname.match(pattern)) {
            
            alertDisplay("Last name not contain numbers");
        }

        else if (gender.val()=="") {
            alertDisplay("Please select a gender");
        }
        else if (dob == '') {
            alertDisplay("Enter date of-birth");
        }
		else if (!dobvalidate.test(dob)) {
                alertDisplay("Please enter a valid date of birth in the format dd/mm/yyyy");
        }
        else if (dateValidationResult === "invalidFormat") {
                alertDisplay("Please enter a valid date of birth ");
               
        }
        else if (dateValidationResult === "invalidDate") {
                alertDisplay("Please enter a valid date");
                
        }
        else if (dateValidationResult === "futureDate") {
                alertDisplay("Date of birth should be before the year 2024");
                
        }
        else if (mobile == "") {
            alertDisplay("Please enter mobile number");
        }
        else if(!mobile.match("^[6-9][0-9]{8}")) {
            alertDisplay("Please enter proper mobile number");
        }
		else if(email==""){
		    alertDisplay("Please enter email id");
		}
		else if(!email.match("^(^[a-z0-9][a-z0-9]*([._][a-z0-9]+)*[@][a-z]+[.][a-z]{2,4}([.][a-z]{1,2})?)$"))
		{
		    alertDisplay("Please enter correct email id");
		}
		else if(password==""||confirmPassword==""){
		   alertDisplay("Please enter password");
		}
        else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)){
           alertDisplay("Password must contain at least 9 characters, one capital letter, one digit, and one special character");
        }
		else if(!checkPassword()){
		    alertDisplay("Passwords are not same, keep it same");
		}
        else if (addressArea == "") {
            alertDisplay("Please enter address it is mandatory");
        }
        else if (!address.test(addressArea)) {
            alertDisplay("address Should be less than 250 characters");
        }
        else if (!count.test(mobile)) {
            alertDisplay("Enter 10 digit mobile no");
        }
        else if (pattern.test(mobile)) {
            alertDisplay("Mobile no not contain alphabets");
        }
		else if(age==""){
		    alertDisplay("Enter your age");
		}

        else if (!(age > 17 && age < 70)) {
            alertDisplay("Your age was not eligible for register");
        }
        else if (city == "") {
            alertDisplay("Please select city");
        }
		else if(state==""){
		   alertDisplay("Please select state");
		}
		else if(pincode==""){
		    alertDisplay("Please enter pincode");
		}
		else if(!pincode.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		    alertDisplay("Please enter correct pincode");
		}

       // else if (checkboxes.length === 0) {
           // $("#checkboxError").html("Please select at least one skill");
       // }

        else {
			
           $("#alertBox").fadeIn();
			$("#alertBox").css("background", "green");
			$("#msg").text("Form Submitted successfully");
			$("#progressBar").css("animation", 'progress 3s 1 ease-in-out');
			$("#alertCloseBtn").click(function () { $("#alertBox").fadeOut(); })
			setTimeout(function () {
				$("#alertBox").fadeOut();
			}, 2500);

            // console.log("First: ",fname," Last: ",lname," gender: ",gender," dob: ",dob," age: ",age," mob: ",mobile," Email: ",email," Password : ",password ," Confirm: ",confirmPassword ," address: ",addressArea," city: ",city," pincode: ",pincode," Techinical: ",checkboxes );
            var selectedGender=gender.val();
            var box="";
            var selectedCheckboxValues = [];
           
             
            checkboxes.each(function() {
               selectedCheckboxValues.push(this.value);
             });
             var box=selectedCheckboxValues.join(", ");


            let storedObj={
                fname:fname,
                lname:lname,
                selectedGender:selectedGender,
                dob:dob,
                age:age,
                mobile:mobile,
                email:email,
                confirmPassword:confirmPassword,
                addressArea:addressArea,
                city:city,
				state:state,
                pincode:pincode,
                checkboxes:box
            };

            storedArray.push(storedObj);
			
          
           setTimeout( function(){loginObj.closePopup()},2500);
           setTimeout( function(){loginObj.displayTable()},2500);

		   
           generateTable();
          
           resetForm();         
                
        }
    }

   
	function generateTable() {
     $("#Tablebody").html(
    storedArray.map(obj => 
      `<tr><td>${Object.values(obj).join('</td><td>')}</td></tr>`
    )
  );
}

   

    function isValidDate(dateString) {

        let datePattern = /^\d{1,2}\/\d{2}\/\d{4}$/;

        if (!datePattern.test(dateString)) {
            return "invalidFormat";
        }

        let splited = dateString.split('/');
        let day = parseInt(splited[0]);
        let month = parseInt(splited[1]) - 1;
        let year = parseInt(splited[2]);

        let testDate = new Date(year, month, day);

        if (testDate.getFullYear() !== year || testDate.getMonth() !== month || testDate.getDate() !== day) {

            return "invalidDate";
        }

        if (year >= 2024) {
            return "futureDate";
        }

        calculateAge(day, month, year);
        return true;
    }


    function calculateAge(day, month, year) {
        let ageInp = $("#age");

        let currentDate = new Date();

        let currentDay = currentDate.getDate();
        let currentMonth = currentDate.getMonth() + 1;
        let currentYear = currentDate.getFullYear();

        let age = currentYear - year;

        if (currentMonth < month || (currentMonth === month && currentDay < day)) {
            age--;
        }

        ageInp.val(age);
		ageInp.disabled=true;
        // return age;
    }

    function alertDisplay(msg) {
        $("#alertBox").fadeIn();
			$("#alertBox").css("background", "red");
			$("#msg").text(msg);
			$("#progressBar").css("animation", 'progress 3s 1 ease-in-out');
			$(".closebtn").click(function () { $("#alertBox").fadeOut(); })
			setTimeout(function () {
				$("#alertBox").fadeOut();
			}, 2500);


    }

    function alertDisplayLogin(msg) {
       $("#alertBoxLogin").fadeIn();
       $("#alertBoxLogin").css("background", "red");
       $("#msglogin").text(msg);
        $("#progressBarLogin").css("animation", 'progress 3s 1 ease-in-out');
       $(".closebtn").click(function () { $("#alertBoxLogin").fadeOut(); })
			setTimeout(function () {
				$("#alertBoxLogin").fadeOut();
			}, 2500);
    }

    function alertDisplayLogout(msg) {
       $("#alertBoxLogoutParent").fadeIn();
        $("#alertBoxLogout").show();     
       $("#msglogout").text("YOU WANT TO LOGOUT ?");
        $("#progressBarlogout").css('animation','progress 3s infinite ease-in-out');
       

    }


    function resetForm() {
			          
		let formObj=$("#formObj");
		formObj.trigger("reset");
		 let city = $("#city");
	   city.attr('disabled',true);
	    var errorDiv=$(".errorDiv");
		errorDiv.html("&nbsp;");
		
    }


  $("#state").change(function(){
	  
	  let state = $("#state").val();
	   if(state !=""){
	   let city = $("#city");
	   city.attr('disabled',false);
	}
	});
	
    
    function inputErrorDisplay(e) {
		//let inp = e.target;
		           
			//let id = inp.id;
			//let value = $("#" + id).val();
			//let errorDiv = (id + "Error");

        let err = $("#"+e.name + "Error");
        let dobvalidate = /\d{1,2}\/\d{1,2}\/\d{4}/;

      
	   let passwardExp=/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

        

        if (e.id == "fname") {
			if (/[0-9\W]/.test(e.value)) {
                e.value = e.value.replace(/[0-9\W]/g, ''); 
                err.html("Error: Name should not contain numbers or spaces");
                return;
            }
            if (e.value.length > 15) {
                e.value = e.value.substring(0, 15); 
                err.html("Name length should be up to 15 characters");
                return;
            }
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.html("Error: Name should not contain numbers or spaces");
            } 
			else {
                err.html("&nbsp;");
            }
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });
        }
        else if(e.id == "lname"){
           if (/[0-9\W]/.test(e.value)) {
                e.value = e.value.replace(/[0-9\W]/g, ''); 
                err.html("Error: Name should not contain numbers or spaces");
                return;
            }
            if (e.value.length > 15) {
                e.value = e.value.substring(0, 15); 
                err.html("Name length should be up to 15 characters");
                return;
            }
            if (e.value.match("[^a-zA-Z]{2,15}$")) {
                err.html("Error: Name should not contain numbers or spaces");
            } 
			else {
                err.html("&nbsp;");
            }
			 e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });
           
        }
        
        
        else if (e.id == "dob") {
            let dateValidationResult = isValidDate(e.value);
            let dobdate=$("#"+e.id);
           
            
            if (/[a-zA-Z\s]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z\s]/g, ''); 
                err.html("Error: Date Not Contain alphabets");
                return;
            }
            if (e.value.length > 10) {
                e.value = e.value.substring(0, 10); 
                err.html("Name length should be up to 10 characters");
                return;
            }
			         
                if (!dobvalidate.test(e.value)) {
                    err.html("Please enter a valid date of birth in the format dd/mm/yyyy");
                }
                
                else if (dateValidationResult === "invalidFormat") {
                    err.html("Please enter a valid date of birth ");
                   
                }
                else if (dateValidationResult === "invalidDate") {
                    err.html("Please enter a valid date");
                    
                }
                else if (dateValidationResult === "futureDate") {
                    err.html("Date of birth should be before the year 2024");
                    
                }
                else {
                    err.html("&nbsp;");
                }
                e.addEventListener("paste", function(event) {
                
                    event.preventDefault();
                    err.html("Error: Pasting is not allowed");
                });
                

        }
		else if(e.id=="mobile"){
			if (/[a-zA-Z\s\W]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z\s\W]/g, ''); 
                err.html("Error: Mobile not number Contain alphabets and space");
                return;
            }
            if (e.value.length > 10) {
                e.value = e.value.substring(0, 10); 
                err.html("Mobile number  length should be up to 10 digits");
                return;

            }
			if(!e.value.match("^[6-9][0-9]{9}")){
				
			    err.html("Enter correct mobile number");
				
			}
			
			else{
			 err.html("&nbsp;");
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });
		
		}
		else if(e.id=="email"){
           
           let validEmailid=/^(^[a-z0-9][a-z0-9]*([._][a-z0-9]+)*[@][a-z]+[.][a-z]{2,4}([.][a-z]{1,2})?)$/g;
          

          // let email_id = document.getElementById(e.id);
           if (/[\s]/.test(e.value)) {
                e.value = e.value.replace(/\s/g, ''); 
                err.html("Email id not contain space");
                return;
            }

           
            if(email==" "){
                err.html("Email id can not contain space");
            }
           else  if(!validEmailid.test(e.value)){
               
			   err.html("Enter correct Email id");
			}
            

			else{
			 err.html("&nbsp;");
			}
           
          e.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.html("Error: Pasting is not allowed");
        });
            
		
		}
        else if(e.id=="age"){
            if (/[a-zA-Z]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z]/g, ''); 
                err.html("Please enter numbers only");
                return;
            }

        }
		else if(e.id=="password"){
            if (e.value.length > 15) {
                e.value = e.value.substring(0, 15); 
                err.html("Password can only contain 15 characters");
                return;
            }
            if (!e.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)) {
                err.html("Password must contain at length 8 to 15,one capital letter,one digit,and one special character");
            }
           
            else {
                err.html("&nbsp;");
            }
            
		}
		else if(e.id=="confirmPassword"){
		    if(!checkPassword()){

			  err.html("Password mismatch");
			}
			else{
			err.html("&nbsp;");
			}
            e.addEventListener("paste", function(event) {
                
                event.preventDefault();
                err.html("Error: Pasting is not allowed");
            });
		}
		else if(e.id=="pincode"){
			if (/[a-zA-Z\W]/.test(e.value)) {
                e.value = e.value.replace(/[a-zA-Z\W]/g, ''); 
                err.html("Please enter numbers only");
                return;
            }
            if (e.value.length > 6) {
                e.value = e.value.substring(0, 6); 
                err.html("Pincode can only contain 6 numbers");
                return;
            }

		  else if(!e.value.match("^[1-9]{1}[0-9]{2}[0-9]{3}$")){
		   err.html("Enter correct pincode");
		   }
		  
		   else{
		   err.html("&nbsp;");
		   }
           e.addEventListener("paste", function(event) {
                
            event.preventDefault();
            err.html("Error: Pasting is not allowed");
        });
		}

    }
	
	

	function checkPassword(){
	      let password = $("#password").val();
		 let confirmPassword = $("#confirmPassword").val();
		 if(password==confirmPassword){
		    return true;
		 }
 
	}
     $("#Username").on("input",function (event){
	 validate.loginValidation(event.target);
	 });

	 function loginValidation(e){
		let err = $("#"+e.name + "Error");
         let pattern=/^[a-zA-Z0-9_@.]{8,20}$/;
         
		  if(e.id=="Username"){  
            if (!/^[a-zA-Z0-9_@.]{8,20}$/.test(e.value)) {
                err.html("Please enter alphanumeric characters, underscores, '@', or periods only.");
               
               // e.preventDefault(); 
                return false; 
            } else {
                err.html("&nbsp;");
            }
		  }
		  else if(e.id=="Password"){
		   if (e.value.length > 14) {
              err.html("Please enter upto 15 characters ");
		  }
		  else{
		  err.html("&nbsp;");
		  }
		  }

	
	}

	 function loginAuth() {
        var Username = "8459";
        var password = "1234";
        var inpUsername = $("#Username").val();
        var inpPassword = $("#Password").val();
        var LoginLink = $("#LoginLink").html();

        //console.log(inpUsername);
        //console.log(inpPassword);
        if (Username == inpUsername && password == inpPassword) {
            loginObj.closePopup();
           $("#LoginLink").html("LOGOUT");
            $("#RegisterLink").html("All USERS");
           
			 $("#profileIcon").fadeIn();
			 $("#loginName").html(`<sup>Welcome ${inpUsername}</sup>`);
        }
		else if(inpUsername=="" || inpPassword==""){
            alertDisplayLogin("Please enter user name and password");
		}
        else {
            alertDisplayLogin("User not found Login again");
        }
    }

}
});