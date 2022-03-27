import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import DefaultLayout from '../components/DefaultLayout'
import { EyeOutlined } from '@ant-design/icons'

const Bills = () => {
  // handle bill render
  // eslint-disable-next-line no-unused-vars
  const showBills = () => {
    // Code goes here
  }
  return (
    <DefaultLayout>
      <h1>Bills Page</h1>
    </DefaultLayout>
  )
}

export default Bills
