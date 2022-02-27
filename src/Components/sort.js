import { Component } from "react";


class Sort extends Component{
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    onClick=(sortBy,sortValue)=>{
       console.log(sortBy+"="+sortValue)
       this.props.onSort(sortBy,sortValue);
    }
  render(){
    return(
        <div className="dropdown">
        <button 
        type="button"
        className="btn btn-primary dropdown-toggle" 
        id="dropdownMenu1" data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="true">
            Sắp xếp <span className="fas fa-sort-amount-down" />
        </button>   
        <ul class="dropdown-menu">
            <li onClick={()=>this.onClick("name",1)}>
            <a role="button" className={this.props.sortBy==='name' && this.props.sortValue===1?'sort_selected':''}>
                <span className="fas fa-sort-alpha-down">A-Z</span>
            </a>
            </li  >
            <li onClick={()=>this.onClick("name",-1)}>
            <a role="button" className={this.props.sortBy==='name' && this.props.sortValue===-1?'sort_selected':''} >
                <span className="fas fa-sort-alpha-down-alt">Z-A</span>
            </a>
            </li>
            <li role="separator" className="devider" />
            <li onClick={()=>this.onClick("status",1)}>
            <a role="button" className={this.props.sortBy==='value' && this.props.sortValue===1?'sort_selected':''} >Trạng thái kích hoạt</a>
            </li>
            <li onClick={()=>this.onClick("status",-1)}>
            <a role="button" className={this.props.sortBy==='value' && this.props.sortValue===-1?'sort_selected':''}>Trạng thái ẩn</a>
            </li>
        </ul>
        </div>
    );
  }
}
export default Sort;