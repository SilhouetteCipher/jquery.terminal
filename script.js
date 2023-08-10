
let sound = document.getElementById("typeSound");
$(document).ready(function() {
    function typeText(term, message, delay = 10) {
        term.echo(''); // Add a new line
        let container = term.find('.terminal-output > :last-child > div');
        let index = 0;
        let interval = setInterval(function() {
            if (index < message.length) {
                container.append(message[index]);
                sound.play();  // Play the sound
                index++;
            } else {
                clearInterval(interval);
                term.resume();
            }
        }, delay);
    }
    
    const terminal = $('#terminal').terminal(function(command) {
        const cmd = command.toLowerCase();
        $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
            if (data[cmd]) {
                const response = Array.isArray(data[cmd]) ? data[cmd].join('\n') : data[cmd];
                typeText(this, response);
            } else {
                this.error(`Unknown command: ${cmd}`);
            }
        }.bind(this)).fail(function() {
            this.error('Failed to fetch narrative data.');
        }.bind(this));
    }, {
        greetings: '', // Empty the default greetings
        name: 'narrative_terminal',
        height: 1428,
        width: 1300,
        onInit: function(term) {
            // Fetch the greetings from the narrative.json and display it
            $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
                if (data.greetings) {
                    typeText(term, data.greetings);
                } else {
                    term.error('Failed to fetch greetings.');
                }
            });
        }
    });
    

    //codepen crt
    const adjustBackgroundSize = function() {
        const size = (Math.random() * 50) + 50 + '% ' + (Math.random() * 50) + 50 + '%';
        terminal.css('--size', size);
    }

    setInterval(adjustBackgroundSize, 100); // Reduced interval for more frequent flickering
});
