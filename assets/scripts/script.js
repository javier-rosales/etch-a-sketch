const DEFAULT_GRID_SIZE = 16
const DEFAULT_FILL_COLOR = "rgb(0, 0, 0)"
const DEFAULT_MODE = "color"

let currentFillColor = DEFAULT_FILL_COLOR
let currentMode = DEFAULT_MODE

function getRandomNumber(start, end) {
    return Math.round(Math.random() * (end - start)) + start
}

function getRandomColor() {
    const randomR = getRandomNumber(0, 255)
    const randomG = getRandomNumber(0, 255)
    const randomB = getRandomNumber(0, 255)

    return `rgb(${randomR}, ${randomG}, ${randomB})`
}

function getNewGridCell() {
    const gridCell = document.createElement("div")
    gridCell.classList.add("grid-cell")
    gridCell.addEventListener("mouseover", selectCell)
    gridCell.addEventListener("mousedown", selectCell)
    
    return gridCell
}

function selectCell(event) {
    if (event.type === "mouseover" && !mouseDown) return
    
    const cell = event.target
    switch (currentMode) {
        case "color":
            cell.style.backgroundColor = currentFillColor
            break
        
        case "rainbow":
            cell.style.backgroundColor = getRandomColor()
            break
        
        case "eraser":
            cell.removeAttribute("style")
    }
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

function changeMode(newMode, event) {
    currentMode = newMode

    modeButton = event.target
    modeButton.classList.add("active")
    
    switch(newMode) {
        case "color":
            rainbowModeButton.classList.remove("active")
            eraserModeButton.classList.remove("active")
            break
        
        case "rainbow":
            colorModeButton.classList.remove("active")
            eraserModeButton.classList.remove("active")
            break
        
        case "eraser":
            colorModeButton.classList.remove("active")
            rainbowModeButton.classList.remove("active")
            break
    }
}

function resetGrid(gridContainer) {
    const cells = Array.from(gridContainer.children)

    cells.forEach(cell => cell.removeAttribute("style"))
}

function changeColor(event) {
    currentFillColor = event.target.value
}

// When HTML has been parsed
const gridContainer = document.querySelector("#grid-container")
const gridSizeSelector = document.querySelector(".grid-size-selector")
const gridDimensionsPanel = document.querySelector(".grid-dimensions")
const colorPicker = document.querySelector(".color-picker")
const colorModeButton = document.querySelector(".menu-button.color")
const rainbowModeButton = document.querySelector(".menu-button.rainbow")
const eraserModeButton = document.querySelector(".menu-button.eraser")
const clearGridButton = document.querySelector(".menu-button.clear")

let mouseDown = false

document.body.addEventListener("mousedown", () => mouseDown = true)
document.body.addEventListener("mouseup", () => mouseDown = false)

updateGridSize(DEFAULT_GRID_SIZE, gridDimensionsPanel)
setupGrid(gridContainer, DEFAULT_GRID_SIZE)

gridSizeSelector.addEventListener("input", event => updateGridSize(event.target.value, gridDimensionsPanel))
gridSizeSelector.addEventListener("change", event => setupGrid(gridContainer, event.target.value))

colorPicker.addEventListener("input", changeColor)
colorModeButton.addEventListener("click", event => changeMode("color", event))
rainbowModeButton.addEventListener("click", event => changeMode("rainbow", event))
eraserModeButton.addEventListener("click", event => changeMode("eraser", event))
clearGridButton.addEventListener("click", () => resetGrid(gridContainer))