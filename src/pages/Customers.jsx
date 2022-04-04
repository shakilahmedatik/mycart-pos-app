import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table } from 'antd'
import DefaultLayout from '../components/DefaultLayout'

const Customers = () => {
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
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      render: value => <span>{value.toString().substring(0, 10)}</span>,
    },
  ]

  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h3>Customers</h3>
      </div>
      <Table columns={columns} dataSource={bills} rowKey='_id' bordered />
    </DefaultLayout>
  )
}

export default Customers
