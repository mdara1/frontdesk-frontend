const baseURl =
  "http://localhost:9003";
const GET_PREF = (email) => {
  return `${baseURl}/preference/view/${email}`;
};
const CREATE_PREF = () => {
  return `${baseURl}/preference/create`;
};
const UPDATE_PREF = () => {
  return `${baseURl}/preference/update`;
};
const GET_STUDENTS = `${baseURl}/admin/view/student`;
export { GET_PREF, GET_STUDENTS, CREATE_PREF, UPDATE_PREF };
