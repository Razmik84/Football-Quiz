import React, { Component } from 'react';
import './App.css';
import { answers } from './api/api-answers';
import { questions } from './api/api-questions';
import {Thumbnail, Label, ProgressBar} from 'react-bootstrap';



class App extends Component {

  constructor(props){
    super(props);

    this.state= { loading: true,
                  count: 0, 
                  progress: 10, 
                  wrongAnswer: false,
                  exit: false,
                  points: 0
                }
    
}
 increaseCounter() {
  this.setState({count: this.state.count + 1, points: this.state.points + 100});
}

restart() {
  this.setState({count: 0, wrongAnswer: false, points:0});
}

exit() {
  this.setState({exit: true});
}

componentDidMount () {
  setTimeout(() => this.setState({ loading: false }), 3000)
}
  render() {

    if(this.state.progress < 100) {
      setTimeout(() => this.setState({ progress: this.state.progress + 20 }), 500)
    }

    const { loading, wrongAnswer, exit } = this.state
    if (loading) {
      return <div id= 'loading'>
                <div className="row">
                    <div col-md-12>
                    <div id = 'loader'><h1>Loading Please Wait...</h1></div>
                    <ProgressBar striped bsStyle="danger"  active now={this.state.progress} />
                  </div>
                </div>

              </div>
    }

    if(exit) {
      return <div id="exit">
                <h1 id="exitMessage">Thank You For Using Our Quiz</h1>
             </div>
    }

    if(wrongAnswer) {
      return <div id="wrongAnswer" className="row">
                <div className="col-md-offset-3 col-md-6">
                  <h1 id="wrongHeading">Wrong Answer</h1>
                  <h3>You Got {this.state.points} Points, Better Luck Next Time</h3>
                </div>

                <div id="buttons" className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
                 <button className="btn btn-primary btn-block btn-lg" id="btn-wrong1" onClick = {() => this.restart()}>Restart</button>
                 <button className="btn btn-danger btn-block btn-lg" id="btn-wrong2" onClick={() => this.exit()}>Exit</button>
                </div>
              </div>
    }



    if(this.state.count === 10){
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
      }
      else if(this.state.count > 0){
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
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-6 ">
                <h1 className="App-title">Football Quiz</h1>
              </div>
            </div>
          </header>

        <div className="container-fluid">
          <div className="row">
            {questionArray.map(question =>{
              return(
                <div className="col-sm-12 col-md-6 col-md-offset-3">
                    <h1 id="questions">{question.question}</h1>
                </div>
                  )
                })}
          </div>
        </div>


      <div className="container-fluid">
        <div className="row">
            {answerArray.map(answer => {
            return (
              <div id="question-area"  >

                      <div className="col-sm-4 col-md-4">
                        <Thumbnail className="img-thumbnail" onClick = {() => answer.description === true ? 
                          this.increaseCounter() : 
                          this.setState({wrongAnswer: true})} href="#" alt="171x180" src={answer.image} />
                        <Label className = "label block" >{answer.name}</Label>&nbsp;
                      </div>
              </div>
            )
              })}
        </div>
      </div>


        <div id="points" className="row">
          <div className="col-md-offset-10 col-md-2 ">
            <h1 className="badge">{this.state.points}</h1>
          </div>
        </div>

      </div>
    )
 }
}

export default App;
