import { useState } from "react";
import './Table.css';
import TableCreate from "../TableCreate";
 

function Table() {

  const [option, setOption] = useState(1);
  const handleOption = (e) => {
    console.log(e.target.value);
    setOption(e.target.value);
  }

  const handleSubmit = () => {

  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>
              <select onChange={handleOption} style={{width: "100%"}}>
                <option value={1}>CREATE</option>
                <option value={2}>EDIT</option>
                <option value={3}>DELETE</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {option == 1 && <TableCreate/>}
        </tbody>
      </table>
    </form>
    </>
  );
}
export default Table;