import { useEffect, useState } from "react";
import "./TableProject1.css";
function TableProject1() {
  const [projects, setProjects] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(true);

  const callReloadAPI = () => {
    setReloadAPI((reloadAPI) => {
      return !reloadAPI;
    })
  }
  console.log(projects);

  const accessToken = localStorage.getItem("access");
  const getProjects = async () => {
    const response = await fetch(
      "http://27.79.240.248:8000/api/project/personal/",
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
    const response = await fetch(`http://27.79.240.248:8000/api/project/${projectID}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
  }

  const [editingValue, setEditingValue] = useState({});

  const handleEditValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setEditingValue({ ...editingValue, [name]: value });
  }

  const editProject = async (projectID, projectIndex) => {
    console.log(editingValue);
    const response = await fetch(`http://27.79.240.248:8000/api/project/${projectID}/`, {
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
    const index  = e.target.getAttribute("projectIndex");
    let tmp = [...projects];
    tmp[index-1].isDisabled = false;
    setProjects(tmp);
    setEditingValue(tmp[index-1]);
  }

  const handleSaveItem = async (e) => {
    e.preventDefault();
    const index  = e.target.getAttribute("projectIndex");
    let tmp = [...projects];
    tmp[index-1].isDisabled = true;
    tmp[index-1] = editingValue;
    console.log(tmp);
    setProjects(tmp);
    console.log(projects);
    await editProject(e.target.getAttribute("projectID"), e.target.getAttribute("projectIndex"));
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
                <tr key={item.index}>
                  <td>
                    <input value={item.index} disabled={item.isDisabled} name="index" />
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
                  <td><button projectID={item.id} onClick={handleDeleteItem}>Xóa</button></td>
                  <td>{item.isDisabled == true ? <button projectID={item.id} projectIndex={item.index} onClick={handleEditItem}>Sửa</button> : <button item={item} projectID={item.id} projectIndex={item.index} onClick={handleSaveItem}>Lưu</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </>
  );
}
export default TableProject1;
