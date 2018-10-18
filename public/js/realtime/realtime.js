/*******************************************************************************
* Copyright (c) 2014 IBM Corporation and other Contributors.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
* IBM - Initial Contribution
*******************************************************************************/

var subscribeTopic = "";

var Realtime = function(orgId, api_key, auth_token) {

	var firstMessage = true;

  // if user is running mozilla then use it's built-in WebSocket
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://127.0.0.1:1337');

  connection.onopen = function () {
    // connection is opened and ready to use
    console.log("Connection is open");
  };

  connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    console.log("Connection had problem opening");
  };


  connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
      console.log('JSON:', message.data);
    try {
      var json = JSON.parse(message.data);
    } catch (e) {
      console.log('JSON: Data doesnt look like JSON',
          message.data);
      return;
    }
    // handle incoming message
  };

	this.initialize = function(){

		// Initialize the Realtime Graph
		var rtGraph = new RealtimeGraph();
if (true)
                connection.onmessage = function (msg) {
			var topic = msg.destinationName;
			var payload = JSON.parse(msg.data);
	console.log("IN HERE ", payload);		
			//First message, instantiate the graph  
		    if (firstMessage) {
		    	$('#chart').empty();
		    	firstMessage = false;
		    	rtGraph.displayChart(null, payload);
		    } else {
		    	rtGraph.graphData(payload);
		    }
		};

	}

	// Subscribe to the device when the device ID is selected.
	this.plotRealtimeGraph = function(){
		var item = $("#deviceslist").val();
		var tokens = item.split(':');

		//clear prev graphs
		$('#chart').hide(function(){ 
			$('#chart').empty(); 
			$('#chart').show();
			$('#chart').append(imageHTML);
		});
		
		$('#timeline').empty();
		$('#legend').empty();
		firstMessage = true;
	}

	this.initialize();

	var imageHTML = '<div class="iotdashboardtext">The selected device is not currently sending events to Google Pub Sub</div><br><div class="iotdashboardtext">Select to view historical data or select a different device.</div> <img class="iotimagesMiddle" align="middle" alt="Chart" src="images/IOT_Icons_Thing02.svg">';
}
