import React from 'react'
import { Button, Form, Input, message, Row, Col } from 'antd'
import '../assets/styles/authentication.css'

const Register = () => {
  const onFinish = value => {
    console.log(value)
  }
  return (
    <div className='authentication'>
      <Row>
        <Col lg={8} xs={22}>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email'>
              <Input type='email' />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' className='default-btn'>
                SAVE
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register
