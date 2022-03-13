import { Table } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons'

const CartPage = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.rootReducer)
  const increaseQuantity = record => {
    dispatch({
      type: 'updateCart',
      payload: { ...record, quantity: record.quantity + 1 },
    })
  }
  const decreaseQuantity = record => {
    if (record.quantity !== 1) {
      dispatch({
        type: 'updateCart',
        payload: { ...record, quantity: record.quantity - 1 },
      })
    }
  }

  const deleteItem = record => {
    dispatch({
      type: 'deleteFromCart',
      payload: record,
    })
  }
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
      title: 'Quantity',
      dataIndex: '_id',
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className='me-2'
            onClick={() => increaseQuantity(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className='ms-2'
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <DeleteOutlined onClick={() => deleteItem(record)} />
      ),
    },
  ]
  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} rowKey='name' bordered />
    </DefaultLayout>
  )
}

export default CartPage
