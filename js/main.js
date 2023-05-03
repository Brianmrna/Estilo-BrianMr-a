//DECLARACION DE FUNCIONES
function menu(){
    let mensaje = "Lista de productos: ";
    for (let i = 1; i <= productos.length; i++) {
        mensaje +="\n"+ i + ") "+ productos[i-1].nombre +"  $"+productos[i-1].precio;
    }
    mensaje+= "\n" +(Number(productos.length) + 1)+") Ordenarar productos";
    mensaje+= "\n0) Finalizar ";
    return Number( esNum(mensaje));
}

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
function esNum(mensaje){
    while(true){
        let entrada =Number( prompt(mensaje));
        if(!isNaN(entrada) && entrada != null && entrada != "" || entrada == 0){
            return entrada;
        }
        else{
            alert("¡Ingrese un numero valido!");
            continue;
        }
    }
}
const sub_total = (precio,cantidad) =>  precio * cantidad;
function calcular_recargo(recargo){
    return (precio) => recargo*precio;
} 
class Producto{
    constructor(nombre,precio,stock){
        this.nombre = nombre.toUpperCase();
        this.precio = Number(precio);
        this.stock = parseInt(stock);
    }
}
//DECLARACION DE VARIABLES
let opcion = 0, cantidad = 0, precio = 0;
const productos=[
                {nombre:"Baño de Crema", precio: 10, stock:0},
                {nombre:"Tintura", precio: 36, stock: 0},
                {nombre:"Alizador", precio: 2, stock: 0},
                {nombre:"Gel", precio: 600, stock: 0},
            ]   
let total = 0, descuento=0, descuento_total=0;
let cant= [];
let precioIva= 0, precioVenta=0;
let lista="Lista de productos:";
const contraseña = "ESTILOPELU";
let clave;
let calcular_precio_venta = calcular_recargo(1.25);
let calcular_iva= calcular_recargo(1.21);
let nombre, stock = 0;




//Inicio del programa
while(true){
    //Reseteo las variables
    total = 0, descuento=0, descuento_total=0;
    cant = [];
    for (let i = 0; i < productos.length; i++) {
        cant.push(0);
    }
    lista="Lista de productos:";
    alert("¡Bienvenidos a Estilo-Tienda de productos de peluqueria!");
    opcion = Number( esNum("Para que desea ingresar a la pagina \n 1) Ingresar como comprador. \n 2) Ingresar como administrador. \n 3) Salir. \n (Responder con 1, 2 o 3)."));
    if(opcion == 1){
        while(true){
            opcion = menu()-1;
            if(opcion == (Number(productos.length) )){
                opcion = esNum("Ordenar busqueda  \n1) Por nombre A-Z.\n2) De Menor a Mayor precio.\n3) Cancelar.")
                if(opcion == 1){
                    ordenarNombre();
                }
                else if(opcion == 2){
                    ordenarPrecio();
                }
                else{
                    alert("Ordenamiento cancelado.")
                }
            }
            else if(!isNaN(productos[opcion]) && productos[opcion] != null && productos[opcion] != "" || opcion != -1){
                cantidad =Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
                precio = Number( sub_total(productos[opcion].precio,cantidad));
                total= total + precio;
                cant[opcion]= cant[opcion] + cantidad;
            }
           else if(opcion == -1){
                for (let i = 0; i < productos.length; i++) {
                    if(cant[i] > 0){
                        lista = lista + "\n ("+ cant[i] + ") Baño de crema.";
                        descuento = 0;
                        descuento = calc_descuento(productos[i].precio,cant[i]);
                        total = total - descuento;
                        descuento_total += descuento;
                    }
                }
            
                
                alert(lista+"\n Descuento mayorista: $"+descuento_total+"\n El total de la compra es: $" + total);

                opcion = esNum("¡Seleccione una opcion!\n 1)Finalizar compra.\n 2)Cancelar y volver a comprar.\n 3)Cancelar compra y salir.")
                if(opcion == 1 || opcion == 3){
                    alert("¡Gracias por utilizar nuestro servicio. Vuelva pronto!");
                    break;
                }
                else if(opcion == 2){
                    lista="Lista de productos:";
                    cant = [];
                    for (let i = 0; i < productos.length; i++) {
                        cant.push(0);
                    }
                    total = 0;
                    descuento_total = 0;
                    continue;
                }
            }
            else{
                alert("Opcion Invalida");
            }
        }
    }
    else if(opcion == 2){
        let y=4;
        while(y>0){
            clave = prompt("Ingrese la contraseña de administrador:\n'"+y+"' Intentos restantes.");
            if(clave.toUpperCase() == contraseña){
                clave = true;
                break;
            }
            else{
                y--;
                alert("Contraseña incorrecta. Intentos restantes: "+y);
                clave = false;
            }
        }
        if(clave == false){
            alert("Ha alcanzado el maximo numero de intentos. Redirigiendose al menu principal.");
        }
        while(clave == true){
            alert("¡Ha ingresado al modo administrador!\n Aqui puede agregar productos y/o actualizar los precios de sus productos ya cargados\n");
            opcion = Number (prompt("¿Que operacion desea realizar?: \n1) Actualizar precios.\n2) Cargar nuevos productos. \n3) Salir"));
            switch(opcion){
                case 1:
                    alert("A continuacion, ingrese el producto que quiera modificar su precio.")
                    opcion =Number(menu())-1;
                    precio = Number(esNum("Ingrese el nuevo precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    opcion = esNum("Calculo de nuevos precios:\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        productos[opcion].precio = precioVenta;
                        alert("El nuevo precio de venta es: $"+productos[opcion].precio);
                    }
                    else{
                        alert("Cancelando cambio de precio.")
                        break;
                    }
                    break;
                case 2:
                    alert("A continuacion se le pedira la informacion del nuevo producto.");
                    nombre = prompt("ingresa el nombre:")
                    precio = Number(esNum("Ingrese el precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    stock = Number(esNum("Numero de unidades que tiene en stock"));
                    opcion = esNum("Nuevo Producto:\n-Nombre: "+nombre+"\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n-Stock: "+stock+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        productos.push(new Producto(nombre,precio,stock));
                        alert("El nuevo producto ha sido cargado con exito:");
                    }
                    else{
                        alert("Cancelando alta de producto.")
                        break;
                    }
                    break;
                case 3:
                    alert("Lista de productos actualizada:" );
                    menu()
                    break;
                default:
                    alert("¡Opcion ingresada invalida!");
                    break;
            }
            if(opcion == 3){
                break;
            }
        }
    }
    else if( opcion == 3){
        break;
    }
    else{
        alert("Opcion ingresada invalida");
    }
}
