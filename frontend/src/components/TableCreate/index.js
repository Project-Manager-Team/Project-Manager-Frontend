function TableCreate() {
  return (
    <>
      <tr>
        <td>
          <select style={{width: "100%"}}>
            <option value={1}>Project</option>
            <option value={2}>Task</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" placeholder="Title" style={{width: "100%"}}></input>
        </td>
      </tr>
      <tr>
        <td>
          <textarea placeholder="Description" rows="4" style={{width: "100%"}}></textarea>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="time_init" style={{marginRight: "10px"}}>Time init:</label>
          <input type="datetime-local" id="time_init"></input>
        </td>
      </tr>
      <tr>
        <td>
          <label htmlFor="time_init" style={{marginRight: "10px"}}>Time init:</label>
          <input type="datetime-local" id="time_init"></input>
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" placeholder="Manager" style={{width: "100%"}}></input>
        </td>
      </tr>
    </>
  );
}
export default TableCreate;

// type, title, description, time_start, time_end, manager type: proj 