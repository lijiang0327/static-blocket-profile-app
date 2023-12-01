import { useState } from 'react';
import storage from '../utils/storage';

const ProfileDataKey = 'profile-data';

const useProfileData = () => {
  const [profileData, setData] = useState(storage.get(ProfileDataKey) ?? { name: '', email: '', phoneNumber: '' });

  const setProfileData = (data) => {
    try {
      storage.set(ProfileDataKey, data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    profileData,
    setProfileData,
  };
};

export default useProfileData;
