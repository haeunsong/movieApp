import { render } from "@testing-library/react";
import React from "react"
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component{
  state={
    isLoading:true,
    movies:[]
  };

  // async, await 중요!! 
  getMovies = async()=> {
    // axios가 끝날 때까지 기다려야한다는 것을 알려줌.
  
    const {
      data:{
        data:{movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({movies:movies,isLoading:false}); // 그냥 {movies}라고 써도 됨.
  };

  componentDidMount(){
    this.getMovies();
  }


  render(){
    const {isLoading,movies} = this.state;
    return <div>{isLoading ? "Loading...":movies.map(movie=>{
      console.log(movie);
      return <Movie 
                key={movie.id}
                id={movie.id} 
                year={movie.year} 
                title={movie.title} 
                summary={movie.summary} 
                poster={movie.poster} 
              />
    })}</div>
  }
}


export default App;