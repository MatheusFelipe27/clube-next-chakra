import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface DepartmentsProps {
  name: string;
  img: string;
}

const Departments = ({ name, img }: DepartmentsProps) => {
  return (
    <Box  display="flex" flexDirection="column" alignItems="center" backgroundColor="#FFFFFF">
      <Image src={img} alt={`imagem do departamento ${name}`} width="350px" height="250px" />
      <Text id="last" fontSize="22px" fontWeight="500" paddingBottom="25px">
        {name}
      </Text>
    </Box>
  );
};

export default Departments;
