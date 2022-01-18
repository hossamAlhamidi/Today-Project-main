let query = "apple"
let pageNum = 1;
const news_search = document.getElementById("news_search")
let btn_search = document.getElementById("btn-search")

categoryURL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e182eebfa7cd4a889f004787a60a3665`
// var nurl = 'https://newsapi.org/v2/everything?' +
//           'q=Apple&' +
//           'from=2022-01-05&' +
//           'page=2&'+
//           'apiKey=e182eebfa7cd4a889f004787a60a3665';

var req = new Request(nurl);
let newsDiv = document.querySelector("#news")
let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
var nurl = `https://newsapi.org/v2/everything?q=${query}&from=2022-01-05&page=${pageNum}&apiKey=e182eebfa7cd4a889f004787a60a3665`

btn_search.addEventListener("click",()=>{
    pageNum=1;
    prev.disabled=true;
    console.log(pageNum,"from search")
    next.disabled=false;
     query = news_search.value;
     nurl = `https://newsapi.org/v2/everything?q=${query}&from=2022-01-05&page=${pageNum}&apiKey=e182eebfa7cd4a889f004787a60a3665`
     news_search.value = "";
     fetchData()
    
})

next.addEventListener("click",()=>{
    pageNum++;
    if(pageNum>=2){
    prev.disabled=false;
    }
    if(pageNum==5){
        next.disabled=true;
    }
    console.log(pageNum)
    nurl = `https://newsapi.org/v2/everything?q=${query}&from=2022-01-05&page=${pageNum}&apiKey=e182eebfa7cd4a889f004787a60a3665`
    fetchData()
    
})
prev.addEventListener("click",()=>{
    if(pageNum>=2){
        // console.log("No",pageNum)
        // prev.disabled=true;
        next.disabled=false;
    pageNum--
    nurl = `https://newsapi.org/v2/everything?q=Apple&from=2022-01-05&page=${pageNum}&apiKey=e182eebfa7cd4a889f004787a60a3665`

    // prev.disabled=false;
    console.log("yes",pageNum)
    fetchData();
    }
    if(pageNum==1){
        prev.disabled=true;
    }
    // else{
    //     console.log("No",pageNum)
    //     prev.disabled=true;
    //     // pageNum--
    //     // nurl = `https://newsapi.org/v2/everything?q=Apple&from=2022-01-05&page=${pageNum}&apiKey=e182eebfa7cd4a889f004787a60a3665`
    //     // prev.disabled=false;
    //     // console.log("yes",pageNum)
    //     // fetchData();
    // }
})

let headings = document.querySelectorAll("#headings a");
for(let heading of headings){
heading.addEventListener("click",(event)=>{
    pageNum=1;
    prev.disabled=true;
    next.disabled=false;
    let category = event.target.id;
    categoryURL = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=e182eebfa7cd4a889f004787a60a3665`
    fetchCategory() 
})
}
function fetchCategory(){

    fetch(categoryURL).then(res=>{
        res.json().then(data=>{
            console.log(data.articles,"cat");
            let temp =  data.articles.map(article=> ` 
        <div class="col-md-6 my-2">
     <div class="card" >
       <img src="${article.urlToImage}" class="card-img-top " style="height:200px" alt="...">
       <div class="card-body">
        <div style="height:150px;overflow:hidden">
         <h5 class="card-title">${article.title}</h5>
         <p class="card-text">${article.author}</p>
         <p class="card-text">${article.content}</p>
         </div>
         <a href="${article.url}" class="btn btn-primary" target="_blank">Further more</a>
       </div>
     </div>
   </div>
       
        
        `

       )
        newsDiv.innerHTML = temp.join("")
        })
    })

}

function fetchData(){
fetch(nurl)
    .then((res)=> {
        console.log(res,"res")
       res.json().then(data=>{
        console.log(data.articles,"news",data.articles.length)
        let temp =  data.articles.map(article=> ` 
        <div class="col-md-6 my-2">
     <div class="card" >
       <img src="${article.urlToImage}" class="card-img-top " style="height:200px" alt="...">
       <div class="card-body">
        <div style="height:150px;overflow:hidden">
         <h5 class="card-title">${article.title}</h5>
         <p class="card-text">${article.author}</p>
         <p class="card-text">${article.content}</p>
         </div>
         <a href="${article.url}" class="btn btn-primary" target="_blank">Further more</a>
       </div>
     </div>
   </div>
       
        
        `

       )
       console.log(temp.length,"temp")
       if(temp.length == 0){
           newsDiv.innerHTML = "nothing"
           next.disabled=true;
       }
       else
        newsDiv.innerHTML = temp.join("")
       
        
    })
      
    }).catch(err=>{console.log(err,"err")})

}


fetchData()