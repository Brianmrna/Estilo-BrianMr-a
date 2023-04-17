//DECLARACION DE FUNCIONES
function menu(){
    return Number( esNum("Tienda de Productos. \n 1-Baño de crema $"+ producto1 +"\n 2-Tintura $" + producto2 + "\n 3-Matizador $" + producto3 + "\n 4-Gel $"+ producto4 + "\n 5-Terminar compra."));
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
        if(!isNaN(entrada) && entrada != null && entrada != ""){
            return entrada;
        }
        else{
            alert("¡Ingrese un numero valido!");
            continue;
        }
    }
}
const sub_total = (precio,cantidad) =>  precio * cantidad;
const calcular_iva = (precio) => precio*1.21 ;
const calcular_precio_venta = (precio) => precio * 1.25;

//DECLARACION DE VARIABLES
let opcion = 0, cantidad = 0, precio = 0;
let producto1 = 1050;
let producto2 = 360;
let producto3 = 2500;
let producto4 = 600;
let total = 0, descuento=0, descuento_total=0;
let cant1=0,cant2=0,cant3=0,cant4=0;
let precioIva= 0, precioVenta=0;
let lista="Lista de productos:";
const contraseña = "ESTILOPELU";
let clave;


//Inicio del programa
while(true){
    //Reseteo las variables
    total = 0, descuento=0, descuento_total=0;
    cant1=0,cant2=0,cant3=0,cant4=0;
    lista="Lista de productos:";
    alert("¡Bienvenidos a Estilo-Tienda de productos de peluqueria!");
    opcion = Number( esNum("Para que desea ingresar a la pagina \n 1) Ingresar como comprador. \n 2) Ingresar como administrador. \n 3) Salir. \n (Responder con 1, 2 o 3)."));
    if(opcion == 1){
        while(true){
            opcion = menu();
            switch(opcion){
                case 1:
                    cantidad =Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
                    precio = Number( sub_total(producto1,cantidad));
                    total= total+ precio;
                    cant1 = cant1 + cantidad;
                    break;
                case 2:
                    cantidad = Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
                    precio = Number( sub_total(producto2,cantidad));
                    total= total + precio;
                    cant2 = cant2 + cantidad;
                    break;
                case 3:
                    cantidad = Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
                    precio = Number( sub_total(producto3,cantidad));
                    total= total + precio;
                    cant3 = cant3 + cantidad;
                    break;
                case 4:
                    cantidad = Number( esNum("¿Que cantidad desea comprar?\n (Llevando más de 5 productos obtenes una bonificacion del 10%)"));
                    precio = Number( sub_total(producto4,cantidad));
                    total= total + precio;
                    cant4 = cant4 + cantidad;
                    break;
                case 5:
                    if(cant1 > 0){
                        lista = lista + "\n ("+ cant1 + ") Baño de crema.";
                        descuento = 0;
                        descuento = calc_descuento(producto1,cant1);
                        total = total - descuento;
                        descuento_total += descuento;
                    }
                    if(cant2 > 0){
                        lista = lista + "\n ("+ cant2 + ") Tintura." ;
                        descuento = 0;
                        descuento = calc_descuento(producto2,cant2);
                        total = total - descuento;
                        descuento_total += descuento;
                    }
                    if(cant3 > 0){
                        lista = lista + "\n ("+ cant3 + ") Matizador." ;
                        descuento = 0;
                        descuento = calc_descuento(producto3,cant3);
                        total = total - descuento;
                        descuento_total += descuento;
                    }
                    if(cant4 > 0){
                        lista = lista + "\n ("+ cant4 + ") Gel." ;
                        descuento = 0;
                        descuento = calc_descuento(producto4,cant4);
                        total = total - descuento;
                        descuento_total += descuento;
                    }
                    alert(lista+"\n Descuento mayorista: $"+descuento_total+"\n El total de la compra es: $" + total);
                    break;
                default:
                    alert("¡Opcion ingresada invalida!");
                    break;
            }
            if(opcion == 5){
                opcion = esNum("¡Seleccione una opcion!\n 1)Finalizar compra.\n 2)Cancelar y volver a comprar.\n 3)Cancelar compra y salir.")
                if(opcion == 1 || opcion == 3){
                    alert("¡Gracias por utilizar nuestro servicio. Vuelva pronto!");
                    break;
                }
                else if(opcion == 2){
                    lista="Lista de productos:";
                    cant1=0,cant2=0,cant3=0,cant4=0;
                    total = 0;
                    descuento_total = 0;
                    continue;
                }
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
            alert("¡Ha ingresado al modo administrador!\n Aqui puede actualizar los precios de sus productos\n");
            opcion = menu();
            switch(opcion){
                case 1:
                    precio = Number(esNum("Ingrese el nuevo precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    opcion = esNum("Calculo de nuevos precios:\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        producto1 = precioVenta;
                        alert("El nuevo precio de venta es: $"+producto1);
                    }
                    else{
                        break;
                    }
                    break;
                case 2:
                    precio = Number(esNum("Ingrese el nuevo precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    opcion = esNum("Calculo de nuevos precios:\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        producto1 = precioVenta;
                        alert("El nuevo precio de venta es: $"+producto2);
                    }
                    else{
                        break;
                    }

                    break;
                case 3:
                    precio = Number(esNum("Ingrese el nuevo precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    opcion = esNum("Calculo de nuevos precios:\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        producto1 = precioVenta;
                        alert("El nuevo precio de venta es: $"+producto3);
                    }
                    else{
                        break;
                    }
                    break;
                case 4:
                    precio = Number(esNum("Ingrese el nuevo precio de costo del producto:"));
                    precioIva = calcular_iva(precio);
                    precioVenta = calcular_precio_venta(precioIva);
                    opcion = esNum("Calculo de nuevos precios:\nPrecio de costo: $"+precio+"\nPrecio +IVA: $"+precioIva+"\nPrecio de venta sugerido: $"+precioVenta+"\n¿Desea confirmar cambios?\n1) Si\n2) No");
                    if(opcion==1){
                        producto1 = precioVenta;
                        alert("El nuevo precio de venta es: $"+producto4);
                    }
                    else{
                        break;
                    }
                    break;
                case 5:
                    alert("Lista de precios actualizada: \n 1-Baño de crema $"+ producto1 +"\n 2-Tintura $" + producto2 + "\n 3-Matizador $" + producto3 + "\n 4-Gel $"+ producto4 );
                    break;
                default:
                    alert("¡Opcion ingresada invalida!");
                    break;
            }
            if(opcion == 5){
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

