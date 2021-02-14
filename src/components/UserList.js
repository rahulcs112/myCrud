import React, { useState, useEffect } from "react";
import List from "./List";
import { dynamicSort } from "./common/Helper";
import { logOutUser } from "../utils/Auth";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const UserList = (props) => {
  const { updateList, setUpdatedList, editFormId, setEditFormId } = props;
  let history = useHistory();

  const [sortOrderName, setSortOrderName] = useState(true);
  const [sortOrderEmail, setSortOrderEmail] = useState(true);
  const [sortOrderPhone, setSortOrderPhone] = useState(true);
  const [dataList, setDataList] = useState(
    JSON.parse(localStorage.getItem("userItem"))
  );
  const [inputValue, setInputValue] = useState("");

  const searchHandler = (e) => {
    let search = e.target.value;

    const userData = JSON.parse(localStorage.getItem("userItem"));

    var searchData = userData.filter(function (user) {
      if (user.email.includes(search) || user.name.includes(search)) {
        return true;
      }
    });
    setInputValue(search);
    setDataList(searchData);
  };

  const handleSortByName = () => {
    const userData = JSON.parse(localStorage.getItem("userItem"));
    setSortOrderName(!sortOrderName);
    setDataList(userData.sort(dynamicSort("name", sortOrderName)));
  };

  const handleSortByEmail = () => {
    const userData = JSON.parse(localStorage.getItem("userItem"));
    setSortOrderEmail(!sortOrderEmail);
    setDataList(userData.sort(dynamicSort("email", sortOrderEmail)));
  };

  const handleSortByPhone = () => {
    const userData = JSON.parse(localStorage.getItem("userItem"));
    setSortOrderPhone(!sortOrderPhone);
    setDataList(userData.sort(dynamicSort("phone", sortOrderPhone)));
  };

  const logOut = () => {
    Swal.fire({
      icon: "success",
      title: "",
      text: "",
      timer: 1000,
      onOpen: function () {
        Swal.showLoading();
      },
    });
    logOutUser();
    history.push("/dashboard");
  };

  return (
    <>
      <div className="row" style={{ margin: "50px" }}>
        <a href onClick={() => logOut()}>
          Logout
        </a>
        <div className="col-md-12">
          <input
            className="form-control"
            id="myInput"
            type="text"
            placeholder="Search by Name,Email.."
            style={{
              width: "300px",
              marginLeft: "450px",
              marginRight: "10px",
              display: "initial",
            }}
            onChange={(e) => searchHandler(e)}
            value={inputValue}
          />
        </div>

        <br />
        <br />
        <br />
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th onClick={() => handleSortByName()}>Name</th>
              <th
                onClick={() => {
                  handleSortByEmail();
                }}
              >
                Email
              </th>
              <th
                onClick={() => {
                  handleSortByPhone();
                }}
              >
                Phone
              </th>
              <th>Education</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <List
              dataList={dataList}
              updateList={updateList}
              setUpdatedList={setUpdatedList}
              editFormId={editFormId}
              setEditFormId={setEditFormId}
            />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserList;
