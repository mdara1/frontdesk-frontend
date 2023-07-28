import * as React from "react";
import { styled } from "@mui/material/styles";
// import styled from "styled-components";
import { StyledTableCell, StyledTableRow } from "../styles/style";
import Table from "@mui/material/Table";
import { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { slots, preferenceDescription } from "../Mocks/mockData";
import {
  getPreference,
  createPreference,
  updatePreference
} from "../services/services";
import { useParams } from "react-router-dom";

export default function CustomizedTables() {
  let [originalPreferences, setoriginalPreferences] = useState({});
  let [preferences, setPreferences] = useState([]);
  let [isNewUser, setNewUser] = useState(false);
  const { email, role } = useParams();
  useEffect(() => {
    //store original preference and draftPreference
    //get api call should be triggered
    fetchPreferenceData();
  }, []);

  const handleChange = (day, slot, val) => {
    // update the value of preference
    let restPreferenceDetails = [];
    for (let i = 0; i < preferences.length; i++) {
      if (preferences[i].day === day) {
        let scheduleDetails = preferences[i].schedule.map((temp) => {
          if (temp.time === slot) {
            return { time: slot, preference: val };
          } else {
            return temp;
          }
        });
        restPreferenceDetails.push({ day, schedule: scheduleDetails });
      } else {
        restPreferenceDetails.push(preferences[i]);
      }
    }
    setPreferences(restPreferenceDetails);
  };

  const fetchPreferenceData = async () => {
    let singleStudentpreference = await getPreference(email);
    console.log(singleStudentpreference)
    setPreferences(singleStudentpreference["data"].weeklyPreferences);
    setoriginalPreferences(singleStudentpreference["data"].weeklyPreferences);
  };

  const onClickHandler = () => {
    let payload = { email: email, preferences };
    if (isNewUser) {
      createPreference(payload)
        .then((resp) => {
          console.log("successfully created");
        })
        .catch((err) => {
          console.log("error while creating");
        });
    } else {
      updatePreference(payload)
        .then((resp) => {
          console.log("successfully created");
        })
        .catch((err) => {
          console.log("error while creating");
        });
    }

    //save the changes
    //preference is the payload
    //do post api call
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        Prefernces
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
            {preferences.map((row) => (
              <StyledTableRow key={row.day}>
                <StyledTableCell component="th" scope="row">
                  {row.day}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {role !== "admin" && (
        <Button
          variant="contained"
          onClick={onClickHandler}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            left: "50%"
          }}
        >
          {isNewUser ? "Create Prefrences" : "Save Changes"}
        </Button>
      )}
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "inside"
        }}
      >
        {Object.values(preferenceDescription).map((item, key) => (
          <ListItem key={key} sx={{ display: "list-item" }}>
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );
}
