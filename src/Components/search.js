import { Component } from "react";

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:""
    }
  }
  onChange=(event)=>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    this.setState({
      [name]:value
    })
  }
  onSearch=()=>{
    this.props.onSearch(this.state.keyword)
  }
  render(){
    return(
        <div className="input-group">
        <input 
            name="keyword"
            value={this.state.keyword}
            onChange={this.onChange}
            type="text" 
            className="form-control" 
            placeholder="Nhập từ khóa" />
        <span className="input-group-btn">
            <button type="button" className="btn btn-warning" onClick={this.onSearch}>
              <span className="mr-5 fas fa-search"> Tìm</span>
            </button>
        </span>
        </div>
    );
  }
}
export default Search;