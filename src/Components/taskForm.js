import { Component } from "react";
class Form extends Component{
  constructor(props){
      super(props);
      this.state={
        id:'',
        name:'',
        status:"true"
      }
  }
  componentDidMount(){
    if(this.props.task){
      console.log(this.props.task)
      this.setState({  
        id:this.props.task.id,
        name:this.props.task.name,
        status:this.props.task.status
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps){
      this.setState({  
        id:nextProps.task.id,
        name:nextProps.task.name,
        status:nextProps.task.status
      })
    }
  }
  onChange=(e)=>{
      var target =e.target;
      var name=target.name;
      var value=target.value;
      this.setState({
        [name]:value
      });
  }
  onSubmit=(e)=>{ 
    console.log(this.state.id)
    this.props.onRecive(this.state.name,this.state.status,this.state.id)
    e.preventDefault();
  }
  onCLear=()=>{
    this.setState({
      name:"",
      status:"true"
    })
  }
  render(){
   
    return(
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                    {this.state.id===""?"Thêm công việc":"Cập nhật công việc"}           
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label >Tên: </label>
                    <input 
                    type="text"
                    className="form-control" 
                    placeholder="Input field" 
                    name="name" 
                    value={this.state.name}
                    onChange={this.onChange}/>
                </div>
                <label>Trạng thái</label>
                <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}>
                    <option value={"true"}>Kích hoạt</option>
                    <option value={"flase"}>Ẩn</option>
                </select><br />
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">
                    <span className="fas fa-plus mr-5" />Lưu lại
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onCLear}>
                    <span className="fas fa-times mr-5" />Hủy bỏ
                    </button>
                </div>
                </form>
            </div>
        </div>

    );
  }
}
export default Form;