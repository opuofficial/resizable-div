// Select the resizable div and the left/right divs from the HTML
const resizableDiv = document.querySelector(".resizable__div");
const leftDiv = document.querySelector(".left__div");
const rightDiv = document.querySelector(".right__div");

// Get the initial widths of the left and right divs
let leftDivWidth = window.getComputedStyle(leftDiv).getPropertyValue("width");
leftDivWidth = parseFloat(leftDivWidth);

let rightDivWidth = window.getComputedStyle(rightDiv).getPropertyValue("width");
rightDivWidth = parseFloat(rightDivWidth);

// Variable to store the initial mouse position when dragging starts
let mouseDragStartsFrom = null;

// Event listener for when the user starts dragging
document.addEventListener("mousedown", startDrag);

// Event listener for when the user releases the mouse button
document.addEventListener("mouseup", (e) => {
  document.removeEventListener("mousemove", handleMouseMove);
});

// Function to handle the start of dragging
function startDrag(e) {
  // Check if the target element is the resizable div
  if (e.target == resizableDiv) {
    // Record the initial mouse position
    mouseDragStartsFrom = e.clientX;
    // Add event listener for tracking mouse movement during dragging
    document.addEventListener("mousemove", handleMouseMove);
  }
}

// Function to handle mouse movement during dragging
function handleMouseMove(e) {
  // Calculate the distance between the initial and current mouse positions
  let dragDistance = mouseDragStartsFrom - e.clientX;

  // Adjust the widths of the divs based on the drag distance
  leftDivWidth -= dragDistance;
  rightDivWidth += dragDistance;

  // Update the CSS width properties of the divs
  updateDivWidth();
  // Add or remove class for styling based on div widths
  addStyle();

  // Update the initial mouse position for the next movement calculation
  mouseDragStartsFrom = e.clientX;
}

// Function to update the CSS width properties of the divs
function updateDivWidth() {
  leftDiv.style.width = leftDivWidth + "px";
  rightDiv.style.width = rightDivWidth + "px";
}

// Function to add or remove class for styling based on div widths
function addStyle() {
  if (leftDivWidth > rightDivWidth) {
    leftDiv.classList.add("large");
    rightDiv.classList.remove("large");
  } else if (leftDivWidth < rightDivWidth) {
    leftDiv.classList.remove("large");
    rightDiv.classList.add("large");
  } else {
    leftDiv.classList.remove("large");
    rightDiv.classList.remove("large");
  }
}
