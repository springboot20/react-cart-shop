/** @format */

import React from 'react';
import { useFormik } from 'formik';
import CustomInput from '../inputField/CustomInput';
import { Axios } from '../../Api/Axios';
import { useAuth } from '../../util/AuthContext';
import { useUser } from '../../context/user/UserContext';
import Button from '../icon/Button';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
};

const ProfileForm = () => {
  const { token } = useAuth();
  const {
    user: { _id },
  } = useUser();

  const { handleSubmit, values, errors, touched, ...rest } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      console.log(values);
      await updateProfile(values);
    },
  });

  const updateProfile = async (values) => {
    try {
      const response = await Axios.patch(`/users/${_id}`, values, { header: { Authorization: `Bearer ${token?.accessToken}` } });
      const data = response.data;

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <CustomInput cls='mt-2' {...rest} label='First Name' />
        </fieldset>

        <Button type='submit' className='text-white px-8 py-4 bg-gray-800 rounded-lg hover:bg-gray-600'>
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
