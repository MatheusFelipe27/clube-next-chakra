'use client'

import './../globals.css'
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import { Providers } from "../app/providers";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


interface DepartmentsProps {
    name: string
    image: string
}
const DepartmentsPage = ({name, image}: DepartmentsProps) => {
  return(
    
    <div className={inter.className}>
      <Providers>
        <Navbar/>
        <h2>{name}</h2>
      </Providers>
    </div>
  );
};

export const getStaticPaths : GetStaticPaths= () => {
  return {
    paths: [
      {
        params: {
          id: "futebol",
        },
      },
      {
        params: {
          id: "financas",
        },
      },
      {
        params: {
          id: "medicina",
        },
      },
      {
        params: {
          id: "socialmedia",
        },
      },
      {
        params: {
          id: "base",
        },
      },
      {
        params: {
          id: "marketing",
        },
      },
    ],
    fallback: true,
  };
}


export const getStaticProps : GetStaticProps<DepartmentsProps> = ({params}) => {
    if(params?.id==='futebol') return {props: {name: 'Futebol', image: ''}}
    if(params?.id==='base') return {props: {name: 'Categoria de base', image: ''}}
    if(params?.id==='marketing') return {props: {name: 'Marketing', image: ''}}
    if(params?.id==='socialmedia') return {props: {name: 'Comunicação', image: ''}}
    if(params?.id==='medicina') return {props: {name: 'Medicina', image: ''}}
    return {props: {name: 'Finanças', image: ''}}

}


export default DepartmentsPage;
