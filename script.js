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
        }
    });
});
