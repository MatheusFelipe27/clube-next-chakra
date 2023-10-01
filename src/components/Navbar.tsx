"use client"

import React, { useEffect, useState } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Navbar = () => {
    const [navbarFixed, setNavbarFixed] = useState<boolean>(false);

    const updateNavbarPosition = () => {
      window.scrollY > 0 ? setNavbarFixed(true) : setNavbarFixed(false);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', updateNavbarPosition);
      return () => {
        window.removeEventListener('scroll', updateNavbarPosition);
      };
    }, []);
  
    return (
      <Box as="nav">
        <Flex
          w="100vw"
          h="60px"
          bg={navbarFixed ? 'rgb(45, 45, 45)' : '#F7F4EE'}
          color={navbarFixed ? 'white' : 'gray.700'}
          px="4"
          position="fixed"
          top="0"
          zIndex="1000"
          transition="background-color 0.3s, color 0.3s"
        >
          <Flex alignItems="center" justifyContent='space-between' w="100%" marginLeft="9%">
            <Flex alignItems="center">
              <img src="/assets/logo.png" alt="logo" width="70px" height="70px" />
              <Link href='/' _hover={{ textDecoration: "none" }} id={navbarFixed ? 'teamNameFixed' : 'teamName'} fontSize="22px" pt="6px" cursor="pointer" fontWeight="500">
                FC Matheus
              </Link>
            </Flex>
  
            <Flex gap="40px" marginRight="9% ">
              <Link href="#homeInitial" id={navbarFixed ? 'sectionsNameFixed' : 'sectionsName'} fontSize="18px" pt="7px">
                Inicio
              </Link>
              <Link href="#homeDepartments" id={navbarFixed ? 'sectionsNameFixed' : 'sectionsName'} fontSize="18px" pt="7px">
                Departamentos
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
}

export default Navbar