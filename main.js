$(()=>{
    //Firstly Invoked Function

    $("#stateList").html("No State selected")
    // $("#districtCases").html("No Districts selected")
})


var cases = {
    total_cases:0,
    confirmed_cases:0,
    recovered_cases:0,
    dead_cases:0,
    tested_cases:0
}

$.ajax({
    url:"https://api.covid19india.org/state_district_wise.json",
    type:"GET",
    dataType:"json"

}).done(res=>{
    Object.keys(res).map(item=>{
     

        $("#stateCodes").append("<span class='stateCode'>" + res[item].statecode + "-" + item +"</span>")
    })
})






$.ajax({
    
    url:"https://api.covid19india.org/v3/data.json",
    dataType:"json",
    type:"GET",
    asyc:false
    // async:false
})
.done(res=>{
    let arr= []
   
    Object.keys(res).map(item=>{
        if(item == "TT"){
            return
        }
         arr.push({[item]:res[item]})
        
         let li = $("<div class='flexItem'>" + item +"</div>")
         li.data("districts",res[item].districts)
       
         li.on("click",function(){

             
             let districts = $(this).data().districts
             $("#stateList").empty()
             $("html,body").animate({
                 scrollTop:($("#stateList").offset().top)
             })
            
    //    console.log(districts["Adilabad"])
            // let states = [];
         
            Object.keys(districts).map(item=>{
                
            //    states.push({[item]:districts[item]})
               let li = $("<li class='blackItem'>"+ item + "</li>")
               li.appendTo("#stateList")
               li.on("mouseover",function(){
                   
                   li.css({cursor:"pointer"})
                 
                   $("#districtCases").empty()  
                   
                   let i  = $(
                 
                    "<div class='myList'>" +"<h3 style='font-weight: bold;'>Total Confirmed Cases: <span id='district'>"+ item +  "</span> </h3>" +"<li > Confirmed : " + "<span style='font-weight:bold'>" + districts[item].total.confirmed + "</span>" +"<br /> " + "Recovered : " + "<span style='font-weight:bold'>" +  districts[item].total.recovered  + "</span>" +" </li>  " + "</div>"
                       
                       
                       )
                       i.animate({"margin-left":"20px"})
              
                       $('.myList').remove()
                       li.children().remove()
                       
                       i.insertAfter(li)
                    //    console.log(i.siblings())
                    
               })

               
              
            })
           
            //  $("#stateList").html(districts);

            
            // let li = $("<li>" + )
            // $("#stateList").appendTo(districts)

            
        //    $($(this).data("districts")).appendTo("#stateList")
        })
         li.appendTo("#list");
        
        
        let {confirmed,recovered,deceased,tested} =  res[item].total ? res[item].total: 0;
        if(confirmed == undefined) confirmed = 0
        if(recovered == undefined) recovered =0
        if(deceased == undefined) deceased =0
        if(tested == undefined) tested = 0
        cases.confirmed_cases += confirmed
        cases.recovered_cases += recovered
        cases.dead_cases += deceased;
        cases.tested_cases += tested
        
      
    })
    
    Object.keys(cases).map(i=>{
        if(cases[i] == 0)return
        let li = $("<div class='flexItem2'>" +  (i.toUpperCase()).replace("_"," ") + "<br/>"+ cases[i] +"</div>")
        li.appendTo("#cases")
    })
   



    $.ajax({
        url:"https://api.covid19india.org/data.json",
        dataType:"json",
        type:"GET"
    })
    .done(res=>{
      
        console.log(res.statewise[0])
        console.log(res.statewise[0].deltaconfirmed)
        $("#positive").text(res.statewise[0].deltaconfirmed)
        $("#deceased").text(res.statewise[0].deltadeaths)
        $("#recovered").text(res.statewise[0].deltarecovered)
    })
   
    return res

    
})
.fail(()=>{
    console.log("request failed")
})
.always(()=>{
    console.log("request done")
})



// requests.forEach((it)=>console.log(it))
// console.log(requests)
