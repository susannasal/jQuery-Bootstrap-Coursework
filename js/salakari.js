$(document).ready(function(){
            
    // QUIZ : KUN JOKU VALITTU > DISABLE MUUT VAIHTOEHDOT 
    /**
     * When option selected, disable other radio buttons
     */
    $(".answer").click(function(){
        let name_attribuutti = $(this).attr("name");
        let lukkoon = "[name=" + name_attribuutti + "]";
        $(lukkoon).prop("disabled", true);
    });

    // QUIZ : MERKITÄÄN OIKEA JA VÄÄRÄ VASTAUS
    /**
     * Mark right and wrong quiz answer by highlighting with red / green
     */
    let tulos = 0;
    $(".answer").click(function(){
        let vastaus = Number($(this).val());
        

        if (vastaus === 1) {
            // oikein
            $(this).parent().addClass("selected1");
            tulos++;
            $("#score").html(tulos);
        } else {
            // väärin
            $(this).parent().addClass("wrong");
            // oikea vastaus: [value=1]
            // oikea vastaus: [name=XXXX]
            // >>> oikea vastaus: [name=XXXX][value=1]
            let name_attribuutti = $(this).attr("name");
            let oikea_vastaus = "[name=" + name_attribuutti + "][value=1]";
            $(oikea_vastaus).parent().addClass("right");
            $("#score").html(tulos);
        }


    });  

    // QUIZ : TEKSTI PIILOSTA ESIIN
    /**
     * Reveal quiz text when radio button has been selected
     */
    $(".answer").click(function(){
        // let elementti = $(this).parent().parent().next();
        // elementti.removeClass("not_visible");
        // name=color_e >> #color_e
        let name_attribuutti = $(this).attr("name");
        let esille = "#" + name_attribuutti;
        $(esille).removeClass("not_visible");
    });

    /**
     * Calculate upper and lower bounds for the normal weight
     * @param {number} value    Person's height in cm
     * @param {number} factor   18.5 >> lower bound, 24.9 >> upper bound
     * @returns {number}        Normal weight bound as integer
     */
    function getWeightLimit(value, factor) {
        let limit = (factor / 1.3) * Math.pow(value / 100, 2.5)
        limit = limit.toFixed(0);
        return limit;
    }

    /**
     * Calculate the body mass index
     * @param {number} height   height in cm
     * @param {number} weight   weight in kg
     * @returns {number}        body mass index
     */
    $("#bmibutton").click(function(){

        validateInput();

        let paino = Number($("#paino").val());
        let pituuscm = Number($("#pituus").val());
        let pituusm = Number(pituuscm/100);

        let indeksi = (paino/Math.pow(pituusm,2.5)) * 1.3;
        $("#bmiresult").html(indeksi.toFixed(1));

        if ( $("#shownormal").prop("checked") === true){
            let ala = getWeightLimit(pituuscm, 18.5);
            let yla = getWeightLimit(pituuscm, 24.9);
            $("#normalresult").html(ala + " - " + yla);            
        }

        if (indeksi < 17) {
            $("#bmi1").addClass("selected");
        } else if (indeksi < 18.5) {
            $("#bmi2").addClass("selected");
        } else if (indeksi < 25) {
            $("#bmi3").addClass("selected");
        } else if (indeksi < 30) {
            $("#bmi4").addClass("selected");
        } else if (indeksi < 35) {
            $("#bmi5").addClass("selected");
        } else if (indeksi < 40) {
            $("#bmi6").addClass("selected");
        } else {
            $("#bmi7").addClass("selected");
        }

    });

    /**
     * Calculate the waist measurement
     * @param {number} mitta   waist in cm
     * @param {number} sukupuoli   sex, value 1 = male, value 2 = female
     * @returns waist measurement health risk evaluation by highlighting list item
     */
    $("#calcwaist").click(function(){
        let mitta = Number($("#waist").val());
        let sukupuoli = Number($("[name=gender]:checked").val());

        if (sukupuoli === 1) {
            if ( mitta < 90) {
                $("#health1").addClass("selected");
            } else if ( mitta < 100) {
                $("#health2").addClass("selected");
            } else {
                $("#health3").addClass("selected");
            }
        }
        
        if (sukupuoli === 2) {
            if ( mitta < 80) {
                $("#health1").addClass("selected");
            } else if ( mitta < 90) {
                $("#health2").addClass("selected");
            } else {
                $("#health3").addClass("selected");
            }
        }

    });

    /**
     * Empty BMI results if input fields get focus
     */
    $(".bmiinputs").focusin(function(){
        $(this).select();
        $("#bmiresult").html("");
        $("#normalresult").html("");
        $(".range1").removeClass("selected");
    });

    /**
     * Empty waist result if input field gets focus 
     */
         $("#waist").focusin(function(){
            $(this).select();
            $(".range2").removeClass("selected");
        });

    /**
     * When the male/female radio button is clicked input field gets focus
     */
    $("[name=gender]").click(function(){
        $("#waist").focus();
    });

/**
 * Check that all input data is written. Show the error message.
 * @returns {Boolean}   true >> ok, false >> not ok
 */
function validateInput(){

    let date = new Date();
    let current_year = date.getFullYear();

    let year = Number($("#svuosi").val());
    let age = current_year - year;

    let byear1 = Number($("#svuosi").val());
    let weight1 = Number($("#paino").val());
    let height1 = Number($("#pituus").val());

    if (byear1 === 0 || weight1 === 0 || height1 === 0) {
        message2();
    } else if (age < 20 || age > 60) {
        message3();
    }
}


});

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

function message2() {
    // tehdään Bootstrap-olio
    let viesti = new bootstrap.Modal(document.getElementById("mymessage"),
    {backdrop: "static"} );
    viesti.show();   
}

function message3() {
    document.getElementById("m_title").innerHTML = "Note the age";
    document.getElementById("m_body").innerHTML = "BMI results are for person aged 20-60.";

    // tehdään Bootstrap-olio
    let viesti = new bootstrap.Modal(document.getElementById("mymessage"),
    {backdrop: "static"} );
    viesti.show(); 
}
