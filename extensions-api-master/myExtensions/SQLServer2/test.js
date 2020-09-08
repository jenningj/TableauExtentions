'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function () {
  // Use the jQuery document ready signal to know when everything has been initialized
  $(document).ready( function () {
    $('#myTable').DataTable();
} );
});

//form submit function
document.getElementsByName("myForm").onsubmit = function() {sendDataToDB()}

function sendDataToDB() {
	var selectedDataTable = "1";
	console.log("Send Data to DB Called");
	//Get data from the Submitted HTML Form
	//var UserID = "admin"
	var UserID = document.getElementById("UserID").value;
	console.log(UserID)
	//var ScenarioID = "001"
	var ScenarioID = document.getElementById("ScenarioID").value;
	console.log(ScenarioID)
	//var Scenario_Description = "Test FFS"
	var Scenario_Description = document.getElementById("Scenario_Description").value;
	console.log(Scenario_Description)
	var Status = document.getElementById("Status").value;
	console.log(Status)
	var P1_Name = document.getElementById("P1_Name").value;
	console.log(P1_Name)
	var P1_Value = document.getElementById("P1_Value").value;
	console.log(P1_Value)
	var P2_Name = document.getElementById("P2_Name").value;
	console.log(P2_Name)
	var P2_Value = document.getElementById("P2_Value").value;
	console.log(P2_Value)
	var P3_Name = document.getElementById("P3_Name").value;
	console.log(P3_Name)
	var P3_Value = document.getElementById("P3_Value").value;
	console.log(P3_Value)
	var P4_Name = document.getElementById("P4_Name").value;
	console.log(P4_Name)
	var P4_Value = document.getElementById("P4_Value").value;
	console.log(P4_Value)
	$.post('php/writeToDb.php',{
		UserID,
		ScenarioID,
		Scenario_Description,
		Status,
		P1_Name,
		P1_Value,
		P2_Name,
		P2_Value,
		P3_Name,
		P3_Value,
		P4_Name,
		P4_Value,
		},
		function(data) {
			$('#result').html(data);
			console.log("Break 61");
		});
	console.log("Calling Refresh SQL");
	refreshSQLsoon();
}

function refreshSQLsoon() {
	refreshSQL()
};

function refreshSQL() {
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
			  if (dashboardDataSources[dataSource.id].name == "DatasourceSQL")  {
				  //refreshDataSource(dashboardDataSources[dataSource.id]);
				  //alert("id: " + dashboardDataSources[dataSource.id]);
				  //alert("dataSource.id: " + dataSource.id);
				  refreshDataSource(dashboardDataSources[dataSource.id]);
				  console.log("refreshSQL() was called for Datasource Name: 'DatasourceSQL'");
			  }

			 //refreshDataSource(dashboardDataSources["DatasourceSQL"]);
            }
          });
        });
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
  }};