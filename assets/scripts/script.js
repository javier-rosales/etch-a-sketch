const DEFAULT_GRID_SIZE = 16

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

function updateGridSize(gridSize, gridDimensionsPanel) {
    gridDimensionsPanel.textContent = `${gridSize} X ${gridSize}`
}

// When HTML has been parsed
const gridContainer = document.querySelector("#grid-container")
const gridSizeSelector = document.querySelector(".grid-size-selector")
const gridDimensionsPanel = document.querySelector(".grid-dimensions")

let mouseDown = false

document.body.addEventListener("mousedown", () => mouseDown = true)
document.body.addEventListener("mouseup", () => mouseDown = false)

updateGridSize(DEFAULT_GRID_SIZE, gridDimensionsPanel)
setupGrid(gridContainer, DEFAULT_GRID_SIZE)

gridSizeSelector.addEventListener("input", event => updateGridSize(event.target.value, gridDimensionsPanel))
gridSizeSelector.addEventListener("change", event => setupGrid(gridContainer, event.target.value))