class TowerOfHanoi {
    // Add this to your existing TowerOfHanoi class constructor
    constructor() {
        this.moves = 0;
        this.towers = document.querySelectorAll('.tower');
        this.movesDisplay = document.getElementById('moves');
        this.resetBtn = document.getElementById('resetBtn');
        this.diskCountSelect = document.getElementById('diskCount');
        
        // Add theme toggle initialization
        this.themeToggle = document.getElementById('themeToggle');
        this.initializeTheme();

        this.initializeGame();
        this.setupEventListeners();
    }

    // Move initializeTheme into the class
    initializeTheme() {
        // Check for saved theme preference or use dark as default
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.checked = savedTheme === 'dark';

        this.themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    initializeGame() {
        // Clear existing disks
        this.towers.forEach(tower => {
            const disks = tower.querySelectorAll('.disk');
            disks.forEach(disk => disk.remove());
        });
    
        // Reset moves
        this.moves = 0;
        this.updateMovesDisplay();
    
        // Create new disks
        const diskCount = parseInt(this.diskCountSelect.value);
        const firstTower = this.towers[0];
    
        for (let i = diskCount; i > 0; i--) {
            const disk = document.createElement('div');
            disk.className = 'disk';
            disk.draggable = true;
            disk.id = `disk${i}`;
            disk.style.width = `${i * 30 + 30}px`;
            disk.style.bottom = `${(diskCount - i) * 30 + 25}px`;
            disk.setAttribute('data-size', i);
            disk.addEventListener('dragstart', this.dragStart.bind(this));
            firstTower.appendChild(disk);
        }
    }
    
    dragStart(e) {
        const tower = e.target.parentElement;
        const disks = tower.querySelectorAll('.disk');
        const topDisk = disks[disks.length - 1];
    
        if (e.target === topDisk) {
            e.dataTransfer.setData('text', e.target.id);
        } else {
            e.preventDefault();
        }
    }
    
    isValidMove(selectedDisk, targetTower) {
        const targetDisks = targetTower.querySelectorAll('.disk');
        const targetTopDisk = targetDisks[targetDisks.length - 1];
    
        if (!targetTopDisk) return true;
        return parseInt(selectedDisk.getAttribute('data-size')) < 
               parseInt(targetTopDisk.getAttribute('data-size'));
    }
    
    updateMovesDisplay() {
        this.movesDisplay.textContent = `Moves: ${this.moves}`;
    }
    checkWin() {
        const lastTower = this.towers[2];
        const diskCount = parseInt(this.diskCountSelect.value);
        if (lastTower.querySelectorAll('.disk').length === diskCount) {
            setTimeout(() => {
                // Celebration animation
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });

                setTimeout(() => {
                    confetti({
                        particleCount: 50,
                        angle: 60,
                        spread: 55,
                        origin: { x: 0 }
                    });
                    confetti({
                        particleCount: 50,
                        angle: 120,
                        spread: 55,
                        origin: { x: 1 }
                    });
                }, 250);

                // Show modal and setup all close handlers
                const modal = document.getElementById('winModal');
                const winMessage = document.getElementById('winMessage');
                const span = document.getElementsByClassName('close')[0];
                const playAgainBtn = modal.querySelector('.cool-button');
                const confettiBtn = document.getElementById('moreConfetti');
                
                winMessage.innerHTML = `You solved the puzzle in ${this.moves} moves!<br>
                                      Minimum possible moves: ${Math.pow(2, diskCount) - 1}`;
                modal.style.display = 'block';

                // Reset game for all closing methods
                const resetAndClose = () => {
                    modal.style.display = 'none';
                    this.initializeGame();
                };
                // Add confetti button handler
                confettiBtn.onclick = () => {
                    const positions = [
                        { x: 0.2, angle: 60 },    // left
                        { x: 0.5, angle: 90 },    // center
                        { x: 0.8, angle: 120 }    // right
                    ];
                    const randomPos = positions[Math.floor(Math.random() * positions.length)];
                    
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { x: randomPos.x, y: 0.6 },
                        angle: randomPos.angle
                    });
                };
                span.onclick = resetAndClose;
                playAgainBtn.onclick = resetAndClose;
                window.onclick = (event) => {
                    if (event.target == modal) {
                        resetAndClose();
                    }
                };
            }, 100);
        }
    }
    
    setupEventListeners() {
        this.resetBtn.addEventListener('click', () => this.initializeGame());
        this.diskCountSelect.addEventListener('change', () => this.initializeGame());
    }
}

// Global functions for drag and drop
function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const game = window.gameInstance;
    const diskId = e.dataTransfer.getData('text');
    const disk = document.getElementById(diskId);
    const targetTower = e.currentTarget;

    if (game.isValidMove(disk, targetTower)) {
        const targetDisks = targetTower.querySelectorAll('.disk');
        const newBottom = targetDisks.length * 30 + 25;
        disk.style.bottom = `${newBottom}px`;
        targetTower.appendChild(disk);
        game.moves++;
        game.updateMovesDisplay();
        game.checkWin();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.gameInstance = new TowerOfHanoi();
});
