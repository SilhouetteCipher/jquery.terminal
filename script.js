$(document).ready(function() {
    const terminal = $('#terminal').terminal(function(command) {
        if (command === 'narrative') {
            $.getJSON('narrative.json', function(data) {
                terminal.echo(data.content);
            }).fail(function() {
                terminal.error('Failed to fetch narrative data.');
            });
        } else {
            terminal.error('Unknown command.');
        }
    }, {
        greetings: 'Welcome to the narrative terminal! Type "narrative" to fetch the narrative data.',
        name: 'narrative_terminal',
        height: 1428,
        width: 1300
    });
});
