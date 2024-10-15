import { useEffect, useState } from "react";
import "./TableProject1.css";

const api = 'https://cuddly-zebra-x55wpvrjwq6ghpjgp-8000.app.github.dev/api';

function TableProject1() {
  const [projects, setProjects] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(true);
  const [editing, setEditing] = useState(false);

  const callReloadAPI = () => {
    setReloadAPI((reloadAPI) => {
      return !reloadAPI;
    })
  }

  const accessToken = localStorage.getItem("access");
  const getProjects = async () => {
    const response = await fetch(
      `${api}/project/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  };
  const deleteProject = async (projectID) => {
    await fetch(`${api}/project/${projectID}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  }

  const [editingValue, setEditingValue] = useState({});

  const handleEditValue = (e) => {
    console.log("changed");
    const name = e.target.name;
    const value = e.target.value;
    setEditingValue({ ...editingValue, [name]: value });
  }

  const editProject = async (projectID) => {
    await fetch(`${api}/project/${projectID}/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editingValue),
    })
    console.log("edit xong");
    callReloadAPI();
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjects();
      // Thêm các trường isDisabled và index cho từng project
      const updatedProjects = data.map((item, index) => ({
        ...item,
        isDisabled: true, // Thêm trường isDisabled
        index: index+1, // Thêm trường index
        isCreating: false,
        isEditing: false 
      }));

      // Cập nhật lại state projects với dữ liệu đã chỉnh sửa
      setProjects(updatedProjects);
    };

    fetchData();
  }, [reloadAPI]);

  const handleDeleteItem = async (e) => {
    e.preventDefault();
    await deleteProject(e.target.getAttribute("projectID"));
    callReloadAPI();
  }
  const handleEditItem = (e) => {
    e.preventDefault();
    const index = e.target.getAttribute("projectIndex");
    projects[index-1].isDisabled = false;
    projects[index-1].isEditing = true;
    setEditing(true);
    const projectItem = JSON.parse(e.target.getAttribute("projectItem"));
    setEditingValue(projectItem);
  }

  const handleSaveItem = async (e) => {
    e.preventDefault();
    await editProject(e.target.getAttribute("projectID"));
    editingValue.isDisabled = true;
    setEditing(false);
  }

  const createProject = async () => {
    console.log(editingValue);
    await fetch(`${api}/project/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editingValue),
    })
    console.log("post xong");
    callReloadAPI();
  }

  const handleCreateTempItem = (e) => {
    e.preventDefault();
    setProjects([...projects, {
      "index": projects.length + 1,
      "title": "",
      "description": "",
      "type": null,
      "time_start": null,
      "time_end": null,
      "isDisabled": false
    }])
    setEditingValue({});
  }

  const handleCreateItem = async (e) => {
    e.preventDefault();
    await createProject();
  }


  return (
    <>
      <form>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Loại</th>
              <th>Bắt đầu</th>
              <th>Kết thúc</th>
              <th>Tiến trình</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => {
              return (
                <>
                  <tr key={item.index} className="display">
                    <td>
                      <input value={item.index} disabled={true} name="index" />
                    </td>
                    <td>
                      <input defaultValue={item.title} disabled={item.isDisabled} onChange={handleEditValue} name="title" />
                    </td>
                    <td>
                      <input defaultValue={item.description} disabled={item.isDisabled} onChange={handleEditValue} name="description" />
                    </td>
                    <td>
                      <input defaultValue={item.type} disabled={item.isDisabled} onChange={handleEditValue} name="type" />
                    </td>
                    <td>
                      <input defaultValue={item.time_start} disabled={item.isDisabled} onChange={handleEditValue} name="time_start" />
                    </td>
                    <td>
                      <input defaultValue={item.time_end} disabled={item.isDisabled} onChange={handleEditValue} name="time_end" />
                    </td>
                    <td>
                      <div className="Progress">
                        <div className="progress-container">
                          <div
                            className="progress-bar"
                            style={{ width: "10px", height: "20px" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden"><button projectID={item.id} onClick={handleDeleteItem}>Xóa</button></td>
                    <td className="hidden">{item.isEditing === false ? <button projectID={item.id} projectIndex={item.index} onClick={handleEditItem} projectItem={JSON.stringify(item)} isDisabled={JSON.stringify(item.isDisabled)}>Sửa</button> : <button projectID={item.id} projectIndex={item.index} onClick={handleSaveItem} projectItem={item} >Lưu</button>}</td>
                  </tr>
                </>
              );
            })}
            {editing === false && <tr>
              <td colSpan={7} style={{padding: "0px"}}>{(projects.length > 0 && projects[projects.length - 1].isDisabled === false) ? <button style={{width: "100%"}} onClick={handleCreateItem}>Lưu</button> : <button style={{width: "100%"}} onClick={handleCreateTempItem}>Thêm</button>}</td>
            </tr>}
          </tbody>
        </table>
      </form>
    </>
  );
}
export default TableProject1;
