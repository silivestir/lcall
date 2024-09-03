<!DOCTYPE html>
<html lang="en">
<head>
  <title>TimeSeries@TensorFlow.js</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.3/dist/tf.min.js"></script>
  <script src="https://cdn.plot.ly/plotly-1.2.0.min.js"></script>
  <script src="./src/generators.js"></script>
  <script src="./src/model.js"></script>

  <script type="text/javascript">
    var input_dataset = [], result = [];
    var data_raw = []; var sma_vec = [];

    function Init() {
        initTabs('Dataset'); initDataset();
        document.getElementById("n-items").value = "50";
        document.getElementById("window-size").value = "12";
        document.getElementById('input-data').addEventListener('change', readInputFile, false);
    }

    function initTabs(tab) {
        var navbar = document.getElementsByClassName("nav navbar-nav");
        navbar[0].getElementsByTagName("li")[0].className += "active";
        document.getElementById("dataset").style.display = "none";
        document.getElementById("graph-plot").style.display = "none";

        setContentView(tab);
    }

    function setTabActive(event, tab) {
        var navbar = document.getElementsByClassName("nav navbar-nav");
        var tabs = navbar[0].getElementsByTagName("li");
        for (var index = 0; index < tabs.length; index++)
             if (tabs[index].className == "active")
                 tabs[index].className = "";

        if (event.currentTarget != null) {
            event.currentTarget.className += "active";
        }

        var callback = null;
        if (tab == "Neural Network") {
            callback = function () {
               document.getElementById("train_set").innerHTML = getSMATable(1);
            }
        }

        setContentView(tab, callback);
    }

    function setContentView(tab, callback) {
        var tabs_content = document.getElementsByClassName("container");
        for (var index = 0; index < tabs_content.length; index++)
             tabs_content[index].style.display = "none";

        if (document.getElementById(tab).style.display == "none")
            document.getElementById(tab).style.display = "block";

        if (callback != null) {
            callback();
        }
    }

    function readInputFile(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            document.getElementById("input-data").value = "";
            parseCSVData(contents);
        };
        reader.readAsText(file);
    }

    function parseCSVData(contents) {
        data_raw = [];
        var rows = contents.split("\n");

        var params = rows[0].split(",");
        var size = parseInt(params[0].split("=")[1]);
        var window_size = parseInt(params[1].split("=")[1]);

        document.getElementById("n-items").value = size.toString();
        document.getElementById("window-size").value = window_size.toString();

        for (var index = 1; index < size + 1; index++) {
            var cols = rows[index].split(",");
            data_raw.push({ color: parseInt(cols[0]), mean: parseFloat(cols[1]), var: parseFloat(cols[2]), target: parseFloat(cols[3]) });
        }

        sma_vec = ComputeSMA(data_raw, window_size);
        onInputDataClick();
    }

    function initDataset() {
        var n_items = parseInt(document.getElementById("n-items").value);
        var window_size = parseInt(document.getElementById("window-size").value);

        data_raw = GenerateDataset(n_items);
        sma_vec = ComputeSMA(data_raw, window_size);

        onInputDataClick();
    }

    async function onTrainClick() {
        var inputs = sma_vec.map(function(inp_f) {
            return inp_f['set'].map(function(val) { return val['mean']; })});
        var outputs = sma_vec.map(function(outp_f) { return outp_f['avg']; });

        var n_epochs     = parseInt(document.getElementById("n-epochs").value);
        var window_size  = parseInt(document.getElementById("window-size").value);
        var lr_rate      = parseFloat(document.getElementById("learning-rate").value);
        var n_hl         = parseInt(document.getElementById("hidden-layers").value);
        var n_items      = parseInt(document.getElementById("n-items-percent").value);

        var callback = function(epoch, log) {
            var log_nn = document.getElementById("nn_log").innerHTML;
            log_nn += "<div>Epoch: " + (epoch + 1) + " Loss: " + log.loss + "</div>";
            document.getElementById("nn_log").innerHTML = log_nn;
            document.getElementById("training_pg").style.width = ((epoch + 1) * (100 / n_epochs)).toString() + "%";
            document.getElementById("training_pg").innerHTML = ((epoch + 1) * (100 / n_epochs)).toString() + "%";
        }

        result = await trainModel(inputs, outputs, n_items, window_size, n_epochs, lr_rate, n_hl, callback);

        alert('Your model has been successfully trained...');
    }

    function onPredictClick(view) {
        var inputs = sma_vec.map(function(inp_f) {
            return inp_f['set'].map(function (val) { return val['mean']; }); });
        var outputs = sma_vec.map(function(outp_f) { return outp_f['avg']; });

        var n_items = parseInt(document.getElementById("n-items-percent").value);

        var outps = outputs.slice(Math.floor(n_items / 100 * outputs.length), outputs.length);

        var pred_vals = Predict(inputs, n_items, result['model']);

        var data_output = "";
        for (var index = 0; index < pred_vals.length; index++) {
             data_output += "<tr><td>" + (index + 1) + "</td><td>" +
   outps[index] + "</td><td>" + pred_vals[index] + "</td></tr>";             
        }

        document.getElementById("pred-res").innerHTML = "<table class=\"table\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Real Value</th> \
 <th scope=\"col\">Predicted Value</th></thead><tbody>" + data_output + "</tbody></table>";

        // Plot only the data you have: `mean` and `target`
        var x_data = Array.from({ length: data_raw.length }, (_, i) => i + 1); // Simple index-based x-axis

        var graph_plot = document.getElementById('graph-pred');
        Plotly.newPlot(graph_plot, [
            { x: x_data, y: data_raw.map(d => d.target), name: 'Target', type: 'scatter', mode: 'lines+markers' },
            { x: x_data, y: pred_vals, name: 'Predicted', type: 'scatter', mode: 'lines+markers' }
        ], { margin: { t: 0 } });
    }

    function getInputDataTable() {
        var data_output = "";
        for (var index = 0; index < data_raw.length; index++) {
             data_output += "<tr><td>" + (index + 1) + "</td><td>" +
 data_raw[index]['color'] + "</td><td>" + data_raw[index]['mean'] + "</td><td>" + data_raw[index]['var'] + "</td><td>" + data_raw[index]['target'] + "</td></tr>";
        }

        return "<table class=\"table\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">Color</th> \
 <th scope=\"col\">Mean</th><th scope=\"col\">Variance</th><th scope=\"col\">Target</th></thead><tbody>" + data_output + "</tbody></table>";
    }

    function getSMATable(view) {
        var data_output = "";
        for (var index = 0; index < sma_vec.length; index++) {
            data_output += "<tr><td>" + (index + 1) + "</td><td>" + sma_vec[index]['avg'] + "</td></tr>";
        }

       
        return "<table class=\"table\"><thead><tr><th scope=\"col\">#</th><th scope=\"col\">SMA</th></thead><tbody>" + data_output + "</tbody></table>";
    }

    function GenerateDataset(size) {
        var dataset = [];

        for (let i = 0; i < size; i++) {
            // Generate random target values in the range of 1.00 to 4.23 (reflecting Aviator multipliers)
            var target = parseFloat((Math.random() * (4.23 - 1.00) + 1.00).toFixed(2));

            // Generate random previous target value to compute mean
            var prev_target = parseFloat((Math.random() * (4.23 - 1.00) + 1.00).toFixed(2));

            // Compute mean as the average of the previous and current target values
            var mean = parseFloat(((prev_target + target) / 2).toFixed(2));

            // Compute variance as the difference between target and mean (simplified for this purpose)
            var variance = parseFloat(Math.abs(target - mean).toFixed(2));

            // Assign color: 1 (pink) if target >= 2, otherwise 0 (blue)
            var color = target >= 2 ? 1 : 0;

            // Push the generated data into the dataset
            dataset.push({
                color: color,
                mean: mean,
                var: variance,
                target: target
            });
        }

        return dataset;
    }

    function ComputeSMA(data, window_size) {
        var sma = [];
        for (var i = 0; i < data.length; i++) {
            var subset = data.slice(Math.max(i - window_size + 1, 0), i + 1);
            var sum = subset.reduce((acc, val) => acc + val.target, 0);
            var avg = sum / subset.length;
            sma.push({ index: i, avg: avg });
        }
        return sma;
    }
  </script>
</head>
<body onload="Init()">
  <div class="container">
    <div class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">TimeSeries@TensorFlow.js</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="#" onclick="setTabActive(event, 'Dataset')">Dataset</a></li>
          <li><a href="#" onclick="setTabActive(event, 'Graph')">Graph</a></li>
          <li><a href="#" onclick="setTabActive(event, 'Neural Network')">Neural Network</a></li>
        </ul>
      </div>
    </div>
    <div id="Dataset" class="container">
      <h2>Dataset</h2>
      <input type="file" id="input-data" />
      <button onclick="initDataset()">Generate Dataset</button>
      <div id="data-table"></div>
    </div>
    <div id="Graph" class="container">
      <h2>Graph</h2>
      <div id="graph-pred"></div>
      <button onclick="onPredictClick()">Plot Predictions</button>
      <div id="pred-res"></div>
    </div>
    <div id="Neural Network" class="container">
      <h2>Neural Network</h2>
      <div id="train_set"></div>
      <button onclick="onTrainClick()">Train Model</button>
      <div id="nn_log"></div>
    </div>
  </div>
</body>
</html>

