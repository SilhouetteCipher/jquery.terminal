var typeSpeed = 20;

$(document).ready(function() {
    // Function to simulate typing effect
    function typeText(element, text, interval, callback) {
        let index = 0;
        const typingInterval = setInterval(function() {
            if (index < text.length) {
                element.insert(text.charAt(index)); // Use insert to add characters to the terminal
                index++;
            } else {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, interval);
    }

    const terminal = $('#terminal').terminal(function(command) {
        if (command) {
            $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
                if (data[command]) {
                    typeText(this, data[command], typeSpeed); // Use the typeText function to display the response
                } else {
                    this.error('Unknown command.');
                }
            }.bind(this)).fail(function() {
                this.error('Failed to fetch narrative data.');
            }.bind(this));
        } else {
            this.echo('');
        }
    }, {
        greetings: '', // Empty the default greetings
        name: 'narrative_terminal',
        height: 1428,
        width: 1300,
        onInit: function(term) {
            // Fetch the greetings from the narrative.json and display it
            $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
                typeText(term, data.greetings, typeSpeed); // Use the typeText function to display the greetings
            });
        }
    });
});
