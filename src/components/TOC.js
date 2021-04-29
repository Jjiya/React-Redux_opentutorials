import React, {Component} from 'react';

class TOC extends Component{
    /** 
    shouldComponentUpdate(newProps, newState){
        if(this.props.data === newProps.data){
            return false;
        }
        return true;
    }
    */
   
    render(){
        //드디어 반복문!!!
        //받아온 state를 받을 배열 생성
        let lists = [];
        //state에 담은 data를 가져오는 변수 생성
        let data = this.props.list;

        //돌려돌려
        var i = 0;
        while (i< data.length) {
            /**
             * list에 data의 배열 길이만큼 돌려주면서 값 담음(꺼내쓰는 법은 나중에 봐도 알겠지?)
             * 
             * element여러개를 생성하는 경우에 주의할 점! 콘솔에 아래 에러가 발생함
             * index.js:1 Warning: Each child in a list should have a unique "key" prop.
             * 여러개의 목록을 자동 생성할 때는 각각의 목록을 식별할 수 있는 식별자를 만들어줘야함
             * 내가 만드는 프로그램에서 필요한 값이 아니라 react자체적으로 필요한 "key prop"이므로 그냥 해주면 됨
             * → <li key={data[i].id}> 이런식으로 state에서 만든 id를 그냥 넣어줌 
             * 
             * 그냥 key={i} 해도 상관없지만 생성하는 element가 2개일때는 tag가 달라도 id가 겹치면 안되넹
             */
            
            /**
             * 1. html의 data- 속성을 이용해 id를 부여하는 법
             * 2. 속성을 안쓰고(data-id) bind()에 data[i].id를 넣어주는 법
             * onClick={function(id, e){
                            e.preventDefault();
                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}>
                이런식으로 bind에 data[i].id를 넣어줘도 정상적으로 됨.
             */
            
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/"+data[i].id}
                        data-id = {data[i].id}
                        onClick={function(e){
                            e.preventDefault();
                            this.props.onChangePage(e.target.dataset.id);
                        }.bind(this)}>
                        {data[i].title}
                    </a>
                </li>
            );
            //lists.push(<p key={i}>{data[i].desc}</p>)
            i++;
        }
        return(
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;