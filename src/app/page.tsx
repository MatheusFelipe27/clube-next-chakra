'use client'

import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link'; // Importe o NextLink em vez de Link do next.js
import { Image } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Departments from '../components/Departments';

const Home = () => {
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

  useEffect(() => {
    if (navbarFixed) {
      document.getElementsByTagName('nav')[0].style.background = '#2D2D2D';
    } else {
      document.getElementsByTagName('nav')[0].style.background = '#F7F4EE';
    }
  }, [navbarFixed]);

  return (
    <>
      <Navbar />
      <Box marginTop="50px" marginLeft="10%" marginRight="6%" flexDirection="column" gap="50px">
        <Flex  id="homeInitial" justifyContent="space-between">
          <Box display= "flex" width="50%" marginTop="100px" flexDirection="column" gap="30px">
            <Text id="one" fontSize="28px" fontWeight="400">
              Explore o FC Matheus - Fique Por Dentro de Tudo!
            </Text>
            <Text id="two" fontSize="16px" lineHeight="2em" fontWeight="300">
              Bem-vindo ao coração pulsante do <strong>FC Matheus</strong>! Aqui, oferecemos a você uma porta de entrada
              para o mundo emocionante do nosso clube de futebol. Queremos que você se torne parte da nossa história, e a
              melhor maneira de fazer isso é ficando por dentro de tudo o que acontece dentro e ao redor do nosso clube.
            </Text>
            <ChakraLink href="#homeDepartments" id="three" fontSize="18px" textDecoration="none" color="#2D2D2D" fontWeight="500">
              Conheça o FC Matheus: Viva a Emoção!
            </ChakraLink>
          </Box>
          <Image src="/assets/football.jpg" alt="torcedores comemorando" width="450px" height="500px"  />
        </Flex>

        <Flex id="homeDepartments" flexDirection="column" marginTop="50px" gap="40px">
          <Text id="title" fontSize="22px" fontWeight="400">
            Nossos departamentos
          </Text>
          <Flex display="grid" gridTemplateColumns="repeat(3, 350px)" gap="55px" mb="50px">
            <NextLink href="/futebol" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Futebol" img="/assets/soccer.png" />
              </ChakraLink>
            </NextLink>
            <NextLink href="/medicina" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Medicina" img="/assets/medicine.png" />
              </ChakraLink>
            </NextLink>
            <NextLink href="/base" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Categoria de base" img="/assets/base.png" />
              </ChakraLink>
            </NextLink>
            <NextLink href="/finanças" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Finanças" img="/assets/finances.png" />
              </ChakraLink>
            </NextLink>
            <NextLink href="/marketing" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Marketing" img="/assets/marketing.png" />
              </ChakraLink>
            </NextLink>
            <NextLink href="/comunicação" passHref>
              <ChakraLink style={{ textDecoration: 'none', color: 'inherit' }}>
                <Departments name="Comunicação" img="/assets/socialmedia.png" />
              </ChakraLink>
            </NextLink>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Home;
