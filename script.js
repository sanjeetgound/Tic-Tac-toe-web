document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    const checkWinner = () => {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return gameState.includes('') ? null : 'T'; // T for tie
    };
    
    const updateStatus = () => {
        const winner = checkWinner();
        if (winner === 'X' || winner === 'O') {
            statusDisplay.textContent = `Player ${winner} wins!`;
            gameActive = false;
        } else if (winner === 'T') {
            statusDisplay.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    };
    
    const handleClick = (event) => {
        const cell = event.target;
        const index = cell.getAttribute('data-index');
        
        if (gameState[index] || !gameActive) return;
        
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        updateStatus();
        
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };
    
    const resetGame = () => {
        gameState.fill('');
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    };
    
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the game
    updateStatus();
});
