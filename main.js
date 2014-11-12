/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50, white: true */
/*global define, $, brackets, window, log, require, exports, process */

define(function( require, exports, module ) {

    "use strict";

    // Brackets Modules

    var NodeDomain = brackets.getModule('utils/NodeDomain'),
        CommandManager = brackets.getModule('command/CommandManager'),
        Menus = brackets.getModule('command/Menus'),
        ProjectManager = brackets.getModule("project/ProjectManager"),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        AppInit = brackets.getModule('utils/AppInit'),
        dir = '';


    // Init


    function open_terminal_here() {

        var domain_path = ExtensionUtils.getModulePath( module, 'node/oth_domain' ),
            oth_domain = new NodeDomain( 'oth_domain', domain_path );

        oth_domain.exec( 'get_path', dir ).done(function( dirname ) {
            oth_domain.exec('open', dirname );
        });

    }

    AppInit.htmlReady(function() {


        var context_menus = Menus.getContextMenu( Menus.ContextMenuIds.PROJECT_MENU ),
            CMD_OPEN_TERMINAL = 'com.openterminal';

        CommandManager.register( 'Open Terminal here…', CMD_OPEN_TERMINAL, open_terminal_here );
        context_menus.addMenuItem( CMD_OPEN_TERMINAL );

        $(context_menus).on("beforeContextMenuOpen", function () {

            var selectedEntry = ProjectManager.getSelectedItem().fullPath;
            dir = selectedEntry;

        });

        // ExtensionUtils.loadStyleSheet( module, 'assets/styles/main.css' );

    });







});
