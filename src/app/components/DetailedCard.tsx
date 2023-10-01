import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, Link, Image, IconButton, Tooltip } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal from './Modal';
import axios from 'axios';
import { BASE_URL } from '../../constants/Constants';


interface DetailedCardProps {
  img: string;
  name: string;
  keyIdx: number;
  type: string;
}

const DetailedCard= ({img,name,keyIdx,type}: DetailedCardProps) => {
  const [clickedDetails, setClickedDetails] = useState<boolean>(false);
  const [addDetails, setAddDetails] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [editDetail, setEditDetail] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const close = () => {
    setAddDetails(false);
    setEdit(false);
    setEditDetail(false);
    setEditingIndex(null);
  };

  const deleteProcess = () => {
    axios({
      method: 'delete',
      url: `${BASE_URL}/processos/${keyIdx}`,
    })
      .then(() => {
        console.log('deletado com sucesso');
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteDetail = (index: number) => {
    axios({
      method: 'delete',
      url: `${BASE_URL}/processos/${keyIdx}/detalhes/${index}`,
    })
      .then(() => {
        console.log('deletado com sucesso');
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const seeDetails = () => {
    setClickedDetails(!clickedDetails);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditDetail(true);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `${BASE_URL}/processos`,
    })
      .then((res) => {
        setData(res.data.filter((el: DetailedCardProps, index: number) => index === keyIdx));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box className="detailedCard" borderWidth="1px" borderRadius="lg" p="4" background="white" mb="4">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <IconButton
            aria-label="Edit Process"
            icon={<AiFillEdit />}
            size="sm"
            onClick={() => setEdit(true)}
          />
          {edit ? (
            <Modal
              openModal={edit}
              onClose={close}
              title="Editar Atividade"
              url={`${BASE_URL}/processos/${keyIdx}`}
              type={type}
              method="put"
            />
          ) : (
            ' '
          )}
          <IconButton
            aria-label="Delete Process"
            icon={<AiFillDelete />}
            size="sm"
            onClick={deleteProcess}
          />
        </Flex>
        <Image src={img} alt={`Imagem de ${name}`} width="350px" height="250px" />
      </Flex>
      <Text id="detailedName" fontSize="24px" fontWeight="500" textAlign="center" mt="4">
        {name}
      </Text>
      <Flex justifyContent="center" gap="10px" mt="4">
        <Text
          id="detailedInfo"
          fontSize="13px"
          fontWeight="500"
          cursor="pointer"
          onClick={() => setAddDetails(true)}
        >
          Adicionar detalhe
        </Text>
        {addDetails ? (
          <Modal
            openModal={addDetails}
            onClose={close}
            title="Adicionar detalhe"
            url={`${BASE_URL}/processos/${keyIdx}/detalhes`}
            type={type}
            method="post"
          />
        ) : (
          ''
        )}
        <Text
          id="detailedInfo"
          fontSize="13px"
          fontWeight="500"
          cursor="pointer"
          onClick={seeDetails}
        >
          Ver detalhes
        </Text>
      </Flex>
      {clickedDetails && (
        <Box mt="4">
          {data &&
            data[0].details.length > 0 &&
            data.map((val: any) =>
              val.details.map((detail: any, index: number) => (
                <Flex
                  key={index}
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid #b4b1aa"
                  pb="2"
                  pt="2"
                >
                  <Box>{detail}</Box>
                  <Box>
                    {editingIndex === index ? (
                      <Modal
                        openModal={editDetail}
                        onClose={close}
                        title="Editar detalhe"
                        url={`${BASE_URL}/processos/${keyIdx}/detalhes/${index}`}
                        type={type}
                        method="put"
                      />
                    ) : (
                      <>
                        <Tooltip label="Editar detalhe" hasArrow>
                          <IconButton
                            aria-label="Edit Detail"
                            icon={<AiFillEdit />}
                            size="sm"
                            onClick={() => startEditing(index)}
                          />
                        </Tooltip>
                        <Tooltip label="Deletar detalhe" hasArrow>
                          <IconButton
                            aria-label="Delete Detail"
                            icon={<AiFillDelete />}
                            size="sm"
                            onClick={() => deleteDetail(index)}
                          />
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </Flex>
              ))
            )}
          {data && data[0].details.length === 0 && <Text>Não há informações no momento!</Text>}
        </Box>
      )}
    </Box>
  );
};

export default DetailedCard;
