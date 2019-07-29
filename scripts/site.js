class LoanApplication {
    Id = create_UUID();
    ApplicantName;
    ApplicantDateOfBirth;
    ApplicantAnnualIncome;
    Factors = [];
    LoanPurpose;
    LoanAmount;
}

var LoanApplicationList = [];

//fires when the page loads
window.onload = function () {

    initializeLoans();

    bindLoansToDropDown();
}

function initializeLoans() {

    var la1 = new LoanApplication();
    la1.ApplicantName = "Mr. John worker";
    la1.ApplicantDateOfBirth = new Date(1983, 2, 1);
    la1.ApplicantAnnualIncome = 48000;
    la1.Factors = [false, true, true, false];
    la1.LoanPurpose = "I want to build a new house with the loan";
    la1.LoanAmount = 150000;

    LoanApplicationList[0] = la1;

    var la2 = new LoanApplication();
    la2.ApplicantName = "Miss Michelle Smartypants M.D. ";
    la2.ApplicantDateOfBirth = new Date(1976, 12, 14);
    la2.ApplicantAnnualIncome = 198050;
    la2.Factors = [true, true, true, false];
    la2.LoanPurpose = "My partner needs the loan to buy new equipment for our medical practice";
    la2.LoanAmount = 4800;

    LoanApplicationList[1] = la2;

    var la3 = new LoanApplication();
    la3.ApplicantName = "Mrs. Debbie Learner";
    la3.ApplicantDateOfBirth = new Date(1952, 6, 20);
    la3.ApplicantAnnualIncome = 21000;
    la3.Factors = [true, true, true, true];
    la3.LoanPurpose = "Go on a cruise holiday";
    la3.LoanAmount = 6000;

    LoanApplicationList[2] = la3;
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function bindLoansToDropDown() {

    var dropDown = document.getElementById("loanApplications");

    dropDown.options.length = 0;

    var el = document.createElement("option");
    el.textContent = "...Select an application...";
    dropDown.appendChild(el);


    for (var i = 0; i < LoanApplicationList.length; i++) {
        var la = LoanApplicationList[i];

        var el = document.createElement("option");
        el.textContent = "Application of " + la.ApplicantName;
        el.value = la.Id.toString();
        dropDown.appendChild(el);
    }
}

function loadApplication() {

    var dropDown = document.getElementById("loanApplications");

    var la = findLoanApplicationByName(dropDown.value);

    if (la != undefined) {

        var isEmployed = la.Factors[0];
        var hasKids = la.Factors[1];
        var hasLoans = la.Factors[2];
        var hasCreditcards = la.Factors[3];


        document.getElementById("inputName").value = la.ApplicantName;
        document.getElementById("inputDoBMonth").value = la.ApplicantDateOfBirth.getMonth() + 1;
        document.getElementById("inputDoBDay").value = la.ApplicantDateOfBirth.getDate();
        document.getElementById("inputDoBYear").value = la.ApplicantDateOfBirth.getFullYear();
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("IsEmployed").checked = isEmployed;
        document.getElementById("HasKids").checked = hasKids;
        document.getElementById("HasLoans").checked = hasLoans;
        document.getElementById("HasCreditcards").checked = hasCreditcards;
        document.getElementById("inputLoanPurpose").value = la.LoanPurpose;
        document.getElementById("inputLoanAmount").value = la.LoanAmount;

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerText = generateRickProfile(la); 

    }
}

function findLoanApplicationByName(name) {
    for (var i = 0; i < LoanApplicationList.length; i += 1) {
        if (LoanApplicationList[i]["Id"] === name) {
            return LoanApplicationList[i];
        }
    }
    return undefined;
}

function saveApplication() {

    if (validateApplication()) {

        var newLa = getLoanApplicationDataFromInputs();

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerText = generateRickProfile(newLa);    

        LoanApplicationList.push(newLa);

        bindLoansToDropDown();

    }else {
        document.getElementById("riskSummary").style.display = "none";
    }
}

function clearApplication() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputDoBMonth").value = "";
    document.getElementById("inputDoBDay").value = "";
    document.getElementById("inputDoBYear").value = "";
    document.getElementById("inputAnnualIncome").value = "";
    document.getElementById("IsEmployed").checked = false;
    document.getElementById("HasKids").checked = false;
    document.getElementById("HasLoans").checked = false;
    document.getElementById("HasCreditcards").checked = false;    
    document.getElementById("inputLoanPurpose").value = "";
    document.getElementById("inputLoanAmount").value = "";

    hideValidators();
}

function hideValidators() {
    document.getElementById("inputNameValidation").style.display = "none";
    document.getElementById("inputDoBValidation").style.display = "none";
    document.getElementById("inputAnnualIncomeValidation").style.display = "none";
    document.getElementById("inputLoanPurposeValidation").style.display = "none";
    document.getElementById("inputLoanAmountValidation").style.display = "none";
    document.getElementById("riskSummary").style.display = "none";
}

function getLoanApplicationDataFromInputs() {

    var la = new LoanApplication();

    la.ApplicantName = document.getElementById("inputName").value;

    var month = document.getElementById("inputDoBMonth").value;
    var day = document.getElementById("inputDoBDay").value;
    var year = document.getElementById("inputDoBYear").value;

    var isEmployed = document.getElementById("IsEmployed").checked;
    var hasKids =  document.getElementById("HasKids").checked;
    var hasLoans = document.getElementById("HasLoans").checked;
    var hasCreditcards = document.getElementById("HasCreditcards").checked;   
    
    
    la.Factors[0] = isEmployed;
    la.Factors[1] = hasKids;
    la.Factors[2] = hasLoans;
    la.Factors[3] = hasCreditcards;    

    if (month != "" && day != "" && year != "") {
        la.ApplicantDateOfBirth = new Date(year, month, day);
    }

    la.ApplicantAnnualIncome = document.getElementById("inputAnnualIncome").value;
    la.LoanPurpose = document.getElementById("inputLoanPurpose").value;
    la.LoanAmount = document.getElementById("inputLoanAmount").value;

    return la;
}

function validateApplication() {

    var valid = true;

    var la = getLoanApplicationDataFromInputs();

    if (la.ApplicantName == "") {
        document.getElementById("inputNameValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputNameValidation")
        .style.display = "none";
    }

    if (la.ApplicantDateOfBirth == undefined) {
        document.getElementById("inputDoBValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputDoBValidation")
        .style.display = "none";
    }

    if (la.ApplicantAnnualIncome == "") {
        document.getElementById("inputAnnualIncomeValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputAnnualIncomeValidation")
        .style.display = "none";
    }

    if (la.LoanPurpose == "") {
        document.getElementById("inputLoanPurposeValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanPurposeValidation")
        .style.display = "none";
    }

    if (la.LoanAmount == "") {
        document.getElementById("inputLoanAmountValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanAmountValidation")
        .style.display = "none";
    }

    return valid;
}

function generateRickProfile(la) {
    var risk = 3;

    var nameAndTitle = la.ApplicantName;

    var indexOfMD = nameAndTitle.search("MD");
    var indexOfMD2 = nameAndTitle.search("M.D");
    var indexOfMD3 = nameAndTitle.search("M.D.");
    var indexOfPhD = nameAndTitle.search("PhD");
    var indexOfPhD2 = nameAndTitle.search("Ph.D");
    var indexOfPhD3 = nameAndTitle.search("PHD");
    var indexOfDr = nameAndTitle.search("Dr.");
    var indexOfDr2 = nameAndTitle.search("DR.");

    if (indexOfMD > -1 || indexOfMD2 > -1 || indexOfMD3 > -1 
        || indexOfPhD > -1 || indexOfPhD2 > -1 
        || indexOfPhD3 > -1 || indexOfDr > -1 || indexOfDr2 > -1) {

        risk = risk - 1;
    }

    var age = new Date().getFullYear() - 
        la.ApplicantDateOfBirth.getFullYear();

    if (age > 60) {
        risk = risk + 2;
    }

    var loanRatio = la.ApplicantAnnualIncome / la.LoanAmount;
    if (loanRatio < 1) {
        risk = risk + 3;
    }
    if (loanRatio > 10) {
        risk = risk + 2;
    }
    if (loanRatio > 20) {
        risk = risk + 1;
    }
    if (loanRatio > 30) {
        risk = risk - 1;
    }

    if (la.Factors[2] == true || la.Factors[3] == true) {
        //risk increases when the applicant has other 
        //loans or credit cards
        risk = risk + 1;
    }

    var purpose = la.LoanPurpose;

    var indexOfHouse = purpose.search("House");
    var indexOfHouse2 = purpose.search("house");
    var indexOfHoliday = purpose.search("Holiday");
    var indexOfHoliday2 = purpose.search("holiday");
    var indexOfHoliday3 = purpose.search("vacation");
    var indexOfHoliday4 = purpose.search("Vacation");
    var indexOfBusiness = purpose.search("Business");
    var indexOfBusiness2 = purpose.search("business");

    if (indexOfHouse > -1 || indexOfHouse2 > -1) {
        //the loan will be used for a house or building project
        risk = risk + 2;
    }

    if (indexOfHoliday > -1 || indexOfHoliday2 > -1 
        || indexOfHoliday3 > -1 || indexOfHoliday4 > -1) {
        //the loan will be used for a holiday
        risk = risk + 3;
    }

    if (indexOfBusiness > -1 || indexOfBusiness2 > -1) {
        //the loan will be used for a business
        risk = risk + 1;
    }

    
    var reviewText = "";

    if (age < 18) {
        reviewText = "your application will not be reviewed, because you have to be 18 years or older.";
    } else {
        reviewText = "your application will be reviewed.";
    }

    var riskProfile = "";

    if (risk < 2) {
        riskProfile = "very low";
    } else if (risk < 5) {
        riskProfile = "low";
    }else if (risk < 8) {
        riskProfile = "medium";
    }else if (risk < 12) {
        riskProfile = "high";
    }

    var summaryText = "Dear " + la.ApplicantName + ", " + reviewText + " Your risk profile is " + riskProfile;

    return summaryText;
}



