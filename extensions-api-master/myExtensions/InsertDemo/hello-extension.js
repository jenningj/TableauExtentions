var globalSavedSheetName = "SalAge";
var globalSavedDatasourceName = "SQLServerDB";

'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {
            // Fetch the saved sheet name from settings. This will be undefined if there isn't one configured yet
            const savedSheetName = tableau.extensions.settings.get('sheet');
            if (savedSheetName) {
                // We have a saved sheet name, show its selected marks
                loadSelectedMarks(savedSheetName);
            } else {
                // If there isn't a sheet saved in settings, show the dialog
                showChooseSheetDialog();
            }

                initializeButtons();
        });
    });

    /**
     * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
     */
    function showChooseSheetDialog() {
        // Clear out the existing list of sheets
        $('#choose_sheet_buttons').empty();

        // Set the dashboard's name in the title
        const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
        $('#choose_sheet_title').text(dashboardName);

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

        // Next, we loop through all of these worksheets and add buttons for each one
        worksheets.forEach(function(worksheet) {
            // Declare our new button which contains the sheet name
            const button = createButton(worksheet.name);

            // Create an event handler for when this button is clicked
            button.click(function() {
                // Get the worksheet name and save it to settings.
                filteredColumns = [];
                const worksheetName = worksheet.name;
                tableau.extensions.settings.set('sheet', worksheetName);
                tableau.extensions.settings.saveAsync().then(function() {
                    // Once the save has completed, close the dialog and show the data table for this worksheet
                    $('#choose_sheet_dialog').modal('toggle');
                    loadSelectedMarks(worksheetName);
                });
            });

            // Add our button to the list of worksheets to choose from
            $('#choose_sheet_buttons').append(button);
        });

        // Show the dialog
        $('#choose_sheet_dialog').modal('toggle');
    }

    function createButton(buttonTitle) {
        const button =
            $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

        return button;
    }

    // This variable will save off the function we can call to unregister listening to marks-selected events
    let unregisterEventHandlerFunction;

    function loadSelectedMarks(worksheetName) {
        // Remove any existing event listeners
        if (unregisterEventHandlerFunction) {
            unregisterEventHandlerFunction();
        }

        // Get the worksheet object we want to get the selected marks for
        const worksheet = getSelectedSheet(worksheetName);

        // Set our title to an appropriate value
        $('#selected_marks_title').text(worksheet.name);

        // Call to get the selected marks for our sheet
        worksheet.getSelectedMarksAsync().then(function(marks) {
            // Get the first DataTable for our selected marks (usually there is just one)
            const worksheetData = marks.data[0];

            // Map our data into the format which the data table component expects it
            const data = worksheetData.data.map(function(row, index) {
                const rowData = row.map(function(cell) {
                    return cell.formattedValue;
                });

                return rowData;
            });

            
            // Populate HTML Boxs with the Name, Age, Sal, and ID.
            populateHTML(data)
            
        });

        // Add an event listener for the selection changed event on this sheet.
        unregisterEventHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, function(selectionEvent) {
            // When the selection changes, reload the data
            loadSelectedMarks(worksheetName);
        });
    }

    
    function populateHTML(data) {
        // Do some UI setup here: change the visible section and reinitialize the table
        $('#data_table_wrapper').empty();

        console.log("Populate HTLM")

        //console.log("Name: " + name + "Age: " + age + "Sal: " + sal + "ID: " + id )

        if (data.length > 0) {
            var name = data[0][2];
            var id = data[0][4];
            var age = data[0][3];
            var sal = data[0][5];
    
            console.log("Name: " + name + "Age: " + age + "Sal: " + sal + "ID: " + id );

            document.getElementById("name").value = name;
            document.getElementById("age").value =  age;
            document.getElementById("salary").value = sal;
            document.getElementById("persid").value = id;
            
        } else {
            // If we didn't get any rows back, there must be no marks selected
            $('#no_data_message').css('display', 'inline');
        }
    }

    function initializeButtons() {
        $('#show_choose_sheet_button').click(showChooseSheetDialog);
        $('#reset_filters_button').click(resetFilters);
        $('#update_data_button').click(writeBack);
    }

    // Save the columns we've applied filters to so we can reset them
    let filteredColumns = [];

    function filterByColumn(columnIndex, fieldName) {
        // Grab our column of data from the data table and filter out to just unique values
        const dataTable = $('#data_table').DataTable({
            retrieve: true
        });
        const column = dataTable.column(columnIndex);
        const columnDomain = column.data().toArray().filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });

        const worksheet = getSelectedSheet(tableau.extensions.settings.get('sheet'));
        worksheet.applyFilterAsync(fieldName, columnDomain, tableau.FilterUpdateType.Replace);
        filteredColumns.push(fieldName);
        return false;
    }

    function resetFilters() {
        const worksheet = getSelectedSheet(tableau.extensions.settings.get('sheet'));
        filteredColumns.forEach(function(columnName) {
            worksheet.clearFilterAsync(columnName);
        });

        filteredColumns = [];
    }

    function getSelectedSheet(worksheetName) {
        if (!worksheetName) {
            worksheetName = tableau.extensions.settings.get('sheet');
        }

        // Go through all the worksheets in the dashboard and find the one we want
        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }



  function writeBack (worksheetName) {	
    // console.log("0. writeBack"); 
     const activeSheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
       
       const summaryDataTable = activeSheet.getSelectedMarksAsync().then(function (marks) {
        // Get the first DataTable for our selected marks (usually there is just one)
          var selectedDataTable = marks.data[0].data;
          
            //alert("2. selectedDataTable.formattedValue: "+ selectedDataTable[0][0].formattedValue);
          writeBackMarks(selectedDataTable);
          return marks.data[0];
        });
    }


      function writeBackMarks (selectedDataTable) {
        var i = 0;
        console.log("1. writeBackMarks");

        console.log(selectedDataTable);

        var object_id_to_comment_on = selectedDataTable[0][4].formattedValue;
        var flag_sal_upd = 0
        var flag_age_upd = 0
        var flag_name_upd = 0
        
        var name = selectedDataTable[0][2].formattedValue;
        var age = selectedDataTable[0][3].formattedValue;
        var sal = selectedDataTable[0][5].formattedValue;

        var input_name = document.getElementById("name").value;
        var input_sal = document.getElementById("salary").value;
        var input_age =document.getElementById("age").value;

        var username = selectedDataTable[0][0].formattedValue;
        var dt = selectedDataTable[0][5].formattedValue
  
        //Check Current Values
        console.log('selectedDataTable[0][0] : ' +  selectedDataTable[0][2].formattedValue);
        console.log('selectedDataTable[0][1] : ' +  selectedDataTable[0][3].formattedValue);
        console.log('selectedDataTable[0][3] : ' +  selectedDataTable[0][5].formattedValue);

        console.log('Input Name : ' + input_name);
        console.log('Input Sal : ' +  input_sal);
        console.log('input_age : ' +  input_age);
        
        if(input_name !== name){
            console.log('Name not Matched');
            flag_name_upd = 1;
        }
        
        
        if(input_age !== age){
            console.log('Age not Matched');
            flag_age_upd = 1;
        }

        
        if(input_sal !== sal){
            console.log('Sal not Matched');
            flag_sal_upd = 1;
        }
        //Order ID as one example
        // var object_id_to_comment_on = selectedDataTable[0][1].formattedValue;
        console.log('object_id_to_comment_on : ' +  object_id_to_comment_on);

        console.log(input_name + " " +input_age + " " + input_sal);
        
        //Username is a Tableau Calculated Field USERNAME()

        $.post('php/writeToDb.php',{
              object_id_to_comment_on:object_id_to_comment_on,
              username:username,
              datetime:dt,
              name:input_name,
              age:input_age,
              sal:input_sal,
        },
                  
                      
                  function(data)  {
                      $('#result').html(data);
                  });
              refreshSheet();
              
          }
    
      // Refreshes the given dataSource.
  function refreshDataSource (dataSource) {
    dataSource.refreshAsync().then(function () {
      console.log(dataSource.name + ': Refreshed Successfully');
    });
  }

  
  function refreshSheet() {
    //array of all sheets; 3rd one becomse a new variable
    //var mySqlSheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];	 
    
    //what to filter on?
    var filterArray = ["Cluster 2"];
    //apply filter on sheet from above
    //mySqlSheet.applyFilterAsync("Cluster Name",filterArray,"replace");
    //mySqlSheet.clearFilterAsync("Cluster Name");
                    
    refreshMySql();
    
    }




})();
// END Tableau Extentions


// Wrap everything in an anonymous function to avoid polluting the global namespace
function refreshMySql() {
    $(document).ready(function () {
      tableau.extensions.initializeAsync().then(function () {
        // Since dataSource info is attached to the worksheet, we will perform
        // one async call per worksheet to get every dataSource used in this
        // dashboard.  This demonstrates the use of Promise.all to combine
        // promises together and wait for each of them to resolve.
        let dataSourceFetchPromises = [];
  
        // Maps dataSource id to dataSource so we can keep track of unique dataSources.
        let dashboardDataSources = {};
  
        // To get dataSource info, first get the dashboard.
        const dashboard = tableau.extensions.dashboardContent.dashboard;
  
        // Then loop through each worksheet and get its dataSources, save promise for later.
        dashboard.worksheets.forEach(function (worksheet) {
          dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());
        });
  
        Promise.all(dataSourceFetchPromises).then(function (fetchResults) {
          fetchResults.forEach(function (dataSourcesForWorksheet) {
            dataSourcesForWorksheet.forEach(function (dataSource) {
              if (!dashboardDataSources[dataSource.id]) { // We've already seen it, skip it.
                dashboardDataSources[dataSource.id] = dataSource;
               // alert("dataSource.name: " + dataSource.name);
                
                var datasourceName = dashboardDataSources[dataSource.id].name;
                if (dashboardDataSources[dataSource.id].name == globalSavedDatasourceName)  { 
                    //refreshDataSource(dashboardDataSources[dataSource.id]);
                    //alert("id: " + dashboardDataSources[dataSource.id]);
                    //alert("dataSource.id: " + dataSource.id);
                    refreshDataSource(dashboardDataSources[dataSource.id]);
                    console.log("refreshMySql() was called for Datasource Name: '"+globalSavedDatasourceName+"'");
                } 
  
               //refreshDataSource(dashboardDataSources["yoursqldb"]);
              }
            });
          });
  
          //buildDataSourcesTable(dashboardDataSources);
  
          // This just modifies the UI by removing the loading banner and showing the dataSources table.
        //  $('#loading').addClass('hidden');
        //  $('#dataSourcesTable').removeClass('hidden').addClass('show');
        });
      }, function (err) {
        // Something went wrong in initialization.
        console.log('Error while Initializing: ' + err.toString());
      });
    });
  
    // Refreshes the given dataSource.
    function refreshDataSource (dataSource) {
      dataSource.refreshAsync().then(function () {
        //alert(dataSource.name + ': Refreshed Successfully');
        console.log(dataSource.name + ': Refreshed Successfully');
      });
    }
              
  } 			