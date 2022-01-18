let key = "8454ce736bbb455eacdb2fdd7e63a266";
let weather = document.querySelector(".weather");
let input = document.querySelector(".weather-input");
let inputValue="makkah";
let url = `https://api.weatherbit.io/v2.0/current?key=8454ce736bbb455eacdb2fdd7e63a266&city=${inputValue}&include=minutely&units=s"`;
let btn = document.getElementById("search")
btn.addEventListener("click",()=>{
     inputValue = document.querySelector(".weather-input").value;
     console.log(inputValue)
    //  url = `https://api.weatherbit.io/v2.0/current?key=8454ce736bbb455eacdb2fdd7e63a266&city=${inputValue}&include=minutely&units=s"`
     hossam();
      input.value = "";
     console.log(weather.value,"ll")
     
    
})

function hossam(){
   
fetch(`https://api.weatherbit.io/v2.0/current?key=8454ce736bbb455eacdb2fdd7e63a266&city=${inputValue}&include=minutely&units=s"`)
.then(res=>{
   let json =  res.json()
    .then(data=>{
        console.log(data)
        let temp = data.data[0].app_temp;
        let status = data.data[0].weather.description;
        let code = data.data[0].weather.icon
       
        weather.innerHTML = `${temp} <br> ${status} <img src="https://www.weatherbit.io/static/img/icons/${code}.png"/>`;
        
        
    }).catch(err=>console.log(err,"err"))
    
})

}
hossam();
