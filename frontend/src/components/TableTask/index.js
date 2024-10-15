import "./TableTask.css";
import { useEffect, useState } from "react";
import axios from "axios";
function TableTask() {

  const accessToken = localStorage.getItem("access");
  const [projects, setProjects] = useState([]);
  const getData = async () => {
    try {
      const { data } = await axios.get('http://27.79.176.204:8000/api/info/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return data; // Trả về dữ liệu thực tế
    } catch (err) {
      return []; // Trả về mảng rỗng nếu có lỗi
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(); // Gọi hàm getData và đợi kết quả
      setProjects(data); // Cập nhật state với dữ liệu
    };

    fetchData(); // Gọi hàm fetchData
  }, []); // Chỉ chạy khi component mount lần đầu

  let count = 1;

  return (
    <>
      <div className="table-container">
        <table className="table_task">
          <thead>
            <tr>
              <th className="STT">STT</th>
              <th className="Title">Title</th>
              <th className="Description">Description</th>
              <th className="TimeStart">Time start</th>
              <th className="TimeEnd">Time end</th>
              <th className="Progress">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(function(item, index) {
              if(item.type === "task") {
                return (
                  <tr>
                    <td>{count++}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.time_start.substring(0,10)}</td>
                    <td>{item.time_end.substring(0,10)}</td>
                    <td>
                        <div class="task">
                            <input type="checkbox" id={count} class="checkbox" />
                            <label htmlFor={count} class="checkbox-label">Đã hoàn thành</label>
                        </div>
                    </td>
                  </tr>
                );
              }
              return "";
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TableTask;