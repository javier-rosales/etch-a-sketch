let GRID_SIZE = 16
const gridContainer = document.querySelector(".grid-container")

function getNewGridCell() {
    const gridCell = document.createElement("div")
    gridCell.classList.add("grid-cell")

    return gridCell
}

function clearGrid(gridContainer) {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }
}

function fillGrid(gridContainer, gridSize) {

    clearGrid(gridContainer)
    
    // Set columns to grid
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

    const gridTotalCells = gridSize ** 2
    for (let addGridCell = 0; addGridCell < gridTotalCells; addGridCell++) {
        const gridCell = getNewGridCell()
        gridContainer.appendChild(gridCell)
    }
}

/* This is an alternative if coordinates for each cell is needed

function fillGrid(gridSize) {
    for (let yIteration = 1; yIteration <= gridSize; yIteration++) {
        for (let xIteration = 1; xIteration <= gridSize; xIteration++) {
            const gridCell = createGridCell()

            // Assign coordinates to cell
            gridCell.setAttribute("data-x-coordinate", xIteration)
            gridCell.setAttribute("data-y-coordinate", yIteration)

            gridContainer.appendChild(gridCell)
        }
    }
}

*/

fillGrid(gridContainer, GRID_SIZE)