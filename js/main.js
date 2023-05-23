//DECLARACION DE FUNCIONES
function ordenarNombre(){
    productos.sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA > nombreB) {
            return 1;
        }
        if (nombreA < nombreB) {
            return -1;
        }
        return 0;
    });
}
function ordenarPrecio(){
    productos.sort((a,b)=>{return a.precio-b.precio;})
}
function calc_descuento (precio,cantidad) { 
    if(cantidad >= 5){
        return (precio*cantidad*0.1) ;   
    }
    return 0;
}
// function esNum(mensaje){
//     while(true){
//         let entrada =Number( prompt(mensaje));
//         if(!isNaN(entrada) && entrada != null && entrada != "" || entrada == 0){
//             return entrada;
//         }
//         else{
//             alert("¡Ingrese un numero valido!");
//             continue;
//         }
//     }
// }
const sub_total = (precio,cantidad) =>  precio * cantidad;
function calcular_recargo(recargo){
    return (precio) => recargo*precio;
} 

// class Producto{
//     constructor(nombre,precio,stock){
//         this.nombre = nombre.toUpperCase();
//         this.precio = Number(precio);
//         this.stock = parseInt(stock);
//     }
// }
//DECLARACION DE VARIABLES


let calcular_precio_venta = calcular_recargo(1.25);
let calcular_iva= calcular_recargo(1.21);
let catalogoFiltrado ="";
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
const catalogo = document.getElementById("catalogo");
const verCarrito= document.getElementById("verCarrito");
const modalContainer= document.getElementById("modalContainer");

// cambio el código HTML interno
productos.forEach((producto)=>{
    let content = document.createElement("div");
    content.classList="producto d-flex flex-wrap justify-content-center col-3";
    content.innerHTML =`
        <img class="img-fluid" src="${producto.img}" alt="">
        <h2 class="producto_nombre col-12">${producto.nombre}</h2>
        <p class="precio col-12">$${producto.precio}</p>
        
    `;

    catalogo.append(content);

    let comprar = document.createElement("button");
    comprar.className= "agregarCarrito col-12";
    comprar.innerText = "Agregar al carrito";

    content.append(comprar);

    comprar.addEventListener("click", ()=>{
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            img: producto.img,
            precio: producto.precio,
            stock: producto.stock,
        });
        guardarSesion();
        
    });
});

const guardarSesion = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
JSON.parse(localStorage.getItem("carrito"));

//Inicio del programa
// while(true){
//     //Reseteo las variables
//     total = 0, descuento=0, descuento_total=0;
//     cant = [];
//     for (let i = 0; i < productos.length; i++) {
//         cant.push(0);
//     }
//     lista="Lista de productos:";
//     if(opcion == 1){
//         while(true){
//             opcion = menu()-1;
//             if(opcion == (Number(productos.length) )){
//                 opcion = esNum("Ordenar busqueda  \n1) Por nombre A-Z.\n2) De Menor a Mayor precio.\n3) Cancelar.")
//                 if(opcion == 1){
//                     ordenarNombre();
//                 }
//                 else if(opcion == 2){
//                     ordenarPrecio();
//                 }
//                 else{
//                     alert("Ordenamiento cancelado.")
//                 }
//             }
//             else if(!isNaN(productos[opcion]) && productos[opcion] != null && productos[opcion] != "" || opcion != -1){
//                 cantidad =Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
//                 precio = Number( sub_total(productos[opcion].precio,cantidad));
//                 total= total + precio;
//                 cant[opcion]= cant[opcion] + cantidad;
//             }
//            else if(opcion == -1){
//                 for (let i = 0; i < productos.length; i++) {
//                     if(cant[i] > 0){
//                         lista = lista + "\n ("+ cant[i] + ") Baño de crema.";
//                         descuento = 0;
//                         descuento = calc_descuento(productos[i].precio,cant[i]);
//                         total = total - descuento;
//                         descuento_total += descuento;
//                     }
//                 }
            
                
//                 alert(lista+"\n Descuento mayorista: $"+descuento_total+"\n El total de la compra es: $" + total);

//                 opcion = esNum("¡Seleccione una opcion!\n 1)Finalizar compra.\n 2)Cancelar y volver a comprar.\n 3)Cancelar compra y salir.")
//                 if(opcion == 1 || opcion == 3){
//                     alert("¡Gracias por utilizar nuestro servicio. Vuelva pronto!");
//                     break;
//                 }
//                 else if(opcion == 2){
//                     lista="Lista de productos:";
//                     cant = [];
//                     for (let i = 0; i < productos.length; i++) {
//                         cant.push(0);
//                     }
//                     total = 0;
//                     descuento_total = 0;
//                     continue;
//                 }
//             }
//             else{
//                 alert("Opcion Invalida");
//             }
//         }
//     }
// }