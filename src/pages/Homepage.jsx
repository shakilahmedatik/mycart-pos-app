import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { Col, Row } from 'antd'
import Item from '../components/Item'
import '../assets/styles/items.css'
import { useDispatch } from 'react-redux'

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categories = [
    {
      name: 'fruits',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg',
    },
    {
      name: 'vegetables',
      imageURL:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg',
    },
    {
      name: 'meat',
      imageURL:
        'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive',
    },
  ]
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
  console.log(selectedCategory)
  return (
    <div>
      <DefaultLayout>
        <div className='d-flex'>
          {categories.map(category => {
            return (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`d-flex category ${
                  selectedCategory === category.name && 'selected-category'
                }`}
              >
                <h4>{category.name}</h4>
                <img
                  src={category.imageURL}
                  height='60'
                  width='80'
                  alt='catImg'
                />
              </div>
            )
          })}
        </div>
        <Row gutter={20}>
          {items
            .filter(i =>
              selectedCategory ? i.category === selectedCategory : true
            )
            .map((item, i) => {
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
