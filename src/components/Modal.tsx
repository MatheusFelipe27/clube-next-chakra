import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

interface ModalProps {
  openModal: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: string;
  method: string;
}

const MyModal= ({openModal, onClose, title, url, type, method}: ModalProps) => {
  const [isOpen] = useState<boolean>(openModal);
  const [name, setName] = useState<string>('');

  const closeModal = () => {
    onClose();
  };

  console.log(method)
  console.log(url)
  const add = () => {
    if (method === 'post') {
      url.includes('detalhes')
        ? axios
            .post(url, {
                detail: name,
              })
            .then(() => {
              console.log('Detalhe adicionado');
              onClose();
            })
            .catch((error) => {
              console.error(error);
            })
        : axios
            .post(url, {
                type: type,
                name: name,
              })
            .then(() => {
              console.log('Cadastro realizado!');
              onClose();
            })
            .catch((error) => {
              console.log(error);
            });
    } else {
      if (url.includes('detalhes')) {
        axios
          .put(url, {
              detail: name,
            })
          .then(() => {
            console.log('Detalhe atualizado com sucesso');
            onClose();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axios
          .put(url, {
              type: type,
              name: name,
            })
          .then(() => {
            console.log('Atividade atualizada com sucesso');
            onClose();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <>
        {isOpen?
            <Modal isOpen={openModal} onClose={closeModal} size="md">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={add}>
                  <Text color="#2D2D2D" marginBottom="1rem">
                    Nome:
                  </Text>
                  <Input
                    type="text"
                    name="nome"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <Button
                    colorScheme="blackAlpha"
                    type="submit"
                    marginTop="1rem"
                    width="100%"
                  >
                    Adicionar
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </ModalContent>
          </Modal>
          : ''
        }
    </>
  );
};

export default MyModal;
