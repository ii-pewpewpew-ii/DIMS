import Select from "react-select";
import contentFilters from "../data/filterOptions";
import DatePicker from "react-date-picker";
import { useState } from "react";
import axios from "axios";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const FilterBar = (props) => {
  const navigate=useNavigate()
  const [stValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(new Date());
  const [categoryData, setCategoryData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const stChange = (date) => {
    setStartValue(date);
  };

  const enChange = (date) => {
    setEndValue(date);
  };

  const selectChange = (data) => {
    setCategoryData(data);
  };

  const checkChange = () => {
    setIsChecked(!isChecked);
  };

  const newSite=()=>{
    navigate('/newGroup')
  }

  const requestImage = async () => {
    //set data
    let category = [];
    if (!categoryData) {
      alert("NO CATEGORY FILTER PROVIDED!");
      return;
    } else {
      categoryData.forEach((e) => {
        // console.log(e)
        category.push(e["value"]);
      });
    }

    console.log(category);

    let ranges = [];
    if (isChecked) {
      ranges.push({
        startDate: {
          day: stValue.getDate(),
          month: stValue.getMonth() + 1,
          year: stValue.getFullYear(),
        },
        endDate: {
          day: endValue.getDate(),
          month: endValue.getMonth() + 1,
          year: endValue.getFullYear(),
        },
      });
    }

    console.log(ranges);
    await axios
      .post(
        `http://localhost:8080/api/user/filter`,
        {
          username: localStorage.getItem("username"),
          ranges: ranges,
          contentCategories: category,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwttoken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.baseUrls) {
          var img = [];
          res.data.baseUrls.forEach((e) => {
            let temp = {};
            temp["src"] = e;
            temp["width"] = 4;
            temp["height"] = 4;
            img.push(temp);
          });
          // imageData.current=img
          // console.log(imageData.current)
          props.setImageData(img);
        } else {
          props.setImageData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const requestAllImages = async () => {
    //without any filter
    await axios
      .post(
        `http://localhost:8080/api/user/filter`,
        {
          username: localStorage.getItem("username"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwttoken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.baseUrls) {
          var img = [];
          res.data.baseUrls.forEach((e) => {
            let temp = {};
            temp["src"] = e;
            temp["width"] = 4;
            temp["height"] = 4;
            img.push(temp);
          });
          // imageData.current=img
          // console.log(imageData.current)
          props.setImageData(img);
        } else {
          props.setImageData([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="mx-4 my-2 leading-loose">
          <div className="">
            <p>Choose the type of content:</p>
            <Select options={contentFilters} isMulti onChange={selectChange} />
          </div>
          <div className="flex items-start justify-center">
            <div className="mx-14">
              <p>Start date:</p>
              <DatePicker onChange={stChange} value={stValue} />
            </div>
            <div className="mx-14">
              <p>End date:</p>
              <DatePicker onChange={enChange} value={endValue} />
            </div>
            <div className="mx-14 my-auto h-8/12 flex align-center justify-center">
              <p>Include date? : </p>
              <input type="checkbox" onChange={checkChange}></input>
            </div>
          </div>
        </div>
        <div className="grid justify-items-center items-center">
          <div className="flex">
            <button
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={requestImage}
            >
              FILTER ITEMS
            </button>
            <button
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={requestAllImages}
            >
              DISPLAY ALL IMAGES
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={newSite}
            >
              CREATE YOUR OWN GROUP OF IMAGES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
