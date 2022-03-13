import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'
import '../assets/styles/items.css'
import { useDispatch } from 'react-redux'

const Homepage = () => {
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
  return (
    <div>
      <DefaultLayout>
        <Row gutter={20}>
          {items.map((item, i) => {
            return (
              <Col key={i} xs={24} lg={8} xl={6} md={12} sm={12}>
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
