/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50, white: true */
/*global define, $, brackets, window, log, require, exports, process */

(function() {

    "use strict";

    // Node Modules

    var path = require('path'),
        fs = require('fs');




    // Func

    function shell_exec( cmd, args ) {

        var spawn = require('child_process').spawn,
            child = spawn(cmd, args);

    }

    function get_path( fullpath ) {

        if( fs.lstatSync( fullpath ).isFile() ) {

            return path.dirname( fullpath );

        }

        return fullpath;

    }

    function open( dirname ) {

        shell_exec( 'open', ['-a', 'Terminal', dirname] );

    }



    // Init

    function init( domain_manager ) {

        if(!domain_manager.hasDomain('oth_domain')) {

            domain_manager.registerDomain('oth_domain', {major: 0, minor: 1});

        }

        domain_manager.registerCommand('oth_domain', 'get_path', get_path, false, [{name: 'fullpath', type: 'string'}]);
        domain_manager.registerCommand('oth_domain', 'open', open, false, [{name: 'dirname', type: 'string'}]);

    }

    exports.init = init;

}());
