import {
  Container,
  Box,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const onSaveBtnClickHandler = () => {
    setIsEditing(false);
  };

  const onEditBtnClickHandler = () => {
    setIsEditing(true);
  };

  return (
    <Container margin="0 auto" padding={0} height="100vh" backgroundColor="gray.100">
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        margin={0}
        paddingX={8}
        paddingY={4}
        backgroundColor="gray.200"
        borderBottom="1px solid #ccc">
        <Heading as="h1" size="sm" margin={0}>
          Profile
        </Heading>
        {!isEditing && (
          <Button size="small" onClick={onEditBtnClickHandler}>
            Edit
          </Button>
        )}
        {isEditing && (
          <Button size="small" onClick={onSaveBtnClickHandler}>
            Save
          </Button>
        )}
      </Box>
      <Box padding={8}>
        <FormControl isReadOnly={!isEditing}>
          <FormLabel>Name:</FormLabel>
          <Input />
          <FormErrorMessage>aa</FormErrorMessage>
          <FormHelperText>help</FormHelperText>
        </FormControl>
      </Box>
    </Container>
  );
}

export default Profile;
