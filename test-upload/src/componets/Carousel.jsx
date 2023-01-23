// import React, { useState, useEffect } from "react";

// class Carousel extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentIndex: 0,
//     };
//     this.previous = this.previous.bind(this);
//     this.next = this.next.bind(this);
//   }

//   previous() {
//     const lastIndex = this.props.recipes.length - 1;
//     const { currentIndex } = this.state;
//     const shouldResetIndex = currentIndex === 0;
//     const index = shouldResetIndex ? lastIndex : currentIndex - 1;
//     this.setState({
//       currentIndex: index,
//     });
//   }

//   next() {
//     const lastIndex = this.props.recipes.length - 1;
//     const { currentIndex } = this.state;
//     const shouldResetIndex = currentIndex === lastIndex;
//     const index = shouldResetIndex ? 0 : currentIndex + 1;
//     this.setState({
//       currentIndex: index,
//     });
//   }

//   render() {
//     const { currentIndex } = this.state;
//     const currentRecipe = this.props.recipes[currentIndex];

//     return (
//       <div>
//         <button onClick={this.previous}>Previous</button>
//         <img src={currentRecipe.image} alt={currentRecipe.title} />
//         <p>{currentRecipe.title}</p>
//         <button onClick={this.next}>Next</button>
//       </div>
//     );
//   }
// }

// export default Carousel;
