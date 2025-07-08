import { LOGOUT } from "../../Api/Api";
import { Axios } from "../../Api/axios";

export default function Logout() {
  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
