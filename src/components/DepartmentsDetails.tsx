import React, { useEffect, useState } from 'react';
import { Box, Text, Link, Flex, Image } from '@chakra-ui/react';
import Navbar from './Navbar';
import DetailedCard from './DetailedCard';
import Modal from './Modal'
import { BASE_URL } from '../constants/Constants';
import { useRouter } from 'next/router';
import axios from 'axios';


interface dataItemProp {
  name: string
  type: string
}

const DepartmentDetails = () => {
  const router = useRouter()
  const { id } = router.query;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/processos`)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  let departmentInfo: any = {}
  
  switch(id){
    case 'futebol':
      departmentInfo = { name: 'Futebol', img: "/assets/soccer.png", imgRemoved: "/assets/soccerRemoved.png" }
      break
    
    case 'medicina':
      departmentInfo = { name: 'Medicina', img: "/assets/medicine.png", imgRemoved: "/assets/medicineRemoved.png" }
      break
    
    case 'base':
      departmentInfo = { name: 'Base', img: "/assets/base.png", imgRemoved: "/assets/baseRemoved.png" }
      break
 
    case 'finanças':
      departmentInfo = { name: 'Finanças', img: "/assets/finances.png", imgRemoved: "/assets/financesRemoved.png"}
      break
    
    case 'marketing':
      departmentInfo = { name: 'Marketing', img: "/assets/marketing.png", imgRemoved: "/assets/marketingRemoved.png" }
      break
    
    case 'socialmedia':
      departmentInfo = { name: 'Comunicação', img: "/assets/socialmedia.png", imgRemoved: "/assets/socialmediaRemoved.png" }
      break
    
    default: 
      break
  }


  const close = () => {
    setModalIsOpen(false);
  };

  const updateNavbarPosition = () => {
    window.scrollY > 0 ? setNavbarFixed(true) : setNavbarFixed(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateNavbarPosition);
    return () => {
      window.removeEventListener('scroll', updateNavbarPosition);
    };
  }, []);

  const [navbarFixed, setNavbarFixed] = useState(false);

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
      <Flex flexDirection='column' ml='10%' mr='6%' mt='50px' gap='50px'>
        <Flex justifyContent='space-between'>
          <Flex flexDirection='column' marginTop='100px' gap='30px' width='50%'>
            <Text id='one' fontSize='28px' fontWeight='400'>
              Explore o Departamento de {departmentInfo.name} do FC Matheus
            </Text>
            <Text id='two' fontSize='16px' lineHeight='2em' fontWeight='300'>
              Bem-vindo ao centro de excelência do nosso clube. Aqui, abrimos as portas para você conhecer mais sobre o{' '}
              {departmentInfo.name} e sua contribuição vital para o nosso sucesso. Queremos que você se torne parte
              dessa história e entenda como cada departamento desempenha um papel fundamental no nosso clube.
            </Text>
            <Link href='#departmentDetailsDepartments' id='three' fontSize='18px' textDecoration='none' color='#2D2D2D' fontWeight='500'>
              Conheça o departamento!
            </Link>
          </Flex>
          <Image src={departmentInfo.imgRemoved} alt='torcedores comemorando' width='450px' height='500px' />
        </Flex>
        <Flex flexDirection='column' marginTop='50px' gap='40px'>
          <Flex justifyContent='space-between' marginRight='3.5%'>
            <Text id='title' fontSize='22px' fontWeight='400'>
              Nossas Atividades
            </Text>
            <Text id='addAct' fontSize='22px' fontWeight='400' onClick={() => setModalIsOpen(true)} cursor='pointer' _hover={{textDecoration:'underline'}}>
              Adicionar Atividade
            </Text>
          </Flex>
          {modalIsOpen ? (
            <Modal
              openModal={modalIsOpen}
              onClose={close}
              title='Nova Atividade'
              url={`${BASE_URL}/processos`}
              type={departmentInfo.name}
              method='post'
            />
          ) : (
            ''
          )}
          <Flex className='departmentDetailsDepartmentsGrid' gridTemplateColumns='repeat(3, 350px)' gridTemplateRows='repeat(2, 320px)' gap='55px' marginBottom='50px'>
            {data
              ? Object.values(data)
                  .map((val, index) =>({ ...val as dataItemProp, originalIndex: index }))
                  .filter((val) => val.type.toLowerCase() === id)
                  .map((val) => (
                    <DetailedCard img={departmentInfo.img} name={val.name} key={val.originalIndex} keyIdx={val.originalIndex} type={val.type} />
                  ))
              : ''}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DepartmentDetails;
