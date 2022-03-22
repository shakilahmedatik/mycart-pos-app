import React from 'react'
import axios from 'axios'
import { Button, Form, Input, message, Row, Col } from 'antd'
import '../assets/styles/authentication.css'
import { Link } from 'react-router-dom'

const Register = () => {
  const onFinish = value => {
    axios
      .post('/api/user/register', value)
      .then(response => {
        console.log(response)
        message.success(response.data)
      })
      .catch(err => {
        console.log(err.response.data)
        message.error(err.response.data)
      })
  }
  return (
    <div className='authentication'>
      <Row>
        <Col lg={8} xs={22}>
          <Form layout='vertical' onFinish={onFinish}>
            <div className='text-center'>
              <h1>
                <b>MyCart POS</b>
              </h1>
              <hr />
              <h3>Register</h3>
            </div>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='userId' label='User ID'>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' className='default-btn'>
                Register
              </Button>
            </div>
            <br />
            <div className='d-flex justify-content-end'>
              <Link to='/login'>Already Registered? Click Here To Login</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
