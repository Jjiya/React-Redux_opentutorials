import React, {Component} from 'react';


class Subject extends Component{
    render(){
        return(
            <header>
                <h1><a href="/" onClick={function(e){
                  e.preventDefault();
                  this.props.onChangePage();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.sub}
            </header>
        );
    }
}

export default Subject;

/**클래스 형 방식
 * class Subject extends Component{
    render(){
      return(
        <>
          <h2>{this.props.title}</h2>
          <p>{this.props.content}</p>
        </>
      );
    }
  }// end of Subject

  * function형은 아래 방식 사용
 
  function Subject(props){
   return(
     <>
       <h2>{props.title}</h2>
       <p>{props.content}</p>
       <p>함수형임</p>
     </>
   );
 }
 */