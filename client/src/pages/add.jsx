import React, {useState, useEffect} from "react";
import axios from "axios";

const Add = () => {
  const [form, setForm] = useState({
    name: "",
    version: "",
    zipcode: "",
  })

  const [message, setMessage] = useState("");
  const [allTags, setAllTags] = useState({pollinator: 0, flowering: 0, "drought tolerant": 0, perennial: 0, annual: 0, aromatic: 0, "ground cover": 0, "shade provider": 0, colorful: 0, edible: 0, medicinal: 0})

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

  const onClickTag = (e) => {
    e.preventDefault();
    let id = e.target.id;
    setAllTags((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const resetMessage = () => {
    setTimeout(() => setMessage(""), 3000);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const selectedTags = Object.keys(allTags).reduce((acc, key) => {
      if (allTags[key]) {
        acc.push(key);
      }
      return acc;
    }, []);

    if (!version || !name || !zipcode || (zipcode.length !== 5)) {
      setMessage("Please fill out all fields before submitting.");
      resetMessage()
      return;
    }
    console.log(selectedTags)
    axios.post("/api", {name: form.name.toLowerCase(), version: form.version, zipcode: form.zipcode, tags: selectedTags})
    .then(res => {
      setMessage(res.data);
      resetMessage();
      setForm({
        name: "",
        version: "",
        zipcode: "",
      })
      setAllTags({pollinator: 0, flowering: 0, "drought tolerant": 0, perennial: 0, annual: 0, aromatic: 0, "ground cover": 0, "shade provider": 0, colorful: 0, edible: 0, medicinal: 0})
    })
    .catch(err => {
      setMessage(err.response.data);
      resetMessage();
    })
  }

  return (
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
            <label>Optional! Add some characteristics of this plant</label>
            <div className="plantCardContainer">
              {Object.keys(allTags).map((key, idx) =>
                <div className={allTags[key] ? "tagItem selected" : "tagItem"}
                key={idx}
                id={key}
                onClick={onClickTag}>
                  {key}
                </div>)}
            </div>
            <button>Submit your plant</button>
        </form>
      </div>
    </div>
  )
}

export default Add;