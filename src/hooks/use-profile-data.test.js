import { renderHook, waitFor } from '@testing-library/react';

import useProfileData from './use-profile-data';

describe('useProfileData', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get default profile data', () => {
    const {
      result: {
        current: { profileData },
      },
    } = renderHook(useProfileData);

    expect(localStorage.getItem).toBeCalled();
    expect(profileData).toStrictEqual({ name: '', email: '', phoneNumber: '' });
  });

  it('should get correct saved profile data', async () => {
    const { result } = renderHook(useProfileData);

    const data = { name: 'Alice', email: 'alice@gmail.com', phoneNumber: '18888888888' };

    await waitFor(async () => {
      await new Promise((resolve) => {
        result.current.setProfileData(data);

        setTimeout(resolve, 1);
      });

      expect(localStorage.setItem).toBeCalledWith('profile-app-profile-data', JSON.stringify(data));
      expect(result.current.profileData).toStrictEqual(data);
    });
  });
});
