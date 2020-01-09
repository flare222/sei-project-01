function init() {
  //!DOM Variables
  const grid = document.querySelector('.grid')
  const startBtn = document.querySelector('.start')
  const stopBtn = document.querySelector('.stop')
  

  const squares = []
  const width = 11
  const max = 121
  let playerIndex = [3, 2, 1]
  
  let gameInPlay = false
  let score = 0
  let direction = 'right'
  let move = null
  let getFaster = 500

  //!Creating the grid
  Array(width * width).join('.').split('.').forEach(() => {
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  //!Functions
  //Starting position of the snake (non-random)
  function addSnake() {
    playerIndex.map(index => squares[index].classList.add('snake'))
    // squares[playerIndex[0]].classList.add('head')
    collision()
  }

  //Function to remove the head and snake classes 
  function removeSnake() {
    playerIndex.map(index => squares[index].classList.remove('snake'))
    // squares[playerIndex[0]].classList.remove('head')
  }
  
  //Start position of food
  function addApple(max) {
    // if (!squares[playerIndex].classList.contains('snake')
    const appleIndex = Math.floor(Math.random() * Math.floor(max))
    squares[appleIndex].classList.add('apple')
    // const appleIndex = Math.floor(Math.random() * Math.floor(max))
    // squares[appleIndex].classList.add('apple')
  }
  
  function removeApple() {
    squares.forEach(square => square.classList.remove('apple'))
  }

  //Add food eaten to snakeBody array
  function eatFood() {
    if (squares[playerIndex[0]].classList.contains('apple')) {
      squares[playerIndex[0]].classList.remove('apple')
      playerIndex.unshift(playerIndex[0])
      score += 5
      document.querySelector('.score').innerHTML = score
      clearInterval(move)
      getFaster = getFaster - 10
      move = setInterval(snakeMove , getFaster)
      addApple(max)

    } 
  }
    
  function collision() {
    for (var i = 1; i < squares.length; i++)
      if (playerIndex[0] === playerIndex[i]) {
        gameOver()
      }            
  }
  function clearGrid() {
    squares.forEach(square => square.classList.remove('snake'))
  }

  function gameOver() {
    gameInPlay = false
    clearInterval(move)
    clearGrid()
    removeApple()
    playerIndex = [3, 2, 1]
    direction = 'right'
    score = 0
    document.querySelector('.score').innerHTML = score
    alert('Game Over!')
  }

  function snakeMove() {
    if (direction === 'right' && playerIndex[0] % width < width - 1) {
      removeSnake()
      playerIndex.pop()
      playerIndex.unshift(playerIndex[0] + 1)
      addSnake()
    } else if (direction === 'right' && playerIndex[0] % width >= width - 1) {
      gameOver()
    } 
    if (direction === 'left' && playerIndex[0] % width > 0) {
      removeSnake()
      playerIndex.pop()
      playerIndex.unshift(playerIndex[0] - 1)
      addSnake()
    } else if (direction === 'left' && playerIndex[0] % width <= 0) {
      gameOver()
    }
    if (direction === 'down' && playerIndex[0] + width < width * width) {
      removeSnake()
      // if snake hits a wall
      playerIndex.pop()
      playerIndex.unshift(playerIndex[0] + width)
      addSnake()
    } else if (direction === 'down' && playerIndex[0] + width >= width * width) {
      gameOver()
    }
    if (direction === 'up' && playerIndex[0] - width >= 0) {
      removeSnake()
      // if snake hits a wall
      playerIndex.pop()
      playerIndex.unshift(playerIndex[0] - width)
      addSnake()
    } else if (direction === 'up' && playerIndex[0] - width < 0) {
      gameOver()
    }
    eatFood()
  }


  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39:
        if (direction !== 'left') direction = 'right'
        break
      case 37:
        if (direction !== 'right') direction = 'left'
        break
      case 40:
        if (direction !== 'up') direction = 'down'
        break
      case 38:
        if (direction !== 'down') direction = 'up'
        break
      default:
        console.log('snake should not move')

    }
  }

  //Move the snake through the squares array square by square continuously
  function startGame() {
    if (!gameInPlay) {
      // gameInPlay = true
      addSnake()
      addApple(max)
      getFaster = 500
      move = setInterval(snakeMove, getFaster)
    } else {
      clearInterval(move)
    }
  }

  console.log(squares)

  //Stop button for a quick way to end the interval
  function stopTimer() {
    clearInterval(move)
  }

  //! Event Listeners
  startBtn.addEventListener('click', startGame)

  window.addEventListener('keydown', handleKeyDown)

  stopBtn.addEventListener('click', stopTimer)

}
window.addEventListener('DOMContentLoaded', init)