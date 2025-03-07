# Tower of Hanoi Game

A modern, interactive implementation of the classic Tower of Hanoi puzzle game built with HTML, CSS, and JavaScript. Created with assistance from Trae AI.

## Features

- Drag and drop interface
- Customizable number of disks (3-6)
- Move counter with minimum moves display
- Dark/Light theme toggle
- Celebration animation on completion
- Responsive design
- Local theme preference storage

## How to Play

1. **Objective**: Move all disks from the leftmost tower to the rightmost tower
2. **Rules**:
   - Only one disk can be moved at a time
   - A larger disk cannot be placed on top of a smaller disk
   - Only the top disk of any tower can be moved

## Getting Started

1. Open `index.html` in a web browser
2. Select the number of disks (3-6) using the dropdown
3. Drag and drop disks between towers
4. Try to complete the puzzle in the minimum number of moves

## Technical Details

- Pure HTML, CSS, and JavaScript implementation
- No external dependencies except for the confetti animation
- Responsive design that works on both desktop and mobile devices
- Local storage for theme preferences

## Minimum Moves Formula

The minimum number of moves required to solve the puzzle is: 2ⁿ - 1
where n is the number of disks.

- 3 disks: 7 moves
- 4 disks: 15 moves
- 5 disks: 31 moves
- 6 disks: 63 moves

## Credits

Built with assistance from Trae AI