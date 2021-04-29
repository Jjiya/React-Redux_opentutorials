import React,{ Component } from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Controll from './components/Controll';


class App extends Component {

  /**state 사용(값 하나를 다룰 때의 예시)
   * 함수가 실행될 때 constructor()가 있다면 얘가 젤 먼저 실행되고
   * 얘는 값 초기화를 담당함
   * 
   * 방법
   * 1. state값을 초기화 하고 
   * 2. 초기의 값으로 component 내의 props에 값을 넣어줌
   * 
   * 여기서 state를 통해 초기화 할 component는 Subject임
   * 
   */
  constructor(props){
    super(props);
    // 여기 위까지 값 초기화 끝~~
    // 아래에서부터는 state값을 다시 초기화(값 넣어줌)
    // state화 시킬 component는 Subject이기 때문에 props값을 객체로 줌
    this.state = {
      // welcome페이지인지 read페이지인지 구분하기 위한 mode생성
      mode:'welcome',
      selected_content_id: 2,
      // 1. Subject: { key : value } 형식으로 state를 만듦
      Subject:{
        title:"WEB",
        sub:"word wide WEB !"
      },
      welcome:{title:"WELCOME", desc:"Hello, React!!!"},
      // 2. TOC는 Array[]를 만들고 그 안에 Object{}를 넣어 줌
      // 이름은 꼭 component랑 같지않아도 될듯.. 찾아쓰면 되니께 
      contents:[
        {id: 1, title:"HTML", desc:"HTML is for information"},
        {id: 2, title:"CSS", desc:"CSS is for design"},
        {id: 3, title:"JavaScrpit", desc:"JavaScript is for interactive"}
      ] 
    }// end of state = {}
    this.max_content_id = this.state.contents.length;

  }// end of constructor()
  
  getReadContent(){
    for(var i = 0; i< this.state.contents.length; i++){
      let _content = this.state.contents[i];
      if(_content.id === this.state.selected_content_id){
        // _title = data.title;      
        // _desc = data.desc;
        return _content;
      }//end of inner if()
    }//end of for()
  }
  
  getContent(){
    let _title, _desc, _article, _content = null;
    
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;      
      _desc = this.state.welcome.desc;      
      _article = <ReadContent title={_title} desc={_desc}/>
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}/>
    }else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        console.log("create 중...");
        console.log("title : ", _title);
        console.log("desc : ", _desc);

        // contents.push()보다 concat()을 이용하면 기존 배열을 직접수정하지 않고 새로운 배열을 만들어 state를 수정할 수 있는 장점이 있음
        this.max_content_id++;
        console.log("max_content_id 값 : ", this.max_content_id);
        //concat대신 Array.from()써도 상관x
        let _contents = this.state.contents.concat({id: this.max_content_id, title: _title, desc: _desc})
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
      }.bind(this)}/>
    }else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={(_id, _title, _desc)=>{
        //원본 바꾸지 않고 배열을 복제해서 걔를 수정한 후 state에 반영
        let contentsArray = Array.from(this.state.contents);
        for(var i = 0; i < contentsArray.length; i++){
          if(contentsArray[i].id === _id){
            contentsArray[i] = {
              id: _id,
              title: _title,
              desc: _desc
            }
            break;
          }//end of if()
        }//end of for()
        this.setState({
          contents: contentsArray,
          mode: 'read',
          selected_content_id: _id
        })
      }}/>
    }//end of else if()
    return _article;
  }//end of getContent()

// react에서는 state나 props가 바뀌면 render()가 실행되도록 구축되어있음
// → 변경되면 html이 바뀜
  render(){
    return(
      <div className="App">
        <Subject 
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}
          onChangePage = {function(){
            this.setState({mode:"welcome"});            
          }.bind(this)}  
        />
        {/* <header>
            <h1><a href="/" onClick={function(e){
              console.log(e);
              e.preventDefault();
              this.setState({mode:"welcome"});
            }.bind(this)}>{this.state.Subject.title}</a></h1>
            {this.state.Subject.sub}
        </header> */}
        <TOC list={this.state.contents} onChangePage = {function(id){
          this.setState({
            mode:"read",
            selected_content_id: Number(id)
          });
        }.bind(this)}/>
        <Controll onChangeMode={function(_mode){
          if(_mode === 'delete'){
            if(window.confirm('해당 글을 삭제하시겠습니까?')){

              let contentsArray = Array.from(this.state.contents);
              for(var i = 0; i < contentsArray.length; i++){
                if(contentsArray[i].id === this.state.selected_content_id){
                  contentsArray.splice(i,1);
                  break;
                }//end of if()
              }//end of for()
              //this.max_content_id--; 이거 하니까 중간 글 없애고 다시 추가하고 이러니까 id값이 겹치넹...
    
              this.setState({
                contents: contentsArray,
                mode: 'welcome'
              })
            }
          }else{
            this.setState({mode:_mode});
          }
        }.bind(this)}/>
        {this.getContent()}
      </div>
    );
  }
} //end of App

export default App;
