function DeleteProject(props) {

  const item = props.item;
  const reload = props.reload;

  const accessToken = localStorage.getItem("access");
  const handleDelete = async () => {
    console.log(item.id);
    const response = await fetch("http://27.79.240.248:8000/api/project/" + item.id + "/", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    reload();
  }

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
export default DeleteProject;