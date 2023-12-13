
class Move
{
    constructor()
    {
        let row,col;
    }
}
  
let player = 'x', opponent = 'o';

function isMovesLeft(board)
{
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i][j] == '_')
                return true;
                  
    return false;
}

function evaluate(b)
{
    for(let row = 0; row < 3; row++)
    {
        if (b[row][0] == b[row][1] && b[row][1] == b[row][2])
        {
            if (b[row][0] == player)
                return +10;            
            else if (b[row][0] == opponent)
                return -10;
        }
    }
   
    //  Columns
    for(let col = 0; col < 3; col++)
    {
        if (b[0][col] == b[1][col] && b[1][col] == b[2][col])
        {
            if (b[0][col] == player)
                return +10;
            else if (b[0][col] == opponent)
                return -10;
        }
    }
   
    //Diagonals
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2])
    {
        if (b[0][0] == player)
            return +10;  
        else if (b[0][0] == opponent)
            return -10;
    }
   
    if (b[0][2] == b[1][1] &&  b[1][1] == b[2][0])
    {
        if (b[0][2] == player)
            return +10;          
        else if (b[0][2] == opponent)
            return -10;
    }
    return 0;
}


function minimax(board, depth, isMax)
{
    let score= evaluate(board);
    
    if(score ==10 || score ==-10)
   		 return score;
    
    if (isMovesLeft(board) == false)
        return 0;
        
   
    if (isMax)
    {
        let best = -1000;
   
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if (board[i][j]=='_')
                {                   
                    board[i][j] = player;
                    best = Math.max(best, minimax(board,depth + 1, !isMax));
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
    else
    {
        let best = 1000;
   
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
            {
                if (board[i][j] == '_')
                {
                    board[i][j] = opponent;
                    best = Math.min(best, minimax(board, depth + 1, !isMax));
                    board[i][j] = '_';
                }
            }
        }
        return best;
    }
}

function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;
   
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if (board[i][j] == '_')
            {
                board[i][j] = player;
                let moveVal = minimax(board, 0, false);
                board[i][j] = '_';
   
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    } 
    
    return bestMove;
}

let board = [ [ '_', '_', '_' ],
              [ '_', '_', '_' ],
              [ '_', '_', '_' ] ];
              
let isInit =false;
let winner = '';

function isWin()
{
	//x axis
	for(let i=0;i<3;i++)
	{
		if(board[i][0] == board[i][1] && board[i][2] == board[i][1])
			if(board[i][0] != '_')
			{
				winner=board[i][0];
				return true;
			}
	}
	// y axis
	for(let i=0;i<3;i++)
	{
		if(board[0][i] == board[1][i] && board[1][i] == board[2][i])
			if(board[0][i] != '_')
			{
				winner = board[0][i];
				return true;
			}
	}
	//  /
	if(board[0][0] == board[1][1] && board[1][1] == board[2][2])
		if(board[0][0] != '_')
		{
			winner = board[0][0];
			return true;
		}
	
	//  \
	if(board[0][2] == board[1][1] && board[1][1] == board[2][0])
		if(board[0][2] != '_')
		{
			winner = board[0][2];
			return true;
		}
		
		return false;
}

function drawB()
{
	if(isWin())
	 	gameOver();
	 	
	 if( !isMovesLeft(board))
	 	gameOver();
			
	var myb = document.getElementsByClassName("cellholder");
	
	if(!isInit)
	{
		for(let i=0;i<3;i++)
		{		
			for(let j=0;j<3;j++)
			{
				myb[j].innerHTML=myb[j].innerHTML + 
				'<div id="'+j+','+i+'" onclick="pos(this)" class="cell"></div>';			
			}
		}
		isInit=true;
	}
	
	for(let i=0;i<3;i++)
	{
		var cells = myb[i].getElementsByClassName("cell");	
		for(let j=0;j<3;j++)
		{
			var a = board[i][j];
			cells[j].innerHTML="<h1>"+a+"</h1>";
			
			if(a=='x')
				cells[j].style.background="green";
			else if(a=='o')
				cells[j].style.background="#5555aa";
			else
				cells[j].style.background="orange";
		}
	}
}
  
  function ai()
  {
  		let bestMove = findBestMove(board);
		board[bestMove.row][bestMove.col]='x';
		drawB();
	}
  
  function pos(a)
  {
  		var b=a.id;	
	  	if(board[b[0]][b[2]] == '_')
	  	{
		  	board[b[0]][b[2]]='o';
		  	drawB();
		  	ai();
	  	}
  	}
  	
  	function gameOver()
  	{
  		document.getElementById("play").disabled=false;
  		document.getElementById("status").innerHTML=((winner== 'x')?"ai wins" :(winner == 'o')?"you win":"draw");
  	}
  	
  	function restart(button)
  	{
  		board = [ [ '_', '_', '_' ],
  				  [ '_', '_', '_' ],
  				  [ '_', '_', '_' ] ];
  		
  		button.disabled=true;
  		drawB();
  		ai();
  		document.getElementById("status").innerHTML="Status:";
  		drawB();
  	}