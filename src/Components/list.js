import { Component } from "react";
import ListItem from "./listItem";
class List extends Component{
    constructor(props){
        super(props);
        this.state ={
            filterName:"",
            filterStatus:-1
        }
    }
    onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.props.onFilter(name==="filterName"?value:this.state.filterName,name==="filterStatus"?value:this.state.filterStatus)
        this.setState({
            [name]:value
        });
    }
  render(){
      var tasks=this.props.listTasks;
      var {filterName , filterStatus} = this.state;
      var elementTask=tasks.map((task,index)=>{
          return <ListItem key={task.id} tasks={task}
          onUpdateStatus={this.props.onUpdateStatus} 
          onDeleteTasks={this.props.onDeleteTasks}
          onUpdateTasks={this.props.onUpdateTasks}/>
      })
    return(
        <table className="table table-bordered table-hover mt-15">
            <thead>
                <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng thái</th>
                <th className="text-center">Hoạt động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td />
                <td>
                    <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange} />
                </td>
                <td>                         
                    <select name="filterStatus" className="form-control" value={filterStatus} onChange={this.onChange}>
                    <option value="-1">Tất cả</option>
                    <option value="0">Ẩn</option>
                    <option value="1">Kích hoạt</option>
                    </select>
                </td>
                <td />
                </tr>
                {elementTask}
            </tbody>
        </table>

    );
  }
}
export default List;