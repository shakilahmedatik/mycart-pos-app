import React, { useEffect } from 'react'
import { Button, Form, Input, message, Row, Col } from 'antd'
import '../assets/styles/authentication.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const onFinish = value => {
    axios
      .post('/api/user/login', value)
      .then(response => {
        console.log(response)
        message.success(response.data)
        localStorage.setItem('pos-user', JSON.stringify(response.data))
        navigate('/home')
      })
      .catch(err => {
        console.log(err.response.data)
        message.error(err.response.data)
      })
  }
  useEffect(() => {
    if (localStorage.getItem('pos-user')) {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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

            <Form.Item name='userId' label='User ID'>
              <Input />
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
