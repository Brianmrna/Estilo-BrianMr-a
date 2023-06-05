const mostrarCarrito = () => {
    modalContainer.innerHTML ="";
    modalContainer.style.display = "flex";
    const modalHeader= document.createElement("div");
    modalHeader.classList = "modal_header";
    modalHeader.innerHTML =`
        <h1 class = "modal_header_titulo">Tu Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton= document.createElement("h1");
    modalButton.classList="modal_header_button";
    modalButton.innerHTML=`<button type="button" class="btn-close btn-close-white" aria-label="Close"></button>`

    modalButton.addEventListener("click",()=>{
        modalContainer.style.display= "none";
    });

    modalHeader.append(modalButton);

    const listadoCarrito = document.createElement("div");
    listadoCarrito.className = "listado_carrito";
    carrito.forEach((producto)=>{
        const carritoContent= document.createElement("div");
        carritoContent.className ="carrito_content row";
        carritoContent.innerHTML=`
        <img class="img-fluid col-2" src="${producto.img}" alt="">
        <h2 class="col-3 lista_nombre">${producto.nombre}</h2>
        <div class="col-2 divCantidad">
            <span class="col-4 restar"> - </span>
            <span class="col-4 cantidad total">${producto.cantidad}</span>
            <span class="col-4 sumar"> + </span>
        </div>
        <p class="col-3 lista_precio">$ ${producto.precio * producto.cantidad}</p>
        `;
        modalContainer.append(carritoContent);

        let eliminar = document.createElement("p");
        eliminar.innerHTML = "❌";
        eliminar.className="eliminar_producto col-2 d-flex";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click",() => {
            producto.cantidad = 0;
            eliminar_producto(producto.id);
            contadorCarrito();
        });
        let restarProductos = carritoContent.querySelector(".restar");
        let sumarProductos = carritoContent.querySelector(".sumar");
        restarProductos.addEventListener("click", ()=>{
            if(producto.cantidad > 1){
                producto.cantidad--;
                mostrarCarrito();
                guardarSesion();
            }
        });
        sumarProductos.addEventListener("click", () =>{
            producto.cantidad++;
            mostrarCarrito();
            guardarSesion();
        });
    });

    total = carrito.reduce((acc,product)=>acc+ product.precio * product.cantidad,0);

    const totalContent= document.createElement("div");
    totalContent.className ="total_carrito row ";
    totalContent.innerHTML=`
    <h3 class="col-2 total"> Total =</h3>
    <h3 class="col-2 total">$ ${total}</h3>
    `;
    modalContainer.append(totalContent);
};
verCarrito.addEventListener("click",mostrarCarrito);

const eliminar_producto = (id) =>{
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((productoId) =>{   
        return productoId !== foundId;
    })
    mostrarCarrito();
    guardarSesion();
}