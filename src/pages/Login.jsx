import React from 'react'
import { Button, Form, Input, message, Row, Col } from 'antd'
import '../assets/styles/authentication.css'
import axios from 'axios'
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
        console.log(err.response.data.message)
        message.error(err.response.data.message)
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
              <h3>Login</h3>
            </div>

            <Form.Item name='email' label='Email'>
              <Input type='email' />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' className='default-btn'>
                login
              </Button>
            </div>
            <br />
            <div className='d-flex justify-content-end'>
              <Link to='/register'>New User? Click Here To Register</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
