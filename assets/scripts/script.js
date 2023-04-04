const DEFAULT_GRID_SIZE = 16
const GRID_CONTAINER = document.querySelector("#grid-container")

let currentGridSize = DEFAULT_GRID_SIZE

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
    const gridTotalCells = gridSize ** 2
    for (let addGridCell = 0; addGridCell < gridTotalCells; addGridCell++) {
        const gridCell = getNewGridCell()
        gridContainer.appendChild(gridCell)
    }
}

function setupGrid(gridContainer, gridSize) {
    // Before filling the grid...
    clearGrid(gridContainer)
    
    // Set columns to grid
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

    fillGrid(gridContainer, gridSize)
}

setupGrid(GRID_CONTAINER, DEFAULT_GRID_SIZE)