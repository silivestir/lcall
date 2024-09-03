async function trainModel(inputs, outputs, window_size, n_epochs, learning_rate, n_layers, callback) {
    const input_layer_shape = 4; // Number of features: color, mean, var, next_approximate
    const input_layer_neurons = 100;

    const rnn_input_features = input_layer_shape;
    const rnn_input_timesteps = window_size; // Adjust according to your sequence length

    const rnn_input_shape = [rnn_input_timesteps, rnn_input_features];
    const rnn_output_neurons = 20;

    const rnn_batch_size = window_size;

    const output_layer_neurons = 1;

    const model = tf.sequential();

    // Normalize inputs and outputs
    const xs = tf.tensor2d(inputs, [inputs.length, input_layer_shape]).div(tf.scalar(10));
    const ys = tf.tensor2d(outputs, [outputs.length, 1]).div(tf.scalar(10));

    // Input layer
    model.add(tf.layers.dense({units: input_layer_neurons, inputShape: [input_layer_shape]}));
    
    // Reshape for RNN input
    model.add(tf.layers.reshape({targetShape: rnn_input_shape}));

    // LSTM layers
    const lstm_layers = [];
    for (let i = 0; i < n_layers; i++) {
        lstm_layers.push(tf.layers.lstmCell({units: rnn_output_neurons}));
    }

    model.add(tf.layers.rnn({
        cell: lstm_layers,
        inputShape: rnn_input_shape,
        returnSequences: false
    }));

    // Output layer
    model.add(tf.layers.dense({units: output_layer_neurons}));

    // Compile model
    const opt_adam = tf.train.adam(learning_rate);
    model.compile({ optimizer: opt_adam, loss: 'meanSquaredError'});

    // Train the model
    const hist = await model.fit(xs, ys, {
        batchSize: rnn_batch_size, 
        epochs: n_epochs, 
        callbacks: {
            onEpochEnd: async (epoch, log) => { 
                callback(epoch, log); 
            }
        }
    });

    return { model: model, stats: hist };
}

function Predict(inputs, model) {
    const normalizedInputs = tf.tensor2d(inputs, [inputs.length, 4]).div(tf.scalar(10)); // Assuming 4 features
    const predictions = model.predict(normalizedInputs).mul(tf.scalar(10));

    return Array.from(predictions.dataSync());
}
