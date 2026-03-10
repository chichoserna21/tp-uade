"use strict"; 

//logica de navegacion

function navegar(seccion) {
    //ocultar todas las secciones
    document.getElementById('seccion-inicio').style.display = 'none';
    document.getElementById('seccion-nosotros').style.display = 'none';
    document.getElementById('seccion-contacto').style.display = 'none';
    document.getElementById('seccion-faq').style.display = 'none';

    //resetear estilo de botones
    document.getElementById('btn-inicio').className = '';
    document.getElementById('btn-nosotros').className = '';
    document.getElementById('btn-contacto').className = '';
    document.getElementById('btn-faq').className = '';

    //seccion elegida
    if (seccion === 'inicio') {
        document.getElementById('seccion-inicio').style.display = 'block';
        document.getElementById('btn-inicio').className = 'nav-active';
        document.body.className = ''; 
    } else if (seccion === 'nosotros') {
        document.getElementById('seccion-nosotros').style.display = 'block';
        document.getElementById('btn-nosotros').className = 'nav-active';
        document.body.className = 'fondo-nosotros'; 
    } else if (seccion === 'contacto') {
        document.getElementById('seccion-contacto').style.display = 'block';
        document.getElementById('btn-contacto').className = 'nav-active';
        document.body.className = '';
    } else if (seccion === 'faq') {
        document.getElementById('seccion-faq').style.display = 'block';
        document.getElementById('btn-faq').className = 'nav-active';
        document.body.className = '';
    }
//resetear el scroll
    window.scrollTo(0, 0);
}

function irASeccion(idCategoria) {
    navegar('inicio');
    const elementoDestino = document.getElementById(idCategoria);
    
    if (elementoDestino) {
        setTimeout(function() {
            //scroll al elemento
            elementoDestino.scrollIntoView({ behavior: 'smooth' });
        }, 10);
    }
}

function toggleRespuesta(idRespuesta) {
    const respuesta = document.getElementById(idRespuesta);
    if (respuesta.style.display === 'none') {
        respuesta.style.display = 'block'; 
    } else {
        respuesta.style.display = 'none';  
    }
}


//logica productos

//arrays objetos
const productosVerano = [
    { imagen: "imagenes/savage.jpg", alt: "Perfume Dior Sauvage", nombre: "Sauvage Elixir", marca: "Dior", precio: "$175.000" },
    { imagen: "imagenes/erbapure.jpg", alt: "Perfume Erba pura", nombre: "Erba Pura", marca: "Xerjoff", precio: "$352.000" },
    { imagen: "imagenes/vip212.jpg", alt: "Perfume 212 VIP", nombre: "212 VIP Rosé", marca: "Carolina Herrera", precio: "$138.000" },
    { imagen: "imagenes/channel.jpg", alt: "Perfume Chanel tucan", nombre: "Channel tucan", marca: "Chanel", precio: "$125.000" }
];

const productosInvierno = [
    { imagen: "imagenes/scandal.jpg", alt: "Perfume scandal", nombre: "Scandal", marca: "Jean Paul Gaultier", precio: "$188.000" },
    { imagen: "imagenes/perfudiego.jpg", alt: "Perfume maradona", nombre: "Star fragance", marca: "Maradona", precio: "$235.000" },
    { imagen: "imagenes/tomfrod.jpg", alt: "Perfume tom ford", nombre: "Tuscan Leather", marca: "Tom ford", precio: "$290.000" },
    { imagen: "imagenes/swy.jpg", alt: "Perfume stronger with you", nombre: "Stroger With You", marca: "Armani", precio: "$177.000" }
];

const productosSale = [
    { imagen: "imagenes/invictus.jpg", alt: "Perfume invictus", nombre: "Invictus Elixir", marca: "Rabanne", precio: "$72.000" },
    { imagen: "imagenes/onemillon.jpg", alt: "Perfume onemillon", nombre: "One millon", marca: "Rabanne", precio: "$85.000" },
    { imagen: "imagenes/cklalo.jpg", alt: "Perfume calvin klein lalo", nombre: "Ck black", marca: "Calvin klein", precio: "$60.000" },
    { imagen: "imagenes/perfugian.jpg", alt: "Perfume LIGHT BLUE CAPRI IN LOVE", nombre: "LIGHT BLUE CAPRI IN LOVE", marca: "DOLCE&GABBANA", precio: "$112.000" }
];

function cargarProductos(idContenedor, arrayDeProductos) {
    const contenedor = document.querySelector(idContenedor + " .productos-grid");
    if (!contenedor) return;

    contenedor.innerHTML = ""; 

    for (let i = 0; i < arrayDeProductos.length; i++) {
        const producto = arrayDeProductos[i];
        
        const productoCard = document.createElement("div");
        
        productoCard.className = "producto-card";
        
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.alt}">
            <h3>${producto.nombre}</h3>
            <p class="marca">${producto.marca}</p>
            <p class="precio">${producto.precio}</p>
        `;
        
        contenedor.appendChild(productoCard);
    }
}

//ejecutar funciones
cargarProductos("#verano", productosVerano);
cargarProductos("#invierno", productosInvierno);
cargarProductos("#sale", productosSale);


//logica de formulario

const form = document.querySelector("#formularioContacto");

if (form) { 
    const nombre = document.querySelector("#nombre");
    const email = document.querySelector("#email");
    const mensaje = document.querySelector("#mensaje");
    const mensajeExito = document.querySelector("#form-mensaje-exito");
    const formDescripcion = document.querySelector("#form-descripcion");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); //evita el envio por defecto
        
        resetearErrores();
        let esValido = true;

        //validacion basica
        if (nombre.value === "") { 
            mostrarError(nombre, "El nombre es obligatorio.");
            esValido = false;
        }

        if (email.value === "") { 
            mostrarError(email, "El email es obligatorio.");
            esValido = false;
        }

        // indexOf para validar texto
        if (email.value && email.value.toLowerCase().indexOf("@gmail") === -1) {
            mostrarError(email, "El email debe ser una cuenta de Gmail (contener @gmail).");
            esValido = false;
        }

        if (mensaje.value === "") { 
            mostrarError(mensaje, "El mensaje no puede estar vacío.");
            esValido = false;
        }

        if (esValido) {
            mensajeExito.textContent = "Se responderá en brevedad, gracias por comunicarte";
            mensajeExito.style.display = "block"; 
            form.style.display = "none"; 
            if(formDescripcion) formDescripcion.style.display = "none";
        }
    });

    function mostrarError(input, mensaje) {
        input.className = "error"; 
        
        //navegar al padre 
        const contenedor = input.parentNode; 
        
        const pError = contenedor.querySelector(".form-error-input");
        if(pError) {
            pError.textContent = mensaje;
            pError.style.display = "block"; 
        }
    }

    function resetearErrores() {
        
        const inputsConError = document.querySelectorAll(".form-grupo .error");
        for (let i = 0; i < inputsConError.length; i++) {
            inputsConError[i].className = ""; 
        }
        
        const mensajesError = document.querySelectorAll(".form-error-input");
        for (let i = 0; i < mensajesError.length; i++) {
            mensajesError[i].style.display = "none"; 
        }
        
        mensajeExito.style.display = "none";
    }
}