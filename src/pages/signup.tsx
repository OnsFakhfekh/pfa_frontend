import React, { useState } from 'react';
import { Option } from "antd/es/mentions";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Modal,
  DatePicker,
} from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { message } from 'antd';
import {remoteForm} from '@github/remote-form'
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
} from "@refinedev/react-router-v6";
import Ipatient from "interfaces";
import { useSelect } from '@pankod/refine-core';

 

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface SignupCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

//link form with backend and database?


  ///////////////////////////////////////////////////////////////////////////////////
/*const addUserHandler = async (patient ) => {
  console.log(patient);
  const request = {
    ...patient
  }
  const response = await axios.post("http://localhost:4000/patient/registerPatient", request)
}*/
 const addMed = async(e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/doctor/registerDoctor", {
        name: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        dateDeNaissance: e.target.DateNais.value,
        numTel: e.target.NumeroTel.value,
        Genre: e.target.Genre.value,
        adresse: e.target.address.value,
        specialite: e.target.Specialite.value,
        code: e.target.code_Doc.value,
      });
      alert("Successfully added")
    } catch (error) {
      alert("Please try again!")
      console.log(error);
    }
  }
  
  const addPat = async(e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/patient/registerPatient", {
        name: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        dateDeNaissance: e.target.DateNais.value,
        numTel: e.target.NumeroTel.value,
        Genre: e.target.Genre.value,
        code: e.target.code_Pat.value,
      });
      alert("Successfully added")
    } catch (error) {
      alert("Please try again!")
      console.log(error);
    }
  } 
   
  

  
   const addUser = async(g: any) => {
    g.preventDefault();
    const Role = g.target.Role.value;
    console.log(Role);
    try {
      if (Role === "Doctor") {
       await addMed(g);
     } else {
       await addPat(g);
     }
    } catch (error) {
      console.log(error);
    }
   
  }
  /////////////////////////////////////////////////////////////////////////////////

export const Signup: React.FC<SignupCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  
}) => {
  

  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="216">+216</Option>
        <Option value="33">+33</Option>
        <Option value="49">+49</Option>
      </Select>
    </Form.Item>
  );
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPat(e);
  }
  return (
    <Modal
      open={open}
      title="Créer un compte"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            addPat(values );
            
            
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
       //layout="vertical"
       form={form}
       onSubmitCapture={handleSubmit}
       name="signup"
       initialValues={{ gender: '', prefix: '+216', user: '' }}
       style={{ maxWidth: 600 }}
       scrollToFirstError
       action='/registerPatient'
       method='post'
       data-remote

      >
        <Form.Item name="full name" label="Nom et Prénom" rules={[{ required: true }]} >
          <Input id='username' type='text'    />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input id='email'  />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mot de passe"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password id= 'password'  />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmer mot de passe"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Numéro Tel."
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} id='NumeroTel' />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Genre"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select" id='Genre'>
            <option value=""></option >
            <option value="male">Homme</option >
            <option value="female">Femme</option >
          </Select>

        </Form.Item>
        <Form.Item
          name="date_birth"
          rules={[{ required: true, message: 'Please input your birth date' }]}
          label="Date de naissance"
        >
          <DatePicker id='DateNais' />
        </Form.Item>

        {/* <Form.Item name="age" label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
      <InputNumber />
       </Form.Item>*/}
        <Form.Item
          name="user"
          label="Vous etes"
          hasFeedback
          rules={[{ required: true, message: 'Please select !' }]}
        >
          <Select placeholder="Please select type user" id='Role'>
            <option  value=""></option >
            <option  value="doctor" >Docteur</option >
            <option  value="patient">Patient</option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.user !== currentValues.user}
        >
          {({ getFieldValue }) =>
            getFieldValue('user') === 'doctor' ? (
              <div>
                <Form.Item name="adress" label="adresse" rules={[{ required: true }]} >
                  <Input id='address' />
                </Form.Item>
                <Form.Item name="specialite" label="Spécialité" rules={[{ required: true }]}>
                  <Input id='Specialite'/>
                </Form.Item>
                <Form.Item name="code_Doc" label="code" rules={[{ required: true }, { pattern: /^\d{6}$/, message: 'Please enter a 6-digit number' }]}>
                  <Input id='code_Doc' />
                </Form.Item>
              </div>
            ) : getFieldValue('user') === 'patient' ? (
              <div>
                <Form.Item name="code_Pat" label="code" rules={[{ required: true }, { pattern: /^\d{6}$/, message: 'Please enter a 6-digit number' }]}>
                  <Input id='code_Pat' />
                </Form.Item>
              </div>
            ) : null
            
          }
        
        </Form.Item>
        <button type='submit' onClick={(e) => addPat(e)} > SignUp </button>
      </Form>
    </Modal>

  );

  
};

export default Signup