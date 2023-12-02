import {
  Container,
  Box,
  Heading,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Avatar,
  IconButton,
  Flex,
  Text,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import useProfileData from '../hooks/use-profile-data';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, setProfileData } = useProfileData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      ...profileData,
    },
    mode: 'onChange',
  });

  const onSubmitHandler = handleSubmit((data) => {
    setProfileData(data);
  });

  const onSaveBtnClickHandler = async () => {
    const isValid = await trigger();

    if (isValid) {
      setIsEditing(false);
      onSubmitHandler();
    }
  };

  const onEditBtnClickHandler = () => {
    setIsEditing(true);
  };

  return (
    <Container margin="0 auto" padding={0} maxW="auto" w="100vw" h="100vh" backgroundColor="gray.50">
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
        <Heading as="h1" size="sm" margin={0} data-testid="profile-title">
          Profile
        </Heading>
        {!isEditing && (
          <IconButton
            data-testid="profile-edit-button"
            icon={<EditIcon />}
            isRound
            variant="empty"
            onClick={onEditBtnClickHandler}
          />
        )}
        {isEditing && (
          <IconButton
            data-testid="profile-save-button"
            icon={<CheckIcon />}
            isRound
            variant="empty"
            onClick={onSaveBtnClickHandler}
          />
        )}
      </Box>
      <Box pt={8} display="flex" data-testid="profile-avatar" alignContent="center" justifyContent="center">
        <Avatar name={profileData.name} />
      </Box>
      <Box px={12} py={8} display="flex" maxW="xl" marginX="auto" flexDirection="column" gap={4}>
        <FormControl isReadOnly={!isEditing} isRequired={isEditing} isInvalid={errors.name}>
          <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
            <FormLabel mb={0} data-testid="profile-name-label" border textAlign={['left', 'right']} minW={36}>
              Name:
            </FormLabel>
            {isEditing && (
              <Input data-testid="profile-name-input" {...register('name', { required: 'Name is required' })} />
            )}
            {!isEditing && (
              <Text
                borderBottom="1px solid #e4e4e4"
                data-testid="profile-name-value"
                lineHeight={10}
                h={10}
                width="100%"
                px={4}>
                {profileData.name}
              </Text>
            )}
          </Flex>
          {errors.name && (
            <FormErrorMessage data-testid="profile-name-error-message" justifyContent="center">
              {errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isReadOnly={!isEditing} isRequired={isEditing} isInvalid={errors.email}>
          <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
            <FormLabel mb={0} textAlign={['left', 'right']} minW={36}>
              Email:
            </FormLabel>
            {isEditing && (
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
                })}
                data-testid="profile-email-input"
              />
            )}
            {!isEditing && (
              <Text
                data-testid="profile-email-value"
                borderBottom="1px solid #e4e4e4"
                lineHeight={10}
                h={10}
                width="100%"
                px={4}>
                {profileData.email}
              </Text>
            )}
          </Flex>
          {errors.email && (
            <FormErrorMessage data-testid="profile-email-error-message" justifyContent="center">
              {errors.email.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isReadOnly={!isEditing} isRequired={isEditing} isInvalid={errors.phoneNumber}>
          <Flex alignItems={['flex-start', 'center']} flexDirection={['column', 'row']}>
            <FormLabel mb={0} textAlign={['left', 'right']} minW={36}>
              Phone Number:
            </FormLabel>
            {isEditing && (
              <Input
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: { value: /^[+]?[0-9]+$/, message: 'Invalid phone number format' },
                })}
                data-testid="profile-phone-number-input"
              />
            )}
            {!isEditing && (
              <Text
                data-testid="profile-phone-number-value"
                borderBottom="1px solid #e4e4e4"
                lineHeight={10}
                h={10}
                width="100%"
                px={4}>
                {profileData.phoneNumber}
              </Text>
            )}
          </Flex>
          {errors.phoneNumber && (
            <FormErrorMessage data-testid="profile-phone-number-error-message" justifyContent="center">
              {errors.phoneNumber.message}
            </FormErrorMessage>
          )}
        </FormControl>
      </Box>
    </Container>
  );
}

export default Profile;
