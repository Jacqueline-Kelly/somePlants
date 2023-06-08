import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Add = () => {
  const [form, setForm] = useState({
    name: '',
    version: '',
    zipcode: '',
  })

  const [message, setMessage] = useState('');

  const { name, version, zipcode } = form;

  const onChange = (e) => {
    e.preventDefault();
    let id = e.target.id;
    let val = e.target.value;
    setForm((prevState) => ({...prevState,
    [id]: val
    }))
  }

  const onSelect = (option) => {
    let val = option.value;
    setForm((prevState) => ({...prevState,
    version: val
    }))
  }

  const resetMessage = () => {
    setTimeout(() => setMessage(''), 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!version || !name || !zipcode || (zipcode.length !== 5)) {
      setMessage('Please fill out all fields before submitting.');
      resetMessage()
      return;
    }

    axios.post('/api', {name: form.name.toLowerCase(), version: form.version, zipcode: form.zipcode})
    .then(res => {
      setMessage(res.data);
      resetMessage();
      setForm({
        name: '',
        version: '',
        zipcode: '',
      })
    })
    .catch(err => {
      setMessage(err.response.data);
      resetMessage();
    })
  }

  return(
    <div className="main">
      <h1>Add a Plant Native to Your Area ✨</h1>
      {message.length ? <h2>{message}</h2> : null}
      <div className="formContainer ">
        <form style={{display: "grid"}} onSubmit={onSubmit}>
            <label>Plant Name</label>
            <input id="name" value={name} className="inputBox" onChange={onChange} />
            <label>Version</label>
            <select id="version" value={version} className="inputBox selectBox cursor" onChange={onChange}>
              <option value="">Select version of name</option>
              <option value="common_name">Common</option>
              <option value="scientific_name">Scientific</option>
            </select>
            <label>ZIP Code</label>
            <input id="zipcode" value={zipcode} className="inputBox" maxLength="5" onChange={onChange} />
            <button>Submit your plant</button>
        </form>
      </div>
    </div>
  )
}

export default Add;