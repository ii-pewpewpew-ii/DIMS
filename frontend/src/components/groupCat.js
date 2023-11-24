import axios from "axios";
// import {writeJsonFile} from 'write-json-file';
// import userCreatedCategory from 'json!../data/userCreated.json'
import { useCallback, useState, useRef, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Select from "react-select";
import SelectedImage from "./selectedImage";
import Navbar from "../navbar";
import imageData from "../data/userCreated.json";
import { useNavigate } from "react-router-dom";

const userCreatedCategory = require("../data/userCreated.json");

const GroupCat = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [groupName, setGroupName] = useState();
  const selectedImagesData = useRef([]);
  const [options, setOptions] = useState([]);
  const [galleryDisplay, setGalleryDisplay] = useState("");
  // const toggleSelectAll = () => {
  //   setSelectAll(!selectAll);
  // };

  const requestAllImages = async () => {
    //without any filter
    await axios
      .post(
        `http://localhost:8080/api/user/allFilter`,
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
        if (res.data.mediaData) {
          var img = [];
          res.data.mediaData.forEach((e) => {
            let temp = {};
            temp["src"] = e.baseUrl;
            temp["id"] = e.id;
            temp["width"] = 4;
            temp["height"] = 4;
            img.push(temp);
          });
          // imageData.current=img
          // console.log(imageData.current)
          setPhotos(img);
        } else {
          setPhotos([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selectedImages={selectedImagesData}
        // setSelectedImages={setSelectedImagesData}
        key={key}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    ),
    []
  );

  const addNewGroup = async () => {
    if (groupName) {
      console.log(groupName);
      console.log(selectedImagesData.current);
      // userCreatedCategory.push(selectedImagesData.current)
      await axios
        .post(
          `http://localhost:8080/api/user/writeFile`,
          {
            username: localStorage.getItem("username"),
            data: {
              categoryname: groupName,
              images: selectedImagesData.current,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwttoken"),
            },
          }
        )
        .then((res) => {
          navigate("/newGroup");
        })
        .catch((err) => {
          console.log(err);
        });
      // await writeJsonFile('../data/userCreated.json',selectedImagesData.current)
    }
    console.log("File data", userCreatedCategory);
  };
  // console.log(options)

  const selectChange = (data) => {
    // console.log(options)
    console.log(data.value);
    setGalleryDisplay(data.value);
    // console.log(imageData,data[0].value,imageData[data[0].value])
  };
  const testFunc = () => {
    console.log(selectedImagesData);
  };

  useEffect(() => {
    if(localStorage.getItem('jwttoken')==null || localStorage.getItem('username')==null){
        navigate('/login')
    }
    setOptions(
      Object.keys(imageData).map((v, index) => ({
        value: `${v}`,
        label: `${v}`,
      }))
    );
  }, []);
  return (
    <div className="leading-loose">
      <Navbar></Navbar>
      <div className="grid place-items-center">
        <div className="w-8/12 ">
          <p>Existing groups:</p>
          <Select options={options} onChange={selectChange} />
        </div>
        <div className="w-10/12">
          {galleryDisplay !== "" ? (
            <div className="my-8">
              <Gallery photos={imageData[galleryDisplay]} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      
        {/* <button onClick={toggleSelectAll}>toggle select all</button> */}

        <div className="w-8/12 mx-auto">
            <p>Create new image group:</p>
          </div>
        <div className="mx-auto flex justify-center">
          
          {photos.length == 0 ? (
            <button
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={requestAllImages}
            >
              DISPLAY ALL IMAGES
            </button>
          ) : (
            <div></div>
          )}

          {photos.length > 0 ? (
            <div className="mx-auto">
              <div className="w-8/12 mx-auto">
              <label
                className=""
                htmlFor="username"
              >
                Name of the Group:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groupname"
                type="text"
                placeholder="Groupname"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
            </div>
            <div className="mx-auto my-8 w-10/12">
            <Gallery photos={photos} renderImage={imageRenderer} />
            </div>
            <div className="mx-auto flex justify-center w-8/12">
            <button
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={addNewGroup}
            >
              ADD TO NEW GROUP
            </button>
            </div>
            
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
  );
};

export default GroupCat;
