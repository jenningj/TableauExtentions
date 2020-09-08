var worksheet;

tableau.extensions.initializeAsync().then(function() {
  google.charts.load("current", {packages:["sankey"]});
  google.charts.setOnLoadCallback(initializeTableauVariables);
  // Add an event listener for the selection changed event on this sheet.
  
});


function initializeTableauVariables(){
  
  worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];
  worksheet.addEventListener(tableau.TableauEventType.FilterChanged, onFilterChanged);

  populateSankeyChart()

}

function onFilterChanged(){
  populateSankeyChart();
}


function populateSankeyChart() {
  const worksheet = tableau.extensions.dashboardContent.dashboard.worksheets[0];

  worksheet.getSummaryDataAsync().then(function (myDataTable){
    var wsHeight = 300;
    var wsWidth = 700;



    rowCount    = myDataTable.totalRowCount;
    columnCount = myDataTable.columns.length;

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
      
   
    rowCount    = myDataTable.totalRowCount;
    columnCount = myDataTable.columns.length;
 
    for (var i = 0; i < rowCount; i++) {
      var array = [myDataTable.data[i][0].value,
                   myDataTable.data[i][1].value, 
                   Number(myDataTable.data[i][2].value)];

      data.addRows([array]);
    }

    // Set chart options
    var options = {
      width: wsWidth,
      height: wsHeight
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(data, options);
  });
}





