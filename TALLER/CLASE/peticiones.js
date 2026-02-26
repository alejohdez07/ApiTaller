//variables globales
let boton = document.querySelector(".btn-consultar");
let resultado = document.querySelector(".resultado");

//evento al boton
boton.addEventListener("click", ()=>{
   // alert("estamos melos");
   peticion();
});

//funcion para realizar la peticion a la API
function peticion() {
    let url = "http://localhost/apiPeliculas/datos.txt";
    //metodo fetch para realizar la peticion
    fetch(url, {
        method:"GET",
        headers: {
            "Content-type":"application/json"
        }
    }).then((d)=> d.json())
    .then((peliculas)=>{
        peliculas.forEach((peli, pos)=>{
            resultado.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <img src="${peli.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${peli.titulo}</h5>
                        <p class="card-text">${peli.lanzamiento} - ${peli.genero}</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            `;
        });
    }).catch((error)=>console.log(error))
}