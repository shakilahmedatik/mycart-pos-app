import { Button } from 'antd'
import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

const Item = ({ item }) => {
  const dispatch = useDispatch()
  const addToCart = () => {
    dispatch({ type: 'addToCart', payload: { ...item, quantity: 1 } })
  }
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} height='100' width='100' alt='productImg' />
      <h4 className='price'>
        Price: <b>{item.price}</b>$
      </h4>
      <div className='d-flex justify-content-end'>
        <Button onClick={() => addToCart()}>
          <ShoppingCartOutlined />
        </Button>
      </div>
    </div>
  )
}

export default Item
