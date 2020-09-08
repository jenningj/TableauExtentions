var globalSavedSheetName = "Comments";
var globalSavedDatasourceName = "yoursqldb";

//var globalSavedSheetName = document.getElementById("user_input").value;

'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  // Use the jQuery document ready signal to know when everything has been initialized
  $(document).ready(function () {
    // Tell Tableau we'd like to initialize our extension
    tableau.extensions.initializeAsync().then(function () {
      // Fetch the saved sheet name from settings. This will be undefined if there isn't one configured yet
      const savedSheetName = tableau.extensions.settings.get('sheet');
      //globalSavedSheetName = savedSheetName;
      if (savedSheetName) {
        // We have a saved sheet name, show its selected marks
        loadSelectedMarks(savedSheetName);
      } else {
        // If there isn't a sheet saved in settings, show the dialog
        
        //DONT SHOW CHOOSE SHEET DIALOG - SHEET TO COMMENT ON ALWAYS NEEDS TO BE CALLED "Comments"
        //  showChooseSheetDialog();
      }

      initializeButtons();
    });
  });

  /**
   * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
   */
  function showChooseSheetDialog () {
    // Clear out the existing list of sheets
    $('#choose_sheet_buttons').empty();

    // Set the dashboard's name in the title
    const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
    $('#choose_sheet_title').text(dashboardName);

    // The first step in choosing a sheet will be asking Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Next, we loop through all of these worksheets and add buttons for each one
    worksheets.forEach(function (worksheet) {
      // Declare our new button which contains the sheet name
      const button = createButton(worksheet.name);

      // Create an event handler for when this button is clicked
      button.click(function () {
        // Get the worksheet name and save it to settings.
        filteredColumns = [];
        const worksheetName = worksheet.name;
        tableau.extensions.settings.set('sheet', worksheetName);
        tableau.extensions.settings.saveAsync().then(function () {
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

  function createButton (buttonTitle) {
    const button =
    $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

    return button;
  }

  // This variable will save off the function we can call to unregister listening to marks-selected events
  let unregisterEventHandlerFunction;
  
  
  
  
    
  
  
  function reportSelectedMarks(marks) {
	var html = ""; 
	
	for (var markIndex = 0; markIndex < marks.length; markIndex++) {
		pairs = marks[markIndex].getPairs();
		html += "<b>Mark " + markIndex + ":</b><ul>";

		for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
			pair = pairs[pairIndex];
			html += "<li><b>Field Name:</b> " + pair.fieldName;
			html += "<br/><b>Value:</b> " + pair.formattedValue + "</li>";
			console.log("Field Name: " + pair.fieldName + " | Value: " + pairIndex + pair.formattedValue);

			//Customer Name
		}
		html += "</ul>";
	//var customerName = pairs[0].formattedValue;
   // var clusterName = document.getElementById("textBox").value;
	var customerName = "static1";
	var clusterName = "static2";
	console.log(clusterName);
	jQueryFunction(customerName,clusterName);
	}

	var infoDiv = document.getElementById('markDetails');
	infoDiv.innerHTML = html;
	resultArray = pairs[1].formattedValue;
	document.getElementById("textField").textContent="resultArray";
	phpDbFunction();
	alert("Function phpDbFunction() called ");
}
  
  
  
  
  
  
  


  function writeBack (worksheetName) {	
  console.log("0. writeBack"); 
   const activeSheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
	 
	 const summaryDataTable = activeSheet.getSelectedMarksAsync().then(function (marks) {
      // Get the first DataTable for our selected marks (usually there is just one)
		var selectedDataTable = marks.data[0].data;
		
		console.log("1. writeBack");


      	//alert("2. selectedDataTable.formattedValue: "+ selectedDataTable[0][0].formattedValue);
		 writeBackMarks(selectedDataTable);
		return marks.data[0];
	  });
  }

  
  function writeBackMarks (selectedDataTable) {
	  var i = 0;
	  console.log("2. writeBackMarks");


				//1te Spalte = customerName
				console.log('selectedDataTable[0][2].formattedValue : ' +  selectedDataTable[0][2].formattedValue);
				var customerName = selectedDataTable[0][2].formattedValue;



       // var checkBox = document.getElementById("user_input").value;
       // var checkBox = document.getElementById("data_table_checkbox_0").checked;
				

    //console.log("tableau.extensions.dashboardContent.dashboard.worksheets.get(Utilization);: "+tableau.extensions.dashboardContent.dashboard.worksheets.get("Utilization"));

 
    //Order ID as one example
    var object_id_to_comment_on = selectedDataTable[0][1].formattedValue;
    console.log('object_id_to_comment_on : ' +  object_id_to_comment_on);

    

    //Username is a Tableau Calculated Field USERNAME()
    var username =  selectedDataTable[0][0].formattedValue;
    var fullname = "static fullname";

    var comment = document.getElementById("comment").value;
    console.log('document.getElementById("comment").value : ' +  document.getElementById("comment").value);
    
    var status = document.getElementById("status").value;
    var last_status_label = document.getElementById("status").value;

		
				$.post('php/writeToDb.php',{
            object_id_to_comment_on:object_id_to_comment_on,
            username:username,
            fullname:fullname,
            comment:comment,
            status:status,
            last_status_label:last_status_label,
          },
				
	 
				
				function(data)  {
					$('#result').html(data);
				});
			refreshSheet();
			//return cell.formattedValue;
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

	  

  // Refreshes the given dataSource.
  function refreshDataSource (dataSource) {
    dataSource.refreshAsync().then(function () {
      console.log(dataSource.name + ': Refreshed Successfully');
    });
  }




  
  function extractData (worksheetName) {
	//var activeSheet;
	

	var sheetArray = tableau.extensions.dashboardContent.dashboard.worksheets;
  var inputSheetIndex;
  

  	// alert("worksheets: "+ sheetArray[2].name);
  	 for (var i = 0; i < sheetArray.length; i++) { 
		    if (sheetArray[i].name == globalSavedSheetName) { 
		    	inputSheetIndex = i;
		    	//alert("inputSheetIndex: "+inputSheetIndex);
		    	 break;
		    } ;
		}

		    	
  const activeSheet = tableau.extensions.dashboardContent.dashboard.worksheets[inputSheetIndex];
  console.log("0. globalSavedSheetName: "+globalSavedSheetName); 

	//alert("activeSheet: "+ activeSheet.name);

  	//statisch 3tes Sheet auf dem Dashboard
  	 //const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

  	 //alert("activeSheet: "+ activeSheet);
	 
	 const summaryDataTable = activeSheet.getSelectedMarksAsync().then(function (marks) {
      // Get the first DataTable for our selected marks (usually there is just one)
		var selectedDataTable = marks.data[0].data;
		
      	//alert("2. selectedDataTable.formattedValue: "+ selectedDataTable.formattedValue);
		
		//zuletzt gesehen mit writeBackMarks, aber ging nicht...
 		//writeBack(selectedDataTable);
		 writeBackMarks(selectedDataTable);
		return marks.data[0];
	  });
  }

  
  
  
  
  
  
  function loadSelectedMarks (worksheetName) {
    // Remove any existing event listeners
    if (unregisterEventHandlerFunction) {
      unregisterEventHandlerFunction();
    }

    // Get the worksheet object we want to get the selected marks for
    const worksheet = getSelectedSheet(worksheetName);

    // Set our title to an appropriate value
    $('#selected_marks_title').text(worksheet.name);


	  
    // Call to get the selected marks for our sheet
    worksheet.getSelectedMarksAsync().then(function (marks) {
      // Get the first DataTable for our selected marks (usually there is just one)
      const worksheetData = marks.data[0];
	  	  

      // Map our data into the format which the data table component expects it
      const data = worksheetData.data.map(function (row, index) {
        const rowData = row.map(function (cell) {
		  //selected marks per row and index (= column)
          return cell.formattedValue;
        });
		console.log("rowData:" + rowData);
        return rowData;
      });

      const columns = worksheetData.columns.map(function (column) {
        return { title: column.fieldName };
      });
      // Populate the data table with the rows and columns we just pulled out
      populateDataTable(data, columns);
    });

    // Add an event listener for the selection changed event on this sheet.
    unregisterEventHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, function (selectionEvent) {
      // When the selection changes, reload the data
      loadSelectedMarks(worksheetName);
    });
  }

  function populateDataTable (data, columns) {
    // Do some UI setup here: change the visible section and reinitialize the table
    $('#data_table_wrapper').empty();

    if (data.length > 0) {
      $('#no_data_message').css('display', 'none');
      $('#data_table_wrapper').append(`<table id='data_table' class='table table-striped table-bordered'></table>`);

      // Do some math to compute the height we want the data table to be
      var top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
      var height = $(document).height() - top - 130;

      const headerCallback = function (thead, data) {
        const headers = $(thead).find('th');
        for (let i = 0; i < headers.length; i++) {
          const header = $(headers[i]);
          if (header.children().length === 0) {
			//header text
            const fieldName = header.text(); // +"hans"
            const button = $(`<a href='#'>${fieldName}</a>`);
            button.click(function () {
              filterByColumn(i, fieldName);
            });

            header.html(button);
          }
        }
      };

      // Initialize our data table with what we just gathered
      $('#data_table').DataTable({
        data: data,
        columns: columns,
        autoWidth: false,
        deferRender: true,
        scroller: false,
        scrollY: height,
        scrollX: true,
        headerCallback: headerCallback,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>" // Do some custom styling
      });
    //alert("data:" + data);
    
    var elems = document.getElementsByClassName('row');
    for(var i = 0; i != elems.length; ++i)    {
     elems[i].style.visibility = "hidden"; // hidden has to be a string
     //elems[i].style.size = "0px"; 
    }


    //add column with checkboxes to table (id=data_table)
     var myTable = $('#data_table'),
         iter = 0;
        //alert("hier");
         myTable.find('tr').not(':first').each(function(){
           var trow = $(this);
             if(trow.index() === 0){
               // check box in last column
                trow.append('<td><input type="text" id="data_table_text_'+iter+'" name="cb'+iter+' value="content"/></td>');
                // trow.append('<td><input type="checkbox" id="data_table_checkbox_'+iter+'" name="cb'+iter+' value="content"/></td>');
             }else{
                // trow.append('<td><input type="text" id="data_table_checkbox_'+iter+'" name="cb'+iter+' value="content"/>asd</td>');
             }
            
         });

        iter += 1;

	  
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'inline');
    }
  }

  function initializeButtons () {
    $('#show_choose_sheet_button').click(showChooseSheetDialog);
    $('#reset_filters_button').click(resetFilters);
	$('#write_back_button').click(writeBack);
	$('#extract_data_button').click(extractData);

  }

  // Save the columns we've applied filters to so we can reset them
  let filteredColumns = [];

  function filterByColumn (columnIndex, fieldName) {
    // Grab our column of data from the data table and filter out to just unique values
    const dataTable = $('#data_table').DataTable({ retrieve: true });
    const column = dataTable.column(columnIndex);
    const columnDomain = column.data().toArray().filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    const worksheet = getSelectedSheet(tableau.extensions.settings.get('sheet'));
    worksheet.applyFilterAsync(fieldName, columnDomain, tableau.FilterUpdateType.Replace);
    filteredColumns.push(fieldName);
    return false;
  }

  function resetFilters () {
    const worksheet = getSelectedSheet(tableau.extensions.settings.get('sheet'));
    filteredColumns.forEach(function (columnName) {
      worksheet.clearFilterAsync(columnName);
    });

    filteredColumns = [];
  }

  function getSelectedSheet (worksheetName) {
    if (!worksheetName) {
      worksheetName = tableau.extensions.settings.get('sheet');
    }

    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
  }
})();










		
		//TT End

		
 
		
		
	
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
