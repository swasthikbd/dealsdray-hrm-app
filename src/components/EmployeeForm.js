import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/employee/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => setEmployee(response.data))
      .catch(error => console.error('Error fetching employee:', error));
    }
  }, [id]);

  const initialValues = employee || {
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    imageUrl: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    mobile: Yup.number().required('Required'),
    designation: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    course: Yup.array().of(Yup.string()).required('Required'),
    imageUrl: Yup.string().required('Required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const url = id 
      ? `http://localhost:5000/api/employee/${id}`
      : 'http://localhost:5000/api/employee';
    const method = id ? 'put' : 'post';

    axios({ 
      method, 
      url, 
      data: values, 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setSubmitting(false);
      history.push('/employee');
    })
    .catch(error => {
      console.error(`Error ${id ? 'updating' : 'creating'} employee:`, error);
      setSubmitting(false);
    });
  };

  return (
    <div>
      <center>
        <h2>{id ? 'Edit' : 'Create'} Employee</h2>
        <Formik 
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleSubmit} 
          enableReinitialize
        >
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="mobile">Mobile</label>
              <Field name="mobile" type="text" />
              <ErrorMessage name="mobile" />
            </div>
            <div>
              <label htmlFor="designation">Designation</label>
              <Field name="designation" as="select">
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </Field>
              <ErrorMessage name="designation" />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <Field name="gender" as="select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" />
            </div>
            <div>
              <label htmlFor="course">Course</label>
              <Field name="course" as="select" multiple>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="BSC">BSC</option>
              </Field>
              <ErrorMessage name="course" />
            </div>
            <div>
              <label htmlFor="imageUrl">Image URL</label>
              <Field name="imageUrl" type="text" />
              <ErrorMessage name="imageUrl" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </center>
    </div>
  );
};

export default EmployeeForm;
