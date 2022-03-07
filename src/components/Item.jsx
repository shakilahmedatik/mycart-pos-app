import { Button } from 'antd'
import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'

const Item = ({ item }) => {
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <img src={item.image} height='100' width='100' alt='productImg' />
      <h4 className='price'>
        Price: <b>{item.price}</b>$
      </h4>
      <div className='d-flex justify-content-end'>
        <Button>
          <ShoppingCartOutlined />
        </Button>
      </div>
    </div>
  )
}

export default Item
