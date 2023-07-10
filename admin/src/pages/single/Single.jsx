import "./single.scss";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const Single = () => {
  const [one, setOne] = useState()
  const { productId } = useParams()
  const location = useLocation();
  const navigate=useNavigate()


  useEffect(() => {
    axios.get(`http://localhost:8800/api${location.pathname}`, { withCredentials: true }, { Headers: { "Access-Control-Allow-Origin": "*" } })
      .then((res) => setOne(res.data))

  }, [])


  const onEditClick=(type,id)=>{
    console.log(type,"type",id,"id")
  }


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src=""
                alt=""
                className="itemImg"
              />
              {one && location.pathname.split("/")[1]==="users" && 
                <div className="details">
                  <h1 className="itemTitle">{one.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{one.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{one.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{one.country}</span>
                  </div>
                </div>}
                {one && location.pathname.split("/")[1]==="rooms" && 
                <div className="details">
                  <h1 className="itemTitle">{one.type}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Title:</span>
                    <span className="itemValue">{one.title}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">{one.price}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Max People:</span>
                    <span className="itemValue">
                      {one.maxPeople}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Descriprion:</span>
                    <span className="itemValue">{one.desc}</span>
                  </div>
                  <button className="btn btn-info" onClick={()=> navigate(`/edit/room/${one._id}`) }>Edit</button>
                </div>}
                {one && location.pathname.split("/")[1]==="hotels" && 
                <div className="details">
                  <h1 className="itemTitle">{one.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Type:</span>
                    <span className="itemValue">{one.type}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">City:</span>
                    <span className="itemValue">{one.city}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {one.address}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{one.desc}</span>
                  </div>
                  <button className="btn btn-info" onClick={()=>()=> navigate(`/edit/hotels/${one._id}`)}>Edit</button>
                </div>}
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
