/*

	ractive-transitions-velocity
	============================

	Version <%= pkg.version %>.

	This plugin lets you use Velocity.js to make Ractive.js transitions,
	with full support for all of Velocity.js' properties and options

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/ractive.js'></script>
	    <script src='lib/ractive-transitions-velocity.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'ractive-transitions-velocity' );
*/

(function ( global, factory ) {

	'use strict';

	// AMD environment
	if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive', 'velocity' ], factory );
	}

	// Common JS (i.e. node/browserify)
	else if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive' ), require( 'velocity' ) );
	}

	// browser global
	else if ( global.Ractive && global.Velocity ) {
		factory( global.Ractive, global.Velocity );
	}

	else {
		throw new Error( 'Could not find Ractive! It must be loaded before the ractive-transitions-velocity plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, Velocity ) {

	'use strict';

	if( !Velocity ) throw new Error( 'Could not find Velocity! It must be loaded before the ractive-transitions-velocity plugin' );

	function add_transition( fx_name ) {
  	Ractive.transitions[fx_name] = function( t, params ) {
  		Velocity.animate( [t.node], fx_name, t.processParams( params )).then(t.complete);
  	};
	}

	if( Velocity.RegisterEffect ) {
		for( var fx_name in Velocity.RegisterEffect.packagedEffects) {
  		if( Velocity.RegisterEffect.packagedEffects.hasOwnProperty( fx_name ) ) {
  			add_transition( fx_name );
  		}
		}
	}

	Ractive.transitions.velocity = function( t, props, opts ) {
		opts = t.processParams( opts );
		Velocity.animate( [t.node], props, opts ).then(t.complete);
	};

}));
