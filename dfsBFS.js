


let grid=[]

let resolution=30

let rows,cols

let strPoint=[]
let endPoint=[]
let newGrid=[]

let found=false





function setup(){
    // createCanvas(1850,700)
    createCanvas(windowWidth-20,windowHeight-200)
    angleMode(DEGREES)

    rows=floor(height/resolution)
    cols=floor(width/resolution)
 

    grid=make2dArray(rows,cols)
   
    strPoint=[floor(random(rows)),floor(random(cols))]
    endPoint=[floor(random(rows)),floor(random(cols))]
    
    grid[strPoint[0]][strPoint[1]].setSEpoint(true,false)
    grid[endPoint[0]][endPoint[1]].setSEpoint(false,true)
   
    
   
    button = createButton('DFS');
    button.position(0, 0);
    button.mousePressed(runBG);
    button = createButton('BFS');
    button.position(0, 20);
    button.mousePressed(runBFS);

    function runBG(){
        dfs(strPoint[0],strPoint[1],grid)
    }

    function runBFS(){
        BFS(strPoint[0],strPoint[1],grid)
 
    }  
    
   


        
    



    // for(let i=0;i<rows;i++){
    //     tempArr=[]
    //     for(let j=0;j<cols;j++){
    //         tempArr.push(grid[i][j])
            
    //     }
    //     newGrid.push(tempArr)
    // }
    
    
    
}





function draw(){

    background(255, 255, 255)

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){



            let x=j*resolution
            let y=i*resolution

            grid[i][j].setPos(x,y);
           
        
              if(grid[i][j].strPoint){
                noStroke()
                fill(0)
                rect(x,y,resolution,resolution)


              }
              else if(grid[i][j].endPoint){
                noStroke()
                fill(220,20,60)
                rect(x,y,resolution,resolution)


              }
            else if(grid[i][j].getValue()==1){
                
               // 52, 73, 94
               noStroke()
               fill(52, 73, 94)
               rect(x,y,resolution,resolution)

                

            }
            else if(grid[i][j].getValue()==2){
                
               // 52, 73, 94


            //    setTimeout(()=>{
            //     stroke(32,178,170)
            //     fill(255,0,255)
            //     rect(x,y,resolution,resolution)

            //    },50)


                
              

               stroke(0)
               fill(0,206,209)
               rect(x,y,resolution,resolution)
               

                

            }
            else{
                fill(255, 255, 255)


                stroke(32,178,170)
                strokeWeight(1)
                rect(x,y,resolution-1,resolution-1)

            }
        }
    }



}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function dfs(r,c,grid){

    if(r<0 || c<0 || r>rows-1 || c>cols-1 || grid[r][c].visited==true || found==true || grid[r][c].value==1){
        return

    }

    if(grid[r][c].endPoint==true){

        found=true
        return
    }

    

    grid[r][c].visited=true





    await sleep(1)
    console.log("Hello")

    grid[r][c].value=2
    // grid[r][c].setDelay(2)



    // setTimeout(()=>{
    //     dfs(r+1,c,grid)

    // },500)

    // setTimeout(()=>{
    //     dfs(r-1,c,grid)
        

    // },500)
    
    // setTimeout(()=>{
    //     dfs(r,c+1,grid)
        

    // },500)
    // setTimeout(()=>{
    //     dfs(r,c-1,grid)
        

    // },500)
   await  dfs(r+1,c,grid)
    await dfs(r-1,c,grid)
    
    await dfs(r,c+1,grid)
    await dfs(r,c-1,grid)
    


}


function BFS(r,c,grid){

    const rows=grid.length
    const cols=grid[0].length


    let queue=new Deque()

    queue.append([r,c])

    grid[r][c].visited=true
    grid[r][c].value=2

    while(queue.returnValue().length>0){

        for(let i=0;i<queue.returnValue().length;i++){
            const [r,c]=queue.popleft()
            if (grid[r][c].endPoint==true){
                return

            }
            let neighbors=[[0,1],[0,-1],[1,0],[-1,0]]

            for(let [dr,dc] of neighbors){
                if(r+dr<0 || c+dc<0 || r+dr >rows-1 || c+dc > cols-1 || grid[r+dr][c+dc].visited==true ||grid[r+dr][c+dc].value==1){
                    continue

                }

                queue.append([r+dr,c+dc])
                grid[r+dr][c+dc].visited=true
                grid[r+dr][c+dc].value=2
                

            }

        }

        






    }



}







































function windowResized() {
    resizeCanvas(windowWidth-20, windowHeight-200);
    
    
  }

function mouseClicked(){

    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            grid[i][j].mouseClicked(mouseX,mouseY)




        }}

}

function mouseDragged(){
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){

            grid[i][j].mouseClicked(mouseX,mouseY)




        }}

}

function make2dArray(rows,cols){
    let array2=[]

    for(let i=0;i<rows;i++){
        let tempArr=[]
        for(let j=0;j<cols;j++){
            tempArr.push(new Matrix(0))

        }
        array2.push(tempArr)
    }

    return array2
    
}

class Matrix{
    constructor(value){
        this.value=value
        this.posX=null
        this.posY=null
        this.strPoint=false
        this.endPoint=false
        this.visited=false
    }

    getValue(){
        return this.value
    }
    setValue(x){
        this.value=x
    }
    setDelay(x){
       
      
        setTimeout(()=>{
            this.value=x

        },this.posX*100)
    }
    setPos(x,y){
        this.posX=x
        this.posY=y
    }

    setSEpoint(str=false,end=false){
        this.strPoint=str
        this.endPoint=end

    }

    mouseClicked(mx,my){
      let  topX=this.posX
      let topY=this.posY

      let bottomX=this.posX+resolution

      let bottomY=this.posY+resolution

      if(mx>topX && my >topY && mx< bottomX && my < bottomY && !this.endPoint && !this.strPoint){
        
        this.value==1 ? this.value=0 : this.value=1
        console.log(`${this.value}`)
      }


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












// function setup(){
//     createCanvas(windowWidth,windowHeight)
//     angleMode(DEGREES)
    
    
    
// }

// function draw(){
//     background(0)


//     let hr=hour()
//     let min=minute()

//     let sc=second()


//    let mapSecond=(sc+1)*6
//    let mapMinute=(min+1)*6
//    let mapHour=(hr+1)*30
   
   

//     translate(200,200)
//     rotate(-90)

//     noFill()

//     strokeWeight(8)
//     stroke(255,20,147)
//     // arc(0,0,300,300,0,mapSecond)
//     noFill()

//     push()
//     rotate(mapSecond)
//     stroke(0,255,255)
//     line(0,0,110,0)
//     pop()

//     push()
//     rotate(mapMinute)
//     stroke(255,20,147)
//     line(0,0,120,0)
//     pop()


//     push()
//     rotate(mapHour)
//     stroke(255,69,0)
//     line(0,0,120,0)
//     pop()
    

//     strokeWeight(5)
//     stroke(0,255,0)
//     // arc(0,0,285,285,0,mapMinute)

//     strokeWeight(5)
//     stroke(255,69,0)
//     // arc(0,0,270,270,0,mapHour)
//     push()
//     stroke(255)
//     ellipse(0,0,3,3)
//     pop()
    




// }





// let grid;
// let rows,cols
// let resolution=15


// function setup(){
//     createCanvas(600,600)
//     rows=height/resolution
//     cols=width/resolution
    
  
//     let array=[]

//     for(let i=0;i<rows;i++){
//         let tempArr=[]
//         for(let j=0;j<cols;j++){
//             tempArr.push(floor(random(2)))
//         }
//         array.push(tempArr)
//     }
//     grid=array

//     print(grid)
    

    

// }

// function draw(){
//     background(0)
    
//     for(let i=0;i<rows;i++){
        
//         for(let j=0;j<cols;j++){
//             let x=i*resolution
//             let y=j*resolution

//             if(grid[i][j]==1){
//                 fill(255)
//                 stroke(0)

//                 rect(x,y,resolution-1,resolution-1)

//             }
           
//         }
//     }

//     let next=[]

//     for(let i=0;i<rows;i++){
//         let tempArr=[]
//         for(let j=0;j<cols;j++){



//             let count=countNeighbors(grid,i,j)
//             let state=grid[i][j]

        









            
//         }
//         next.push(tempArr)
//     }

    
// }



























