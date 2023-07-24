class Test{
    constructor(x){
        this.x=x
    }

    method (){
        console.log(this)
        setTimeout(()=>{
            console.log(this)

        },50)
    }
}

class Deque{
    constructor(){
       this.value=[] 
    }

    popright(){
        return this.value.pop()

    }
    append(x){
        this.value.push(x)

    }
    popleft(){
       let arrValue=this.value.splice(0,1)

        return arrValue[0]
    }

    returnValue(){
        return this.value

    }

}


let queue=new Deque()


queue.append([2,3])


///



function forFun(){
    setTimeout(()=>{
        console.log("Hello World")

    },200)
    setTimeout(()=>{
        console.log("Hello World2")

    },500)
}
    
    
forFun()



    // Constants
    const WIDTH = 20;
    const HEIGHT = 20;

    // Create a 2D array to represent the maze grid
    let maze = new Array(WIDTH);
    for (let i = 0; i < WIDTH; i++) {
      maze[i] = new Array(HEIGHT).fill(false);
    }

    // Recursive Backtracking algorithm
    function generateMaze(x, y) {
      maze[x][y] = true;
      const directions = [
        { dx: 1, dy: 0 },  // Right
        { dx: -1, dy: 0 }, // Left
        { dx: 0, dy: 1 },  // Down
        { dx: 0, dy: -1 }, // Up
      ];
      shuffleArray(directions);

      for (let dir of directions) {
        const newX = x + dir.dx * 2;
        const newY = y + dir.dy * 2;

        if (newX > 0 && newX < WIDTH && newY > 0 && newY < HEIGHT && !maze[newX][newY]) {
          maze[newX][newY] = true;
          maze[x + dir.dx][y + dir.dy] = true;
          generateMaze(newX, newY);
        }
      }
    }

    // Helper function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
