import { useState } from "react";

function CreateProject(props) {
  const count = props.count;
  const reload = props.reload;
  const [projects, setProjects] = props.list;
  const read = props.toggleRead;

  const [isVisible, setIsVisible] = useState(false);
  const handleCreate  = () => {
    setIsVisible(true);
    setProjects([...projects, {
      "title": "",
      "description": "",
      "time_init": "",
      "time_end": "",
      "type": "project"
    }]);
    read(count);
  }

  const handleSave = () => {
    setIsVisible(false);
    reload();
  }
  return (
    <>
      {!isVisible && <button onClick={handleCreate}>+ Tạo mới</button>}
      {isVisible && <button onClick={handleSave}>Save</button>}
    </>
  );
}
export default CreateProject;