import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
const List = (props) => {
  let { dataList } = props;

  dataList = dataList.sort();

  const handleEdit = (id) => {
    Swal.fire({
      icon: "success",
      title: "Updating Form Data...",
      text: "Sorry! I am not working.....",
      timer: 1000,
      onOpen: function () {
        Swal.showLoading();
      },
    });
  };

  //delete function to delete the user data from list
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Sorry! I am not working.....",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {});
  };

  return (
    <>
      {dataList &&
        dataList.map((element) => {
          return (
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.phone}</td>
              <td>{element.education}</td>
              <td>{element.message}</td>

              <td>
                <a
                  onClick={() => handleEdit(element.id)}
                  href
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </a>{" "}
                |{" "}
                <a
                  href
                  onClick={() => handleDelete(element.id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Delete
                </a>
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default List;
