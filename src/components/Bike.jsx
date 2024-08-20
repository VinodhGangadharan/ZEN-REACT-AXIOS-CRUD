import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import './Bike.css'

const Bike = () => {

  const bikeData = useLoaderData();

  //Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setIsEditingId] = useState(null);

  // Alert texts
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alerts, setAlert] = useState("");

  //State of fields
  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newEngine, setNewEngine] = useState('');
  const [newFuelcapacity, setNewFuelcapacity] = useState('');
  const [newType, setNewType] = useState('');

  const navigate = useNavigate();

  // Toggle button for Add and Update
  const styles = {
    toggle: {
      width: isEditing ? "12rem" : "8rem",
      background: isEditing ? "Orange" : "blue",
      color: isEditing ? "Black" : "white"

    }
  };

  // Function for Add and Update fields
  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!isEditing) {
      //Axios call for adding data
      axios.post(`https://66baf3856a4ab5edd636a698.mockapi.io/bikes`, {
        brand: newBrand,
        model: newModel,
        engine: newEngine,
        fuelcapacity: newFuelcapacity,
        type: newType

      })
        .then(response => {
          //Set alert
          setAlert('"'+newBrand+" "+newModel+'"'+' Bike added Successfully!');
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 1500);

          // clear the form
          setNewBrand('');
          setNewModel('');
          setNewEngine('');
          setNewFuelcapacity('');
          setNewType('');

          // refresh the page
          navigate('/');
        })
        //Catch block
        .catch(error => {
          alert('Adding Bike failed');
        });
    }
    else {
      //Axios call for Updating data
      axios.put(`https://66baf3856a4ab5edd636a698.mockapi.io/bikes/${isEditingId}`, {
        brand: newBrand,
        model: newModel,
        engine: newEngine,
        fuelcapacity: newFuelcapacity,
        type: newType,
      })
        .then(response => {
          //Set alert
          setAlert('"'+newBrand+" "+newModel+'"'+' Bike updated Successfully!');
          //setAlert("Bike Updated Successfully!");
          setIsAlertVisible(true);
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 1500);

          // clear the form
          setNewBrand('');
          setNewModel('');
          setNewEngine('');
          setNewFuelcapacity('');
          setNewType('');
          setIsEditing(false);
          // refresh the page
          navigate('/');
        })
        //Catch block
        .catch(error => {
          alert('Updating Bike failed');
        });

    }
  }

  //Function for delete field
  const handleTrashClick = (bikes) => {
    let x = bikes.brand;
    let y = bikes.model;
    console.log(x);
    console.log(bikes.id);
    // get the confirmation from the user
    const isConfirmed = window.confirm('Press Ok to Remove' + " " + '"' + x + " " + y + '"' + " " + 'Bike from list !');
    if (!isConfirmed) return;
    // Axios Delete call
    axios.delete(`https://66baf3856a4ab5edd636a698.mockapi.io/bikes/${bikes.id}`)
      .then(response => {

        //Alert for Delete
        setAlert(x + y + "Bike Deleted Successfully!");
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 1500);

        // refresh the page
        navigate('/');
      })
      //Catch block
      .catch(error => {
        alert('Deleting Bike failed');
      });
  }

  //Set fields values for Update 
  const handleTodoClick = (bikes) => {
    setIsEditing(true);
    setNewBrand(bikes.brand);
    setNewModel(bikes.model);
    setNewEngine(bikes.engine);
    setNewFuelcapacity(bikes.fuelcapacity);
    setNewType(bikes.type);
    setIsEditingId(bikes.id);

  }

  //Reset the form fields
  const handleReset = () => {
    // clear the form
    setNewBrand('');
    setNewModel('');
    setNewEngine('');
    setNewFuelcapacity('');
    setNewType('');
    setIsEditing(false);
    setIsEditingId(null);
    setAlert("Fields Cleared!");
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 1000);
  }



  return (

    <div>
      <div className="container">
        {/* Header*/}
        <div className="row">
          <div className="col-lg-12">
            <h1><i>Best Bikes 2024</i></h1>
          </div>
        </div>
        {/*Add/Update form fields */}
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleAddTodo}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="input-group  mb-3">
                        <input required style={{ width: "12rem" }} type="text" value={newBrand} className="form-control" onChange={(e) => setNewBrand(e.target.value)} placeholder="Brand" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group  mb-3">
                        <input required style={{ width: "12rem" }} type="text" value={newModel} className="form-control" onChange={(e) => setNewModel(e.target.value)} placeholder="Model" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group  mb-3">
                        <input required style={{ width: "12rem" }} type="text" value={newEngine} className="form-control" onChange={(e) => setNewEngine(e.target.value)} placeholder="Engine (cc)" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group  mb-3">
                        <input required style={{ width: "12rem" }} type="text" value={newFuelcapacity} className="form-control" onChange={(e) => setNewFuelcapacity(e.target.value)} placeholder="Fuelcapacity (L)" />
                      </div>
                    </td>
                    <td>
                      <div className="input-group  mb-3">
                        <input required style={{ width: "12rem" }} type="text" value={newType} className="form-control" onChange={(e) => setNewType(e.target.value)} placeholder="Type" />
                      </div>
                    </td>
                    <td>
                      <span> </span>
                    </td>

                  </tr>

                </tbody>
              </table>

              <div className="row">
                <div style={{ textAlign: "center" }} className="col-lg-12">

                  <button style={styles.toggle} className="btn btn-primary mb-3 btn-sm" type="submit">{isEditing ? 'Update' : 'Add'}</button>
                  <span> </span>
                  <button style={{ width: "8rem" }} className="btn btn-primary mb-3 btn-sm" onClick={handleReset} type="reset">Clear</button>

                </div>
              </div>

              {isAlertVisible && <div className='alert-container'>
                <div style={{ color: "white", textAlign: "center" }} className='alert-inner'>{alerts}</div>
              </div>}

            </form>
          </div>
        </div>
        {/*Table to display and Edit/Delete fields */}
        <div className="row">
          <div className="col-lg-12">

            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col" style={{ color: "wheat" }}>Brand</th>
                  <th scope="col" style={{ color: "wheat" }}>Model</th>
                  <th scope="col" style={{ color: "wheat" }}>Engine (cc)</th>
                  <th scope="col" style={{ color: "wheat" }}>Fuelcapacity (L)</th>
                  <th scope="col" style={{ color: "wheat" }}>Type</th>
                  <th scope="col" style={{ color: "wheat" }}>Actions</th>

                </tr>
              </thead>
              <tbody>
                {
                  bikeData.map(bikes => {
                    return (
                      <tr key={bikes.id}>
                        <td>{bikes.brand}</td>
                        <td>{bikes.model}</td>
                        <td>{bikes.engine}</td>
                        <td>{bikes.fuelcapacity}</td>
                        <td>{bikes.type}</td>
                        <td>
                          <button className="btn btn-warning" onClick={() => handleTodoClick(bikes)}>Edit</button>
                          <span>  </span>
                          <button className="btn btn-danger" onClick={() => handleTrashClick(bikes)}>Delete</button>
                        </td>
                      </tr>

                    )
                  })
                }

              </tbody>
            </table>

          </div>
        </div>

      </div>
    </div>

  )
}

export default Bike;

