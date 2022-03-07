import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'
import '../assets/styles/items.css'

const Homepage = () => {
  const [items, setItems] = useState([])
  const getAllItems = () => {
    axios
      .get('/api/items')
      .then(response => setItems(response.data))
      .catch(err => console.log(err))
  }

  useEffect(() => getAllItems(), [])
  return (
    <div>
      <DefaultLayout>
        <Row gutter={20}>
          {items.map(item => {
            return (
              <Col xs={24} lg={8} xl={6} md={12} sm={12}>
                <Item item={item} />{' '}
              </Col>
            )
          })}
        </Row>
      </DefaultLayout>
    </div>
  )
}

export default Homepage
