///////   index     ////////////////////////////////////////////////////////////////
function fetchCovidDetails() {
    let pincode = pin.value;
    let book_date = Ddate.value
  /*  fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${book_date}`)
        .then(res => res.json()).then(data => displayCentre(data))
        .catch(error => alert("Data not Available"))  */

        
    let getSlots=async()=>{ 
        try{
            let res=await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${book_date}`)
            let data=await res.json()
            displayCentre(data)
        }
        catch(error){
            console.log(error);
        }
    }
   getSlots()   
}


function displayCentre(data) {
    let centerid = data.sessions[0].center_id
    let center_name = data.sessions[0].name
    let vaccine_type = data.sessions[0].vaccine
    let avail_slots = data.sessions[0].slots[0]
    let fee_details = data.sessions[0].fee_type
    let dist_name = data.sessions[0].district_name
    let state_name = data.sessions[0].state_name
    let schedule = data.sessions[0].from + `   ${data.sessions[0].to}`

    let Cowid_centre = ``
    Cowid_centre = `Center ID: ${centerid} <br>
    Center Name:  ${center_name} <br>
    Vaccine type: ${vaccine_type} <br>
    Slots: ${avail_slots} <br>
    Charge Details: ${fee_details} <br>
    District Name: ${dist_name} <br>
    State Name: ${state_name} <br> 
    Scheduled Time: ${schedule}  <br>     `
    document.querySelector("#result").innerHTML = Cowid_centre
}

function logout2(){
    localStorage.clear()
    location.href="./Registration.html"
}


///////   REGISTRATION     ////////////////////////////////////////////////////////////////
function registerforVaccine() {
    let Vname = fname.value;
    let ph_number = number.value
    let dob = birth.value
    let user = {
        Vname, ph_number, dob
    }
    localStorage.setItem(user.Vname, JSON.stringify(user))
    alert("Account created for Vaccination")   
    window.location.href="./clogin.html" 
    
}



////////  LOGIN   ////////////////////////////////////////////////////////////////
function validateAccno(Vname) {
    return Vname in localStorage ? true : false
}

function authenticate() {
    let P_name = Vname.value;
    let phn=Vnumber.value
    let dateob = dbirth.value;
    if (this.validateAccno(P_name)) {
        let data = JSON.parse(localStorage.getItem(P_name))
        if (dateob == data.dob & phn==data.ph_number) {
            alert("login success") 
            location.href = "./index.html"
        }
        else {
            alert("Login Failed")
        }
    }
    else{
        alert("user not found")
    }
}

function logOut1(){
    localStorage.clear()
    location.href="./Registration.html"
}
