import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { getPreferences, getStudents } from "../apis";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { StyledTableCell, StyledTableRow } from "../styles/style";

const Admin = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); // Initialize students state as an empty array
  const [studentSchedules, setStudentSchedules] = useState({}); // State to hold student schedules

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents("STUDENT");
      const data = await response.json();

      if (data.data) {
        console.log(data.data);
        setStudents(data.data); // Update students state with fetched data
      }

      // Assuming you have a way to fetch student schedules here
      const schedules = {}; // Format: { studentEmail: [schedule] }
      setStudentSchedules(schedules);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onClickHandler = (email) => {
    let formData = { email: email, role: "STUDENT" };
    navigate("/view", { state: formData });
  };

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textDecoration: "underline" }}
      >
        Students list
      </Typography>
      {students.map((item) => (
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
      ))}
    </>
  );
};

export default Admin;
