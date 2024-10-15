import './TableProject.css';
import { useEffect, useState} from 'react';
import axios from "axios";
import EditProject from '../EditProject';
import DeleteProject from '../DeleteProject';
import CreateProject from '../CreateProject';
function TableProject() {

  const [reloadProject, setReloadProject] = useState(true);
  const callReloadProject = () => {
    setReloadProject(!reloadProject);
  }

  const [isRead, setIsRead] = useState([]);
  const toggleRead = (count) => {
    console.log(isRead[count]);
    setIsRead(!isRead[count]);
    console.log(isRead[count]);
  }

  const accessToken = localStorage.getItem("access");
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get('http://27.79.240.248:8000/api/project/', {
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
      setIsRead(new Array(data.length).fill(true));
      console.log(isRead);
    };

    fetchData(); // Gọi hàm fetchData
  }, [reloadProject]); // Chỉ chạy khi component mount lần đầu

  let count = 1;

  return (
    <>
    <div className="table-container">
    <table className="table_project">
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
            if(item.type === "project") {
              return (
                <tr key={count++}>
                  <td><input type='text' value={count} readOnly={isRead[count-1]}></input></td>
                  <td><input type='text' value={item.title} readOnly={isRead[count-1]}></input></td>
                  <td><input type='text' value={item.description} readOnly={isRead[count-1]}></input></td>
                  <td><input type="datetime-local" value={item.time_start} readOnly={isRead[count-1]}></input></td>
                  <td><input type='datetime-local' value={item.time_end} readOnly={isRead[count-1]}></input></td>
                  <td>
                    <div className="progress-container">                  
                      <div className="progress-bar" style={{width: `${index}%`, height: "20px"}}></div>
                    </div>
                  </td>
                  <td><EditProject item={item} reload={callReloadProject}/></td>
                  <td><DeleteProject item={item} reload={callReloadProject}/></td>
                </tr>
              );
            }
            return "";
          })}
          <tr>
            <td colSpan={6}>
              <CreateProject count={count} reload={callReloadProject} list={[projects, setProjects]} toggleRead={toggleRead}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
}
export default TableProject