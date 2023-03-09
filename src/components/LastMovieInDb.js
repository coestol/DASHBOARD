import React from "react";
import TopBar from './TopBar';
import ContentRowTop from './ContentRowTop';
import Footer from './Footer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#858796',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function LastMovieInDb(){
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    let productosCat1 = []
    let productosCat2 = []

    for (let i = 0; i < productos.length; i++) {
      if(productos[i].id_category == 1){
        productosCat1.push(productos[i])
      }
      if(productos[i].id_category == 2){ 
        productosCat2.push(productos[i])
      }
    } 
    useEffect(() => {
      fetch("http://localhost:3001/api/products")
        .then(response => response.json())
        .then(productos => {
          setProductos(productos.productos)
        })
        .then(
            fetch("http://localhost:3001/api/products/categorys")
        .then(response => response.json())
        .then(categorias => {
            setCategorias(categorias.data)
        }))
    }, []);

    return (
      <React.Fragment>
        {/*<!-- Content Wrapper -->*/}
        <div id="content-wrapper" className="d-flex flex-column">
          {/*<!-- Main Content -->*/}
          <div id="content">
            <TopBar />
            <div className="container-fluid">
              <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Gastronomia Bella vista - Detalle categorias</h1>
              </div>
  
              {/*<!-- Content Row Movies-->*/}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Id Categoria</StyledTableCell>
                      <StyledTableCell align="center">Nombre categoria</StyledTableCell>
                      <StyledTableCell align="center">Cantidad de productos</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      categorias.map((categoria) => (
                        <TableRow>
                          <TableCell align="center">{categoria.id_category}</TableCell>
                          <TableCell align="center">{categoria.name}</TableCell>
                          {
                            <TableCell align="center">{categoria.id_category == 1 ? productosCat1.length : productosCat2.length  }</TableCell>
                          }
                        </TableRow>
                      ))
                    }
                    
                  </TableBody>
                </Table>
              </TableContainer>
  
            </div>
            <Footer />
          </div>
        </div>
      </React.Fragment>
  
    );
  }

export default LastMovieInDb;
