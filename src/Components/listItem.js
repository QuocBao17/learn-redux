import { Component } from "react";
class ListItem extends Component{
  onUpdateStatus=()=>{
    this.props.onUpdateStatus(this.props.tasks.id);
  }
  onDelete=()=>{
    this.props.onDeleteTasks(this.props.tasks.id);
  }
  onUpdateTasks=()=>{
    this.props.onUpdateTasks(this.props.tasks.id);
  }
  render(){
    var {tasks}=this.props;
    return(
        <tr>
            <td>{tasks.id}</td>
            <td>{tasks.name}</td>
            <td className="text-center">
                <span onClick={this.onUpdateStatus} className={tasks.status===true?"label label-danger":"label label-warning"}>{tasks.status===true?"Kích hoạt":"Chưa kích hoạt"}</span>
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={this.onUpdateTasks}>
                <span className="fas fa-pencil-alt mr-5" />Sửa
                </button>&nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                <span className="fas fa-trash mr-5" />Xóa
                </button>
            </td>
        </tr>

    );
  }
}
export default ListItem;