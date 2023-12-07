import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserRegister } from "../../interfaces/users";

const baseUrl =
  import.meta.env.VITE_SERVER_API || "https://store-back-3.onrender.com";

const initialData = [
  3, 4, 1, 6, 5, 8, 4, 2, 4, 4, 5, 2, 3, 5, 3, 5, 4, 6, 5, 5, 2, 4, 3, 0, 6,
];

export default function StackBars() {

  const [data, setData] = useState(initialData)

  const getHourOfDay = (userDate: Date): number => {
    const date = new Date(userDate);
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date object");
    }

    const hour = date.getHours();

    const hourOfDay = (hour + 1) % 24;

    return hourOfDay;
  };

  const extractTimeFromUsers = (users: UserRegister[]) => {
    const usersInHours: number[] = data;
    console.log(usersInHours);

    users.map((user) => {
      let userHourRegister = 0;
      if (user.signup_time) {
        userHourRegister = getHourOfDay(user.signup_time);
        console.log(userHourRegister);
      }
      usersInHours[userHourRegister] += 1;
      console.log(usersInHours);
    });
    return usersInHours
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${baseUrl}/users`);
        const { data } = res;
        const filterData = extractTimeFromUsers(data);
        setData(filterData)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <BarChart
      series={[
        {
          data: data,
          stack: "A",
          label: "User registration/hour",
        },
        {
          data: data,
        },
      ]}
      width={600}
      height={350}
    />
  );
}