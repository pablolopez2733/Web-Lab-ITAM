let api= "https://apiidiomas.firebaseapp.com/idiomas.json";
var obj;
var selectedlanguages = [];
var random;

function cargaidiomas()
{
    let dropdown=document.getElementById("idioma-dropdown");
    dropdown.length=0;
    let defaultoption= document.createElement("option");
    defaultoption.text="Seleccione un idioma";
    dropdown.add(defaultoption);
    dropdown.selectedIndex=0;



    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if(this.readyState==4 && this.status==200)
        {
            console.log(this.response);
            obj = JSON.parse(this.response);
            console.log(obj);

           
            for(key in obj)
            {
             
                var option = document.createElement("option");
                option.text = ""+key;
                dropdown.add(option);

            }

        }
        else
        {
            console.log("ERROR");

        }

    }
    xhttp.open("GET",api,"true");
    xhttp.send();
}

function generaIdioma()
{
    random= ~~((Math.random())*1000);
    var e = document.getElementById("idioma-dropdown");
    var idioma = e.options[e.selectedIndex].value;
    console.log(idioma);
    for (key in obj)
    {
        if(key==idioma)
        {
            var tarjeta=document.createElement("div");
            var parent = document.getElementById("contenedoridiomas");

            var tituloidioma=document.createElement("h3");
            var title = document.createTextNode(""+idioma);
            tituloidioma.appendChild(title);
            tarjeta.appendChild(tituloidioma);

            var pniveles=document.createElement("p");
            var pprecio=document.createElement("p");
            var pprofesor=document.createElement("p");
            var pdescuento= document.createElement("p");

           

            
            var selectniveles=document.createElement("select");
            selectniveles.id=""+random;
            var niveles=[];
            
            //console.log(obj[idioma].niveles);
            niveles=obj[idioma].niveles;
            //console.log(niveles);


            for (key in niveles)
            {
                var option = document.createElement("option");
                option.text = ""+niveles[""+key];
                selectniveles.add(option);

            }
            tarjeta.appendChild(selectniveles);
            


            var precio=obj[idioma].precio;
            var price = document.createTextNode("Precio: $"+precio);
            pprecio.appendChild(price);
            tarjeta.appendChild(pprecio);

            var profesor=obj[idioma].profesor;
            var teacher = document.createTextNode("Profesor: "+profesor);
            pprofesor.appendChild(teacher);
            tarjeta.appendChild(pprofesor);

            var descuento=obj[idioma].descuento;
            var discount = document.createTextNode("Descuento: "+descuento);
            pdescuento.appendChild(discount);
            tarjeta.appendChild(pdescuento);

            parent.append(tarjeta);

            tarjeta.style.display="inline-block";
            tarjeta.style.border="solid 5px";
            tarjeta.style.height="220px";
            tarjeta.style.width="170px";
            tarjeta.style.margin="10px"
            tarjeta.style.textAlign="center";

            let descuentoparseado= parseInt(descuento);

            let tot = precio*(1-(descuentoparseado/100));

            selectedlanguages.push({
                language: idioma,
                total: tot,
                nivel: selectniveles.options[selectniveles.selectedIndex].text,
                profesor: profesor,

                
              });

              document.getElementById(""+selectniveles.id).addEventListener("change", cambiaNivel.bind(idioma,selectniveles.id));



        }
    }
}

function generaTicket()
{
    var heading = document.getElementById("encabezado");
    heading.innerHTML = '';
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode("Ticket de Compra"))
    heading.append(title);



    var costofinal=0;
    for(var i =0; i<selectedlanguages.length;i++)
    {
       costofinal= costofinal+selectedlanguages[i].total;
    }
    console.log(selectedlanguages);
    console.log("El costo es de : $"+costofinal);

    var contenedor=document.getElementById("contenedoridiomas");
    contenedor.innerHTML = '';
    contenedor.append(document.createElement("hr"));

    for(i=0; i<selectedlanguages.length; i++)
    {
        var nom= document.createElement("p");
        var tot= document.createElement("p");
        var nivel= document.createElement("p");
        nom.appendChild(document.createTextNode("Idioma: "+ selectedlanguages[i].language));
        tot.appendChild(document.createTextNode("Precio: $"+ selectedlanguages[i].total.toFixed(2)));
        nivel.appendChild(document.createTextNode("Nivel: "+selectedlanguages[i].nivel));
        
    
        contenedor.append(nom);
        contenedor.append(tot);
        contenedor.append(nivel);
        contenedor.append(document.createElement("hr"));
        contenedor.append(document.createElement("br"));
        
      }
      var tot= document.createElement("p");
      tot.appendChild(document.createTextNode("Precio total de todos los cursos es de:  $"+ costofinal.toFixed(2)));
      
      contenedor.appendChild(tot);


}

function cambiaNivel(targetselect)

{
    var level=document.getElementById(""+targetselect)
    var nvonivel=level.options[level.selectedIndex].text;

    for(var i =0; i<selectedlanguages.length;i++)
    {
    
       if(selectedlanguages[i].language==this)
       {
           selectedlanguages[i].nivel=nvonivel;
       }
    }

    console.log("Se cambio el nivel de "+this+" a : "+nvonivel);
}



