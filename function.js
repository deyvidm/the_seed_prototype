var fileTotal = 0;

function init() {
	
	switchPanel(event, "login");
	//hide all errors
	var x = document.getElementsByClassName("errorText");
	for (var i = 0; i < x.length; i++) x[i].style.visibility = "hidden";
	//setup hard-coded chart
	initChart();
	
}

function switchPanel(event, panelID) {
	
	var i;
	var doc = document.getElementsByClassName("pageContent");
	
	//hide all pageContent
	for (i = 0; i < doc.length; i++) doc[i].style.display = "none";
	
	//show appropriate display
	document.getElementById(panelID).style.display = "block";
	
	if (panelID == "main") {
		//show logout button
		document.getElementById("logoutIcon").style.visibility = "visible";
		doc = document.getElementsByClassName("mainPageContent");
		for (i = 0; i < doc.length; i++) doc[i].style.display = "none";
		//reset button colors
		document.getElementById("uploadButton").style.color = "black";
		document.getElementById("viewButton").style.color = "black";
		document.getElementById("outputButton").style.color = "black";
	}
	
	if (panelID == "login") {
		//hide logout
		document.getElementById("logoutIcon").style.visibility = "hidden";
		//reset text fields
		document.getElementById("loginUsr").value = "";
		document.getElementById("loginPass").value = "";
		document.getElementById("errorUsr").style.visibility = "hidden";
		document.getElementById("errorPass").style.visibility = "hidden";
	}
	if (panelID == "createAccount") {
		//reset text fields
		document.getElementById("createEmail").value = "";
		document.getElementById("createUsr").value = "";
		document.getElementById("createPass").value = "";
		document.getElementById("createConf").value = "";
		document.getElementById("errorCreateEmail").style.visibility = "hidden";
		document.getElementById("errorCreateUsr").style.visibility = "hidden";
		document.getElementById("errorCreatePass").style.visibility = "hidden";
		document.getElementById("errorCreateConf").style.visibility = "hidden";
	}
	if (panelID == "forgotPassword") {
		//reset text fields
		document.getElementById("forgotPass").value = "";
		document.getElementById("forgotConf").value = "";
		document.getElementById("errorForgotPass").style.visibility = "hidden";
		document.getElementById("errorForgotConf").style.visibility = "hidden";
	}
	
}

function switchMainPanel(event, panelID) {
	
	//reset buttons
	document.getElementById("uploadButton").style.color = "black";
	document.getElementById("viewButton").style.color = "black";
	document.getElementById("outputButton").style.color = "black";
	
	var i;
	var doc = document.getElementsByClassName("mainPageContent");
	
	for (i = 0; i < doc.length; i++) doc[i].style.display = "none";
	
	document.getElementById(panelID).style.display = "block";
	
	//set button colors
	if (panelID == "uploadPanel") document.getElementById("uploadButton").style.color = "red";
	if (panelID == "viewPanel") document.getElementById("viewButton").style.color = "red";
	if (panelID == "outputPanel") document.getElementById("outputButton").style.color = "red";
	
	if (panelID == "uploadPanel") {
		//hide success message
		document.getElementById("successUpload").style.visibility = "hidden";
		//reset file uploader
		fileTotal = 0;
		document.getElementById("fileList").innerHTML = "+";
	}
	
}

function checkLogin() {
	
    var isValid = true;

	//reset errors
	document.getElementById("errorUsr").style.visibility = "hidden";
	document.getElementById("errorPass").style.visibility = "hidden";
	
	var usrStor = document.getElementById("loginUsr");
	var passStor = document.getElementById("loginPass");
	
	if (!usrStor.value) {
	    document.getElementById("errorUsr").style.visibility = "visible";
	    isValid = false;
	}

	if (!passStor.value) {
	    document.getElementById("errorPass").style.visibility = "visible";
	    isValid = false;
	}


	if (isValid) switchPanel(event, "main");
	
}

function checkAccountCreate() {

    var isValid = true;
    var re = /\S+@\S+\.\S+/;

	//reset errors
	document.getElementById("errorCreateEmail").style.visibility = "hidden";
	document.getElementById("errorCreateUsr").style.visibility = "hidden";
	document.getElementById("errorCreatePass").style.visibility = "hidden";
	document.getElementById("errorCreateConf").style.visibility = "hidden";
	
	var emailStor = document.getElementById("createEmail");
	var usrStor = document.getElementById("createUsr");
	var passStor = document.getElementById("createPass");
	var confStor = document.getElementById("createConf");
	
	if (!emailStor.value) {
	    document.getElementById("errorCreateEmail").textContent = "*Field Required*";
	    document.getElementById("errorCreateEmail").style.visibility = "visible";
	    isValid = false;
	}
	else if (!re.test(emailStor.value)) {
	    document.getElementById("errorCreateEmail").textContent = "*Invalid Email*";
	    document.getElementById("errorCreateEmail").style.visibility = "visible";
	    isValid = false;
	}

	if (!usrStor.value) {
	    document.getElementById("errorCreateUsr").style.visibility = "visible";
	    isValid = false;
	}

	if (!passStor.value) {
	    document.getElementById("errorCreatePass").style.visibility = "visible";
	    isValid = false;
	}

	if (passStor.value != confStor.value) {
	    document.getElementById("errorCreateConf").style.visibility = "visible";
	    isValid = false;
	}

	if (isValid) switchPanel(event, "login");
	
}

function checkForgotPassword() {
	
    var isValid = true;
    var re = /\S+@\S+\.\S+/;

	//reset errors
	document.getElementById("errorForgotPass").style.visibility = "hidden";
	document.getElementById("errorForgotConf").style.visibility = "hidden";
	
	var passStor = document.getElementById("forgotPass_field");
	var confStor = document.getElementById("forgotConf");
    var emailStor = document.getElementById("forgotPassEmail")
	
	if (!emailStor.value) {
	    document.getElementById("errorPassEmail").textContent = "*Field Required*";
	    document.getElementById("errorPassEmail").style.visibility = "visible";
	    isValid = false;
	}
	else if (!re.test(emailStor.value)) {
	    document.getElementById("errorPassEmail").textContent = "*Invalid Email*";
	    document.getElementById("errorPassEmail").style.visibility = "visible";
	    isValid = false;
	}

	//if (!passStor.value) document.getElementById("errorForgotPass").style.visibility = "visible";
	if (passStor.value != confStor.value) {
	    document.getElementById("errorForgotConf").style.visibility = "visible";
	    isValid = false;
	}

	if (isValid) switchPanel(event, "login");
	
}

function checkInputFiles() {
    var uploader = document.getElementById("fileUpload");

    if (uploader.files.length == 0) {
        document.getElementById("successUpload").textContent = "No files selected";
        document.getElementById('successUpload').style.visibility = 'visible';
    }

    for (var i = 0; i < uploader.files.length; i++) {
        var extension = uploader.files[i].name.split('.').pop();

        if (extension == "xls" || extension == "xlsx" || extension == "csv" || extension == "txt") {
            document.getElementById("successUpload").textContent = "Files uploaded successfully";
            document.getElementById('successUpload').style.visibility = 'visible';
        }
        else {
            document.getElementById("successUpload").textContent = "Invalid file format: " + extension;
            document.getElementById('successUpload').style.visibility = 'visible';
            break;
        }
    }
}

function initChart() {
	
	var c = document.getElementById("historyChart");
	
	var t1 = {x: ["No-Frills", "Metro", "Loblaws", "Garden-Fresh-Box"],
				 y: [3, 4, 2.5, 2],
				 name: "Potatoes",
				 type: 'scatter'};
	var t2 = {x: ["No-Frills", "Metro", "Loblaws", "Garden-Fresh-Box"],
				 y: [2, 2, 1.5, 0.5],
				 name: "Tomatoes",
				 type: 'scatter'};
	
	var data = [t1, t2];
	
	var layout = {
		title: "Historial Data",
		xaxis: {
			title: "Distributor"
		},
		yaxis: {
			title: "Price ($)",
			tick0: 0,
			dtick: 0.5
		}
	};
	
	Plotly.newPlot(c, data, layout);
	
}

function updateUpload() {
	
	var doc = document.getElementById("fileUpload");
	var txt = "";
	
	var fl = document.getElementById("fileList");
	
	for (var i = 0; i < doc.files.length; i++) {
		txt = "<br><strong>" + (i+1+fileTotal) + ". </strong>";
		var file = doc.files[i];
		if ('name' in file) txt += file.name;
		if ('size' in file) txt += "(" + file.size + " bytes)";
		fl.innerHTML += txt;
	}
	document.getElementById("fileList").innerHTML = fl.innerHTML;
	fileTotal += i;
}
