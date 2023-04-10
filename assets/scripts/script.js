const DEFAULT_GRID_SIZE = 16
const gridContainer = document.querySelector("#grid-container")

let currentGridSize = DEFAULT_GRID_SIZE
let mouseDown = false

function getNewGridCell() {
    const gridCell = document.createElement("div")
    gridCell.classList.add("grid-cell")
    gridCell.addEventListener("mouseover", selectCell)
    gridCell.addEventListener("mousedown", selectCell)

    return gridCell
}

function selectCell(event) {
    if (event.type === "mouseover" && !mouseDown) return
    
    event.target.classList.add("selected")
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

// When HTML has been parsed
document.body.addEventListener("mousedown", () => mouseDown = true)
document.body.addEventListener("mouseup", () => mouseDown = false)

setupGrid(gridContainer, DEFAULT_GRID_SIZE)