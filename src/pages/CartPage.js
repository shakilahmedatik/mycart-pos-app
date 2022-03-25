import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import React, { useState, useEffect } from 'react'
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
  const [subTotal, setSubTotal] = useState(0)
  const [billChargeModal, setBillChargeModal] = useState(false)
  useEffect(() => {
    let temp = 0
    cartItems.forEach(item => {
      temp = temp + item.price * item.quantity
    })
    setSubTotal(temp)
  }, [cartItems])
  const onFinish = () => {
    // Code goes here!!!!
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
      <hr />
      <div className='d-flex subtotal flex-column justify-content-end align-items-end'>
        <div>
          <h2>
            SubTotal: <b>{subTotal}$</b>
          </h2>
        </div>
        <Button type='primary' onClick={() => setBillChargeModal(true)}>
          CHARGE BILL
        </Button>
      </div>
      <Modal
        title='CHARGE BILL'
        visible={billChargeModal}
        footer={null}
        onCancel={() => setBillChargeModal(false)}
      >
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name='customerName' label='Customer Name'>
            <Input />
          </Form.Item>
          <Form.Item name='phoneNumber' label='Phone Number'>
            <Input />
          </Form.Item>

          <Form.Item name='paymentMode' label='Payment Mode'>
            <Select>
              <Select.Option value='cash'>Cash</Select.Option>
              <Select.Option value='card'>Card</Select.Option>
            </Select>
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <Button htmlType='submit' className='default-btn'>
              GENERATE BILL
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  )
}

export default CartPage
