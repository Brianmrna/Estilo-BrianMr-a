
const mostrarCarrito = () => {
    modalContainer.innerHTML ="";
    modalContainer.style.display = "flex";
    const modalHeader= document.createElement("div");
    modalHeader.classList = "modal_header";
    modalHeader.innerHTML =`
        <h1 class = modal_header_titulo  >Tu Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton= document.createElement("h1");
    modalButton.classList="modal_header_button ";
    modalButton.innerHTML="x";

    modalButton.addEventListener("click",()=>{
        modalContainer.style.display= "none";
    });

    modalHeader.append(modalButton);

    const listadoCarrito = document.createElement("scroll-container");
    listadoCarrito.className = "listado_carrito";
    carrito.forEach((producto)=>{
        const carritoContent= document.createElement("div");
        carritoContent.className ="carrito_content row";
        carritoContent.innerHTML=`
        <img class="img-fluid col-2" src="${producto.img}" alt="">
        <h2 class="col-4">${producto.nombre}</h2>
        <p class="col-4">$ ${producto.precio}</p>
        `;
        modalContainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerHTML = "❌";
        eliminar.className="eliminar_producto col-2";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click",() => {eliminar_producto(producto.id)});
    });

    total = carrito.reduce((acc,product)=>acc+ product.precio,0);

    const totalContent= document.createElement("div");
    totalContent.className ="total_carrito row";
    totalContent.innerHTML=`
    <h3 class="col-6"> Total =</h3>
    <p>$ ${total}</p>
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