import React from 'react';
import { useState, useEffect } from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(){

const [productos, setProductos] = useState([]);
const [usuarios, setUsuarios] = useState([]);
const [categorias, setCategorias] = useState([]);
const [ultProducto, setUltProducto] = useState([]);
const [ultUsuario, setUltUsuario] = useState([]);
const [ultCategoria, setUltCategoria] = useState([]);


useEffect(() => {
    fetch("http://localhost:3001/api/products")
                        .then(response => response.json())
                        .then(productos => {
                            setProductos(productos)
                            setUltProducto(productos?.productos[productos.productos.length - 1]);// ultimo producto
                        }).then(
    fetch("http://localhost:3001/api/users")
                        .then(response => response.json())
                        .then(usuarios => {
                            setUsuarios(usuarios)
                            setUltUsuario(usuarios?.usuarios[usuarios.usuarios.length - 1]);// ultimo usuario
                        })).then(
    fetch("http://localhost:3001/api/products/categorys")
                        .then(response => response.json())
                        .then(categorias => {
                            setCategorias(categorias)
                            setUltCategoria(categorias?.data[categorias.data.length - 1]);// ultima categoria
                        }))
}, []);


let productsInDB = {
    title: 'Productos en Data Base',
    color: 'primary', 
    cuantity: productos?.productos?.length,
    icon: 'fa-clipboard-list'
}
let totalUsuarios = {
    title:'Total de usuarios', 
    color:'success', 
    cuantity: usuarios?.usuarios?.length,
    icon:'fa-user-check'
}

let totalCategorias = {
    title:'total de categorias' ,
    color:'warning',
    cuantity: categorias?.data?.length,
    icon:'fa-sharp fa-solid fa-barcode'
}
let ultimoProducto = {
    title:'Ultimo producto agregado' ,
    color:'primary',
    cuantity: ultProducto.name,
    icon: 'fa-clipboard-list'
}
let ultimoUsuario = {
    title:'Ultimo usuario agregado' ,
    color:'success',
    cuantity: ultUsuario.last_name + ' ' + ultUsuario.name,
    icon: 'fa-sharp fa-solid fa-user-check'
}
let ultimaCategoria = {
    title:'Ultima categoria agregada' ,
    color:'warning',
    cuantity: ultCategoria.name,
    icon:'fa-sharp fa-solid fa-barcode'
}
let cartProps = [productsInDB, totalUsuarios, totalCategorias, ultimoProducto, ultimoUsuario, ultimaCategoria];

    return (
        <>
        <br />
        <br />
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}

        </div>
        </>
        
    )
}

export default ContentRowMovies;