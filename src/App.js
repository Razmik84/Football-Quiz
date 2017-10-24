import React, { Component } from 'react';
import './App.css';
import { answers } from './api/api-answers';
import { questions } from './api/api-questions';
import {Button} from 'react-bootstrap';
import {Col, Thumbnail, Label, ProgressBar} from 'react-bootstrap';
import welcome from './assets/welcome.jpg';
import back from './assets/back.jpg';
import end from './assets/end.jpg';


class App extends Component {

  constructor(props){
    super(props);

    this.state= { loading: true, count: 0, progress: 10}
    
}
 increaseCounter() {
  this.setState({count: this.state.count + 1});
}
componentDidMount () {
  setTimeout(() => this.setState({ loading: false }), 3000)
}
  render() {

    if(this.state.progress < 100) {
      setTimeout(() => this.setState({ progress: this.state.progress + 20 }), 500)
    }

    const { loading } = this.state
    if (loading) {
      return <div id= 'loading'>
        <div id = 'loader'><h1>Loading Please Wait...</h1></div>
        <div id = "progressBar">
          
        <ProgressBar  active now={this.state.progress} />
        </div>

      </div>
    }

    if(this.state.count == 3){
      return <div className = "container" id = "end">
        
        <h1 id = "congratulations">Congratulations</h1>
      </div>
    }
    
    let answerArray = [];
    let questionArray = [];

    for(let i=0; i<answers.length; i++){
      if(this.state.count === 0){
        answerArray = answerArray.concat(answers[0], answers[1], answers[2]);
        break;
      }else if(this.state.count > 0){
        answerArray = answerArray.concat(answers[this.state.count * 3],
          answers[this.state.count * 3 + 1],
          answers[this.state.count * 3 + 2] );
        break;
      }
    }

    for(let i=0; i<questions.length; i++){
      if(this.state.count === 0){
        questionArray = answerArray.concat(questions[0]);
        break;
      }else if(this.state.count > 0){
        questionArray = answerArray.concat(questions[this.state.count]);
        break;
      }
    }
 
    return (
      <div className="App" >
          <header className="App-header">
          <h1 className="App-title">Football Quiz</h1>
        </header>
      <div >
        {questionArray.map(question =>{
          return(
            <div>
            {<h1>{question.question}</h1>}
        </div>
          )
        })}

      </div>


        <div>
          {answerArray.map(answer => {
    return (

    <div>
      
      <div className='box'>
          <Col xs={9} md={4}>
            <Thumbnail onClick = {() => answer.description === true ? this.increaseCounter() : 
              this.setState({count: 0})} href="#" alt="171x180" src={answer.image} />
            <Label className = "label" bsStyle="primary">{answer.name}</Label>&nbsp;
          </Col>

      </div>
    </div>
    )
            })}
        </div>

      </div>
    )


  }

}

export default App;
