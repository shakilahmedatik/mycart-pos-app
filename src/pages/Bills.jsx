import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import DefaultLayout from '../components/DefaultLayout'
import { EyeOutlined } from '@ant-design/icons'

const Bills = () => {
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)

  const dispatch = useDispatch()
  const [bills, setBills] = useState([])
  const getAllBills = () => {
    dispatch({ type: 'showLoading' })
    axios
      .get('/api/items/get-all-bills')
      .then(response => {
        dispatch({ type: 'hideLoading' })
        setBills(response.data)
      })
      .catch(err => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllBills(), [])

  return (
    <DefaultLayout>
      <h1>Bills Page</h1>
    </DefaultLayout>
  )
}

export default Bills
