import React, { Component } from 'react';
import alphabets from './alphabets.json';
import classnames from 'classnames';

class EasyAbc extends Component{
    constructor(props)
    {
        super(props)
        
        this.state = {
            alphabets: alphabets,
            currentPosition: 0,
            currentTick: 0,
            random:false,
            sound:true
        };

        this.Next = this.Next.bind(this);
        this.Prev = this.Prev.bind(this);
        this.playSound = this.playSound.bind(this);
        this.switchRandom = this.switchRandom.bind(this);
        this.switchSound = this.switchSound.bind(this);
        this.manuelPlaySound = this.manuelPlaySound.bind(this);
    }
    componentDidMount()
    {
        let letterSound = document.querySelector('audio[data-key="letter"]');
        //let wordSound = document.querySelector('audio[data-key="word"]');
        if(this.state.currentPosition === 0)
        {
            letterSound.currentTime = 0;
            letterSound.play();
        }
        
    }
    componentDidUpdate()
    {
        this.playSound();
    }
    manuelPlaySound()
    {

        let letterSound = document.querySelector('audio[data-key="letter"]');
        let wordSound = document.querySelector('audio[data-key="word"]');

        if(this.state.currentTick === 0)
        {
            letterSound.currentTime = 0;
            letterSound.play();
        }
        else
        {
            wordSound.currentTime = 0;
            wordSound.play();
        }
    }
    playSound()
    {
        let letterSound = document.querySelector('audio[data-key="letter"]');
        let wordSound = document.querySelector('audio[data-key="word"]');
        
        if(this.state.sound)
        {
            if(this.state.currentTick === 0)
            {
                letterSound.currentTime = 0;
                letterSound.play();
            }
            else
            {
                wordSound.currentTime = 0;
                wordSound.play();
            }
        }
    }
    randomNumber(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Next(){
        
        if(this.state.random)
        {
            if(this.state.currentTick < 2)
            {
                    this.setState({currentTick: this.currentTick -1});
            }else
            {
                this.setState({
                    currentPosition: this.randomNumber(0,25), currentTick: 0
                });
            }
            
        }
        if(this.state.currentPosition === this.state.alphabets.length -1)
        {
            
            if(this.state.currentTick <2 )
            {
                this.setState({currentTick: this.state.currentTick + 1});
            }  
            else
            {
                this.setState({currentPosition: 0, currentTick: 0});
            }
        }
        else
        {
            if(this.state.currentTick <2 )
            {
                this.setState({currentTick: this.state.currentTick + 1});
            }  
            else
            {
                this.setState({currentPosition: this.state.currentPosition + 1, currentTick: 0});
            }
        }
        
        
    }
    Prev()
    {
        console.log("previous button clicked");
        console.log(this.state.currentPosition, this.state.currentTick);
        if(this.state.currentPosition > 0)
        {
            this.setState({currentPosition: this.state.currentPosition - 1});
        }else
        {
            this.setState({currentPosition: this.state.alphabets.length -1});
        }
    }
    switchRandom()
    {
        this.setState({random: !this.state.random});
        this.Next();
        
    }
  
    switchSound()
    {
        this.setState({sound: !this.state.sound});
        //this.Next();
        
    }
    render(){
        
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick === 2 ? true : false;
        console.log(this.state.currentTick, showImage);
        
        return(
        <div className="game">
            <span className="random-label">Random Letters: </span>
            <label className="switch">
                <input type="checkbox"
                onClick={this.switchRandom}
                defaultValue="false"
                checked={this.state.random}></input>
                <div className="slider round"></div>
            </label>
            <span className="random-label">Sound: </span>
            <label className="switch">
                <input type="checkbox"
                onClick={this.switchSound}
                defaultChecked="true"
                checked={this.state.sound}></input>
                <div className="slider round"></div>
            </label>
            <div className="options">
                <div className="fields">
                    <div className="field-block">
                        {this.state.alphabets[this.state.currentPosition].letter}
                    </div>
                    <audio src={this.state.alphabets[this.state.currentPosition].letterSound} 
                    data-key="letter"></audio>
                </div>
                
                <div className="buttons">
                    <a href="#" onClick={this.Prev} className="button prev">Previous</a>
                    <a href="#" onClick={this.manuelPlaySound} className="button sound">Play Sound Again</a>
                    <a href="#" onClick={this.Next} className="button next">Next</a>
                </div>
                <div className="fields">
                    <div className="field-block">
                        <div className="left-field">
                            <div className={classnames('placeholder-span', {hide: showImage})}>Click Next To View Image</div>
                            <img className={classnames('letter-image', {hide: !showImage})} 
                            src={this.state.alphabets[this.state.currentPosition].image} 
                            alt={this.state.alphabets[this.state.currentPosition].word}></img>
                            <audio src={this.state.alphabets[this.state.currentPosition].wordSound} 
                        data-key="word"></audio>
                        </div>
                        
                        <div className="right-field">
                            <div className={classnames('placeholder-span',{hide: showWord})}>Click Next To View Spelling</div>
                            <div className={classnames('word',{hide: !showWord})}>
                                {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default EasyAbc;