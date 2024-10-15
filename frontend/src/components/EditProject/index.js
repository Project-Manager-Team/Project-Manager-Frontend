import { useState } from "react";

function EditProject(props) {
  const [item, setItem] = useState(props.item);
  const reload = props.reload;
  return (
    <>
      <button>Edit</button>
    </>
  );
}
export default EditProject;