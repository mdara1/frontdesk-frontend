import axios from "axios";
import { GET_PREF, GET_STUDENTS, CREATE_PREF, UPDATE_PREF } from "./constants";
import { studentsData, singleStudentpreference } from "../Mocks/mockData";
export const getPreference = (email) => {
  // const headers = {
  //   params: { email: "avc" }
  // };
  //return Promise.resolve(singleStudentpreference);
  return axios
    .get(GET_PREF(email))
    .then((resp) => {
      console.log("////", resp);
      return resp.data;
    })
    .catch((err) => {
      console.log("Error occured while fetching", err);
    });
};
export const getStudents = () => {
  //return Promise.resolve(studentsData);
  return axios
    .get(GET_STUDENTS)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("Error occured while fetching", err);
    });
};
export const createPreference = (payload) => {
  axios
    .post(CREATE_PREF, payload)
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("Error occured while fetching", err);
    });
};
export const updatePreference = (payload) => {
  axios
    .post(UPDATE_PREF, payload)
    .then((resp) => {
      return resp;
    })
    .catch((err) => {
      console.log("Error occured while fetching", err);
    });
};
// const Preference = () => {
//   const headers = {
//     params: { email: "avc" }
//   };
//   axios
//     .get("/url", headers)
//     .then((resp) => {
//       return resp;
//     })
//     .catch((err) => {
//       console.log("Error occured while fetching", err);
//     });
// };
