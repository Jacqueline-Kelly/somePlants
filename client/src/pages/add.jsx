import React, {useState, useEffect} from 'react';


const Add = () => {
  const [form, setForm] = useState({
    name: '',
    nameType: '',
    zipCode: '',
  })

  const [fullForm, setFullForm] = useState(false)

  const { name, nameType, zipCode } = form;

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
    nameType: val
    }))
  }
  return(
    <div className="main">
      <h1>Add a Plant Native to Your Area ✨</h1>
      <div className="formContainer">
        <form style={{display: "flex", flexDirection: "column"}}>
            <label>Plant Name</label>
            <input id="name" value={name} className="inputBox" onChange={onChange} />
            <label>Version</label>
            <select id="nameType" value={nameType} className="inputBox selectBox" onChange={onChange}>
              <option value="">Select version of name</option>
              <option value="common">Common</option>
              <option value="sci">Scientific</option>
            </select>
            <label>ZIP Code</label>
            <input id="zipCode" value={zipCode} className="inputBox" onChange={onChange} />
            <button>Submit your plant</button>
        </form>
      </div>
    </div>
  )
}

export default Add;