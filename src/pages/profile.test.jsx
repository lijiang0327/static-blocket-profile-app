import { render, screen, waitFor, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';

import useProfileData from '../hooks/use-profile-data';
import ProfilePage from './profile';

describe('profile page', () => {
  let Wrapper;

  beforeEach(async () => {
    // eslint-disable-next-line react/prop-types, func-names
    Wrapper = function ({ children }) {
      return <ChakraProvider>{children}</ChakraProvider>;
    };

    await render(
      <Wrapper>
        <ProfilePage />
      </Wrapper>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render page correctly', async () => {
    await waitFor(() => {
      const profilePageTitle = screen.getByTestId('profile-title');
      expect(profilePageTitle).toHaveTextContent('Profile');

      const editButton = screen.getByTestId('profile-edit-button');
      expect(editButton).toBeInTheDocument();

      const saveButton = screen.queryByTestId('profile-save-button');
      expect(saveButton).toBeNull();

      const profileNameLabel = screen.getByTestId('profile-name-label');
      expect(profileNameLabel).toBeInTheDocument();

      const profileNameValue = screen.getByTestId('profile-name-value');
      expect(profileNameValue).toBeInTheDocument();

      const profileNameInput = screen.queryByTestId('profile-name-input');
      expect(profileNameInput).toBeNull();
    });
  });

  it('should render edit mode if the edit button was clicked', async () => {
    await waitFor(async () => {
      const editButton = screen.getByTestId('profile-edit-button');
      await userEvent.click(editButton);

      const saveButton = screen.getByTestId('profile-save-button');
      expect(saveButton).toBeInTheDocument();

      const profileNameValue = screen.queryByTestId('profile-name-value');
      expect(profileNameValue).toBeNull();

      const profileNameInput = screen.getByTestId('profile-name-input');
      expect(profileNameInput).toBeInTheDocument();
    });
  });

  it('should render error message if click the save button without fill in anything', async () => {
    await waitFor(async () => {
      const editButton = screen.getByTestId('profile-edit-button');
      await userEvent.click(editButton);

      const saveButton = screen.getByTestId('profile-save-button');
      await userEvent.click(saveButton);

      const nameErrorMessage = screen.getByTestId('profile-name-error-message');
      expect(nameErrorMessage).toBeInTheDocument();
      expect(nameErrorMessage).toHaveTextContent('Name is required');

      const emailErrorMessage = screen.getByTestId('profile-email-error-message');
      expect(emailErrorMessage).toBeInTheDocument();
      expect(emailErrorMessage).toHaveTextContent('Email is required');

      const phoneNumberErrorMessage = screen.getByTestId('profile-phone-number-error-message');
      expect(phoneNumberErrorMessage).toBeInTheDocument();
      expect(phoneNumberErrorMessage).toHaveTextContent('Phone number is required');
    });
  });

  it('should render error message if the input value is invalid', async () => {
    await waitFor(async () => {
      const user = userEvent.setup();

      const editButton = screen.getByTestId('profile-edit-button');
      await user.click(editButton);

      const profileNameInput = screen.getByTestId('profile-name-input');
      const profileEmailInput = screen.getByTestId('profile-email-input');
      const profilePhoneNumberInput = screen.getByTestId('profile-phone-number-input');

      await user.type(profileNameInput, 'Alice');
      await user.type(profileEmailInput, 'alice');
      await user.type(profilePhoneNumberInput, 'abc');

      const saveButton = screen.getByTestId('profile-save-button');
      await user.click(saveButton);

      const nameErrorMessage = screen.queryByTestId('profile-name-error-message');
      expect(nameErrorMessage).toBeNull();

      const emailErrorMessage = screen.getByTestId('profile-email-error-message');
      expect(emailErrorMessage).toBeInTheDocument();
      expect(emailErrorMessage).toHaveTextContent('Invalid email format');

      const phoneNumberErrorMessage = screen.getByTestId('profile-phone-number-error-message');
      expect(phoneNumberErrorMessage).toBeInTheDocument();
      expect(phoneNumberErrorMessage).toHaveTextContent('Invalid phone number format');
    });
  });

  it('should save value and render show mode if click the save button with correct input value', async () => {
    const user = userEvent.setup();

    const editButton = screen.getByTestId('profile-edit-button');
    await user.click(editButton);

    const profileNameInput = screen.getByTestId('profile-name-input');
    const profileEmailInput = screen.getByTestId('profile-email-input');
    const profilePhoneNumberInput = screen.getByTestId('profile-phone-number-input');

    await user.type(profileNameInput, 'Alice');
    await user.type(profileEmailInput, 'alice@gmail.com');
    await user.type(profilePhoneNumberInput, '19999999999');

    const saveButton = screen.getByTestId('profile-save-button');
    await user.click(saveButton);

    expect(screen.queryByTestId('profile-save-button')).toBeNull();
    expect(screen.getByTestId('profile-edit-button')).toBeInTheDocument();

    const profileNameValue = screen.getByTestId('profile-name-value');
    expect(profileNameValue).toBeInTheDocument();
    expect(profileNameValue).toHaveTextContent('Alice');
    expect(screen.queryByTestId('profile-name-input')).toBeNull();

    const profileEmailValue = screen.getByTestId('profile-email-value');
    expect(profileEmailValue).toBeInTheDocument();
    expect(profileEmailValue).toHaveTextContent('alice@gmail.com');
    expect(screen.queryByTestId('profile-email-input')).toBeNull();

    const profilePhoneNumberValue = screen.getByTestId('profile-phone-number-value');
    expect(profilePhoneNumberValue).toBeInTheDocument();
    expect(profilePhoneNumberValue).toHaveTextContent('19999999999');
    expect(screen.queryByTestId('profile-email-input')).toBeNull();
  });
});

describe('render profile page with data', () => {
  it('should render the profile data if it has been saved', async () => {
    const { result } = renderHook(useProfileData);

    await waitFor(async () => {
      await new Promise((resolve) => {
        result.current.setProfileData({
          name: 'Bob',
          email: 'bob@gmail.com',
          phoneNumber: '17777777777',
        });

        setTimeout(resolve, 10);
      });

      await render(
        <ChakraProvider>
          <ProfilePage />
        </ChakraProvider>
      );

      const profileNameValue = screen.getByTestId('profile-name-value');
      expect(profileNameValue).toBeInTheDocument();
      expect(profileNameValue).toHaveTextContent('Bob');

      const profileEmailValue = screen.getByTestId('profile-email-value');
      expect(profileEmailValue).toBeInTheDocument();
      expect(profileEmailValue).toHaveTextContent('bob@gmail.com');

      const profilePhoneNumberValue = screen.getByTestId('profile-phone-number-value');
      expect(profilePhoneNumberValue).toBeInTheDocument();
      expect(profilePhoneNumberValue).toHaveTextContent('17777777777');
    });
  });
});
