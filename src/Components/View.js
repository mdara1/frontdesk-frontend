import * as React from "react";
import { StyledTableCell, StyledTableRow } from "../styles/style";
import Snackbar from "@mui/material/Snackbar";
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
import { useLocation } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  slots,
  preferenceDescription,
  singleStudentpreference,
} from "../Mocks/mockData";
import {
  getPreferences,
  createPreferences,
  updatePreferences,
} from "../apis/index";
import { useParams } from "react-router-dom";

export default function CustomizedTables() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  let [originalPreferences, setoriginalPreferences] = useState({});
  let [preferences, setPreferences] = useState([]);
  let [isNewUser, setNewUser] = useState(false);
  const location = useLocation();
  const formData = location.state;
  const { email, role } = formData;
  useEffect(() => {
    //store original preference and draftPreference
    //get api call should be triggered
    fetchPreferenceData(formData?.email);
  }, [email]);

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

  const fetchPreferenceData = async (email) => {
    await getPreferences(email)
      .then((resp) => {
        if (resp.status === 404) {
          setPreferences(singleStudentpreference);
          setoriginalPreferences(singleStudentpreference);
          setNewUser(true); // Set isNewUser to true
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        if (data) {
          setPreferences(data.data?.weeklyPreferences);
          setoriginalPreferences(data.data?.weeklyPreferences);
        }
      });
  };

  const onClickHandler = () => {
    let payload = { email: email, weekly_preferences: preferences };
    if (isNewUser) {
      createPreferences(payload)
        .then((resp) => {
          console.log("successfully created");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.log("error while creating");
        });
    } else {
      updatePreferences(payload)
        .then((resp) => {
          console.log("successfully updated");
          setSnackbarOpen(true);
        })
        .catch((err) => {
          console.log("error while updating");
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
          justifyContent: "center",
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
            left: "50%",
          }}
        >
          {isNewUser ? "Create Prefrences" : "Save Changes"}
        </Button>
      )}
      <List
        sx={{
          listStyleType: "disc",
          listStylePosition: "inside",
        }}
      >
        {Object.values(preferenceDescription).map((item, key) => (
          <ListItem key={key} sx={{ display: "list-item" }}>
            {item}
          </ListItem>
        ))}
      </List>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Preferences successfully updated"
      />
    </>
  );
}
