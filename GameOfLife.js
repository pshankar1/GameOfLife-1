class GameOfLife {
/**
 * Discuss the difference in runtime and why its occurring.

There is a difference in the run time when implementing a rectangular
array from a single array because when the columns and rows are implemented 
in the for loop- it prevents a 2d array- and then makes the Game of Life 
run faster. In the initial version without the rectangular array, the game did not run 
fast enough, so when implementing the rectangular array there was an incredibly
efficient and fast speed run time where .
- also creating the rectangular array can allow the data from a 2d array to be minimized and store it as one array
 * 
 */
    /*
    functions 
        1 - create 2 2d arrays with zeros (active/inactive) - done!
        2 - fill active array randomly with ones and zeros - done! 
        3 - set color for cells - done! 
        4 - count neigbours 
        5 - update generation 
        6 - clear canvas
    */
constructor() {

    this.cell_size = 5;
    this.dead_color = `#181818`;
    this.alive_color = `#FF756B`;
    this.cells_in_column = Math.floor(canvas.width / this.cell_size);
    this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
    this.active_array = [];
    this.inactive_array = [];

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                //this.active_array[i] = []; //don't want to make a 2d array
                for (let j = 0; j < this.cells_in_column; j++) {
                    //this.active_array[i][j] = 0;
                    this.active_array[i*(this.cells_in_column) + j] = 0;
                }
            }
            this.inactive_array = this.active_array;

        };

        this.arrayRandomize = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i*(this.cells_in_column) + j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }
        };
        this.fillArray = () => {
//
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    //if (this.active_array[i][j] == 1)
                    if (this.active_array[i*(this.cells_in_column) + j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                //return this.active_array[row][col];
                return this.active_array[row*(this.cells_in_column) + col];
            }
            catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.setCellValueHelper(row - 1, col - 1);
            total_neighbours += this.setCellValueHelper(row - 1, col);
            total_neighbours += this.setCellValueHelper(row - 1, col + 1);
            total_neighbours += this.setCellValueHelper(row, col - 1);
            total_neighbours += this.setCellValueHelper(row, col + 1);
            total_neighbours += this.setCellValueHelper(row + 1, col - 1);
            total_neighbours += this.setCellValueHelper(row + 1, col);
            total_neighbours += this.setCellValueHelper(row + 1, col + 1);
            return total_neighbours;
        };

        this.updateCellValue = (row, col) => {

            const total = this.countNeighbours(row, col);
            if (total > 4 || total < 3) {
                return 0;
            }
            //else if (this.active_array[row][col] === 0 && total === 3) {
            else if (this.active_array[row*(this.cells_in_column) + col] === 0 && total === 3) {
                return 1;
            }
            // or returning its status back. 0 => 0; 1 => 1
            else {
                //return this.active_array[row][col];
                return this.active_array[row*(this.cells_in_column) + col];
            }

        };

        this.updateLifeCycle = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.updateCellValue(i, j);
                    //this.inactive_array[i][j] = new_state;
                    this.inactive_array[i*(this.cells_in_column) + j] = new_state;
                }
            }
            this.active_array = this.inactive_array

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };
    
    }
}