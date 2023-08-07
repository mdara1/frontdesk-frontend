// const singleStudentpreference = {
//     monday: [
//       {
//         time: "08:00",
//         preference: 0
//       },
//       {
//         time: "09:00",
//         preference: 0
//       },
//       {
//         time: "10:00",
//         preference: 0
//       },
//       {
//         time: "11:00",
//         preference: 0
//       },
//       {
//         time: "12:00",
//         preference: 0
//       },
//       {
//         time: "01:00",
//         preference: 0
//       },
//       {
//         time: "02:00",
//         preference: 0
//       },
//       {
//         time: "03:00",
//         preference: 0
//       },
//       {
//         time: "04:00",
//         preference: 0
//       }
//     ],
//     tuesday: [
//       {
//         time: "08:00",
//         preference: 0
//       },
//       {
//         time: "09:00",
//         preference: 0
//       },
//       {
//         time: "10:00",
//         preference: 0
//       },
//       {
//         time: "11:00",
//         preference: 0
//       },
//       {
//         time: "12:00",
//         preference: 0
//       },
//       {
//         time: "01:00",
//         preference: 0
//       },
//       {
//         time: "02:00",
//         preference: 0
//       },
//       {
//         time: "03:00",
//         preference: 0
//       },
//       {
//         time: "04:00",
//         preference: 0
//       }
//     ],
//     wednesady: [
//       {
//         time: "08:00",
//         preference: 0
//       },
//       {
//         time: "09:00",
//         preference: 0
//       },
//       {
//         time: "10:00",
//         preference: 0
//       },
//       {
//         time: "11:00",
//         preference: 0
//       },
//       {
//         time: "12:00",
//         preference: 0
//       },
//       {
//         time: "01:00",
//         preference: 0
//       },
//       {
//         time: "02:00",
//         preference: 0
//       },
//       {
//         time: "03:00",
//         preference: 0
//       },
//       {
//         time: "04:00",
//         preference: 0
//       }
//     ],
//     thursday: [
//       {
//         time: "08:00",
//         preference: 0
//       },
//       {
//         time: "09:00",
//         preference: 0
//       },
//       {
//         time: "10:00",
//         preference: 0
//       },
//       {
//         time: "11:00",
//         preference: 0
//       },
//       {
//         time: "12:00",
//         preference: 0
//       },
//       {
//         time: "01:00",
//         preference: 0
//       },
//       {
//         time: "02:00",
//         preference: 0
//       },
//       {
//         time: "03:00",
//         preference: 0
//       },
//       {
//         time: "04:00",
//         preference: 0
//       }
//     ],
//     friday: [
//       {
//         time: "08:00",
//         preference: 0
//       },
//       {
//         time: "09:00",
//         preference: 0
//       },
//       {
//         time: "10:00",
//         preference: 0
//       },
//       {
//         time: "11:00",
//         preference: 0
//       },
//       {
//         time: "12:00",
//         preference: 0
//       },
//       {
//         time: "01:00",
//         preference: 0
//       },
//       {
//         time: "02:00",
//         preference: 0
//       },
//       {
//         time: "03:00",
//         preference: 0
//       },
//       {
//         time: "04:00",
//         preference: 0
//       }
//     ]
//   };
const slots = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const singleStudentpreference = days.map((day) => ({
  day,
  schedule: slots.map((time) => ({
    time: time.replace(":", ""),
    preference: "0",
  })),
}));
const preferenceDescription = {
  0: "0-Prohibited",
  1: "1-Strongly Discouraged",
  2: "2-Discouraged",
  3: "3-Neutral",
  4: "4-Preferred",
  5: "5-Strongly Preferred",
};
export { singleStudentpreference, slots, preferenceDescription };
