let api = "http://api.giphy.com/v1/gifs/random?api_key=YRl8FbnkMZ9KEeNeUcbLxVOvtpxmaNzs";
function setup()
{
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState==4 && this.status==200)
        {
            console.log(this.response);
            var obj = JSON.parse(this.response);
            console.log(obj);
            var url = obj.data.fixed_height_small_url;
            generaTarjetas(url);


            
        }
        else
        {
            console.log("ERROR");
        }
    }

    xhttp.open("GET",api,"true");
    xhttp.send();
}


function generaTarjetas(url)
{
    var gifurl=url;
    var tarjeta=document.createElement("div");
    var parent = document.getElementById("contenedorTarjetas");
    var closebtn = document.createElement("button");
    var gif = document.createElement("img");
    var tag = document.createElement("H3");
    var random;
    gif.src=gifurl;
    
    
    tarjeta.style.display="inline-block";
    tarjeta.style.border="solid 5px";
    tarjeta.style.height="400px";
    tarjeta.style.width="300px";
    tarjeta.style.margin="10px"
    tarjeta.style.textAlign="center";
    tag.style.position="relative";
    tag.style.top="150px";
    gif.style.width="200px";
    gif.style.height="200px";
    gif.style.position="relative";
    gif.style.top="100px";
    
    



    random= ~~((Math.random())*1000);
    
    var t = document.createTextNode("ID: "+random);
    tag.appendChild(t);
    


    parent.appendChild(tarjeta);
    tarjeta.appendChild(closebtn);
    tarjeta.appendChild(gif);
    tarjeta.appendChild(tag);
    

    closebtn.id="c"+random;
    tarjeta.id="tarjeta"+random;
    document.getElementById(""+closebtn.id).addEventListener("click", borraBoton.bind(tarjeta.id));
    document.getElementById(closebtn.id).className="botoncerr";
    console.log(gifurl);
    closebtn.style.height="20px";
    closebtn.style.width="20px";
    closebtn.style.cssFloat="right";
    closebtn.style.backgroundColor="rgb(248, 0, 0)";
    closebtn.value="X";


    function borraBoton()
    {
       console.log(this);
       document.getElementById(""+this).remove(); 
    }

}
