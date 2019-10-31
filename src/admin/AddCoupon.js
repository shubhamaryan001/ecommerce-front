import React, { useState } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCoupon } from './apiAdmin'

import '../index.css'

const AddCoupon = () => {
  const [values, setValues] = useState({
    code: '',
    discount: ''
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated()
  const { code, discount } = values

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  const clickSubmit = e => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    // make request to api to create category
    createCoupon(token, { code, discount }).then(data => {
      if (data.error) {
        setError(true)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  }

  const newCoupon = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Code</label>
        <input type="text" className="form-control" onChange={handleChange('code')} value={code} autoFocus required />
      </div>

      <div className="form-group">
        <label className="text-muted">Discount</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange('discount')}
          value={discount}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-success active">Create Coupon</button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{code} is created</h3>
    }
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Code should be unique</h3>
    }
  }

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-warning active">
        Back to Dashboard
      </Link>
    </div>
  )

  return (
    <div className="container-fluid signup ">
      <div className="row ">
        <div className="col-md-4 col-sm-12 "></div>
        <div className="card col-md-4 col-sm-12">
          {showSuccess()}
          {showError()}
          {newCoupon()}
          {goBack()}
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </div>
  )
}

export default AddCoupon
