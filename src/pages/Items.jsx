import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table } from 'antd'
import DefaultLayout from '../components/DefaultLayout'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Items = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const getAllItems = () => {
    dispatch({ type: 'showLoading' })
    axios
      .get('/api/items')
      .then(response => {
        dispatch({ type: 'hideLoading' })
        setItems(response.data)
      })
      .catch(err => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllItems(), [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => (
        <img src={image} height='60' width='60' alt='productImage'></img>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <div className='d-flex'>
          <DeleteOutlined className='mx-2' />
          <EditOutlined className='mx-2' />
        </div>
      ),
    },
  ]
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={items} bordered />
    </DefaultLayout>
  )
}

export default Items
