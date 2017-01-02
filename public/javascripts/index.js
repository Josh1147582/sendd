// Check for the various File API support.
if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  alert('This website requires HTML5, which your browser does not fully support. Please use a supported browser to use this website.');
}

// Grab a peer ID
var peer = new Peer({host: 'localhost', port: 9000, path: '/node_modules/peerjs'});

// Send a file
function send() {
    // Check that all fields are filled
    var file_to_send = document.getElementById("file_to_send").files[0];
    var dest_id = document.getElementById("dest_id").value;
    if(!file_to_send && !dest_id) {
        alert("Please select a file and previde a Destination ID.");
    }
    else if(!file_to_send) {
        alert("Please select a file.");
    }
    else if(!dest_id) {
        alert("Please provide a Destination ID.");
    }
    else if (dest_id === peer.id) {
        alert("You can't send a file to yourself!");
    }
    else {
	// Build blob from file and file type
	var blob = new Blob([file_to_send], {type: file_to_send.type});

	// Connect to the desired peer
	var con = peer.connect(dest_id, { label: 'file', reliable: true}); 

	con.on('open', function() {
	    // Send arr of blob and file data
	    con.send({
		name: document.getElementById("file_to_send").files[0].name,
		file: blob,
		type: document.getElementById("file_to_send").files[0].type
	    });
	});
    }
}

// Display ID
peer.on('open', function(id) {
  document.getElementById("my_id").textContent = peer.id;
});

// Constantly listen for incoming connections
peer.on('connection', function(conn) {
    conn.on('open', function() {
        conn.on('data', function(data) {
	    // TODO consider sending a size blob beforehand, or a size field in the blob
	    // A good starting point would be to continuously update the entry with how
	    // much data was downloaded
            var blob = new Blob([data.file], {type: data.type});
            var url = window.URL.createObjectURL(blob);
 
            var table = document.getElementById("file_table");

            // Remove the "No Files" row
            var elem = document.getElementById("empty_row");
            if(elem) {
                elem.parentNode.removeChild(elem);
                //var row = table.insertRow(1);
                //row.innerHTML = "File";
                //var cell = row.insertCell(0);
                //cell.innerHTML = "Time received";
                //cell = row.insertCell(0);
                //cell.innerHTML = "Source ID";
                //cell = row.insertCell(0);
                //cell.innerHTML = "Size";

            }

            var row = table.insertRow(1);
            var a = document.createElement("a");
            a.href = url;
            a.innerHTML = data.name;
            a.setAttribute("download", data.name);
            var file_col = row.insertCell(0);
            file_col.appendChild(a);
            //int id_col = row.insertCell(0);
            //var d = new Date();
            //id_col.innerHTML = d.getHours+':'+d.getMinutes();
        });
    });
});

peer.on('error', function(err) {
    if (err.type === 'peer-unavailable') {
        alert("No user with the given ID is currently connected.");
    }
});
