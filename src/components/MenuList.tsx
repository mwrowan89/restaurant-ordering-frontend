import axios from "axios";
import { useEffect } from "react";


const MenuList = () => {
    function getMenuList() {
        return axios.get('/api/menuitems')
          .then(response => response.data)
          .catch(error => {
            console.error("Error fetching menu list:", error);
            throw error;
          });
      }
      
      useEffect(() => {
        getMenuList()
          .then(data => {
            console.log("Menu List:", data);
          })
          .catch(error => {
            console.error("Error:", error);
          });
      },
      []);
  return (
    <div>MenuList</div>
  )
}

export default MenuList;