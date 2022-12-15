document.addEventListener('DOMContentLoaded', () => {

    // const cardMap = new Map([
    //     [1, 'images/cola.png'],
    //     [2, 'images/hamburger.png'],
    //     [3, 'images/hotdog.png'],
    //     [4, 'images/icecream.png'],
    //     [5, 'images/milkshake.png'],
    //     [6, 'images/piza.png']
    // ]);

    // const color = ['red', 'green', 'blue', 'purple', 'yellow', 'orange']
    const color = ['url(images/1.png)', 'url(images/2.png)', 'url(images/3.png)', 'url(images/4.png)', 'url(images/5.png)', 'url(images/6.png)']

    const colorCounter = new Map([
        ['url(images/1.png)', 0],
        ['url(images/2.png)', 0],
        ['url(images/3.png)', 0],
        ['url(images/4.png)', 0],
        ['url(images/5.png)', 0],
        ['url(images/6.png)', 0]
    ]);

    var tableRow = document.getElementsByTagName('tr');
    var tableData = document.getElementsByTagName('td');
    const slots = document.querySelectorAll('.slot');
    const resetBtn = document.querySelector('.reset');
    const startBtn = document.querySelector('.start');
    var click_count = 0;

    // logging the coordinate of each cell
    for (i = 0; i < tableData.length; i++) {
        tableData[i].addEventListener('click', (e) => {
            // Reference cell row and column index no
            Row_ref = e.target.parentElement.rowIndex
            Col_ref = e.target.cellIndex
            // console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
            // console.log("x1: " + Row_ref + " , y1: " + Col_ref)
            click_count = click_count + 1;
            if ((click_count == 1) || (click_count == 2)) {
                printMousePos(e)
            }
        });
    };

    // Random index generator    
    function randomIndex(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // loading initial grid
    function loadInitialGrid() {
        let currentColor = 'url(images/0.png)';
        for (let col = 0; col < 6; col++) {
            for (let row = 0; row < 6; row++) {
                do {
                    let randomColorIndex = randomIndex(0, 5);
                    // console.log("Random Clolor Index : " + randomColorIndex);
                    currentColor = color[randomColorIndex];
                } while (colorCounter.get(currentColor) > 5)
                // console.log("Current Clolor : " + currentColor);
                // console.log("Counter of : " + currentColor + " is : " + colorCounter.get(currentColor));
                var counter = colorCounter.get(currentColor);
                // console.log("Counter : " + counter + " inc : " + counter+1);
                tableRow[row].children[col].style.backgroundImage = currentColor;
                colorCounter.set(currentColor, (counter + 1));
                // console.log("Counter of : " + currentColor + " is : " + colorCounter.get(currentColor));
            }
        }
    }

    function resetAll() {
        colorCounter.set('url(images/1.png)', 0);
        colorCounter.set('url(images/2.png)', 0);
        colorCounter.set('url(images/3.png)', 0);
        colorCounter.set('url(images/4.png)', 0);
        colorCounter.set('url(images/5.png)', 0);
        colorCounter.set('url(images/6.png)', 0);

        for (let col = 0; col < 6; col++) {
            for (let row = 0; row < 6; row++) {
                tableRow[row].children[col].style.backgroundImage = 'url(images/0.png)';
            }
        }
    }

    startBtn.addEventListener('click', () => {
        resetAll();
        loadInitialGrid();
    });

    // Setting mouse click1 & click2
    function printMousePos(e) {
        // Click-1 setting
        if (click_count == 1) {
            Row_1 = Row_ref
            Col_1 = Col_ref
            // console.log("Row1: " + Row_1 + " , Col1: " + Col_1)
        }

        // Click-2 setting  
        if (click_count == 2) {
            Row_2 = Row_ref
            Col_2 = Col_ref
            if (Row_1 == Row_2 && Col_1 == Col_2) {
                click_count = 1;
                // console.log("Please select second cell")
            } else {
                // Reset the click count
                click_count = 0;
                // console.log("Row2: " + Row_2 + " , Col2: " + Col_2)
                matchConnect();
            }
        }
    }

    // Match and connect identical pairs
    function matchConnect() {

        // Different cells check
        if ((Row_1 != Row_2) || (Col_1 != Col_2)) {

            // Match identical colour pair check 
            if (tableRow[Row_1].children[Col_1].style.backgroundImage == tableRow[Row_2].children[Col_2].style.backgroundImage) {
                // console.log("First Cell Imaghe = " + tableRow[Row_1].children[Col_1].style.backgroundImage);
                // console.log("First Cell Imaghe = " + tableRow[Row_1].children[Col_1].style.backgroundImage);

                // Max & Min row , col
                Max_row = Math.max(Row_1, Row_2)
                Max_col = Math.max(Col_1, Col_2)
                Min_row = Math.min(Row_1, Row_2)
                Min_col = Math.min(Col_1, Col_2)

                // console.log("Max Row: " + Max_row + " , Max Col: " + Max_col)
                // console.log("Min Row: " + Min_row + " , Min Col: " + Min_col)

                // Reset the cells if the cells are next to each other in same row or column
                if (((Math.abs(Row_1 - Row_2) == 0) && (Math.abs(Col_1 - Col_2) == 1)) || ((Math.abs(Row_1 - Row_2) == 1) && (Math.abs(Col_1 - Col_2) == 0))) {
                    tableRow[Row_1].children[Col_1].style.backgroundImage = 'url(images/0.png)';
                    tableRow[Row_2].children[Col_2].style.backgroundImage = 'url(images/0.png)';
                }

                // End rows or columns connection
                if (((Row_1 == 0) && (Row_2 == 0)) || ((Row_1 == 5) && (Row_2 == 5)) || ((Col_1 == 0) && (Col_2 == 0)) || ((Col_1 == 5) && (Col_2 == 5))) {
                    tableRow[Row_1].children[Col_1].style.backgroundImage = 'url(images/0.png)';
                    tableRow[Row_2].children[Col_2].style.backgroundImage = 'url(images/0.png)';
                }

                // Cross cells identification 
                cross_check = 0;
                if (((Max_row - Min_row) * (Max_col - Min_col)) == 1) {
                    // Cross-check 1 side
                    if ((Col_1 == Min_col && Row_1 == Min_row) || (Col_1 == Max_col && Row_1 == Max_row)) {
                        if ((tableRow[Max_row].children[Min_col].style.backgroundImage != 'url(\"images/0.png\")') && (tableRow[Min_row].children[Max_col].style.backgroundImage != 'url(\"images/0.png\")')) { cross_check = 1 }
                    }

                    // Cross-check 2 side
                    if ((Col_1 == Min_col && Row_1 == Max_row) || (Col_1 == Max_col && Row_1 == Min_row)) {
                        if ((tableRow[Min_row].children[Min_col].style.backgroundImage != 'url(\"images/0.png\")') && (tableRow[Max_row].children[Max_col].style.backgroundImage != 'url(\"images/0.png\")')) { cross_check = 1 }
                    }

                    // Reset the cells cross check verified
                    if (cross_check == 0) {
                        tableRow[Row_1].children[Col_1].style.backgroundImage = 'url(images/0.png)';
                        tableRow[Row_2].children[Col_2].style.backgroundImage = 'url(images/0.png)';
                    }
                }

                hoz_check_1 = 0;
                hoz_check_2 = 0;
                ver_check_1 = 0;
                ver_check_2 = 0;

                // 2 Horizontal and 1 vertical connect 
                if (tableRow[Row_1].children[Col_1].style.backgroundImage != 'url(\"images/0.png\")') {

                    // Horizontal connect check for Row_1 & Row_2
                    for (init_col = 0; init_col < 6; init_col++) {
                        // console.log("Init_Col: " + init_col)
                        // Horizontal Row_1 connect check
                        hoz_check_1 = 0;
                        let hoz_col1 = init_col;
                        if (init_col < Col_1) {
                            i = 1;
                        } else { i = -1 }
                        if (init_col == Col_1) {
                            i = 0;
                        }
                        do {
                            if ((tableRow[Row_1].children[hoz_col1].style.backgroundImage != 'url(\"images/0.png\")') && (hoz_col1 != Col_1)) {
                                hoz_check_1 = hoz_check_1 + 1;
                            }
                            hoz_col1 = hoz_col1 + i;
                            // console.log("Hoz_Col1_Update: " + hoz_col1)
                        } while (hoz_col1 != Col_1);

                        // Horizontal Row_2 connect check
                        hoz_check_2 = 0;
                        let hoz_col2 = init_col;
                        if (init_col < Col_2) {
                            j = 1;
                        } else { j = -1 }
                        if (init_col == Col_2) {
                            j = 0;
                        }
                        do {
                            if ((tableRow[Row_2].children[hoz_col2].style.backgroundImage != 'url(\"images/0.png\")') && (hoz_col2 != Col_2)) {
                                hoz_check_2 = hoz_check_2 + 1;
                            }
                            hoz_col2 = hoz_col2 + j;
                            // console.log("Hoz_Col2_Update: " + hoz_col2)
                        } while (hoz_col2 != Col_2);

                        // Vertical connect check for particular column
                        ver_check_1 = 0;
                        // console.log("Init Col: " + init_col + " Max_row: " + Max_row + " Min_row: " + Min_row)
                        for (let row = (Min_row + 1); row <= Max_row - 1; row++) {
                            if (tableRow[row].children[init_col].style.backgroundImage != 'url(\"images/0.png\")') {
                                ver_check_1 = ver_check_1 + 1;
                                // console.log("Ver_Check_1: " + ver_check_1)    
                            }
                        }

                        // Outside edge check
                        if ((init_col == 0) || (init_col == 5)) {
                            ver_check_1 = 0;
                        }
                        if (((Row_1 == 0) || (Row_1 == 5)) && (init_col == Col_2)) {
                            hoz_check_1 = 0
                            if (tableRow[Row_1].children[init_col].style.backgroundImage != 'url(\"images/0.png\")') {
                                ver_check_1 = ver_check_1 + 1;
                            }
                        }
                        if (((Row_2 == 0) || (Row_2 == 5)) && (init_col == Col_1)) {
                            hoz_check_2 = 0
                            if (tableRow[Row_1].children[init_col].style.backgroundImage != 'url(\"images/0.png\")') {
                                ver_check_1 = ver_check_1 + 1;
                            }
                        }

                        // Not to have Z-shape (one right & one left) connection
                        if ((init_col > Min_col) && (init_col < Max_col) && (Row_1 != Row_2)) {
                            hoz_check_1 = 1;
                        }

                        // console.log("Hoz_Check_1: " + hoz_check_1 + " Hoz_Check_2: " + hoz_check_2 + " Ver_Check_1: " + ver_check_1)
                        // Reset the cells after connection
                        if (((hoz_check_1 + hoz_check_2 + ver_check_1) == 0) && ((Math.abs(Row_1 - Row_2) * Math.abs(Col_1 - Col_2)) != 1)) {
                            tableRow[Row_1].children[Col_1].style.backgroundImage = 'url(images/0.png)';
                            tableRow[Row_2].children[Col_2].style.backgroundImage = 'url(images/0.png)';
                        }


                    }
                }

                // 2 Vertical and 1 horizontal connect 
                if (tableRow[Row_1].children[Col_1].style.backgroundImage != 'url(\"images/0.png\")') {
                    // Vertical connect check for Col_1 & Col_2
                    for (init_row = 0; init_row < 6; init_row++) {
                        // console.log("Init_Row: " + init_row)
                        // Vertical Col_1 connect check
                        ver_check_1 = 0;
                        let ver_row1 = init_row;
                        if (init_row < Row_1) {
                            i = 1;
                        } else { i = -1 }
                        if (init_row == Row_1) {
                            i = 0;
                        }
                        do {
                            if ((tableRow[ver_row1].children[Col_1].style.backgroundImage != 'url(\"images/0.png\")') && (ver_row1 != Row_1)) {
                                ver_check_1 = ver_check_1 + 1;
                            }
                            ver_row1 = ver_row1 + i;
                            // console.log("Ver_Row1_Update: " + ver_row1)
                        } while (ver_row1 != Row_1);

                        // Vertical Col_1 connect check
                        ver_check_2 = 0;
                        let ver_row2 = init_row;
                        if (init_row < Row_2) {
                            j = 1;
                        } else { j = -1 }
                        if (init_row == Row_2) {
                            j = 0;
                        }
                        do {
                            if ((tableRow[ver_row2].children[Col_2].style.backgroundImage != 'url(\"images/0.png\")') && (ver_row2 != Row_2)) {
                                ver_check_2 = ver_check_2 + 1;
                            }
                            ver_row2 = ver_row2 + j;
                            // console.log("Ver_Row2_Update: " + ver_row2)
                        } while (ver_row2 != Row_2);

                        // Horizontal connect check for particular row
                        hoz_check_1 = 0;
                        // console.log("Init Row: " + init_row + " Max_col: " + Max_col + " Min_col: " + Min_col)
                        for (let col = (Min_col + 1); col <= Max_col - 1; col++) {
                            if (tableRow[init_row].children[col].style.backgroundImage != 'url(\"images/0.png\")') {
                                hoz_check_1 = hoz_check_1 + 1;
                                // console.log("Hoz_Check_1: " + hoz_check_1)    
                            }
                        }

                        // Outside edge check
                        if ((init_row == 0) || (init_row == 5)) {
                            hoz_check_1 = 0;
                        }
                        if (((Col_1 == 0) || (Col_1 == 5)) && (init_row == Row_2)) {
                            ver_check_1 = 0
                            if (tableRow[init_row].children[Col_1].style.backgroundImage != 'url(\"images/0.png\")') {
                                hoz_check_1 = hoz_check_1 + 1;
                            }
                        }
                        if (((Col_2 == 0) || (Col_2 == 5)) && (init_row == Row_1)) {
                            ver_check_2 = 0
                            if (tableRow[init_row].children[Col_2].style.backgroundImage != 'url(\"images/0.png\")') {
                                hoz_check_1 = hoz_check_1 + 1;
                            }
                        }

                        // Not to have Z-shape (one right & one left) connection
                        if ((init_row > Min_row) && (init_row < Max_row) && (Col_1 != Col_2)) {
                            ver_check_1 = 1;
                        }

                        // console.log("Ver_Check_1: " + ver_check_1 + " Ver_Check_2: " + ver_check_2 + " Hoz_Check_1: " + hoz_check_1)
                        // Reset the cells after connection
                        if (((ver_check_1 + ver_check_2 + hoz_check_1) == 0) && ((Math.abs(Row_1 - Row_2) * Math.abs(Col_1 - Col_2)) != 1)) {
                            tableRow[Row_1].children[Col_1].style.backgroundImage = 'url(images/0.png)';
                            tableRow[Row_2].children[Col_2].style.backgroundImage = 'url(images/0.png)';
                        }
                    }
                }
            }
        }
    }
})