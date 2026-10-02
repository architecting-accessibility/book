const grid = document.querySelector("#orders-grid");
const selectAllButton = document.querySelector("#select-all"); 
const deselectAllButton = document.querySelector("#deselect-all");
const copyButton = document.querySelector("#copy-selection");
const rows = Array.from(
    grid.querySelectorAll("tbody tr")
);
const PAGE_SIZE = 10;
var isDragging = false;

/*
 * Remember where a Shift + Arrow selection started.
 */
let selectionAnchor = null;


function getCells(row) {
    return Array.from(
        row.querySelectorAll("th, td")
    );
}


function getAllCells() {
    return Array.from(
        grid.querySelectorAll("tbody th, tbody td")
    );
}


/*
 * Move keyboard focus to a cell.
 *
 * Only one cell has tabindex="0" at a time.
 */
function focusCell(cell) {
    getAllCells().forEach(function (item) {
        item.tabIndex = -1;
    });

    cell.tabIndex = 0;
    cell.focus();
}


/*
 * Select or unselect one cell.
 */
function setSelected(cell, selected) {
    cell.setAttribute(
        "aria-selected",
        selected ? "true" : "false"
    );
}


/*
 * Remove all current selections.
 */
function clearSelection() {
    getAllCells().forEach(function (cell) {
        setSelected(cell, false);
    });
}


/*
 * Select every cell.
 */
function selectAll() {
    getAllCells().forEach(function (cell) {
        setSelected(cell, true);
    });
}


/*
 * Select every cell in a row.
 */
function selectRow(row) {
    getCells(row).forEach(function (cell) {
        setSelected(cell, true);
    });
}


/*
 * Select every cell in a column.
 */
function selectColumn(columnIndex) {
    rows.forEach(function (row) {
        const cells = getCells(row);

        if (cells[columnIndex]) {
            setSelected(
                cells[columnIndex],
                true
            );
        }
    });
}


/*
 * Find the row and column of a cell.
 */
function getCellPosition(cell) {
    const row = cell.closest("tr");
    const rowIndex = rows.indexOf(row);
    const columnIndex =
        getCells(row).indexOf(cell);

    return {
        rowIndex: rowIndex,
        columnIndex: columnIndex
    };
}


/*
 * Select the rectangular area between
 * two cells.
 */
function selectRange(startCell, endCell) {
    const start =
        getCellPosition(startCell);

    const end =
        getCellPosition(endCell);

    const firstRow = Math.min(
        start.rowIndex,
        end.rowIndex
    );

    const lastRow = Math.max(
        start.rowIndex,
        end.rowIndex
    );

    const firstColumn = Math.min(
        start.columnIndex,
        end.columnIndex
    );

    const lastColumn = Math.max(
        start.columnIndex,
        end.columnIndex
    );

    clearSelection();

    for (
        let rowIndex = firstRow;
        rowIndex <= lastRow;
        rowIndex++
    ) {
        const cells =
            getCells(rows[rowIndex]);

        for (
            let columnIndex = firstColumn;
            columnIndex <= lastColumn;
            columnIndex++
        ) {
            if (cells[columnIndex]) {
                setSelected(
                    cells[columnIndex],
                    true
                );
            }
        }
    }
}


/*
 * Copy the selected cells as tab-separated
 * text.
 *
 * Tabs separate columns.
 * New lines separate rows.
 *
 * This means the result can be pasted into
 * spreadsheet applications.
 */
function copySelectedCells() {
    const selectedCells = Array.from(
        grid.querySelectorAll(
            'tbody [aria-selected="true"]'
        )
    );

    if (selectedCells.length === 0) {
        return;
    }

    const selectedPositions =
        selectedCells.map(function (cell) {
            const position =
                getCellPosition(cell);

            return {
                cell: cell,
                rowIndex:
                    position.rowIndex,
                columnIndex:
                    position.columnIndex
            };
        });


    /*
     * Work out the rectangular area
     * containing all selected cells.
     */
    const firstRow = Math.min(
        ...selectedPositions.map(
            function (item) {
                return item.rowIndex;
            }
        )
    );

    const lastRow = Math.max(
        ...selectedPositions.map(
            function (item) {
                return item.rowIndex;
            }
        )
    );

    const firstColumn = Math.min(
        ...selectedPositions.map(
            function (item) {
                return item.columnIndex;
            }
        )
    );

    const lastColumn = Math.max(
        ...selectedPositions.map(
            function (item) {
                return item.columnIndex;
            }
        )
    );

    const copiedRows = [];


    /*
     * Build the text row by row.
     */
    for (
        let rowIndex = firstRow;
        rowIndex <= lastRow;
        rowIndex++
    ) {
        const rowValues = [];

        const cells =
            getCells(rows[rowIndex]);

        for (
            let columnIndex = firstColumn;
            columnIndex <= lastColumn;
            columnIndex++
        ) {
            const cell =
                cells[columnIndex];

            if (
                cell &&
                cell.getAttribute(
                    "aria-selected"
                ) === "true"
            ) {
                rowValues.push(
                    cell.textContent.trim()
                );
            } else {
                /*
                 * Keep an empty value so that
                 * the copied cells retain their
                 * original positions.
                 */
                rowValues.push("");
            }
        }

        copiedRows.push(
            rowValues.join("\t")
        );
    }

    const text =
        copiedRows.join("\n");

    navigator.clipboard.writeText(text);
}



grid.addEventListener(
    "keydown",
    function (event) {
        const cell =
            event.target.closest(
                "tbody th, tbody td"
            );

        if (!cell) {
            return;
        }

        const position =
            getCellPosition(cell);

        const rowIndex =
            position.rowIndex;

        const columnIndex =
            position.columnIndex;

        const row =
            rows[rowIndex];

        const cells =
            getCells(row);

        let nextCell = null;


        /*
         * Ctrl + C or Cmd + C
         *
         * Copy selected cells.
         */
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "c"
        ) {
            const hasSelection =
                grid.querySelector(
                    'tbody [aria-selected="true"]'
                );

            /*
             * Only override normal copy if
             * the grid has selected cells.
             */
            if (hasSelection) {
                event.preventDefault();

                copySelectedCells();
            }

            return;
        }


        /*
         * Ctrl + A or Cmd + A
         *
         * Select every cell.
         */
        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "a"
        ) {
            event.preventDefault();

            selectAll();

            return;
        }


        /*
         * Ctrl + Space
         *
         * Select the current column.
         */
        if (
            event.ctrlKey &&
            event.key === " "
        ) {
            event.preventDefault();

            selectColumn(columnIndex);

            return;
        }


        /*
         * Shift + Space
         *
         * Select the current row.
         */
        if (
            event.shiftKey &&
            event.key === " "
        ) {
            event.preventDefault();

            selectRow(row);

            return;
        }


        /*
         * Work out where navigation
         * should go.
         */
        switch (event.key) {
            case "ArrowRight":
                nextCell =
                    cells[columnIndex + 1];
                break;

            case "ArrowLeft":
                nextCell =
                    cells[columnIndex - 1];
                break;

            case "ArrowDown":
                if (rows[rowIndex + 1]) {
                    nextCell =
                        getCells(
                            rows[rowIndex + 1]
                        )[columnIndex];
                }

                break;

            case "ArrowUp":
                if (rows[rowIndex - 1]) {
                    nextCell =
                        getCells(
                            rows[rowIndex - 1]
                        )[columnIndex];
                }

                break;

            case "Home":
                nextCell =
                    cells[0];
                break;

            case "End":
                nextCell =
                    cells[
                        cells.length - 1
                    ];
                break;

            case "PageDown": {
                const newRowIndex =
                    Math.min(
                        rowIndex +
                            PAGE_SIZE,
                        rows.length - 1
                    );

                nextCell =
                    getCells(
                        rows[newRowIndex]
                    )[columnIndex];

                break;
            }

            case "PageUp": {
                const newRowIndex =
                    Math.max(
                        rowIndex -
                            PAGE_SIZE,
                        0
                    );

                nextCell =
                    getCells(
                        rows[newRowIndex]
                    )[columnIndex];

                break;
            }
        }


        /*
         * Ctrl + Home
         *
         * Move to the first cell.
         */
        if (
            event.ctrlKey &&
            event.key === "Home"
        ) {
            nextCell =
                getCells(rows[0])[0];
        }


        /*
         * Ctrl + End
         *
         * Move to the last cell.
         */
        if (
            event.ctrlKey &&
            event.key === "End"
        ) {
            const lastRow =
                rows[
                    rows.length - 1
                ];

            const lastRowCells =
                getCells(lastRow);

            nextCell =
                lastRowCells[
                    lastRowCells.length - 1
                ];
        }


        /*
         * Move focus if a valid destination
         * was found.
         */
        if (nextCell) {
            event.preventDefault();


            /*
             * Shift + Arrow extends the
             * current rectangular selection.
             */
            if (
                event.shiftKey &&
                event.key.startsWith(
                    "Arrow"
                )
            ) {
                if (!selectionAnchor) {
                    selectionAnchor =
                        cell;
                }

                selectRange(
                    selectionAnchor,
                    nextCell
                );
            } else {
                /*
                 * Normal navigation ends the
                 * current range-selection
                 * action.
                 */
                selectionAnchor = null;
            }


            focusCell(nextCell);
        }
    }
);


/* * MOUSE: CLICK A BODY CELL * * Normal click: * select that cell only. * * Ctrl/Cmd + click: * toggle that cell without removing * other selected cells. * * Shift + click: * extend a rectangular selection. */
grid.addEventListener("click", function (event) {
    const cell = event.target.closest("tbody th, tbody td");
    if (!cell) {
        return;
    } /* * The mouse-down handler deals with * row headers, so don't repeat it here. */
    if (cell.matches("tbody th[scope='row']")) {
        return;
    }
    if (event.shiftKey) {
        const anchor = selectionAnchor || grid.querySelector('tbody [tabindex="0"]') || cell;
        selectRange(anchor, cell);
        selectionAnchor = anchor;
    } else if (event.ctrlKey || event.metaKey) {
        toggleSelected(cell);
        selectionAnchor = cell;
    } else {
        clearSelection();
        setSelected(cell, true);
        selectionAnchor = cell;
    }
    focusCell(cell);
}); /* * MOUSE: CLICK A COLUMN HEADER * * Clicking a column heading selects * the entire column. */
grid.addEventListener("click", function (event) {
    const header = event.target.closest("thead th");
    if (!header) {
        return;
    }
    const headers = Array.from(grid.querySelectorAll("thead th"));
    const columnIndex = headers.indexOf(header);
    selectColumn(columnIndex);
    const firstCell = getCells(rows[0])[columnIndex];
    if (firstCell) {
        selectionAnchor = firstCell;
        focusCell(firstCell);
    }
}); /* * MOUSE: CLICK A ROW HEADER * * Clicking the first cell in a row * selects that entire row. */
grid.addEventListener("click", function (event) {
    const rowHeader = event.target.closest("tbody th[scope='row']");
    if (!rowHeader) {
        return;
    }
    const row = rowHeader.closest("tr");
    selectRow(row);
    selectionAnchor = rowHeader;
    focusCell(rowHeader);
}); /* * MOUSE: DRAG TO SELECT * * Start the selection on mouse-down. */
grid.addEventListener("mousedown", function (event) {
    /* * Only react to the primary * mouse button. */
    if (event.button !== 0) {
        return;
    }
    const cell = event.target.closest("tbody th, tbody td");
    if (!cell) {
        return;
    } /* * Row headers use their normal * click behaviour instead. */
    if (cell.matches("tbody th[scope='row']")) {
        return;
    } /* * Modifier-click is handled by * the click event. */
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
        return;
    }
    isDragging = true;
    dragAnchor = cell;
    grid.classList.add("is-selecting");
    clearSelection();
    setSelected(cell, true);
    focusCell(cell); /* * Stops native text dragging/ * selection from taking over. */
    event.preventDefault();
}); /* * Extend the range as the pointer * enters other cells. */
grid.addEventListener("mouseover", function (event) {
    if (!isDragging) {
        return;
    }
    const cell = event.target.closest("tbody th, tbody td");
    if (!cell) {
        return;
    }
    selectRange(dragAnchor, cell);
    focusCell(cell);
}); /* * Finish mouse dragging. */
document.addEventListener("mouseup", function () {
    if (!isDragging) {
        return;
    }
    isDragging = false;
    selectionAnchor = dragAnchor;
    dragAnchor = null;
    grid.classList.remove("is-selecting");
}); /* * MOUSE: SELECT ALL BUTTON */
selectAllButton.addEventListener("click", function () {
    selectAll();
    const currentCell = grid.querySelector('tbody [tabindex="0"]');
    // if (currentCell) {
    //     currentCell.focus();
    // }
}); 
/* * MOUSE: DESELECT ALL BUTTON */
deselectAllButton.addEventListener("click", function () { clearSelection(); selectionAnchor = null; });

/* * MOUSE: COPY BUTTON */
copyButton.addEventListener("click", function () {
    copySelectedCells();
});