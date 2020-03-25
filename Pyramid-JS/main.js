function creaPiramide()
{
    var base= inputNum.value;
    window.alert("Escribio el numero: "+base);

for(var i=1;i<=base;i++)
{
    /*for(var z =1;z<=base-i;z++)
    {
        //document.write("&nbsp");
        document.getElementById('container').innerHTML += '&nbsp';
        
    }*/
    for(var j=1;j<=i;j++)
    {
        //document.write("*");
        document.getElementById('container').innerHTML += '*';
    }
    //document.write("</br>");
    document.getElementById('container').innerHTML += '</br>';
    
}

    
}