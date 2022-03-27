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
      .get('/api/bills/get-all-bills')
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
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'SubTotal',
      dataIndex: 'subTotal',
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => <EyeOutlined onClick={() => {}} />,
    },
  ]
  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h3>Bills</h3>
      </div>
      <Table columns={columns} dataSource={bills} rowKey='_id' bordered />
    </DefaultLayout>
  )
}

export default Bills
