import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { getStudents } from "../services/services";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
// import styled from "styled-components";
import { StyledTableCell, StyledTableRow } from "../styles/style";

import { slots, adminView } from "../Mocks/mockData";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    let studentsList = await getStudents();
    console.log(studentsList)
    setStudents(studentsList["data"]);
    let schedule = []
  };
  const onClickHandler = (email) => {
    navigate(`/view/${email}/student`);
  };
  let [students, setStudents] = useState([]);
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Schedule
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Day</StyledTableCell>
              {slots.map((item, key) => {
                return (
                  <StyledTableCell key={key} align="right">
                    {item}
                  </StyledTableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(adminView).map((row) => {
              console.log(adminView[row]) 
              adminView[row].forEach(element => {
                console.log(element["students"])
              });
            })}
            {
              Object.keys(adminView).map((day) =>(
                <StyledTableRow key={day}>
                <StyledTableCell component="th" scope="row">
                  {day}
                </StyledTableCell>
                {
                  adminView[day].map((element) => (
                    <StyledTableCell align="right" key={`${element["students"]}`}>
                    {element["students"].map((student) => (
                      <List>{student}
                    </List>
                    ))}
                    </StyledTableCell>

                  ))
                }

                </StyledTableRow>
              )
              )

            }

            {/*Object.keys(adminView).map((day) => (
              <StyledTableRow key={day}>
                <StyledTableCell component="th" scope="row">
                  {day}
                </StyledTableCell>
                {row.schedule.map((item, key) => {
                  return (
                    <StyledTableCell align="right" key={`${item.time}`}>
                      {role === "admin" ? (
                        <>{item.preference}</>
                      ) : (
                        <Select
                          value={item.preference}
                          label="Age"
                          style={{ width: "56px", height: "40px" }}
                          onChange={(e) => {
                            handleChange(row.day, item.time, e.target.value);
                          }}
                        >
                          {Object.keys(preferenceDescription).map((rating) => {
                            return (
                              <MenuItem
                                key={`${item.slot}-${rating}`}
                                value={rating}
                              >
                                {rating}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
              ))*/}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Students list
      </Typography>
      {students.map((item) => {
        return (
          <List key={item.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={item.name}
                  onClick={() => onClickHandler(item.email)}
                />
              </ListItemButton>
            </ListItem>
          </List>
        );
      })} 
    </>
  );
};
/*
{students.map((item) => {
        return (
          <List key={item.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={item.name}
                  onClick={() => onClickHandler(item.email)}
                />
              </ListItemButton>
            </ListItem>
          </List>
        );
      })} 
*/
export default Admin;
