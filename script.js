$(document).ready(function() {
    const terminal = $('#terminal').terminal({
        narrative: function() {
            $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
                this.echo(data.content, { raw: true });
            }.bind(this)).fail(function() {
                this.error('Failed to fetch narrative data.');
            }.bind(this));
        }
    }, {
        greetings: '', // Empty the default greetings
        name: 'narrative_terminal',
        height: 1428,
        width: 1300,
        onInit: function(term) {
            // Fetch the greetings from the narrative.json and display it
            $.getJSON('https://silhouettecipher.github.io/jquery.terminal/narrative.json', function(data) {
                term.echo(data.greetings, { raw: true });
            });
        },
        process: function(command) {
            // Remove non-breaking spaces and return the cleaned command
            return command.replace(/\u00A0/g, ' ');
        }
    });
});

$('#terminal').on('keypress', function(e) {
    if (e.which === 160) { // 160 is the char code for non-breaking space
        e.preventDefault(); // Prevent the non-breaking space from being added
        const currentInput = terminal.get_command();
        terminal.set_command(currentInput + ' '); // Add a regular space instead
    }
});
//codepen crt
$(document).ready(function() {
    const terminal = $('#terminal');
    
    function adjustBackgroundSize() {
        const size = (Math.random() * 50) + 50 + '% ' + (Math.random() * 50) + 50 + '%';
        terminal.css('--size', size);
    }

    setInterval(adjustBackgroundSize, 100); // Reduced interval for more frequent flickering
});


