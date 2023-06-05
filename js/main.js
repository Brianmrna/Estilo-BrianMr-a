class Producto{
    constructor(nombre,precio,cantidad,img){
        this.nombre = nombre.toUpperCase();
        this.precio = Number(precio);
        this.cantidad = parseInt(cantidad);
        this.img = img.toUpperCase();
    }
}
//DECLARACION DE VARIABLES

let catalogoFiltrado ="";
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
const catalogo = document.getElementById("catalogo");
const verCarrito= document.getElementById("verCarrito");
const modalContainer= document.getElementById("modalContainer");
const cantidadCarrito = document.querySelector(".cantidadCarrito");
const formulario = document.querySelector("#formulario");
const buscar = document.querySelector("#buscar");
const buscarNombre = (productos) =>{
    const texto = formulario.value.toLowerCase();
    catalogo.innerText = "";
    for(let product of productos){
        let nombre = product.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            contadorCarrito();
            let content = document.createElement("div");
            content.classList="producto d-flex flex-wrap justify-content-center col-5 col-lg-3";
            content.innerHTML =`
                <img class="img-fluid" src="${product.img}" alt="">
                <h2 class="producto_nombre col-12">${product.nombre}</h2>
                <p class="precio col-12">$${product.precio * product.cantidad}</p>
                
            `;
            catalogo.append(content);
        
            let comprar = document.createElement("button");
            comprar.className= "agregarCarrito col-12";
            comprar.innerText = "Agregar al carrito";
        
            content.append(comprar);
        
            comprar.addEventListener("click", ()=>{
                alertAddProduct();
                const productId = carrito.some((foundProduct)=>foundProduct.id === product.id);
                if(productId){
                    carrito.map((prod)=>{
                        if(prod.id === product.id){
                            prod.cantidad++;
                        }
                    });
                }
                else{
                    carrito.push({
                        id: product.id,
                        nombre: product.nombre,
                        img: product.img,
                        precio: product.precio,
                        cantidad: product.cantidad,
                    });
                }
                contadorCarrito();
                guardarSesion();
            });
        }
    }
    if(catalogo.innerHTML === ""){
        catalogo.innerHTML +=`
            <h2>Producto no encontrado...</h2>
        `;
    }
    
}

const contadorCarrito = () =>{
    if(carrito.length > 0){
        cantidadCarrito.style.display = "inline-block";
        cantidadCarrito.innerText = carrito.length;
    }
    else{
        cantidadCarrito.style.display = "none";
    }
}
const alertAddProduct = () =>{
    Toastify({
        text: "Añadido al carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){
            mostrarCarrito();
        } // Callback after click
      }).showToast();
}
const guardarSesion = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
const getProductos = async () => {
    const respuesta= await fetch("../products.json");
    const productos = await respuesta.json();
    buscarNombre(productos);
    formulario.addEventListener("keyup",() => buscarNombre(productos))
};
getProductos();

