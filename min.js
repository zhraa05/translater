 const fromtext = document.querySelector(".from-text")
  totext = document.querySelector(".to-text")
selecttag = document.querySelectorAll("select")
exchang = document.querySelector(".exchange")
transletbtn = document.querySelector("button")
icons = document.querySelectorAll(".row i")

 selecttag.forEach( (tag, id) =>{
     for(const country_cod  in countries) {
         let selected
         if(id == 0 && country_cod == "en-GB"){
             selected = "selected"
         }
         else if(id == 1 && country_cod == "ar-SA"){
             selected = "selected"
         }
  let option= `<option value="${country_cod}" ${selected} >${countries[country_cod]}</option>`
  tag.insertAdjacentHTML("beforeend" ,option)
     }
 })
exchang.addEventListener("click", () => {
    let temptext =fromtext.value
    templang =selecttag[0].value
    fromtext.value =totext.value
   selecttag[0].value =selecttag[1].value
    totext.value = temptext
 selecttag[1].value = templang
})


 transletbtn.addEventListener('click',() =>{
     let text = fromtext.value
     transletfrom = selecttag[0].value,
     transleteto = selecttag[1].value
     let apiurl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${transletfrom}|${transleteto}`;
     fetch(apiurl).then(res => res.json()).then(data => {

        totext.value =data.responseData.translatedText

     })
 } )

 icons.forEach(icon =>{
     icon.addEventListener('click', ({target}) =>{
         if(target.classList.contains("fa-copy")){
            
             if(target.id == "from"){
            
           navigator.clipboard.writeText(fromtext.value)
             }else{
                  
              navigator.clipboard.writeText(totext.value)
             }
         } 
         else{
               
               
             let Utterance ;
         if(target.id == "from"){
       Utterance = new SpeechSynthesisUtterance(fromtext.value)
    
       Utterance.lang = selecttag[0].value
             }else{
        Utterance = new SpeechSynthesisUtterance(totext.value)
         Utterance.lang = selecttag[1].value
             }
             var synth = window.speechSynthesis
         synth.speak(Utterance)
       
         }
             
     })
 })