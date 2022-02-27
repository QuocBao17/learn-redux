import { Component } from "react";
import './App.css'
import Control from "./Components/control";
import List from "./Components/list";
import Form from "./Components/taskForm";
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isDisPlayForm:false,
      taskEditing:null,
      filter:{
        name:"",
        status:-1
      },
      keyword:"",
      sortBy:'name',
      sortValue:1
    }
  }
  componentDidMount(){
    if(localStorage!=null && localStorage.getItem('tasks')!=null){
      var tasks=JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks:tasks
      });
    }
  }
  onGenerateData =()=>{
    console.log('Generate Data ....')
    var tasks = [
      {
        id:1,
        name:'Học C++',
        status:true
      },
      {
        id:2,
        name:'Học Java',
        status:false
      },
      {
        id:3,
        name:'Học PHP',
        status:true
      },
      {
        id:4,
        name:'Học C#',
        status:false
      }
    ]
    this.setState({
      tasks:tasks
    });
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }
  showForm=()=>{
    this.setState({
      isDisPlayForm:!this.state.isDisPlayForm,
      taskEditing:null
    })
  }
  onReciveData=(name, status,id)=>{
    if(id===""){
      var maxid=0;
      this.state.tasks.map((item,index)=>{
        maxid=item.id+1;
        return maxid;
      });
      var statustemp=true;
      if(status==="true"?statustemp=true:statustemp=false);
      console.log(status+" vs "+statustemp)
      var temp ={
        id:maxid,
        name:name,
        status:statustemp,
      }
      var tasks=this.state.tasks;
      var isDisPlayForm=this.state.isDisPlayForm;
      tasks.push(temp);
      this.setState({
        tasks:tasks,
        isDisPlayForm:!isDisPlayForm,

      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    else{
      var {tasks}=this.state;
      var index=this.findIndex(id);
      var isDisPlayForm=this.state.isDisPlayForm;
      var { taskEditing}=this.state;
      if(index!==-1){
        tasks[index].status=status;
        tasks[index].name=name;
        this.setState({
          tasks:tasks,
          isDisPlayForm:!isDisPlayForm,
          taskEditing:null
        })
        localStorage.setItem("tasks",JSON.stringify(tasks));
      }
    }
   
  }
  findIndex=(id)=>{
    var {tasks}=this.state;
    var result=-1;
    tasks.forEach((task,index)=>{
      
      if(task.id===id){
        result=index;
      }
    });
    return result;
  }
  onUpdateStatus=(id)=>{ 
    var {tasks}=this.state;
    var index=this.findIndex(id);
    console.log(index);
    if(index!==-1){
      tasks[index].status=!tasks[index].status;
      this.setState({
        tasks:tasks
      })
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
  }
  onDeleteTasks=(id)=>{
    var {tasks}=this.state;
    var index=this.findIndex(id);
    if(index!==-1){
      tasks.splice(index,1);
      this.setState({
        tasks:tasks
      })
      if(this.state.isDisPlayForm===true){
        this.state.isDisPlayForm=false;
      }
      localStorage.setItem("tasks",JSON.stringify(tasks));
    }
  }
  onUpdateTasks=(id)=>{
    var {tasks}=this.state;
    var {isDisPlayForm}=this.state;
    if(isDisPlayForm===false){
      this.setState({
        isDisPlayForm:true
      })
    }
    var index=this.findIndex(id);
    var taskEdit=tasks[index];
    
    this.setState({
      taskEditing:taskEdit
    },()=>{
      console.log(this.state.taskEditing)
    })
  }
  onFilter=(filterName,filterStatus)=>{
    this.setState({
      filter: {
        name:filterName.toLowerCase(),
        status:+filterStatus
      }
    })
    console.log(this.state)
  
  }
  onSearch=(key)=>{
    this.setState({
      keyword:key
    })
  }
  onSort=(sortBy, sortValue)=>{
    this.setState({
      sortBy:sortBy,
      sortValue:sortValue
    })
    console.log(this.state)
  }
  render(){
    var tasks=this.state.tasks;
    var {sortBy, sortValue}= this.state;
    var {keyword}=this.state;
    if (keyword) {
      console.log(typeof keyword)
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    
    var {filter}=this.state;
    if(filter){
      if(filter.name){
        console.log(tasks)
        tasks=tasks.filter((task)=>{
          console.log(task.name.toLowerCase().indexOf(filter.name)!==-1)
          return task.name.toLowerCase().indexOf(filter.name)!==-1;
        });
      }
      tasks=tasks.filter((task)=>{
        if(filter.status===-1){
          return task;
        }
        else{
          return task.status===(filter.status===1?true:false);
        }
        
      })
    }
    if(sortBy==='name'){
      console.log('b')
      tasks.sort((a,b)=>{
        if(a.name>b.name){
          return sortValue;
        }
        else if(a.name<b.name){
          return -sortValue;
        }
        else{
          return 0;
        }
      })
    }
    else if(sortBy==='status'){
      console.log('a')
      tasks.sort((a,b)=>{
        if(a.status>b.status){
          return -sortValue;
        }
        else if(a.status<b.status){
          return sortValue;
        }
        else{
          return 0;
        }
      })
    }
    var checkDisPlayForm=this.state.isDisPlayForm;
    var elementForm =checkDisPlayForm===true? <Form onRecive={this.onReciveData} task={this.state.taskEditing} isDisPlayForm={this.state.isDisPlayForm}/> :'';
    return(
      <div className="container">
        <div className="text-center">
          <h1>Quản lý công việc</h1><hr/>
        </div>       
        <div className="row">
          <div className={checkDisPlayForm===true?"col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
            {/* From*/}           
              {elementForm}           
          </div>
          <div className={checkDisPlayForm===true?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>       
            <button type="button" class="btn btn-primary" onClick={this.showForm}>
             <span className="fas fa-plus" ></span> {checkDisPlayForm===true?"Đóng Form":"Thêm công việc"}
            </button>
            <button type="button" class="btn btn-danger ml-5" onClick={this.onGenerateData}>
             <span className="fas fa-plus" ></span> Data
            </button>
            {/*Search - Sort*/}       
            <div className="row mt-15">
                <Control onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
            </div> 
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">   
                  <List listTasks={tasks} 
                   onUpdateStatus={this.onUpdateStatus}
                   onDeleteTasks={this.onDeleteTasks}
                   onUpdateTasks={this.onUpdateTasks}
                   onFilter={this.onFilter}/>     
              </div>
            </div>
          </div>        
        </div>  
      </div>
    );
  }
}
export default App;