import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd'
import DefaultLayout from '../components/DefaultLayout'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Items = () => {
  const [addEditModalVisibility, setAddEditModalVisibility] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const getAllItems = () => {
    dispatch({ type: 'showLoading' })
    axios
      .get('/api/items/get-all-items')
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
          <EditOutlined
            className='mx-2'
            onClick={() => {
              setEditingItem(record)
              setAddEditModalVisibility(true)
            }}
          />
          <DeleteOutlined className='mx-2' onClick={() => deleteItem(record)} />
        </div>
      ),
    },
  ]

  const onFinish = values => {
    dispatch({ type: 'showLoading' })
    if (editingItem === null) {
      axios
        .post('/api/items/add-items', values)
        .then(response => {
          dispatch({ type: 'hideLoading' })
          console.log(response)
          message.success(response.data)
          setAddEditModalVisibility(false)
          getAllItems()
        })
        .catch(err => {
          dispatch({ type: 'hideLoading' })
          console.log(err)
          message.error(err.message)
        })
    } else {
      axios
        .put('/api/items/edit-item', { ...values, itemId: editingItem._id })
        .then(response => {
          dispatch({ type: 'hideLoading' })
          console.log(response)
          message.success(response.data)
          setEditingItem(null)
          setAddEditModalVisibility(false)
          getAllItems()
        })
        .catch(err => {
          dispatch({ type: 'hideLoading' })
          console.log(err)
          message.error(err.message)
        })
    }
  }
  const deleteItem = record => {
    console.log(record._id)
    dispatch({ type: 'showLoading' })
    axios
      .delete(`/api/items/delete-item/${record._id}`)
      .then(response => {
        dispatch({ type: 'hideLoading' })
        console.log(response)
        message.success(response.data)
        getAllItems()
      })
      .catch(err => {
        dispatch({ type: 'hideLoading' })
        console.log(err)
        message.error(err.message)
      })
  }
  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
        <h3>Items</h3>
        <Button
          className='default-btn'
          onClick={() => setAddEditModalVisibility(true)}
        >
          Add item
        </Button>
      </div>
      <Table columns={columns} dataSource={items} rowKey='_id' bordered />
      {addEditModalVisibility && (
        <Modal
          onCancel={() => {
            setAddEditModalVisibility(false)
            setEditingItem(null)
          }}
          visible={addEditModalVisibility}
          title={`${editingItem !== null ? 'Edit Item' : 'Add New Item'}`}
          footer={false}
        >
          <Form
            initialValues={editingItem}
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item name='name' label='Name'>
              <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image Url'>
              <Input />
            </Form.Item>
            <Form.Item name='category' label='Category'>
              <Select>
                <Select.Option value='fruits'>Fruits</Select.Option>
                <Select.Option value='vegetables'>Vegetables</Select.Option>
                <Select.Option value='meat'>Meat</Select.Option>
              </Select>
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button htmlType='submit' className='default-btn'>
                SAVE
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Items
