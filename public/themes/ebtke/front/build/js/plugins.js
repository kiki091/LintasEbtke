/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/**!
 * MixItUp v2.1.11
 *
 * @copyright Copyright 2015 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://mixitup.kunkalabs.com
 *
 * @license   Commercial use requires a commercial license.
 *            https://mixitup.kunkalabs.com/licenses/
 *
 *            Non-commercial use permitted under terms of CC-BY-NC license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
!function(a,b){"use strict";a.MixItUp=function(){var b=this;b._execAction("_constructor",0),a.extend(b,{selectors:{target:".mix",filter:".filter",sort:".sort"},animation:{enable:!0,effects:"fade scale",duration:600,easing:"ease",perspectiveDistance:"3000",perspectiveOrigin:"50% 50%",queue:!0,queueLimit:1,animateChangeLayout:!1,animateResizeContainer:!0,animateResizeTargets:!1,staggerSequence:!1,reverseOut:!1},callbacks:{onMixLoad:!1,onMixStart:!1,onMixBusy:!1,onMixEnd:!1,onMixFail:!1,_user:!1},controls:{enable:!0,live:!1,toggleFilterButtons:!1,toggleLogic:"or",activeClass:"active"},layout:{display:"inline-block",containerClass:"",containerClassFail:"fail"},load:{filter:"all",sort:!1},_$body:null,_$container:null,_$targets:null,_$parent:null,_$sortButtons:null,_$filterButtons:null,_suckMode:!1,_mixing:!1,_sorting:!1,_clicking:!1,_loading:!0,_changingLayout:!1,_changingClass:!1,_changingDisplay:!1,_origOrder:[],_startOrder:[],_newOrder:[],_activeFilter:null,_toggleArray:[],_toggleString:"",_activeSort:"default:asc",_newSort:null,_startHeight:null,_newHeight:null,_incPadding:!0,_newDisplay:null,_newClass:null,_targetsBound:0,_targetsDone:0,_queue:[],_$show:a(),_$hide:a()}),b._execAction("_constructor",1)},a.MixItUp.prototype={constructor:a.MixItUp,_instances:{},_handled:{_filter:{},_sort:{}},_bound:{_filter:{},_sort:{}},_actions:{},_filters:{},extend:function(b){for(var c in b)a.MixItUp.prototype[c]=b[c]},addAction:function(b,c,d,e){a.MixItUp.prototype._addHook("_actions",b,c,d,e)},addFilter:function(b,c,d,e){a.MixItUp.prototype._addHook("_filters",b,c,d,e)},_addHook:function(b,c,d,e,f){var g=a.MixItUp.prototype[b],h={};f=1===f||"post"===f?"post":"pre",h[c]={},h[c][f]={},h[c][f][d]=e,a.extend(!0,g,h)},_init:function(b,c){var d=this;if(d._execAction("_init",0,arguments),c&&a.extend(!0,d,c),d._$body=a("body"),d._domNode=b,d._$container=a(b),d._$container.addClass(d.layout.containerClass),d._id=b.id,d._platformDetect(),d._brake=d._getPrefixedCSS("transition","none"),d._refresh(!0),d._$parent=d._$targets.parent().length?d._$targets.parent():d._$container,d.load.sort&&(d._newSort=d._parseSort(d.load.sort),d._newSortString=d.load.sort,d._activeSort=d.load.sort,d._sort(),d._printSort()),d._activeFilter="all"===d.load.filter?d.selectors.target:"none"===d.load.filter?"":d.load.filter,d.controls.enable&&d._bindHandlers(),d.controls.toggleFilterButtons){d._buildToggleArray();for(var e=0;e<d._toggleArray.length;e++)d._updateControls({filter:d._toggleArray[e],sort:d._activeSort},!0)}else d.controls.enable&&d._updateControls({filter:d._activeFilter,sort:d._activeSort});d._filter(),d._init=!0,d._$container.data("mixItUp",d),d._execAction("_init",1,arguments),d._buildState(),d._$targets.css(d._brake),d._goMix(d.animation.enable)},_platformDetect:function(){var a=this,c=["Webkit","Moz","O","ms"],d=["webkit","moz"],e=window.navigator.appVersion.match(/Chrome\/(\d+)\./)||!1,f="undefined"!=typeof InstallTrigger,g=function(a){for(var b=0;b<c.length;b++)if(c[b]+"Transition"in a.style)return{prefix:"-"+c[b].toLowerCase()+"-",vendor:c[b]};return"transition"in a.style?"":!1},h=g(a._domNode);a._execAction("_platformDetect",0),a._chrome=e?parseInt(e[1],10):!1,a._ff=f?parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1]):!1,a._prefix=h.prefix,a._vendor=h.vendor,a._suckMode=window.atob&&a._prefix?!1:!0,a._suckMode&&(a.animation.enable=!1),a._ff&&a._ff<=4&&(a.animation.enable=!1);for(var i=0;i<d.length&&!window.requestAnimationFrame;i++)window.requestAnimationFrame=window[d[i]+"RequestAnimationFrame"];"function"!=typeof Object.getPrototypeOf&&("object"==typeof"test".__proto__?Object.getPrototypeOf=function(a){return a.__proto__}:Object.getPrototypeOf=function(a){return a.constructor.prototype}),a._domNode.nextElementSibling===b&&Object.defineProperty(Element.prototype,"nextElementSibling",{get:function(){for(var a=this.nextSibling;a;){if(1===a.nodeType)return a;a=a.nextSibling}return null}}),a._execAction("_platformDetect",1)},_refresh:function(a,c){var d=this;d._execAction("_refresh",0,arguments),d._$targets=d._$container.find(d.selectors.target);for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];if(f.dataset===b||c){f.dataset={};for(var g=0;g<f.attributes.length;g++){var h=f.attributes[g],i=h.name,j=h.value;if(i.indexOf("data-")>-1){var k=d._helpers._camelCase(i.substring(5,i.length));f.dataset[k]=j}}}f.mixParent===b&&(f.mixParent=d._id)}if(d._$targets.length&&a||!d._origOrder.length&&d._$targets.length){d._origOrder=[];for(var e=0;e<d._$targets.length;e++){var f=d._$targets[e];d._origOrder.push(f)}}d._execAction("_refresh",1,arguments)},_bindHandlers:function(){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("_bindHandlers",0),c.controls.live?c._$body.on("click.mixItUp."+c._id,c.selectors.sort,function(){c._processClick(a(this),"sort")}).on("click.mixItUp."+c._id,c.selectors.filter,function(){c._processClick(a(this),"filter")}):(c._$sortButtons=a(c.selectors.sort),c._$filterButtons=a(c.selectors.filter),c._$sortButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"sort")}),c._$filterButtons.on("click.mixItUp."+c._id,function(){c._processClick(a(this),"filter")})),d[c.selectors.filter]=d[c.selectors.filter]===b?1:d[c.selectors.filter]+1,e[c.selectors.sort]=e[c.selectors.sort]===b?1:e[c.selectors.sort]+1,c._execAction("_bindHandlers",1)},_processClick:function(c,d){var e=this,f=function(c,d,f){var g=a.MixItUp.prototype;g._handled["_"+d][e.selectors[d]]=g._handled["_"+d][e.selectors[d]]===b?1:g._handled["_"+d][e.selectors[d]]+1,g._handled["_"+d][e.selectors[d]]===g._bound["_"+d][e.selectors[d]]&&(c[(f?"remove":"add")+"Class"](e.controls.activeClass),delete g._handled["_"+d][e.selectors[d]])};if(e._execAction("_processClick",0,arguments),!e._mixing||e.animation.queue&&e._queue.length<e.animation.queueLimit){if(e._clicking=!0,"sort"===d){var g=c.attr("data-sort");(!c.hasClass(e.controls.activeClass)||g.indexOf("random")>-1)&&(a(e.selectors.sort).removeClass(e.controls.activeClass),f(c,d),e.sort(g))}if("filter"===d){var h,i=c.attr("data-filter"),j="or"===e.controls.toggleLogic?",":"";e.controls.toggleFilterButtons?(e._buildToggleArray(),c.hasClass(e.controls.activeClass)?(f(c,d,!0),h=e._toggleArray.indexOf(i),e._toggleArray.splice(h,1)):(f(c,d),e._toggleArray.push(i)),e._toggleArray=a.grep(e._toggleArray,function(a){return a}),e._toggleString=e._toggleArray.join(j),e.filter(e._toggleString)):c.hasClass(e.controls.activeClass)||(a(e.selectors.filter).removeClass(e.controls.activeClass),f(c,d),e.filter(i))}e._execAction("_processClick",1,arguments)}else"function"==typeof e.callbacks.onMixBusy&&e.callbacks.onMixBusy.call(e._domNode,e._state,e),e._execAction("_processClickBusy",1,arguments)},_buildToggleArray:function(){var a=this,b=a._activeFilter.replace(/\s/g,"");if(a._execAction("_buildToggleArray",0,arguments),"or"===a.controls.toggleLogic)a._toggleArray=b.split(",");else{a._toggleArray=b.split("."),!a._toggleArray[0]&&a._toggleArray.shift();for(var c,d=0;c=a._toggleArray[d];d++)a._toggleArray[d]="."+c}a._execAction("_buildToggleArray",1,arguments)},_updateControls:function(c,d){var e=this,f={filter:c.filter,sort:c.sort},g=function(a,b){try{d&&"filter"===h&&"none"!==f.filter&&""!==f.filter?a.filter(b).addClass(e.controls.activeClass):a.removeClass(e.controls.activeClass).filter(b).addClass(e.controls.activeClass)}catch(c){}},h="filter",i=null;e._execAction("_updateControls",0,arguments),c.filter===b&&(f.filter=e._activeFilter),c.sort===b&&(f.sort=e._activeSort),f.filter===e.selectors.target&&(f.filter="all");for(var j=0;2>j;j++)i=e.controls.live?a(e.selectors[h]):e["_$"+h+"Buttons"],i&&g(i,"[data-"+h+'="'+f[h]+'"]'),h="sort";e._execAction("_updateControls",1,arguments)},_filter:function(){var b=this;b._execAction("_filter",0);for(var c=0;c<b._$targets.length;c++){var d=a(b._$targets[c]);d.is(b._activeFilter)?b._$show=b._$show.add(d):b._$hide=b._$hide.add(d)}b._execAction("_filter",1)},_sort:function(){var a=this,b=function(a){for(var b=a.slice(),c=b.length,d=c;d--;){var e=parseInt(Math.random()*c),f=b[d];b[d]=b[e],b[e]=f}return b};a._execAction("_sort",0),a._startOrder=[];for(var c=0;c<a._$targets.length;c++){var d=a._$targets[c];a._startOrder.push(d)}switch(a._newSort[0].sortBy){case"default":a._newOrder=a._origOrder;break;case"random":a._newOrder=b(a._startOrder);break;case"custom":a._newOrder=a._newSort[0].order;break;default:a._newOrder=a._startOrder.concat().sort(function(b,c){return a._compare(b,c)})}a._execAction("_sort",1)},_compare:function(a,b,c){c=c?c:0;var d=this,e=d._newSort[c].order,f=function(a){return a.dataset[d._newSort[c].sortBy]||0},g=isNaN(1*f(a))?f(a).toLowerCase():1*f(a),h=isNaN(1*f(b))?f(b).toLowerCase():1*f(b);return h>g?"asc"===e?-1:1:g>h?"asc"===e?1:-1:g===h&&d._newSort.length>c+1?d._compare(a,b,c+1):0},_printSort:function(a){var b=this,c=a?b._startOrder:b._newOrder,d=b._$parent[0].querySelectorAll(b.selectors.target),e=d.length?d[d.length-1].nextElementSibling:null,f=document.createDocumentFragment();b._execAction("_printSort",0,arguments);for(var g=0;g<d.length;g++){var h=d[g],i=h.nextSibling;"absolute"!==h.style.position&&(i&&"#text"===i.nodeName&&b._$parent[0].removeChild(i),b._$parent[0].removeChild(h))}for(var g=0;g<c.length;g++){var j=c[g];if("default"!==b._newSort[0].sortBy||"desc"!==b._newSort[0].order||a)f.appendChild(j),f.appendChild(document.createTextNode(" "));else{var k=f.firstChild;f.insertBefore(j,k),f.insertBefore(document.createTextNode(" "),j)}}e?b._$parent[0].insertBefore(f,e):b._$parent[0].appendChild(f),b._execAction("_printSort",1,arguments)},_parseSort:function(a){for(var b=this,c="string"==typeof a?a.split(" "):[a],d=[],e=0;e<c.length;e++){var f="string"==typeof a?c[e].split(":"):["custom",c[e]],g={sortBy:b._helpers._camelCase(f[0]),order:f[1]||"asc"};if(d.push(g),"default"===g.sortBy||"random"===g.sortBy)break}return b._execFilter("_parseSort",d,arguments)},_parseEffects:function(){var a=this,b={opacity:"",transformIn:"",transformOut:"",filter:""},c=function(b,c,d){if(a.animation.effects.indexOf(b)>-1){if(c){var e=a.animation.effects.indexOf(b+"(");if(e>-1){var f=a.animation.effects.substring(e),g=/\(([^)]+)\)/.exec(f),h=g[1];return{val:h}}}return!0}return!1},d=function(a,b){return b?"-"===a.charAt(0)?a.substr(1,a.length):"-"+a:a},e=function(a,e){for(var f=[["scale",".01"],["translateX","20px"],["translateY","20px"],["translateZ","20px"],["rotateX","90deg"],["rotateY","90deg"],["rotateZ","180deg"]],g=0;g<f.length;g++){var h=f[g][0],i=f[g][1],j=e&&"scale"!==h;b[a]+=c(h)?h+"("+d(c(h,!0).val||i,j)+") ":""}};return b.opacity=c("fade")?c("fade",!0).val||"0":"1",e("transformIn"),a.animation.reverseOut?e("transformOut",!0):b.transformOut=b.transformIn,b.transition={},b.transition=a._getPrefixedCSS("transition","all "+a.animation.duration+"ms "+a.animation.easing+", opacity "+a.animation.duration+"ms linear"),a.animation.stagger=c("stagger")?!0:!1,a.animation.staggerDuration=parseInt(c("stagger")&&c("stagger",!0).val?c("stagger",!0).val:100),a._execFilter("_parseEffects",b)},_buildState:function(a){var b=this,c={};return b._execAction("_buildState",0),c={activeFilter:""===b._activeFilter?"none":b._activeFilter,activeSort:a&&b._newSortString?b._newSortString:b._activeSort,fail:!b._$show.length&&""!==b._activeFilter,$targets:b._$targets,$show:b._$show,$hide:b._$hide,totalTargets:b._$targets.length,totalShow:b._$show.length,totalHide:b._$hide.length,display:a&&b._newDisplay?b._newDisplay:b.layout.display},a?b._execFilter("_buildState",c):(b._state=c,void b._execAction("_buildState",1))},_goMix:function(a){var b=this,c=function(){b._chrome&&31===b._chrome&&f(b._$parent[0]),b._setInter(),d()},d=function(){var a=window.pageYOffset,c=window.pageXOffset;document.documentElement.scrollHeight;b._getInterMixData(),b._setFinal(),b._getFinalMixData(),window.pageYOffset!==a&&window.scrollTo(c,a),b._prepTargets(),window.requestAnimationFrame?requestAnimationFrame(e):setTimeout(function(){e()},20)},e=function(){b._animateTargets(),0===b._targetsBound&&b._cleanUp()},f=function(a){var b=a.parentElement,c=document.createElement("div"),d=document.createDocumentFragment();b.insertBefore(c,a),d.appendChild(a),b.replaceChild(a,c)},g=b._buildState(!0);b._execAction("_goMix",0,arguments),!b.animation.duration&&(a=!1),b._mixing=!0,b._$container.removeClass(b.layout.containerClassFail),"function"==typeof b.callbacks.onMixStart&&b.callbacks.onMixStart.call(b._domNode,b._state,g,b),b._$container.trigger("mixStart",[b._state,g,b]),b._getOrigMixData(),a&&!b._suckMode?window.requestAnimationFrame?requestAnimationFrame(c):c():b._cleanUp(),b._execAction("_goMix",1,arguments)},_getTargetData:function(a,b){var c,d=this;a.dataset[b+"PosX"]=a.offsetLeft,a.dataset[b+"PosY"]=a.offsetTop,d.animation.animateResizeTargets&&(c=d._suckMode?{marginBottom:"",marginRight:""}:window.getComputedStyle(a),a.dataset[b+"MarginBottom"]=parseInt(c.marginBottom),a.dataset[b+"MarginRight"]=parseInt(c.marginRight),a.dataset[b+"Width"]=a.offsetWidth,a.dataset[b+"Height"]=a.offsetHeight)},_getOrigMixData:function(){var a=this,b=a._suckMode?{boxSizing:""}:window.getComputedStyle(a._$parent[0]),c=b.boxSizing||b[a._vendor+"BoxSizing"];a._incPadding="border-box"===c,a._execAction("_getOrigMixData",0),!a._suckMode&&(a.effects=a._parseEffects()),a._$toHide=a._$hide.filter(":visible"),a._$toShow=a._$show.filter(":hidden"),a._$pre=a._$targets.filter(":visible"),a._startHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height();for(var d=0;d<a._$pre.length;d++){var e=a._$pre[d];a._getTargetData(e,"orig")}a._execAction("_getOrigMixData",1)},_setInter:function(){var a=this;a._execAction("_setInter",0),a._changingLayout&&a.animation.animateChangeLayout?(a._$toShow.css("display",a._newDisplay),a._changingClass&&a._$container.removeClass(a.layout.containerClass).addClass(a._newClass)):a._$toShow.css("display",a.layout.display),a._execAction("_setInter",1)},_getInterMixData:function(){var a=this;a._execAction("_getInterMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"inter")}for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"inter")}a._execAction("_getInterMixData",1)},_setFinal:function(){var a=this;a._execAction("_setFinal",0),a._sorting&&a._printSort(),a._$toHide.removeStyle("display"),a._changingLayout&&a.animation.animateChangeLayout&&a._$pre.css("display",a._newDisplay),a._execAction("_setFinal",1)},_getFinalMixData:function(){var a=this;a._execAction("_getFinalMixData",0);for(var b=0;b<a._$toShow.length;b++){var c=a._$toShow[b];a._getTargetData(c,"final")}for(var b=0;b<a._$pre.length;b++){var c=a._$pre[b];a._getTargetData(c,"final")}a._newHeight=a._incPadding?a._$parent.outerHeight():a._$parent.height(),a._sorting&&a._printSort(!0),a._$toShow.removeStyle("display"),a._$pre.css("display",a.layout.display),a._changingClass&&a.animation.animateChangeLayout&&a._$container.removeClass(a._newClass).addClass(a.layout.containerClass),a._execAction("_getFinalMixData",1)},_prepTargets:function(){var b=this,c={_in:b._getPrefixedCSS("transform",b.effects.transformIn),_out:b._getPrefixedCSS("transform",b.effects.transformOut)};b._execAction("_prepTargets",0),b.animation.animateResizeContainer&&b._$parent.css("height",b._startHeight+"px");for(var d=0;d<b._$toShow.length;d++){var e=b._$toShow[d],f=a(e);e.style.opacity=b.effects.opacity,e.style.display=b._changingLayout&&b.animation.animateChangeLayout?b._newDisplay:b.layout.display,f.css(c._in),b.animation.animateResizeTargets&&(e.style.width=e.dataset.finalWidth+"px",e.style.height=e.dataset.finalHeight+"px",e.style.marginRight=-(e.dataset.finalWidth-e.dataset.interWidth)+1*e.dataset.finalMarginRight+"px",e.style.marginBottom=-(e.dataset.finalHeight-e.dataset.interHeight)+1*e.dataset.finalMarginBottom+"px")}for(var d=0;d<b._$pre.length;d++){var e=b._$pre[d],f=a(e),g={x:e.dataset.origPosX-e.dataset.interPosX,y:e.dataset.origPosY-e.dataset.interPosY},c=b._getPrefixedCSS("transform","translate("+g.x+"px,"+g.y+"px)");f.css(c),b.animation.animateResizeTargets&&(e.style.width=e.dataset.origWidth+"px",e.style.height=e.dataset.origHeight+"px",e.dataset.origWidth-e.dataset.finalWidth&&(e.style.marginRight=-(e.dataset.origWidth-e.dataset.interWidth)+1*e.dataset.origMarginRight+"px"),e.dataset.origHeight-e.dataset.finalHeight&&(e.style.marginBottom=-(e.dataset.origHeight-e.dataset.interHeight)+1*e.dataset.origMarginBottom+"px"))}b._execAction("_prepTargets",1)},_animateTargets:function(){var b=this;b._execAction("_animateTargets",0),b._targetsDone=0,b._targetsBound=0,b._$parent.css(b._getPrefixedCSS("perspective",b.animation.perspectiveDistance+"px")).css(b._getPrefixedCSS("perspective-origin",b.animation.perspectiveOrigin)),b.animation.animateResizeContainer&&b._$parent.css(b._getPrefixedCSS("transition","height "+b.animation.duration+"ms ease")).css("height",b._newHeight+"px");for(var c=0;c<b._$toShow.length;c++){var d=b._$toShow[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY},g=b._getDelay(c),h={};d.style.opacity="";for(var i=0;2>i;i++){var j=0===i?j=b._prefix:"";b._ff&&b._ff<=20&&(h[j+"transition-property"]="all",h[j+"transition-timing-function"]=b.animation.easing+"ms",h[j+"transition-duration"]=b.animation.duration+"ms"),h[j+"transition-delay"]=g+"ms",h[j+"transform"]="translate("+f.x+"px,"+f.y+"px)"}(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e),b._ff&&b._ff<=20?e.css(h):e.css(b.effects.transition).css(h)}for(var c=0;c<b._$pre.length;c++){var d=b._$pre[c],e=a(d),f={x:d.dataset.finalPosX-d.dataset.interPosX,y:d.dataset.finalPosY-d.dataset.interPosY},g=b._getDelay(c);(d.dataset.finalPosX!==d.dataset.origPosX||d.dataset.finalPosY!==d.dataset.origPosY)&&b._bindTargetDone(e),e.css(b._getPrefixedCSS("transition","all "+b.animation.duration+"ms "+b.animation.easing+" "+g+"ms")),e.css(b._getPrefixedCSS("transform","translate("+f.x+"px,"+f.y+"px)")),b.animation.animateResizeTargets&&(d.dataset.origWidth-d.dataset.finalWidth&&1*d.dataset.finalWidth&&(d.style.width=d.dataset.finalWidth+"px",d.style.marginRight=-(d.dataset.finalWidth-d.dataset.interWidth)+1*d.dataset.finalMarginRight+"px"),d.dataset.origHeight-d.dataset.finalHeight&&1*d.dataset.finalHeight&&(d.style.height=d.dataset.finalHeight+"px",d.style.marginBottom=-(d.dataset.finalHeight-d.dataset.interHeight)+1*d.dataset.finalMarginBottom+"px"))}b._changingClass&&b._$container.removeClass(b.layout.containerClass).addClass(b._newClass);for(var c=0;c<b._$toHide.length;c++){for(var d=b._$toHide[c],e=a(d),g=b._getDelay(c),k={},i=0;2>i;i++){var j=0===i?j=b._prefix:"";k[j+"transition-delay"]=g+"ms",k[j+"transform"]=b.effects.transformOut,k.opacity=b.effects.opacity}e.css(b.effects.transition).css(k),(b.effects.transform||b.effects.opacity)&&b._bindTargetDone(e)}b._execAction("_animateTargets",1)},_bindTargetDone:function(b){var c=this,d=b[0];c._execAction("_bindTargetDone",0,arguments),d.dataset.bound||(d.dataset.bound=!0,c._targetsBound++,b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp",function(e){(e.originalEvent.propertyName.indexOf("transform")>-1||e.originalEvent.propertyName.indexOf("opacity")>-1)&&a(e.originalEvent.target).is(c.selectors.target)&&(b.off(".mixItUp"),d.dataset.bound="",c._targetDone())})),c._execAction("_bindTargetDone",1,arguments)},_targetDone:function(){var a=this;a._execAction("_targetDone",0),a._targetsDone++,a._targetsDone===a._targetsBound&&a._cleanUp(),a._execAction("_targetDone",1)},_cleanUp:function(){var b=this,c=b.animation.animateResizeTargets?"transform opacity width height margin-bottom margin-right":"transform opacity",d=function(){b._$targets.removeStyle("transition",b._prefix)};b._execAction("_cleanUp",0),b._changingLayout?b._$show.css("display",b._newDisplay):b._$show.css("display",b.layout.display),b._$targets.css(b._brake),b._$targets.removeStyle(c,b._prefix).removeAttr("data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"),b._$hide.removeStyle("display"),b._$parent.removeStyle("height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",b._prefix),b._sorting&&(b._printSort(),b._activeSort=b._newSortString,b._sorting=!1),b._changingLayout&&(b._changingDisplay&&(b.layout.display=b._newDisplay,b._changingDisplay=!1),b._changingClass&&(b._$parent.removeClass(b.layout.containerClass).addClass(b._newClass),b.layout.containerClass=b._newClass,b._changingClass=!1),b._changingLayout=!1),b._refresh(),b._buildState(),b._state.fail&&b._$container.addClass(b.layout.containerClassFail),b._$show=a(),b._$hide=a(),window.requestAnimationFrame&&requestAnimationFrame(d),b._mixing=!1,"function"==typeof b.callbacks._user&&b.callbacks._user.call(b._domNode,b._state,b),"function"==typeof b.callbacks.onMixEnd&&b.callbacks.onMixEnd.call(b._domNode,b._state,b),b._$container.trigger("mixEnd",[b._state,b]),b._state.fail&&("function"==typeof b.callbacks.onMixFail&&b.callbacks.onMixFail.call(b._domNode,b._state,b),b._$container.trigger("mixFail",[b._state,b])),b._loading&&("function"==typeof b.callbacks.onMixLoad&&b.callbacks.onMixLoad.call(b._domNode,b._state,b),b._$container.trigger("mixLoad",[b._state,b])),b._queue.length&&(b._execAction("_queue",0),b.multiMix(b._queue[0][0],b._queue[0][1],b._queue[0][2]),b._queue.splice(0,1)),b._execAction("_cleanUp",1),b._loading=!1},_getPrefixedCSS:function(a,b,c){var d=this,e={},f="",g=-1;for(g=0;2>g;g++)f=0===g?d._prefix:"",c?e[f+a]=f+b:e[f+a]=b;return d._execFilter("_getPrefixedCSS",e,arguments)},_getDelay:function(a){var b=this,c="function"==typeof b.animation.staggerSequence?b.animation.staggerSequence.call(b._domNode,a,b._state):a,d=b.animation.stagger?c*b.animation.staggerDuration:0;return b._execFilter("_getDelay",d,arguments)},_parseMultiMixArgs:function(a){for(var b=this,c={command:null,animate:b.animation.enable,callback:null},d=0;d<a.length;d++){var e=a[d];null!==e&&("object"==typeof e||"string"==typeof e?c.command=e:"boolean"==typeof e?c.animate=e:"function"==typeof e&&(c.callback=e))}return b._execFilter("_parseMultiMixArgs",c,arguments)},_parseInsertArgs:function(b){for(var c=this,d={index:0,$object:a(),multiMix:{filter:c._state.activeFilter},callback:null},e=0;e<b.length;e++){var f=b[e];"number"==typeof f?d.index=f:"object"==typeof f&&f instanceof a?d.$object=f:"object"==typeof f&&c._helpers._isElement(f)?d.$object=a(f):"object"==typeof f&&null!==f?d.multiMix=f:"boolean"!=typeof f||f?"function"==typeof f&&(d.callback=f):d.multiMix=!1}return c._execFilter("_parseInsertArgs",d,arguments)},_execAction:function(a,b,c){var d=this,e=b?"post":"pre";if(!d._actions.isEmptyObject&&d._actions.hasOwnProperty(a))for(var f in d._actions[a][e])d._actions[a][e][f].call(d,c)},_execFilter:function(a,b,c){var d=this;if(d._filters.isEmptyObject||!d._filters.hasOwnProperty(a))return b;for(var e in d._filters[a])return d._filters[a][e].call(d,c)},_helpers:{_camelCase:function(a){return a.replace(/-([a-z])/g,function(a){return a[1].toUpperCase()})},_isElement:function(a){return window.HTMLElement?a instanceof HTMLElement:null!==a&&1===a.nodeType&&"string"===a.nodeName}},isMixing:function(){var a=this;return a._execFilter("isMixing",a._mixing)},filter:function(){var a=this,b=a._parseMultiMixArgs(arguments);a._clicking&&(a._toggleString=""),a.multiMix({filter:b.command},b.animate,b.callback)},sort:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({sort:b.command},b.animate,b.callback)},changeLayout:function(){var a=this,b=a._parseMultiMixArgs(arguments);a.multiMix({changeLayout:b.command},b.animate,b.callback)},multiMix:function(){var a=this,c=a._parseMultiMixArgs(arguments);if(a._execAction("multiMix",0,arguments),a._mixing)a.animation.queue&&a._queue.length<a.animation.queueLimit?(a._queue.push(arguments),a.controls.enable&&!a._clicking&&a._updateControls(c.command),a._execAction("multiMixQueue",1,arguments)):("function"==typeof a.callbacks.onMixBusy&&a.callbacks.onMixBusy.call(a._domNode,a._state,a),a._$container.trigger("mixBusy",[a._state,a]),a._execAction("multiMixBusy",1,arguments));else{a.controls.enable&&!a._clicking&&(a.controls.toggleFilterButtons&&a._buildToggleArray(),a._updateControls(c.command,a.controls.toggleFilterButtons)),a._queue.length<2&&(a._clicking=!1),delete a.callbacks._user,c.callback&&(a.callbacks._user=c.callback);var d=c.command.sort,e=c.command.filter,f=c.command.changeLayout;a._refresh(),d&&(a._newSort=a._parseSort(d),a._newSortString=d,a._sorting=!0,a._sort()),e!==b&&(e="all"===e?a.selectors.target:e,a._activeFilter=e),a._filter(),f&&(a._newDisplay="string"==typeof f?f:f.display||a.layout.display,a._newClass=f.containerClass||"",(a._newDisplay!==a.layout.display||a._newClass!==a.layout.containerClass)&&(a._changingLayout=!0,a._changingClass=a._newClass!==a.layout.containerClass,a._changingDisplay=a._newDisplay!==a.layout.display)),a._$targets.css(a._brake),a._goMix(c.animate^a.animation.enable?c.animate:a.animation.enable),a._execAction("multiMix",1,arguments)}},insert:function(){var a=this,b=a._parseInsertArgs(arguments),c="function"==typeof b.callback?b.callback:null,d=document.createDocumentFragment(),e=function(){return a._refresh(),a._$targets.length?b.index<a._$targets.length||!a._$targets.length?a._$targets[b.index]:a._$targets[a._$targets.length-1].nextElementSibling:a._$parent[0].children[0]}();if(a._execAction("insert",0,arguments),b.$object){for(var f=0;f<b.$object.length;f++){var g=b.$object[f];d.appendChild(g),d.appendChild(document.createTextNode(" "))}a._$parent[0].insertBefore(d,e)}a._execAction("insert",1,arguments),"object"==typeof b.multiMix&&a.multiMix(b.multiMix,c)},prepend:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(0,b.$object,b.multiMix,b.callback)},append:function(){var a=this,b=a._parseInsertArgs(arguments);a.insert(a._state.totalTargets,b.$object,b.multiMix,b.callback)},getOption:function(a){var c=this,d=function(a,c){for(var d=c.split("."),e=d.pop(),f=d.length,g=1,h=d[0]||c;(a=a[h])&&f>g;)h=d[g],g++;return a!==b?a[e]!==b?a[e]:a:void 0};return a?c._execFilter("getOption",d(c,a),arguments):c},setOptions:function(b){var c=this;c._execAction("setOptions",0,arguments),"object"==typeof b&&a.extend(!0,c,b),c._execAction("setOptions",1,arguments)},getState:function(){var a=this;return a._execFilter("getState",a._state,a)},forceRefresh:function(){var a=this;a._refresh(!1,!0)},destroy:function(b){var c=this,d=a.MixItUp.prototype._bound._filter,e=a.MixItUp.prototype._bound._sort;c._execAction("destroy",0,arguments),c._$body.add(a(c.selectors.sort)).add(a(c.selectors.filter)).off(".mixItUp");for(var f=0;f<c._$targets.length;f++){var g=c._$targets[f];b&&(g.style.display=""),delete g.mixParent}c._execAction("destroy",1,arguments),d[c.selectors.filter]&&d[c.selectors.filter]>1?d[c.selectors.filter]--:1===d[c.selectors.filter]&&delete d[c.selectors.filter],e[c.selectors.sort]&&e[c.selectors.sort]>1?e[c.selectors.sort]--:1===e[c.selectors.sort]&&delete e[c.selectors.sort],delete a.MixItUp.prototype._instances[c._id]}},a.fn.mixItUp=function(){var c,d=arguments,e=[],f=function(b,c){var d=new a.MixItUp,e=function(){return("00000"+(16777216*Math.random()<<0).toString(16)).substr(-6).toUpperCase()};d._execAction("_instantiate",0,arguments),b.id=b.id?b.id:"MixItUp"+e(),d._instances[b.id]||(d._instances[b.id]=d,d._init(b,c)),d._execAction("_instantiate",1,arguments)};return c=this.each(function(){if(d&&"string"==typeof d[0]){var c=a.MixItUp.prototype._instances[this.id];if("isLoaded"===d[0])e.push(c?!0:!1);else{var g=c[d[0]](d[1],d[2],d[3]);g!==b&&e.push(g)}}else f(this,d[0])}),e.length?e.length>1?e:e[0]:c},a.fn.removeStyle=function(c,d){return d=d?d:"",this.each(function(){for(var e=this,f=c.split(" "),g=0;g<f.length;g++)for(var h=0;4>h;h++){switch(h){case 0:var i=f[g];break;case 1:var i=a.MixItUp.prototype._helpers._camelCase(i);break;case 2:var i=d+f[g];break;case 3:var i=a.MixItUp.prototype._helpers._camelCase(d+f[g])}if(e.style[i]!==b&&"unknown"!=typeof e.style[i]&&e.style[i].length>0&&(e.style[i]=""),!d&&1===h)break}e.attributes&&e.attributes.style&&e.attributes.style!==b&&""===e.attributes.style.value&&e.attributes.removeNamedItem("style")})}}(jQuery);
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=m()),v=e("#"+t.containerId),v.length?v:(n&&(v=d(t)),v)}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})}function s(e){C=e}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o)}function c(t){var o=m();return v||n(o),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t)}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0)}function d(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function f(e){C&&C(e)}function g(t){function o(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(){c(),u(),d(),p(),g(),C(),l(),i()}function i(){var e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}I.attr("aria-live",e)}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0)}),E.onclick&&I.click(function(e){E.onclick(e),b()})}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)))}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y)}function l(){E.newestOnTop?v.prepend(I):v.append(I)}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M)}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B)}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr("role","button"),I.prepend(j))}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q))}function C(){E.rtl&&I.addClass("rtl")}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message}return!1}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(":focus",I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&"hidden"!==P.state&&E.onHidden(),P.state="hidden",P.endTime=new Date,f(P)}})}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime)}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing})}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+"%")}var E=m(),y=t.iconClass||E.iconClass;if("undefined"!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e("<div/>"),M=e("<div/>"),B=e("<div/>"),q=e("<div/>"),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:"visible",startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I}}function m(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0))}var v,C,w,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:"2.1.3",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
//# sourceMappingURL=toastr.js.map

/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
var simplemaps_countrymap_mapdata={
  main_settings: {
    //General settings
    width: "800", //or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#d5ddec",
    label_hover_color: "#d5ddec",
    label_size: 22,
    label_font: "Arial",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    location_image_url: ""
  },
  state_specific: {
    IDN1136: {
      name: "Aceh",
      description: "default",
      color: "default",
      hover_color: "default",
      url: "default",
      hide: "default",
      inactive: "default",
      zoomable: "default"
    },
    IDN1185: {
      name: "Kalimantan Timur"
    },
    IDN1223: {
      name: "Jawa Barat"
    },
    IDN1224: {
      name: "Jawa Tengah"
    },
    IDN1225: {
      name: "Bengkulu"
    },
    IDN1226: {
      name: "Banten"
    },
    IDN1227: {
      name: "Jakarta Raya"
    },
    IDN1228: {
      name: "Kalimantan Barat"
    },
    IDN1229: {
      name: "Lampung"
    },
    IDN1230: {
      name: "Sumatera Selatan"
    },
    IDN1231: {
      name: "Bangka-Belitung"
    },
    IDN1232: {
      name: "Bali"
    },
    IDN1233: {
      name: "Jawa Timur"
    },
    IDN1234: {
      name: "Kalimantan Selatan"
    },
    IDN1235: {
      name: "Nusa Tenggara Timur"
    },
    IDN1236: {
      name: "Sulawesi Selatan"
    },
    IDN1237: {
      name: "Sulawesi Barat"
    },
    IDN1796: {
      name: "Kepulauan Riau"
    },
    IDN1837: {
      name: "Gorontalo"
    },
    IDN1930: {
      name: "Jambi"
    },
    IDN1931: {
      name: "Kalimantan Tengah"
    },
    IDN1933: {
      name: "Irian Jaya Barat"
    },
    IDN381: {
      name: "Sumatera Utara"
    },
    IDN492: {
      name: "Riau"
    },
    IDN513: {
      name: "Sulawesi Utara"
    },
    IDN538: {
      name: "Maluku Utara"
    },
    IDN539: {
      name: "Sumatera Barat"
    },
    IDN540: {
      name: "Yogyakarta"
    },
    IDN554: {
      name: "Maluku"
    },
    IDN555: {
      name: "Nusa Tenggara Barat"
    },
    IDN556: {
      name: "Sulawesi Tenggara"
    },
    IDN557: {
      name: "Sulawesi Tengah"
    },
    IDN558: {
      name: "Papua"
    }
  },
  locations: {
    "0": {
      lat: "-6.174444",
      lng: "106.829444",
      name: "Jakarta",
      color: "default",
      description: "default",
      url: "default",
      size: "default",
      type: "default",
      image_url: "default",
      opacity: "default"
    }
  },
  regions: {}
};
//Copyright 2010-2017 Simplemaps.com//html5countrymapv3.5//Use pursuant to license agreement at http://www.simplemaps.com/license/* shifty (tweaked to avoid AMD conflict) - v1.5.2, Copyright (c) 2013 Jeremy Kahn, MIT license   http://jeremyckahn.github.io/shifty */eval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("(function () {var root = this || F` 9#(\"return` 4!\")();var Tweenable = ` Y.formula` E!DEFAULT_SCHEDULE_FUNCTION` 1)EASING = \"linear\"` 1)DURATION = 500` 6!UPDATE_TIME = 16.66666666` \"\"8` @!_now = Date.now ? ` \"%: `!i)`\"=#+ new` @!;}` ]!` [\"typeof SHIFTY_DEBUG_NOW !== \"undefined\" ?` 1.:`!@!;if (` _#window` L,) {`\"q5 =` N#.requestAnimationFrame ||` 8$webkitR` ';oR` \";ms` C<mozCancel` 32&&` >'` S5setTimeout;} else`\"F:` C(`$T%noop() {` (&each(obj, fn`&i#key;for (key in obj) {if (Object.hasOwnProperty.call` ]\"key)) {fn(key);}}` ~&shallowCopy(targetObj, srcO` z!`!C!` (\",`&B'prop) {` I%[prop] =` R#` )\";});`)/$` A$`\"J'defaults`!1#`!0!`!''` |/`&U'` N\"`!/$`&U-` 1* src`!K$})`!8'twee`#,!s(forPosition, currentState, original` (#` v\"` &#dur`%J!, timestamp, easing`$P#normalized` x$ = `!#' <` Q& ? 0 : `!A( -` 5&) /`!(%`*4!prop` $!`!,\"`%B\"P` '*Fn`%p\"prop in`\"/)`#M#` '(`%w+`#u\"`$2!` t* =` y#`#R#`!%$`+_&` @.== \"`#t$\" ?` 0.:`.M$[` +,];`!Y(`$p%`$X%(`$8)` :\"`$>)` +$`!`$,`$&/);}}`'*#`!\"(`%]0(start, end` k%unc, p` d$`.f%` E! + (end -` )\") *` K'(` L%`! 'applyFilter(`!2!able, f` -!Name`1_$` ,!s =`2%&.prototype.` 8\"`%J!args`#+$` A!_` 7\"Args;`)1!` d#`).(n`!#\"`)/'` >#[name][`!E&]`/z/` 35.`\"9!`\",(args)`)Y\"var`'o!outHandler_endTime`\"#!` ,+`$C#` '4isEnded` '0offset;`$s&` 2)`!Q(`*1'delay`*L(`*bF`%+\", step, schedule, opt`!z(Override) {`\"P2 =`+''+`!L\" +`*p&`\"g6 = Math.min(` 3 || now()`\"P\"`!,.)` p,`#[#`!O#`!\"3>` --`$k$`$ 1 =`\"&% - (`\"Q3`-U\"` |2);`'/!`'d%isPlaying()`'H$`!r1) {step`1N#`$_$`(J&attachment`\"p-`!u\");` D&stop(true);} else {` `'`%:$Id =`%F%`!h'_` r*, UPDATE_TIME);`*i3\"before`*g!\"`\"^#`#}6`10(`&##)`!]#`2q\"1`'5H1, 1`2U%`\"D*` h\"`!06`35[`!u$`!3'`\"h4after`\"w$`%&!`!,*`$^J}}`/(&composeE`1p'(from`!(!Params`!W%`/6\"` K#d` M\" = {}`,C\"`.F!` -%`3D)`$m\"` 4)== \"string\" ||` O+`3h)`4d!ch`!E.`/h&prop) {`!M*`3h%`!=#}`$u&` ICif (!` a0` l<` (#|| DEFAULT_EASING`0F\"`4G$` U)`3;'`2k%`-+!initi`&,%`-=!onfig) {this.`&j$` <! =` =!` H( || {};` E#` V!ur`-6!false` 2#`*#$F`!=$=`!r%SCHEDULE_FUNCTION`$c'`!E'`38/` v!setC` <!`/8\"`!v\";}}`\"=%.prototype.`'C! =`#'`\"C)`!3!`!j!is` Z!`&p\"`#I#this;}if` I(`!P!`!K% || !`\"Y,`!I;` I\"`)k&=`1$\"`#/$tart`!N\"get`1<!` 3!`)<&);`!T'.resume();};`\"L0`!;%`\"W)`\"W%`\"-#= ` \"#`$a5tru`$q$`!@&` O%.` *&` >#pausedA`3h$null`%I+`/k!` -'`4[\"` i%` )\"|| 0`\"m(` 6&` )\"`4B!op` :%ep` 6(ep` 2+finish` 9&` )#` 7*`3j%`!B&` *$`)4'DURA`'6!`(>1shallowCopy({},`!'%rom`,7!`$v%`%/$`/]) =` 7'` :#`/q'` f6to` n,var self` l#` e$`/:)`%N)) {` 0*(self,` `!`'+'` )$`1)#` &#`1J%` *\"`0e*` .\"`2$+` p#`2-(` -\"`-1\"` &$ste`!*%`+I,);`0I\"`#t+`$&.`0o\"`#;)`#K-;defaults(`!G)` [(`$*$`!\\\"`%a!`2@.`\"M*`$8#` K#`/4-` j$f`4C!Args = [`4\"+`%U.,`\"!(` :$` ~\"];applyF` l!`+I!, \"`-G!Created\"`+9)`+&3get`%L,` N#`&P,`#[.`+v7` g)s` H!`1#3` 8!` R3`+]!`'*-`+h1`.4'isP` 8!`,k$`\"C>`.;\"` y,`0M(` l\"`!5%`/P&+`!5# -`\"z#`!M(`0!$`!G'`33(`1F&`.P*`)N+`$C@seek`!s)millisecond) {` #' = Math.max` 9(, 0`+D\"`$8#`#K)`\"`&`\"N' ` h)== 0`3F,`2T.` q(-` U(` ~!`3`\"isPlaying()`#g%`\"r4`#G.`#-*`(0\"`!9+` )$`,q#`0$*`'T0`)B4`+I,`)R*` &$`,r\"`2k*`,p$`+m%Tim`+m$`%|!();}`$s?top`%))gotoE`%-!`#%/`&M*`&]1`0D-`3/!(root.cancelAnim`#$!Frame || ` 8!webkitC` '8oC` \"8ms` @9moz` :\"Request` 03clearT`!\")`',#`#l$Id`'C\"`\"z&`-m/before`#0!\");`.)!Props(1`${Z1, 0`%Q*)`/+0after`!6$` #9End\"`0j&nish.call`'e)`!W0attachment`%}A`)D%`0.3`&6-&& `*!\"`&:%`0+6S`'+`0G*` .+`'K%` ), = ` #,` |3dispo`0_.var prop;for (prop i`\"4\"`/y(hasOw`%H!erty` B!)) {delete` I![prop];}}`!(2f`$e! = {` )3ormula = {linear:`!\\&pos`#j&pos;}};` F&` S7;`4Z(` ?%, {now:now, each:each, `'e&:`'p&` ,'` ,&, `&r':`&~', `!&':`!2', defaults:d` \"#, composeE`(,!Object:c` \".}`1;#ypeof SHIFTY_DEBUG_NOW`17!\"`#$$\") {`*f!`,Z-` #*;}` A!`\"j%`#;(`3h$` '&})();(`%i)`#k&`#N1`#y., {easeInQuad`$d4`46!pow(pos, 2);}, easeOut` ;8- (` N( - 1, 2) - 1` Z%In` M4if (` R!/= 0.5) < 1` r&0.5 *`!F/`!3$` :\"` [\"-= 2) * `!>\"`!u&InCubic`\"0B3`\"J(` /E`\"N\"3) + 1`\"F)` L2`\"\"N3`\"J&`\"L#`!0+2`!8#`\"K(Quart`\"1B4`$~+` >6`$y14`$x2` S/`\")N4`$p;`\"y,`%-+Quin`\">C5`\"W*` 1C`\"\\\"5`%*.` L2`\"/N5`$y?`!:!`\"K(Sine`$I6` \\!cos` \\!` i$PI / 2)`!|)Out` N8` S!sin` S1`\"`)`!39`\"+(cos` ^%`*'!`&+,Expo`1C7`.m!0 ? 0 :`#?&2, 10 *` J!` k!`$(` N@1 ? 1 :`#4$` m#-` p!` L!`%.,` `1if`!<\"`!_!`%+';}` .(`%E'1` 4\"`%HE`\"40`%n*`!m0--`!|#`-h)ir`-#5`*]$sqrt(1 -`#\"!`$;/Out` K8` V*`0Q0`%w*` W1`\"b:`&/)`!U6`(m/` D%`0m,`%'!`\"7(Bounc`'L.`$k$< 0.3636363636` \"\"5`!X&7.5625`1q#` |!;} else ` U(727272727` \"\"3` M/`!`$0.5454545454` \"\"`2n$+ 0.75` k0909090909` \"\"`#6'` l/818181818` \"\"`3l%+ 0.93` w&` H79`!S*6` V)84` `!`%1%Back`#M-var s = 1.70158;`)e'`#C$((s`$F!` *#- s`$I)` KG`)U\"` _#` h%` q-+ `*V/` cA`*!@`.>#`!2$(s *= 1.52`16\"`\";(`'A-`'4,` E9`\" #`*f#lasti`*P61`+s(4, -8`(>$` 1#sin`!9\"* 6`#6$(2` 6$PI)`0I!`#/$swingFromT`-l.`$!8`#-' ?`\"^O :`\"I^`!s%`&Bg` o!`\"=K-`0^!`&a?b`+W~`+W~`+W~`,&O`#T\"Past`\"\\~`#H22 - (`#2M)`#6J` m4`#I<` ~%` I<`#M>)`0@%`*3`-w@`,X%pos, 4`-u&-`*a0` @*3) -`-d$`!?#`-U4` u.` N\"`!c/` =10.2`\"K!);})();(` K&) {` $%cubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration`+H#ax = 0, bx` \"\"c` )#ay` 1#y` 1#` #!;`!'%sampleCurveX(t`!r&((ax * t + bx)` ##c` $\";}` K0Y` P+y` W$y` V%` $\"` I2Derivati`!8,3 * `!B%2 *`!B)` _(olveEpsilon(`\"r'` a#1 / (200 *`#0&` N,(x, e` \\\"` O&`\"5)` B!`#&#` B'` ^(fabs(n`'4#n >= 0` c&n`(K,0 - n;}`!:+` p.`$\"t0, t1, t2, x2, d2, i;for (t2 = x, i`$z! i < 8; i++) {x2 =`$z+2) - x;if (`!l!x2) <`\"K.t2;}d` O+`$<)2)` Z&d` _!0.000001) {break;}`!V!t2 - x2 / d2;}t0`!b!t1 = 1;`!v\"` d!t2 < t`#''t0;}` 2#> t`*Q't1;}while (t0 <` 6\"`\"51`\":( - x`\"15if (x > x2) {`!^!t2`$H%`!g!t2`\"(#(t1 -`!d!*`,!!+`!d!` a'`);!3 * p1x;`)P!3`-W!2x - p1x) - cx;`)r!1` '! - bx;`)[!` R\"y;`)p!` Q#y` S!y` S!y;`*2!` S!y - by;`'&$`'C!t,`'x3`&}(getC`+c&Transition(x1, y1`&<\"y2`\"y&`,o3`,@.`-*!` X*, 1);};}Tweenable.set` O\"F` o$=` w'name` T,`'~#`!%'`!k& =`!gE;` L1.displayName = name` 23x1 = x1` '3y1 = y` &4`&{!x2` D42 = y2`$d$`#\"&prototype.formula[name] =`\"W2;};` R&un`#H>) {delete` r>;}`1b9getInterpolatedValues(from, current, targetState, po`!o\"`3H!ing, delay`&6&`!I&tweenProps(` L&` m%` \"` o)1` f#` t$);}var mock` m% = new` |&;` 1)._filterArgs = []`#O'i`\"?&`#E)`!6/`\"3.opt_`\"A$`'P\"`\"\"! =`\"E'shallowCopy({}`\"<\");var`\"0\" =` \\& || 0` 6!` {\"Objec` `*composeE` 5'`!d#` M\" || \"linear\")`\"W+set({}`!6\"`\"d)`\"t5;` =&.length`/m!` ,&[0`':\"`\"R!` ,(1] =`\"F!` )(2] =`#G(` 0(3] =`\"J)`$9'applyF` G!(`!_), \"`&*!Created\")` .Cbefore` -!\"`\"j\"`%<'`'i#`,'\"`'I[`\"%\"`(&$`!7Cafter`!U$`(Y#`!N.`)q/` \\%`&h#formatManifest`\"C!R_NUMBER_COMPONENT = /(\\d|\\-|\\.)/` ?#FORMAT_CHUNKS` >![^\\-0-9\\.]+)/g` @#UN` C\"TED_VALUE` G![0-9.\\-]+` ?%RGB`)\\#RegExp(\"rgb\\\\(\" +` Q1.source + /,\\s*/` &&`! 0.source + /,` \"H\"\\\\)\", \"g`%>#`!c!_PREFIX = /^.*\\(`\"j$HE` /!#([0-9]|[a-f]){3,6}/gi` ?!` z!_PLACEHOLDER = \"VAL\";`..(F`$0!ChunksFrom(raw`$l\", prefix`$W#accumulator`,O\"var ` D%L`)G$` )%`)[#`'I\";for (i`)j! i <` I,; i++) {` z'.push(\"_\" +`!B# + ` )\"i);}`&b#` F';}`\"&.String`\"3!`&X\"ted` .\"`-[$`\"T! =`&v#` 6%.match(`&K+);if (!` O\") {` U%[\"\", \"\"];} else if (` 7\"`,@%== 1 ||` x-charAt(0)`!*%`(#,)`!!%.unshift(\"\"`\"Y&` 4#join(`%#-)`\"k'sanitize`*`\"ForHex`2T\"stat` 0#) {`*m&each` 1(,`1G'prop`0z*Prop = ` E'[prop]`#0!typeof` =*== \"s`\"a!\" &&` 0(`\"c%HEX)) {` c- =`\"&%Hex`'9\"ToRGB(` [');}}`\"M0` C+str) {`#G#`/~\"`$6\"` ?\"`!@\", str, convertHex` W!` r(` ,+(hex`&>)rgbArr = h` ;#Array` <'`.5$\"rgb`,&!` L\"[0] + \",` ''1]` \",2` -!)\";}var` t*_` q\"` '!`)t\"`!j%`!9-) {hex`!^\".replace(/#/, \"\"`'w\"hex`'G(3` E)spli`&w\"` +%`!x\"hex`\"!\"hex`!x\"hex`\"!\"hex`!x\"` #\";}`!d5[0]`#6$Dec`!E!substr(0, 2)`!0!` C31` B42` :<2` B44` T\"`$M#` H5`%V'` Z(`&G&parseInt(hex, 16`&'(`&Z/pattern, un` 8\"`+A$,` G#`&G#` C!nMatches =` >-`({#` h#`1+\"` 4*` A0`%K$`!=%`+^/if ` :\"`!6$`!>0`0G%` ))`0H(`*!#`\"R!`0Y\"`0e!`0Y&` ]/`0_$` P(` s-`-|\");`\"=-`\"53`\"2-`#b$`+c$`!\"!));}`.j$` [*`+n/RGB`$h#`1D.`+l8RGB,`0Q,,` e-`,0` 4$(rgb` ?\"`$/\"numbers = ` 1$`.R%UN`2V\"TED_`\"_!S`%`\"` L#`$Y%` )#`$P(`!.$`#R&` m-RGB_PREFIX)[0]`$l1` |)`$s$` k,+=`(X&` J#[i], 10)`-^\";}`!<.` #+.slice(0, -1` Q!)\"`*0$` ;+`#O'getF`$%!Manifest`37,var m` 5#Accumulator = {};`2b~`3R.`1@$awValu`*q!get` &\"From`3-*`!h/`3r%{`&^\"`\"n\":`\"a%` *\"` Z-, chunkNames` C&`'O\"` H!`!I%, `\"M!}`4S!`#{#`!5/`#{'expand` l\"tedPropertie`$ )`(L$`$A%) {`#r+` 2+`#NS`#4G` >)`(c%` )%`(f$`($0` H+`(1%`!D'`\" +`!Y\".`#}&[i]] = +` b&[i];}delete`\"&/}`+H(collapse`\"t~`#LF` d\"`&.\" = extrac` N!erty`-z#`!A8`\"r-`$=\"v`#c\"ist`$c(List`!v#` u\"` K@`!y*`'%ted` o\"`\"^,` \\#`((,`!E');`\"Y-`,o'`0x&`&I)`$[)`\"b?`!u'`$&\"` M#`!l$`,g\"`4?,Name` P(`'V%` )&`'D8` I,`'Y$` s,` d)[i];`!N+[` A,`\"|!`#*'` /-;`'n/` 3.}`,3#`! +;}var`%V*_a`/k)[];`0S(`&!'`#[6` W5`#;#`#2!`#|!`\"l`! 6pus`1f)[`+K*)`\"y%` J5`340`'y,`'k$`,:%`&\\#` 8\"` F$` @\" =` 0#`4@#`-Ln` y9` )*.replace(VALUE_PLACEHOLDER,`.C+.toFixed(4)`#+&` _0`#\"*`0i'` D%` B\") {` V,`!M#match(R_UNFORMATTED_`![!S`*e*pandEasing`$v\"(e` \"', tokenData`/;.` 2%`/\"A` E%`/:'`%}& =` C(`-|'` >&`'K7`,D!`!r! =` \"#`0@-i;if (typeof` D%== \"s`#+!\"`-($` 5!`0n&` *!.split(\" \"`0?\"last`#.\"` D!` ?%` Q\"[` X(`)n$- 1]`&Y\"`):,`&I*`!q)`4O-` z)i] ||`!<,;}} else`'<!` I`;}}`-^#`#F/`0r)collapse`%,~`%,~fir`#O$`&#,`\"}'0]`!4\"`&0\"` I\"s =` )#` Y(`&R'` >%`&K.compose`)I#`+k%\"\"`/.6`3#+` M0+= \" \" +`!n5i]`2`%` '8}`%/. =`!_1.substr(1);`&f$` G1`\"u(}});}`%J&prototype.filter.`%-! = {tweenCreated:`%a&`%*#State, from` $#to` \"#`!7() {sanitiz`2,#ForHexProps` ^));` .6` |%` )8`!8#);this._`'0% =`2`&Manifest`!+,}, before`\"s!`!qX`/F>`!P*);` L\"`4A%Propertie`!V*` ,I`!\\(` ,F`\"*%` C-}, after`\"=]`,R$`!{O` ?8`\"48` <8`\"86`-@`\"u-};})(`(q%);}).call(null);"))//Raphaël 2.1.2 (tweaked, always global)- JavaScript Vector Library, Copyright © 2008-2016 Dmitry Baranovskiy (http://raphaeljs.com), Copyright © 2008-2016 Sencha Labs (http://sencha.com), Licensed under the MIT (http://raphaeljs.com/license.html) license.     eval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("(function webpackUniversalModuleDefinition(root, factory) {root.Raphael =` 1$();})(this, ` s%() {return `!'&(m` }!s) {var installed`!3\"s = {};` E%__`!Z#_require__` Z#Id) {if (` R,[` 8$]`!5&` *6.exports;}var ` 1\" =` 67 = {` M#:{}, id:` 4$, loaded:false};`\"C#`!\"'call`!y#`!1$,`!.#,`!6#` .&`\"I/)` m#.`!#\" = true;`\"?#` S*;}` N/.m =` A#s;` ,0c`\"J/` 41p = \"\"`!3$`$400`%O![`%*,, `\"%9`%Q\"__WEBPACK_AMD_DEFINE_ARRAY__,` (2RESULT__;!(` B8 = [`!Z01)`!;1(3)` \"24)]`!*; =`'k(R`&d&R;}).apply(`\"`'`!Y6`!=!` m8!== undefined &&`#c$`%C$ =` C:));}`)l(`#G~`#nW2`#JKeve) {` '%R(first`+6#R.is` +\", \"` <$\")`$B&`)\"#? ` @!() : eve.on(\"r`-?\".DOMload\",` >\");} else ` p,array` p'R._engine.create[`%N!](R` b#.splice(0, 3 + ` a&[0], nu))).add`\")#`!.$`$1!args = Array.prototype.slice`+\"arguments, 0);`!b%args[args.length - 1]`\"k,var f =`!!!.pop()`*_$`#$&`! \"`\"(7args)`#0;`0](` JD;}`\"a&`#G>`\"^%);}}}R.version = \"2.2.0\";R.eve = eve;var`\"<#, separator = /[, ]+/, ele` i! = {circle:1, rect:1, path:1, ellips` 6!tex` 6!image:1}, formatrg = /\\{(\\d+)\\}/g, `$b! = \"`$g%\", has = \"hasOwnProperty\", g = {doc:doc`\"<!, win:window}, old`4Z&{was:Object`%c&[has`1j#g.win, \"` K#\"), is:` 1!.` -#}, Paper =`$H*this.ca = ` $\"ustomAttribute`##!};}, paper`!7!, appendChild = \"` $'\"` 8!ly` 0#ly\", concat = \"` $\"\", sup`,S!Touch = \"ontouchstart\" in `!w! ||` #\".D`\"~#` K\"&& g.doc`2b\"nceof ` 5), E`2X!, S = \" \", Str = String, spli`!N!` $!\", ev`%O#\"click dbl` #\"mousedown` $\"move` $\"out` \"#ver` $\"up `!}&` %\"` K!` %!end` #\"cancel\"[`!6!](S),` 2\"Map = {`!(%:\"`\"i',`!5&` 1#move` /$up` .#end\"}, lowerCase`\"M\"`+V'toL` 4$, math = Math, mmax =` /!.max, mmin` (%in, abs` ($abs, pow` ($pow, PI` '$PI, nu = \"number\", s`#u!`#n!` %!\"`.H#`%e!rray\", to`$:\" = \"` $$`/0!ll` /&fill\", o`()!T` H&`(/,.` Z$`'5#`'E!, pus`&M!push\", ISURL = R._` #$/^url\\(['\"]?(.+?)` %!\\)$/i, colourRegExp` G!\\s*((#[a-f\\d]{6})|` $&3})|rgba?\\(\\s*([\\d\\.]+%?\\s*,\\s*[\\d\\.]+%?\\s` \"*(?:` #,)?)\\s*\\)|hs` `,(?:deg|\\xb0|%)` ^;(?:` #,)?)` .!` x!l` $u)\\s*`#>!isnan = {NaN:1, Infinity:1, '-` &$'`.G!bezier`.F\"^(?:cubic-)?` 2\"\\(([^,]+),([^,]+),` %'\\)]+)\\)/, round`&s$` (!, set`,|%`&p!` %'`&e!Flo`,P!parse` (!, toIn` +%Int, upp`(p5U` 4$, availableAttrs`&I\"` #-{'arrow-end':\"none\", ` -#`*`!` ,&blur:0, 'clip-rect':\"0 0 1e9 1e9\", cursor:\"default\", cx:0, cy:0`(m\":\"#fff\", 'fill-opac`#r\", font:\"10px \\\"Arial\\\"` D!ont-family':\"` ).size':\"10` (&tyle`!t!rmal` .%weight':400, gradient:0, h` 4!` %!ref:\"http://r`1\"js.com/\", 'letter-spacing':0, `!{#`4`%\"M0,0\", `#&!r`\"Y!r`\"Y!src:\"`,.\"oke:\"#00`!m!` *\"-dash`,.!'` A!` /$linecap':\"butt` *+join` (.miterlimit`!\\!` /$`#_(` ,$width` -!target:\"_blank\", 'text-anchor':\"middl`' !itle:\"R`\"v\"\", transform`!s!` m!:0, `\"U!`\"T!'class':\"\"}`&i(nim`&d1` -'{`&N!nu`&E+csv`&4\"nu`&6!nu`&4$`-c\"`&,.` ^!`%b'nu`%,%nu`$Z&nu`$]$path`$`!nu`$a!` \"!` ;\"`$X$`!\"&`#Q,`!)!`#T*nu`\"|)` \"%`#)%nu, `!!\"y:nu}, whitespace = /[\\x09\\x0a\\x0b\\x0c\\x0d\\x20\\xa0\\u1680\\u180e\\u2000\\u2001` '!2` '!3` '!4` '!5` '!6` '!7` '!8` '!9` '!a\\u202f\\u205f\\u3` g#2` ?!29]/g, commaSpaces` [~`!1H*,` J~`!#E/, hs`0a!{hs:1, rg`0z!p2`#1!,?([achlmqrstvxz]),?/gi`&\\\"Comma`0[!/` ?#rqstvz])`!?~`!zC,]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?` f~`%+F` K~`!#F)+)`%!!t`$v)rstm`#z~`#z~` f~`#z~`$:^pathValu`-Y\"`#.7`$0~`\"H~`-&rgi, radial_gradient = R._` #./^r(?:\\(([^,]+`\"R~`0M~` Wq([^\\)]+?)\\))?/, eldata = {}, sortByKey = function (a, b) {return a.key - b.key;` L%Number` =7toFloat(a) -` $%b);}, fun` L))`!H!pipe` *)x` c&x;}, rectPath`%K#` $&` H', y, w, h, r) {if (r` ]&[[\"M\", x + r, y], [\"l\", w - r * 2, 0` 0!a\", r, r, 0, 0, 1` )\"` H%0, h` L$` 94-` E*` G! - w` i7` N!-` z*` P$h`!>7` K$z\"]];}`\">+`\"<)`!5$`!}$` $%`!N'` `\", ellipse`#N3rx, ry`#\\$y == null) {ry = rx`!05m`!6\"- r` *\"`\"/!` i!`\"+$1` $!2 *` #<-` 9'`!o$ge`%['` #&{path:`!|&e`!f!`!\\\"el.attr(\"path\"`&!circle` @,var a =` I$s;` X%`#\"%(a.cx, a.cy, a.r` i!` 9#` ,_` '!ry` q!rect` KD`(G$(a.` ^!` i!width, a.height`!f&imag`!EE` W@` q!tex`![1bbox` r\"_getBBox()` l-bbox.x,` H!.y,` \"\"` #` '!` ~'se` &~;}}, map`&C%` \"&`!1&path, matrix`(D#!` %%`!3#path;}var`(=!, i, j, ii, jj,` 9!i;p` s\"path2curve` u!);for (i = 0, ii` ;#.length; i < ii; i++)`'z\"` ;$[i]` V\"j = 1, jj` 2#i` T%j < jj; j += 2) {x =`\"##.x`!:!i[j]`!Z#[j + 1]);y` ;&y` ,5` 0$ = x` %$` 6! = y;}`+0$`\"s\";R._g = g;R.ty`0>!g.win.SVGAngle || g.doc.implementation.hasFeature(\"http://www.w3.org/TR/SVG11/f` >\"#BasicStructure\", \"1.1\") ? \"SVG\" : \"VML\";if (`!C$=` .\"`&9#d`!W!doc.createE`!H\"(\"div\"), b;d.innerHTML = \"<v:shape adj=\\\"1\\\"/>\";b = d.firstChild;b.style.behavior = \"url(#default#VML)`!S\"!(b && typeof b.adj`!a!object\")`&M&`#E%E;}d `/7\";}R.svg = !(R.vml`'T!`\"=*;R._Paper = ` #!;R.fn`%z!perproto` 2$.` )!`! #R` $&;R._id = 0;R.is`(E)o,`!x!) {` Q#lowerCase.call(` 8!`\"F!`!N%finite\"`\"1&!isnan[has](+ o);}` C)array` D'o instanceof Array`1r%` K%null\" && o =`2C# ||` 7%`#i#o` <\"!` //`#z$` Z&O` ,!(o)` :)`!W\" &&`!D\".is` #! &` \"+` Q#` p\"ToString`\"}\"o).slice(8, -1).toL`#<$()`!f$;};`#l%clone(obj`,<#`\"&$b`%v\"` @$\" ||`!m%bj)`\"C!` P\"`#B$bj`,d\"res = new obj.cons`(s!or`+p\"var key i` N!`!/#obj`$M\"key`'\"\"s[key] =`!W&` ,!)`*y&res;}R.a`*c!`%{(x1, y1, x2, y2, x3, y3`!##x3 `$;#`)r#x = x1 -` I\" = y1 - y2`(m\"x && !y`\"=&0`%W%(180 + math.atan2(- y, - x) * 180 / PI + 360) % 360;} else`)='`!y!`!h&`!c#-` 0&`!v*;}};R.rad`\"D)deg`!W&deg`!'\" * PI / 180`.%!deg` I)rad` L&Math.round(rad`!t(` d$1000) /` #!` k!snapTo` f)values, ` #!, toleranc`*-!` $$`*j!is(` (%,`){'?` J& : 10`.J#is` r%`(?!)`$U#i =`!&\"s`1s$while (i--`%)#ab` T$[i] -` I\") <=`!Q)`\"_#` @%;}}`$C$` .\" = +` 8#;`'_\"m`!4$ %` 1$if (rem <` c5 - rem`,.\"rem >` T# -` 4;`!4&`'w%` +!;}`!J!`1.\"UUID`#Z!` \")(`$6&uuidRegEx, ` %\"placer`!(&` A&` *&\"xxxxxxxx-xxxx-4xxx-y` '$` 4$\".r` g\"` k5.toUpp`,#$;};})(/[xy]/g,`!-'c`$t#r =`(u\"random(`(o!6 | 0, v = c`,:!x\" ? r : r & 3 | 8;`\"v$.t`-R#(16);});R.setWindow`'()newwin) {eve(\"raphael` B&\", R, g.win, ` E#;` *!`- \"win;g.doc =` @\".document`'6#_engine.initW`!$!` #-(` T!`*9!var toHex`!W)color`'K#`48!`\"#trim = /^\\s+|\\s+$/g` ]!bod;try` ?\"`!K!`.l#ActiveX`/C#\"htmlfile\");` A!.write(\"<body>` -%clo`$P!bod =` j\".body;} catch (e) {` 8\"`&V\"Popup()`\"c%` H#`$u!ange = bod`'\"#TextRange();`\"T$cacher`'1'`\"[$`\"2!bod.style.` 2! = Str` <#`&a%trim, E)`\"m!`(f\"=`!8\".queryCommandValue(\"ForeColor\");` E$`+4\" & 255) <<`&\\\"` -$65280 |` <&16711680) >>> 16`&d$\"#\" + (\"000000\"`*$$`&u)`4P$-6)`#H*` \\$none\";}})`0\\%`-:$`&Y!`#D#Element(\"i\");i.tit`2x!\"Rapha\\xEBl Colour Picker\";i`#B#display =`!#$` q\"body.appendChild(i`$!?` l$`$5$` #!`\"f$` r\"defaultView.getComputedStyle(i, E).getProperty`$=#` c!\"`*)!`->$`!G!`!2#;}, hsb`#O$`(U)`#?'hsb(\" + [this.h, ` #!s,` \"\"b] + \")\"` g\"l` K>l` R7l` b'rg`!:<` ]\"ex;}, prepareRGB`4G*, g, b`*d#g == null &&`3P\"r, \"o`*8!\") && \"r\" in r` '!g\"` \"&b` &\") {b = r.b;g` #!g;r` #!r`1_\"` m1s`\" !`3}$clr`10!getRGB(r)` ]!clr.r` o!clr.g;b` ##b`2V# > 1 || g ` \"#b > 1) {r /= 255;g ` \"#b` *$`%,$[`\"_#]`#$!ackag`\"q4, o` o!*` l$` \"#b` *$`,-!gb = {r:r, g:g, b:b, hex:R.rgb`#l%, `$Y$:`$b'};`\"s!o, \"finite`#t\"(rgb.opacity = o)`'x$rgb;};R`(4%`(T'lr`2V$gb`0W#is(cl`$e-h`$Y!cl`$f\"s`$g!` &$`$t\"` f\"`\"4\"R.hsb2rgb` }!;`$6! = rgb.r` )!`%6!gb.g` )!`%L!gb.b` )!h`*F!rgb`&t\"`+v\"`!$Tl`!G1l` oi`2~#`!T%`'(\"\")) {`&|+`!-!`&j!`!t4`(X\"`!v$`(Z\"`#L8rgb2hsl`\"\"&h`!X$` )!s` '#s` )!l` '#l;` Q*`\"`'v`\"F%`\"5$`!}\"{hex:`/\"\"}`#+%`#&$`# $`!8$`!2$` i$`!4$-1;}}clr`1?%`!'\"` &$`'($clr`'+!`%}#`'%)h, s, v`) \"if (`,^!is(h`%@2h`%I'` &\"`#@\"h) {v = h.b;s` #!s;o` #!o;h` #!h;}h *= 360`)o!R, G, B, X, C` >\" % 360 / 60;C = v * s;X = C * (1 - abs(h % 2 - 1));R = G = B` J!-` c#~~h;R += [C` {!0, 0`!#\"][h];G` 6!X, C, ` 7&` 6!B` 6!` F&` ;\"` 6!`#G#`,E&(`!z%o)`#Z#`($!`#N/l`#&W`)-\"h) {l`#D!l`#X%`#P%if (h`.`$s`.i$l`.j#h /`#q\"s /= 100;l ` \"#`#bM2 * s * (l < 0.5 ? l : 1 - l)`$!Fl - C / 2`#M~`$56`)f#`4(3b =`4Y'` 0%`2w!b[0]`2v!b[1]`2u!b[2]`#?!H, S, V, C;V = mmax` R&C = V - mmin` ,&H`#1!== 0 ?`4E\": V == r ? (g - b) / C` /$g ? (b - r` 1\"+ 2 : (r - g` *$4` q!(H + 360) % 6 * `$e!360;S`!'(0 :`$(!V`#,${h:H, s:S, b:V`3*'hs`3*'`#9&l`\"OpL, M, m, C;M`#8-m` -!`#9(C = M - m`#:1M`#92` 2!`\"l_L = (M + m)`'P!`#N-L`(E%C / (2 * L)`#p#(2 -`(s!L)`#n/l:L`#t)l`#s*_path2`2|\"`#y)) {` f#`+l!join(\",\").replace(p2s, \"$1\");};` O%repush(array, item) {for (var i = 0, ii = ` >!.length; i < ii; i++`-!#` ;![i] ===` a$`!K#` U\"` &.splice(i, 1)[0]);}}}`!J%cacher(f, scope, postprocessor) {` A%newf() {var arg = A`!$\"rototype.slice.call(arguments, 0), args`\"1!g`#%#\\u2400\"),`!;\" =` z!.`!I! =`!'!` &#|| {}, count` 1%ount` >%` (!|| [];if (` R![has](args)`\"u!`\"j!` E!`!G\"`%D%`\"B) ?` \"*` e#args]) :`!f\"` )\";}` i!`$<# >`/m!0 && delete` E#` ?\"shift()];` )\"`$5#gs);` g' = f[apply](`$%#arg`!&_` Z#newf;}var preload = R._` #&`'U&src, f`%%#img = g.doc.createElement(\"img\");img.style.cssText = \"position:absolute;left:-9999em;top` $$\"` \\!on`!5-) {f`&(\"this);`)&!` ?%null;`!P\"body.removeChild` I#}` r#error` j,` ;;` 4'append` 9\"img`\"I#rc = src`*3(clrT`+9#`*r,hex;}R.getRGB =`).%`!J%colour`*7#!` (\" || !!(` 5# = Str` A$).indexOf(\"-\") + 1`'c\"`,|\"r:-1, g:-1, b` '!hex:\"none\", `\"l!:1`-/'`!o'};}`(a!`!-#= ` P\"` TE` ]3!(hsrg`)Q\"` v\".toLowerCase().sub`.C\"(0, 2)) || ` B#charAt()`!I!#\") &&`!W& toHex`\"n%`2?!res, red, green, blue, opacity, t, valu` A!gb =`!!$match` d#RegExp)`+N!rgb`$3#rgb[2]) {blue`!8!Int` /#`!x'5), 16);`!:!` -63, ` B$red` .61, 3` A#`$8!rgb[3`!5-(t = ` 5\"`#+$3)) + t`!90` ;/2` B(`!E(` 9/1` @(`!L%4]`+0!lues` K#4][split](commaSpace`.Y!` x\"Float(` L\"`1W!` \"%`0h\"(-1`%1\"%\"`%1!red *= 2.55`\"%(` Z)1` ]&1` P3` T\"` `%`#>%` [)2` ^&2` Q3` T!` ^%rgb[1]`'H,` S!0, 4` T\"rgba` W\"`&h#`!'.3]`'C!` %# &&`''#[3`!03` b$/`1A!`$%'5`#-5`#.~`#.~`#iC`!~&` F$3` H\"deg\" ||`#O$`\",-\\xB0`+`#red /= 360`$YChs`#~~`.c#R.hsb2rgb(`,s5`%A'6`%;-6`$J~`$J~`$J~`$pXl`$J~`%B&l`%+=`2H\"{r:` ?\":` ?$:` C\"`4F2rgb.hex `3x! + (16777216 |` |! |`!)\" << 8 | red << 16).` i$(16`\"v$1);R.is`\" $, \"finite`#\\$gb.`##&`!q%`\"?#rgb;}` %#{r:-1, g:-1, b` '!hex:\"none\", error:1`!}4}, R);`(]! = cacher(function (h, s, b) {`({-` 3$.hex;}` ^\"l` J6l` V*`$>\"` 3$` Z&`$4\"` S-r, g`!B\"` +%round(x` m&x + 0.5 | 0`\"t%`$8.` Q\"b)` \"%g)`$H%` +!r` +!`$<6`!b!getColor = `![&`'-!`+X!r start = this` E%.start = ` \"0|| {h:0, s:`$d!` i! || 0.75}, `\"t\"` U!`#{$` T!.h,`!(\".s,` \"#b);` 4# += 0.075;if ` H$ > 1) {` &$= 0` H#s -= 0.2` &%<= 0`&j!`!q2`!c)`!4#})`#t%`(J#;}`#&'.reset`#*)) {delete`\"7\"` c!;};` 8%catmullRom2bezier(crp, z`#c#d = [];for (var i = 0, iL`.S!crp.length;` -\"- 2 * !z > i; i += 2` c#p = [{x:+ crp[i - 2], y` %'1]}, ` 8&` 1)+` ., +` Q++ 3` 1-4` 3+5]}]`$G!z) {if (!i) {p[0] =` O'`\"##` Q(` -\"1]};} else if (` /#4 == ` c\"3` \\)0` W'` E22` Q&2` >9` k,`!Q(3]};}` u#`\"1!`!A3p[2]`!8(`\"G2`#e.;}}d.push([\"C\", (- p[0].x + 6 * p[1` '\"p[2].x) / 6` <&y` :(y` >$y` >$` T%` >\"2].x - p[3` _'` R%` ;%y` <$` `$` T\",` 7#]`(=&d;}R.parsePath`+m\"`(4)p` .%`%L$` %)` `#null;}`'C!th = paths` P(`&2!pth.arr` M&pathClone` 2%` ^#aramCounts = {a:7, c:6, h:1, l:2, m:2, r:4, q:4, s:4, t:2, v:1, z:0}, data`)[\"if (`2M!`!I&, array`2M!` ,+`&:!` 8\") {` _#`!a'`\",'}`\"n!data`*C#) {Str` 8(.replac` R\"Command,`#W'a, b, c`*`$arams`!q!, name = b.toLowerCase();c` f)Values` b,) {b &&` i#`&z\"+ b`0^!if (` u\"= \"m\"` <'`!~\" >`,2!`\"1!`'S\"b][concat](` C#sp`1O!0, 2)));`!c#\"l\";b = b` s$? \"l\" : \"L\"`#&\"`!/%r\"` d;))`)F${while `!3$`!]$=`%\\([name]`!LF` I.)`\"s\"!` a0break;}}}});}` }!`48$ = R._path2s` ,!;`'D#`%f)data);`),$ata`1S!`)3!Transform` g%cacher(`$f&T`)3*` %&`),.`(K*r:3`(/(m:6`( 2` k#`(\"-` 1#`'q;`!H$`'t5` 9$`'.%t`'RQl`'{$.call(b`'G^`&?<`$k>`$f));`!u\"ths`-v*s`\".$`-S$.ps`-^$.ps || {}`-]\"[ps]`13!ps].sleep = 100`(#%` 5! = {` 8!:100};}setTimeout`%l') {for (var key in p`%}#p[has](ke`%'\"key != `!c!p[key`!4#--;!` $( && delete ` 1\";`(-!`/F$[ps]`'T!findDotsAtSegment`\"a*1x, p1y, c1x, c` %!2x, c2y, p2x, p2y, t`#/#t1 = 1 - t, t13 = pow(t1, 3), t12` ''2), t2 = t *` K!3 = t2` '\"x =` \\!* p1x +` V!* 3 *` I!c` -#` ('` 2!2` 2!` Q!2x, y` Z'y` R/` .\"` T-` 2!` _\"y, mx =`!>#`!W! * (c1x - p1x) +`!m\"(c2x -` =!`!W\"p1x), my` X!y` O*y` X!y` Q(y` T%y` X!y), nx =` g#` S&`!\"!c`!.(p`!0&`\"[!c`!5!ny` X!`!,*`!\"!c`!.(p`!0&`\"S!c`!5!a`#y\"`#t&`\"1\", a`#M\"`#H&`!m\", c` I%`#~#`#|$c` I%`#R#`#P$alpha = 90 - math.atan2(mx - nx`#7!- ny) * 180 / PI;(mx > nx || my <` ;!&& (` h\"+= 180`']%{x:x, y:y, m:{x:m` )!my}, n:{x:n` +!ny}, start:{x:a` /!ay}, end:{x:c` -!cy}`!m#:`!'!}`(Y!bezierBBox`($O`0=$`/;!` N!\"`/5!\")) {p1x = [` DB]`0m\"bb`!C!curveDim.apply(null,`&k!`\"m'bbox.min.`\"8!` %%y, x2` (#ax` 8!` $'y, width` 6' -`!1!` c$height` G'` 4(y`#.\"isPointInside`#*-bbox, x, y`3+&x >=` a\"x && x <` '$2 && y` 6%y` )\"` 7$y2`!*#BBoxIntersec`,s*bbox1,` J!2`,]#i`0V!`!U-`#5$i` O!2` N\"1.x` W\"1.y) ||` --` ?%` )2` 5%2` ?;` 4(`!h$` W$2` p)` 4&` W#` '4` 5%` f2` T&` :\"` 9\".x <` 9% &&`!b$ >` .$ ||` \"%` E\"1` @'2` B%1.x`)u\"`\";#` o%y` m'y` o%y` n&` C$1` @'2` B%1.y);};`$z%base3(t, p1, p2, p3, p4`1e(-`0=\" + 9`,9! -` #\"3 +`06!p4`1^(1 + 6` K\"- `0m!p2` +$3`%^$` E!2 -` Z\"1` a$2;}`!O&ezlen(x1, y1, x2, y2, x3, y3, x4, y4, z`+ #z == null) {z = 1;}z = z > 1 ? 1 : z < 0 ? 0 : z;var z2` >!/ 2, n = 12, Tvalues = [-0.1252, 0.` \"\"-0.3678, 0.` \"\"-0.5873, 0.` \"\"-0.7699, 0.` \"\"-0.9041, 0.` \"\"-0.9816` ,!816], C`!(&0.249` H!249` \"\"335` +!33` \"\"03`!L!20` \"\"160` C!160` \"\"06`!9!10` \"\"047` C!0472], sum = 0;for (`*'$0; i < n; i++`%3#`*d!z2 *`\"i$[i] + z2, xbase =`%t#ct, x`$:#x`$4!), y` 2-y1`$Z\"y3, y4), comb =` f#*` n#+` S#*` \"\";sum +=`\"z$[i] *`2g\"sqrt(comb);}`&-#`!h!sum`%y'getTatL`%d?`%s!if (ll`%a!||`&;B) <` V\"`!?\"`1#\"t = 1, step`(1!`&;!`(;#-` 2!, l, e = 0.01;l =`'GDt2);while (abs(l -`!:!> e) {`!,!/= 2;t2 += (l`!Y!`'x#-1) *`!9!` aL`#Z$t`)T(i`0I$`\"a=`#S!mmax` E!x2) < mmin(`%h# ||` )#` 8#> ` H\"` 3(ax(`%}\"` U%`&##` U%` 7$` W#` 8#`$,+nx = (x1 * y2 - y1 *`!/!* (x3 -`!,!-` =!-` -'* y4 - y3 *`'[\"ny` N6y3 -`!U!- (y1 -`!Q!` Q3denominator` j#`!.%` L7`!b!;if (!` V'`\"<+px = nx /` y(, py = ny` &-x2 = + px.toFixed(2), py` 0#y` ,'`!5!px2 < +`$M)` 9' ||` o!>` >!`%2&` 0/` \\&`%+\"` I9` -2y` ['`%A#` 0/` ]%` )6` \\&`%y\"` I9` 2-`#w'`(L#{x:px, y:py}`(M,(bez1, bez2` P%` 4\"Help` 2*` L,Count` 6G, 1` S-` 2/just` v!`/#bbox1 = R.bezierBBox` L!),` 7!2` )/`%Y#!R.isBBoxI`+ %` i!` R#`#\"&`!+&`45#[]`';\"l1`,>%.apply(0`!c!1), l2` &22), n1 =`$<\"~~(l1 / 5), 1), n2` .(2` /'dots1 = []` &\"2` %#xy = {}, r`4<!`!X/`3511 + 1`3C(p`#$!findDotsAtSegment`!u#R`\"2\".concat(i / n1));`!Q!.push({x:p.`&$\".y, t:` ?\"});}`!=!`!2(2`!2(` v@2`!-)2`!3#2` ~82`!%1`!-%`\"m%j` 8\"j`!S!; j`\"i%di =`#q\"[i], di1` && + 1], dj` ,#2[j` *!` ;$2[j` <#ci = abs(di1.x - di.x) < 0.001 ? \"y\" : \"x\", cj` D$j` E#j` 35is =`28'di.x, di.y`!e!` '\"1` )!j` (!j` &\"` 4\"j1.y`'\"is`2X#xy[is.`.2&4)] == is.`./&`1h!continue;}` >1` B,;var t`\"s!i.t +`\";!(is[ci]`\"i![ci]) / (di1` '*`0h!di1.t`#1\"t), t2 = dj` \\*j` P!j[cj` c#j1` '*` d\"j` c#j.t`\"W\"t1 >= 0 && t1 <= 1`#c!&& t2` 0&2` 1%`#$#`+x(res++;} else` )!`&j%is`&n\"is`&p!1:`/1!t1`*)\"t2` )#`-4!});}}}}`.l$res;}R.path`,3%ion = `-W%(path1, path`.,,Path`-t#` 9);};` c.Number` <[`/7\";`/0*` 35`#4(` 5!`*\\!_` 9!curve` J\");` -!` (12`&2\"x1, y`4R!, y2, x1m, y1m, x2m, y2m`,R\"`0V$`-=C, ii =`!j!1.length`+9\"ii`-f)` <%[i]`&,!pi[0`(R!\"M\") {`1U!x1m = pi[1];y1 = y` )$2]`%p%` O*C\") {bez`/k!`\">\"]`-9$pi.slice(1));` |!bez1[6` v#` (!7` o&` X*,`#(&`# &` ##]` h\"x1m`!^%`-y#`-]%, jj`\"L#2`\"o%j < jj`-m(p` <%[j`\"q#j`\"j*2 = x2`\"b!j`\"s!2 = y` )$`\"h,` T%`\"p$`2W!`%.\"`\"n&j`\"l(`3v#2`\"s!` $%`\"j*` ['`%w'`%o%` \"$]` h\"x2m`!^%;}`%f!ntr`.\\$`'a#`&@(`'\\&`\"^!`+&+ +` U!r`!H%`#a%k`#d\"kk` v\"r`#`%k < kk; k`#d!intr[k].s`3(\"1 = i;` &+2 = j` ,%`%D#bez1` ((`\"v$;}`(8\"res`3d%ntr`,%1isPointInsidePath`+/-, x, y`%J#bbox`*\"!pathBBox` >!);` n#` a+` <!bbox` \\$&&`+<1, [[\"M\"` @\"], [\"H\",`!'!.x2 + 10]], 1) % 2 == 1`-;!_removedFactory`!l)methodname`--&` 4&) {eve(\"raphael.log\", null, \"Rapha\\xEBl: you are calling to ` t\" \\u201C\" +` *#name + \"` 3!D of `!W# object\",` >');};}`-2!pathDimensions`#M)`#x-`)L$`$?!paths`#v#`(v!th.bbox`\"E&clone` .&;}if (!` b#` =#{x:0, y:0, width:0, height:0, x2` 9!2:0};}p`%V\"`//+`/6#`'c\"y`'j\"X = [], Y ` \"\"p`.Z6`.\\3p` 8#`.d%`+f* = p`+g!` $!2];X`4E\"x);Y` $\"y)`)E%var dim = `!q!Dim(x, y,` ^!,` [!, p[3` '!4` '!5` '!6]);X = X[`(^\"](dim.min.x, ` &!ax.x);Y = Y` 3-y` :&y);`!m\"5`!k$6];}`+t!xmin = mmin[apply](0, X), y` %1Y), xmax` 5!ax` C-` &0Y)`$v# =` V\"-`!2!`%!$ =` R\"-`!.!, bb = {x:` >\"y:` 0\"x2:xmax`%I!y` $!`%j\"` t!`%k%` l\", c` Y\" +`!2#/ 2, c` f\" +`!1$/ 2};`&x$ =`'*#bb`+E%bb;},`%D!Clone`( -Arra`,1$`-,\"`'m#` 3%;res.toString`(y!_`'<!s` ,!`! $`-F!`!#\"ToRelative` D&` ')`!(6`)H,`!;#`)U$rel`).&`\"+%` 2%`)X#R.i` S', a` {\"|| ` ,+ &&` a!` (![0]` C$) {` :&`+I\"rs`/T!`\"_\"`!O(`&^!`#3\"[],`)w+m` (#m` )#start = 0`\",\"`!0'`)K.` 1(`)`$` ((2];` z!x;` y!y;` x!++`$J!`)|!`0$');}`+3)` G!`+9'` q!`+23`\"<!`2d\"[i]`,($a`!C)`+\\$a[0] != lowerCase.call` 2\")) {r`\"C!` )2;switch (r[0]) {case \"a\":r[1]`!)![1];r[2` &#2];r[3` &#3];r[4` &#4];r[5` &#5];r[6] = +`!\\!6] - x).toFixed(3);r[7` 6&7] - y` 3)break;`!J\"v`!G%` I\"1` 1:m\":`$A!`!w\"`$E!`!u\"default:`$.%j = 1, jj` >!`$#%j < jj; j`$'!r[j`!1&j] - (j % 2 ? x : y)`!<)}}`/9$`$Q+`$B'== \"m\") {`!]& +`&-$`!f! + y`%t'k`'E\"kk`!Z*k < kk; k`!b\"`!'![k`#}#k`/$$len`!A%` S$`%.%` N\"`%1'z\":`.g!x`'y!my`#M)h\":x += +` h#[len - 1]`$?,y` *8`#$` W02];` E3}}`-6:`,*#`(<#`,?\"res`.l%`-`)Absolut`-`)` )'`-4Uabs`-U4abs`,k~`-Y0`!.!` E&|| ` $&`%I#`!j&[`,[\"0, 0]]`-Pu+`.61` '+`.18`,m\"`.B'`!e\"crz`.*/ == 3`#;,`!J&` ,*1][0].toUpp`-i\"()` C!R` 9+2` 13Z\";`)n%r, pa,`/LM`0d%r`#s!);`/Z;u`!;$`/c2` *1`/c2A`/&o+ x`/\\.+ y`/&*V`/X'`-I$`+n*H` //x` 5)R\":var dot`',!`%S![concat](pa.slice(1))`$8&j = 2`/z#dots`/l3dots`/~$` $$+ x;` '!++` )-y;`,H!pop();`(Z\"res`!C%catmullRom2bezier(dots, crz)`\"i*M`2$#`\"G(`()!` ,!`0A#`2*)`1eJ`2,\"+`2\",`1|&`1g*R\"`\"f#`#A;`\"#V`'n!\"R\"` f/-2));`3U$`2LK`2h*`'g1Z`2=8H` 7\"r[`2<+V\":y` $0`$P$r[r`+}$`27!`$W!` ()1]`2e'` ?.` <0`2F@abs`2J<l2c`2>)x1, y1, x2, y2`0('` +*` 9$];}, q` M3ax, ay` a'var _13 = 0.333333333` \"#, _2` 4\"666666666` \"#`!j$[_13 * x1 +` G!*` |!` /\"y` *'y` -$x2` 60` *'`!S%`\"\"!a`!p3rx, ry, angle, large_arc_flag, sweep` %#`\"u$recursive`\"L%20 = PI * 120 / 180, rad` 0\"` +! * (+`! \" || 0),`3j(y, rotate = cacher(`!`', y` j!`!)#X = x * math.cos(` 6!- y` ,$sin` /!, Y` ?(` /$ +` A&` W$`#${x:X, y:Y};})`1?!!`\"C(x`'(!`!e!`#9%-`!V!;x1 = xy.x;y` ##y;` B)`#7#` G$2` F%` ##y;var cos =`!R&`#4'`#7!), sin` :$sin` .0x = (x1 - x2) / 2, y = (y1 -`''!/ 2`!(!h`\"x#x / (rx * rx`\"w$y` /!y * ry`\"d\"h > 1) {h`!6%qrt(h);rx = h` Y!;ry` $$y;}var r`\"E!` v#, r`\"J!` q#,`,w!(`&G* ==`&L' ? -1 : 1)`$^%qrt(abs((rx2` b!2 -`!\"!*`!r#-` /!*`\"5\")`\"6\"` 4&+` 1))), cx = k`!\\!`\"R#ry +`#>!+`#9&cy` ?#-`!y\"x / rx +`#S!+`#P$, f1`\"x$asin((`#q\"cy)` s!).toFixed(9)), f2` =,2` 54;` t!x1 < cx ? PI - f1 : f1;` c!x2` .*2 : f2;f1 < 0 && (` ^!`)d!2 + f1);f2` 3&2` 0)2`%0\"`$ '&& f1 > f2) {` f!f1 -` L#;}`(I!` @+2 > f1) {` x!f2` D'`2?%1`3:!`(~#[0]`\"'\"` (&1];`$=!` (&2];`$)!` (&3]`&H\"df` $f1`!z!abs(df) >`,B!`+;#f2old` D!, x` %#`)Z\"` &\"y2`!>\"f`.T!12`,Y!`\"%1 ? 1 : -1`*+#cx +`&!\"`)z%f2)`*>\"c`&V\"`,#(f2);`-A\"a2c`*z%`.e+0`.W,old`!e#, [f2,`\"*\", cx, cy]);}`\"Z)`+R!`&l%`!N!1), s` *%`!E!1), c`&e%`!r#, s` *%`!i#, t` *$tan(df / 4), hx = 1`2I-`(n$t, hy` )5y` <\"m1 =`4%$], m2` )\" + hx * s` 4! - hy * c` >!3` >!2` :%`#>!` :%2], m4` =\"`2e\"m2[0] = 2 * m1[0] - ` /!;m2[1` /'1` 3#1]`&#!`/z(`4K$m2, m3, m4][concat](res);`'S$`2;#` 04.join()[split](\",\")`$H!new`2t$;for (var i = 0, ii`'s!s.length; i < ii; i++) {` U\"[i] = i % 2 ?`19$` 3! - 1]`3v![i]`3O\".y :` 7)` 8$ +` F\"ad).x;}`\"O#` |\";}}, findDotAtSegment = `4L&p1x, p1y, c1x, c` %!2x, c2y, p2x, p2y, t`)M#t1 = 1 - t`4!'pow(t1, 3) * p1x + ` +$2) * 3 * t`%G!x + t1` ('` 2!2` I%` \\$2x, y` h,y` ^6y` b2` I%` o%y};}, curveDim = cacher(`\"BL`\"h#a =`!z!-`&k!`\":\"p1x - (p` -&`\";!c1x), b`'4#(c` A!p1x)` ?#(` b\"` A\"c =` a#`!@!`#q!(- b +`3S'b * b - 4 * a * c)`27! / a, t2` K$-` +Dy = [`\"U!p2y], x` *\"`\"L!x], dot;abs(t1) > \"1e12\"`1N!`!Z!0.5)` 9\"2` /,2` 7$if` H!>`2%\"t1 < 1) {do`&p!`&y+`&RF1);x.push(dot.x);y` $&y)`2M\"t2`!.%2` Pc2` x;`%W\"y`%T%`&i!1y`%W\"` .%`' !c1y);`%Q'y`%W!y`%Q'y`%G!y);`%U\"` (#;`%)M;`%(M`$2~`$2~`$2~`!0#`-M$min:{x:mmin[apply](0, x), y` %,y)}, max` J\"ax` =/` ()y)}};}), path2`,f! = R._` #)`,f.ath` M#`,V#pth = !` .! &&` 7!s` C!`$P\"` /'th.` t!`3M&pathClone(` 3&;}` r! =` 9!ToAbsolute` n\", p2` 4#`!&%` 5+2), attrs = {x:0, y:0, b` &!b` '!X:0, Y:0, qx:null, qy` $!}` U#2` &SprocessPa`\"r!`#),d, pcom`#4#nx, ny, tq = {T:1, Q:1}`#-&`\"&[\"C\", d.x, d.y, d.x, d.y` *&];}!`!!![0] in tq)`(_!d.qx = d.qy = null);switch`!O\"[0]) {case \"M\":d.X`#X#[1];d.Y` &$2];break;` E\"A\":p`\">\"[\"C\"][concat](a2c`&;'[`!U%` 8%p`+)!lice(1))))` i)S\":if (pcom == \"C\" ||`#.!` *!S\") {n`\")\"x * 2 - d.bx;ny` /!y` *&y;} else` F&` <%;}`!o',`##`!I4`!R)T`!P+Q`!Q*T\") {`#g%`!W&qx;`#x#`!W(q`!Y&` J&` >'`!Z)`!U&q2c(`%2(q` &!qy`)P\"[1]` \"#2]`!n+Q\":`!!#`$t&`!'!`$w$` l?` s,` \"#3` *$4`!%,L`%P3l` Z9` V+H` 7Jd.y` R+V` <A` %!` _#` R+Z` :CX, d.Y` T%default:`/I%path;}, fixArc`*s*p, i) {`&<!p[i].length > 7) {` -\"shift();`-]!i = ` 2!;while (pi` M#) {pcoms1[i] = \"A\";p`-i!`'6!s2` .%);pp.sp`'h!i++, 0,`\"3+pi` 8$0, 6)));}` H', 1);ii = mmax(p`!9#`/ !&& p2`!}$|| 0);}`\"U\"M`-I-1`0m#, a1, a2`\"`'ath1`/a$`/i%1[i][0]`)1!M\"` 6%` /#!` 1!) {` 0!`!b'`\"9!M\", a2.x, a2.y]);a1.bx = 0` %!y` \"$`(B$`!'!1];a1.`(F$` .!2]`\"+K`$-\" = []` &#2` %$first = \"\"` 4\"` &!;for (var i = 0, ` eF i < ii; i++) {p[i]`%9\"`!!$p`#%\"`4=\"` /#!`.L!`%m+` 6\";i`%u% =`\"\"#[i - 1]);}` z!=`2O((p[i]`3C#`2L#`!$\"` q%!`&[!`!w!`!M#`!*0\"C\";}`(G\"(`(;!` `\"2) {p`'A!`\"'*`%:#`!{7`'t#`!}52`\"+'` D$`\"+(2`\".&2`\"(-` L!`!z;`)4$`\"-(`'j!` *!M(p, p2`#1%`!!$i);` 8\"2, p` -&` ?#i`*k\"seg`$s#, seg2`\"m!`%X\"` ,$len = seg`%w%seg2` 0\"` F\"seg`&$$;` z!`(#!seg[` X#- 2]` 3#y` *,1` 2$`(k!toFloat(` 6)4]) ||`!t\".x` G$y` 743` C(y` I\"2` y\"`,k#` L'2[`\"&$` z*2.x)` R%`)!` >9`!((2.y` R%`!+&` B+`\"i$2`*{\"` /01];}if (!`'6\"th.curve`+I#Clone(p)`0>&2 ? [`%G!] : p;}, null`-a\"` J!), parseDots = R._` #(cacher(`.<&gradient) {var d` A\"[]`+O2` F$`%B$`+A+` [# = {}`!B!` H'[i].match(/^([^:]*):?([\\d\\.]*)/);dot.color`!q!getRGB(par[1`)r#` 8%.error) {`\"o#null;}dot.opacity = ` C&` -#` s)` 4&hex;par[2`+.\"` `!ffse`+3!` 2\"+ \"%\"`![!s.push(dot);}`\"|!i = 1`\"v#` <!`.H#- 1`\"m,`%\"!dots[i]` }#`#,#start`'_'` ?\"`%Y!`!E$`/:!, end`1B!`$4%j = i + 1; j`!'#j`!%%` c!j`!\"'` Y\"` )*;break;}`&a\"end` ?%100;` {!i;}` ,\"`!Y$end`+U\"d = (end -`!\") / (j -`!N\")`!b\"`\"c\"j`\"`$`\"H\"+= d`#N!`\"d& =`\"c#`#l!;}}`'n$dots;}), te`&.!R._` ##`'>&e`'!per) {el ==` (\".top`/G\"` %%= el.prev);` =(bottom` A'` *#` J!next);` \"#` ?!` %#` d!` e*` -\"` =#prev` O\"` ]'}, tofront`\"&#` $%`!z2`0d!`!v&== el`'u%;}tear` E'`!^%=`(3\"`!J$`\"g';` e%`!R&` *&` )\"`!`!back`!\\$` %#`!C<`#/$`!<F` L(`!c'`!x!` 0(`#b&` *)`!f%insertafte`%^#` #*`!k*el2`!t&`!J.2`%b<` @!`%C(` '\"`!Z&`\"6(` 6$`\"3'el2` X&`!t*before`!w(` )%`!LT`'A8`\"$\"`'*'` '\"`!P&`'K&`\"$\"prev` J&`!w!`\">)`%u\"Matrix`\"!!` \"'`!w&path, transform`-D#bb`2T#Dimensions` E!), el = {_:{` K%:E}, getBBox:` p&`0/&bb;}};extractT` O$`#!!`!/&;` F#el.m`!b!`!{!` 7$Path`!\"` #+`!n8` k#mapPath` 9$`\"_#` ?-`*l!`!U,`%9\"` #/`%5*tst`)7$tstr =`(R\"`!:&el._`!r&;}` @\" Str` L!).replace(/\\.{3}|\\u2026/g,` K+ || E`/o\"tdata`![!parse`!T%String` q\", deg = 0, dx ` \"\"y` \"\"sx`3.\"sy` \"\"_`-U\"_, m = new `#\"\";`!2(=`!/#|| [];`\"J!data) {`2b%i` y\"`4&!` 8!`4%#`3x,`!~!` <$[i], tlen = t` J#, comma`2M!`##![0]).toLowerCase(), absolute = t[0] !=` N$, inv`+m!` ;%? m.` 0!t() : 0, x1, y1, x2, y2, bb`\"0!`!0%= \"t\" &&`!U#= 3`$#` l$) {x1 =`!&\".x(0, 0);y` )&y` ,#x2` ;'t[1], t[2]);y` /&y` ,)m`#r\"late(x2 -`!g\"2 - y1);} else {` :(` R(}` :#`!,r\"`' $`\"+#2) {`*J!bb || el.`*$#(1);m.rot` q&bb.x + bb.width / `#/!.y` /\"height / 2);deg += t[1]`!d$`!*(4`#5/`\"t*2`\"&!3`\"p.` /&`!O+`$_\"`\"o(` 2)` N(}`!R)`\"t3s`\"z- ||`%=)`\"}7scal`!0&` P!- `\"uKsx *`!]#sy` %\"` `%`#A05`#4=3`!I!4`#C.` /&`!k,2`#E1` 2.` X(}`!g/2`#O6m`(v)7) {m.add` h3, t[5` '!6]);}_.dirtyT = 1;`0T% = m;}}` \"*_.`-0!sx;_.`-2!sy;_.`-\\\"deg;_.`-`!`-e!m.e;_.`-h!`-m!m.f`*v!sx == 1 &&`-u!` $#!deg && _.bbox) {` #\".x += + dx;` *#y` *#y`#C%`!s)}`3D\"Empty`0x)ite`44$l = item[0];switch (l`-J*) {case \"t\":`1:#[l, 0, 0];` 4\"m` -)1` 7\", ` \"#` >$r\":if`!8\"`.o#`)u$` i*`!K!2]` \"#3]`&v%` ;)];}` q\"s` b15` i*1`!I!` j#` \"#4` p&` N/3` O.`!411];}default:`#n!equali`39'`3R!_` #0`$)&t1, t2) {t2`1Z$2`4M7t1);t1`4571)`3P#` k!` .42` >$var max`\"V$ mmax(t1`34%t2` $#), from = [], to` \"#`4A#j, jj, t`\")!t2;`4c!`4F\"` u%`4K$t`!{!t1[i] ||`' %(t2[i]);t`!t!` (!` 1*t1)`(W!tt1`4=#tt2[0` A!` .\"`'1*`1b# &&` N\"2` K%2` K%3` +%3]`\"n!` P5s` _&` I(` L$4` +%4])`%x%;}from[i]`#)!;to` \"%`\"|!j`#6#j`#p%`#n(`#q&; j < jj; j`#=!j in tt`+/!(` {#[j] =`!F!j]);` ;#2`!n\"o` 5'2` ;!}}`'B#{from:from, to:to};};R._getContainer`'#)x, y, w, h`+B#c` ?$;c` F'`(e!null`,s!R.is(x, \"object\") ? g.doc.getElementById(x) : x`%\"!` c'` d\"`#K'` 3).tagName`1p#`.*!` C) {` C%:` M%, `34!` '&.style.pixelW`3O!||`\"3&.offset` 4!, `3Y\"` F2H`3u\"` J/` 4\"}`+<,`!B8y`!#%w}`$J'` H&1, x:x, y:y` L$w` K%h`$g\"pathToRelative = ` #*;R._engine = {` I$2cur` D%` '\";R`2]&`%G&a, b, c, d, e, f`#m&new M` L!` 3.;};` Z%` ,4`$j\"a !`$g%this.a = + a;` (!b` (!b` '\"c` (!c` '\"d` (!d` '\"e` (!e` '\"f` (!f`#%` m%1` j&0` h&` $#d` 7&e` ,&f` &!}}(`\"g&`\"~\"proto) {` #'.add`\"{<var out = [[],`.>![]], `.T![`!d\", `!V\",` \"\"e], ` 4\"b` +#d` 3#f], [`4+#` `!`$V$[[a`!3!` V!b`!;!` <,`*B\"z, res`)K!a && a instanceof`$Q#`\";%` r\".a, a.c, a`!S\"a.b, a.d, a`!A+;}`-@!x`#=! x < 3; x`,|!` 4!y` 3\"y` 3\"y` 4!res` 1!` <!z` ;\"z` ;\"z` 8%+= m[x][z] *`\"M#[z][y];}out[x][y] =`\"4!}}`%4%out[0][0]`%;&out[1` )&c` <&1` ,#d` <&` +$e` <&2` ,#f` <&2];};`%H(invert`%J)`%@#me =`$c!, x = me.a * me.d - me.b` (\"c;`(}.` @!/ x,` B$` \"&c` &\"` i!` %!(` 0!` f!f` =\"d` (\"e)` 7&`!%#e` ;\"`!A#f` <!)`\"\"+clo`+E!`\"#)`!Q.`'>)`'1$`'K$`'9$e`'A$` u,translat` {*x, y`*}%dd(1`&F!0, 1`'J\"` V,scal` P., cx, cy) {`0c%`3C!y = x);(cx`/Y!y) &&`!Z\"` },` Z#`%8\"add(x` 5$y` #\"` AA-` c!-` e!`!k*rot`\"L,a`\"<# {a = R.rad(a);x = `!$!0;y = y` %\"`4R\"s`-C!math.cos(a).toFixed(9), sin` 6&sin` 2*`\"1&cos` H!, - ` \"!` ,!`#i\"`\" 3`\"1!`\"$-`0i*`\"&#`%r#x *`\"}# + y` %$c +`%a#` \\+y` G@b` _(d` c$f` \\+ge`)O*i` `&` L\"[Str.fromCharCode(97 + i)]`#&%4`'.-oString`(03R.svg ? \"` N\"(\" +`/[#get(0)`(/#get(1)` \"'2` .(3` .(4` .(5)].join() + \")\" :` f4` d)` ~)3)`$l\"` b$`\"0-Filter`\"*3\"progid:DXImageTransform.Microsoft.`+ #M11=\"`$4$`!Z\" + \", M12` +*2` 1$2` C+1` 0%` C+3` 2#Dx` **4` 0$y` **5` 1#sizingmethod='auto expand')\"`\"Y+offs`%r+`\"\\&`#o\"e`%\\'`-'$` ('];};` T%norm(a` X&a[0] * ` \"!+ a[1` (\"1];}` G)alize` T!`0t!ag =`*1#qrt(` o#);` c!&& (` $!/= mag);` r!` 0\"1` ,&}`-|)pli`1o1out = {};out.dx`2*#.e` *\"y` ($f`,-!row = [`\"q\"`03$c],`#\"#`0=$d]]` Z!`/9!`2u!`!|*row[0]));`\"P&` ,#` Q\"hear = ` .\"`#;\"row[1` '!+` 0$`#F!` 1#1];` $\" = [` B&-` W)` s%,` M&` 9&` j!` :%`!v'y`!k21`!o.1`!t)/=` i\"` _!`#:!`/+\"`!''`.f!`\"C#`\" \"if (cos < 0) {out`0`&R.deg(`!E!acos(cos))` L!sin` =0360 -`!?!` -\";}} else` ]7sin(sin));}out.isSimp`3}!!+`\"s&`0{'`&R!`%\"&` .(=`\"T(` -(|| !`!8&`#-\"isSuper` k@` _K&&`!\"(`!(!noRota`(\"!` m9` L(`*)#out`-x-`-T%`0@/shorter`)&#s = ` +# ||`1W\"`)U!](`$c#`#j%) {s`(W&+ ` %$`1g(` -#y` 5(`\"R&` <!`$}%+ ` %$` 5(`\"/#(s.dx || s.dy ? \"t`2,!s.dx,` /!] : E) + (`!L%!= 1` M\"`!>#` ,!? \"s` U#` B\",` 8%`1H#` _'`!V#? \"r` M#` ,\"` >(;`',$`1Q$m`2zn;}};})(`2+\".`$r!type)`)p!preventDefaul`-r-` b!`!U\"Value = false;},` R$Touch`0j3` Z!originalEvent.`!\"*();}, stopPropag`'.$`!3.cancelBubb`(\\!tru`!@!stop` sK` +`!=\"get` 9!Posi`!3-e`'X$crollY = g.doc.documentElem` u!` ;!Top ||` <#body` .&,` \\#X` D;Left` O1Left`'N${x:e.clientX +` r$, y` .%Y` .%Y};}, add`\"@! = (`# )if (`!&\"` ;$Listen`*5!`!(#` G&obj, type, fn, e`!u\"`\"}#f`#%1p`0#!`#U,(e`)Z%fn.call(` f#, e, pos.x,` \"!y);};obj`!O-(`!A#,`&r\"`+`#upports`%S\"&& touchMap[type]`!M#_`!<K, olde = e;for (var i = 0, ii = e.targe`(+\"es &&` #,.length; i < ii; i++`#w#` ;+[i]` *#`/u!bj) {`!6!` 6-;e`'Q* =`!b!;e`({+ =`)d);e`'x, =`(c&;break;}}`#]]`#l), _`$?&` s%`&](obj.remove`$B`` U5`!4>`+Z\";}`.x$`(7'ttach` l!`'Z_`$p!`*E\"win.`$<!`.s!`*j~`+H@, x`&Q!`+S0` .'`+^'`&E0` \"-||`1)+`&Z1` \".||`0<,`+$8x, `&p&`$L&(\"on\" +`$=$`2a\"detacher`0W,obj.` 6\"` F2`%a*` '#` e$;};}})(), drag = []` %\"Mov`3F!`+l-`#a)`#U+`$i$`$R~`%4<dragi, j =` &!`,o$while (j--) {` ?!` :#[j]`)\\2e.`)F!es`\"X#`. #`-a),`*2\"` v$i` y!` .!` A([i` }\"` *!.identifier =`!=\"i.el._`!i!id) {x =` r\"`#e$;y` #+Y;(`.+,? ` \",: e)`'N+()`-u%`+5#{`'p,();}var no`0k!`!W%node, o, next =` ;!.nextSibling, par`/^\"` 6!` (\"N` Q!display` 3$style.` .#;`+W\"opera &&` _#`-T#Child(node);` I. = \"none\";o`!^(paper.ge`%p$ByPoint(`)-\"` R1`!53(`\"G!?`!L$insertBefore`!P!`\"g\") :` :$append`!k');o`&'!ve(\"raphael.`%$!over.\" +`!m&id`'6#.el, o);x +=`(,$;y` #&Y;` ].move` W4move_scop`/G!` y&x -`&O,x, y` $.y`,I\", e);}}` q\"Up`*s-R.unmous`$U!(`+C$)` .$up` /!Up`,o\"`)8$`(a%`!0!`(\\*`)[)i];`!J* = {}`\"Y/end`#A5nd`\"Z,start` %,`\"{4e);}`-f%;}, elproto = R.el`!L\"for (`+)%vent`+'$; i--;) {(`#/'ventNam`#=![` %%] =` u$` '*` P&fn, `!_!) {if (R.is` 0!\"` <$\")) {this`4V\"s = ` \"(|| [];` ''.push({name:`!,%, f:fn, unbind:add`1(\"` S!sha`\"~\"` )!`+/!`.s$,`\"V\"` \\#`!d$` D$)});}`1Y$his;};R[\"u`1|!`\"P1` (0`\"`(`.#`\"/6, l`#-`&G#l`&I!if`$'#s[l].name =` J#Name`*l!`#Z&undefined\") ||` q#[l].f == fn)) {` +&`#7\"();`!9#splice(l, 1);!`!H) && delete`!x(;}`\"+})`!e$i]);}`# #.data`\"m)key, valu`4_$` ;#eldata[` ~!id`#d\"` $*|| {}`1t!arg`4$!`!Z%== 0) {`!K#data;}` 141`&s(`!I!\"object`&y!`(B'in key` G#key[has](i`';%data(i, key`\"N\"`\"d*`*[*ata.get`*d!`\"+#,` $!,`!j![key]` f!);`!{'` 2!;}` \"% =`#5\"`+W+ata.s` g2` J!` k*`$J#`$:$`24\"D`$5/`\"Q& == null) {`$6.{};`4T%` .+`%q&` ++`\"2#`!<2get`!>-`$t&clone(`%H1)` Z'hover`)F*_in, f_out`*V#` ,!` $\"out` y&` q!`0@!over` R#` J$)` 3#ut(` _)out ||` =&`!A'un`!19`!*+`1Y#`!2%`1i%`!*%);}`1o!draggable`/z\"`)+%`0,\"`!\"&onmove, on`0y!, onend, `0m&, `1-', `1O%) {` ^%` =!`3U!(e.original`.W!`+l!).pr`*]!Default(`3R\"x = e.clientX, y` $'Y, scrollY =`.~\".doc`)l!Element.` :\"Top`/>%.body` .&` [$X` D;Lef`!b!` S-Left`1.\"`4`!.id`!]!identifier`+m!supportsTouc`-M!e.touches`,_#`3W!` ,$`+g#, ` +!`/N$i`/Q!` .!` A([i`2M#`!5'` 6!`!4,` %, =`0o#` Q$) {x` T%`#k#;y` #+Y;break;}}}` R'x = x +`#E$`!E(y = y` 2%Y;!` 1!`02&R`(*\"move(dragMove`(=#up` -!Up);` P!`4i\"el:`,6\"`&U&:`&S3:`&`2:`&w%});`'N#`$0!ve.on`-N'rag.` 9!`-M*` L#);`(3\"` B5move` J,move);`(\\!` ?5end` G,end`3h!`!;>`\"H' ||`\"z' ||`/N#`(g%`$H&` +&Y`$B&, e);`$|'`/'\"`+-%`$ ,`!5!`#m\"})`%=\"`$b!down(`#+#`.|2onDragO`,s-) {f ?`\"o2over`\"L*f) :` G!unbind` 1;`.3*`-#-`)M'`\"G&`'0\"`)C*if `'!!` =![i].el`(r$) {`.f(`\"c!` >)`\"n#` w&splice(i, 1`%*!`!u2*`!y+}`(o!`!W(`(s\"`!1#`(l+` /#`(n+`/}\"};paper`\"p\"circ`07!`\"l&x, y, r`\"v#out = R._engine` J#(`%H\"x || 0, y ` \"\"r` #!`%Q#__set__ &&`+|#` *\"`&,\"`1]!`%b#out`!G*rect`!@/w, h`!?6rect`!@3w` )#h` yjellips`#(1x, ry`!R3` P#`#+4` )$r` ,\"`!%]path`!V)pathString) {` #& && !R.is` 6', s` B#` */[0], array` :!` /' += E);`\"I0path(R.format[apply](R, arg`4-!s),`(q\"`!w\\imag`$-*src, `& &`$'3` S!`$5#src || \"about:blank\"`%~<`!8]tex`'i0text`!\\3tex`'b4Str(` U!` v]se`!H*itemsA`%8\"{`%U\"` )&, \"`%T!\"`%T\"` /& = ` #!.` p!typ`-G$.call(`%=%, 0`%I'`-*#)`&'(new Set`!<(`!{Dout.`\"5! `/=\"` ,!type = \"set\"`\"I8Star`\"\\*set`/}$`!4$= set`4$$.set()` X-Finis`)L*` d\"`\":&` h(;delete` &*`!P4getSiz`'q*` s#contain`\"T%.canvas.parentNode` n${width:` H%.offsetWidth, height` --H` 2!}`#%.`!?,` x!` _$) {`!.#`'L&` N#`%S\"`'X\"` F*` s-ViewBox`0A5fi` q4` S#`! (` I,`)V+op = ` &'bottom = null`1)aphael = R`'9!getO`#%!`!Z)elem`$:#b`!}!elem.getBoundingClientRect(), doc` <$ownerDoc`(E!, body = doc.body` F!Elem` -#d` B#Ele` J\"c` s!T`\"*!` D#.` *&||` l!` $*0` N$Left` F-` 0!` J*` +$0, `#2\"box`#=!+ (g.win.pageY`\"p#||` i%scroll`!=(` )%) -`!r&, l`!E\"box.` &!` m)X` b4`!_)` )&` r&Left`(&%y:top, x:lef`'R,ge`#K$ByPoin`/0.`$w#`+l(, svg`%$`)A#, targ`%Y!g.doc.e` q\"From` t!` g\";if`\":$opera`-)!` T!.tagName == \"svg\"`!2#so =`&S&(svg), sr = svg.createSVG`&<\";sr.x = x - so.x;sr.y = y` *\"y;sr.`)H! = sr.`)K\" = 1`'^!hits` q#getInterse`\"f!List(sr,`(A!`!\"hi`/V& {`\"T%hits[` 1' - 1];}}if (!` @\"`*\"&`)/!}while (`\"`#`,f&`\"r& !`!P\"` .*` h#`)b$`!:(` [-;}` 4$`$I*` d+`!>#`\"_\");` a+`$B'`*v$?` g#getById`!}$` 8#id) :`\"@\"`\"K#` :\"`&L4sByB`-9,bbox`%C$`!F\"`1Q&` &!forEach(`,)() {if (R.isBBox`$b%(el`!f!Box(), ` w!) {set`3a\"el);}})`!f$s`!X/ById`!T)id`-8%`!V%`.0\";`$s#bot`!J#bot.id == ` Q!`! #bot;}` X\"bot.next;}`%V)`!8(`\"I#`!7)callback,`!:!Arg`!)F` S$`0Z&Arg, ` <!=== false`!b&this`!T5` 7\"`$c5`+D9`$LMel.is` n!Inside` g\"`$M=` a%x_y(`\"**.x + S +` '\"y;}` @(_w_h` 2:` Q(`+_\"+ \" \\xD7 \"` 0$`+l\";}el`\"z\"`!u)`\"c4rp`\"r$realPa`,Z!getPath[` 3!type]`$X!`,7\"` 0!attr(\"transform\")`){!` %1`,_&`!'!R.` 3%Path(rp`&3\"` G.)`%3%R`!~*` O%`/q\"};`\"J$`)8#`(U*sWithoutT` r$`$}#`\"N#move`(E'{};}var _`\"o$_`\"P!` M5_.dirty || !_.bboxwt) {`#)E` L$`2N!thDimensions`!X$` ]\"` ?&.toString =`%s$;`!=$= 0`#+%` H$;`0:!`!\\'` $#T`!h'`!y/`!0* {`!]'0`(Y\"`!z@}` Q\"`\"+.map`$a!` ])`%B#matrix)`\"K$`\"3:`\"%%`\"J.`%N'clon`'u*`%(9`-S\"var ou`+1%`+u!`\"7()`'-\"`'3&)`+R#__set__`(*%` )#`+3\"out`+-%out`'2(low`!W)glow`!\\(type == \"text\"`!_,` X#` \"!|| {};`-6! = {`+-!:` k!`+7#|| 10) + (`+6#`)8\"stroke-` ?!\")` A!), fill:` X!fill ||`/3\", opacity` 6\"` &# ==`!L! ? 0.5 :`!L!` 5$, offsetx` L#` '\" || 0` 3$` f$` '\"` 4#color` 3\"` &! || \"#000\"}, c = `-N$/ 2, r`$F),`$^#r`/v\",`&f!`-$-||`',6` E(`&w\" ? `':$p`'(- :` ~!;for (var i = 1; i < c +` &!++) {ou`0f#r.p` c$`&.#{`$$\":s`\"J\"`#}#s`#{\"? ` 0# : \"none\", '`$T#linejoin':\"round` ,+cap` '/`#7!':+ (`#>&c * i).toFixed(3)`%%&` C!`%'$/ c` :(}`/,'out.insertBefore`#I\"`/z\"late(s`%:$, ` #$`/K!var curves`0V\"`'@!},`$=!ointAtSegmentL` :!`(H)p1x, p1y, c1x, c` %!2x, c2y, p2x, p2y, `1M%if (` '\"`'3$`(p&bezlen` MC);} else` U%R.findDots`!h%`!6EgetTatL` tE`\"(%);}`#$\"`\"v\"Factory`2d+total, sub`&O!`!i%`#<'`'R!` n\", onlystart) {`('#path2`$@!`'2\"`$P!x, y, p, l, sp = \"\"` }%`$]$point` v!`//!`(9)0, ii` v#.`!7\"`(R\"ii`(M$p` 8#[i]`45!p[0]`-P!M\") {x = + p[1];y` $#2]`$/%l`1e#`%q/(`!t#[1],` P!, p[3` '!4` '!5` '!6])`!1!len + l >`%z*`\"D# && !`\"O$.`#0%oint` __`$/$ - len);sp += [\"C\" +`#X\"`!-\".x`#f#` (#y` '$m` 0&m` ,&` +%y`#S\"`%((`%X#sp;}`\")* = sp;`%&![\"M`!7&` c& + `!N(n` 1&n`!2&end` .&end` 5!`\"H%].join();`#q!= l;`$$5`$}&6];continue;}if (!`'`#`$!(`#+w`\"|#{x:`\"Y%y` $#y, alpha` (#` '!};}}`!p;}`$s\"p.shift() + `#t(end`#x\"`\"*$`\"H$?`(w!:`)0$ ?`)8&:`+1`\"K$0`\"6!`\"=81)`!(\"`!~\" && (`!6$`\"0E`#\"%` 0!;}`/i#getTotal`/J%`,S,(1)`/v(` .6` A\"S`\"M#` .80`\"-!R.`!(0` &'` <\"`!%/` &)` @\"`!0#`1E*`.'!from, to`+$#this`!*+`.#\" - to < 0.000001`)5&`\"#/` q').end;}var a`!Y\"` 63to`\"R!`/k$rom ?` :1a` n' : a;};elproto`# .`\"D&) {var`.! = `\"?$Path(`-v\"!`1')`)g\"` B!node` k+`\"S&` *4();}`\"v&`#=-`!f*`$T,`!l&`/>%`!NJ`!0&` n)`32)`!4,`%O,`!*'`'[\"` ;\"R._` &#[`!D!type`.t\"` &%`2S!text\" ||`!i\"` .%set\"`#V+` h#`4Z&`\"4$this`#=&path`!e*`'A0`'D'`\"^Q`(B(`(2,`*l#ef`\"b!easing_formulas = {linear:`!D&n`%_&n;}, '<'` (2pow(n, 1.7)` C!>` *:0.48` C\"<` 9-var q =` ?! - n / 1.04, Q = math.sqrt(0.1734 + q * q), x = Q - q, X =`!%!abs(x), 0.333333333` \"#) * (x < 0 ? -1 : 1), y = -` ]$Y` Z'y` K6y` U,t = X + Y + 0.5`*i$(1 - t) * 3 * t * t + ` \"\"* t;}, backIn`\"\\/s = 1.70158` g$n * n * ((s + 1)` *!- s`#Q!backOut` [+n =` ?!1`%A!` LD+ s) + 1;}, elastic` i+if (n == !!`%b*`%)'2, -10 * n) *`$_#in((n - 0.075`#G!2 * PI) / 0.3`!-%bounce`\"`37.5625, p = 2.75, l`(:!n < 1 / p) {l = s`\"5#n;} else`!o$< 2` ?#n -= 1.5 / p;` F)`$d!75` H.` G\"` T$2.2` E493` T'` F#6` 4684` K!}`#:$l;}};ef.easeIn = ef['ease-in']` )#<']` <$Out` 9(out` =%>` <&In` 9+in` >)<` F\"['back`! &.`'!\"` 0&` J&` 6!Out`&<!animationElements = [], requestAnimFrame = window.` /'` T!` 9\"||` 8$webkitR` ';moz` #<o` C=s` )5`&]&callback) {setTimeout` -%, 16`)H!`\"_%`1J0Now = + new Date, l = 0;for (; l <`#6..`2Z\"; l++` `#e =` 6.[l`22\"e.el.removed || e.paused) {continue;}var ti`$)!Now - e.start, ms = e.ms, `0M\"` *!` %\"`0w\"` ,!`1 \"diff` *!diff, to` (!to`-Q\"e.t, tha` &\"el, set = {}, now, ini` ($key`!w#initstatus) {`!]#` *) * e.anim.top`!v!prev) / (e.percent` ,'* ms;`\":!tu`\"6\"` a&;delete` &*e.stop &&`#y/splice(l--, 1)`*;%` t'(`!2\" +`!64(`\"/!/ ms)) /`\" ';}if` 7#< 0`$B)` .'ms`%>#po`\")!`$4!` i'`&&\"`)M!ttr in`$O!`/1#from[has](attr)) {switch (availableAnimAttrs[attr]) {case nu:n`'6#` `!` 8! +`!A!* ms *`%H!` 2\";break;` T!\"colour\"` X#\"rgb(\" + [upto255(round`!T\"` X!.r` _4.r)), ` ?5g` ?5g` ;9b` ?5b))].join(\",\") + \")\"`\"/)path`\"2$[]`#q&i = 0, ii =`#$'`*!%i < ii; i`*-!now[i] = [` A&[i][0]` g'j = 1, jj` e)[i` k&j < jj; j` j'[j]`$D+` .#`\";3` 8\";}`!J%` #\"`\"^\"S)` 4!` 0\"` *%`\"c(transform\":if (`$N(eal`!P\"`\"'`\"8j`\"FX`\"PL}`*Q$var g`,p!`/b&i) {`4c#`#k+` \\7;};`\"v#[\"m\", get(0)` \"\"1)` \"\"2` )#3` )#4` )#5)]];}`)')sv`#}\"`*_!== \"clip-rect\"`#{(i = 4;while (i--`#\\(`!PH`!6#default:var` X!2`!!![concat]`))')`\"E$`!=\"that.paper.custo`+|!ibute`+#`$[$`!N82`!E<`!^\"}set`,W#`'D!;}}`!:!attr(set);(`$`'d`1{\",`0&!) {setTimeout` ;') {eve(\"raphael`/K\"frame.\" + ` V+;});})(`!0!` 1&`0!\"`0h&` t'f, el, a` hSel`!\"!` ]\";` 7/inish` 8/R.is(f, \"`!#$\") && f.call(el`\"\"$e` ,!back`!},`#O&to);`3-=if (e.repeat > 1 && !e.next) {`*@!key in to`2*#to`2)\"key)) {init[key] = e.totalOrigin` 0!;}}e.el`!L\"init);runA`!O$(`!q\", e.el`!}$`4[$s[0], nul` 5!` o', `!j%- 1)`4F\"`!o\"`!y#stop) {` n9next` `;);}}}`#2.`(4\" && requestAnimFrame(` D%);}`2W%`,>)color`,E&` *! > 255 ? 255 :` -#< 0 ? 0` ($;};elproto`\"#!ateWith` n)`& !`\"?!params, ms, easing, `%j$)`-}\"e`\"(\"`*f!is`%C\"` -\".removed) {` L$ &&` W%`&d$` G!);`\"!#` )#;}var a =`!<# instanceof `$\"% ?` 6$: R`\"'#ion(`!Y9, x, y`%p*a,`!0$, a`%b1`\"+#`&Z!))`1p\"var `2\\(`$i4`2_,`/X!` <,[i]`!}! =` c\" &&` _.[i].el == el) {` -/i - 1].start`!?0[i` 6#;`.,#}`#h,;`%?%CubicBezierA`,W!(t, p1x, p1y, p2x, p2y, dur`'&\"`%L\"cx = 3 *` F\"b` &$(p2x - p1x) - cx, ax = 1` (! - bx, cy` R%y, b` &$(p2y` V!y` V!y, ay` S$y - by`!l&sampleCurveX(t`(7&((ax * t + bx)` ##c` $\";}` U&olve(x, epsil`\"+%t =` 5\"` r#` 6'`'2$((ay` y$y` x%` $\"` q,` T.`! #0, t1, t2, x2, d2, i`&H\"t2 = x,`&L\"`&-\"8`&*$x2 =`\"J+2) - x`)J!abs(x2) <`!\"'`!m#t2;}d2 = (3 * `\"{\"2 + 2 *`\"~$2`#\"!` `%d` d!0.000001) {`&!#`!Z!t2 - x2 / d2;}t0`!f!t1 = 1;`!z\"` c!t2 < t0`!<'0`.V\"t2 > t1` .'1;}while (t0 <` 6\"`\"91`\"?' - x`\"55if (x > x2) {`!]!t2`4Q%`!f!t2`\"'#(t1 -`!c!/ 2 +`!a!` _'` $#`%k\"t, 1 / (200 *`('&);}`.E$o`+f&`.@)f) {f ? eve.on(\"raphael`1|\"frame.\" +`.8!.id, f) :` H!unbind` 1<`&v%`.y!`*3'`-3'`/f!ms`&]#`-7$ = [], newA`,3! {};` p!ms = ms` '\"times`$|!`,o$) {`-V%attr in`,#!`-/'[has](attr)) {` {#[toFloat` 2\"]`,W#[attr];`!M$.push(` =));}}` 6%sort(sortByNumber);}`!c!`.6\"`\"&$`!u#op =`\"G%[` \\%`41#- 1]` C\"`\"h'` #$;}`#8%.`$|!type.del`,5!`$u&` -!`#S#a`!;\"`#p'`!R%,`$J\"ms);a`#K%`#W&;a.del = + ` }\"|| 0`$r$a;};`!90repeat`!A)` h!` K`!3\"` ,!del`!T'math.floor(mmax` w\", 0)) || 1`!S(`!9%`3i*`!&!`3q%`#T#, status, totalOrigin, `!s$` ?# = `%>$` +#);`'9!arams, isI`!%!, ` \"$Se` z&`'S&xt, prev` z#tamp, `']!`(k!ms, fro`'y\", to` \"#diff`(-\"if (`!k\"`'q$`.}!, ii`3m0`&6#`/;\"ii`/:$var e`4:3` ~!e.el.id ==`#)$.id && e`'T#` V\"`(~#e`'+$ !`'*%) {`!<.splice(i, 1);`\"'`*-!`-O$` 0$ = e;}`!7$attr(e.`$:');`0&#}` R$`\"s\"`'3!to;}`*o%`\"s,`(y%`\"h3`+1$` ?%[i] =`\"2% ||` Y*[i] >`&!# *` 6\"top`%r)` A,;prev` &.`*b!`)*\"`-2# /` h% * `&W$ -`&#!);nex` l/ + 1];`&x\"` 6$`,{!` <#]`#4$`#4\"`&))`#e)` P&`!q,]);}`2;!!`!!\"`2P%`2P\"!`$_$`.m0` I%if (` '\"`.w*`#}!vailableAnimAttr` 8( ||`&q%paper.custo` C!ibute` b+fro`/V# `'I&`\"<\"ttr);` 4(= null && (` J)`!G&`!H!` 2!);to` 8%`\"##`0^\"switch`!r1` T\" {case nu:diff` \\%(` h%-`*g!` F$/ ms`$O#` S!\"colour\":`!W)R.getRGB`!o'`,D\"toC` K!` 8(`!\"$);`!5){r:(` G$.r`!:).r`!C\", g` 9'g` 6*g` <$b` 9'b` 6*b` >\"}`\"%)path\":`.2\"th`/q!path2curve`\"'', `!q%, toPath` D#es[1]`$`)` /$0]`\"7*[];`-n-`!U'`*c2` X&`*m! [0` _#var j = 1, jj` ])[i` c&j < jj; j` [.[j`%5#Path` )#`#%(` -\"`%?#}}`#*(transform`#5\"_`'V'_, eq = equaliseT` C$(_`#9-`/r\"q`(;-q.from`'[(eq.to`#=-` &&.rea`4`!rue`#!``\"X*0]`#m#`#*b` %)`#W7`0|$var `1V!`#\\#matrix || new M` )!, to2 = {_:{`$5%:_.` #%}, getBBox:function (`-x%` s%` =#(1);}}`'H*[m.a, m.b, m.c, m.d, m.e, m.f];extract`%&&to2`% (`$c'to2.`!P'`$i+(to2`\"=#.a - m.a`*6$` /(b` 6!`*.#` -*c` 6!c` '0d` 6!d` '0e` 6!e` '0f` 6!f` 5\"];`')csv`( \"valu`+<!Str`0z$`\"V\"[split](separator),`%1!2` F#`-n'` 9.`(@!`2!!== \"clip-rect\"`(F,` l!`(2-`'w$2`&z$while (i--`'e/(`!~\"[i`&g-`&l%`$\\'` G\"`.(#default:`\"]%[][concat]`\"_*`&0!2` 3*`0N(`!n0`3X;`*.)`\"#:`\"7'|| 0) -`3l\"2` )%`\"B$`\"1\"}}}}var easing`3h%.` *\", easyeasy`2?!` /\"_formulas[` *\"]`$]!!` B$) {` J'Str(` A\").match(bezierrg`-W#` C$&&`!#%`\"C# == 5)`*y\"`1j! =` :%;` x'`*E&t`*F&CubicB`!&!AtTime(t, +` b\"[1]` \"&2]` \"&3` -'4], ms);};`,?$`!('pipe;}}timestamp`#.&start || anim` $&+`,f!Date;e = {anim:anim, percent:p` \"\", ` m%:` w%, ` e!` '& + (` }!del`$q\"` >!tus:0, init` '#` /\"` >!, stop:false, ms:ms`${!ing:`\"4$`)r\":from, diff:diff, to:to, el:`'$#, callback:`\"S#` ($, prev:prev, next:next, repea`!|#`\"x%` )!, origin` t$.attr(), totalO` 6\"t` \"&};animationE` L\"s.push(e`&.\"`\"M#&& !isInAnim &` \"'Set) {e.stop`3L$e`$E#=`$@% - ms *`#P#`,@\"`!&-`' &1`&R&` >%();}}if (`!(.` {-e.`!\"(}` n9 && requestAnimFrame`!S&)`')%`!/$.`%G& =`\"(%` 5$`!:/` 3%`!G)eve(\"raphael.`'V&.\" +`,Y%id,` $$,`\"d!);}R` H!`!W!`)b)`%s\",`1I!`+h$`%~$) {if` ;$ instanceof A`\">%`#g%` ?\";`#e!R.is`+j#, \"`!$$\") || !`,\"# {` ~$ =`!(% ||`-=$|| null;`-K%` )!}`!E#= Object`!U#);` /!+ m`) \";var p = {}, json, attr;for`2@#i`!j$`\"7)[has]` <!) && toFloat` *#!=` `!` '.+ \"%\"` 7$) {js`#_!`'N!p`0}%`1T(`&k#!js`#>!if (`#i'var lastKey = 0`!p\"var i`!j)`\"?!`,J\" = toInt(i`)7\"`\"\"(i`\"&!` A$>` r$) {` z&` 7#;}}` ,$+= \"%\";!` c#` 0#]`+X% &&` ~%` +.`$h&);}`%Z#new`%n&`&L'`(@&`%$#` u!`2@#`1(\"ing);`!,*` v2` v1{100:p}`!%#};elproto`()#e`'bH`4@!`(s\" = thi`,-\"`)0$removed`'P(&&` W%`!n!` D$`!c%` )#;}var`)g!`%b%`(|1 ?` 6$: `*('`![:;ru`+E!` E\"`2L\"`*s).`%:#s[0],`)%!` 8%`0!#`!^.`#?%setTim`#:*` ~\"value`'Y#`\"6!&&` .\" !`**\") {thi`4L!tus` O#mmin(` B!`!V#ms) /` \"%`&(%`#z!`!<'`.3$`!.4var out = [], i = 0, len, e`$a!`!J,`#\"/this, -1`!W*1`\"t&`!N\"`'I#len =`1?&`0V+`*1\"; i < len; i++) {e` ?0[i]`&C\".el.id =`&W\".id`()!!`#X!|| e`%M! =` ]\")`#p'`.&`2T!`0f!out`4M\"{anim:` W\",`1##:` @$}`38$` Y*0`#%out`(k(paus`%;.) {`,\\'= 0`\"S\"`\"d5`\"g#`!0$`\"^,`\"I;` >1`\"g0`3<.`!z!`3I!` s#`%.$` [5) !== false) `#F!` 6-` p!d`0,$}}`',3resu`(V/`\":~`\"kM`-D!`&m9`#H-`\"7\"`#F0`&S\"`#9*delete e`#4#;`*{(`'!$`&z$)`#86stop`\"N~`%ttstop`%h.splice(i--, 1`#$/`\"%stop`4A(per`\"Co` s! == ` y$`!N@eve.on`# &`3o\"\",`!f*);` 8,clear` 4/`%c#toString`%a)`-%&\"Rapha\\xEBl\\u2019s object\";};var Set` N)items`28$` (!`14!`'C\"`\"}\"`#@!` +!type = \"set\"`(Z!` V$`#d*, ii = ` 8!`#]& < ii`#c(` ;![i]`&c!` %$.constructo`#n!`\"P$` +(||` v\"` </Set)`\"'#[`\")&`!>#] `'t$` Y!` +1` q$`\"U(++;}}}}, set`!I! `!$!.` '!type;` 1$`1c!`$+,`\"s!tem`4a!`3I\"`\"{,argu`&g+`#!*tem` ;(`,W$` 3!`#7$`\"pG`# 3len`\"v)`!F$`#J!len`#2+` +#item`\"~-`)c*`\"v&`,y+`&R$`&C#&& `.+#`$X&` 5\"--];` i'`!Y#pop()` t(forEac`#u*callback`,1\"Arg`&y4`\"G.`'#/` f$.call(` k#` u\"`\"p#i], i) =`,x'`\"a)`,],`!C$method in`$R$`.I$` (\"[has](` ?\")) {`\"L$[` -\"] = (`\"K&` /\"nam`!4'`&e-arg`&*(`#T)`#C#` h'el) {el`!)#name][apply](el, arg);});};})`!_$;}}`$2%attr`$+)name, value`\"C#name && R.is` 8#array)` ()[0], \"`,p#)`$a(j`$g\"jj = name`$^%j < jj; j`$b!`$A'j]`!S!` r\"j]);}} else`%*T`%:)` q&`\"?$`'6`/r!`(+,while `&@!`!)#` {$`'r#` V'`1<\"`/N*ndex, count, inser`0h! {` 5! = ` \"\"< 0 ? mmax` ( +` 9\", 0) :` &\";` g! =` G\"0, mmin` H)-` M$` E!))`10!tail`0r!, tode` $$arg`1(\", i`(!\"i = 2`4J#`-A.`#]!args`.B!(`-B();}` X%0` [\"`!<!`$/%odel` Q\"`+U!`\"S\"+ ` P&` O\"`!x/` Z%ai` I5`(f#`-z\"`!]!`!n#`!E,` >#+`\"n!`\"++`%p(` t%`&N#` $*` _'?`!*![i] :` o![i -` 5#];}`&1` ,$`\"?$=`#%\"` O%;`&L'[i]) {`.h(i++];`'>$new Set(`#Z!`.\\)exclud`&b*`+<!`(^6`.:6`!C#`2/\"`#\"$`'k\"(i, 1)`,Q%rue;}`(+(animat`!:*params, ms, easing, `/O$) {(`+e!` 1$\"` P$\") || !` 2\"`,-!`0#% =` a# || null`'q\"`383,`\"V!len,`36!, set` A#, collector;if (!len`0O,`!,%`!=!` G$`++,!--len &&`\"1%`1k\"set`/!!`!i#=`.1\"`\"E$str`\"8!?`\"($:`!F'`'`!nim` P!`#R\"ion`#82` M$);item`\"Y)[--i]`$0$(anim)`&J$i--`-t, && !`.(*removed &&`3h*` l$With(`#T\"anim,`!p!);` OD|| len--`'\\%`.{,`.#\"Afte`#h*`&v!`'R$`08.`\"*6` f((`(c!`!#3getBBox`$|,var x`.\"#y`.*#x2` )$` #\"`,$\"`!D6 i--;`)(#`\"c2`!\"#b`!;!` 4*`!Q#();x`-\\\"box.x);y` $&y);x2` 2' + box.width);y` 0'y` 4#height);}}x`1,!in[apply](0, x);y` $.`! !`1W#` A(2);`\"b!` )+y2`+0%{x:x, y:y, x2:x2, y2:y2, `!\\!:x2 - x, `!N\":y2 - y}`4R*on`+X*s) {s`##$paper.set()`#|*`-5)`$#+`-;)`2N#`#k*`!1!()`%h&`%b)toS`*+!`%`,` E#\"Rapha\\xEBl\\u2018s set\"`&D)low` Q)glowConfig`%H#r`,S%`\"7)` ,!forEach(`\"i'hape,`3R\"` Z#g = ` 2!`!(!` u(`-=!g !=`.-\" {g` Z42` l#2`\"7\"`#$\"` 4\"`-(!}}`% %ret`))sPointInsi`1^+x, y`*($` 5,alse`\"+4`*a!if (el` p*` l\") {` _,`1p!`!X#` u\"`!e'` @);};R.registerFont`!e)font`)z$font.face`%%&font;}`!o#nt`&r%` '\"|| {}`/^!fontcopy = {w:` d!w, face:{}, glyphs:{}}, family =` O!`!*!['font-` 3\"'`+k'prop i`!@\"`!Q$if`!o\"` T\"has](prop)) {`!=$` 5\"prop]` z)` -!;}}if `(-\"`\"!![`!2\"]`.9$` ()`%P\"` q$);} else` 60 = [` @$];` !`#K\"svg`!K-'units-per-em'] = toInt`\".'` 3+, 10`*Z'`#K!`\"q%`#X\"`\"p(` ,\"`\"x\"` '!)`&o#path`\"l$` >#` \"!];`!X%` *)`$j\"path.w, k`$h!d` *\"`3G!\"M\" +` q!.d.replace(/[mlcxtrv]/g,`&A'command`&4&{l:\"L\", c:\"C\", x:\"z\", t:\"m\", r:\"l\", v:\"c\"}[` U#] || \"M\";}) + \"z\"}`*L!`!<!k`#b!`\"{#k in`!R\"k`\"r#path`\"l\"k`%`)`\"C).k[k] =` S#[k];}}}}}`-b$`()\";`,P!`3U%`(b.`%M!, w`/t!, style, stretch) {` ## =` ,$`\"1!normal\";` J!` 7!yle` -)` k\" = +` u#`)=!` 8\":400, bold:700, lighter:3` /$er:800}[` T\"`#D!400`#:!!R`'F\"`$1%;}`*-$ = ` 6#`'a$` L\"`+1#var name = new RegExp(\"(^|\\\\s)\" +`*H#`%Q'^\\w\\d\\s+!~.:_-`%^!E`$h!(\\\\s|$)\", \"i\"`'b'fontName in`!D$`$l#`!R$`$q!` ?$`-i!f (name.tes`(p\"` 2$`\"$,` 4#];break`%)!var the`%'!`(j$`&/(`3v(`(d!`3f2` \\#` >#[i`#3\"` /#`-,(`$+\"'] ==`$o$&&` 51`%M!` C\"`%T%!` .6) &&`\"\"$` 1*`&P!` a$`&n$`\"Y%`'f#`\"\\$`'c)pri`'_+x, y`'X!ing,`\"G!, size, origin, letter_spac` ?!line` &$) {` A\" =` I#`'m!middle\";` M* = mmax(mmin(` ,+|| 0, 1), -1);` w(` H*` -(|| 1, 3), 1)`2\"!` n\"s = Str(`\".\")[split](E), shift`%:\"notfirs` '#`.2#E, scale;R.is`%u!, \"` b\"\"`$*!` /!`3>$`+6#`&<\")`&A(` `! = (siz`%\"!16) /`3'(`02*`!y!bb`2C(.bbox`!t$separator), top`+>!bb[0]`$(\"H`+Q$bb[3] - bb[1]`\"H#y`\"<\"h`+s&` 9! + (`$S$= \"baseline\" ?` g(+ +`!H'descent :` 7(/ 2`*C'`(r(`$(#`(j3if `%>#s[i`'G!\"\\n\") {`$<%;curr` $!`$A(;`\"/#+=`!:(*`&j);} else`3.#rev =`%'&&&`34)`!;% - 1]`.4!{}, `!5#` 51]]`!?\" +` l'? (prev.w ||` Q\"w) +` .#k &&`!D!.k` [(`'r!)`#\\$w *`(~+ :`\"O*1;}if (`!W!&&`!_!.d) {`':!+= R.transformPath` D!.d, [\"t\"`'v$*`']\"`%U%` '%\"s\"`'x#`'#`&G!`%r$, ` _!(x - top) /` =$(y -` >#` -%])`+})is.path`4`!).attr({fill:\"#000\"`+{!oke:\"none\"})`,G*add`,F)json`0Z%is` +!, \"array\")`20#res`)`$set(),`&n)json`&q#, j`'9\"`&q,j` A#[i`%N#;eleme`1i%j.type`*r!res.push(this[` 3\"](`\"C#j));`\"c%res;};R.forma`.\\*token, params`!#args`2K!is(` 3\", `\"C!) ? [0][concat]` 6#) : argu`!a!;` l! &&` Y\"` x#`-O# &&` x!`\"^# - 1`1q\"` O!= ` #!.replace(`!h\"rg,`!d'str, i) {`\"3#args[++`*%\"null ? E`!J\"s[i];}));`%I$`! !|| E`\"f\"ullfill = (` v&`\"[#` G!Regex = /\\{([^\\}]+)\\}/g, objNotatio` :&(?:(?:^|\\.)(.+?)(?=\\[|\\.|$|\\()|\\[('|\"` 5\"\\2\\])(\\(\\))?/g, `\"I#`*T!`!@%all, key`!)!`&1)obj;key`\"~%`!>,`##(` a!name, quote, ` \"!dN` .!isFunc) {name =` D! ||` 9'`0z!res`'r#` <!i`&+!`#~!s = res[name];}typeof`!a\"= \"`!?$\" &&`!%#`%)!` O%(`&!);` +\"` 2\"`$_#||` _$obj ? all :`!2\"+ \"\"`$l$`'S\"` &#`%W+`#2\"` 5#S`&\\!(str)`#0%`${&`#\"-key` R&`$8$`$%+;`+-!})();R.ninja`$T)`#,#oldRaphael.was) {g.win.` -# = ` 6'is`0Z%window` <'undefined;try {delete ` 9*;} catch (e) {`*U%R`'k!`/F!set`,y!;eve.on(\"r`!4#DOMload\"`\"^() {loaded = true;});`(@'doc, ` ;\", f`\"H#doc.readyState`$f%&& doc.addEventListener) {` #0(` m%`#B,` y\"move` :3, false);`!9, \"complete\";}` +7loading\";}`!0%isL` z!() {/in/.test`\";+) ? setTimeout(` K$, 9) : R.eve`#[.);}` r&;})(doc`.!!, \"DOMContent` ;\"\"`,_%R;}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)` (3RESULT__ !=`&4'`)]!module.` x# =` C:))`#M!`$?%` X\", `!S'webpack_require__`,k#`!\\8`!X;`&_(glob` k#version = \"0.5.0\", has = \"hasOwnProperty\", separator = /[\\.\\/]/, coma` -)\\s*,\\s*/, wildcard = \"*`(E\"`&q,}, numsor`3X*a, b`1j' - b;}, current_ev`%0!stop, ` (!s = {n:{}}, firstD`$8#`!!+for (var i = 0, ii = thi`3[$; i < ii; i++`)]#`/ #this[i] != \"`%6%\"`!\\&` 9#;}}}, la`!*5`!6$`!*(while (--i` YWobjtos = Object.`,U!type.to`/J\", Str =`/W#, isArray = ` #!.` ($||`$ (r`#'r instanceof` O\" ||`!3#.call` J!== \"[o`!A!` ?\"]\";};eve`\"_)`3b\"scope`\"p#e =`$h#, oldstop =`% #args`!`%`\"1&slice`!2$g`*i!s, 2), l`-&#s` o\".` '%`!4!), z`%=\"`-p!alse, l, index`$P![], queue =`'#!out` /#ce =`&\\,erro`!&![];out.`&U,` $'` ;!`%S*` #';` l) = name;`\"d#0;`',1`\"2%`'+7\"zIndex\" in` F&[i]) {`\"M#.push(` 0(.` N\");if ` %0 < 0) {`#!![` -/]`!P(`'!#`!%$sort(`*U#)`'y$` 6#[z]` t#l =`#\"[` 2%++]`#]\"`!i\"`/T#`&\"!`%`\")`!j\"stop) {`#3#`&(#`0-$out;}}`#H!`#D!`#\",l`!j,`#2-`#P#l`\"c$==`%t$[z]) {`!8Fbreak;}do {z++;`\"@/]];l && ` CM} `#R#l);} else`$E%`$7(;}` 5$` PN}`#R+`'/,ce`#g);eve.` 7\"`)R#nts` 0!`)d(`*w*`*w#names =`,N$` 4#?` 3! :` \"!.split(`1G%),`+G)item, items, k, i, ii, j, jj, nes, ` }![e]`*F&`)-\"`)#(`!D!`(t3n` [\"` O#j` P\"jj = ` H'j < jj; j` N!`!]!s[j].n;`!W!`!=![`!!![i]], e[`3C$]];k = 2`(I$k--) {item =`\"3\"[k`''\"item`!J\"`$k\"` +!;`\"/\"out.concat` 2!.f || []);}}}`!{!nes;}`$F-`#N%`$5)sep`(%#` $\"sep`0}\"` +!.replace(/(?=[\\.\\^\\]\\[\\-])/g, \"\\\\\");` L\"\"[\" + sep + \"]\";`!\"(new RegExp` p!`'C%` 8(/[\\.\\/]/;}`!h\"on`0{/f`3R*f`3U!` =$`3N'`4E)};}`&D8` $([0]`&h'`$_!] :`\"i!` J!`&z#coma`&{&`/?2`&*8(`'mP`!5,`(.4exist`!\"N` ^!.n;` \"\"hasOwnPropert`!E\"`1(\"&& `'Q' || (` $(= {n:{}});}e.f` f!`&w#`)6.e.f`267e.f[i] ==`%0!`\"0! = true;`,T$!` 0\"&&` f!`(B!f);})`!e&`'}%`#g&`2m#` \"+ `/u&` $$) {f`0-%` -%;}}`(`#f`&k)`#q!`$Z#att`-:![].slice.call(argum`$5\"1)`.%$`&t)eve`/(#null, [` p!, null]`*B$` x!)` &$` j50)));`!c$`/U#`! )` -#1` <#`/`!`*c'ub`&g'cur`&e'`0.)) ? ` $).join(\".\") :` ,*`11\"` p%`\"[#(`*j'\"(?:\\\\.|\\\\/|^)`+C!` I\" + ` 0($)\")).test(cur`$t&cur`\"&%`12*`!&&`!`B`!l,`({-`!!#of`'X!ve.unbind`,17!`\"Q#`3&0`(G%`%Q#`+J|if`!X\"`*]$ > 1) {`*[N`\"]\"`) %, f`$%%;}`,0U;var e, key, splice, i, ii, j, jj,`&l#`(<\"s`+B/`!Z8` H!j = 0`4^\"cur` A%j +=`!,#`\"t$- 2) {` .\" = [j, 1]`-[!cur[j].n`#F&[i] != wildcard`,\\$`-P&` a%`,B\"` .(;}`2h$`!\\!key in e` [%has](key)` S-key` Z!}cur`#H!c`+A$cur`#:$);}}`\"v-`\"O(`/v.cur[i];while (e.n`!E#`'K$e.f`#B), jj`/B+j < jj; j`/D)j`/G&.f`!k#(j`-T!`/K&` ]% && delete e.f;`\" \"`\"w$`!L%e.n`\"y&`0'\"n`\"u!`!`!var`)U!`)/!` 0%`%r\"`!p(` ?!`!c7` ;!`!u'` J\"`!l2` `(`!w)`!6%}`%*%`\"5'`!kP` f1`4c$}}`,F#n`'<!`,-0`\"z!2`-c,`*3(, f2`1m&`&8#this, `1.%);`,Y$`-N!on` O'`!=\"version = ` ##` 1!toString`.|3\"You are running Eve \" +` [%};typeof module != \"undefined\" &&` 2#.exports ? (` #+`.e!) : !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], ` .1RESULT` ?!`%b!`!w,eve;})`#3#`!1#` T3`!'#)` j<!== `\"@% &&`\"$/` D9));})`$a!);},`#r'` a\", `!\\'webpack_require__`%p#`!e8`!a;;`#K>`!%/(1)`#UJR`(\\#R && !R.svg`$-%`3d\"has = \"hasOwnProperty\", Str = `&w\", toFloat = parse` (!, toIn` +%Int, math = Math, mmax =` /!.max, abs` ($abs, pow` ($pow, `2^% = /[, ]+/, eve = R.eve, E = \"\", S = \" \"`3)!xlink`!!ttp://www.w3.org/1999/` ;!\", markers = {block:\"M5,0 0,2.5 5,5z\", classic` +, 3.5,3 3.5,2z\", diamond:\"M2.5,0 5` D!2.5,5` O\"z\", open:\"M6,1 1,3.5 6,6\", oval` Q$A2.` V!,0,0,1` %!` a\"` &*0z\"}`!x$Counter = {};R`*|@r browser sup`(6\"SVG.\\n`+L,Rapha\\xEBl`+^!this`,N$;}`#f!$` z)el, attr`&=#at` \"%`,-#el == \"s`!]!\") {el = $(el)`2$#var `/i#` [+`/h&` .#key.sub` g\"(0, 6)` y!`$z!:` x\".setAttributeNS(` 7!, ` M*6)`'Y!`! \"key]));`1D$` T+(key` :/`1r&`\",!R._g.doc.createElementNS(`&_/2000/svg\", el);el.style`,\\!` %$.webkitTapHighlightCol`(1!\"rgba(0`%W!0)\");}`.:$l;}, addGradientFill`$?+`!R!, g` ;#`,^#type = \"linear\", id = ` G#.id +` I%, fx = 0.5, fy` \"$o` D'node, SVG` )'paper, s = o`\";\",`%U!`#.&get`#.#ById(id);if (!el) {`!5$`,(\"(`!u%.replace(R._radial_`!]'`\"N%all, _fx, _fy) {`\"G$` M\"\"`!$!_fx &&` :#`\">!`-)#(_fx);`\"F!` (&y)`('!dir`.G!y > 0.5) * 2 - 1;pow(fx -`\"x\"2) + ` .!y` ('> 0.25`%1!` y!`-?!sqrt(` 3!-` L\"` Z') *`!-!+`!&\"&& fy !`#}!` \\&fy.toFixed(5)` W!00001` U\"`%b&E;});`#L'` #$.split(/\\s*\\-\\s*/`$!\"`#,\"`%X&`%q#angle` Q)hift();` 1$-`#+%` -!` g\"isNaN` *#`,=&null`1I\"vec`/z\"[0, 0`0k\".cos(R.rad` Q$` 1#sin` **], `1.\"1 / (mmax(abs(` o\"[2])`1?!` ($3])) || 1);` 9% *= max` )$3` (%if ` ^& < 0) {` )#0]`\"I!` 5%` c'= 0;}` P'3` L+1` N)3` R%3` T#`\"o!dots`(I\"`3d!Dots`'}&`(D\"dots`#?,`*#!id`(?%/[\\(\\)\\s,\\xb0#]/g, \"_\"` [\"`)d$`%M%&& id !`)|&`$~%id) {SVG.defs.removeChild` T-);delete` S-`\"m\"!` ?-`08%`&N!+ \"`,e$\", {id:id});`!Z-= el;$`1I!`'\"%`*7# ? {fx:fx, fy:fy} : {x1:`$P%, y` %%1], x2` &$2], y` %%3]`-n&Transform:`!C$matrix.invert()});`\"w%append`\"x$);`2M%i = 0, ii =`$|!.length; i < ii; i++`2.\"` W($(\"stop\", {offset:dots[i].` )\" ?` h!` &': i ? \"100%\" : \"0%\", 'stop-color'` Y%` *! || \"#fff` =%opacity':isFinite(` y%` 4\")`!)(` -\" : 1}`3$\"$(o, {fill:fillurl(id), ` C#:1, 'fill` ~&1});s.f`1z\"E;s` l%= 1` 2#O` ''`'m#1;}, isIE9or10`2M)`,J#mode`#h!cu`$Q!d` \"#Mode` ^$` ?!&& (` G\"== 9 ||` T#== 10);}, `\"##` y)`(3!`,}\"`!>#(`,w'\"url('#\" + `3N!\"')\"`-,\"loca` ]!`!P'` ,$`1$!` %$String =` (%.protocol + \"//\" +` 1&host` $(pathname` ((search`\"S$`!\\\"` Y(`!*#+ \"`!h,, updatePosi`!u#`\"_&o`#i#bbox = o.getBBox(1);$(o.pattern, {` ##`(g&o`([, + \" translate(\" +` r!.x + \",` &%y + \")\"}`$8!addArrow`!G*, value, isEn`$C$o.`+)%path`23$` E!s = Str(` (!).toLowerCase()`3##\"-\"), p`\"@!paper, se =` }\" ? \"end`)0!start\", n`&]\"o.node, attrs` +!` %!, stroke =` 4\"['` *\"-width'],`+0!`!W\"`+(#`-+$ \"classic\", from, to, dx, refX`!$\", w = 3, h ` \"!t = 5;while (i--) {switch `\"N\"s[i]) {case \"block\":` '\"`!$$` (#oval` $$diamond` 2%pen` $$none\":`!i#` y%;break;` =\"wide\":h`!T!` ,(narrow` 4\"2` -)long\":w` A-short` 3\"` I$default:;}`1:!`%1%`!_!) {w += 2;h ` \"!t` (\"dx`+^#fX`$n'4 : 1;attr =`,v#`\"9\"`$[$:`$\\!.` '\"};} else {` `#` p!w / 2` V*` I(` a%` s\"}`3.\"o._.`\"g!s`+d%`'H\"` /&.endPath && markerCounter[` 2.]--;` (*M` M!` <<` @\"]--`\"1%` 5'`'h!`!!=` =%`!5+` 3!`!#?` ='`!C!`!7. = {`#0#`%'!!=`&]#`*?#pathId = \"raphael-`!'\"-\" +`(r!,`!7#` ,5se` C# + w + h + \"-obj\" + o.id;if (!R._g.doc.getElementById(`!;\")) {p.defs.appendChild($($(`,.#, {`*b$linecap':\"round\", d:`!K\"s[type], id:` s\"}));`#1*` 2\"]`'M!`#($` -1++`1V\"` 7\" = `!k4`\"y$), use`\"I\"` .\")` s$ = `\"'!` (\"`\")!i`!m$Id`#\\$Height:h` ($Width:w, orient:\"auto\"`,i\":`,n\"refY:h / 2});u`.T!`!$!use`#.\"xlink:href':`1}\"`\"9\",`0l\"`1-!`([\" ? \"rotate(180 \"`$k!/ 2`1:!\"`$u!` '#) \" : E`1T!scal`1N\"w / t`1J%h` &$)\", `/6*:(1 / ((` I$` F!) / 2)).toFixed(4)}`$R$`%F)use);`%X/`#j#`$~+`#Z$`$s8` ;%++`#;#`!0#`$}&sByTagName`#S#[0];}$(us`1z#);var delta`,u\"*`)%'`0'$ &&`(C\"!=`0I#)`%h!`,W$from`2d!`*2*` i!`2n#|| 0;to`&h!getTotalL`2`!(`-r\"path) -`!D#` P$`\"Q%` |#` /+` M@`.K'.end`!E,);}`/>$}`/K![`'e#`*}#] = \"url(`&^!`+J%`%[!`\"`!to ||`4R!) {attr.d`!M$Subpa`!D),` D!, to);}$(nod`#%`!]&[`,5!\"Path\"] =`'q#` /.`-z\"` >!`!P$` 3.dx` <!`#4!` ,.Type` ;!type` -.String` <!valu`$%&`$Ftfrom`%$,` 4B`$e>`#I4&& `$\"${d:`$7>});delete`\"H'` e)` &5`$I$` (5dx` \"7`$F\"` &5`$D$;}for `!v! in`3u*)`$T\"`+9*has]` J!) && `/z#` 5$attr]`3l#item`0S7`'A\"` @!&&` H!.parentNode.remove`--\"item);}}}}, dasharray = {'-':[3, 1], '.':[1` %#-.` 2#, ` )&` &*` 0&. ` T\"3` B! ':[4` %$-':[8` 1%.` 4#` V!` :#.` ;#` ')` '*` 4#}, addDashes = function (o,`(H\", params`#:!lue =`\"D&[Str(` 1!).toLowerCase()]`+P!` 4\"`#q\"`17!`(|!`&j![`1F*] || \"1\", butt = {round:` 9!, square` &$butt:0}[` [,linecap` g\"`!o\"` *.` 8!0`$L\"`\"M![], i`*s$.l`)Q!;while (i--) {` E\"[i`+8%[i] *`\"+#+ (i % 2 ? 1 : -1) *`!]!;}$(o.`)K#`!?$`#1%':` p\".join(\",\")})`+*%` ;:\"none\"});}}, setFillAndS`+!\"`$T+`$Q'r node`#~!`/(&s`$)&, vis =` A!.style.visibility;n` \"0 = \"hidden\";`)k!var att in`!0&if (`$'#`)]$)` 0#!R._availableA`$h!` 7(continue;}var`#u\"`0d!` g!att]`2F!` %\"`/T%switch`+6!) {case \"blur\":o.blu`'($;break;` :\"title\":var ` &!`\"^$`*r&sByTagName(` G#)`32\"itl`%n$ &&` *# =` b\"[0])) {` ?\"first`+6!`#{!V`\"(#`1E*` W$$` }&`\"U#`,H(createTex`,1!`\"*$`!!\"append`,=\"val)`$T\"` *(` C!);}`\"V(href\":`\"g#arget`\"i\"pn`\"d$`-<&`\"T!pn.t`\"k\"`*L* != \"a\"`&K#hl`\"&\"a\");pn.insertBefore(hl,` u!);hl`!S)` /\"`!5!hl;}if`$h! ==`!R%) {pn.setAttributeNS(xlink, \"show\"`,V#` P!blank\" ? \"new\" :` 5\"`)%&` R5att` a#`\"+cursor\":`(*'` -\"`$g%`&1)ransform\":o.` $%`&T0`2f!-start\":addArrow`.a%` 80end` 7/, 1` ?*clip-rec`$o#rect = `/3'split(separator`'W\"rect`'T$== 4) {o.clip && ` $\"`2q(`2q3` 8-`'M\"e`%T#clipPath\"), rc` .\"`!e!);el.id`'s!`'k\"UUID();$(rc, {x:rect[0], y` %\"1],`.p\"` )\"2], height` *\"3]}` o!`&@(rc);o.paper.defs` 0)el);$`&j!, {'`#?!path':\"url(#\" + `!]\"+ \")\"});`\"w#= rc`'2\"!`2W(pa`2]!`+R$`&H%`\"^\"` v!`+O#path` N#` j#`*R%`,)&ById` E!.replace(/(^url\\(#|\\)$)/g, E));`$I$`$?,`$8(clip`\"53E});delete`%,#;}`')`!r!:if (o.typ`)-\"`\"&\" {` i%d:`)J\"?`*'!rs.`\"f#R._pathToAbsolut`,e$) : \"M0,0`#Q\"_.dir`1+!1`\"|!o._.`'|!s) {\"`(L!String\" in ` 4& && `(2(` 0&.` J');\"e`3<!` 4I` J%`))!`\"g*`&a!`*x$`$(`+G(`\"%.`\"u\"fx) {`--! \"x\";`2P$` 7\"x`,N%`!*\"}`!+\"x`#}\"` V'` O$-` Q$ -` 8$`!Y! || 0)` X$r` W&`$\\!rx\"`*?\"`$j%`)N\"`!(+cx`\"#>pattern && updatePosition(o`\"T,`1E)`)u!`\"kUy`#:&y`#4,y`#.2y`#7)y`#1/y`#:&`!Y\"`#6+` X&`#-\"y`\"By`\"Lur`)I-`!:$`)Q%rx`)U\", ry` $\"}`2q&`!9:}` 6src`!*-image\")` c/`4S'href`4V$`3g+stroke-`(u#`*_$sx != 1 ||`)X!sy` *!`$T%/= mmax(abs` H#), ` $%y)) || 1`/(\"`0!$_vbSiz`/1\"lue *= ` ,+;}`\"\\:`%%['`!o#dasharray']) {addDashes(o,`&6\"` 50, params)`!W$`,3~`,fK`$,/`!w%\":`\"9)`&>#`\"*$` N(fill\":var isURL = Str`0\"#.match(R._ISURL`#U\"` B!) {el = $(\"`(7#\");` `!g` 0\"`&I#;`4>\"= R.createUUID();$(el, {x:0, y:0, ` _#Units:\"userSpaceOnUse\", `*L\":1, `&]!:1});$(ig` W)'`'C!:href':`!b![1]}`!?!append`3j\"ig);(function (el) {R._preload`\":\"[1], ` :&`&i!r w = this.offsetWidth, h` (*H`!f!`\":$`!i\"w`!y%h`!o&` '0});})(el`+q\"per.defs`!r)el);`+8%fill:\"url(#\" + `#h\"+ \")`4U\"`,R$= el`,I<`-P#var clr`$N!getRGB`%F#`%8!!clr.error) {delete`&/#.gradient;` 0#`/%\"` -%!R.is`/9#opacity, \"undefined\") && ` ?!` i#` ,5`\"T%` ;#:` h)})` (['fill-` 5#']` v9` +>`!2%` <*`!<\"` O,`/A&if (`.a(circle\"`-q\"` -%ellips` 1\"`)9'charAt() != \"r`!B\"addG`#R#Fill`*:%)) {if (\"`!>#`+W!`!X! ||`*F\"`!X$` 1&`'V#`$B$`%5!_g.doc.getElementById`\"X!.g`.L(`+9\").replace(/^url\\(#|\\)$/g, E)`%r\"` u$`!%#stops =`!+%` ~'sByTagName(\"stop\");$(` K![` Q!.length - 1], {'stop`#&`\"F0?`&d#` 3# : 1) * `!v\"`\"].` H$`$_,` S!});}}`'L* =`#v\";` 1\"fill = \"none\"`(m$clr[has]`!U&`%r9clr`!e%> 1 ? ` &(/ 100 :` ((})`/{)\":`)l2`3!3clr.hex);att`&e!` _# && `!Y=`13#`!?Y`4K#`!,,`2r~`37Y`%9$\":`):~`$Z!`!1(`$&$:`#5#`&e(&& !`'=\"`$T\"`$5*\")) {`$F6`!'!`$S#` &\"`$L$` )!});}`!<\"`(Q)`!4/) {`*Q~`!\"\"`*Vu`\"J%`*!#default:`'%$font-siz`'*\"`$p\" = toInt` (\", 10) + \"px\");`3X!ssrule = att`\"<&(\\-.)/g, function (w) {return w.subs`&d!(1).toUpperCase();}`*2$tyle[` y#]`,/%o._.dirty = 1`*L4`&6)}}}tuneText(o, `2x\"` y(.visibili` p!vis;}, leading = 1.2, ` Z$ =`\"('el` f%`1d\"el`(?\"!= \"text`(=!!`4)$`':\"` 3!) ||` T#` 0#font\")` \"1`$.\"` *.x` =/y\"))`#`%;}var a = el.`'K!, node` +\"`(N\"fontSize =` 6!.firstChild ?`%4#`'e%`%j#View.getComputedStyle`'v\"` T&, E).getPropertyValue`\"#)`&'\": 10`'}!`\"r/) {a.t`#p\"` 9\"` )!;while `!\",) {` -!remove` .!` 2-`\"l\"texts =`,W!` m').split(\"\\n\"), tspans = []` &#;for (var i = 0, ii =` h\"`)3#; i < ii; i++) {` R! = $(\"` &!\");i`1,\"` *!, {dy:`#z%*`&N$, x:a.x});` B!.append`\"-\"`$%%creat`&p!Node(`!B![i])`'T#` H(` a!` f#s[i] =`\"*#}} else`!b#s`%=$`+\\2`!z$`\"a!`\"U)` X!`\"L3if (i`/ !`!6%`\"5>`!O$` L%0` N#0});}}}`/i%` L!, y:a.y});el`*r)var bb`'i\"_getBBox(), dif = a.y - (bb.y + bb.height / 2);dif && R.is(dif, \"finite`21\"`!G-dif});}, getRealN`)!\"`+\"&node`\"g#`#^!paren`$U! &&`#p\"` )&.t`#n\".toLow`-S$ === \"a\"`-&` H+`#.%` 4';}}, `$f#`!@-, svg) {var X`$k\"Y = 0;this[0`%c!his`+&!`%U#`&7\"raphael = true` J!.id = guid(`&[#` >#` 3!` ;#;`!7%` C\"`!b%(\"0000\" + (Math.random() * ` +!pow(36, 5) << 0).toS`0[\"36)).slice(-5);}`!%!matrix`4E!` %\"()`!_\"realPath = null` /\"paper = svg` +\"`-g!`!n$` '\"|| {}` 8\"_ = {transform:[], sx:1, sy:1, deg:0, dx:0, dy` '!irty:1};!svg.bottom`3_!` $'`!(\"`!`#prev`!K\".top;s` \"\"` J%top.n`-R\"` O\"` 9$` *\"` ^\"` :#`\"B!}, elproto`\"o!el;`%L#.` 0!`1p!=` ;$;` D#.constructor =`%}$;R._engine.p`#C\"`&*&path`$1\", SVG`&3#`%c!$(\"path\");SVG.canvas && ` $&`,E)el)`)y!p = new`!5$`3n!SVG);p`3d\"= ` q\";setFillAndStroke(p, {fill:\"none\", s` 3!:\"#000\", path:`!g&});`&d#p;}`\"Y%rotat`){*deg, cx, cy`*)#`&2#moved`'H&`$$!}deg`1\"#deg`0y$separator)`2U!deg`-u# - 1) {cx = toFloat(deg[1]);cy` &+2])` x$` +(0` E#`%4\"`%n!` k!cy`!(\"cx` 3%|| ` @&`$F#bbo`!9!his.`-j$1);` ^!bbox.x`-g!ox.width / 2`!U\"` /!`.#\"ox`. '`)K#`(G%`#)\"_` '&.concat([[\"r\"`(Z!`#X$]])`$-%`#I\"`$0%scal`$**sx, sy`#pGsx`$3#sx`$\"3sx`$**s`#w(sx`$1\"`$@(sx`$1!`$>)sx[3])`!(#` *'0]);s`$:*` {!sx`#lp}` ^\"` R&?`$V4 : cx`!}\"`!<'` H#`$m/ : cy`+l\"`$_As\", `$>*`$l7` \\!l`)2-x, d`(yA`${$d`$k4d`$t+d`(y)`$}\"` a\"` *'0]) || 0;` I!+ dy` )\"`\";Ft\", `\" \"`\"=<form`\"P)tstr`%%#_`%!$_`\"'!tstr`%C'` n#`!6';}R._extractT`!Z), ` r!`!|\"cli`1&!$`!|\"clip,`2E(`3W'.invert()}`1q$attern && updatePosition` g!` >#node` v'node` i4}`$A\"_.sx != 1 || _.sy` (!`\"`#sw`4>)[has](\"`/i\"-`'S!\") ?` 6('` 1('] : 1`!T\"attr({` 1*:sw});}`$.2hid`&n*`&o#!`&h+`\"@%.style.display = `1Y\"` h4show` A[` c5` X\"` n,var `$<!= getRealNode`$@&`$+\"`!3( || !`!7!parentNode`&W%;}`4b!aper`$>$` (!;` .!.__set__ &&` >\"` )$.exclu`!1#);eve.unbind(\"raphael.*.*.\" +` n\"id`!M'gradient) {` o\"def`!f$Child` 8+`(3!tear`(%#` P!);`\"$+` T)`\"d\"`\"['Data();for (var i i`#k\"`$6#[i] = typeof` 3!` ,!= \"`#u$\" ? R._`#M#Factory(i) :`*,!`3@#`#k$= true`$b'_`/f#`%Y0`%D5`&V$`%y$show();var `'R#`! \"var canvasHidden = false, containerStyle`#y&`#r\"` N\"`#=#Elem`$/\"` G*`%J)` >1`!q\";} else ` h8`&T#` XE`$s!` w#`3X!` K*&&`\"2+`#&1`\"k+`#.!` ?4`)J!`4='{};try {`4K(`$E!`4T$);} catch (e)` ?%{x`-_\"` F!clientLeft, y` '-Top, `,e!` *-Width, `4f\"` --H` 2!};} finall`!\\&` \"!|| {}`%,!`\"T(`#l-`,w/}`&7!&&`\"H\"hide(`2Z%bbox`'K'attr`'E)name, value`'Q(`-?&`,~)if` L\"`2k'var res`#u\"`)e%a`)f$`0;\"` o(`0i'a)` |!s[a`*'!` 4&a];}}re`+I& && res.fill`%b& && (` -&` =!`,B&&& delete` +);res`4X&`!/$_` )&`#2$re`\"J#`\"x!`\"J$ && R.is`#2#\"string\")`\";#`\"u$\"fill`![!`\",&`!j/` 2'`.9'`#h'` .+`#t*\"`!k%\"` G+`\"#(`(9!nam`$?!name.split(separator), out`$R+i = 0, ii` N#s.length; i < ii; i++) {`!F\"` =\"[i]`';!` /!`%0,out[name`${+` .!`+~(`#X!`+S(ustomAttribute` K#,`/]')` j0` A8.def`!+$` M)R._availableA`!S(}`#V#ii - 1 ?`#,!: ` T$s[0]]`%J?array`!h$`#f'`#],`#U3`!'$[i]`#9)` z![i]);`!`$ou`%d#`!I\"!`)a)param`)j#` &\"`\"X%` J!`$\"(`$f!` X#`!~,object`\"*!` j%name;}`%}%key in`!+#) {eve(\"raphael`!v!.\" +` A!+ \"` '!`\"0!id,` $!,` S#[key])` q#` m#`$k7`+b(`%13`+z!key`+!!` ~#` ')`&F=key`&U-`#W#`&E;key].apply` |!, [].concat(`\"C();`(<'key] =`\"c(`)a&sub`#^&`\"U#par`\"*\"` 7\"`$:&[` +\"` f#` &$;}}}}setFillAndStroke`!W#`$V#`-O$`0#\"`0h%toFront`0g)`0F?`,/!ode = getRealNod`!,\"`3.!);`34!parentNode.appendChild(` <\"`\"W!vg`#a);svg.top !` 0\"`$e\"_tofront`\"+#svg`!u6Back`!<n`%S#`\"&# =` J!`\"4';`\"?'insertBefore`\"F!`#!` 6$first`\"b!);`\"5!back`\"2#`\"^&`\"g3`\"?2`!+\"After`\"M)elem`1L\"`\"Q, || !` 5&`\":Oafter`\"e#` ;(` n#` E! || ` )#[` 0$`-T\" - 1]` g#if (` e%.nextSibling) {` .&`#B:` J2`0;%` R1`&_.}R._` w\"` L!`$.#`!s#`$0*`#m8`!T\"`#(~`$##b`!*!`#`G0`#r$` P&`#@;` ?&`'/!` <\"` /\"`\"SNblu`&y*size`.V#t`'h#`%P!+ size !== 0` 9#fltr = $(\"filter\"), ` i#$(\"feGaussianBlur\");t`.X\"`!+$size;fltr.id = R.createUUID();$(blur, {stdDeviation:`!>#|| 1.5})` Y\"`%o(blur);t`0F#defs` 2)flt` :!_`\"O$ltr;$(`$0\", {`\"\"\":\"url(#\" +` <!.id + \")\"}`':&`%t!` a\") {` ##`$L(`&+\"`!0\"` A$;delete ` )#` %&`\"n&;}`!F\"` Y#`2?%`#Y&;}`$a$;};R._engine.circl`'Y*svg, x, y, r`$K#el`$6\"` H\"\")`/\\!canva`/W!` $&`#))el`'V\"res = new E`&;\"(el`/w%`3U# = {cx:x, cy:y, r:r, fill:\"none\", s`2j!:\"#000\"}` U!type = `!O$;$` t!` k%`'3%res`\"H)rec`2~*`\"H'w, h`\"G.rect`!_t`\"Q!`\"P!width:w, height:h, rx:r || 0, ry` \"%`\"QD`!r!`\"NEellips`%36x, ry`\"j+` M#`$Q~`\"e\"`!>!:ry`\"9F`!Y$`\"=Eimag`\"Q/src`%W(`\"X+` P!\")` ~#`$U:preserveAspectRatio`\"\"#});el.set`)w%NS(xlink, \"href\"`!C!`%f~`!c.src:src`#N*`\"P\"`#14tex`(m5text`#4+tex`(!~ 'text-anchor':\"middle\"`!K\":text, 'font-family':R._availabl`.2!s[` 3)]` H$size` 46` 9!]`&&`'1#`'?\"`'#/`\"h!;setFillAndS` S!(res`&@setSiz`'7*`$o!`$j$) {this.` 0! =`%+\" ||`4R!` 0\";` &!` I\" =` Q#` :%` )\"` >\"`$9#`'+((\"` _!\",` f')` 37` i\"` G$`!]#;`3(!his._viewBox`!o$setV` ,\".apply` A!` V#` C%`2G&hi`\"q*creat`\"p*`&e#con = R._getContainer` }#0, arguments), c` 7$ =` R!&& con.` .%, x` 4\".x, y` $#`(t$` (#`$')` -#`#S#if (!` d%`\"T!row`'e\"rror(\"SVG`!:'not found.\");}`\"'!nvs`(t\"svg\"), css = \"overflow:hidden;\", isFloating;x = x`1!!;y = y` %\"`%W-512;`%I/342;$(cnvs, {`+5$` \"!, version:1.1`+Y%`\"Z\"xmlns:\"http://www.w3.org/2000/svg\", '` ?\"`-H!'` 801999/` :!\"}`%u\"`$7'= 1) {cnvs.style.cssT`,9\"css + \"position:absolute;left:\" + x` ;!x;top` +!y` *\"\";R._g.doc.body`,3)cnvs);`#M& = 1;} else`! Crelative\"`!}*.first`! !) {` -&insertBefore`#y#` ?1`!;&`'R(`!i+}}`'Q(new R._Paper;` M&`%F)` -'`%G+` /'`/O#=`&u!` ,(lear()` ''_lef`()#` *$top = 0`#H(&&`\"m(renderfix`*(,}` n(` =%(`-t%` 4%`-s,`+\\#` c)`1x\"w, h, fit) {eve(\"rapha`4U\"` O#`,e#`,&+, [` S+]`2#\"paper`/-#` M!g`/=\"(), s` 1\"mmax(w /` B&`+7%` ()`-w#, `#-\"` i!top, aspectRatio = fit ? \"xMidYMid meet\" :` -!nYMin\", vb, sw`&]!x == null) {`.m'bSize) {`!]#1;}delete`\"O$` ;!;vb = \"0 0 \" +`0(' + S` )$`%h#`&x$` T( =`\"_!` a\"x` N#y` V#w` )#h;}$`!P\"`&B\", {`#n#:vb, preserveA`\"[&:`\"f'});while (`\"%!&& top) {sw = \"`4P\"-`2.\" in top`3}\" ?` \"&['` <('] : 1;` 6$({` 0*:sw})` 9!_.dirty`#9!` %'T` )$ =` ~!prev;}`&!) =`&!*!!fit]`'P$`2N%prototype`(*6`0E'`#6)`)f$`,I\", pos;try {po` 2%getScreenCTM() ||` 1\"`3_\"SVGMatr`)+!} catch (e)` T)` 7/var `*]#- pos.e % 1`'K$` -\"f % 1`&w!` E!||`$L#` *$`3/!is`+D%`',#` )!+` y!)` ]!s.` :#` 3)`/\\!}`'e!` q!` 7\"`!:\"` c#top +`!/\"` b\"`)&'` 6#` `\"}`#x*`-+!`#r,R.`+<)` ?!`+=#`*|\"c`$.*`''$c`0#+.remove`/H#`/m*` Z!bottom`*n' `*2\";`\"0\"desc = $(\"desc\"))`03)`2I%`$N\"TextNode(\"C` +!d with Rapha\\xEBl`*K!R.version));c` b)`!)%` \"3fs`!C$fs\"))`'=-move`#9,`#:)` =\"`#?%`#5'.paren`!y!`*I!` %1`#@)` 8');for (var i`*j!his`%]#[i] = typeof` 3!` ,!= \"`!]$\" ? R._` t\"dFactory(i) :`$!\"}}`%*!set`\"E! = R.st`!'&method in el` =!`'l#` '#[has](` ?\") && !` b$` -)) {` /%` -\"] = (`#@&` /\"name) {`+K#`+\"-arg = arguments`+n(.forEach` h'el) {el`!)#name].apply(el, arg);});};})`!^$;}}}`&\\!ly(exports, __WEBPACK_AMD_DEFINE_ARRAY__)` (3RESULT__ !== undefined && (module.` x# =` C:));},`\"^'` X\", `!S'webpack_require__`#&#`!\\8`!X;;!(` B8 = [`!%/(1)]`\"P<`%')R`&$#R`%s!R.vml`%4%`.n\"has = \"hasOwnProperty\", Str = String, toFloat = parse` (!, math = Math, round =` 0!.` (!, mmax` +$max, mmin` (%in, abs` ($abs, fill`!/\" = \"fill\", separator = /[, ]+/, e`+$!`.@!, m`\" ! progid:DXImageTransform.Microsoft\", S` E!\", E = \"\", map = {M:\"m\", L:\"l\", C:\"c\", Z:\"x\", m:\"t\", l:\"r\", c:\"v\", z:\"x\"}, bites = /([clmz]),?([^` &!*)/gi, blurregexp = /`!^$\\S+Blur\\([^\\)]+\\)/g, val = /-?[^,\\s-]+/g, cssDot = \"position:absolute;left:0;top:0;width:1px;height` &!behavior:url(#default#VML)\", zo`0U!21600, pathTyp`\"*!{path:1, rect:1, image:1}, oval` >%circle:1, ellips` =\"path2vml`/?)path`(T#tot`\"D\"[ahqstv]`#$!comma`&!!R._`!H!oA`\"A$Str` [\".match(` ]!`-K!(` F-2curve);` |&`$*!/g;if` D'` t/`(C!` u2`!s#r`\"R!` 9&replace(`%B!`+=(all`\")%`-H!s` [#vals = [], isM`2K\"` A#.toLowerCase()`1!!m\",`!-#map[` A#];args`!3%val`!.(value`*S#` {#&&`!2!.length == 2`*d!s +=`!K\"+` t(`!3# ? \"l\" : \"L\"];`!o%;}` g!push(`*E!`!,\" *`&*!)`/p!`0R#` }!` |!` '*`+w\"pa`\"Q&`#I\", p, r;`\"K\"[]`4*(= 0, ii`+!`\"!#; i < ii; i++) {p` 8![i];r` \"$[0]`#G*;r`\"8!z\"`%v!r = \"x\")` &j = 1, jj = p` %j < jj; j`!#!r +=`-+\"(p[j]`\"Q$ + (j != jj - 1 ? \",\" : E);}re`#)$` (!`\"`$.join(S`1?!compensa`$`!`(L(deg, dx, dy`%|#m`'g!matrix();m.rotate(- ` G!0.5, 0.5`#i%{dx:m.x(` ^#, dy:m.y` ($};}, setCoords`)f*, sx, sy`!:$, deg`2Y$`\"!_,`!K!p`!I#`/?\"po`3u!.` %#, o` >!node, s = o.style, y`#k\"flip`.k#dxdy, kx =`,:\"/`!>!ky` %'y;s.visibility`1}!idden\"`*=!!sx || !sy`2C'o.c`\":!ize = abs(kx) + S +` (\"y);s`#C\"`#{\"deg * (sx * sy < 0 ? -1 : 1)`!\"!`\"_&c`'B\"`$V%`$F);dx = c.dx;dy` $\"y;}sx` m!&& (`\"V!+`&b#`!##` +) y\"`-$\"y = -1);s.`#(#flip;`\"3#orig`3Z!dx * - kx`\"7#dy` *\"y`!q!`$6$||`$8#size`\"!#fill`$7!getElementsByTagName` U!`47\");` C#` \"!&&` #![0];o.removeChild` L!`#%\"`!.#) {`\"u2m.x` <$[0]`%z%[1]), m.y` %4`!C\".`2p$`#a# * y`\"U#c.`\"Y!y;}if (`\"D)` U!`%H#` /&[0] *`%L!s`%V%` 3'1` 5%y);}o.append`\"C(}`&j,` )!le\";};R.to`#<\"`(x)`&}% \"Your browser doesn\\u2019t support SVG. Falling down to VML.\\nYou are running Rapha\\xEBl \" + this.version;};var addArrow`!B)o, `/L!, isEnd`1m&u`2S%`0}\"`.,*.split(\"-\"), se =` Y\" ? \"end`0b!start\",`/I!` j\"`.;#, type = \"classic\", w = \"medium\", h` #';while (i--) {switch`2P#s[i]) {case \"block\":` '\"` q$` (#oval` $$diamond` 2%pen` $$none\":`!V#` y%;break;` =\"wide` F%arrow\":h` 55long` F$short\":w` :/default:;}`3%!stroke`)V!node`)J2\"` @\"\")[0];` &\"[se + \"`!P\"] =`#b!` )/`$ \"` =!w` ,/wid` 7#h`0D#FillAndS`!P$`%q)params) {o.attr`/i\"` $\"|| {`&U\"nod`\"'&, a` ;&`0;\"`\"C!`0=#xy, newpath = pathTypes[o.type]`-W!`!/\".x != a.`/|!` ,#y` -\"y` ('`\",!` 1\"` %\"` 1&height` 6\"` %#` 3&c` x#c` t(c` z#c` v(r` C#r` >(r` C#r` =)` -#), isOva`.]!val`\"1.`!3!!=`!B'||`!2\"` *'` v!a` p\"` y%` -\"` Q(`!R\"`!F!` *'y), r`*A!o;for (var par in`$l&if`#f$[has](par)) {a[par]`$;!` 7!par];}`.S!`$U#) {a.`$^#R._getPath`\";$(o);o._.dir`-t!1;}`$+$ref`\"\\!`%O!` )!`!j%href);` &#title` @&` )\"` B%` *!` B&arget` B'` *\"` D&` +!` F%cursor` J!` $%`#k&` +!);\"blur\"`##& && o.blur`&w$blur`2m\"` *#`\"j!` B!`+_\"= \"path\" ||`'k$) {`!]!`'t'2vml(~Str(`#K\"`.[,indexOf(\"r\") ? R._`(P!oAbsolute` O$ : ` ##`#l+if (`!H'image\"`*-!`2g\"pos = [a.x, a.y]` Z!`2~$` 4\"`(t!,`(]%];setCoords(o, 1, 1, 0, 0, 0);}}\"transform`#0-` 1%`#-$` (%`#E\"`(Q\"`1a#cx = +`)_!, cy` %$y, r` 2$`'v\"` %! || 0, r` @$`)T\"` 1&;`#n(R.format(\"ar{0},{1},{2},{3},{4` )#` \"\"x\", round((cx - rx) * zoom)` /&y - ry` &/x +` :4+` >0cx` *$`(R-if (\"clip-rect`#P'`#(#rect = St`&{$['` E%']).split(separato`'5#rect`4S# == 4) {rect[2]`#B!` $$+` $$0];` #!3` 5'3` 5'1]`0.!div`/q$clipRec`.W!R._g.doc.create`2R#(\"div\"), d`0@! = div`0K\";` -\"` `!`$J)rect({1}px {2}px {3` '!0}px)\",`!H!`\"<\"!`!9)) {` l#posi`2C!= \"a`(f#\"`!($top = 0` '$left` $(`1$\"= o.paper` )#+ \"px` Z%`1+#` ;&` *#` ?#`&g#rentNode.insertBefore(div,`#9!);div.appendChild`,}!)` X\"`#Q%`#,!`.z#!`%(0`+p#` H%`-b%` *$`#h\"`#_$\"auto\")` k#o.text`,X#var ` '$S`$G#` 7&`$N#`*5#fon`!%\"` D)` 1\"`.H%fon`.r%['font-family'`3$\"` J.F` :! = \"\\\"\" +`1]$` N*`'g#\",\")[0].replace(/^['\"]+|['\"]+$/g, E) +` e!`!6+size`!*5S`-U\"` >/` W+w`%/!` O5W`%\\$` @1`!B,tyl`!87`$&#` ?0)`+6#arrow-star`+0+addArrow(res,` Z%` D'` T,end` 8Fend'], 1` \\#`%2#opacity != null ||`%J%ill` $/src` \"0troke` '.['` 4\"-`)W!']` '7`!C#` .2fill` $:` _#dasharra` (:miterlimit` *9linejoin` $=cap` :&`)Y#`#;!`.W#get`.?#sByTagName(fillString), new` J#false;` %$ill &&` #![0];!` )$(` F'` E\"`/G\"Nod` m)`.X\"o.type == \"image\" &&`$f') {fill`$w!`*j%src;}`%@(&& ` u!.`/)!true` w\"` +%`%m2== \"none\"` '.`#'%` m&`\"X\"`&}!` -$`!a&fi`#U%isURL`3[)` 8\".match(R._ISURL`!\\\"` H!` $`/d&`!m!ode &&`$A\"remove`/\\\"` i!`$\"!.rotate`\"M#` -\"`#$\"` s![1]` .\"`#]\" \"tile\"`3{!bbox`.u!getBBox(1` k#`2K'bbox.x + S +` '\"y;o._`\")!pos = [` =\",` 7#];R._preload`\"4\"[1], func` n!() {` Y$s`-\\\"[this.offsetWidth, ` ''H`-$!];});} else`#\"#color = R.getRGB`#Z*hex`\"_(E`\"V*solid\"`#x!` I2error`&.!res` Q\"in {circle:1, ellipse:1} ||`$u.charAt() != \"r\") && addGradientFill`-9(` Q!,`(F!)) {a`&[#`&s#;a.g` R#`2h'ill`%1+`&v#`4+\"\"`,((`.\\' || \"` %.`'1#`.H$= ((+ a`,i-+ 1 || 2) - 1) *` A\"`.~%` *1`#L2o` >+;`!1&mmin(mmax(` -#, 0)`06!`).\"` @%` ##`*=&`+\"'`%W$`#<#}}`(^!append`(W(var `08#`-28\"` >\"`$d\"` $?[0]`-q!` r%`$7\"!` )#`-\\#` 5%` >%`-\\'` c%`+ \"`1}*`-V'`23%`,X,`2--`1gK`1a/`1M;`1G9`1A7) {` -\"`/3&;}`\"C+`.u0` 2%`!s&` ]'`/`-` `&0`\"k7== 0`%\"!(`!H(`$[!`%c(C`+i3` 8\");` S&`$;-` q'`&$` i'.hex`(#(`)C#`$A-`(xP` {(`)1-var `\"`! = (toFloat`\"/#`\"u,) ||` p\"0.75`)WA`#T6`$A!&& (`!5$`\"D&`!'$` F4`#?'w`0C! =`!}\");` g\"&&`\",#< 1` I!`!c$*` A$` O11`$V&`+]-`'H6` _'joinstyle`/)%`'|3\"`(\\!\"`!'%`(f&` H.`(|,8`!80`(l!`!?(endcap`!22` G\"== \"butt\" ? \"flat\" :` 0:square` K!` #$: \"round\"`,I\"`,W#`+4&`0{.` 2% = {'-':\"shortdash\", '.` (%ot\", '-` '&ash` ,%` &,` 2#. ':\"` =$` '!` p#--':\"long` (% .` 8#` G$`!%!` ;$` +&` '+dot\"}`$O$dash`%($`\"/%[has]`(R,`.$') ?` B'` .6] : E;}`0G&`1<$`2#(`+p$}if (res.typ`-p\"text\") {res.paper.canvas.`!l!.displ`$ !E`,y\"pan = ` D&span, m = 100, fontSize = a.font &&` ##.match(/\\d+(?:\\.\\d*)?(?=px)/);s =` x!`!2\";` S&(s` %\"` i$);a['font-family`'H$` 8!F` .!`+ \"` 7)` L&`*!\"` I)W`*2$` 4,` L&`!Q!` H)S`$j#` 3+);`\"X'`-`$` ;%ize`)X\"` <%&&` #%[0`-t#0;` |#` `\"` \"%* m + \"px\";`$_!extpath.string`!V\"pan.innerHTML = Str`%+\"` ?*).replace(/</g, \"&#60;\"` ,'&` 0#38` *)\\n` 3!<br>\")`01\"brect`$W$getBoundingClientRect()`!l!W`$`!w = (` O!.r`#s!-` \\\".left) / m` H!H` H!`1*!` 9\"bottom` E%top` C&X` H!x` '!Y` '!y +`'!!H / 2;(\"x`+X'`.6!`+f*&&`(2\"`\"~!v`4U!format(\"m{0},{1}l{2` #!\", `,g!(a.x * zoom)` )&y ` \"-` =% + 1`#-#dirtyattrs = [\"x\", \"y\",`)I#, \"font\",` \"\"`'?#` &%`&y\"` &%`&U!` $&ize\"];for (`!%! = 0, dd =`!+'.length; d < dd; d++) {if (` ;&[d]`.k)res._.` ;! = 1;break;}}switch (a['text-anchor']) {case \"start\":`&Y+yle['v-` M\"lign'] = \"left`'[\"bbx`+e#W`$a!`!*\"` m\"end` ID`&A!` f(-` c-default` JCcenter` f(0`\"d$` F7ker` Z\"true;}}, addGradientFill = function (o, g` 5#, fill) {o.`%j$` \"$|| {}`&,!` ++, pow = Math.pow, opacity, oindex, `/}\" \"linear\", fxfy = \".5 .5\";` c#.`!?$ =`!I%;` )'Str(` '$`*~&R._radial_`!{'`\"4%all, fx, fy) {`!A$` K\"\";if (fx`-U!y) {fx`-'fx);`!a!` (%y);pow(fx - 0.5, 2) + ` .!y` ('> 0.25`*C!` [!m`$<!qrt(` 3!-` L\"` Z') * ((fy` U!5) * 2 - 1) +` +!;`#'#fx + S + fy;}return E;})`\"w(` #$.split(/\\s*\\-\\s*/)`\"G!`4#%`$##) {`$m!ng`0|!` T&hift();` 1$-`0v&ngle` g\"isNaN` *#`)n!`!M!null;}}`*k!ots`,{!_parseDots`$V&` ^!!dot`*I\"` Q'o`&7!shape || o.node` J!dot`+G$`&!removeChild(`'4!;fill.on`'s$` *!method = \"none\"` /\"color =`!_![0]` *\"` 0'2` 4$`!)' - 1` B$var cl`..\"`-8'i`-=\"ii` X#`-4%i < ii; i`-8!` u!i].offset &&` g!.push`\"@!` 1'`%-\"` -$`!8!);}`!_&s =` W\"`!]#?` (\"join() : \"0% \" +`*4!`!u#`%=)`($#) {` =!`(:$`$@$Titl`#,$focus = \"100%` ((siz` P!0 0` +(posi`)A!=`*L!` 4\"`&+$0;} else`!!3` a#` F$(270 -`'#\") % 360;}o.append`%5(`(1$1;}, Elem`(2\"`*g&node, vml) {this[0`-d!his`&C! = `&J!node.raphael`&&$` @!id`'M\"oid++` :)` 5!` =#` F\"X`\"C!` &!Y`\"N!` &!`-x${}` *\"paper = vml` +\"matrix`!\"!` %\"()` 3\"_ = {transform:[], sx:1, sy:1, dx:0, dy:0, deg` \"!irt` 6\"irtyT:1};!vml.bottom`,?!` $'`!y\"`!&#prev`!P\".top;v` \"\"` J%top.next` L%` 9$` *\"` ^\"` :#`*2\"`(O!elproto`\"8!el;`$;#.` 0!`%=#` <#;` D#.construct`)l!` K#` 5%`\"f%`$y)tstr) {`'e!str =`!?\"`+a&`#J\"` T&;`,M!vbs`$\\$`$1!._viewBoxShift, vbt =` A!? \"s\" + [vbs.scale, ` \"%] + \"-1-1t` :%dx` :\"dy] : E, oldt`)E!vbs) {old`#F!`!h!`2E!`!~!`2=%/\\.{3}|\\u2026/g,`!p- || E);}R._extractT` 3$(this`!w\"+` }!)`$&!`&>%`&J'.clone(), skew` 4$skew, o`(<(, `0}!, isGrad = ~`!p!`'X%.`)K!.indexOf(\"-\"), isPatt = !` /:url(\");`!M#`\"?!late(1, 1`15$` e!||`!9$||`!W\"`,p%image\") {skew`(j&\"1 0 0 1\";` 3!`.?#`,U$`\"0!`4N\"rix`3?#`!*$`!#!&&`\"T\".noRota`&J!|| !` /\"isSimple`1Z!style.filt`*;!`\"&$oF` -!(`$ \"bb`#O$getBBox(), b`&C!` ))1), dx = bb.x - bbt.x, dy` -\"y` ,#y;o.coordorigin = dx * - zoom`0e$y` )%;setCoords`%^#1, `+E!, dy, 0)`.}%`!~-E` K-`\"]\"`'}!x`%Y#` (\"y` &$d` /%d` +%rotate);}` n8`$V)Str(` '\")`$V+`#\\#` *\"();}if (`(v!!`*X&`(I-=`)G\"`(@6oldt`0q&`,z!}`+x%`!z\"`+q)deg, cx, cy`+}$his.removed`+w*`!^\"deg`,3-;}` 1!`\"J!deg)`&g#separator`&q\"deg.length - 1) {c`*.!oFloat(deg[1]);cy` &+2])` x$` +(0` E#`!E\"`/h!` k!cy`!(\"cx` 3%|| ` @&) {`'G\"o`+H%`'/&;` ^!bbox.x +` #\"width / 2`!U\"` /!y` 5$height` 9!}`$G#`1z\" = 1`0t\"`$U%`#U\"`$d'.concat([[\"r\"`2d!`$$$]]));`$O2`+Z%`$Z*`(\"!`$@?`)T!`$C!x`$/4x`$8*`)s!`#q%x`$@!` a\"` *'0]) || 0;` I!`)t!` *!`!F%_.bbox`'J&`#\\$= dx`#\"\"` -#y` /!y`#H#`\"xAt\"`*`$`\"}7`*:!`#')sx, sy`'TGs`#4$s`#$4s`#-+s`#0(s`#6\"`'i)sx`'[!`'h)sx[3]);isNaN(cx)`'R&`';!` 1$y` 2#y` 0%`![\"` \\'0]);s`(6*`!M!sx`'hp}` ^\"` R&?`(R4 : cx`\"O\"`!<'` H#`(i/ : cy`(CGs\", `$p*`%T!`)O.`%U2hid`%\\*) {!`%M(`#-!` ,!node`/~#display = \"none\"`&P5how` BXE` a4auxG`$(\" = R.el`$5$` 9%` )#`!.,`$o!`$i$` \\&(`%G\"` 1!paper &&` >\"` )!._viewBoxShift` `#c = {};var z = 1 /` 95`)L\";c.`.N!.x -` 16dx` C!*= z;c.`.b!.y` 49y` C!` J#`&S\"= b` ##*` 1!`&9#= b` #$` 2\"x2 = c`'2!` T#;c.y` /\"y` 0!` I\"`#$c`3g%b`$#'_`#V3`+K6{}` `%{x:` ?!X +` G#bbx`.-!)`\"N$W / 2, y` C\"Y` /$H, `!n!` 1\"W, `!f\"` )\"H}`!V'`!:\"`!?< || `&x\"`&h!parentNode`!o%`/##`##_set__`%Z,` 0\".exclude` |!);R.eve.unbind(\"raphael.*.*.\" +` Y\"id);R._tear` P!,` k'`*)#`!H+`!q#Child`([&` E#shape`!S%` )!` >9` =!);for (var i i`)0\"`2!#[i] = typeof` 3!` ,!= \"`#K$\" ? R._`#E#Factory(i) :`-.!`#4#`#c$= true`*&(ttr`$4)name, value`1M?if` L\"`/0+res`)`\"`\"/%a`\"0$`!-!s` o(` ,![has](a)` |!s[a`\"Q!` 4&a];}}res.gradient && res.fill`\"k!`-L!`,s!` -&` =!` J$`2'!delete` +);re`/i'`!/$`/k'`)=$re`\"J#`\"x!`2/(R.is`#2#\"string\")`\";#`\"u$fillS` 6!`%T%`\"5!`!n/` 2'`!r&`#k(` .+;}var nam`#p!name.split(separator), out`$#+i = 0, ii` N#s.length; i < ii; i++) {`!|\"` =\"[i]`/,!` /!`$a,out[name`$L+` .!;} else if (`#)!`)p'customAttribute` K#,`'X')` j0` A8.def`!+$` M)R._availableA`!S(`-O$ii - 1 ?`#,!: ` T$s[0]]`%8\"`\"1& &&`(C\"`%44array`!v$`#t'`#k,`#c3`!5$[i]`#G)` z![i])`/D%ou`%?#params`$?!`!T\"!`)O%` 5\"`!@\"` &\"`\"m%` F!;}`!o9object\"`(a!(` c%nam`,R(key in`!?#) {eve`.M&attr`.S!key + \"`.X(`.P\",` S#[key])`#i\"` c%`! !` z#`%&7`+N(`%L3`+f!key`\"'!`!+#` ')`&a=key`&p-`#x#`&`;key].apply`1'#[].concat`\"C#`\"V\"`0g#`(\\\"key] =`\"p(`#h&sub`#k&`\"U#par`\"*\"` 7\")`%4%[` +\"` f#` &$;}}}`#`'.tex`.:!`!=!typ`%N!\"text\"`1N#` >!path.`-(\"`!T%` 4!;}setFillAndStrok`4(\"`$u$`',&`0]\"`1B%toFront`1A)) {!`1t)`!P$`4$,append`3~2`$&!` Q%`$3\"top !`$E\"`%,\"_tofront`!e#` A&)`/x$`!^-Back`!^,`2m@`!l1first`!{!`!P$`!}\"`#k#` ?,insertBefor`#Y\"` =!`!q#` b6);`\"E!back`\"6/`$\"3`!&\"After`\"B)elem`1W\"`\"2@` G#.constructor == R.s` ')) {` C# = ` ##[` T$`-b\" - 1`.f#` 1$`\"M!nextSibling` \\&`\"qE` R5`0`%` Z4`&E3}R._`!'\"after`#i#` ^#`%~@`!^(`\"w~`#d10];}`\"mX`&K!` C\"b` ?&`\"9Iblu`&I*size`.I#s`.F$`!W!runtimeStyle, f = s.filter;f = f.replace(blurregexp, E)`3)!+ size !== 0`),$`.Y!`!8$size;` h$ = f + S + ms`2'!Blur(pixelradius=\" +` m%|| 1.5) + \")\";s.margin = R.format(\"-{0}px 0 0 ` %\"\", round` U+`&d&`!@(` h(0;delete`\"s\"`!z&`*.,R._engine.path`#U)pathS`/U!, vml`#f#el = createNode(\"shape\");el.style.cssText = cssDot;el.coord`!}!= zoom`#0#zoom` 6%ori`!v\"vm` %);`3O! = new E`%m\"(el`!O\", attr = {fill:\"none\", s`1-!:\"#000\"};`\"!& && (attr`\"H$` 1&);p`2B# \"path\";p` =$[];p.P` &\"E;`2(-p`!@\");`!u!anva`0j!` $&`*p)el)`\".!skew`#<,kew\");skew.on = true;el` S)skew);p.` Y#skew;p.transform(E`([%p`$t)rec`3I*vml, x, y, w, h, r`$}#`\"O#R._rectPath(` 9*, res`$C#path`%g!), a = re`&I#;res.X = a.x = x` +!Y` +!y = y` +!W` +!wid`!-!w` /!H` /!height = h;a.r = r;a`$I(` F!`$H$rect\"`\"O$re`'L*ellips`-o*`\"Q'rx, ry`\"T#`\")+`!{5x - r`\")&y - r`\"(&rx * 2`\"$%ry` &%`!i$`!M#\"`%{.res, {cx:x, cy:`!\\!:`!^\":ry}`$t%`\"6,circl`\"+6`!lP`\"1*`\"4&`\"/$`\"%-`!>\"`!oB:r`!r6imag`!x/src`'%(`&j@`&t3`\"I!({`*$`+1!}`\"],, node` +#`20\"fill =` 3!.get`,'#sByTagName(fill`+H#[0];a.src = src`'Ch`'o4`#3!\";fill`49' =`!l\" &&`!t\"remove`+H\"fill)` L\"rotate`+n$` .!`!t&` *!`! $tile\"`!5!_.fillpos = [x, y]` ,'`/j#[w, h];`!6!`,](`!5\"setC`09!`%_\"1, 1, 0, 0, 0`%H5t`0{\"`'V1text`1N;,`%m$` 0(`/o!), o` )+text` 6\";`$T! || 0;`$O!` %\"`!F#` \"!|| \"\"`1+!.v`&p!format(\"m{0},{1}l{2` #!\", round(x *`2c!)` )$y ` \"+` 9% + 1)` w\"`!M$ok`$H$o.s`2<\"= Str(`\"a!;o`0Y*`3Zc\"0 0\"`3jI`4#!`4-&`4?#font:R._availableAttrs.font`$a\":text};p.`$S! = el`4+&`'y!p`\"a% = o`4W'text\";p`*$\"`%h$`\"o&` 1$`)E\"` &$`)C\"` &$w = 1` %%h` )!`,i-p`\"E\")`46,o)` \",`+t!;vml.canvas` 0)el)`#L!skew`'$,kew\");skew`$`*` T(skew);p.` Y#skew;p.transform(E`(b%p`(\\)setS`%0\"`(b&`+z!, `+l\"`(c#cs = this`!u$`&&!;` -!`,F%idth` -\"`,D&` $!;` <#= +` @\" &&`!!# += \"px\");` L$= +` P#` A!` $#` >%c`!!,c` }.cs.clip = \"rect(0 \"`!1%+ \"` )!` p$ \" 0)\";if (`!v!_viewBox) {`\"z)V` 1\".apply` F!,`\"k\"` H%;}`#\\#thi`,A*` U&`#\\)`1]&, fit`!-!eve(\"raphael` M'\"`!'\"`!$+,`.N\"` Y']`&!\"paper`$r#` M!g`%\"\"(),`\"`#=` :&`#J\"`%)$` -)` -\", H, W`\"~!`!a\"H`#b% / h;W`$$$ / w` B!w * H <` 0\") {x -=`%)$- ` 9!) / 2 / H;}if (h * W <`&L&y` N!` #- ` ;!` L$W;}}`\"\\)`16$`\"b$!!fit]`&f\"` <$Shift = {dx:- x, dy:- y, scale:`\"L%}` Q\"forEach(`$E&el) {el`(k'\"...\");}`(t%`%3#`(M!`)z%`%>'initW`-!`)#(n`(~#doc`#E!n.document`#H!doc`))\"Sheets.length < 31) {doc.`!&\"S` ;%().addRule(\".rvml\", \"behavior:url(#default#VML)\");} else` h\"`!!'[0]` 9Mtry {!doc.namespaces` V! && ` (+add(\"` o$urn:schemas-microsoft-com:vml\");`#H&`#3)tagName) {`#~#`\"h&`1O$\"<rvml:\" + ` G#`*S!class=\\`!<!\\\">\");};} catch (e) {` VX` },xmlns=\\`\"02.`\"?#\\`!>3`+A(`%}#(R._g.win)` 1'`!?\"`!`)`/9$`0V!R._getContainer`,f#0, arg`&L!s), c` 7$ = con.` '%`*x'con`*t%s`+J&con`+F$x` (#x, y` $#y`'J!!` g%) {throw new Error(\"VML`!6'not found`)\"!var res =` L!R._Paper, c = re`1S$`\"@#.`$\"/div\"),`2'\"`'a#;x = x || 0;y = y` %\"`0v) || 512`1Y%`\"_$|| 342;re`1C,re`1fy`\"G!oords`/\\\"zoom * 1000 + S +` &(` D&orig`+w!\"0 0\"` 3!spa`%O$`\"|0span`!)#span`#,\".cssText = \"position:absolute;left:-9999em;top` #%padding:0;margin:0;line-`\"7\":1;\";c.appendChild(`!.$)`4j!`!+%R.format(\"top:0`!+\"`$J#:{0}`#>#:{1};display:in`!&!block;`!k%relative;clip:rect(0 {0} {1} 0);overflow:hidden\"`'`#`'~$)`'I!`(B'= 1`4^!`#E#body`\"$)c`\"%!le`1A!x +`$i!;cs.top`&U!` (&`!\\$ = \"`#S$\"`.|%`!+).first` }!) {` -&insertBefore(c`*+'` E(` j%` 4&`!c+}}res.renderfix`+K,}`2R$res;};R.prototype.clear` @,R.eve(\"raphael` >\"\",`33!)`3r\"`)\".innerHTML = E` 4\"`&gB` B%`&0z`&-*;\"`!p)`#8(`!G%`!T#bottom =`\"O!`%4#null`#/+remov`/9-`#0+` ?\"`#+1parentNod` c$`!C'` =\");for (var i in` ^\" {this[i] = typeof` 3!` ,!= \"`!E$\" ? R._` t\"dFactory(i) :`\"%#`%O#true;};var set`\"9!`$]!st`!3&method in el` =!)`'\\\"` '#[has](` ?\") && !` b$` -)) {` /%` -\"] = (`#4&` /\"n`4K)`2u-arg =`2c&`'U$`#1!forEach` h'el) {el`!)#name]`3K#el`3N!);}`4Z!)`!^$;}}})` <$xports, __WEBPACK_AMD_DEFINE_ARRAY__)` (3RESULT__ !== undefined`0I!module.` x# =` C:));}]`!c!"))  //Open Sans Font (used for scalable location labels) /*! * Copyright: * Copyleft 2002, 2003, 2005, 2008, 2009, 2010 Free Software Foundation.* * Manufacturer: * GNU * * Vendor URL:* https://savannah.gnu.org/projects/freefont/ * * License information: * http://www.gnu.org/copyleft/gpl.html*/Raphael.registerFont({"w":200,"face":{"font-family":"FreeSans","font-weight":400,"font-stretch":"normal","units-per-em":"360","panose-1":"2 11 5 4 2 2 2 2 2 4","ascent":"288","descent":"-72","x-height":"8","bbox":"-8 -277 342.017 78.0413","underline-thickness":"18","underline-position":"-54.36","stemh":"30","stemv":"33","unicode-range":"U+0020-U+007E"},"glyphs":{" ":{"w":100},"!":{"d":"75,-262r0,121r-8,81r-14,0v-8,-62,-9,-131,-8,-202r30,0xm75,-37r0,37r-30,0r0,-37r30,0","w":100},"\"":{"d":"19,-255r33,0v2,35,-4,62,-10,88r-14,0v-6,-27,-11,-54,-9,-88xm76,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88","w":127},"#":{"d":"175,-251r-13,71r33,0r0,24r-38,0r-11,63r38,0r0,24r-43,0r-14,76r-27,0r14,-76r-45,0r-14,76r-27,0r13,-76r-36,0r0,-24r41,0r11,-63r-39,0r0,-24r44,0r13,-71r27,0r-13,71r45,0r13,-71r28,0xm130,-156r-45,0r-12,63r45,0"},"$":{"d":"87,-114v-48,-13,-70,-26,-70,-72v0,-41,24,-66,70,-72r0,-19r22,0r0,19v44,3,70,30,70,71r-29,0v0,-26,-17,-45,-41,-46r0,90v22,6,77,15,77,73v0,46,-26,74,-77,78r0,37r-22,0r0,-37v-51,-4,-77,-32,-75,-83r28,0v2,24,3,52,47,58r0,-97xm87,-146r0,-86v-27,4,-41,19,-41,43v0,22,13,35,41,43xm109,-17v33,-4,48,-24,48,-49v0,-24,-11,-34,-48,-45r0,94"},"%":{"d":"72,-247v35,0,61,28,61,63v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-34,29,-62,62,-62xm72,-221v-20,0,-37,16,-37,36v0,20,17,36,37,36v20,0,36,-16,36,-36v0,-21,-15,-36,-36,-36xm219,-255r24,0r-142,262r-24,0xm248,-116v35,0,61,27,61,62v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-33,29,-61,62,-61xm248,-91v-20,0,-37,16,-37,36v0,20,17,37,37,37v20,0,36,-17,36,-36v0,-21,-15,-37,-36,-37","w":320},"&":{"d":"168,-28v-12,11,-34,36,-75,36v-44,0,-74,-28,-74,-71v0,-33,13,-51,58,-77v-22,-28,-29,-42,-29,-59v0,-32,27,-56,61,-56v34,0,59,23,59,56v0,26,-13,42,-50,63r48,59v7,-13,11,-29,11,-43r29,0v0,22,-8,45,-21,66r44,54r-39,0xm103,-155v28,-18,37,-28,37,-44v0,-18,-14,-31,-32,-31v-19,0,-31,12,-31,31v0,13,4,19,26,44xm150,-49r-57,-72v-33,21,-44,35,-44,55v0,52,70,62,101,17","w":240},"'":{"d":"17,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88","w":68},"(":{"d":"85,-262r20,0v-66,104,-66,235,0,338r-20,0v-77,-98,-77,-240,0,-338","w":119},")":{"d":"33,76r-19,0v65,-104,65,-235,0,-338r19,0v77,98,77,240,0,338","w":119},"*":{"d":"58,-262r22,0r-2,40r39,-14r6,21r-38,11r25,32r-19,13r-22,-33r-23,33r-18,-13r25,-32r-39,-11r7,-21r38,14","w":140},"+":{"d":"192,-96r0,25r-74,0r0,75r-25,0r0,-75r-75,0r0,-25r75,0r0,-75r25,0r0,75r74,0","w":210},",":{"d":"31,-37r38,0v1,42,3,94,-38,90r0,-14v19,1,23,-13,22,-39r-22,0r0,-37","w":100},"-":{"d":"102,-112r0,26r-85,0r0,-26r85,0","w":119,"k":{"A":18,"V":18,"W":18,"Y":18,"C":7,"G":7,"O":7,"Q":7,"a":14,"g":14,"v":22,"w":22,"y":22,"T":18,"J":7,"j":11,"x":18,"m":14,"n":14,"p":14,"r":14,"u":14,"z":14,"s":18,"f":14,"t":14,"X":18,"Z":18,"S":4}},".":{"d":"69,-37r0,37r-38,0r0,-37r38,0","w":100},"\/":{"d":"82,-262r20,0r-85,269r-20,0","w":100},"0":{"d":"15,-123v0,-112,48,-132,84,-132v63,0,84,60,84,134v0,84,-30,129,-84,129v-55,0,-84,-45,-84,-131xm99,-227v-34,0,-51,34,-51,104v0,70,17,105,50,105v35,0,52,-34,52,-106v0,-68,-17,-103,-51,-103"},"1":{"d":"93,-182r-56,0r0,-22v49,-6,56,-12,67,-51r21,0r0,255r-32,0r0,-182"},"2":{"d":"18,-167v2,-77,49,-88,84,-88v48,0,82,31,82,75v0,45,-51,77,-90,96v-33,16,-43,32,-46,53r134,0r0,31r-170,0v-4,-69,48,-103,105,-129v51,-24,43,-98,-16,-99v-44,0,-50,37,-51,61r-32,0"},"3":{"d":"97,-228v-40,0,-47,27,-48,55r-32,0v1,-54,29,-82,80,-82v79,0,107,98,42,123v31,10,43,29,43,61v0,48,-33,79,-86,79v-53,0,-80,-27,-84,-82r31,0v2,37,19,54,54,54v33,0,53,-19,53,-51v0,-37,-28,-49,-70,-46r0,-27v42,-1,62,-7,62,-40v0,-27,-17,-44,-45,-44"},"4":{"d":"118,-61r-108,0r0,-34r116,-160r23,0r0,165r38,0r0,29r-38,0r0,61r-31,0r0,-61xm118,-90r0,-111r-80,111r80,0"},"5":{"d":"171,-255r0,31r-106,0r-10,71v55,-39,130,2,130,70v0,54,-37,91,-88,91v-72,0,-81,-54,-84,-71r31,0v8,29,24,43,52,43v35,0,56,-22,56,-59v0,-61,-71,-82,-102,-37r-29,0r19,-139r131,0"},"6":{"d":"15,-116v0,-118,55,-139,92,-139v39,0,66,24,72,66r-31,0v-5,-24,-21,-38,-43,-38v-36,0,-57,35,-57,97v39,-56,137,-25,137,52v0,50,-35,86,-84,86v-64,0,-86,-52,-86,-124xm103,-131v-31,0,-53,22,-53,54v0,33,22,57,52,57v29,0,50,-23,50,-55v0,-34,-18,-56,-49,-56"},"7":{"d":"187,-255r0,26v-58,77,-89,147,-103,229r-34,0v19,-84,43,-137,104,-224r-137,0r0,-31r170,0"},"8":{"d":"141,-134v78,31,43,142,-42,142v-85,0,-120,-111,-42,-142v-67,-32,-31,-121,42,-121v73,0,109,89,42,121xm99,-227v-27,0,-44,16,-44,40v0,24,17,40,44,40v27,0,44,-15,44,-39v0,-25,-17,-41,-44,-41xm99,-120v-32,0,-53,20,-53,50v0,30,21,50,52,50v32,0,54,-20,54,-50v0,-30,-21,-50,-53,-50"},"9":{"d":"183,-131v0,118,-55,139,-92,139v-39,0,-66,-24,-72,-66r32,0v5,24,21,38,43,38v36,0,56,-35,56,-97v-42,57,-136,24,-136,-52v0,-50,34,-86,83,-86v63,0,86,51,86,124xm97,-228v-29,0,-51,24,-51,56v0,34,19,56,50,56v31,0,53,-23,53,-54v0,-33,-22,-58,-52,-58"},":":{"d":"77,-37r0,37r-37,0r0,-37r37,0xm77,-189r0,38r-37,0r0,-38r37,0","w":100},";":{"d":"77,-189r0,38r-37,0r0,-38r37,0xm40,-37r37,0v1,42,4,94,-37,90r0,-14v19,1,22,-14,21,-39r-21,0r0,-37","w":100},"<":{"d":"16,-71r0,-25r176,-75r0,29r-142,58r142,59r0,28","w":210},"=":{"d":"192,-127r0,25r-174,0r0,-25r174,0xm192,-65r0,25r-174,0r0,-25r174,0","w":210},">":{"d":"194,-96r0,25r-176,74r0,-28r142,-58r-142,-59r0,-29","w":210},"?":{"d":"183,-198v-1,67,-74,62,-64,126r-33,0v-11,-67,63,-75,65,-126v0,-24,-18,-41,-46,-41v-37,0,-47,24,-47,56r-30,0v0,-55,27,-84,79,-84v47,0,76,27,76,69xm119,-37r0,37r-33,0r0,-37r33,0"},"@":{"d":"342,-133v1,52,-42,112,-98,112v-23,0,-36,-9,-39,-27v-37,49,-110,23,-110,-40v0,-69,99,-143,136,-69r8,-23r30,0r-36,118v0,9,8,16,18,16v31,0,60,-41,60,-83v0,-60,-58,-110,-127,-110v-76,0,-141,65,-141,141v1,93,102,146,204,110r10,24v-112,47,-245,-21,-245,-129v0,-92,83,-174,177,-174v84,0,153,61,153,134xm163,-45v34,0,56,-56,56,-87v0,-18,-15,-33,-34,-33v-50,0,-88,120,-22,120","w":365},"A":{"d":"171,-79r-102,0r-27,79r-36,0r94,-262r43,0r92,262r-37,0xm161,-107r-40,-119r-43,119r83,0","w":240,"k":{"V":22,"W":22,"Y":22,"C":14,"G":14,"O":14,"Q":14,"e":7,"a":7,"g":7,"v":11,"w":11,"y":11,"T":14,"m":11,"n":11,"z":11,"s":7,"f":11,"t":11,"X":4,"Z":4,"S":11,"r":11,"p":7,"u":9,"c":4,"o":5,"d":2,"q":2,"I":14,",":7,".":7,"-":18}},"B":{"d":"224,-75v0,45,-31,75,-77,75r-119,0r0,-262r107,0v96,2,98,94,41,123v33,13,48,32,48,64xm179,-191v-2,-58,-65,-39,-117,-42r0,84v51,-2,118,13,117,-42xm144,-30v70,-2,59,-90,0,-90r-82,0r0,90r82,0","w":240,"k":{"A":11,"V":18,"W":18,"Y":18,"C":11,"G":11,"O":11,"Q":11,"a":4,"g":4,"v":11,"w":11,"y":11,"T":18,"j":7,"x":11,"m":11,"n":11,"z":11,"s":4,"f":4,"t":4,"X":18,"Z":18,"S":7,"r":7,"p":4,"u":7,"o":2,"I":11,",":18,".":18,"-":7}},"C":{"d":"17,-128v0,-55,24,-139,120,-139v58,0,91,28,101,86r-34,0v-8,-37,-29,-56,-71,-56v-51,0,-82,41,-82,108v0,66,33,108,85,108v44,0,65,-25,73,-75r35,0v-8,69,-44,104,-108,104v-95,0,-119,-82,-119,-136","w":259,"k":{"A":14,"V":18,"W":18,"Y":18,"C":7,"G":7,"O":7,"Q":7,"a":7,"g":7,"v":4,"w":4,"y":4,"T":14,"j":11,"x":11,"m":11,"n":11,"z":11,"s":7,"f":7,"t":7,"X":14,"Z":14,"S":4,"r":7,"p":7,"u":9,"o":2,"I":14,",":11,".":11}},"D":{"d":"32,0r0,-262r101,0v67,0,107,50,107,131v0,82,-41,131,-107,131r-101,0xm66,-30v88,7,141,-7,141,-101v0,-94,-52,-109,-141,-102r0,203","w":259,"k":{"A":18,"V":18,"W":18,"Y":18,"C":7,"G":7,"O":7,"Q":7,"e":4,"a":9,"g":9,"v":4,"w":4,"y":4,"T":18,"J":4,"j":4,"x":7,"m":14,"n":14,"z":14,"s":7,"f":4,"t":4,"X":20,"Z":20,"S":11,"r":14,"p":9,"u":13,"c":4,"o":4,"d":2,"q":2,"I":20,",":11,".":11}},"E":{"d":"66,-120r0,90r155,0r0,30r-189,0r0,-262r182,0r0,29r-148,0r0,84r143,0r0,29r-143,0","w":240,"k":{"A":11,"V":18,"W":18,"Y":18,"C":14,"G":14,"O":14,"Q":14,"e":11,"a":11,"g":11,"v":14,"w":14,"y":14,"T":7,"J":7,"j":11,"x":11,"m":14,"n":14,"z":14,"s":7,"f":11,"t":11,"X":11,"Z":11,"S":18,"r":11,"p":7,"u":16,"c":11,"o":13,"d":9,"q":9,"I":14}},"F":{"d":"66,-120r0,120r-34,0r0,-262r176,0r0,29r-142,0r0,84r125,0r0,29r-125,0","w":219,"k":{"A":14,"V":7,"W":7,"Y":7,"C":11,"G":11,"O":11,"Q":11,"e":14,"a":11,"g":11,"v":4,"w":4,"y":4,"J":11,"j":7,"x":14,"m":18,"n":18,"z":18,"s":14,"f":7,"t":7,"X":11,"Z":11,"S":14,"r":14,"p":11,"u":18,"c":11,"o":13,"d":9,"q":9,"I":14,",":22,".":22,"-":11}},"G":{"d":"49,-130v0,42,19,109,94,109v50,-1,86,-35,83,-88r-80,0r0,-30r109,0r0,140r-21,0r-8,-34v-74,85,-210,29,-210,-96v0,-53,25,-138,126,-138v60,0,101,31,110,84r-35,0v-7,-34,-36,-54,-76,-54v-55,0,-92,43,-92,107","w":280,"k":{"A":14,"V":18,"W":18,"Y":18,"C":7,"G":7,"O":7,"Q":7,"a":7,"g":7,"v":4,"w":4,"y":4,"T":14,"j":11,"x":11,"m":11,"n":11,"z":11,"s":7,"f":7,"t":7,"X":14,"Z":14,"S":4,"r":7,"p":7,"u":9,"o":2,"I":14,",":11,".":11}},"H":{"d":"198,-120r-135,0r0,120r-33,0r0,-262r33,0r0,113r135,0r0,-113r34,0r0,262r-34,0r0,-120","w":259},"I":{"d":"70,-262r0,262r-34,0r0,-262r34,0","w":100,"k":{"A":14,"V":14,"W":14,"Y":14,"C":9,"G":9,"O":9,"Q":9,"e":11,"a":11,"g":11,"v":7,"w":7,"y":7,"T":4,"x":11,"m":11,"n":11,"z":11,"s":11,"f":4,"t":4,"X":14,"Z":14,"S":13,"r":11,"p":11,"u":14,"c":7,"o":7,"d":7,"q":7,"I":14}},"J":{"d":"80,-20v33,0,40,-25,40,-58r0,-184r33,0r0,196v0,45,-28,74,-74,74v-54,-1,-79,-35,-73,-92r34,0v-3,37,9,64,40,64","w":180,"k":{"A":11,"V":18,"W":18,"Y":18,"C":11,"G":11,"O":11,"Q":11,"e":7,"a":9,"g":9,"v":11,"w":11,"y":11,"j":7,"x":18,"m":14,"n":14,"z":14,"s":7,"X":18,"Z":18,"S":11,"r":11,"p":7,"u":14,"c":7,"o":9,"d":5,"q":5,"I":14}},"K":{"d":"62,-92r0,92r-34,0r0,-262r34,0r0,132r131,-132r43,0r-107,106r108,156r-40,0r-92,-135","w":240,"k":{"C":18,"G":18,"O":18,"Q":18,"e":14,"a":11,"g":11,"v":11,"w":11,"y":11,"j":4,"x":7,"m":14,"n":14,"z":14,"s":7,"f":11,"t":11,"S":18,"r":14,"p":11,"u":14,"c":14,"o":16,"d":13,"q":13,"I":14,",":14,".":14,"-":18}},"L":{"d":"62,-262r0,232r130,0r0,30r-163,0r0,-262r33,0","k":{"V":22,"W":22,"Y":22,"C":14,"G":14,"O":14,"Q":14,"e":11,"a":7,"g":7,"v":14,"w":14,"y":14,"T":14,"j":4,"m":14,"n":14,"z":14,"s":7,"f":11,"t":11,"S":14,"r":11,"u":14,"c":11,"o":13,"d":9,"q":9,"I":11,",":7,".":7,"-":22}},"M":{"d":"168,0r-35,0r-74,-220r0,220r-32,0r0,-262r46,0r78,228r77,-228r46,0r0,262r-32,0r0,-220","w":299},"N":{"d":"233,-262r0,262r-38,0r-136,-213r0,213r-32,0r0,-262r37,0r137,214r0,-214r32,0","w":259},"O":{"d":"267,-127v0,76,-49,135,-127,135v-76,0,-126,-55,-126,-137v0,-82,51,-138,126,-138v77,0,127,55,127,140xm140,-237v-55,0,-93,43,-93,108v0,65,37,108,93,108v55,0,94,-44,94,-107v0,-66,-37,-109,-94,-109","w":280,"k":{"A":11,"V":14,"W":14,"Y":14,"a":7,"g":7,"T":14,"m":7,"n":7,"z":7,"X":18,"Z":18,"S":7,"r":7,"p":4,"u":5,"I":11,",":11,".":11}},"P":{"d":"222,-185v0,45,-30,74,-73,74r-83,0r0,111r-33,0r0,-262r108,0v52,0,81,28,81,77xm66,-141v54,0,121,10,121,-46v0,-55,-67,-46,-121,-46r0,92","w":240,"k":{"A":22,"V":14,"W":14,"Y":14,"C":7,"G":7,"O":7,"Q":7,"e":14,"a":18,"g":18,"T":11,"J":14,"x":14,"m":14,"n":14,"z":14,"s":11,"X":22,"Z":22,"S":11,"r":11,"p":7,"u":14,"c":14,"o":16,"d":13,"q":13,"I":14,",":36,".":36,"-":25}},"Q":{"d":"264,0r-17,21r-38,-31v-90,51,-195,-9,-195,-119v0,-82,50,-138,126,-138v120,0,165,162,90,240xm173,-74r32,26v57,-58,26,-189,-65,-189v-56,0,-93,43,-93,108v0,82,65,130,136,98r-26,-23","w":280,"k":{"A":11,"V":14,"W":14,"Y":14,"a":7,"g":7,"T":14,"m":7,"n":7,"z":7,"X":18,"Z":18,"S":7,"r":7,"p":4,"u":5,"I":11,",":11,".":11}},"R":{"d":"193,-130v61,21,15,85,51,122r0,8r-40,0v-16,-38,10,-113,-51,-113r-86,0r0,113r-34,0r0,-262v86,2,201,-20,201,70v0,30,-11,48,-41,62xm199,-188v-3,-67,-75,-39,-132,-45r0,90v55,-3,135,16,132,-45","w":259,"k":{"A":4,"V":18,"W":18,"Y":18,"C":4,"G":4,"O":4,"Q":4,"e":4,"a":4,"g":4,"v":4,"w":4,"y":4,"T":7,"j":4,"m":4,"n":4,"z":4,"s":4,"X":7,"Z":7,"S":7,"r":7,"p":4,"u":14,"c":11,"o":13,"d":9,"q":9,"I":14}},"S":{"d":"123,-21v57,0,67,-29,67,-48v0,-69,-165,-32,-165,-121v0,-48,35,-77,93,-77v60,0,97,31,97,82r-32,0v0,-34,-24,-54,-66,-54v-35,0,-58,18,-58,45v0,40,74,45,109,56v35,12,56,34,56,66v0,32,-21,80,-103,80v-45,0,-103,-17,-104,-92v10,2,26,-3,32,2v0,27,15,61,74,61","w":240,"k":{"A":11,"V":18,"W":18,"Y":18,"C":7,"G":7,"O":7,"Q":7,"v":7,"w":7,"y":7,"T":14,"j":4,"x":14,"m":7,"n":7,"z":7,"f":4,"t":4,"X":18,"Z":18,"S":4,"r":7,"p":4,"u":9,"o":2,"I":14,",":22,".":22,"-":11}},"T":{"d":"127,-233r0,233r-33,0r0,-233r-86,0r0,-29r205,0r0,29r-86,0","w":219,"k":{"A":18,"V":4,"W":4,"Y":4,"C":14,"G":14,"O":14,"Q":14,"e":14,"a":14,"g":14,"v":7,"w":7,"y":7,"J":14,"x":11,"m":14,"n":14,"z":14,"s":14,"f":7,"t":7,"X":14,"Z":14,"S":14,"r":14,"p":11,"u":14,"c":14,"o":16,"d":13,"q":13,"I":11,",":22,".":22,"-":18}},"U":{"d":"199,-262r33,0r0,184v0,53,-39,86,-101,86v-62,0,-100,-33,-100,-86r0,-184r33,0r0,184v0,40,28,57,67,57v42,0,68,-22,68,-57r0,-184","w":259},"V":{"d":"141,0r-36,0r-94,-262r36,0r77,222r73,-222r35,0","w":240,"k":{"A":22,"C":18,"G":18,"O":18,"Q":18,"e":18,"a":18,"g":18,"v":7,"w":7,"y":7,"J":11,"x":11,"m":22,"n":22,"z":22,"s":14,"f":7,"t":7,"X":11,"Z":11,"S":18,"r":22,"p":14,"u":18,"c":16,"o":18,"d":14,"q":14,"I":14,",":22,".":22,"-":18}},"W":{"d":"268,0r-37,0r-60,-216r-59,216r-37,0r-67,-262r37,0r50,213r58,-213r36,0r60,213r48,-213r37,0","w":339,"k":{"A":22,"C":18,"G":18,"O":18,"Q":18,"e":18,"a":18,"g":18,"v":7,"w":7,"y":7,"J":11,"x":11,"m":22,"n":22,"z":22,"s":14,"f":7,"t":7,"X":11,"Z":11,"S":18,"r":22,"p":14,"u":18,"c":16,"o":18,"d":14,"q":14,"I":14,",":22,".":22,"-":18}},"X":{"d":"141,-135r93,135r-42,0r-71,-109r-72,109r-41,0r93,-135r-87,-127r40,0r68,103r67,-103r40,0","w":240,"k":{"C":18,"G":18,"O":18,"Q":18,"e":14,"a":11,"g":11,"v":11,"w":11,"y":11,"j":4,"x":7,"m":14,"n":14,"z":14,"s":7,"f":11,"t":11,"S":18,"r":14,"p":11,"u":14,"c":14,"o":16,"d":13,"q":13,"I":14,",":14,".":14,"-":18}},"Y":{"d":"139,-103r0,103r-33,0r0,-103r-101,-159r41,0r77,127r75,-127r40,0","w":240,"k":{"A":22,"C":18,"G":18,"O":18,"Q":18,"e":18,"a":18,"g":18,"v":7,"w":7,"y":7,"J":11,"x":11,"m":22,"n":22,"z":22,"s":14,"f":7,"t":7,"X":11,"Z":11,"S":18,"r":22,"p":14,"u":18,"c":16,"o":18,"d":14,"q":14,"I":14,",":22,".":22,"-":18}},"Z":{"d":"209,-262r0,30r-157,202r158,0r0,30r-200,0r0,-30r158,-203r-148,0r0,-29r189,0","w":219,"k":{"C":18,"G":18,"O":18,"Q":18,"e":14,"a":11,"g":11,"v":11,"w":11,"y":11,"j":4,"x":7,"m":14,"n":14,"z":14,"s":7,"f":11,"t":11,"S":18,"r":14,"p":11,"u":14,"c":14,"o":16,"d":13,"q":13,"I":14,",":14,".":14,"-":18}},"[":{"d":"90,-262r0,25r-37,0r0,287r37,0r0,26r-67,0r0,-338r67,0","w":100},"\\":{"d":"17,-262r85,269r-20,0r-85,-269r20,0","w":100},"]":{"d":"8,76r0,-26r37,0r0,-287r-37,0r0,-25r67,0r0,338r-67,0","w":99},"^":{"d":"71,-255r26,0r56,137r-25,0r-44,-108r-43,108r-25,0","w":168},"_":{"d":"208,45r0,18r-216,0r0,-18r216,0"},"`":{"d":"49,-266r34,53r-21,0r-54,-53r41,0","w":119},"a":{"d":"23,-133v2,-51,42,-61,76,-61v46,0,71,18,71,51r0,111v0,11,11,18,23,14r0,23v-27,8,-50,3,-52,-24v-38,43,-127,34,-126,-29v0,-50,39,-54,94,-61v28,-4,32,-8,31,-29v0,-18,-15,-28,-42,-28v-28,0,-41,10,-44,33r-31,0xm84,-18v52,0,60,-28,56,-75v-31,14,-94,4,-94,45v0,19,15,30,38,30","k":{"a":4,"g":4,"v":7,"w":7,"y":7,"x":4,"m":4,"n":4,"z":4,"s":4,"f":4,"t":4,"r":4,"u":4,"c":5,"o":7,"d":4,"q":4,",":7,".":7,"-":14}},"b":{"d":"19,-262r30,0r0,99v45,-63,139,-24,139,68v0,95,-95,137,-142,71r0,24r-27,0r0,-262xm102,-166v-32,0,-53,29,-53,73v0,44,21,73,53,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74","k":{"v":4,"w":4,"y":4,"j":4,"x":4,"m":4,"n":4,"z":4,"r":4,"u":4,",":11,".":11}},"c":{"d":"170,-125r-31,0v-4,-26,-19,-41,-44,-41v-33,0,-53,28,-53,75v0,80,89,100,99,26r31,0v-4,46,-32,73,-77,73v-51,0,-84,-38,-84,-99v0,-63,33,-103,84,-103v43,0,71,24,75,69","w":180,"k":{"x":4,"m":4,"n":4,"z":4,"r":4,"u":2,",":7,".":7}},"d":{"d":"178,-262r0,262r-26,0r0,-25v-47,67,-143,26,-143,-70v0,-90,93,-131,139,-70r0,-97r30,0xm95,-166v-33,0,-54,29,-54,73v0,44,22,73,55,73v32,0,52,-28,52,-72v0,-45,-21,-74,-53,-74","k":{"e":4,"a":4,"g":4,"m":4,"n":4,"z":4,"s":4,"r":4,"p":2,"u":5}},"e":{"d":"46,-84v-7,69,87,90,104,27r31,0v-8,41,-38,65,-81,65v-53,0,-86,-38,-86,-100v0,-107,130,-137,163,-52v5,14,8,31,8,60r-139,0xm46,-109v34,-2,77,4,107,-2v0,-31,-23,-55,-53,-55v-30,0,-51,22,-54,57","k":{"a":4,"g":4,"v":7,"w":7,"y":7,"j":7,"x":7,"m":7,"n":7,"z":7,"s":4,"f":4,"t":4,"r":4,"p":4,"u":7,",":14,".":14,"-":4}},"f":{"d":"93,-189r0,25r-31,0r0,164r-30,0r0,-164r-26,0r0,-25r26,0v-6,-49,11,-85,61,-73r0,25v-32,-6,-33,18,-31,48r31,0","w":100,"k":{"e":9,"a":7,"g":7,"x":7,"m":4,"n":4,"z":4,"s":7,"r":4,"u":2,"c":4,"o":5,"d":2,"q":2,",":22,".":22,"-":22}},"g":{"d":"145,-26v-45,69,-135,28,-135,-65v0,-91,92,-139,138,-70r0,-28r28,0v-11,109,42,270,-84,267v-44,0,-72,-20,-75,-56r30,0v5,31,37,31,46,31v46,1,53,-32,52,-79xm94,-166v-32,0,-52,28,-52,73v0,46,19,74,52,74v32,0,51,-28,51,-73v0,-47,-19,-74,-51,-74","k":{"e":4,"c":4,"o":4,"d":2,"q":2,",":14,".":14,"-":22}},"h":{"d":"145,-131v0,-30,-24,-37,-39,-37v-66,-2,-49,101,-51,168r-30,0r0,-262r30,0r0,99v27,-48,120,-40,120,20r0,143r-30,0r0,-131","k":{"e":5,"v":7,"w":7,"y":7,"j":7,"x":7,"m":9,"n":9,"z":9,"s":7,"r":7,"p":4,"u":7,"c":7,"o":9,"d":5,"q":5,",":11,".":11,"-":22}},"i":{"d":"54,-189r0,189r-30,0r0,-189r30,0xm54,-262r0,37r-30,0r0,-37r30,0","w":79},"j":{"d":"25,-189r30,0r0,228v2,29,-26,43,-61,38r0,-25v20,3,31,-3,31,-25r0,-216xm55,-262r0,37r-30,0r0,-37r30,0","w":79},"k":{"d":"51,-262r0,153r80,-80r38,0r-65,66r77,123r-37,0r-64,-102r-29,29r0,73r-30,0r0,-262r30,0","w":180,"k":{"e":7,"a":4,"g":4,"v":7,"w":7,"y":7,"m":7,"n":7,"z":7,"s":4,"r":7,"p":4,"u":7,"c":7,"o":9,"d":5,"q":5,",":14,".":14,"-":22}},"l":{"d":"55,-262r0,262r-31,0r0,-262r31,0","w":79},"m":{"d":"25,-189r28,0r0,27v24,-41,87,-44,109,-3v29,-45,112,-39,112,24r0,141r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-40,104,-44,168r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-41,103,-45,168r-30,0r0,-189","w":299,"k":{"e":5,"v":7,"w":7,"y":7,"j":7,"x":7,"m":9,"n":9,"z":9,"s":7,"r":7,"p":4,"u":7,"c":7,"o":9,"d":5,"q":5,",":11,".":11,"-":22}},"n":{"d":"25,-189r28,0r0,32v23,-54,122,-48,122,14r0,143r-30,0r0,-131v0,-23,-14,-37,-38,-37v-67,-2,-51,100,-52,168r-30,0r0,-189","k":{"e":5,"v":7,"w":7,"y":7,"j":7,"x":7,"m":9,"n":9,"z":9,"s":7,"r":7,"p":4,"u":7,"c":7,"o":9,"d":5,"q":5,",":11,".":11,"-":22}},"o":{"d":"98,-194v54,0,86,38,86,103v0,62,-33,99,-86,99v-54,0,-85,-38,-85,-101v0,-63,32,-101,85,-101xm98,-166v-33,0,-54,28,-54,73v0,46,21,74,54,74v33,0,54,-29,54,-73v0,-47,-20,-74,-54,-74","k":{"a":4,"g":4,"v":7,"w":7,"y":7,"j":7,"x":7,"m":7,"n":7,"z":7,"s":4,"f":4,"t":4,"r":4,"p":4,"u":7,",":14,".":14,"-":4}},"p":{"d":"19,78r0,-267r28,0r0,29v44,-68,141,-27,141,69v0,89,-88,131,-138,71r0,98r-31,0xm102,-166v-32,0,-52,29,-52,73v0,44,20,73,52,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74","k":{"v":4,"w":4,"y":4,"j":4,"x":4,"m":4,"n":4,"z":4,"r":4,"u":4,",":11,".":11}},"q":{"d":"178,78r-30,0r0,-100v-45,63,-139,22,-139,-69v0,-95,94,-136,143,-72r0,-26r26,0r0,267xm96,-166v-33,0,-55,29,-55,73v0,44,22,73,55,73v32,0,52,-29,52,-72v0,-45,-20,-74,-52,-74"},"r":{"d":"116,-162v-36,1,-61,11,-61,64r0,98r-30,0r0,-189r28,0r0,35v21,-32,32,-43,63,-39r0,31","w":119,"k":{"e":7,"a":7,"g":7,"x":4,"m":4,"n":4,"z":4,"s":4,"u":2,"c":4,"o":5,"d":2,"q":2,",":22,".":22,"-":18}},"s":{"d":"44,-56v3,18,9,37,46,37v46,0,63,-47,15,-56v-41,-8,-96,-23,-88,-61v0,-35,28,-58,72,-58v44,0,69,21,69,58r-32,0v-1,-20,-14,-30,-38,-30v-24,0,-40,11,-40,28v0,21,41,29,64,34v37,9,53,25,53,53v0,36,-30,59,-78,59v-49,0,-74,-20,-75,-64r32,0","w":180,"k":{"a":4,"g":4,"v":7,"w":7,"y":7,"j":7,"x":14,"m":4,"n":4,"z":4,"s":4,"f":7,"t":7,"r":7,"p":4,"u":5,"c":2,"o":4,",":14,".":14,"-":14}},"t":{"d":"91,-189r0,25r-31,0r0,129v-3,19,16,18,31,16r0,25v-30,6,-60,0,-60,-28r0,-142r-26,0r0,-25r26,0r0,-51r29,0r0,51r31,0","w":100,"k":{"e":2,"a":4,"g":4,"x":7,"m":4,"n":4,"z":4,"s":4,"f":5,"t":5,"r":4,"c":4,"o":5,"d":2,"q":2}},"u":{"d":"174,0r-27,0r0,-26v-26,52,-125,43,-124,-17r0,-146r30,0r0,134v0,23,15,37,39,37v68,1,50,-102,52,-171r30,0r0,189","k":{"e":4,"c":4,"o":4,"d":2,"q":2,",":14,".":14,"-":22}},"v":{"d":"103,0r-33,0r-66,-189r33,0r51,153r53,-153r34,0","w":180,"k":{"e":7,"a":7,"g":7,"j":7,"x":7,"m":14,"n":14,"z":14,"s":7,"f":4,"t":4,"r":9,"p":11,"u":11,"c":7,"o":9,"d":5,"q":5,",":22,".":22,"-":7}},"w":{"d":"199,0r-34,0r-38,-148r-36,148r-34,0r-55,-189r33,0r39,147r36,-147r37,0r37,147r37,-147r34,0","w":259,"k":{"e":7,"a":7,"g":7,"j":7,"x":7,"m":14,"n":14,"z":14,"s":7,"f":4,"t":4,"r":9,"p":11,"u":11,"c":7,"o":9,"d":5,"q":5,",":22,".":22,"-":7}},"x":{"d":"105,-98r65,98r-35,0r-47,-72r-48,72r-34,0r67,-96r-63,-93r34,0r45,69r46,-69r33,0","w":180,"k":{"e":7,"a":4,"g":4,"v":7,"w":7,"y":7,"m":7,"n":7,"z":7,"s":4,"r":7,"p":4,"u":7,"c":7,"o":9,"d":5,"q":5,",":14,".":14,"-":22}},"y":{"d":"140,-189r32,0r-84,229v-13,35,-37,44,-69,34r0,-27v37,13,42,-23,52,-46r-64,-190r32,0r48,147","w":180,"k":{"e":7,"a":7,"g":7,"j":7,"x":7,"m":14,"n":14,"z":14,"s":7,"f":4,"t":4,"r":9,"p":11,"u":11,"c":7,"o":9,"d":5,"q":5,",":22,".":22,"-":7}},"z":{"d":"159,-189r0,27r-111,136r117,0r0,26r-154,0r0,-27r113,-135r-105,0r0,-27r140,0","w":180,"k":{"e":7,"a":7,"g":7,"v":7,"w":7,"y":7,"j":4,"x":7,"m":11,"n":11,"z":11,"s":7,"f":4,"t":4,"r":11,"p":7,"u":13,"c":7,"o":9,"d":5,"q":5,",":14,".":14,"-":25}},"{":{"d":"99,-262r0,23v-66,-7,8,129,-57,146v37,12,29,73,29,122v0,21,8,25,28,24r0,23v-61,11,-55,-50,-55,-107v0,-33,-8,-46,-29,-50r0,-24v68,-4,-21,-173,84,-157","w":120},"|":{"d":"36,-262r22,0r0,338r-22,0r0,-338","w":93},"}":{"d":"10,76r0,-23v46,8,29,-53,29,-89v0,-30,10,-48,30,-57v-38,-12,-30,-72,-30,-122v0,-22,-8,-25,-29,-24r0,-23v62,-11,57,49,57,107v0,33,6,46,27,50r0,24v-65,6,23,174,-84,157","w":120},"~":{"d":"81,-129v-18,-15,-37,6,-35,24r-19,0v2,-42,26,-64,58,-47v19,10,37,31,60,31v16,0,19,-10,19,-27r19,0v1,82,-71,45,-102,19","w":210},"\u00a0":{"w":100}}});//Map path and default settings - you can edit thisvar simplemaps_countrymap_mapinfo={  map_name: "country",  state_bbox_array:{IDN555:{y:306,x:453,x2:526,y2:328},IDN554:{y:190,x:669,x2:867,y2:312},IDN557:{y:100,x:532,x2:628,y2:200},IDN556:{y:192,x:562,x2:632,y2:261},IDN381:{y:36,x:45,x2:119,y2:142},IDN513:{y:9,x:611,x2:699,y2:124},IDN558:{y:143,x:853,x2:999,y2:328},IDN1223:{y:258,x:248,x2:302,y2:300},IDN1227:{y:262,x:254,x2:261,y2:269},IDN1226:{y:258,x:220,x2:256,y2:282},IDN1225:{y:178,x:132,x2:191,y2:249},IDN1224:{y:256,x:295,x2:363,y2:309},IDN1229:{y:211,x:188,x2:238,y2:259},IDN1228:{y:84,x:298,x2:418,y2:197},IDN1931:{y:113,x:343,x2:453,y2:207},IDN1796:{y:26,x:181,x2:307,y2:144},IDN1185:{y:34,x:408,x2:522,y2:181},IDN1933:{y:106,x:754,x2:875,y2:223},IDN540:{y:294,x:327,x2:345,y2:308},IDN1930:{y:146,x:133,x2:208,y2:190},IDN1837:{y:107,x:569,x2:620,y2:123},IDN1230:{y:166,x:154,x2:241,y2:237},IDN1231:{y:162,x:221,x2:289,y2:200},IDN1232:{y:305,x:423,x2:450,y2:323},IDN1233:{y:254,x:347,x2:454,y2:321},IDN1234:{y:159,x:420,x2:469,y2:235},IDN1235:{y:306,x:520,x2:656,y2:368},IDN1236:{y:170,x:529,x2:583,y2:291},IDN1237:{y:148,x:516,x2:541,y2:207},IDN1136:{y:1,x:1,x2:72,y2:86},IDN492:{y:74,x:111,x2:192,y2:153},IDN539:{y:110,x:79,x2:149,y2:202},IDN538:{y:72,x:637,x2:751,y2:183}},paths: {    IDN555: "M472.8 312.5l-0.2 0.4-0.7 1.1-0.2 0.2-0.1 0.3-0.1 1.6-0.3 0.4-0.9 0.9-0.2 0.5-0.4 0.7-1 1.7-0.7 0.7-0.5 0.6 0.2 0.6 0 0.3 0 0.3 0.3 0 0.2-0.4 0.2-0.1 0.2 0.2 0.2 0.1 0.3 0.2 0.4 0.1-0.5 0.7-0.9 0.1-0.4-0.1-0.7 0.5-0.6 0-0.3-0.2 0.4-0.5 0.2-0.5 0.2-0.5-0.3-0.2-0.7 0.1-0.6 0.4 0 0.6 0.1 0.8 0 0.8-0.3-0.1 0-0.6-0.2-0.2-0.2-0.1-0.2 0.3-0.2 0.1-0.3-0.5-0.2-0.1-0.4 0.1-0.8 0.3-0.4 0-0.1 0-0.2-0.2-0.1-0.1-0.2 0.1-0.3 0.2-0.2 0-0.2-0.1-0.3-0.6-0.3-0.2-0.3 0-1-0.1-0.1 0.4-0.3 0.1-0.2 0-0.3-0.3 0.2 0 0.2-0.2 0-0.2-0.1-0.1-0.2-0.1-0.4 0.2-0.2 0-0.1 0.2 0 0.2 0.1 0.5-0.3 0.1-0.2 0-0.2-0.1-0.2-0.1-0.1-0.2-0.2-0.5-0.1-0.2-0.3-0.2-0.2 0.1-0.3 0.1-0.4-0.1-1.3-0.7-0.6-0.1-0.2-0.6 0-0.5 0.1-0.4 0.3-0.5 0.4 0.1 0.3-0.1 0.1 0.1 0 0.3 0.1 0.2 0.6 0 0.5 0 0.3 0 0.3-0.2 0.3-0.2 0.2 0.1 0.2 0 0.5 0.2 0.4-0.3 0.2 0 0.1 0.3 0.2 0.2 0.3-0.3 0.2-0.2 0.1-0.2-0.7-0.3 0.1-0.9 0.1-0.7 0.1-1.4-0.3-1.2-0.5-0.5-0.2-1.2 0.5-0.7 0.4-0.1 0.6 0 0.2-0.1 0.1-0.1 0.1-0.4 0.1-0.1 0.4-0.3 0.6-0.3 0.3-0.3 1.9-1.9 0.4-0.3 1.9-0.7 0.4 0 0.7 0.3 1.6 0.4 0.9 0.2 0.3 0.2 0.4 0.2 0.4 0.2 0.9 0.1 0.8 0.3 0.8 0.6 0.6 0.8 0.2 0.8z m17.6-0.2l-0.4 0.1-0.2-0.1-0.7-0.4-0.2-0.3 0-0.1 0.3-0.3 0.3-0.8 0-0.3-0.3-0.3-0.3-0.4-0.1-0.9 0-0.3 0.2-0.2 0.1-0.2 1.2-0.6 0.3-0.1 2.2 0.1 0.4 0.2 0.2 0.2 0.1 0.2-0.1 0.2-0.1 0.1-0.4 0.2-0.6 0.6-0.4 0.6-1.2 2.4-0.3 0.4z m33.6-2.8l-0.5 0.2-0.6 0-0.6-0.6 0-1 0.4-0.9 1-0.4 0.6 0.4 0.4 0.4 0.1 0.5-0.2 0.7-0.3 0.3-0.3 0.4z m-24.5-3.4l0.1 0.2 0.2 0 0.2-0.2 0.2 0 0.4 0.1 1.1 0.1 0.9 0.1 0.8 0.5 0.4 0.8 0.1 0.9 0.1 0.4 0.1 0.2 0.1 0.2 0.7 0.9 0.5 0.9 0.2 0.2 0.1 0.1 0.3-0.2 0.7 0.7 0.2 0.1 0.3-0.1 0.4-0.2 0.4-0.3 0.6-0.6 0.2-0.2 0-0.2 0.4-0.2 0.2-0.2 0.3-0.5 0.5-0.2 0.5-0.1 0.3 0.1 0.2 0.1 0.4 0.3 0.3 0 0.8 0 0.2 0.1 0.4 0.2 0.7 0.1 0.2 0.1 0.3 0.3 0.7 1.5-0.1 0.4-0.1 0.5-0.1 1-0.5 1.5-0.1 0.3 0.3 0.2 0.3-0.4 0.3-0.4 0.4-0.9 0.3-0.4 0-0.3-0.2-0.5 0-0.8 0.3-0.7 0.5-0.5 0.5-0.4 0.7-0.3 1.1-0.1 1 0 0.9 0.1 0.5 0.2 0.4 0.1 0.2 0.3 0.1 0.5 0.1 0.6 0.3 1 0.6 1.2-0.1 0.8-0.3 0.9 0.2 0.7-0.1 0.6 0.1 0.5 0.3 0.3 0.5 0.2 0.3-0.1 0.4-0.2 0.4-0.2 0.3-0.2 0-0.2-0.2-0.3 0.5-0.1 0.1-0.2 0-0.2 0-0.2 0.2-0.2 0.2 0.3 0.4 0.5 0.1 0.3-0.3 0.2 0.1 0.2-0.3 0.2-0.1 0.2 0 0.3 0.1 0.3 0.1 0.3 0.1 0.3-0.2 0.2 0.1 0.3-0.4 0.2-0.3 0.2-0.3 0.1-0.4-0.2 0 0.3-0.2 0.1-0.2 0-0.2-0.2-0.3-0.1-0.3 0-0.2 0.1-1.4 0.2-0.4-0.1-0.6-0.4-0.4-0.7-0.2-0.2-0.4 0-0.1 0.1-0.1 0.2-0.2 0.2-0.5 0.2-0.9-0.3-0.5 0.3-0.6-0.3-0.4 0.2-0.4 0.3-0.6 0.4 0.3 0.1 0.3 0.3 0.2 0.1 0.2 0.1 1.7 0 1.8 0.3 0.4 0.1 0.2 0.2 0.1 0.2 0.2 0.3 0 0.1-0.1 0.2-0.2 0.1-0.6 0.1-0.2 0-0.5-0.1-0.2 0-0.3-0.2-0.1 0.1-0.3 0.2-0.1 0-0.2-0.1-0.9-0.7-0.5-0.3-0.9 0-1 0.2-4.4 1.2-1.1-0.2-0.6-1.3 0.1-0.6 0.3-0.4 0.4-0.4 0.3-0.6 0-0.3 0.1-0.4-0.1-0.3 0-0.3-0.2-0.3-0.2-0.3-0.1-0.4 0-0.4-0.3 0.3-0.1 0.5 0.1 1-0.1 0.2-0.4 0.2-0.5 0.1-0.3 0.1-0.6 0.8-0.3 0.7-0.1 0.1-0.2 0.2-0.2 0-2.6 2.1-0.3 0.1-0.5-0.2-0.5-0.3-0.4-0.1-0.2 0-0.7 0.3 0-0.1-0.3-0.1-0.1 0.3-0.2 0.1-0.2 0.3-2.4 1.2-0.2-0.2-0.2 0-0.3 0.1-0.1-0.1-0.2-0.4-0.1-0.1-0.3 0-0.2 0.1-0.2 0.4-0.4 0.1-0.3 0-0.1 0-0.5-0.2-0.2-0.3-0.3 0.1-0.3 0.1-0.9 0.4-2.4 1.4-0.9 0.4-2.8 0.8-1.2 0.1-0.7-0.3-0.6-0.1-1-0.4-0.7 0-0.5 0.2-0.4 0.6-0.2 0.4-0.4 0.3-1.2 0.2-1.3 0.2-0.4-0.5-0.5-0.3-0.4-0.3-0.5 0.1-0.4 0-1.3-0.4-0.4-0.1-0.5-0.1-0.7-0.5-0.3 0 0-0.2-0.3-0.5-0.4-0.4 0.1-0.4 0.3-0.5-0.1-0.4-0.2-0.7 0.6-0.5 0.3-0.5 0.9-0.2 0.2-0.4-0.1-0.3-0.4-0.3-0.1-0.4-0.2-0.2-0.4 0.1-0.1-0.3 0.1-0.7 0-0.5-0.5-0.3 0.9-1.8 0.9-0.2 0.2-0.5 0-1 0.4 0.3 0.2 0.1 0.3 0 0.2 0 2.1-0.7 1-0.6 1.3-0.9 0.7-0.5-0.2-0.4 0.5-0.3 0.8-0.1 0.4-0.2 0.5 0.6 0.3 0.1 0.7 0 0.2 0.1 0.3 0.2 0.7 0.3 0.8 0.6 1.7 0.8-0.1-0.4 0.1-0.2 0.1-0.3 0.1-0.2 0-0.4 0.1-0.1 0.2 0.1 0.3 0.1 1.1 0 0.5-0.1 0.3-0.2 0.2 0.4 0.2 1.4 0.4 0.6 0.1-0.4 0-1.1 0.3-0.3 0.2 0.2 0.2 0.4 0.1 1.5 0.1 0.3 0.2 0.3 1.1 0.5 0.2-0.1 0.2-0.1 0.3-0.1 0.2 0.1-0.1 0.3 0.4 0.2 0.3 0.3-0.1 0.2 0 0.2 0.5 0.1 0.1 0.2-0.3 0-0.3 0.1-0.2 0.1 0.2 0.3 0.3 0.8 0.2 0.3 0.4 0.2 0.4 0 1.3-0.4 0.2 0 0.1 0.2 0.1 0.4 0.3 0 0.4 0.1 0.4 0.1 0.3 0.3 0.5-0.4 0.9-1 0.3-0.2 0.1 0 0.4-0.5 1.2-0.2 0.7 0 0.2 0 0.4 0.3 0.2 0 1.1 0 0.5-0.1 0.3-0.3 0.2-0.4 0-0.4-0.2-0.4-0.2-0.3-0.4-0.1-0.2-0.3-0.2-0.1-0.1 0.1-0.2 0.2-0.3 0.3-0.3-0.6-1-0.8-0.3-0.6-0.1 0-0.3 0.2-0.3-0.1-0.6-0.7-0.3-0.2-0.5 0.2-0.7 0.3-0.3 0-0.4-0.2-0.4-0.3-0.3-0.4-1.3-0.7-1.2-1-0.3-0.3-0.5-0.8-0.4-0.3-0.6-0.5-0.2-0.3-0.2-0.2-0.2-0.1-0.2-0.2 0.1-0.6 0.2-0.6 0.2-0.4 0.3-0.2 0.2-0.1 0.3 0 0.5-0.4 0.2 0 0.3-0.1 1.8-0.7 0.5-0.1 0.9 0 0.2 0.1 0.1 0.2z",    IDN554: "M722 308.5l0.1 0.7 0.3 0.5-0.1 0.2-0.3 0.2-0.3 0-0.5 0.1-0.7 0-0.6-0.1-0.4-0.1-0.4-0.3-0.1-0.2 0.1-0.2 0.2-0.3 0.1-0.2 0.1-0.2 0.3-0.1 0.4 0.2 0.6-0.1 0.6-0.3 0.5 0 0.1 0.2z m17.7 0.3l0 0.3-0.2 0.3-0.2 0.3-0.2 0-0.3 0-0.3-0.2-0.3-0.2-0.4-0.2-0.2 0.1-0.2 0.2-0.3 0.1-0.6-0.2-0.8-0.5-0.4-0.5 0.6-0.3 0.6-0.2 2.1 0.2 0.1 0.1 0.9 0.4 0.1 0.3z m-29.2 0.4l-0.5 0-0.4-0.1-0.6-0.5-0.4-0.1 1.7-1.2 0.5 0 0.4 0 0.4 0.1 0.4 0.4 0.3 0.4-0.1 0.4-0.5 0.2-0.5 0-0.7 0.4z m3.1-3.1l0.8 0.2 1.5 0.5 1.7 0.3 0.9 0 0.7-0.3 0.7 0.4 0.1 0.3-0.2 0.4-1.1 0.9-0.3 0.1-0.3 0.6-0.3 0.2-0.4-0.1-0.3-0.1-0.9-0.6-0.3-0.2-0.3 0-1.3-0.1-0.5-0.1-0.3-0.3-0.6-0.4-0.2-0.3 0-0.5-0.1-0.2-0.2-0.1-0.3-0.2 0-0.2 0.2-0.1 0.3 0 0.2 0 0.8-0.1z m70.4 1l0.1 0.1 0.2 0.1 0.1-0.1 0.2-0.3 0.1-0.1 0.4-0.1 0.3-0.1 0.4-0.1 0.5 0.2-0.4 0.6-0.7 0.3-0.6 0.3-0.9 0.6-1.5 0.6-0.3 0-0.6 0-1.1 0.3-0.1 0.1 0 0.7-0.1 0.2-0.3 0.3-0.9 0.6-0.3 0.3-0.2 0-1.1 0 0.3-0.3 0.9-1.1 0.4-0.4 0.2-0.3 0.2-0.3 0.3-0.1 0.2-0.1 0.6-0.2 0.2-0.2 0.2-0.3-0.1-0.2-0.1-0.3 0-0.4 0.1-0.4 0.2-0.2 0.2 0 0.3 0.2 0.5 0.1 0.9-1.1 0.5-0.2 0.3 0.1 0.7 0.8-0.1 0.2-0.1 0.2z m-83.6-0.8l-0.5 0.1-1.1-0.3 0-0.2 0.1-0.2 0-0.7 0.1-0.3 0.2-0.2 0.4-0.2 0.3 0.1 0.3 0.1 0.2 0.3 0.2 0.3 0 0.4 0 0.3-0.2 0.5z m55.2-6.5l0.2 0.1 0.7 0 0.5 0.2 0.2 0.1 0.1 0.1 0 0.3-0.2 0.5 0.1 0.2 0.3 0.1 0.1 0.3 0.1 0.4-0.1 0.4-0.3 0.3-0.7 0.8-0.7 1.3-0.1 0.3-0.4-0.1-1.4-0.3-0.1-0.2-2.1-2.3-0.2-0.5 0.1-1.5 0.3-0.6 0.7-0.2 2 0 0.2 0 0.5 0.2 0.2 0.1z m6.5-1.1l0.2 0.1 0.2 0.2-0.1 0.3-0.3 0-0.3-0.2-0.2-0.1-0.2 0-0.2 0 0.1-0.3 0.4 0 0.2 0 0.2 0z m-1.1-0.4l-0.2 0.2-0.2-0.1-0.1-0.2-0.2-0.1-0.1-0.3 0-0.2 0.1-0.1 0.2-0.1 0.2 0.1 0.1 0.2 0 0.2 0.2 0.4z m24.2-2.6l-0.2 0.9-0.3 0.4-0.3 0.2-1-0.2-0.3 0.1 0.2 0.6-1.2-0.1-0.4-0.2 0.3-0.7 0.1-0.1 0.3-0.2 0.2-0.1 0.6 0 0.4-0.1 0.3-0.2 0.2-0.2 0.1 0.1 0.2 0 0.2-0.1 0.3-0.2 0.2 0 0.1 0.1z m-95.7 1l0.3 0 1.3-0.1 0.4 0.1 0.1 0.2 0.2 0.4 0.1 0.3 0.1 0.6 0 0.2-0.1 0.2-0.2 0.1-0.2-0.1-0.3-0.1-0.2-0.1-0.9 0.1-0.5 0.1-0.3-0.2-1.8 0.6-0.2 0.1-0.5 0.5-0.2 0.1-0.5 0.2-0.2 0.1-1.1 1.5-0.1 0.1 0.1 0.4-0.2 0.2-0.2 0.3-0.3 0.5-0.2 0.2-0.2-0.2-0.5-0.5-0.2 0-1.1 0-0.5-0.1-1.1-0.3-0.5-0.1-1.9 0.3-0.4-0.2-0.3-0.3-0.4-0.3-0.5-0.1-0.5 0.2-0.4-0.2-0.4 0-1.2 0.2-0.4 0.2-0.3 0.1-0.5 0-0.2 0-0.2 0.1-0.1 0.3-0.1 0.2-0.4 0.1-1.9 1.5-0.5 0.2-0.3-0.2 0-0.3 0.3-0.5 0.2-0.4 0.2-0.2 0-0.2 0-1.5 0.2-0.3 0.2-0.3 0.3-0.3 0.3 0 0.4-0.2 0.1-0.5 0.1-0.5 0.1-0.3 0.5-0.3 0.1-0.1 0.2-0.4 0.6-0.9 0.2-0.2 0.2-0.2 0.3 0 0.2 0 0.7 0.3 0.2 0.2 0.1 0.1 0.2 0.1 3.4 0.5 0.3-0.1 0.6-0.4 0.4-0.1 0.4 0 0.5 0.1 0.5 0.1 0.4-0.2 1.1-1 1.2-0.5 0.7-0.5 0.4-0.1 2.2-0.5 0.3-0.2 0.2 0 0.1 0.1 0 0.5 0 0.2 0.1 0.2 0.3 0.2 0.9 0.5 0.3 0.2 0.2 0.3 0.2 0.2z m64.2-2.5l0.2 0.1 0.2 0 0.2-0.1 0.1 0.1 0 0.2-0.4 0.2-0.3 0-0.1-0.2-0.4-0.2-0.1-0.3 0.1-0.3 0.2 0.1 0.3 0.4z m-49.7 2.1l-0.4 0.1-0.3 0-0.2-0.3 0-0.4 0-0.2 0.1-0.2 0.3-0.1 0.2-0.1 0-0.2 0-0.4-0.3-0.7 0-0.3 0.2-0.4 0.3-0.1 0.7 0.2 0.5 0.2 0.3 0.1 0.3 0.1 0.3 0.1 0.1 0.3 0 0.7-0.1 0.3-0.3 0.1-0.8 0.4-0.3 0-0.2 0.2-0.2 0.4-0.2 0.2z m75.4-3.6l0.7 0.6 0.2-0.2 0.3 0.1 0.3 0.2 0.3 0.1 0.7-0.2 0.1 0.1-0.3 0.3 0.3 0.2 0.1 0.1 0 0.1-0.2 0.1-0.3-0.2-0.1-0.1-0.5 0.3-0.9 0-0.8-0.2-0.3-0.1-0.1-0.3 0.1-0.3 0.3-0.6 0.1 0z m6.9-1.6l-0.3 0.2-0.9 0.9-0.5 0.3-0.2 0.1-0.1 0.3-0.2 0.2-0.2 0-0.3 0.1 0-0.2 0.2-0.2 0.1-0.3-0.5 0-0.5 0.2-0.4 0-0.4-0.3-0.1-0.4 0.2-0.4 0.2-0.3 0.4-0.2 0.2 0 0.1 0 0.4 0.1 0.3 0 1.3-0.2 0.3-0.1 0.4 0 0.2-0.1 0.2 0.1 0.1 0.2z m2.2-2l0 0.1 0.2-0.2 0.1 0 0.1 0.2-0.1 0.2-0.1 0.1-0.5 0.3 0.2 0.3-1.1-0.1-0.3-0.2 0.4-0.2 0.2-0.4 0.4-0.5 0.1-0.2 0.4 0.6z m8.1-3.4l0 0.1 0.3-0.1 0.2-0.2 0.3-0.4 0.3-0.2 0.1 0.1 0.1 0.3 0.5 1 0 0.3-0.3 0.2-0.3 0.1-0.3 0.1-0.3 0-0.2-0.1-0.2 0-0.2 0.2-0.2 0.3-0.1 0.2 0.1 0.6 0 0.4 0 0.2 0.5 0.8 0.1 0.3 0 0.3-0.3 0.2 0.2 0.3 0.6 0.4 0.2 0 0.1 0.2-0.3 0-0.3 0.6-0.1 0.5-0.1 0.1-0.3 0.2 0.2 0.5-0.1 0.5-0.3 0.5-0.2 0.9-0.2 0.5-0.3 0.4-0.3 0.1-0.1 0.1-0.5 0.9-0.1 0.1-0.3 0.3-0.4 0.1-0.6 0.1-0.3 0.2 0.1 0.5-0.1 0.2-0.2 0.1-0.2 0.1-0.3-0.1 0.2 0.5-0.3 0.2-0.3 0.2-0.2 0.1-0.1 0.2-1 0.7-0.1 0.3-0.1 0.3 0 0.4-0.2 0.2-0.3 0.2-0.2 0.2-0.2 0.4 0.2 0 0.2 0.1 0.1 0.1-0.2 0.4-0.1 0.2 0 0.3-0.3 0.3-0.4 0.3-0.3 0.2-0.2-0.3 0.3-0.8 0.1-0.5-0.2-0.2-0.2 0-0.1-0.1-0.1-0.1-0.3 0.2-0.1 0.2-0.1 0.5 0 0.3-0.6 0.3-0.9 0.1-1.6-0.1-0.2-0.3 0.1-0.4 0.3-0.9 0-0.4-0.2-0.3-0.3-0.2-0.2 0.1-0.2-0.5 0.1-0.5 0.3-0.4 0.4-0.3 0.3 0 0.2 0.1 0.2 0 0.2-0.2 0-0.3-0.2-0.1-0.3-0.2 0-0.2 0.4 0 0-0.2-0.1-0.3 0-0.2-0.2 0-0.2 0 0-0.1 0-0.3-0.2 0 0 0.2-0.1 0-0.1-0.6 0.1-0.3 0.4-0.1 0.5 0.1 0.9 0.5 0.4 0 0.6-0.2-0.4-0.1-0.4-0.2-0.4-0.2-0.3-0.7 0-0.2 0.2-0.1 0-0.1 0.1-0.8 0.2-0.4 0.4-0.7 0.1-0.3 0.1-0.6 0.2-0.4 0.3-0.3 1.3-1.1 0.3-0.1 0.2 0.1 0.2 0.3 0.2 0 0.1-0.2 0.3-0.7 0.1-0.1 0.2-0.2 0.1-0.3-0.1-0.2 0-0.2 0.2-0.2 1.2-0.1 0-0.2-0.1-0.2 0-0.2 0.1-0.4 0.2-0.3 0.4-0.5 0.2-0.4 0.1-0.1 0.3-0.1 0.4 0 0.4-0.2-0.3-0.6-0.1-0.4 0.2-0.4 0.7-0.5 0.5-0.2 0.6-0.2 0.4-0.1 0.4 0.1 0.1 0.3-0.1 0.9z m5.7-1.4l0.3 0.2 0.3 0.3 0 0.3 0.2 0.3 0.5 0.4 0.1 0.4 0.1 0.8-0.1 0.4-0.4 0.2-0.2-0.1-0.7-0.6-0.2-0.1-0.2-0.8-0.6-0.4-0.7 0-1.6 0-0.6-0.1-0.2-0.4 0.5-0.7 2.6 0 0.5 0 0.4-0.1z m-70.4 1.6l-0.8 0.9-0.4-0.2-0.8-0.7-0.8-0.3-0.3-0.3-0.1-0.4 0.2-0.4 0.6-0.5 0.6-0.4 0.6-0.2 0.2 0.1 0.3 0.3 0.2 0.2 0.2 0.1 0.4 0 0.1 0 0.3 0.3 0.1 0.3-0.3 0.2-0.4 0.1-0.3 0.2 0.2 0.3 0.3 0.3-0.1 0.1z m10.1-3.9l-0.1 0-0.2-0.1-0.2-0.2 0-0.3 0.2-0.1 0.2-0.1 0.2 0 0.2 0.3-0.1 0.3-0.2 0.2z m8.4-6l0.1 0.1-0.1 0.2-0.2 0.5-0.2 0.2-0.2 0-0.3-0.2-0.1 0-0.1-0.1 0-0.3 0.2-0.3 0.2-0.1 0.3 0 0.2-0.1 0.2 0.1z m45.5-0.3l-0.4 0.4-0.5-0.2-0.3 0.3 0 0.4 0.5 0.3-0.2 0.4-0.4 0.3-0.3 0.1-0.5-0.5 0.2-0.9 0.6-0.9 0.7-0.4 0.5 0.1 0.2 0.2-0.1 0.4z m66.3 1l-0.2 0.4-0.3-0.1-0.7-0.5 0.2-0.3 0-0.1-0.1-0.4 0.1-0.2 0.8-1.1 0.2-0.9 0.1-0.2 0.1-0.2 0.2-0.1 0.3 0 0.2 0.2 0.3 0.2 0.1 0.2 0 0.4-0.2 0.7-0.1 0.4-0.2 0.3-0.2 0.2-0.5 0.8-0.1 0.3z m1.1-4.6l-0.3 0.2-0.2-0.1-0.2 0.1-0.2 0.1-0.2 0.1-0.5-0.1-0.1-0.4-0.1-0.5-0.2-0.3-0.2-0.2-0.1-0.2 0.2-0.2 0.3-0.3 0.4-0.2 0.5 0.1 0.4 0.2 0.3 0.4 0.2 0.4 0.1 0.5-0.1 0.4z m-102.2-4.8l-0.2 0-0.1 0-0.2-0.2 0-0.2 0.1 0 0.4 0.1 0.1 0.1-0.1 0.2z m99.6 2.1l-0.1 0.4-0.3 0.3-0.8 0.4 0.3 0.4-0.1 0.5-0.4 0.3-0.7-0.3-0.2-0.3-0.1-0.3-0.1-0.5-0.1-0.2-0.5-0.6-0.3 0-0.3 0-0.2 0-0.1-0.3-0.1-0.2-1.3-0.5-0.2-0.2-0.1-0.3 0.1-0.2 0.1-0.2 0.4-0.3 0.4-0.2 0.3-0.4 0.3-0.2 0.4-0.1 0.3 0.1 0.3 0.2 0.6 0.3 0.3 0.2 0.5 0.6 0.3 0.3 0.4 0.1 0.3 0.2 0.3 0.2 0.3 0.4 0.1 0.4z m5 0.8l-0.3 0.3-0.3-0.2-0.3-0.3-0.1-0.2 0.3-0.2 0-0.1-0.3-0.6 0.1-0.6 0.4-0.6 0.4-0.1 0-0.6 0-0.4 0.2-0.1 0.3-0.1 0.3 0.1 0.3 0.2 0.1 0.3-0.1 0.5-0.1 0.4-0.4 0.8-0.5 1.5z m-8.7-0.3l0.1 0 0.2-0.1 0.1 0.1 0.1 0.1 0.1 0.3 0.4 0.7 0 0.2 0.1 0.1 0 0.2-0.2 0.2 0 0.1 0.1 0.9 0.6 0.2 0.2 0.1-0.1 0.3-0.2 0.2-0.1 0.4-0.1 0.2-0.5 0.5-0.5 0-0.5-0.2-0.6 0.1 0 0.2 0.4 0 0.3 0.3 0.1 0.1-0.1 0.2-0.2 0.3-0.3 0.2-0.3 0.1-1.1 1.8 0.4 0.1-0.1 0.3-1.1 0.9-1.4 0.5-0.8 0.6-0.5 0.1-0.6-0.9-0.2-0.4-0.1 0-0.3-0.2-0.8-0.2-0.4-0.3-0.2-0.6-0.2-0.5 0-0.2 0-0.3 0.2-0.7 0.5-1.7 0.4-3.7 0.1-0.3 0.2-0.2 0 0.3 0.2 0.4 1.2 0.2 0.6 0.4-0.1-0.4-0.3-0.6-0.1-0.4-1.1 0.1-0.4-0.7 0.2-2-0.2-0.8-0.4-1.4-0.1-0.7 0.1-0.3 0.2-0.2 0.3 0 0.3 0.1 0.2 0.3 0.1 0.3 0.3 0.3 0.7 0.2 0.3 0.2 0.8 0.7 0.6 0.5 0.4 0.2 0.1 0.1 0 0.3-0.1 0.2-0.1 0.2-0.1 0.1 0.6 0.7 0.4 0.4 0.4 0.2 0.9 0.2 0.3 0.2 0.3 0.3 0.4 0.3z m-6.1-9.6l0 0.9 0.1-0.1 1-0.4 0.2 0 0.2 0.1 0.2 0.7 0.1 0.3 0.1 0 0.1-0.1 0.5-0.2-0.1 0.4-0.5 0.4-0.1 0.3-0.1 0.4 0.2 0.3 0.3 0.3 0.3 0.5 0.3-0.1 0.3 0.2 0.7 1.1 0.2 0.1 0.4 0-0.1 0.2 0 0.1 0.5 0 0.2 0.1 0.2 0.2 0.3 0.1 0.3 0.1 0 0.1-0.6 0.1-0.3 0.3-0.3 0.4-0.5 0.3-0.2 0-0.2-0.5-0.5-0.5-0.3-0.1-0.1 0.1-0.2-0.2-0.9-0.8-0.4-0.7-0.3-0.3-0.4 0.3-0.5-0.2 0.1-0.3 0.3-0.4 0.2-0.3-0.1-0.4-0.3 0-0.6 0.5-0.5-0.8-0.1-1 0.2-0.9 0.7-0.6z m1.1-3.9l-0.3 0.1-0.3-0.1-0.2-0.4-0.1-0.4 0.1-0.5 0.2-0.3 0.3 0 0.4 0.1 0.4 0.3-0.1 0.4-0.1 0.5-0.3 0.3z m-32.7-4.6l0 0.3-0.2 0.3 0 0.1 0.2 0.2 0.2 0 0.3-0.1 0.2 0 0.2 0.1 0 0.2 0.1 0.4 0.2 0.8 0.2-0.1 0.1 0 0.1 0.5 0.1 0.4 0.1 0.5 0.4 0.1 0.2 0.2 0 0.5-0.1 1-0.2 0.5-0.2 0.4-0.3 0.4-0.3 0.4-0.4 0.2-0.3-0.4-0.1-0.5-0.2-0.1 0 0.3-0.1 0.2-0.2 0.1-0.2-0.1-0.1-0.1-0.3-0.4-0.1-0.1 0-0.3 0-0.5-0.1-0.3 0-0.3 0.2 0 0-1.2 0-0.5 0.3 0-0.1-0.2-0.2-0.8-0.3 0-0.1-0.1 0.1-0.2 0.1-0.3-0.1-0.1-0.3-0.1-0.1-0.2 0-0.4 0-0.1-0.3-0.4-0.1-0.2-0.1-0.3 0.8 0.4 0.1 0 0.3-0.2 0.3-0.3 0.2 0 0.1 0.4z m1.9-1.4l0.4 0 0.1 0.1 0 0.2-0.3 0.9 0 0.4 0 0.3 0.1 0.4 0.2 0.3-0.1 0.3-0.3-0.2-0.1-0.2-0.2 0.3-0.1 0-0.2 0-0.2-0.2-0.3-0.9 0-0.6 0.2-0.6 0.3-0.7 0.4-0.4 0.1 0.2 0.1 0.2-0.1 0.2z m-9.6-0.4l0.3 0.1 0.4-0.1 0 0.2-0.2 0.2-0.1 0.2-0.2 0.2-0.3 0.1-0.2-0.1-0.3-0.4-0.2-0.4-0.1-0.3 0.3-0.2 0.6 0.5z m48.5-2.4l1 0.4 0.2 0.3 0.3 0.8 0.2 0.3 0.6 0.4 0.2 0.2-0.1 0.1-0.5 0.2 0.2 0.1 0 0.1 0.1 0.4-0.1 0 0-0.1-0.5 0.1-0.3 0.1 0.1 0.1 0.6 0.1 0.4 0.2 0.4 0.2 0.6 0.7 0.5 0.7-0.4 0.3-0.3 0.6-0.2 0.5 0 0.4 0.3 0.1 0.1 0 0 0.3 0 0.3-0.1 0.4-0.5 0.4-0.1 0.3 0.4 0 0.4 0.2 0.3 0.3-0.1 0.4 0.1 0 0.2 0.3-0.2 0.1-0.5 0.3-0.2 0.2-0.1-0.4-0.2-0.1-0.2 0.1-0.1 0.4 0.2 0.2 0.5 0.2 0.2 0.2-0.3 0 0.3 0.5-0.3 0-0.6-0.2-0.4-0.2-0.3-0.3-0.2-0.1-0.3 0-0.3 0-0.3 0.1-0.1 0.1-0.1 0.2 0.9-0.1 0.3 0.2 0.1 0.4 0.2 0.3 0.8 0.7 0.4 0.2 0.8 1 0.2 0.3-0.1 0.5-0.3 0.5-0.4 0.4-0.4 0.3-0.3-0.2-0.1 0.3-0.1 0.2-0.1 0.2 1.1-0.4 0.4-0.3-0.1 0.4-0.2 0.3-0.1 0.2 0.2 0.5-0.1 0.2-0.1 0.3-0.4 0.8-0.1 0.4-0.4 0.5-1.5 0.6-0.5 0.4-0.5-0.3-0.3-0.1-0.3 0.1-0.1 0-0.4-0.5-0.4-0.4-0.1 0-0.2-0.3-0.9-0.5-0.2-0.3-0.3 0-1.3-0.5-0.1 0-0.2-0.4-0.1 0-0.3 0.1-0.3-0.1-0.1-0.2-0.2-0.5-0.6-0.7-0.3-0.8 0-0.8 0.4-0.6 0.4-0.2 0.4 0.1 0.4 0 0.4-0.4 0-0.2-1.2 0.1-0.2-0.3 0-0.3 0.2-0.4 0.1-0.4-0.1-0.2-0.5-0.7 0-0.1 0.2-0.1 0.3-0.3 0.2-0.2 0-0.5 0.8-0.4-0.1-0.3 0-0.2 0.5-0.5 0-0.2-0.4-0.3-0.1 0.3-0.3 0.2-0.2 0-0.1-0.5-0.2-0.2-0.4-0.1-0.7 0-0.4-0.2-0.3-0.2-0.6-0.4-0.1-0.4 0.3-0.4 0.5-0.2 0.4-0.1 0.4 0.1 0.7 0.6 0.5 0.1 0.4-0.1 0.2-0.2 0-0.3 0.2-0.4 0.2-0.2 0.3-0.2 0.3-0.3 0.2-0.6 0.9-1.7 0.1 0.4 0.3 0.1 0.2-0.1 0.2-0.3 0.3 0.2 0-0.4 0-0.3-0.1-0.1-0.2-0.3 0-1.1 0-0.1 0.2-0.2 0.3-0.1 0.2 0.2 0.3 0.1 0.6-0.3 0.3-0.1z m-56.6-0.8l-0.2 0-0.1-0.3 0.1-0.7 0.3-0.4 0.4-0.2 0.3 0 0.1 0.4-0.3 0.9-0.2 0.1-0.2 0-0.2 0.2z m23.3 5.7l-0.3 0.1-0.3 0.6-0.5 0.4-0.4 0.6-0.4 0.8-0.2 0.7 0 0.4 0.2 0.7 0 0.4-0.2 0.2-2 2.5-0.3 0.2-0.1-0.3 1.3-3.7 0.5-0.6 0.1-0.2 0.1-1.4-0.1-0.3 0.8-1.3 0.4 0.1 0.3 0.2 0.2-0.1 0.2-0.9 0.1-0.9 0.1-0.4 0.3-0.8 0.8-2.5 0.5-0.7 0.2-0.3 0.1-0.9 0.2-0.3 0.4-0.2 0.4 0 0.3 0.2 0.3 0.3 0.1 0.3 0 0.5-0.1 0.3-0.3 0.2-0.1 0.2-0.6 3.1-0.6 1.6-0.1 0.3-0.6 0.5-0.2 0.1-0.2 0.1-0.3 0.2z m-28.2-19.4l-0.2 0.2-0.2-0.3-0.1-0.5 0-0.5 0.2-0.3 0.4 0.3 0 0.6-0.1 0.5z m-39.1-5.3l0 0.9-0.3 0.1-0.4 0-0.3 0.1-0.2-0.1-0.2-0.1-0.2-0.1-0.3 0 0.3-0.2 1-0.1 0.2-0.2 0.1-0.3 0.2-0.2 0.1 0.2z m37.6 0.2l-0.4 0.2-0.1-0.2-0.9-1.8-0.2-0.3 0.2-0.1 0.1 0 0.3 0.1 0.4 0.5 0.4 0.8 0.2 0.8z m-6.2-8.1l-0.2 0.1-0.7-0.5-1-0.4-0.2-0.2-0.2-0.2-0.1-0.2 0-0.2 0-0.2 0.1-0.2 0.2 0.1 0.2 0.2 0.3 0.3 1 0.7 0.4 0.4 0.2 0.3z m-3.2-2.4l-0.1 0.1-0.3-0.2-0.2-0.4-0.2-0.5 0-0.4 0.6 0.2 0.2 0.2 0.1 0.3 0 0.5-0.1 0.2z m4.5 0.3l-0.2 0.2-0.5-0.1-0.4-0.3-0.2-0.4-0.5-1-0.1-0.3 0.1-0.2 0.2-0.1 0.3-0.1 0.5 0.2 0.2 0.5 0.2 0.7 0.4 0.9z m-91.4-3.2l-0.4 0.2-0.7-0.2-0.4 0-0.6-0.5-0.2-0.4 0-0.5 0.6-0.7 0.4-0.1 0.3 0 0.8 0.3 0.3 0.3 0.1 0.3 0.1 0.5-0.2 0.4-0.1 0.2 0 0.2z m33.7-4.7l-0.4 0.2-0.3-0.1-0.3-0.3-0.1-0.5 0.3-0.4 0.4-0.1 0.4 0.1 0.1 0.4 0.2 0.3-0.3 0.4z m-7.9-1.5l-0.8 0.4-0.2-0.4 0.2-0.4 0.1-0.4 0.1-0.4 0.1-0.3 0-0.3 0.2-0.2 0.2-0.2 0.7-0.3 0.4 0.2 0.8 0.1 0.3 0.2 0.3 0.3 0.4 0.5 0.1 0.5-0.4 0.2-0.4 0-0.8 0.4-0.9 0.1-0.4 0z m-2.4-1.2l0.2 0.5 0.1 0.4 0 0.3-0.5 0.2-0.2 0-0.4-0.3-0.3-0.1-0.4 0-0.1 0.1 0.1 0.3 0.5 0.7 0.1 0.2-0.1 0.1-0.4 0.6-0.4 0.3-0.6 0.2-0.6 0-0.5 0.2-0.3 0.3-0.4 0.3-0.7 0.1 0.2-0.2 0.5-0.3 0.1-0.2 0.4-0.8 1.2-0.8 0.3-0.4-0.4-0.2-0.4 0.2-0.8 0.6-0.9 0.4-0.5 0.3-0.6 0.1-0.2 0.1-0.5 0.4-0.3 0.5-0.5 0.3-0.7 0-0.4-0.2-0.2-0.4 0-0.4-0.3-0.5 0.1-0.2 1-1.2 0.5-0.4 1.1-0.7 0.3-0.1 0.3 0 1.8 0.1 0.3-0.1 1.8-1.3 1-0.4 0.9 0.1 0.4 0.4-0.1 0.3-0.3 0.3-0.2 0.3z m7.4-0.8l0.2 0.1 0.2-0.5 0.3-0.3 0.3 0 0.3 0.5 0.1 0.5 0 1.5-0.4-0.3-0.5-0.4-0.4-0.3-0.3 0.2 0 0.3 0.1 0.2 0 0.2-0.3 0.2-0.2 0-0.1-0.1-0.2-0.2-0.6-0.8-0.2-0.4-0.3-0.5-0.2-0.4 0-0.4 0.5 0 0.3 0 0.2 0.1 0.3 0.4 0.2 0.2 0.7 0.2z m-24.5-6.1l0 0.1 0.7 0 0.4 0.2 0.7 0.9 0.3 0.3 0.2 0.4 0.1 0.3-0.4 0.2-0.5-0.1-0.8-0.4-1-0.2-0.4-0.2-0.2-0.3-0.3-0.3 0.1-0.1 0.6-0.3 0.2-0.3 0.1-0.2 0.2 0z m5.3-0.2l-0.2 0.1-0.6-0.1-1.3 0.2-0.5-0.2-0.3-0.4 0.3-0.5 0.6-0.5 0.5-0.5 0.7 0 0.3-0.1 0.1 0 0.2 0.2 0.3 0.2 0.1 0.3 0.1 0.3 0.1 0.3-0.2 0.5-0.2 0.2z m-19.6-2.9l0.4 0.3 0.5-0.2 0.4 0.3 0.5 0.2 0.5 0.1 0.4 0.1 0.8 0.6 0.4 0.1 0.6 0.3 0.2 0.2 0.2 0.2 0.1 0.2 0.1 0.2 0.1 0.7-0.1 0.2-0.4 0-0.5-0.2-0.3-0.1-0.3 0.3 0 0.3 0.1 0.4 0.2 0.4 0.2 0.3 0.1 0 0.3 0.3 0.3 0.3 0.4 0.1 0.2-0.1 0.3-0.5 0.2-0.1 0.3 0 0.7 0.4 1 0.2 0.5 0.2 0.2 0.3-0.1 0.4-0.4 1-0.2 0.4 0.1 3-0.4 0.8-0.4 0.3-0.5 0.1-0.4-0.2-0.5-0.1-0.4 0.1-2.6 1.3-0.3 0.1-0.2 0.2-0.5 0.6-0.3 0.3-0.8 0.4-1.7 0.5-1.1 0.5-0.8 0.6-0.5-0.1-0.5 0.2-0.5-0.5-0.3-0.1-1.5-0.4-0.7-0.5-0.7-0.1-1.9-0.9-1.2-1-0.4-0.1-0.8-0.2-1.1-0.6-0.4-0.4-0.3-0.3-0.9 0-0.6-0.6-0.2-0.7-0.4-1-1.3-0.9-0.4-0.3-0.4-0.5-0.2-0.6 0-0.1-0.7-1.2-0.4-2.4 0.6-1.7 0.4-0.4 0.6-0.4 0.6-0.5 0.4 0.2 0.2 0.6 0.4 0.3 0.5 0.2 0.5 0.2 0.4 0.1 0.5-0.2 0-0.6 0.7-0.6 0.9-0.3 2.7-0.8 6.4-0.2 2.6 0.3 0.5 0.3 0.3 0.5z m24.1-3.5l-0.3 0.5-0.2 0.2-0.2 0.6-0.1 0.2-0.3 0.2-0.3 0-1.8 0.1-0.2-0.1-0.1-0.2 0.3-0.4 0.4-0.2 0.4-0.2 0.3-0.3 0.2-0.1 0.3 0 0.3-0.2 0.2-0.2 0-0.2-0.2-0.4 0.6 0 0.4 0.1 0.3 0.2 0.2 0.2-0.2 0.2z m33.8-3.7l0.1 0.3 0.2 0.1 1.2 0.2 3.1 1.3 0.3 0 0.2 0.2 0.5 0.7 0.2 0.2 0.4 0 0.2-0.1 0.3-0.1 0.3-0.1 0.1 0.1 0.1 0.4 0.3 0.2 0.2-0.2 0.3 0.1 0.4 0.3 0.3 0.4 0.5 0.2 1.8 0.4 3.6 0 1.9-0.3 0.9 0 1 0.4 2.2 2 0.3 0.2 1.6 0.6 0.2 0.1 0.1 0.2 0.2 0.8 0 0.1 0.5 0.7 0.2 0.9 0 1.8 0.1 0.4 0.4 0.6 0.1 0.2 0.1 0.3 0.4 0 0.8 0 0.9 0 0.7 0.3 0.5 0.3 0.3 0.6-0.4 0.1 0 0.4 0.1 0.5 0.3 0.4 0.7 0.7 0.2 0.4 0.1 0.4-0.1 0.5-0.1 0.2-0.3 0.5-0.1 0.3-0.3 0.4-0.1 0.3-0.1 2.8 0.1 0.3 0.2 0.4 0 0.2-0.5 0.1-0.4-0.2-0.7-0.6-0.3-0.1-0.5 0-2.1-0.8-0.4-0.1-0.2-0.2-0.9-1-0.3-0.2-0.3-0.2-0.4-0.2-0.6 0-0.3-0.1-0.2-0.3-0.4-0.6-0.3-0.3-0.4-0.1-0.4-0.2-0.5 0-0.4-0.1-1-0.7-4-1.3-0.4-0.4-0.1-0.1-0.3 0-1.1-0.4-0.8-0.4-0.4-0.3-0.2-0.3 0-0.1-0.2-0.3-0.1-0.2 0-0.6 0-0.2-0.6-0.7-0.9-0.4-7.5-0.7-0.8 0.1-0.2 0.7 1.1 1.5 0.3 0.8-0.8 0.5-0.9 0-1.8-0.9-1-0.3-2.6-0.2-1-0.2-1.7-0.9-0.6-0.2-0.6 0-1.6 0.2-0.5 0.1-0.5-0.5 0-0.2 0.2-0.5 0.7-1-0.2-0.4-0.4-0.3-0.4-0.2-0.5 0-0.5-0.2-0.2 0-0.6 0.8-1.3 0.5-0.2 0.2-0.1 0.2-1.8 1.5-0.2 0.3-0.2 0.3-0.1 0.2 0.1 0.2 0.3 0.2 0.1 0.1-0.4 0.5-0.9 0.1-1-0.1-0.8 0.1-0.9 0.4-0.6 0.2-0.4-0.2-0.3-0.3-0.7-0.3-0.4-0.4-2.5-4.1-0.3-0.2-0.9-0.1-0.4-0.1-0.6-0.2-0.1 0 0-0.6 0.2-0.5 0.3-0.7-0.1-0.4-0.3-0.4-0.4-0.1-0.6 0.1-0.6 0.6-0.4 0.7-0.3 0.6-0.2 0.8-0.2 2.2-0.1 0.3-0.2 0.3-0.3 0.7-0.2 0.2-0.2 0.1-0.4 0-0.1 0.1-0.2 0.2-0.1 0.4-0.3 0.5-0.2 0.4-0.3 0.7-0.1 0.4 0.1 0.2 0.1 0.2 0 0.1-0.3 0.5-0.1 0.2-0.6-0.6 0.1-1 0.7-1.9 0-1-0.1-0.5-0.1-0.2-0.2-0.1-0.7-0.9-0.2-1.3-0.1-0.3-0.6-0.4 0-0.2 0.5-0.2 0.2 0 0.5-0.1 0.2-0.1 0.2-0.2 0.5-0.5 0.3-0.2 0.3 0 0.6-0.5 0.3-0.2 0.4-0.1 0.4-0.1 0.5 0.1 0.3 0.1 0.5-0.1-0.3-0.8 0-0.2 0.1-0.3 0.4-0.3 0.1-0.2-0.3-0.2-0.4-0.1-0.4 0 0.2-0.3 0.2-0.1 0.6-0.1 0.2-0.1 0.3-0.8 0-0.3 0.4 0 0.1-0.4 0.1-0.3 0.2-0.1 0.3-0.1 0.5 0.2 3.7-0.1 0.8-0.2 0.9 0 0.9-0.3 0.3 0 0.5 0.1 0.8 0.3 0.6 0 4.3 0.1 0.9 0.1 0.5 0 0.9-0.1 0.9-0.3 1.5-0.6 0.8-0.3 0.3 0.4 0.1 0.7-0.2 0.9 0.4 0.2 0.5 1 0.4 0.2 0.2-0.1 0.5-0.1 0.3 0 0.2 0.2 0.2-0.1-0.1-0.3-0.1-0.2 0-0.1 0.3-0.1 0.4 0.4 0.2 0 0-0.3 0.2-0.2 0.3-0.2 0.7-0.3 1.2-0.6 0.6-0.2 0.1-0.3 0.1-0.4 0.1-0.4 0.6-0.3 1-0.2 1.7 0 0.3-0.1 0.1 0z",    IDN557: "M627.9 174.2l0.1 0.2-0.1 0.3-0.1-0.1-0.3-0.4-0.1 0.1-0.3-0.1-0.2-0.1 0.1-0.3 0.3-0.5 0.2-0.1 0.2 0.3 0 0.3 0.2 0.4z m-4.8-1.9l-0.2 0-0.1-0.3 0-0.4 0-0.7 0.1 0 0 0.2 0.2 0.8 0 0.4z m1.6-0.5l-0.6 0.3-0.1-0.5 0.1-0.5 0.3-0.2 0.3 0.2 0 0.1 0.2 0.3 0 0.2-0.2 0.1z m2.7 1l0.1 0.2-0.2-0.1-0.2 0.1-0.2 0.1-0.2 0.1-0.5-0.2-0.3-0.1-0.1-0.3-0.3-1.2-0.1-0.6 0.4-0.5 1.2 1.2 0.2 0.2 0.1 0.3 0.1 0.8z m-16.6-2l-0.3 0.1-0.3 0-0.1-0.2 0.1-1.1 0.1-0.5 0.3-0.8 0.1-0.3 0-0.3 0.2-0.1 0.3 0.1 0.3 0.2 0 0.1 0.3 0.2 0.2 0.5 0 0.5-0.2 0.4-0.3 0.1-0.3 0.3-0.2 0.3-0.1 0.3-0.1 0.2z m4.8-2.6l-0.4 0.3-0.4-0.1-0.2-0.4 0.1-0.4 1.1-1.2 0.6-0.4 0.2-0.1 0.2 0.2 0.2 0.2 0 0.3-0.1 0.2-0.2 0.2-0.4 0.2-0.2 0.2-0.5 0.8z m5.4-3.8l0.3 0 0.2-0.1 0.2 0.1 0.2 0.2 0.2 0.3-0.1 0.3 0 0.3-0.1 0.5 0 0.3-0.2 0.3-0.6 0.4-0.2 0-0.2 0-0.2 0-0.2-0.1-0.3-0.2-0.1-0.1-0.1 0.1-0.2 0.1-0.2-0.1-0.2-0.2-0.2-0.6 0-0.5 0.1-0.3 0-0.3 0-0.2 0.3-0.3-0.1-0.3-0.2-0.1-0.1-0.3 0.1-0.4 0.2-0.5 0.2-0.3 0.3-0.1 0.2 0 0.1-0.2-0.1-0.3 0.2 0 0.1 0.1 0.2 0.2 0.3 1.1 0 0.2-0.1 0.2 0.1 0.4 0.2 0.4z m-8-9.7l1 1.5-0.2 0.2-0.1 0.2-0.2 0.1-0.3 0.1-0.2 0.1 0 0.3 0 0.5 0 0.3 0.4 0.4 0.2 0.2 0 0.3 0 0.7 0.1 0.3 0.5-0.4 0.4-0.5 0.6-1 0.3-0.2 0.1-0.1 0.3-0.5 0.2-0.6 0.2-0.3 0.3-0.1 0.4 0 0.2 0 0.3-0.1 0.1 0.2 0.1 0.4 0.3 0.2 0.1-0.1 0.2-0.3 0.2-0.2 0.3 0.2 0.4 0.5 0.4 0.1 0.4 0 0.4 0.1 0.2 0.3 0.1 0.4-0.1 0.5-0.2 0.8-0.2 0.4 0.1 0.7-0.1 0.2-0.1 0.2-0.5 0.6-0.9 0.8-0.2 0.1-0.4 0.1-0.2 0.1-0.4 0.1-0.6-0.3-0.4 0.2-0.1-0.8-0.1-0.4-0.4-0.1-0.1-0.1 0-0.5-0.2-0.1-0.5 0-0.2 0.1-0.1 0.1-0.5 0.8-0.2 1 0 2 0 0.5-0.2 0.2-0.1-0.2-0.1-0.4-0.1-0.3-0.3 0.1-0.8 0.5-0.1 0-0.2-0.2-0.1-0.2-0.7-0.2-0.2-0.1-0.1-0.2-0.1-0.3 0.1-0.2 0.4-0.2 1-0.6 0.2-0.7-0.5-2.9 0-0.7 0-0.2-0.2-0.2-0.2-0.1-0.2 0.6-0.3 0.2-0.3 0.1-0.3 0.1-0.5 1.1-0.1 0.2-0.3 0.1-0.2 0.3-0.2 0.7-0.4 0.7-0.5 0.5-1.6 1.4-0.5 0.3-0.5-0.1-1.3-3-0.1-0.9 0.1-1 0.2-1 0.3-0.8 1.4-2 0.3-0.1 0.5 0 0.7 0.3 0.3 0.1 0.3-0.1 0.4-0.4 0.3-0.1 1-0.1 0.8 0 0.1 0 0.4 0.3 0.2 0.1 0.3-0.1 0.1-0.2 0-0.2 0.2-0.3 0.2-0.1 0.2 0.1 0.1 0.1 0.1 0.1z m-29.2-16.4l0.9 0.6 0.1 0.2 0.2 0.5 0.1 0.2 0 0.4-0.2 0.2-0.2 0.2-0.4 0.1-0.1-0.1-0.5-0.5-0.3-0.1 0.2 0.5 0 0.1-0.3 0.1-0.3-0.1-0.4-0.3-0.2 0-1-0.2-0.2-0.1-0.2 0.1-0.5 1.1-0.3 0.2-0.4 0.2-0.3 0-0.3-0.1 0-0.4 0.2-0.4 0.6-0.9 0.2-0.2 0.3-0.2 0.7-0.3 0.1-0.2 0.3-0.6 0.5 0.5 0.5-0.1 0.5-0.3 0.7-0.1z m4.1-1.4l0.2 0.1 0 0.3 0 0.4-0.2 0.4-0.4 0.3-0.4 0.1-0.5-0.2-0.4 0.3-0.7 0-0.7-0.1-0.6-0.3-0.3-0.4 0-0.2 0.1-0.2 0.1-0.3 0.1-0.3 0.2 0 0.4 0 0.3 0.2 0.2 0 0-0.1 0-0.4 0.1-0.1 0.8 0 0.3 0.1 0.5 0.3 0.2 0 0.4 0 0.3 0.1z m2.2 0.8l-0.1 0.2-0.4 0.2-0.1 0-0.2-0.2-0.3 0-0.1 0.2 0 0.2-0.1 0.2-0.3-0.3-0.2-0.9 0-0.5 0.1-0.8 0.2-0.6 0.4-0.1 0.2 1.2 0.1 0.1 0.5 0.3 0.1 0.2 0.2 0.3 0 0.3z m1-3.6l-0.3 0.5 0.3 0 0.3 0 0.2 0.2 0.1 0.2 0.4 0.2 0 0.1 0 0.2-0.1 0.1-0.2-0.1-0.1-0.2-0.2 0-0.2 0.1-0.8-0.4-0.4-0.1 0-0.2 0.3-0.5 0.4-0.3 0.3 0.2z m3 0.5l0.4 0.2 0.3 0.2 0.2 0.3-0.1 0.4 0 0.5 0.2 0.5 0.2 0.3-0.2 0.1-0.5-0.5-0.7-1.4-0.6-0.4-0.4 0.1-0.2 0-0.1-0.1-0.3-0.3-0.4-0.4 0-0.2 0.1-0.2 0.2 0.1 0.6 0.3 0.1 0 0.1 0.1 0.2 0.2 0.9 0.2z m-15.3-0.7l-0.5 0.1-0.6-0.4-0.1-0.9 0.6-0.4 0.8 0 0.3 0.5-0.1 0.6-0.4 0.5z m-20.4-27l-0.4 0-0.7-0.5-0.6-0.1 0.2-0.1 0.3 0 0.2 0 0.5 0.2 0.1 0.2 0.4 0.3z m-6.5 0.4l-0.2 0.1-0.2-0.2 0-0.4 0.1-0.4 0.1-0.3 0.3-0.1 0.3 0.2 0.1 0.4-0.1 0.3-0.2 0.3-0.2 0.1z m39.3 0l0 0.1-1.2 0.8-2.1 0.9-1.1 0.2-2.2-0.8-0.4-0.1-0.4 0-0.3 0.1-2.6 1.1-1.4 0.5-0.6 0.3-0.4 0.1-1.3 0.4-0.9 0.3-0.3 0.1-0.2-0.1-0.5-0.1-0.9-0.2-0.6 0-0.3 0-0.5 0.1-0.3 0.1-0.9 0.6-0.2 0.2-0.3 0.3-0.4 0.5-0.2 0.3-0.2 0.6-0.1 0.3-0.5 0.3-1.2 0.5 1.2 1.3 0.3 0.4 0.4 0.3 0.2 0.2 0.5 0.1 0.4 0.1 0.3 0 0.3-0.1 0.2 0.1 0.1 0.2 0 0.3 0.1 1.2 0 0.3-0.2 0.5-0.3-0.1-0.5-0.3-0.3-0.1-0.5 0-0.9 0.4-0.4 0.1-0.5 0-0.3 0.1-0.3 0.1-0.3 0.4-0.2 0.3-0.2 0.2-0.2 0.1-0.2 0-0.8-0.2-0.3-0.1-0.6-0.5-0.4-0.1-0.3 0-0.7 0.3-1.4 0.2-0.3 0-0.4-0.2-0.1-0.2-0.1-0.3-0.1-0.1-0.1-0.1-0.7-0.1-0.1-0.1-0.1-0.3-0.2 0-0.3 0-0.4 0.1-0.2 0-0.4-0.2-0.7-0.7-0.4-0.1-3.9 0-0.3 0.1-1.7 0.9-0.4 0-0.3 0.1-0.3 0.3-0.3 0.3-0.2 0.2-0.5 0.4-0.9 1-1.3 1.9-1.2 1.4-0.6 0.7-0.1 0.3-0.1 0.7-0.1 0.2-0.3 0.5-0.1 0.4-0.1 1-0.2 1-0.2 0.5-0.3 0.4-0.8 0.5-0.1 0.2 0 0.3 0.1 0.5-0.2 1-0.1 0.5-0.2 0.4-0.2 0.3 0.1 0.6 0.4 2.8 0.2 0.4 0.6 0.8 0.1 0.5 0 0.2-0.2 0.5-0.1 0.2 0.1 0.2 0.2 0.5 0.3 2.1 0.4 1 3.3 5 0.3 0.2 1 0.8 0.5 0.1 0.5-0.3 0.4-0.3 0.5-0.2 0.5 0.1 0.3 0.3 0.2 0.4 0.2 0.5 0.2 0.1 0.2 0.1 0.5 0 0.3 0.1 0.2 0.2 0.2 0.6 1.4 2 0.1 0.3 0 0.2-0.1 0.2-0.1 0.2-0.1 0.7-0.2 0.5 0 0.3 0.2 0.3 1 1.1 0.2 0.5 0.2 0.8 0.2 0.5 0.3 0.5 0.3 0.2 1.3-0.6 0-0.1 1.5-0.4 0.6-0.1 0 0.1-0.1 0.7 0.1 0.2 0.3 0.1 0.5 0.1 0.5 0 1.4-0.2 0.4-0.1 0.3 0 0.2 0.1 0.5 0.5 0.3 0.2 0.8 0.1 0.7-0.4 0.6-0.5 0.8-1.3 0.1-0.3 0.1-0.8 0.3-1.1 0.1-0.4 0.2-0.2 0.4-0.4 0.4-0.3 0.3-0.1 0.2-0.1 0.3-0.4 0.3-0.7 0.6-0.7 1.2-1 1.2-1.9 0.5-0.6 1-1 0.3-0.2 0.5-0.1 0.9 0 0.1-0.1 0-0.4 0.1-0.2 0.2-0.1 0.5-0.2 0.2 0 0.3 0 0.4 0.3 0 1.3 0 0.3 0.6 0.4 0.2 0.4 0.2 0.1 0.1 0.1 1.9 0 1 0.1 0.9 0.3 0.8 0.1 0.9-0.3 0.7-0.5 0.5-0.1 0.5 0 0.5 0.1 0.4 0.1 0.4 0 0.6-0.4 0.2-0.4 0.3-0.8 0.1-0.7-0.1-0.4 0.9-0.7 0.3-0.1 4.4-0.1 0.8-0.2 0.8 0 1.6 0.4 0.8-0.1 0.4-0.3 0.2 0 0.3 0.1 0.4 0.3 0.6 0.1 0.3 0.3 0.4 0.1 0.5 0 1.1-0.4 2.7-0.2 0.3-0.1 0.4-0.2 0.3-0.3 0-0.1-1.4-0.3-0.3-0.5-0.3 0-1.9-0.2-0.3-0.1-0.3-0.1-0.2-0.2-0.2-0.2 0-0.2 0.4-0.2 0.3 0.2 0.3-0.1 0.6-0.4 0.2-0.2 0.1-0.1 0.4 0.2 0.1 0 0.2-0.2 1.9-0.2 0.5-0.1 0.2 0.2 0.4 0 0.4-0.1 0.3-0.1 0.3-0.2 0.3-0.5 0.2-0.2 0.3 0 3.6 0.3 0.7 0.3 1.5 0.8 1.3 0.5 0.3 0.2-0.2 0.3 0 0.2 0.2 0.2 0.1 0.4 0.1 0.1 0.2 0 0.2 0-0.1 0.5 0.3 0.6-0.3 0.7 0.1 0.9-0.1 0.4-0.6 0.6-0.2 0.3-0.3 2-0.1 0.4-0.7 0.8-0.9 0.2-0.9-0.1-0.6-0.4-0.7-0.9-0.2-0.2-0.1-0.1-1-0.8 0-0.2 0.1-0.6 0.1-0.2-0.2-0.3-0.2-0.3-0.5-0.4-0.4-0.2-0.8 1-0.5 0-0.6 0.3-2 0.1-0.9 0.2-0.8-0.2-0.6 0.6-0.9 2.1-0.2 0.3-0.6 0.6-0.2 0.3 0 0.4-0.1 0.3-0.2 0.1-0.2 0.1-0.2 0.1-0.7 0.4-0.3 0.4-0.2 1-0.2 0.3-0.9 0.4-0.3 0.3-0.9 1.4-0.4 0.2-0.2 0.2-0.2 0.4-0.3 0.5-0.1 0.1-1.5 1.4-0.6 0.7-0.2 0.3-1.4 0.7-1.6 1.1-0.7 0.7-0.4 0.2-0.2-0.1-0.3-0.2-0.3-0.2-0.5 0.1-0.8 0.4-0.5 0.1-0.2 0-0.4-0.1-0.2 0-0.1 0.1-0.3 0.3-0.7 0.5-0.4 0.1-0.3 0-0.5 0.2-0.4 0.1-0.9-0.1-0.1 0.4-0.2 0-0.3 0.3-0.3 0.1-0.2 0.1-0.2 0.1-0.2 0.4-0.2 0.8-0.6 1.3-0.3 0.6-0.5 0.6-0.5 0.5-0.7 0.2-0.7 0.2-1.4 0-0.3 0-0.2-0.1-0.2-0.3-0.5-0.6-0.1-0.1-0.3-0.1-0.7-0.3-0.3-0.4 0-0.3-0.1-0.3-0.5-0.2-1 0-0.1 0-0.3-0.4-0.1-0.1-0.8 0-0.3 0.8 0.1 0.6 0.8-0.1 0.1 0.3-0.1 0.5-0.2 0.4-0.1 0.5 0.1 0.2 0.2 0.2 0 0.2 0 1 0.5-0.4 0.3-0.4 0.1-0.3 0-0.3 0.2-0.2 0.3-0.2 0.2 0.4 0.5 1.1 0.7 0.5 0.2 0.4 0.3 0.3 0.5 0 0.5 0.5 0.4 1.7 0.4 0.6 1 0.3 0.9 0 0.9 0.1 0.8 0.6 0.6 0.7 1.2 1 0.5 0.7 0.4 0.8 0.2 0.5 0 0.4 0.2 0.3 1 1.1 0.8 1.2 0.3 0.8 0.7 0.9 0.2 0.4 0 0.5-0.2 1 0.1 0.2 1 1.1 0.5 0.5 0.3 0.1 0.8 0.1 0.2 0.1 0.1 0.1 0.1 0.2 0.1 0.1 0.2 0.1 0.2 0.1 0.1 0.3 0.1 0.5 0.1 0.5 0.4 0.2 0.8 0 0.4 0.1 0.5 0.2 0.5 0.8-0.4 0.8-0.5 0.8 0.2 0.9 0.2 0.1 0.6 0.3 1.5 1.6 0.2 0 0.3-0.1 0.5-0.3 0.1 0.3 0.1 0.2 0.1 0.2 0.3 0.2 0.2-0.2 0.1 0.1 0 0.2-0.2 0.3-0.1 0.1-0.3 0.1-0.2 0.1 0 0.2 0 0.3 0 0.7-0.1 0-0.3 0-0.3-0.3-0.3 0-0.1 0.2-0.6-0.5-0.4 0.5-1-1.3-1.8-1.5-0.5-0.2-0.4-0.2-0.3 0-0.4-0.1-1.3 0.1-0.4 0-5.2-2.1-0.8-0.2-2.4-0.1-1.6-0.2 0.4-0.3 3.4-3.4 0.3-0.6 0.1-0.4 0.1-0.4 0-0.5 0-0.4-0.2-0.6-0.2-0.5-0.3-0.4-0.4-0.4-2.3-1.1-0.7-0.4-1.3-1.2-1.2-1.5-0.4-0.3-0.5-0.3-1.1-0.5-1.1-0.4-11.8-2.4-0.9-0.4-3-2.5-0.8-0.8-0.8-0.9-2.3-3.5-0.4-0.4-0.5-0.2-0.4 0.1-0.3 0.2-0.1 0.2-0.2 0.5-0.1 0.2-0.2 0.2-0.4 0.1-0.7-0.1-3-0.9-1.2-0.1-0.7 0-0.4 0.1-1.8 0.9-1.2 0.8-0.8 0.4-0.4-0.1-0.2-0.1-0.2-0.2-0.2-0.3-0.1-0.3 0-0.5 0-0.3 0.5-1.8 0-0.3-0.2-0.4-0.3-0.6-0.6-0.8-0.6-0.5-0.9-1.3-0.3-0.4-0.1-0.6-0.3-2.3-0.3-0.6-0.2-0.3-0.3-0.3-0.4-0.2-2.5-1-0.4-0.2-0.2-0.2-0.2-0.4 0-0.5 0.2-0.7 0.3-0.4 0.3-0.3 1.4-0.9 0.2-0.3 0.1-0.4-0.2-0.7-0.5-1.4 0-0.6-0.1-0.7 0.1-2.5-0.1-1 0.5-0.3 0.2-0.5 0.1-0.1 0.7-0.3 1-0.9-0.5-0.5-0.1-0.2 0.1-0.2 0.3-0.1 0.5-0.3 0.2-0.2 0.5-0.6 0.1-0.1 0.1 0.1 0.3 0.8 0.1 0.6 0.8 1.6 0.4 1.2 0.3 0.6 0.5 0.3 0.3-0.9 0.1-0.4 0-0.6-0.2-0.4 0-0.2 0-0.7 0-0.2-0.2-0.4-0.5-0.5-0.1-0.2-0.1-0.3-0.5-1-0.2-0.8-0.1-0.8 0-0.2-0.3-0.7-0.1-0.5 0.5-5 0.2-0.7 0.2-0.2 0.2-0.3-0.1-0.7-0.1-0.6-0.2-0.4-0.6 0.3-0.7 0-0.7-0.1-0.5-0.3-0.4-0.5-0.4-0.6-0.3-0.7 0.2-0.6 0.3 0.2 0.4 0.1 0-0.5 0.2-0.3 0.5 0.3 0.4 0.4 0.6 0.7 0.4 0.7 0.3 0.3 0.5 0.2 0.3 0.1 0.3 0 0.1-0.2 0.3-0.5 0.2-0.4 0.5-1.9 0.2-0.5-0.4-0.8-1.6-2-0.2-0.2 0-0.3 0-0.4 0.2-0.2 1.3-0.5 0.3-0.3 0-0.4-0.2-0.3-0.1-0.5 0.1-0.5 0.5-0.8 0.3-0.4 0-0.3 0-0.4 0.1-0.2 0.2-0.3 0.3-0.1 0.2-0.2 0.3-0.1 0.4-0.2 1-0.1 0.4-0.2 0.3-0.7-0.1-0.9-0.2-0.8-0.1-0.9 0-0.5 0.2-0.5 0.2-0.4 0.4-0.2 0.2-0.1 0.5-0.1 0.3 0 0.3-0.1 1.4-0.6 0.4-0.3 0.5-0.4 0.1-0.4 0.3-2.2 0.2-0.7 0.5-0.6 0.9 0 0.4 0.3 0.2 0.4-0.2 1 0 1 0.2 0.3 0.3-0.2 0.1 0 0.2 0.4 0.2 0.3 0.4 0.3 0.4 0.2 0.7 0.1 0.3 0.2 0.2-0.1 0.2-0.2 0.5 0 0.4 0.1 0.3 0.2 0.3 0.3 0.3 0 0.3-0.3 0.7-0.8-0.3-0.5 0.3-0.9 1-1.5 0.5-0.5 0.1-0.1 0.2 0 0.3 0.2 0.2 0.2 0.3-0.1 0.1-0.2 0.2-0.4 0.1-0.3 0.2-0.1 0.4-0.1 0.2-0.1 0.2-0.4 0.1-0.3-0.1-1.4 0-0.2 0.1-0.2 0.1-0.3 0.2-0.2 0.2-0.5 0-0.4 0-0.8-0.2-0.8 0.1-0.5 0.2-0.3 0.2-0.1 0.5 0.1 0.2 0 0.2-0.1 0.6-0.5-0.1 0.6 0.1 0.3 0.2-0.1 0.4-0.4 0.2-0.2 0.4 0 2.1 0.4 0.4-0.1 1.1 0.3 0.6 0.3 0.5 0.7 1.8 0.9 1.1-0.5 0.5-0.1 0.9 0 0.4-0.1 0.5-0.3 0.4-0.4 0.2-0.1 0.3 0.1 0.1 0.2 0.1 0.3 0 0.3-0.1 0.2-0.2 0.1-0.6 0.2 0 0.2 0.2 0.3 0.1 0.2 0 0.5 0.1 0.2 0.4 0.5 0.1 0.2 0.2 0.4 1 0.8 0.4 0.2 0.9 0.2 0.9 0 6.4-0.8 0.4 0.2 0.3 1 0.3 0.3 0.4 0.2 0.5 0 0.3-0.3 0.5-0.5 0.3-0.1 0.6 0 1.3 0.6 0.6 0 0.3 0.1 0.1 0.1z",    IDN556: "M631.9 260.4l-0.2 0.4-0.4-0.2-0.1-0.2 0-0.5-0.2-0.3-0.2-0.1-0.6-0.2-0.2-0.1-0.3-0.4-0.1-0.5 0.1-0.4 0.2-0.6 0.2 0.2 1.1 0.8 0.2 0.2 0.2 0.6 0.2 0.2 0.2 0.5-0.1 0.6z m-5.7-9.6l0.2 0.5-0.5-0.1-0.3-0.4-0.6-0.8-0.4-0.3-0.4-0.3-0.3-0.3-0.2-0.4 0.3 0 0.6 0 0.3 0.3 0.3 0.4 0.3 0.1 0.6 0.2 0.1 0.5 0 0.6z m-3.8-4.5l-0.3 0.3-0.6-0.1-0.4-0.2-0.3-0.3-0.8-1.6 0-0.6 0.4-0.1 0.5 0.2 0.7 0 0.6 0.3 0.3 0.5 0 1.1-0.1 0.5z m-37.2-5.9l0.4 0 0.1-0.1 0.4-0.4 0.2-0.1 0.2 0.1 0.1 0.2 0.3 1.3 0.3 0.3 0.5-0.1 0.2 0.3 0.3 0.3 0.1 0.3 0.1 0.5-0.1 0.2-0.3 0.2 0 0.2 0.1 0.6 0 3.6-0.1 0.4-0.4 0.3-0.3 0-0.4-0.1-0.3 0.2-0.3 0-0.7-1.1-0.3-0.3-0.3-0.1-0.4-0.1-0.2-0.1-0.1-0.2-0.2-0.5-0.9-1.3-0.4-0.9 0.1-0.2 0-0.6 0.1-0.3 0.2-0.2 0.1-0.3 0.2-0.3 0-0.3 0.1-0.1 0.6-0.1 0.2-0.1 0-0.2-0.2-0.3-0.4-0.4 0.2-0.4 0.4-0.3 0.3-0.2 0.4-0.2-0.1 0.4 0 0.3 0.2 0.2z m18.7-3.2l-0.2 0.2-0.1 0-0.3-0.1-0.2 0-0.2 0.5-0.2 0.3-1.4 1.5-0.4 0.5-0.8 1.7-0.1 0.5 0.1 0.2 0.5 0 0.2 0.1-0.1 0.3-0.1 0.2-0.1 0.1-0.6 0.1 0.2 0.2 0.5 0.2 0.4 0.2 0.1 0.2 0.1 0.2 0.1 0.5-0.1 0.6-0.2 0.5-0.2 0.2-0.3-0.3-0.2 0.3-0.1 0.5 0 0.5-0.1 0.3-0.2 0.1-0.1 0-0.2-0.2-0.1 0.1-0.3 0.3-0.4 0-0.1-0.9 0-1.1-0.1-0.5-0.2-0.2-0.1-0.3-0.2-0.1-0.3 0.5-0.1 0.2 0.1 0.4 0 0.3-0.3 0.7-0.4 0.3-0.4 0.1-0.4-0.2-0.3-0.3-0.2-0.6 0.2-0.3 0.7-0.3 0-0.2-0.3 0-0.3-0.1-0.2 0-0.4 0.3-0.1 0.2-0.1 0.2 0 0.7-0.2 0.2-0.2 0.1-1.1 0-0.3 0-0.2-0.1-0.3-0.3 0.2-0.1-0.2-0.4-0.1-0.4 0.2-0.4 0.5-1 0.2-0.5 0.1-0.5 0.1-1.6 0.2-0.5 0.2-0.3 0.2-0.1 0.5-0.1 0.6-0.8-0.1-0.3-0.1-0.4-0.2-1.1-0.3-0.5-0.1-0.9-0.2-0.7-0.3-0.6-0.3-0.3 0-0.1 0.3-0.5 0.5-1.1 0.4-0.4 0.4-0.2 1.5-0.1 0.6-0.1 0.6-0.4 1.6-1.1 1.2-0.7 0.8-0.3 0.4 0.1 0.3 0.2 0.2 0.4 0.4 2.8 0 1.6 0.1 0.2 0.3 0.4 0.2 0.7 0 0.2 0 0.5 0 0.2z m9.4-5.9l0.1 0.8 0 2.2-0.1 0.6-0.4-0.1-0.1-0.5-0.1-0.8-0.3-0.5-0.3-0.1-0.1-0.3 0-0.2-0.1-0.2-0.5-0.2-0.4 1.3-0.6-0.6-0.3 0.3-0.3-0.3-0.1 0.3 0 0.9-0.1 0.2-0.4 0.2-0.1 0.2-0.2 0.7 0 0.3 0.1 0.9 0 0.4-0.6 0.3-0.2 0.4-0.2 0.4-0.1 0.3 0 0.2 0.3 0.5 0.1 0.6 0 0.3 0 0.5-0.1 0.3-0.5 1-0.2 0.5 0.1 0.4 0.4 0.2 0.4-0.3 0.3-0.5 0.4-0.5 0.6-0.1 0.3 0.2 0 0.2 0 0.2 0.1 0.2 0.8 0.2 0.1 0.4 0.2 0.2 0.7 0.4 0.9 0.5 0.4 0.3 0.2 0.4-0.1 0.4-0.3 0.4-0.5 0.5-0.4 0.7-0.3 0.3-0.9 0.2-0.8 0.5-0.4 0.1-0.4-0.1-0.4-0.5-0.3-0.1-0.4 0-1.9 1.1-0.3 0.3-0.3 0.9-0.1 0.2 0.2 0.1 0.2 0 0.5-0.2 0.2-0.1 0.2 0.7-0.5 0.9-1 1.4-0.5 0.9-0.3 0.3-0.5 0.1 0-0.2-0.1-0.5 0-0.2-0.3-0.2-0.4 0.5-0.1 0.2 0 0.1-0.2-0.2 0-0.2 0-0.6-0.1-0.2-0.3 0-0.6 0.9-0.3 0.3-0.5-0.1-0.4-0.3-1.5-3.4 1.6-1.5 0.3-0.3-0.1-0.3-0.5-0.1 0.2-0.3 0.6-0.8 0.2-0.7 0.4 0 0.2-0.4 0.4-0.8 0.3-0.3 0.4-0.2 0.6-0.1 0.5-0.2 0.2-0.4 0-0.4-0.1-0.1-1 0.4-0.1 0 0.2-0.4-0.3-0.3 0.1-0.3 0.3-0.4 0.2-0.3-0.1-0.6 0.1-0.3 0.4-0.6 0.1-0.4-0.1-0.4-0.2-0.1-0.2 0.1-0.3 0.1-0.3 0.1 0.2-0.4 1.2-1 0.2-0.4 0.2-0.5 0-0.5 0-0.5-0.3-0.7 0-0.2 0.2-0.1 0.2-0.1 0.2 0 0.1-0.3-0.1-3.7 0.1-0.9 0.3-0.9 0.7-1.2 0.1-0.5 0.1-0.3 0.3-0.3 2.1-1.5 0.5-0.2 0.6 0 0.3 0.1-0.5 0.7 0.2 0.4 0.3 0.4 1.4 1.1 0.3 0.4 0.6 0.9 0.2 0.5 0.1 0.5 0 0.2-0.2 0.4-0.1 0.3 0.1 0.2 0.2 0.2 0.2 0.1z m-2.9-14.7l0.5 0.2 0.3 0 0.4-0.2 0.5-0.2 0.6-0.1 0.4 0.1 0.6 0.5 0.4 0.8 0.1 0.8-0.3 0.7-1 1.4-0.6 0.8-0.7 0.4-1.1-0.1-0.9-0.6-0.7-0.8-0.7-0.9-0.2-0.5-0.2-0.9-0.2-0.4 0.2-0.3 0.6-0.4 0.2-0.2 0.4-0.6 0.3-0.1 0.4 0.1 0.3 0.2 0.4 0.3z m2.1-8.7l-0.4 0-0.4 0-0.2 0.3-0.2 0.3-0.5-0.2-0.4-0.4-0.3-0.3-0.1-0.2 0-0.2 0.2-0.1 0.3 0 1.2-0.6 0.4 0.1 0.3 0.3 0.1 0.4 0 0.6z m-18.9-0.7l-0.3 0.2-0.2-0.4 0.2-0.4 0.3-0.4 0.3-0.3 0.3 0.1 0.2 0.3 0.2 0.3 0.1 0.3-0.2 0-0.5 0.1-0.4 0.2z m3.1-2l-0.3 0.2-0.2-0.2-0.2-0.4-0.3-0.6 0-0.5 0.1-0.3 0.1-0.2 0.1 0 0.2 0 0.1 0.2 0.1 0.3 0.1 0.2 0.5 0.4 0 0.1 0 0.2-0.1 0.4-0.2 0.2z m-18.5-11l1.6 0.2 2.4 0.1 0.8 0.2 5.2 2.1 0.4 0 1.3-0.1 0.4 0.1 0.3 0 0.4 0.2 0.5 0.2 1.8 1.5 1 1.3-0.4 0.4-0.5 1.2 0.1 0.6 0.3 0.1 1 0.4 0.2 0.2 0.2 0.4 0.1 0.6-0.1 0.4-0.4 0 0.2-0.2-0.2-0.3-0.3-0.2-0.4 0 0.1-0.3-0.2-0.3-0.3-0.2-0.3-0.1-0.4-0.2-0.1 0.5-0.2 0.1-0.3-0.1 0.1 0.4 0.1 0.3 0.2 0.3 0.3 0.2 0.2 0.4 0 0.5-0.2 0.4-0.4 0.7 0 0.1-0.4 0.2-0.3 0.1-0.5 0.2-0.2 0.1 0 0.3 0.1 0.5 0.4 0.8 0.3 0.3 0.3 0.3 0.4 0.2 0.5 0.1 0.3 0.1 0.2 0.3 0.2 0.3 0.2 0.3 0.5 0.2 0.4 0.1 1-0.1 0.4 0.1 0.3 0.3 0.4 0.9 1.3 1.7 0.4 0.3 0.4 0.1 1.5 0 0.2 0.1 0.2 0 0.2 0.2 0.1 0.3-0.1 0.2-0.4 0.1-0.3 0.3-0.2 0.3-0.2 0.1-0.6 0-0.5 0.2-0.3 0.1 0 0.1 1.1 0.1 0.5 0.1 0.4 0.2 0.3 0.3 0.2 0.4 0 0.4 0 0.9 0 0.4 0.2 0.4 0.3 0.4 0.3 0.1 0.1-0.1 0.1-0.4 0-0.1 0.6 0.3 0.8 0.1 0.9 0 0.5-0.1-1.1-1.2-0.3-0.6 0.7-0.2 0.8 0.4 0.6 0.8 0.4 0.9 0.3 1.3 0.1 0.5 0 0.4-0.4 0.7 0.1 0.4 0.2 0.9 0 0.9-0.1 0.4-0.3 0.2-0.4 0.1-0.2 0.2-0.1 0.3-0.3 0.3-0.3-0.4-1.5-1.1-0.8-0.8-0.5-0.3-0.6-0.1 0.2 0.4 0.9 0.9 0.2 0.2 0.2 0.4 0.1 0.2 0.5 0 0.1 0.1-0.1 0.2 0 0.1 0.1 0.5 0 0.4-0.1 0.2-0.2 0.1-0.3 0.1-0.2-0.1-0.5-0.7-0.2 0-0.1 0.1 0.1 0.3-0.2 0.3-0.2-0.1-0.3-0.5 0-0.5-0.6-0.5-0.9-0.3-0.8 0.2-0.7 0.5-0.7 0.1-0.8-0.1-0.7-0.3-0.8 0.5-0.9 0.3-1 0.2-1.4 0.1-0.4 0.1-0.3 0.3-0.2 0.1-0.5 0.2-0.4 0.3-0.1 0-0.8 0.1-0.2 0.1-0.5 0.5-0.4 0.8-0.4 1-0.2 0.8 0.1 1 0.3 0.7 0.6 0.6 0.5 0.5 0.5 0.2 0 0.2-0.4 0.1-0.5 0.5-0.3 0.1-0.4 0.1-1 0.2-0.4 0-2.3-0.2-0.4-0.1-0.6-0.4-0.4-0.2-0.3 0-0.4 0.1-0.4 0.1-0.5-0.2-0.1 0-0.1 0.2-0.3 0.2-0.3 0.1-0.2 0-0.4-0.3-0.6-0.8-0.4-0.2-0.3 0-1.3-0.5-0.2-0.2-1.1-1.5-0.1-0.3-0.3 0 0-0.1-0.2-0.8 0.1-0.9 0.4-1.8 0.4-1.3 0.2-0.9 0.1-0.9-0.1-1.7 0.1-0.6 0-0.3 0.1-0.1 0.2-0.1 0.3 0 0.1 0.1-0.1 0.3-0.2 0.2 0.7-0.4 0.7-1.5 0.3-1.7-0.8-1.1-0.8-0.4-2.7-0.5-1.7-0.6 0-0.3-0.3-0.3-0.2-0.4-0.1-0.2-0.3-0.4-0.3-0.2-0.3 0.1-0.2 0.1-0.4 0.1-0.2-0.1 0.1-0.5 0.2-0.5 0.1-0.3-0.2-0.5-0.3-0.1-0.9 0-0.5-0.1-0.4-0.2-1.2-1.4-4.6-4.2-0.4-0.8-0.1-0.7 0-0.2 0-0.3 0.2-0.5 0.1-0.2 0.1-0.5 0.5-0.5 0.5-0.4 0.4-0.5 0.3-0.9 0.3-0.4 0.3-0.2 0.3 0 0.2-0.1 0.1-0.2 0.2-0.4 0.5-0.2 0.1-0.1 0.2-0.4 0.1-1.2 0-0.5-0.1-0.5-0.1-0.3-0.3-0.3 0.1-0.3 0.3-0.6 0-0.3 0.2-0.4 0.1-0.3 0-0.9 0.1-0.2 0-0.4 0.9-0.5 0.8-0.3 0.9-0.1 0.5 0 0.3 0 0.4 0.1 0.4 0.2 1.5 1 1.8 1.5 1 0.5 0.2 0.1 0.3 0 0.3-0.1 0.5-0.2 1.3-0.8z",    IDN381: "M76.4 140.7l0.2 0.2 0.2 0.3 0 0.4-0.1 0.3-0.1 0 0-0.2-0.2-0.2-0.3 0.2-0.3-0.1 0.2-0.3-0.1-0.2-0.3-0.1-0.4 0.2-0.1 0.2-0.1 0.4 0 0.4 0 0.1-0.7-0.2-1.6-0.9-0.9-0.2 0.2-0.1 0.3-0.1 0.1-0.1 0.2 0 0.4 0.2 0.2-0.1 0.1-0.2 0.5-1.4 0-0.4-0.1-0.9 0.1-0.5 0.1-0.2 0.4-0.6 0.2-0.2 0.5-0.2 0.1-0.1 0-0.2-0.1-0.7 0.2-0.3 0.2 0.1 0.3 0.2 0.9 1.6 0.3 0.7-0.2 0.5 0.2 0.4 0.1 0.4-0.1 0.4-0.1 0.4 0 0.3 0 0.3-0.2 0.2-0.2 0.3z m1.6-5.1l-0.1 0.9-0.2 0.4-0.1 0.2 0 0.2 0.2 0.3 0 0.3-0.2 0-0.6-1.4-2.3-3.2-0.4-0.6-0.6-1.5-0.4-0.6-0.2-0.2-0.4-0.2-0.3-0.2-0.1-0.2 0.2-0.2 0.4-0.1 0.9-0.1 0.9 0.4 0.8 0.9 0.6 1.2 0.2 1.1 0.4 0.9 0.7 0.9 0.6 0.8z m1.4-9.8l1.1 0.1 0.9-0.1 0.6 0.2 0.5 0 0.9 0.1 0.6 0.4 0.4 0.7-0.2 0.6-0.9-0.1-0.9 0-0.8 0.3-0.8 0.1-1.5-0.4-0.9 0-0.8-0.1-0.3-0.4 0-0.8 0.5-0.3 0.9-0.2 0.7-0.1z m-27.1-29.2l0.4 0.2 0.3-0.1 0.2-0.1 0.2 0.1 0.3 0.4 0 0.3 0.2 0.1 0.2 0 0.3 0 0.3 0 0.2 0.5 0.5 0.5 0.1 0.1 0.1 0.1 0.1 0.5 0.2 0.2 1.1 1.1 0.3 0.4 0.2 0.9 1.7 2 0.4 0.3 1 0.2 0.4 0.2 0.3 0.3 0.3 0.2 0.3 0.5 0.2 0.3 0.1 0.3 0.1 0.3 0.4 0.1 0.4 0 0.4 0.1 0.3 0.3 0.4 0.9 0.1 0.2 0.2 0.2-0.1 0.5-0.3 0.7 0-0.1-0.4 0.6 0 0.7 0.1 1.3-0.1 0.3-0.2 0.5-0.1 1.3-0.1 1.6-0.2 0.5-1 1.3-0.2 0.1-0.2-0.1-0.2-0.1-0.5-0.4-0.3 0.4-0.2 0-0.6-0.4 0 0.1-0.2 0.1-0.3 0.1-0.1-0.3-0.4-0.3 0.3-0.6-0.2-0.4-0.3-0.3-0.3-0.4 0-0.2 0.1-0.6-0.1-0.3-0.2-0.2-0.3-0.7-0.1-0.3-0.3-0.9-0.9-0.8-1.9-1.2 0.1-0.4-0.2-0.2-0.5-0.1-0.5 0-0.9 0.1-0.1-0.2 0-0.5 0-0.9-0.4-0.9-1.1-1.8-0.2-0.5-0.1-0.2-0.4-0.4-0.2-0.2-0.2-0.4-0.3-0.3-0.1-0.6-0.1-0.1-0.3-0.2-0.2-0.1-0.5-0.2-0.2-0.2-0.1-0.2-0.2-0.5-0.2-0.3-0.9-0.8-0.4-0.4-0.6-0.2 0 0.1-0.3 0.2-0.1-0.4 0.4-0.3 0.6-0.2 0.5 0 0.4 0.2 0.2 0.2 0.1 0.2 0.1-0.2 0.3 0 0.5 0.1 0.7-0.1 0.4-0.1 0.5-0.3 0.9-0.8 0.2-0.3 0.1-0.3 0-0.6 0-0.2 0.3-0.2 0.6 0.6z m24.5-3.2l0.4 0.2 0.2-0.1 0.2-0.3 0.3-0.1 0.4 0.2 0.4 0.4 0.2 0.4-0.4 0.2-0.5 0-0.7 0-0.6 0-0.7-0.4-0.3-0.1-0.3 0-0.2-0.3 0-0.3 0.1-0.4 0.2-0.2 0.4-0.1 0.3 0.1 0.3 0.3 0.3 0.5z m39.3-19.3l-0.4 1.3-0.4 3 0.1 0.8 0 0.7 0.4 1 0.3 1.4 0.2 2.2-0.1 0.7-0.3 1-0.2 0.8-0.1 0.9 0.1 0.5 0.2 0.3 0.2 0.2 0.9 0.7 0.2 0.2 0.2 0.4 0.5 1.4 0.8 1.8 0.2 0.6 0 0.5 0 0.4-0.2 0.3-0.2 0.3-0.2 0.2-1.4 0.8-5.3 2.4-0.4 0.2-0.2 0.2-0.3 0.3 0 0.2 0.1 0.3 1 0.8 0.2 0.2 0.1 0.3 0.1 0.2 0 0.8 0 0.2 0.1 0.2 0.2 0.2 0.9 0.5 0.3 0.2 0.2 0.2 0.1 0.2 0.1 0.3 0.1 0.3-0.1 0.5-0.2 1-0.1 0.2 0 0.3 0.2 0.5 0 0.3 0 0.5-0.1 1.4 0 0.9 0 0.3-0.1 0.2-0.4 0.4-0.1 0.2-0.2 0.4-0.1 0.3 0 0.4 0.1 0.6-0.3 0.2-0.3 0.1-0.3 0-0.3 0-0.3-0.2-0.4-0.2-0.4-0.4-0.2-0.2-0.4-0.1-0.8-0.3-0.7-0.2-0.4-0.2-0.3-0.2-0.9-0.1-1-0.5-0.6-0.1-0.2 0.2-0.5 0.1-0.4 0-0.3-0.1-0.2-0.1-0.7-0.4-0.3-0.1-0.1 0.2 0 0.2 0.2 0.5 0.2 0.2 0.3 0.3 0.3 0.5 0.2 0.1 0.5 0.2 0.3 0.2 0.1 0.1 0.1 0.3 0.2 0.8 0.1 0.3 1 1 0.1 0.2 0.2 0.4 0.3 0.4 0.5 1.1 0.1 0.1 0 0.3 0 0.5-0.2 0.5-0.2 0.2-0.3 0.1-0.9 0.3-0.3 0.1-0.4 0-0.5-0.2-0.3-0.2-0.2-0.1-1.3 0-0.2-0.1-0.2-0.1-0.2-0.2-0.4-0.5-0.1-0.1-0.4 0-0.2-0.1-0.6-0.3-0.3-0.1-0.5 0-0.5 0.2-1.6 0.8-0.5 0.3-0.4 0.1-0.7 0-0.6 0.2-0.2 0.1-0.3 0.2-1.6 2.1-2.5 2.7-0.3-0.2 0-0.2 0.3-0.3 0.1-0.3 0-0.4-0.2-0.3-0.4-0.2-0.4-0.1 0.4-1 0-0.4-0.1-1.6-0.1-0.6-0.2-0.3-0.3 0.2 0-0.3 0.1-1.1 0-0.5-0.3-0.4-0.3-0.2-0.6 0.2-0.2-0.6 0.2-2-0.1-0.8-0.8-0.9-0.2-0.1-0.3-0.2-0.1-0.3 0-0.8-0.1-0.8-1.2-4.3-1.5-3.4-0.2-0.6-0.1-0.2 0.2-0.5 0-0.2-0.1-0.3-0.9-0.9-0.2-0.3-0.3-0.8-0.1-0.5-0.1-0.4 0-0.2-0.2-0.1-0.2-0.1-0.2 0-0.2-0.1-0.1-0.2-0.1-0.5-0.2-0.4 0-0.1 0.3-0.1 0.2 0.1 0.1 0.1 0.1 0.2 0.2 0.4 0.3-0.2 0.5-0.9 0.2-0.2 0.4-0.5 0.1-0.2 0-0.8-0.1-0.3-0.2-0.2-0.4 0-0.1-0.2 0-0.3 0-0.4-0.2-0.4-0.3-0.3-0.8-0.6-0.2 0.1-0.1 0.2 0 0.3 0.3 0.1 0 0.2-0.1 0.3-0.2 0.2-0.4-0.2-0.7-0.6-1.8-2.7-0.9-1.1-2-1.2-0.4-0.1-0.4-0.1-0.4 0-0.5 0-0.2 0-0.1-0.1-0.1-0.3 0-0.2-0.4-0.2-0.4 0-0.5 0-0.4 0-0.2-0.2-0.1-0.5-0.2-0.4-0.8-0.4-1.2-1.1-1.1-0.6 0.5-2.7 0-0.4-0.1-0.8-0.4-0.8-0.1-0.5-0.2-0.2-0.2-0.1-0.2 0-0.2-0.1-0.1-0.3-0.5-1.5-0.2-1.1 0.1-0.5 0.1-0.4 0.1-0.2 0-0.4 0-0.1 0.4-0.3 0.3-0.3 0-0.2 0-0.1-0.3-0.4-0.2-0.7-0.1-0.4 0.1-0.4 0.3-0.4-0.1-0.3-0.2-0.3-0.2-0.1-0.4-0.1-0.3-0.2-0.2-0.2-0.7-0.9-0.2-0.1-0.4-0.1-0.3-0.1-0.2-0.2-0.1-0.1 0-0.3 0.1-0.9-0.4-1.7-0.1-0.3 0.1-0.3 0.1 0 0.4 0.1 0.2 0 0.2-0.2 0.1-0.6 0-0.3-0.1-0.2-0.6-0.8-0.1-0.2 0-0.4-0.2-0.4-0.2-0.2-0.3-0.3-0.2-0.3 0.2-0.1 0.3-0.2 1.4-0.3 0.5-0.3 0.3-0.7-0.3-0.6-0.1-0.2-0.9-0.6-0.2-0.2-0.1-0.3-0.2-0.3 0-0.3 0-0.2 0.1-0.4 0.1-0.2-0.1-0.2-0.3-0.3-0.2-0.3-0.1-0.5-0.1-0.2-0.2-0.2-0.3-0.2-0.2-0.2-0.2-0.3-0.3-1.2-0.3-0.5-0.5-0.9-0.2-0.3 0-0.2 0.2-0.2 2-1.7 0.3-0.5-0.1-0.4 0-0.5 0.1-0.6 0.4 0.3 0.3 0 0.2 0 0.1-0.2 0-0.2 0.2-0.2 0.2-0.3 0.7-0.5 0.3-0.3 0.1-0.4 0.1-0.4 0.2-0.3 0.1-0.5 0-0.2 0.2-0.9 0.2-0.7 0.3-1 0.1-0.2 0.2-0.3 0.1-0.2 0-0.2-0.3-0.4 0.1-0.2 0.2-0.1 0.6 0 0.3-0.1 0.2-0.2 0.3-0.3 0.2-0.1 0.6-0.1 0.3-0.1 1.7 0.2-0.1 1.6 0 0.2-0.5 0.3-1 0.3-0.2 0.2-0.1 0.2-0.1 0.4 0 0.7 0.5-0.5 0.4-0.3 0.4-0.1 0.1-0.1 0.5-0.5 0.8 1.9 0.1 0.2 1.2-0.2 0.5 0.1 0.5 0.1 0.8 0.5 0.4 0.1 0.3 0.1 0.5 0.7 0.2 0.2 0.4 0.1 0.4-0.1 0.3 0.1 0.2 0.8 0.2 0.3 0.4 0.2 0.3 0.1 1.5 0.5 0.5 0.9 0 0.9 0.2 0.6 1.9 1.7 2.1 1 1.4 0.2 0.4 0.3 0.7 0.5 0.9 0.3 0.5 0.3 0.6 0.5 1.7 0.8 1.9 1.4 2.2 1.6 0.3 0.2 0.8 0.2 0.3 0.2 0.4 0.5 0.6 0.3 0.2 0.2 0.2 0.6 0.2 0.3 0.4 0.5 0.7 0.6 0.7 0.4 2.1 0.5 0.7 0.2 0.4 0.1 0.3 0.2 0.6 1.3 1.2 1 0.4 0.6 0.1 0.8 0.7-0.2 0.5 0.4 0.4 0.5 0.6 0.3 0.4 0.3 0.3 0.8 0.1 2.5 0 0.3-0.2 0.3-0.2 0.2-0.2 0.3-0.1 0.6-0.2 0.4 0 0.1 0.1 0.2 0.4 0.1 0.1 0.1 0.2 0.2-0.1 0.2 0 0.1 0.5 0.8-0.1 0.2 0.1 0.2 0.1 0 0.2-0.2 0.1-0.2-0.1-0.1-0.1-0.2-0.1-0.1 0-0.7 0-0.2-0.7-0.4-0.2-0.1 0.3-0.4 0.7-0.3 0.8 0.1 0.5 0.9 0 0.3-0.1 0.6 0.1 0.3 0.2 0.7 0 0.2 0.2 0.5 0.3 0.5 0.3 0.3 0.3-0.1 0-0.3-0.4-0.8-0.1-0.4 0-0.9 0.1-0.4 0.2-0.4 0.3-0.3 0.3-0.1 0.5-0.1 0.5-0.1 0.2 0.1 0 0.4 0.1 0.2 0.2 0.1 0.3 0.2 0.2 0.1 0 0.1 0.1 0.6 0.1 0.2 0.3 0.6 0.6 0.4 0.2 0.1 0.1 0.1 0 0.2z",    IDN513: "M656.8 99.3l-0.7 0.1-0.3-0.3 0.1-0.2 0.2-0.2 0.4-0.1 1-0.5 1-2.2 0.1 0 0 0.4-0.1 0.7 0 0.6-0.1 0.2-0.3 0.2-0.1 0.2-0.1 0.7-0.4 0.2-0.7 0.2z m-38.2 23.5l0.3-0.5 0.5-1.3 0.1-0.7 0-0.7-0.1-0.7-0.3-1.4-0.4-0.6-0.5-0.6-2.5-1.1-0.5-0.7-0.6-0.4-0.4-0.2-0.2-0.2-0.4-1.1-0.1-0.6 0-0.2-0.1-0.2-0.3-0.2-1-0.5-0.2-0.1-0.6-0.3-0.5-0.9 0-0.2 0.3 0 0.5-0.2 0.9 0.4 0.3-0.2-0.1-0.2-0.1-0.5 0.1-0.2 0.5 0.3 0.4 0.2 0.6-0.3 0.4 0.3 0.1 0.2 0.1 0.4 0.2 0.1 0.3 0.1 0.6 0 0.2-0.1 0.2 0 0.4-0.2 0.3-0.1 0.2 0.1 0.1 0.2 0.2 0 0.2-0.1 0.6 0.4 1.7 0.3 0.6 0.4 0.3 0.1 0.7-0.4 0.4 0 0.4 0.1 0.9 0.4 0.4 0.2 3 0.4 1.5-0.1 0.2 0 0.4 0.1 0.2 0 0.2-0.1 0.1-0.2 0-0.1-0.3-0.2 0.3-0.2 0.9-0.2 0.4-0.4 2.4-0.9 0.7-0.1 0.3-0.3 0.5-0.6 0.7-0.3 1.5-0.4 0.5-0.4 0.3-0.8 0.4-1.5 0.4-0.6 0.2-0.2 0.3-0.2 0.4-0.1 0.5-0.1 1.4 0.1 0.4-0.1 0.2-0.1 0.3-0.3 0.3 0 0.2 0.1 0.2 0.4 0.3 0.1 0.3-0.2 0.3-0.4 0.1-0.5 0.1-0.4-0.3-0.4-0.3-0.1-0.8 0.1-0.4-0.3 0-0.6 0.1-0.6 0.2-0.3 1.1-0.9 0.2-0.2 0.2-0.2 1.6 0.4 0.6-0.1 0.3-0.3 0.5-0.6 0.4-0.2 0.9-0.1 0.4-0.2 0.3-0.5-0.1-0.4-0.3-0.4-0.2-0.4 0.1-0.6 0.2-0.3 2.2-1.7 0.3-0.4 0.4 0.2 0.1-0.1 0-0.7 0-0.2 0.2-0.2 0.5-0.2 0.4-0.1 0.2 0.2 0 0.9 0.2 0.3 0.4 0.1 0.5 0 1.4-0.1 0.6 0 0.1 0.3-0.3 0.8 0 1 0.5 0.5 0.6 0.4 0.5 0.4 0.2 0.8-0.6 0.6-1 0.4-0.7 0.4-0.6 0.8-0.4 0.8-1.4 3.8-1 1.8-0.7 0.8-0.7 0.7-0.1 0.2-0.3 0.5 0 0.2-0.1 0.2-0.8 0.4-0.7 0.1-0.2 0.2-0.1 0.2-0.4 0.5-0.1 0.1-0.6 0.2-0.4 0.3-0.8 0.7-0.7 0.6-0.3 0.3-0.2 0.6-0.3 0.4-0.1 0.3 0 0.5-0.3 0.3-0.8 0.7-0.1 0.4-0.2 0.2-0.1 0.2 0.1 0.2 0.2 0.2 0 0.2 0 0.4-0.1 0.1-0.4-0.1-0.2 0-0.1 0.1-0.9 1.2-0.1 0.3 0.3 0.2 0 0.2-0.4 0.1-0.2 0.3-0.4 0.8-0.6-0.2-0.5 0.2-0.5 0.3-0.4 0.1-0.5 0.1-0.6 0.5-2.7 0.6-1.1 0.1-0.8-0.4-0.3 0.2-0.6 0.6-0.6-0.2-0.2 0-0.2 0.1-0.4 0.3-0.2 0-1.4 0.1-0.5 0.1-0.9 0.3-0.2 0-0.7 0-0.4 0.2-0.4 0.2-0.2 0-0.5-0.2-0.2 0-0.5 0-0.8 0.3-0.7 0.1-0.2 0.2-0.3 0.3-0.1 0-0.2-0.1-0.7-0.6-0.3-0.1-2.3-0.2-0.2 0z m36.7-31l-0.1 0-0.1-0.2-0.1-0.2-0.1-0.3-0.1-0.4-0.1-0.4 0.2-0.4 0.1-0.1 0.2 0.2 0.2 0.3 0.4 0.2 0.1 0.2 0 0.3-0.5 0.4-0.1 0.4z m5.7-8.3l-0.1 0.3-0.1 0.1-0.2 0-0.4 0.2-0.1 0.1-0.1 0.1-0.2 0.2-0.1 0.1-0.2 0-0.2-0.2 0.1-0.3 0.1-0.1 0.3-0.3-0.1-0.2 0.1-0.2 0.2 0.2 0.1-0.1 0.2 0.1 0.3 0.1 0.3-0.3 0.1 0.2z m0.9-4.6l-0.6 0.4-0.7-0.2-0.5-0.5 0-0.6 0.3-0.2 0.3-0.2 0.4 0 0.4 0.1 0.4 0.2 0.1 0.3-0.1 0.7z m-0.7-6.5l-0.2 0.1-0.4 0-0.2-0.3-0.1-0.4 0-0.4-0.1-0.3-0.3-0.7-0.1-0.3 0.1-0.3 0.4-0.8 0.2-0.3 0.3-0.2 0.3 0 0.4 0.2 0.2 0.2 0.2 0.3 0 0.3-0.2 0.3-0.6 0.5-0.2 0.3-0.1 0.3 0.1 0.3 0.3 0.4 0.1 0.3 0 0.2-0.1 0.3z m4.5-19.3l0.3 0.1 0.1 0 0 0.5 0.2 0.5 0.2 0.5 0 0.2 0 0.1-0.1 0.2-0.8 0.6-0.1 0-0.3-0.1-0.1-0.1 0-0.2-0.1-0.3-0.5-0.2-1-0.3-0.4-0.3 0-0.4 0.1-1 0.2-0.3 0-0.7-0.1-0.2-0.5-0.2-1.1-1-0.3-0.3-0.2-0.3-0.1-0.5 0.1-0.4 0.5-0.6 0.8 0.1 0.7 0.5 0.5 0.5 0.8 1.2 0.1 0.4-0.1 0.4 0.1 0.3 0.4 0.4 0.2 0.2 0.2 0.6 0.3 0.1z m26.3-4.9l-0.6 0.3-1-0.9-0.6-1.1 0.2-0.7 0.7 0.3 0.7 0.4 0.5 0.6 0.5 0.8-0.4 0.3z m-3.1-1.5l-0.4 0-0.3-1.8 0.1-0.7-0.4-0.5-0.5-0.3-0.1-0.6-0.2-0.7 0.1-0.4 0.6 0.3 0.3 1.1 0.9 1 0.3 0.3 0 0.4-0.3 0.5-0.3 0.5 0.2 0.9z m3.9-14.8l0.1 0.3 0.1 0.5-0.1 0.5-0.2 0.4-0.1 0.5-0.1 0.5 0.2 0.8 0.7 0.6 0.4 0.5-1.2 1.6-1.2 1.1 0 1.6 0 1-0.3 0.5-0.8 0.5-1-0.4-0.8 0.1-0.3-0.6 0.3-0.6 0.3-0.4 0.7-0.4 0.8-1.9 0.9-0.8-0.2-0.4-0.3-0.1-1.5-0.4 0-0.5 0.1-0.5-0.3-1-0.1-0.9 0.2-0.6 0.8-1.1 0-0.4 0-0.2-0.1-0.5-0.1-0.2 0.3-0.2 0.5-0.1 0.6 0 0.4 0 0.3 0.2 0.1 0.5 0.2 0.3 0.3 0.1 0.2 0 0.2 0.1z m5.9-5.6l-0.2 0.2-0.3-0.2 0-0.4 0.1-0.1 0.2 0.1 0.2 0.4z m-11.9-17.5l-0.1 0.1-0.1-0.2 0.2-0.2 0.1 0.1-0.1 0.2z",    IDN558: "M954 311.7l0.1 0.5 0 0.4-0.3 0.2-4.3-0.2-0.9-0.4-0.6-0.1-1 0-0.5-0.1-0.3-0.4 0.1-0.6 0.3-0.3 1.6-1.1 0.4-0.4 0.2-0.3 0-0.5 0.2-0.3 0.3-0.2 0.9-0.1 1.2-0.4 0.7 0.1 0.3 0.5 0.1 0.7 0 0.8 0.1 0.5 0.4 0.5 0.8 0.8 0.2 0.4z m-0.3-6.9l0.3 0.8-1 0-0.5 0.1-0.4 0.3-0.6 0.8-0.4 0.3-0.5 0.2-1 0-0.5 0.1-0.4 0.2-0.3 0.5-0.6 1-0.4 0.4-1.4 1.1-0.4 0.1-0.2 0.2-0.8 0.9-0.6 0.5-0.7 0.3-0.8 0.3-0.9 0.2-0.9 0-1.5-0.6-1-0.1-3.1-0.1-4-0.1-1.1 0.1-0.9 0.3-1.8 0.7-0.8 0 0-0.8 1.9-5.4 0.5-0.9 0.1-0.4 0.1-0.3 0.7-0.4 0.2-0.2 0.2-1.3 0.3-0.4 1.6-3.3 0.5-0.7 1-1 0.2-0.3 0-0.5 0.2-0.5 0.5-0.9 0.5-0.6 1.3-1.1 3.4-2.3 3.2-1.1 2.9-0.4 0.6-0.2 1.4-0.3 2.1-0.1 1.9 0.3 0.8 1.1 0.2 0.3 1 1.5 0.3 0.3 0.3 0.3 0.3 0.2 0.8 0.2 1.6 0.2 0.6 0.3-0.4 0.5-0.3 0.3-0.2 0.4-0.3 0.9-0.6 1.1-0.1 0.4-0.1 2-0.1 0.2-0.3 0.3-1.2 0.6-0.4 0.4-0.2 0.8 0.1 1.6 0.1 0.7z m-3.1-25.8l-0.4 0.1-0.3 0-0.2-0.2-0.3 0-0.2-0.2-0.2-0.8-0.3-0.2-0.2-0.1-0.3-0.2-0.3-0.5-0.2-0.4 0.1-0.4 0.2-0.2 0.3 0.2 0.5 0.5 0.3 0.1 0.3 0.1 0.8 0 0.4 0.2 0.1 0.2 0.1 0.3 0.6 0.5 0 0.3-0.1 0.2-0.3 0.2-0.4 0.3z m-71-114.9l2.3 0.6 4.4 0.3 1.5 0.3 0.9 0.1 1.3-0.4 1.6 0.5 0.6-0.2 0.9 0.2 2 0 0.9 0.2 0.1 0.1 0.2 0.3 0.1 0.1 0.2 0 0.6-0.1 0.2 0.1 0.3 0.3 0.4 0.2 0.8 0.4 0.5 0 1.4-0.2 3.6 0.5 1.8-0.2 0.4 0.1 0.8 0.3 0.4 0.1 0.8 0 0.4 0.1 0.3 0.2 1.1 0.6 0.1 0.1-0.3 0.1-0.1 0.3-0.2 0-1.7 0.1-0.8 0.1-0.6 0-0.1 0.1-0.1 0.2-0.2 0.1-0.2 0.1-0.4 0.1-0.4 0.3-0.2 0.1-0.3 0.1-2-0.2-0.4 0 0 0.1 0.2 0.1 0.1 0.2 0 0.2-0.2 0.1-0.3 0-0.4-0.2-0.2-0.1-0.2 0-0.5 0.1-0.2 0.1-0.2-0.1-0.7-0.2-0.4-0.1-0.8-0.3-0.4-0.1-0.2 0.1-0.2 0.2-0.1 0-0.4 0.1-0.2 0.1-0.1 0.1-0.1 0.2-0.1 0.3-0.2 0-0.1-0.3-0.2-0.1-0.2 0.1-0.2 0.1-0.4-0.6-0.7-0.4-1.6-0.3-0.2 0-0.5 0-0.2 0-0.2-0.1-0.3-0.3-0.2-0.1-0.5 0-0.3-0.1-0.3-0.1-0.6-0.4-1-0.4-0.2-0.1-0.2-0.2-0.4-0.1-0.9 0-0.4-0.2-0.7-0.4-0.7-0.1-0.2 0-0.3-0.3-0.2-0.1-0.3 0-0.3 0.2-0.2-0.2-0.3-0.2-0.2-0.1-0.3 0.1-0.3 0.1-0.3 0.1-0.3-0.1-0.5-0.3-0.5 0-0.7 0-0.6 0-0.3-0.2-0.1-0.2 0-0.2-0.2-0.3-0.1-0.1-0.3 0.1-0.2 0 0-0.4-0.1-0.1-0.3-0.2 0.2-0.2 0.4-0.1 0.1 0 0.2-0.2 0.3 0z m71 0.8l-0.3 0-0.5-0.2-0.1-0.4 0.3-0.4 0.6 0.6 0 0.4z m-78.6-3.2l0.5 0.1 1.2-0.1 0.5 0.2 0.2 0.1 1-0.3 0.3 0.1 0.1 0.1 0.3 0 0.4-0.1-0.5 0.6-0.8 0.3-1.9 0-1.8-0.1-0.2-0.2 0-0.5 0.3-0.3 0.4 0.1z m-5.5 60.4l8.5-10.8-21.9-7.8-0.5-0.4 0.1-0.6 0.3-1 0.6-1.1 0.5-0.8 0.6-0.7 2-1.6 0.6-0.8 0-0.3-0.1-0.9 0-0.2 0.2-0.2 0.3-0.2 0.3-0.2 4-3.2 0.7 2.6 0.6 0.6 1-0.2 1.2-1.4 0.5-0.3 0.2 0.9-0.2 1.4-0.1 0.3-0.4 0.3-0.1 0.2 0 0.2 0 0.7-0.2 0.8 0.1 0.4 0.7 0.2 0.2 0.3 0.1 0.9 0.2 0.3 0 0.3 0.1 0.3 0.4 0.4 0.4 0.1 0.3-0.1 0.7-0.5 0 0.2-0.1 0.5 0 0.2 0.1 0.1 0.3 0.3 0.2 0.7 0.4 0.1 0.9 0 0.5 0.1 0.6 0.4 0.3 0.1 3.6 0.1 0.4 0.1 0.6 0.3 0.4 0.1 0.5-0.1 0.9-0.3 1.4-0.2 0.4-0.1 0.4-0.2 0.3-0.3 1-1 0.1-0.2 0.1-0.2 0-0.3-0.1-0.2 0.1-0.2 0.6-0.8 0.8-0.5 1.7-0.7 0.7-0.4 0.4-0.4-0.1-0.2-0.3-0.2-0.1-0.3 0-0.2 0.3-0.3 0.2-0.2 0.2 0 0.5 0.2 0.3-0.3 0.6-0.6 1-0.3 0.5-0.3 0.3-0.4 0.3-0.5-0.1-0.4-0.2-0.8 0-0.2 0.6-0.6 0.2-0.3 0.1-0.4 0-1 0.1-0.1 0.5-0.4 0.1-0.2 0.3 0.1 0.2-0.9 0.3-0.2 0.4-0.1 0.2-0.1 0.2-0.3 0.3-0.1 0.5-0.1 1.9-0.9 0.9-0.6 0.6-0.8 0.2-0.4 0.2-0.4 0.1-1.6 0.1-0.3 0.2-0.3 0.7-0.8 0.2-0.3 0.1-0.4 0-0.3-0.1-0.4-0.1-0.7 0.2-0.3 0.3-0.5 0.4-0.4 0.5-0.3 0.6-0.2 1.1 0 0.2 0 0.7-0.4 0.2 0 0.1 0.2-0.1 0.3 0 0.3 0.2 0.1 0.6 0 0.5 0.1 0.2 0.3 0.2 0 0.5-0.1 0.3 0 0.8 0.3 0.4-0.5 0.3 0.1 0.4 0.2 0.3 0 0.2 0 0.3-0.3 0.1-0.1 0.6-0.1 0.2-0.1 1.2-0.8 1.3-0.2 0.2-0.1 0.1-0.2 0.1-0.2 0.1-0.3 0.6-0.3 1-0.2 2.8-0.1 0.5-0.1 0.4-0.2 0.7-0.5 0.1-0.3-0.2-0.5-0.5-0.4-0.2-0.3 0.1-0.2 0.2-0.1 0.1-0.3 0-0.3-0.1-0.3-0.3-0.2-0.5-0.2-0.3-0.1-1.2-0.9 0.3-0.3 0-0.4 0-1 0.2-0.2 0.4-0.3 4.5-1.6 2.5-1.5 0.5-0.2 0.3-0.3 0.2-0.4 0.1 0 0.4-0.1 5.7-2.5 1-0.2 0.9-0.1 0.9 0.3 0.2 0.2 0.5 0.6 0.2 0.1 0.4 0.4 0.1 0.1 0.3 0 0.2 0.1 1 1 0.4 0.3 0.9 0.1 2.4 0.7 2.8 1.4 3.7 1 1.5 0.3 0.5 0.1 1 0.3 1.5 1.2 1.5 1.6 0.8 0.7 0.5 0.1 1.4 0 0.5 0.1 3.4 1.1 3.8 2.4 2.2 0.7 1.2 0.7 0.3 0.1 0.3 0.1 1 0.8 3.6 1.3 2.2 1.4 0.9 0.2 0.9 0.1 4.3-0.3 0.5-0.3 0.3-0.4 0.1-0.1 0.4 0.2 0.5 0.3 0.2-0.1 0-0.3 0.1-0.1 0.2 0.1 0 0.3 0.1 0.2 0.8 1.2 0.4 0.1 1.3 0.5 0.5 0.4 0.5 0.2 0.4-0.3 0.2 0.1 0.2 0 0.2-0.2 0.1-0.2-0.1-0.2-0.2-0.2-0.1-0.1 0.3-0.3 0.2 0.1 2.1 0.7 0.3 0.1 2.4 0.1 2.6 1.1 0.3 0.2 0.1 0.4-0.1 0.7-0.1 0.3-0.9 1 0.2 0.2 0.2 0.2 0.2 0.1 0.2 0.1 0.1-0.2 0.1-0.5 0.2-0.1 0.5 0.4 0.2 0.1 0.2-0.1 0.5-0.2 0.3 0 2 0 0.9-0.2 0.2 0 0 0.7 0 8 0 5.4 0 7.3 0 4.7 0 8.1 0.1 13.1 0 4.9 0 29.2-0.1 0-0.2 0.3-0.1 0.4-0.1 0.1 0 0.2 0.2 0.1 0.1 0.2-0.1 0.2-0.3 0.3 0.1 0.3-0.5 0-0.2 0 0 0.2 0.2 0.1 0 0.2 0 0.2 0.4 0 0.1 0.4-0.1 0.4-0.1 0.2-0.4 0-0.1 0.2-0.1 0.2 0 0.6-0.2 0.1-0.3 0.1 0.2 0.4 0 0.1-0.3 0.3-0.4 0.1-0.3 0.1-0.2 0.3 0.4 0.1 0 0.5-0.2 0.7-0.2 0.4 0 0.3 0.2 0.2 0.5 0.4 0.1 0.2-0.1 0.2-0.2 0.4 0.1 0.2 0.1 0.2 0.4 0.3 0.2 0.4 0 0.4 0.2 0.3 0.5-0.1 0.1 0.7 0.4 0.2 0.3 0 0 2.3 0 6.1 0 15.8 0 3.7 0 5.8 0 3.9 0 4.1 0 6.7-1-0.5-0.2-0.1-1.4-0.6-5.1-5.3-2.5-3.8-1.2-1.1-0.1-0.2-1.5-1.2-0.2-0.3-0.1-0.4-0.2 0-1.2-0.5-0.7-0.8-0.4-0.5-4.7-3.6-1-1.1-0.3-0.6-0.1-0.5 0.2-0.5 0.4-0.4 0.5-0.3 0.3-0.1 0.3 0 0.2-0.1 0.1-0.3 0.1-0.8-0.2-0.7-0.1-0.6 0.2-0.5 0.5-0.3 0.6 0.3 0.4-0.3 0.5-1.1-0.4 0.2-0.3 0.5-0.4 0.1-0.6 0-0.3 0.1-0.2 0.2-0.1 1-0.1 1.4-0.2 0.3-0.4 0.4-0.9 0.5-0.9 0.2-3.5 0.1-3 0.3-0.7 0.2-1.2 0.7-0.7 0.3-1.7 0.4-0.9 0-0.8 0-0.8-0.2-0.8-0.4-0.6-0.6-0.3-0.7 0-0.2 0.1-0.5 0.1-0.3-0.1-0.4 0-0.7-0.1-0.3-0.5-0.5 0.4-0.1 0.3 0.1 0.4 0.1 0.4-0.2-1-0.4-0.5-0.1-0.3 0.2 0.1 0.3 0.1 0.7 0.3 0.1 0.1 0.1-0.1 0.3-0.1 1-0.5 0.4-1.7 0.5-0.7 0.4-2.5 2.1-0.2 0.3-0.1 0.5-0.2 0.3-0.2 0.2-0.1 0.1-0.4 0-0.1-0.1-0.8-1.6-0.5-0.7-0.3-0.5 0-0.5 0-0.5 0.4-0.3 0.9-0.2 0.5-0.3 0-0.2 0-0.2-0.1-0.2-0.3-0.2 0-0.3 0.1-0.5 0-1.9 0.1-0.4 0.3-0.2 0.8-0.2 0.6-0.4 0.2-0.7 0.1-1.7 0.6-1.5 0.2-0.3 0.1-0.1 0.2-0.8 0.1-0.2 0.2-0.2 0.2-0.2 0.2-0.2 0.1-0.8-0.5-0.6-0.8-0.4-0.7-0.1-1-0.1-0.2-0.2-0.3-1-0.2-0.5-0.8-1.5-0.5-0.5-0.5-0.5-1.6-1.1-0.3-0.1-0.3-0.3-0.2-0.1-0.5 0-0.3-0.2-0.4-0.2-0.2-0.3 0-0.2 0.5-0.2 4.7 0.2 0.9 0.1 0.3 0.2 0.7 0.5 0.2 0.1 3.4 0.1 0.4-0.2 0.2-0.5 0.3-0.5 0.3-0.5 0.6-0.2 0-0.2-0.4-0.1-0.4 0.1-0.5 0.6-0.3 0.4-0.2 0.2-0.2 0-1 0-0.9 0.2-0.5 0-0.4-0.4-1.2-0.7-0.4-0.1-0.5-0.1-1.4-0.1-0.4-0.1-0.6-0.3-1.1-0.4-0.2-0.1-0.1-0.2-2.2-2.2-1.6-1.2-0.3-0.6 0.5-0.6 0.3-0.2 0.3-0.1 1 0 0.4 0.1 0.9 0.4 0.5 0 0.4-0.2 0.6-0.6 0.3-0.1 1.8-0.2 0.8-0.1 0.3 0 0.2 0 0.4 0.2 0.2 0.1 0.4 0.2 0.6 0.9 0.5 0.2 0.7 0.6 0 0.1 0.3 0.1 0.4 0.1 0.3 0.2 0.2 0.1 0.3 0 0.9 0 0.2 0-0.2-0.3-0.5-0.1-0.5 0-0.3-0.1-0.1-0.2-1-0.5-1.5-1.4-0.8-0.4-0.9-0.2-1.5-0.1-0.4-0.1-0.3-0.2-1.2-1.1-0.5-0.4-0.9-0.2-0.4-0.3-0.2-0.4-0.1-0.6 0.3-0.5 0.4 0 0.9 0.4 0.4 0.1 1.5 0.8-2.7-1.7-0.6-0.6-1-1.2-0.3-0.2-0.3-0.2-3-2.7-1-1.9-0.2-0.6-0.4-0.8-0.1-0.4 0.1-1.1-0.1-0.3-0.4-1 0-0.4-0.1-0.3-0.4-0.5-0.1-0.3-0.1-0.3-1.4-2.1-0.3-0.7 0.2-0.6 0.8-0.4 1.5-0.3 0.6-0.4-0.4 0-0.9 0.3-0.5 0-2.4-0.5-0.6-0.4-0.1-0.1 0-0.2-0.2-0.2-0.2-0.3 2-1.2 1.2-0.5 1.2-0.3-0.4-0.2-0.5 0-0.9 0.2-0.6 0-0.4 0.1-0.4 0.1-0.9 0.6-0.4 0.1-1.1 0.1-0.4 0.3-0.1-0.1-0.2-0.2-0.1-0.2 0-0.4-0.2-0.9-0.1-1 0-0.5 0.1-0.3 0.2-0.2 0.3-0.3 0.2-0.1 0.2 0 0.2-0.1 0-0.2-0.1-0.1-0.4-0.2-0.2 0-0.3-0.2 0-0.5 0.3-1 0-0.5-0.1-0.2-0.2-0.1-0.1 0.3-0.1 0.3-0.3 0.1-0.3-0.2 0.2 0.6 0 0.4-0.2 0.2-0.6-0.1-0.2-0.2-0.6-0.9-1-0.9-0.1-0.5 0.3-0.8-0.4-0.1-1.1 0.8-0.7 0.1-0.3-0.3-0.6-0.7 0-0.1 0-0.4 0.4-0.6 0.2-0.3-0.8 0.4-0.4 0.1-0.5-0.1-0.3-0.4-0.2-0.7-0.4-0.2-0.2 0-0.2 0.1-0.2 0.1-0.3-0.2-0.7-0.2-0.4-0.2-0.4-0.3-0.1-0.3 0.5-0.2 0-0.2-0.4-0.1-0.1-0.5-0.3-0.1-0.1 0.1-0.3 0.5-0.2 0.1-0.3 0-0.2-0.2-0.4-0.4-0.2-0.1-0.2 0-0.1-0.2-0.1-0.3-0.7 0.2-0.6-0.1-0.6-0.4-0.4-0.4 0.1-0.2 0.1-0.1 0.1-0.3 0-0.2-0.2 0-0.3 0.3-0.3-0.2-0.6-0.7 0.1 0.5-0.2 0.1-0.6-0.1-0.1-0.2-0.1-0.3 0.4-1.3-0.1 0-1 0.7-0.2 0.3 0.2 0.3-0.3 0.3-1.1-0.4-0.4-0.4 0-0.7-0.8 0.8-0.5-0.4-0.1-0.4 0.2-0.5 0.1-0.7-0.1 0-0.5 0.8-0.7 0.4-0.7 0.1-1.2-0.5-0.1-0.1-0.1-0.2 0.2-0.3 0.2-0.1 0.3-0.2 0.1-0.1-0.2-0.2-0.5 0.1-1.6 1-0.4 0.2-0.5 0.1-0.2-0.1-0.2-0.2-0.2-0.2-0.1-0.2 0.1-0.4-0.1-0.1-0.3-0.1-0.5 0-0.2 0.1-0.2 0.1-1.1-0.8-1.5-0.5-1.9-1.1-1.6-0.8-0.5-0.5-0.2 0-0.4 0-0.2-0.1-0.6-0.5-0.5-0.2-1.9 0-1.9-0.6-0.7-0.5 0-0.1-0.5-0.1-0.4-0.1-0.2-0.2-0.3-0.2-0.4-0.1-0.3 0-0.3-0.1-0.4-0.3-1-1.1-0.5-0.3-0.8-0.2-1.8 0-0.8-0.3-0.3 0.2-0.6 0.1-0.6-0.1-0.5-0.1-0.9-0.1-1-0.2-0.2-0.1-0.3-0.2-2.7-0.3-0.5-0.1-0.3-0.3-0.3 0.2-1.2 0.1-0.6-0.1-1.3 0.4-0.9 0.1-1-0.3-4.9-2.8-0.3-0.3-0.2-0.3-0.2-0.3-0.4-0.3-0.6-0.2-0.1 0z m1.1-69.2l0.4 0.2 0.4-0.2 0.3-1 0.5-0.2-0.1 0.3-0.1 0.4 0 0.7-0.7 1-0.3 0.1-0.4 0.1-0.7 0-0.3-0.1-0.4-0.2-0.2-0.3-0.4-0.8-0.5-0.5-0.2-0.5 0.3-0.6 0.1-0.1 0-0.4 0.1-0.2 0.2-0.2 0.3-0.3 0.3-0.1 0.4-0.1 1 0.3 0.3 0.2 0.1 0.2 0 0.2 0.2 0.3 0.1 0.2-0.1 0.6-0.1 0.2-0.4 0.5-0.1 0.3z m10.8-9.1l0.1 0 0.3 0 0.2 0 0.4 0.2 0.6 0.2 1.2 0.1 0.2 0 0.5-0.2 0.2 0.2 0.2 0.4 1.4-0.3 0.2 0.1 0.3 0.5 0 0.2 0.1 0.3 0.2-0.1 0.3-0.2 0.2 0 0.7 0.5 0.4 0.2 0.2-0.2 0.1-0.3 0.4-0.3 0.4-0.3 0.4-0.1 0.5 0.2 0.5 0.4 1.6 1.6 1.7 1.2 0.5 0.4 0.2 0.7 0.3 0.4 0.3 0.2 0.1 0.2 0.1 0.5 0.3 0.4 0.4 0.2 0.4 0.3 0.2 0.6 0.3 0.4 0.2 0.4 0.3-0.1 0.3-0.2 0.5-0.1 0.6 0 0.5 0.1 0.2 0.5 0.2 0.2 1.3 0.2 0.2 0.3-0.1 0.3-0.3 0.3-0.3 0.1-0.3 0.1-1 0.8-1.4 0.2-0.3 0.2-0.3 0.1-0.4 0.2-0.5 0.1-0.4 0.1-0.9-0.2-1.4-0.8-1-0.2-0.5 0.1-0.8 0.3-0.5 0-0.5-0.1-0.4-0.3-0.4-0.5-0.3-0.4-0.1-0.4 0.1-1.3 0-0.2-0.4-0.6-0.1-0.2-0.2-0.7-0.4-2.1-0.4-0.8-0.5-0.4-0.5 0.1-0.4 0.5-0.3 0.4-0.5 0.5-0.5-0.1-3.4-2.7-0.1 0.2 0 0.2 0.3 0.6-0.7-0.3-0.8-0.6-0.6-0.9-0.6-1.5 0.1-0.4 0.4-0.2 0.2 0.1 0.3 0.4 0.2 0.1z",    IDN1223: "M302.4 278l-1.5 1.7-0.5 0.9-0.1 0.3-0.2 1.1 0 0.7 0.1 0.4-0.1 0.3-0.2 0.2-0.2 0.3-0.3 0.3-0.3 0.3-0.5 0.4-0.5 0.2-0.6 0-0.8-0.1-0.4 0-0.4 0.1-0.2 0.2-0.2 0.3-0.1 0.3 0 0.5-0.5 1.7 0.1 0.7 1.1 0.3 0.1 0.3 0.2 0.2 0.2 0.1 0.5-0.2 0.3 0 0.1 0.1 0.1 0.7 0.7 0.3 0.1 0.1 0.1 0.6 0.1 0.9 0.5 1.6 0 0.6-0.2 0.6 0 0.3 0.2 0.3 1.2 1-0.2 0.2-0.6 0.4-0.7-0.4-0.3-0.2-0.2 0-0.3 0.2-0.4 0.4 0.1 0.4 0 0.2-0.1 0-0.5-0.1-0.1-0.5-0.1-0.1-0.3 0-1.5 0-0.4 0.1-0.7 0.6-0.1 1-0.2 0.6-0.9 0.6-2.7-0.1-4.1-0.6-4-1.1-1.1 0-0.9 0.1-0.7-0.3 0-0.6-0.5-0.3-0.6-0.2-1.4-0.2-0.6-0.2-0.2-0.5-0.4-0.5-0.7-0.4-0.8-0.6-0.8-0.2-0.6-0.2-1-0.3-0.2-0.5-0.4 0-0.5-0.2-0.2 0-0.2-0.2-1.1 0.2-1.4-0.2-1.8-0.2-0.7-0.3-0.8-0.1-0.8-0.3-5.1-0.4-1.8 0-3.9-0.4-1.9-0.2-0.9-0.7-0.5-0.3-0.5 0-0.6 0.2-0.2 0.1 0-0.4 0-0.5-0.5-0.6 0.2-0.9-0.1-0.5 0.1-0.3 0.3-0.5 0.4-0.5 0.4-0.2 0.3 0.1 0.4-0.1 0.1-0.2-0.3-0.5 0.4-0.4 0.8-1 0.6-0.6 0-0.8-0.1-0.7-0.6-0.5-0.6 0.1-0.6-0.3-0.6 0.2-0.5 0.6-0.1-0.5 0-0.3 0.1-0.5 0.2-0.6 0.8-1.5 1.2-1.1 0.1-0.3-0.4-0.4-0.3-0.2-0.7-0.2-0.2-0.3-0.2-0.5-0.4-3.8 0-0.7 0.4-0.6 0.2-0.5-0.1-0.6-0.1-0.6-0.1-0.3 0.2-0.5 0.5-0.3 0.2 0 0.1 0.2 0.1 0.3 0.2 0.3 0.2 0.1 0.3-0.1 0.2-0.3 0.4-0.1 0.6 0 0.5 0.2 0.4 0.3 0.7 0.2 2.3 0 0.6-0.3-0.1-0.4 0-1.1 0.3 0.1 0.2 0.4 0.1 0.1 0.3 0.2 0.2 0.2 0.3 0 0.2 0 0.4-0.3 0.7 0.3 0.8 0.7 0.4-0.2 0.2-0.6 0.4-1.5 0.2-0.3 0.1-0.3 0-0.3 0-0.7 0.1-1.3 0-1.3 0-0.1 0.1 0 0.3-0.2 0.1-0.4 0.1-0.2 0-0.3-0.4-0.6 0.2-0.3 0.4-0.6-0.1-0.8 0.5-0.2 0.8 0.2 0.8 0.3 0.2 0.3 0.2 0.2 0.3 0.3 0.5 0.1 0.3 0 0.4 0 1.7-0.5 0.8 0.1 0.8 0.3 0.5 0.8 0.7 1.1 0.7 0.9 0.6 0.9 0.9 0.5 1.1 0.4 1.3 0.1 0.7 0.8 0.5 0.3 0.5-0.3 0.3 0.2 0.4-0.1 0.2-0.2 0.5-0.2 0.2-0.1 0.2 0 0.4 0.1 0.2 0 0-0.2 0-0.3 0.3-0.1 0.5 0.2 0 0.3 0.3 0 0.3-0.4 0.2 0 0.2 0.5 0 0.4 1.1 0.7 1 0.4 1.3 0.6 0.5 0.2 0.4 0.2 0.8 0 0.3-0.1 0.3-0.2 0.6-0.3 0.2-0.3 0.2-0.2 0.1-0.3-0.1-0.3-0.1-0.2-0.3-0.2 0.3-0.1 0.4 0.3 0.7 0.2 1.3 0 0.5 0.3 0.1-0.3 0.5 0 0.1 0.5 0.2 1.5 1.8 2.2 0.4 0.2 0.3 0.1 1.1 0.7 0.8 4 0.6 2 1.3 0.1 0.9 0.7 0.9 0.3 1 0 0.9-0.5 0.2 0.2 0.3 0.1 0.4 0.1 0.3 0.1 0.1 0.1z",    IDN1227: "M261 261.9l0 0.1 0 1.3-0.1 1.3 0 0.7 0 0.3-0.1 0.3-0.2 0.3-0.4 1.5-0.2 0.6-0.4 0.2-0.8-0.7-0.7-0.3-0.4 0.3-0.2 0-0.3 0-0.2-0.2-0.3-0.2-0.1-0.1-0.2-0.4-0.3-0.1-0.2-0.1-0.2-0.3-0.3-0.9-0.6-0.7-0.4-2.4 0.2-0.3 0.7-0.6 0.1 0 0.2 0.5 0.3 0.3 0.9 0.1 0.9 0 3.3-0.5z",    IDN1226: "M223.6 271.7l0 0.6 0 0.8-0.2 0.8-0.3 0.3-0.4 0.2-0.4 0.5-0.3 0.1-0.2-0.2 0.1-0.3 0.1-0.4 0.2-0.3-0.2-0.1-0.2-0.3-0.1-0.5-1 1-0.2 0.1-0.1-0.4 0.4-0.6 1.1-0.9 0.2 0.2 0.2-0.2 0.2-0.2 0.2 0 0.1 0 0.1-0.1 0.2-0.1 0.5 0z m31.8-10.2l-0.1 0-0.7 0.6-0.2 0.3 0.4 2.4 0.6 0.7 0.3 0.9 0.2 0.3 0.2 0.1 0 1.1 0.1 0.4-0.6 0.3-2.3 0-0.7-0.2-0.4-0.3-0.5-0.2-0.6 0-0.4 0.1-0.2 0.3-0.3 0.1-0.2-0.1-0.2-0.3-0.1-0.3-0.1-0.2-0.2 0-0.5 0.3-0.2 0.5 0.1 0.3 0.1 0.6 0.1 0.6-0.2 0.5-0.4 0.6 0 0.7 0.4 3.8 0.2 0.5 0.2 0.3 0.7 0.2 0.3 0.2 0.4 0.4-0.1 0.3-1.2 1.1-0.8 1.5-0.2 0.6-0.1 0.5 0 0.3 0.1 0.5-0.5 0.2-0.5 0.1-0.5-0.1-0.3-0.1-0.4-0.1-0.3-0.1-0.1 0-0.2-0.3-0.1-0.1-0.3-0.1-0.1-0.2-0.1-0.2-1-0.7-0.7 0.1-0.9-0.4-1.6-1.3-1-0.4-0.6-0.1-0.4 0-0.9 0.2-0.4 0.1-0.1 0.3-0.3 0.1-0.2-0.3-0.4 0.1-0.7 0-1 0.3-0.4-0.2-0.7-0.1-0.5-0.1-2.3 0.3-0.9 0.2-0.4 0.3-0.8-0.2-0.3 0.1-0.3-0.3-0.3-0.2-0.4 0-0.2 0.2-0.2 0.1-0.1-0.1-0.2-0.3-0.2-0.2-0.9-0.4-1 0-0.2 0.1-0.1 0.4-0.1 0.2-0.2 0.1-0.2 0-0.4-0.1-0.2-0.4-0.2-0.8-0.3-0.2-0.1-0.2 0-0.1 0.2-0.1 0.7 0.1 0.3-0.1 0.4-0.3 0.6-0.6 0.2-0.4 0.1-0.4 0.3-0.3 0.3-0.1 0.3 0.1 0.3 0.3 0.3 0.3 0.1 0.2 0.1 0.3 0 0.4 0.5 0.9 0.1 0.3 0.3 0.3 0.4 0.2 0.4-0.1 0.3-0.4 0.3-1.1 0.2-0.4 1.7-1.6 0.4-0.4 0.1-0.4-0.2-1.8 0.5-1.1 0.3-0.2 0.5 0 0.1 0.8 0.3 0.2 0.3 0.3 0.6 0 0.9-0.4 0.6-0.8 0.3-0.9 0-0.8 0.2-3.7 0.2-0.8 0.6-1.8 0.4-0.9 1.5-1.6 0.2-0.1 0.3-0.2 0.4-1.4 0.5-0.6 0.7-0.2 0.7 0.1 0.5 0.5 0.1 1.4 0.1 0.3 0.3 0.1 0.6 0.4 0.4 0.1 0.7-0.4 0.5-0.7 0.5-0.5 0.9 0.1 1.4 1 0.5 0.2 0.5 0.1 1.4 0.6 0.5 0 0.4-0.2 0.3-0.3 0.5-0.1 2.5 0 0.4 0.1 0.5 0.2 0.3 0.2 0.2 0.4 0 0.3z",    IDN1225: "M161 248.5l0.2 0.2-0.3 0.2-1-0.3-0.1 0-0.1 0.1-0.4-0.1-0.1 0.1-0.1 0.1-0.2 0.4-0.3-0.2-0.3-0.7-0.2-0.3-2.6-2-0.6-0.4 1-0.9 0.5-0.2 0.7 0.1 0.6 0.3 0.3 0.1 0.3 0.1 0.4 0.1 0.2 0.2 0.4 0.4 1.4 0.4 0.6 0.3 0.2 0.7-0.1 0.3-0.3 0.2-0.4 0.3 0 0.2 0.3 0.3z m-6.8-58.4l0.4 0.6 0.6 0.4 0.2 0.2 0.2 0.3 0.3 0.7 0.3 0.4 1 0.8 0.4 0.3 0.1 0.2 0.1 0.3 0.1 0.5-0.1 0.1-0.4 0.1-0.2 0 0.1 0.3 0.6 0.8 0.3 0.1 0.1 0.1 0.5 0 0.5 0.2 0.3 0.1 0.2 0 0.5-0.4 0.2 0 0.2 0 1.4 0.5 0.5 0.5 0.4 0.3 0.2 0.2 0.1 0.2 0 0.2 0 0.2-0.2 0.4-0.1 0.7 0 0.2-0.3 0.3 0 0.2 0 0.1 0.2 0.2 0.2 0.1 0.3 0.1 0.2 0.3 0.2 0.3 0.3 0.2 0.3 0.4 0.3 0.3 0.2 0.2 0.3 0.1 0.1 0 0.7 0.4 0.4 0.1 0.2-0.1 0.2-0.1 0.8-0.7 0.9-0.7 0.4-0.3 0.4-0.1 0.2 0 0.2 0.2 0.2 0.7 0.2 0.3 1.2 0.8 0.3 0.1 1.3 0.2 0.4 0.1 0.6 0.1 0.3 0.1 0.2 0.2 0.1 0.1 0.2 0.4 0.1 0.6 0 0.6-0.2 1.7-0.3 0.4-0.6-0.1-0.2 0.1-0.6 0.1-0.3-0.1-0.5-0.2-0.2 0-0.1 0.1 0.1 0.2 0.2 0.3 0.1 0.3 0 0.3-0.3 0.3-0.4 0.3-0.5 0.2-0.4 0.3-2.7 2.4-0.3 0.2-1.2 0.3 0.1 0.3 0.6 0.4 0.2 0.3 0.3 0.3 0.2 0.3 0.8 0.5 0.3 0.3 0.5 0.8 0.3 0.3 0.4 0.2 1 0.4 0.2 0 0.4 0 0.7-0.2 0.4 0.1 0.2 0.1 1 0.7 0.4-0.2 0.5 0 0.3 0 0.4 0 0.6-0.1 0.2 0 0.4 0 0.3 0.2 0.1 0.1 0.3 0.3 0.1 0.7 0.6 1.3 0.2 0.5 0.1 1.7 0.2 0.5 0.4 0 0.2 0 0.4 0.2 0.6 0.3 0.9 0.2 1 0.6 0.7 0.2 1.3 0.1 0.9 0.7 0.6 0.2 0.4 0 0.9 0.1 0.3 0 0.2 0.2 0.2 0.2 0.1 0.4 0.1 1.9 0.2 0.5 0.2 0.4 0.6 0.8 0.3 0.7 0.2 0.2 0.1 0.3 0.5 2 0 0.3 0.1 0.3 0.2 0.1 0.4 0.3 0.2 0.2 0.1 0.4-0.6 0.7-0.7 0.5-0.6 0.4-0.8 0.5-0.3 0.1-0.4 0.2-0.3-0.1-0.2 0-0.5 0-0.2 0-0.2-0.3-0.2-0.1-0.3-0.4-0.2-0.1-0.5-0.2-0.3-0.1-0.3 0-0.2 0.1-0.6 0.2-0.2 0-0.1-0.2-0.3-1-0.2-0.2-0.2-0.1-0.4-0.3-0.3 0.3-0.3-0.1-0.3-0.4-0.3-0.9-0.4-0.5-2.4-2.1-2.7-1.6-2.8-1.1-0.4-0.3-0.3-0.9-0.3-0.4-3.8-3.3-3.7-2.6-3.5-2.7-0.6-0.3-0.6-0.4-0.5-0.6-0.1-0.7 0.1-0.4 0.4-0.7 0.1-0.4-0.2-0.4-0.6-0.8-0.3-0.3 0-0.3 0-0.5-0.1-0.3-0.3-0.4 0-0.3-0.1-0.7-0.1-0.5-0.3-0.3-3.4-2-4.1-2.8-5.2-3.8-0.5-0.5-0.6-1.1-0.4-0.3-3.2-5.1-0.2-0.9-1.8-3.2-0.6-0.7-0.8-0.5-1.8-0.9-0.9-0.5-0.7-0.7-1.7-2.3 1.1-1 2-1.5 0.4-0.1 1.1-0.3 0.4-0.2 1-0.7 0.7-0.2 1.8-1.3 0.4 0 0.3 0.3 0.2 0.2 0.5 0.5 0.4 0.2 0.2 0.1 0.1 0.2 0.1 0.4 0.4 0.6 0.5 2.1 0.2 0.4 0.3 0.2 0.7 0.2 0.3 0.3 0.2 0.2 0.1 0.6 0.8 0.7 0.5 0.7 0.7 0.8 0.8 0.6 1.2 0.6 0.3 0.1 0.5 0.2 0.3 0.2 0.4 0.5 0.3 0.2 0.2-0.1 0.4-0.1 0.2-0.1 0.3 0 0.7 0.3 0.5 0.4 0.3 0.1 0.6 0.1 0.2 0.2z",    IDN1224: "M303.8 297.8l1.1 0.7 0.3 0.2 0.4 0 0.1 0.2-0.1 0.2-0.1 0-0.2 0-0.6-0.1-1.2-0.4-1.3-0.3-0.3-0.1-0.3-0.1-0.9 0.1-0.3-0.1-0.2-0.3 0.1-0.4 0.2-0.3 0.3-0.2 1.2 0.5 1.1 0.2 0.7 0.2z m58.9-21.6l-0.1 0.1-0.8 1.4-0.2 0.5 0 0.4-0.5 2.6 0.1 1.9-0.1 0.7 0 0.3 0.2 0.9 0.1 0.2-0.1 0.2-0.3 0.2-0.9 0.8-0.3 0.4-0.4 0.3-0.6 0.4-0.4 0.3-0.3 0.2-0.3 0.4 0 0.2 0 0.2-0.9-0.1-1.4-0.5-0.3-0.2-0.3-0.1-0.1-0.1-0.4 0.1-0.2 0-0.4-0.1-0.3-0.2-0.6-0.1-0.4 0.4-0.1 0.9 0 1 0.1 0.7 0 0.4-0.4 2.7 0.3 1.2 0.2 0.4 0.2 0.3-0.1 0.2-0.5 0.4-0.1 0.2 0 0.1 0.1 0.4 0 0.4 0.1 0.3 0.3 0.2 0.8 0.1 0.2 0.1 0.3 0.2 0.5 0.6 0.3 0.3 0.1 0.2 0.1 0.3-0.1 0.9-0.1 0.5-0.4 0.9-0.1 0.8-0.4 0.3-0.2 0-0.5-0.3-0.3 0-0.5 0.4-0.3 0.2-0.6 0.3-1.1 0.6-1.4 1.2-0.8 0.5-0.4 0.3-0.3 0.4-0.2 0.4 0.1 0.5 0 0.3-0.4 1 0 0.2-0.3-0.1-1.8-0.4-0.1-0.1-0.1-1.4-0.3 0-0.1 0.1-0.2 0-0.2-0.2-0.1-0.2-0.1-3.8-0.1-0.6 0-1-0.1-0.5-0.2-0.2-0.4-0.2-1.1-0.2-0.3-0.1-0.8 0.1-0.4-0.1-1.2 0-0.9-0.2-0.7-0.6-0.3-0.6-0.4-0.8-0.7-3.3-0.1-0.2-0.6 0.6-2.4 1.8-0.3 0.3-0.4 0.5-0.2 0.2-0.1-0.3-0.1-0.5-0.1-0.1-0.1-0.1-0.2 0.1-0.2 0-1.3-0.2-0.5 0.3-0.2 0.2 0 0.2 0 0.6-0.1 0.4-0.2 0.4-1.1 1.7-0.3 0.4-0.1 0.2-0.1 0.5-0.2-0.1-2.2-0.6-0.5-0.4-0.5 0.1-0.8-0.1-0.8-0.3-1.3-0.3-2-0.6-3.8-0.5-0.8 0.2-0.4 0.1-0.2-0.2-0.1-0.2-0.3-0.1-0.1-0.1 0-0.1 0.2-0.3 0-0.1-0.2 0-0.6-0.2-3.7-0.4-2.2-0.2-1.1 0.3-0.3 0.4-0.2 0.3-0.2 0-0.7-0.6-0.2-0.1-0.2 0-0.5-0.1-0.5 0-0.3-0.2-0.3-0.2-0.2-1-0.2-0.5-0.3 0.1-0.1 0.1-0.6 0.2-0.1 0.2-0.3 0.4-0.2 0.2-1.2-1-0.2-0.3 0-0.3 0.2-0.6 0-0.6-0.5-1.6-0.1-0.9-0.1-0.6-0.1-0.1-0.7-0.3-0.1-0.7-0.1-0.1-0.3 0-0.5 0.2-0.2-0.1-0.2-0.2-0.1-0.3-1.1-0.3-0.1-0.7 0.5-1.7 0-0.5 0.1-0.3 0.2-0.3 0.2-0.2 0.4-0.1 0.4 0 0.8 0.1 0.6 0 0.5-0.2 0.5-0.4 0.3-0.3 0.3-0.3 0.2-0.3 0.2-0.2 0.1-0.3-0.1-0.4 0-0.7 0.2-1.1 0.1-0.3 0.5-0.9 1.5-1.7 0.2 0.1 0.2 0.3 0.2 0.2 0.5 0.1 0.5 0 0.3-0.1 0.2-0.3 0-0.5 0.2-0.4 0.4 0 0.5 0.2 0.3 0.1 0.8 0.6 0.5 0.2 0.6 0.4 0.2 0 0.5 0 3.8 0.4 1.9-0.3 1.2-1.3 0.8 0.7 4.2 0.6 3.8 1.2 0.9 0.2 1-0.1 2.8-0.4 0.5-0.1 0.3-0.2 0-0.2 0.4-0.4 0.2-0.1 0.2 0.1 0.1 0.2 0 0.2 0.1 0.2 0.3 0.2 1 0.5 0.8 0.2 0.9 0.7 0.4 0.2 0.6 0.1 0.4-0.2 0.3-0.2 0.4-0.1 0.5 0 0.4-0.1 0.3-0.2 0.9-1 0.9-1.3 1.6-3.2 0.3-1 0.1-0.8 0-0.9 0.1-0.4 0.2-0.3 0.1-0.2-0.2-0.5 0.4-0.1 0.2-0.2 0.4-0.5 0.3-0.1 1.1-0.5 0.6-0.1 0.5-0.2 0.2-0.1 1.3-0.2 0.5-0.1 0.2 0.1 0.6 0.4 0.2 0.1 0.5 0 0.2 0 0.2-0.2 0.1 0.1 0.2 0.2 0.3 0.2 0.2 0.2 0.2 0.3 0.1 0.9 0.4 0.8 0.8 2.3 0.4 0.7 0.2 0.2 0.2 0 4.1 0.4 0.5 0 0.9-0.2 0.4-0.1 0.4-0.2 0.7-1 0.3-0.4 0.6 0.4 1.2 0.2 0.8 0.3 0.2 0.2 0.7 0.9 0.4 0.4z m-26.5-18.8l-0.3 0.2-0.1-0.2-0.1-0.3-0.1-0.2-0.1-0.1 0.3-0.2 0.6-0.1 0.1 0.2 0 0.3-0.3 0.4z",    IDN1229: "M214.5 256l-0.2 0.2-0.4-0.1-0.6-0.6-0.3-0.3-0.1-0.2 0-0.2 0.1-0.3 0.2 0 0.5 0.3 0.5 0.1 0.3 0.3 0.1 0.2-0.1 0.6z m21.3-36l-0.3 1.8 0 0.7 0.1 0.6 0.3 0.5 0.3 0.6 0.3 0.7-0.1 0.5 0.3 0.1 0.2 0.3 0.4 0.7 0.1-0.1 0.1 0.4-0.1 0.9 0.2 0.8-0.2 0.4-0.2 0.4-0.1 0.4 0.1 0.3 0.3 1.2-0.3 0.1-0.2 0.4-0.3 1.9 0 0.9 0.1 0.5 0.8 1.4 0 0.7-0.3 0.7-0.4 0.7-0.2 0.7-0.1 1.9 0.1 1.9-0.1 0.9-0.5 1.8-0.2 1 0.2 1.9-0.1 0.5-0.3 0.8 0.2 1.4 0 0.9 0 0.4-0.4 0.9-0.2 0.5-0.2 1.7-0.3 0.7-0.4 0.6-0.6 0.8-0.1 0.1-0.2-0.2 0-0.8-0.2-0.4-0.7-0.3-1.7-0.2-0.3-0.4-0.1-1.7-0.3-0.7-0.5-0.5-0.3 0.4-0.1 0.1-0.3-0.1-0.3-0.2-0.4-0.2-0.7-0.8-1.1-0.9-0.5-0.5-1.4-2-0.7-0.5-0.6 0.4-0.1 0.4 0.2 0.8-0.2 0.5 0 0.1-0.2 0.6-0.1 0.1-0.3 0-0.4-0.1-0.4 0.2 0 0.4 0.2 0.4 0.1 0.5 0 0.6 0.1 0.3 0.3 0.3 0 0.1-0.3 0.2-0.5 0.2-0.5 0.2 0.1 0.4 0.4 0.1 0.5 0.1 0.3 0.1-0.3 0.3-0.4 0.2-0.4 0.1-0.7 0-0.3-0.1-1-0.8-3.7-1.6-1.4-1.1-1-0.3-0.5-0.3-1.3-1.5-0.2-0.2-0.4-0.2-0.8-0.2-0.4-0.2-0.3-0.2-0.1 0 0.1 0.4-0.5 0-0.4 0.1-0.4 0.1-0.4 0.4-0.1 0.3 0.1 0.5 3.4 5.4 0.2 0.8 0.1 0.9 0.2 0.5 0.1 0.2-0.1 0.2-0.3 0-3 0-0.2-0.2 0.2-0.8-0.1-0.5-0.3-0.4-1.2-1-0.2-0.1-0.3-0.2-0.1-0.2-0.2-0.4-1.4-1.3-0.4-0.2-1.5-0.9-0.2-0.4 0.6-0.5-0.3-0.4-1-1-0.4-0.3-0.7-0.1-0.2-0.2-0.1-0.1-0.2-0.3-0.1-0.2-0.7-0.2-0.4-0.3-0.4-0.3-1.5-2-1-0.9-0.1-0.4 0.2-0.4 0.1-0.3-0.3-0.4-0.3-0.3-0.3-0.1-0.4-0.1-0.5 0-0.4-0.1-0.2-0.4 0.1-0.2 0.3-0.4 0.1-0.3 0-0.4-0.2-0.4-0.3-0.4-1.3-0.8-0.5-0.5-0.4-0.3-0.4-0.1-0.5 0-0.3 0-0.2-0.2 0-0.2 0.2-0.6-0.1-0.2-0.6-0.3-0.3-0.1-0.2 0.1-0.2 0.1-0.4 0.4-0.5-1-0.3-0.3-0.2-0.1 0.4-0.2 0.3-0.1 0.8-0.5 0.6-0.4 0.7-0.5 0.6-0.7 1.3 0.7 0.3 0.1 0.2 0.1 0.2 0.2 0 0.1 0 0.3 0 0.4 0.1 0.4 0.1 0.3 0.2 0.1 0.3 0.1 0.9 0 1.2 0.2 0.8 0 0.7 0.1 0.6 0 1.6-0.4 1.2-0.8 0.8 0 0.7 0.1 0.4-0.1 0.5-0.5 0.3-0.6 0.1-0.5-0.1-0.1-0.4-0.4-0.1-0.2-0.4-0.3-0.1-0.4-0.1-0.6 0-0.1-0.3-0.1-0.1-0.2 0-0.2 0-0.2 0.1-0.4 0-0.1 0.4-0.2 0.3-0.3 0.1-0.4 0.1-0.3-0.1-0.4-0.2-1.5-0.1-0.7 0.1-0.6 0.2-0.6 2-0.7 0.2-0.3 0.7-0.6 0.5-0.4 1.4-0.6 0.5-0.1 1.1 0 1.6-0.4 3.6-1.6 0.9-0.3 0.9-0.3 1.1-0.2 0.7-0.4 0.2-0.2 0.3-0.2 0.3-0.3 0.2-0.2 0.1-0.3 0.1-0.3 0.2-0.3 0.2-0.2 0.7-0.3 0.1-0.2 0-0.1-0.2-0.2-0.1-0.3 0.1-0.1 0.3-0.5 0.1-0.2 0-0.7 0.2-0.2 0.1-0.1 0.4-0.2 0.2-0.1 0.3-0.4 0.2-0.1 0.2 0 0.3 0.1 0.3 0 0.3-0.1 0.2-0.1 0.3-0.3 0.1-0.2 0.3-0.7 0-0.2 0-0.4 0.1-0.2 0.2-0.1 0.1-0.3 0-0.2 0.1-0.4 0.1-0.2 0.1 0 0.1 0 0.2 0.2 0.2 0.5 0.2 0.2 0.2 0.1 0.2 0 0.3-0.1 0.2 0 0.3 0 0.2 0.2 0.4 0.6 0.2 0.2 0.7 0.1 0.7 0.3 0.2 0.2 0.1 0.3 0.1 0.4 0.2 0.2 0.2 0 0.2 0.1 0.3 0.4 0.2 0.3 0.2 0.2 0.2 0.3 0.1 0.3 0.2 0.4 0.1 0.2 0 0.2 0 0.2-0.2 0.4 0 0.1 0.1 0.1 0.4 0 0.2 0 0.1 0.1 0.2 0.2 0 0.6 0.2 0.1 0.4 0 0.2 0.2 0.2 0.2 0.2 0.4 0.1 0.2 0.9 0 0.4-0.2 0.5-0.1 0.8 0.5z",    IDN1228: "M299.5 166.9l-0.8 0.1-1-0.2 0.3-0.3 0.7-0.1 0.7 0 0.5 0.2-0.4 0.3z m4.4-3.1l0.1 0.3-0.1 0.4-0.1 0.3-0.2 0.2-0.4 0.2-1.3 0.5-0.3 0.1-0.6-0.1-0.1-0.4 0-0.2 0-0.2 0.1-0.2 0.1-0.2-0.1-0.2-0.1-0.2-0.1-0.1-0.4 0-0.2-0.1 0.3-0.3 0.5-0.2 1-0.2 0.2-0.1 0.2-0.2 0.1 0 0.4 0.1 0.2 0.2 0.6 0.4 0.2 0.2z m4.6-6.4l-0.7 0.7-0.1 0-0.1-0.3-0.1 0-0.3 0.1-0.2 0-0.1 0 0-0.2 0.1-0.2 0.2-0.1 0.4 0 0.2-0.1 0.4-0.4 0.2 0 0.2 0.2-0.1 0.3z m1.3-1.2l-0.3 0.1-0.1-0.2 0.1-0.5 0.1-0.1 0.4-0.4 0.2-0.1 0.2 0.1 0.1 0.3-0.2 0.3-0.1 0.2-0.4 0.3z m8.1-5.4l0.7 0.4 0.4 0.2 0.3 0 0.3-0.1 0.2-0.2 0.2-0.1 0.4 0 0.3 0.3 0.3 0.3 0.2 0.4 0 1.6 0.1 0.1 0.3 0.3 0 0.2 0 0.2-0.2 0.1-0.5 0.2-1 0.8-0.3 0.1-0.3 0.1-1.5 0.6-0.7 0.4-0.8 0.3-0.7 0.7-0.5 0.1-0.3-0.1-0.4-0.3-0.5-0.3-0.1-0.2 0-0.5 0.5-1.4 0.2-3.6 0.2-0.4 0.3-0.2 0.4 0.1 0.7 0.2 0.4 0 0.3 0 0.4-0.4 0.3 0 0.4 0.1z m99.9-52.5l-0.1 0.4-0.3 1.7 0 0.3 0 0.4 0.3 0.4 0.1 0.3 0 0.4-0.1 0.5-0.1 0.3-0.2 0.2-0.4 0.3-0.6 0.5-0.5 0.2-0.2 0.2-2.1 1.8-0.2 0.1-0.6 0.3-0.7 0.5-1 0.5-0.3 0.2-0.4 0.4-0.1 0.2 0 0.3 0 0.4-0.1 0.5 0 0.2 0.1 0.2 0.2 0.1 0.2 0 0.5-0.1 0.2-0.1 0.2 0 0.2 0.1 0.2 0.2 0.1 0.3 0 0.4-0.1 0.4-0.2 0.5-0.1 0.4-0.1 0.4 0 0.5-0.1 0.5-0.2 0.4-0.8 0.8-0.5 0.8-0.2 0.2-0.5 0.2-0.2 0.1-0.3 0.4-0.1 0.2-0.3 0.8-0.5 0.3-0.4 0.5-0.5 0.3-0.2 0.2-0.3 0.8-0.3 0.4-0.3 0.3-0.3 0.4-0.2 0.3-0.1 0.4 0.1 0.7-0.2 0.5-0.1 0.2-0.3 0.1-0.2 0.1-0.3 0.1-0.7 0.6-0.3 0.2-0.2 0-0.5 0-0.4 0-0.3 0-0.7-0.3-0.2 0-0.4 0-0.4 0.2-0.9 0.2-0.7 0.3 0.6 0.8 0.3 0.8 0.3 0.2 0.8 0.6 0.3 0.4 0.5 1.1 0.1 0.3 0 0.6 0.4 1.5 0.1 0.4 0 0.2-0.1 0.1-0.6 1.1-0.4 0.8 0 0.5-0.1 0.2-0.2 0.1-0.3 0.1-0.2 0.1-0.2 0.3-0.3 0.2-0.3 0.1-0.4 0.1-0.3 0.2-1.2 1.2-0.4 0.7 0 0.1 0 0.3 0 0.2 0.1 0.2 0.4 0.1 0.2 0.2 0.1 0.2 0.3 0.5 0 0.3 0 0.2-0.4 0.9-0.4 1.2-0.2 0.2-0.4 0-0.2-0.1-0.3-0.2-0.4-0.4-0.4-0.8-0.2-0.2-0.2-0.1-0.1 0-0.2 0.1-0.5 0.2-0.3 0.1-0.1 0.1-0.3 0.4-0.1 0.2-0.6 0.1-0.2-0.1-0.5-0.1-0.5 0.1-1.1 0.5-0.6 0.4-0.7 0.3-2.2 0.8-0.8 0.5-3.8 1.5-0.3 0.1-0.3 0-0.6-0.2-0.3 0-0.3 0.1-0.5 0.3-2 0.8-0.3 0-0.3 0-0.5-0.1-0.3-0.1-0.6 0-1.1-0.2-2.6 0-0.3 0-0.2 0.1-0.1 0.2-0.1 0.5-0.6 0.5-1.9 0.6-2.4 1.5-0.9 0.5-0.3 0.1-1.2 0.6-2.1 1.5-0.5 0.4-0.7 0.9-0.1 0.2-0.1 0.3 0 0.3 0.2 0.6 0 0.4-0.2 0.3-0.2 0.3-0.8 0.4-1.1 0.4-0.4 0.4-1.2 0.6-0.6 0.4-0.4 0.4-0.2 0.1-0.3 0.4-0.5 0.9-0.7 0.5-0.5 0.2-0.6 0.4-0.5 0.4-0.7 0.9-0.4 0.3-0.8 0.7-0.3 0.2-0.2 0-0.3-0.2-0.2-0.1-0.5 0-0.2-0.1-0.4 0-0.5 0.2-0.8 0.5-0.4 0.3-0.5 0.6-0.3 0.4 0 0.2 0 0.2 0.2 0.3 0.2 0.3 0.2 0.2 0.3 0 0.4-0.1 0.2-0.2 0.3 0 0.2 0 0.1 0.2 0.1 0.2 0 0.3-0.2 0.6 0 0.1 0.3 0.3 0.2 0.3 0 0.3-0.2 0.8 0 0.4 0 0.4 0 0.8-0.7 2.5 0 0.4 0 1.5 0.2 0.6 0.2 0.6 2.7 6.1 0.1 0.4-0.2 0.8-0.1 0.5 0 2 0.1 0.7 0.1 0.3 0.1 0.3 0.2 0.2 0.2 0.5 0 0.3 0 0.3-0.1 0.3-0.2 0.3-0.2 0.2-0.3 0.2-1.2 0.5-0.3 0.2-0.3 0.4-0.3 0.9-0.3 0.5-0.2 0.2-0.1 0.1-0.9 0.3 0-0.1-0.5 0.1-0.8 0.5-0.4 0.2-1.1 0.4-0.4 0-0.4 0.2-0.3 0.3-1.7 2.3-0.8 0.4-0.7-0.6-0.1-0.3 0.3-0.1 0.1-0.2 0-0.2-0.2-0.5 0-0.5-0.1-0.5-0.3-0.9-0.6-0.7-0.9-0.2-0.9 0.2-2.2 1-2.3 1.7-0.8 0.1-0.5-0.7-0.3-0.9-0.4-0.8 0.3-0.4 0.4-0.6 0.2-0.7-0.1-0.7-0.4-0.9 0-0.9-0.2-0.7-0.1-0.4-0.2-0.2-0.8-0.2-0.2-0.2 0.1-0.2 0.4-0.5 0.1-0.3 0.3-0.5 0.7 0.1 0.8 0 0.3-0.9-0.7 0.5-0.6-0.2-0.4-0.5-0.9-1.6-0.1-0.3 0-1-0.3-1.8-0.2-0.5-0.3-0.2-0.3-0.2-0.2-0.3 0-0.5 0-0.4 0.2-0.9 0.3-0.9 0.2-0.9-0.1-1-0.6-1.4-0.1-0.2-0.4-0.6-0.2-0.1-0.7-0.2-1-0.6-0.4 0-0.3-0.2-1.1-1 0.5-0.3-0.2-0.1-0.1-0.2-0.1-0.2 0.1-0.2 0.2-0.3 1-0.5 0.3-0.1 0.3-0.2 0.2-0.4 0.6-1.4 0.1-0.4 0.1-1.5 0.6-2.8 0.1-0.9-0.3-1-0.3-0.9-0.4-0.4-0.4-0.1-0.4-0.1-0.6-0.2-0.3-0.3 0.1-0.5-0.5-0.1-0.2-0.5 0.1-0.6 0.2-1 0-0.3-0.3-0.2-0.5-0.1-0.1 0-0.5-0.3-0.3 0-0.5 0-0.2-0.2-0.3-0.7-0.5-0.3-0.3-0.3-0.3-0.6-0.4-0.5-0.2-0.3 0-0.4 0.1-0.4 0.1-0.2 0.2-0.2 0.2-0.2 0.1-0.3 0-0.1-0.6 0.2-0.3 0.2-0.1 0.3 0 0.5-0.1 0.5-0.2 0.3-0.6 0.5-0.6-0.4-0.4-0.3-0.2 0-0.4 0.1-0.1-0.2-0.4-1.2-0.4-0.3-0.8-0.4-0.8-0.2-1.1-0.1-0.2 0-0.2 0.1-0.1 0.2 0 0.1 0.1 0.2 0.1 0.2-0.1 0.4-0.3 0.2-0.3 0-0.3-0.1-0.9-0.4-0.2-0.1-0.1 0-0.8-0.4-0.3-0.3-0.6-3.4 0.1-0.4 0.3-0.2 0.3 0 0.5 0.4 0.3 0.2 1.5 0 0.3 0.2 0.7 0.5 0.6 0.1 0.3 0.1 0.2 0 0.5-0.1 0.2-0.1-0.1-0.2-0.2-0.1-0.6 0.1-0.2-0.1-0.4-0.6-0.2-0.2-0.4-0.3-0.5-0.2-0.3 0-0.3 0-0.2-0.1 0-0.2 0.3-0.1-0.3-0.3 0-0.2 0.4 0 0.7 0.2 0.4 0 0-0.2-0.5-0.3-0.6-0.2-0.6-0.1-1.5 0-0.3 0.2-0.3-0.2-0.3-0.2-0.2-0.4-0.3-0.1-0.5 0-0.2 0.1-0.2 0-0.2-0.2-0.5-0.4-0.2-0.3-0.1-0.3-0.5-2 0-0.9 0-0.2 0.2 0 0.5 0-0.7-1-0.2-0.6 0.2-0.5 0-0.1-0.3-0.1-0.2-0.1-0.2 0.1 0 0.4-0.4-0.2-0.1-0.4 0.1-0.3 0.2-0.3 0.2-0.1 0.4-0.1 0.7-0.1 0.6 0.1 0.6 0.1 0.6 0.2 0.3 0.4 0.2 0-0.2-0.4-0.4-0.4-0.2-0.3 0-0.2 0-0.9 0-1.2-0.2-0.6-0.4-0.7-0.1-0.3 0-0.6 0.1-0.3 0.2 0 0.6 0.2 2.2 0.3-0.4-0.4-1-0.6-1.3-1.1-0.2-0.1-1.4-2.9-1.2-0.9-0.3-0.2-0.4 0-1.3-0.2-0.6-0.2-0.1-0.6 0.2-0.8 0.2-0.7 0.1-0.3 0-0.5-0.1-0.4-0.6-0.9-0.1-0.5 0.1-0.3 0.3-0.4 0.1-0.3 0-0.9-0.1-0.5-0.2-0.5-0.9-1.1 0-0.2 0.2-0.2 0.1-0.5-0.2-0.5-0.5-0.7 0-0.5 0.1-0.2 0.3-0.3 0.4-0.3 0.3-0.1 0.4 0 0.3-0.2 0.3-0.3 0.2-0.4 0.4-0.9 0-0.8-1.2-3.2 0-0.5 0.1-0.3 0.5-0.1 0.8-0.1 0.9-0.2 1.6-0.7 0.8-0.5 0.3-0.3 1.3-1.5 0.2-0.5 0.4-0.5 0.5-0.3 0-0.1-0.6-0.1-0.3 0.3-0.2 0.5-0.3 0.2-0.3 0.2-0.5 1-0.3 0.2-0.1 0.2-0.1 0.2-0.1 0.3-0.3 0.1-0.2 0.1-0.2 0.1-0.4 0.2-0.5 0.2-1.1 0.1-0.6 0.2 0.1-0.7 0.3-0.6 0.8-0.9 0.3-0.8 0.1-0.7 0-2.5 0.3-0.7 0.5-0.6 3.4-2.3 0.4-0.6 0.7-1.3 0.4-0.5 0.4-0.5 0.1-0.2 0-0.2-0.2 0 0 0.1-1.1 0.8 0.1-0.4 0.2-0.3 0.3-0.2 0.3-0.3 0.2-0.4 0-0.4 0-0.7 0.1-0.7 0.4-0.3 1.4-0.2 3-0.7 0.4-0.2 0.3-0.2 0.2-0.3 0.7-1.2 0.2-0.2-0.4 1.2-0.6 1-0.3 0.5-0.2 0.3-0.8 0.6-0.2 0.3 0 0.3 0.1 0.8 0 0.4 0.1 0.2 0.2 0.3 0.2 0.3 0.2 0.2 0.3 0.1 0.9 0 0.4 0.1 0.1 0.4-0.1 1.7 0 1 0.1 0.5 0.3 0.4 0.4 0.5 1.9 1.7 0.2 0.2 0 0.6 0.2 0.1 0.4-0.3 0.1 0.2 0.4 0.9 0.4 0.3 0.4 0.1 0.5-0.1 0.4 0 0.4 0.2 0.2 0.4 0.5 1.2 0.2 0.5 0.3 0.2 0.8 0.4 0.4 0.4 0.4 0.8 0.5 0.4 0.4 0.1 1.3 0.2 0.4 0.2 0.3 0.4 0.5 1 1.1 1.5 0.1 0.6 0 0.4 0.2 0.1 0.3-0.1 0.3-0.1 1.1 0.3 0.3 0.1 0.4 0.3 0.9 1.2 0.8 0.7 1 0.5 1 0.1 0.9-0.4 0.4-0.5 0.3 0 0.1 0.1 0.2 0.2 0.2 0.1 0.3 0.1 0.3-0.1 0.4-0.4 0.2-0.2 0.1 0 0.3 0.1 0.5-0.2 0.3-0.2 0.3 0.3 0.1 0 0.1-0.1 0.1-0.2 0-0.4 0.2-0.3 1.2-1.1 0.6-0.2 0.7-0.2 1.3 0 4.9-1.3 0.4 0.1 3 1.3 0.4 0.1 0.5 0 0.4 0 0.9-0.3 0.4 0 0.2 0.2 0.1 0.3 0.1 0.4 0.2 0.5 0.3-0.1 0.5-0.8 1.8-0.7 0.4 0 0.3 0 0.6 0.2 1.2 0.4 0.6 0.2 1.3-0.3 1.9-2.3 1.4-0.4 1.7 0 0.6-0.1 0.2-0.1 0.2-0.3 1.1-3.3 0.7-1.3 0.1-0.3 0-0.2-0.1-0.2-0.5 0-0.1-0.2 0.1-0.6 0.4-0.3 2.5-1.2 0.6-0.1 1.3-0.2 0.4-0.1 0.4-0.3 0.3-0.3 0.3-0.2 0.5-0.2 6.5 0.4 0.6 0.2 0.1 0 0.3-0.2 0.3-0.3 0.2-0.2 0.4-0.2 0.4 0.1 0.3 0.1 0.4 0.1 1.1-0.1 0.4 0.1 0.5 0.2 0.4 0.2 0.2 0.3 0 0.5-0.2 0.5-0.2 0.4-0.3 0.4-0.7 0.4-0.1 0.3 0 0.1 0.4 0.1 0.8-0.3 0.8-0.2 0.9 0.1 0.8 0.4 0.7 0.5 0.3 0.1 1 0.1 1.2 0.3 1.1 0.3 1.6 1.3 1 0 0.8-0.3 0.5-0.2 0.4 0.1 0.5 0.2 1.1 1.3 0.6 0.3 0.5-0.1 3.5-2.3 1.3-1.6 0.5-0.5 0.4-0.1 3.1-0.5 0.9 0 0.8 0.2 0.2 0.2 0.2 0.2 0.2 0.3 0.3 0 0.2 0 0.6-0.4z",    IDN540: "M344.7 308.3l-2.8-0.1-0.2-0.1-0.3-0.3-0.2-0.1-0.4 0-0.5-0.2-0.8-0.4 0 0.2-1.2-0.6-0.6-0.1-0.5-0.1-0.4-0.1-1.5-0.8-0.4 0-0.2-0.1-0.1-0.1-0.5-0.5-0.1-0.1-0.5-0.4-0.2-0.1-0.7 0-5.3-2.8 0.1-0.5 0.1-0.2 0.3-0.4 1.1-1.7 0.2-0.4 0.1-0.4 0-0.6 0-0.2 0.2-0.2 0.5-0.3 1.3 0.2 0.2 0 0.2-0.1 0.1 0.1 0.1 0.1 0.1 0.5 0.1 0.3 0.2-0.2 0.4-0.5 0.3-0.3 2.4-1.8 0.6-0.6 0.1 0.2 0.7 3.3 0.4 0.8 0.3 0.6 0.7 0.6 0.9 0.2 1.2 0 0.4 0.1 0.8-0.1 0.3 0.1 1.1 0.2 0.4 0.2 0.2 0.2 0.1 0.5 0 1 0.1 0.6 0.1 3.8 0.1 0.2 0.2 0.2 0.2 0 0.1-0.1 0.3 0 0.1 1.4z",    IDN1796: "M208 138.2l1 1.1 0.1 0.4-0.1 0.4-0.4 0.4-0.9 0.6-0.1 0.4-0.1 1.1-0.3 0.3-0.7 0-0.7-0.5-0.5-0.3-0.6 0.8-0.2 0.9-0.2 0.1-0.4 0.1-0.3-1.8-0.2-0.8-0.2-0.3-0.3 0.1-1.2-1.3-0.1-0.3 0.2-0.3 0.3-0.7 0.2-0.3 0.6-0.5 0.3-0.3 0.2-0.4 0.1 0 0.1 0.4-0.2 0.9 0.1 0.5 0.1 0 0.1-0.4 0.1-0.5 0.1 0 0.5 0.3 0.8-0.4 1.1-1.1 0.5 0.4 0.1 0.1 0.5 0.2 0.3 0.2 0.2 0.4 0.1 0.1z m-1.2-1.9l-0.5 0.1-0.3 0.1-0.2 0.1-0.6-0.1-0.2-0.1-0.2-0.3 0.1-0.3 0.4-0.2 1.3-0.1 0.1 0.1 0.2 0.1 0 0.2 0 0.2-0.1 0.2z m2.1-6.9l0.7 0.3 1.2 1.1 0.1 0.2-0.7 0.2 0 0.2 0.1 0.1 0.3 0.3 0.2-0.1 0.2-0.2 0.2 0 0.3 0.2 0.6 0.7 0.4 0.9 0.3 0.4 0.4 0.2 0.6-0.1 0.1-0.2 0-0.3 0.2-0.5 0.5-0.2 0.6 0.6 1.1 1.6 1.8 0.9-0.2 0.3-0.4-0.1-0.6-0.2-0.5-0.1-0.4 0.2 0.1 0.3 0.2 0.3 0.1 0.4-1.1-0.5-0.4-0.1-0.3-0.1-0.4-0.4-1.2-0.5-0.3-0.3-0.3-0.4-0.3-0.2-0.5-0.2-0.9 0.1-0.3 0.1-0.4 0.2-0.5 0.3-0.2 0.1-0.1 0-0.4-0.1-0.4 0.3-0.3 0.3-0.2 0.1-0.3 0-0.1-0.1-0.1-0.4-0.3-0.3-0.2-0.1-0.3-0.1-0.5 0-0.3-0.1-0.1-0.1-0.1-0.3 0-0.2 0-0.3 0.1-0.1 0.3-0.1 0.9-0.8 0.3-0.4 0.2-0.6 0.1-1.7 0.3-0.7 0.5 0.4 0.1-0.4 0.5 0.3z m-3.2-3l1.1 1.4 0.1 0.3-0.4 0.1-0.2 0 0.3 0.4 0 0.2 0 0.3-0.1 0-0.4-0.5-1-1-0.3-0.6 0.2 0 0.2 0.2 0.1 0-0.3-0.9 0-0.2 0-0.2 0.1-0.1 0.2 0 0.1 0.2 0.3 0.4z m1.6-1.9l0.4 0.3 0.1-0.2 0.2 0.1 3.1 3.4 0.4 0.6-0.1 0.2-0.4-0.1-0.5-0.3-0.5-0.4-0.1-0.2-0.2-0.5-0.1-0.1-0.3 0.3-0.2-0.2-0.4-0.5-0.2-0.3-0.1-0.1 0-0.3-0.1-0.1-0.3 0-0.3-0.2-0.1-0.1-0.1-0.4-0.5-0.6-0.1-0.2-0.1-0.3 0.2 0.1 0.3 0.1z m-2.2-1.3l-0.2 0.1-0.2-0.2-0.1-0.4-0.2-0.1-0.2 0-0.5-0.8-0.2-0.1 0.3-0.2 0.1 0.1 0.4 0.3 0.6 0.3 0.3 0.3 0.1 0.2 0 0.2-0.2 0.3z m-19.9-7.2l-0.2 0.1-0.3 0-0.1-0.3 0.1-0.4 0.3-0.3 0.3-0.6 0.1-0.1 0.3 0 0.1 0.2-0.1 0.3 0 0.2-0.3 0.6-0.2 0.3z m17.2-0.5l-0.2 0.5-0.3-0.1-0.1-0.3-0.2-0.5-0.6-0.6-0.2-0.3 0.6 0.3 0.6 0.4 0.4 0.6z m10-1.6l-0.2 0.1-0.2-0.1-0.2-0.3 0.1-0.3 0.3 0 0.3 0.3-0.1 0.3z m-2.8-1.2l-0.1 0.3-0.3 0-0.6-0.1-0.4 0-0.3 0.1-0.7 0.3 0-0.5 0.3-0.3 0.4-0.2 0.5 0 0.9 0.1 0.3 0.1 0 0.2z m-7.4-0.2l0 0.5 0 0.4 0.1 0.3 0.3 0.5-0.3 0-0.2 0.1-0.2 0-0.2 0-0.4-0.3-0.5-0.1-0.2-0.1-0.3-0.4-0.1-0.4 0.2-0.3 0.4-0.3 0.4 0.1 0.3 0 0.2-0.2 0.2-0.1 0.2 0.1 0.1 0.2z m-12 0.5l-0.3 0-0.3 0-0.1-0.2-0.1-0.4-0.5-0.7 0-0.3 0.8 0.5 0.3 0.4 0.2 0.4 0 0.3z m19.9-0.9l-0.3 0-0.1-0.1 0.1-0.1 0.1-0.3 0.1-0.4 0.2-0.2 0.3 0.2 0 0.4 0 0.2-0.2 0.2-0.2 0.1z m-24.3 0.2l0 0.4-0.7-0.9-0.3-0.3-0.8-0.2-0.3-0.3-0.1-0.4 0.2 0.2 1.2 0.4 0.4 0.3 0.3 0.3 0.1 0.3 0 0.2z m9.1 0.5l-0.2 0.1-0.3-0.1-0.2-0.2-0.3-0.6-0.2-0.2-0.8-0.3-0.2-0.4-0.5-0.6 0-0.1 1 0.2 0.7 0.5 0.6 0.6 0.4 0.7 0 0.4z m-10.5 2.5l-0.5 0.2-0.5-0.2-0.2-0.4-0.2-0.5-0.2-0.2-0.9-1.2-0.1-0.4 0-0.5 0-0.3 0.2-0.4 0.2-0.7 0.3-0.3 0.3-0.1 0.3 0.2 0.2 0.3 0.2 0.4 0.2 0.3 0.7 0.3 0.2 0.3 0.4 0.6 0.3 0.3 0.1 0.2 0.1 0.3-0.6 1.2-0.5 0.6z m8.2-2.4l-0.1 0.1-0.3-0.1-0.4-0.3-0.8-0.5-0.4-0.4-0.3-0.5-0.1-0.6 0.4-0.4 0.1 0.1 0.4 0.1 0.2 0.1 0.5 0.6 0.4 0.2 0.3 0.6 0.1 0.6 0 0.4z m-7.8-2.4l-0.2 0.2-0.2 0-0.3-0.1-0.3-0.1-0.1-0.2-0.1-0.2-0.3-0.2 0-0.1 1-0.2 0.2 0 0.2 0.3 0.1 0.3 0 0.3z m15.1-0.1l0.2 0.1 0.9 0 0.4 0.1 0.3 0.1 0.2 0.3-0.2 0.4-0.1 0.2-0.3 0.1-1.1 0.5-0.2 0.1-0.2-0.2-0.2-0.3-0.1-0.6-0.2-0.3-0.3-0.1-0.5-0.2-0.4-0.1 0.2-0.3-0.1-0.9 0.1-0.3 0.3-0.1 0.3 0.2 0.7 0.7 0.1 0.2 0 0.2 0.2 0.2z m-5.7-2.6l0.7 0.2 0.2 0.1 0.2 0.3 0.1 0.3 0 0.3-0.2 0.2-0.2 0.1-0.3 0-0.3 0-0.2-0.1-1.2-0.6-0.2-0.2-0.1-0.3-0.1-0.3 0.2-0.2 0.2 0 0.4 0.2 0-0.2 0.1-0.4 0.3 0.4 0.4 0.2z m20.2 1l-0.2 0.1-0.1-0.3 0-0.2 0-0.4-0.1-0.1-0.7-0.5 0.2-0.2 0.2 0.1 0.5 0.1 0.2 0.1 0 0.3 0.2 0.3 0.1 0.3-0.2 0.3-0.1 0.1z m59.9-1.1l-0.5 0.6-0.4 0.2-0.2-0.1 0-0.1 0.2-0.3 0-0.2-0.1-0.1-0.4 0-0.1-0.2 0-0.2 0.2-0.2 0.2 0 0.3 0 0.5 0.2 0.3 0.2 0 0.2z m-90.3-0.1l0.1 0.3-0.2 0.2-0.3 0-0.3-0.1-0.6-0.3-0.5 0.1-0.4-0.3-0.5-1 0-0.2 0.1-0.4 0.3-0.4 0.2-0.2 0.5-0.3 0.2 0 0.3 0 0 0.2 0 0.3-0.1 0.2 0.2 0.5 0.1 0.3 0.1 0.2 0.1 0.1 0.3 0 0.2 0.2 0 0.3 0.2 0.3z m15.4-2.8l0 0.5-0.4 1.5-0.2 0-0.4-0.3 0 0.3 0.2 0.3-0.2 0.1-0.3 0.5 0.1 0.3-0.2 0.1-0.3 0-0.5 0.1-0.4-0.1-0.8-0.4-0.1 0-0.5 0-0.2 0-0.1-0.1-0.7-0.8-0.3-0.5-0.1-0.4 0.3-0.2 0.2 0.1 0.3 0.4 0.2 0 0.2-0.2 0-0.2-0.1-0.2-0.2-0.7 0.3-0.1 0.2 0 0.5 0.2 0.1 0 0.4-0.3 0.2-0.7 0.2-0.2 0.2 0.1 0.7 0.8 0.3 0.3 0.1-0.3 0-0.3-0.1-0.2-0.2-0.3 0.3-0.1 0.3 0 0.2 0 0.3 0.1 0.2 0.2 0.2 0.3 0.1 0.4z m9.6-1.2l-0.1 0.8 0 0.3 0.2 0.4 1.1 0.5 0.1 0.2 0.1 0.3 0.2 1.1-0.3 0.5-0.1 0.2 0.1 0.5 0.1 0.6 0.1 0.2-0.1 0.2-0.2 0.3-0.2 0-0.3 0.1-0.2 0.1 0 0.2-0.1 0.3-0.2 1.1-0.8 0.1-1.8-0.7 0.2-0.3-0.2-0.4-0.3-0.3-0.4-0.2 0-0.1 0.5 0 0.3 0 0.1-0.2-0.1-0.2-0.3 0-0.5 0-0.5-0.2-0.1-0.2 0-0.2 0.1-0.2 0.8-0.2-0.1-0.2 0-0.2 0.1-0.3 0.1 0 0.2-0.2 0.2-0.2-0.4-0.1-0.2-0.3-0.1-0.1-0.3 0-0.2 0.1-1 0.5-0.3 0.1-0.5 0.1-0.2 0-0.3 0.3-0.2 0.1-0.8 0-0.2 0-0.5-0.3-0.1-0.4 0-0.4-0.2-0.5 0-0.3 0.5-0.4 1.1-0.4 0.2-0.1 0.1-0.1 0.3-0.4 0-0.2 0.1-0.2 0-0.1 0.4-0.1 0.5 0.1 0.2 0 0.1-0.3 0.1-0.2 0.3 0 0.5 0.3 0.9 0.2 0.7 0 0.6-0.3 0.8-0.4-0.1-0.2 0.1-0.1 0.3 0.1 0.1 0.5z m96.9-29.1l0.9 0 0.3 0.1 0.1 0.2-0.1 0.1-0.3 0.3-0.4 0.2-0.6 0.2-0.5 0-0.3-0.3 0-0.3 0.2-0.2 0-0.1-0.4-0.2-0.1 0-0.2 0.1-0.2 0-0.3-0.1 0-0.2 0.1-0.2 0.2-0.1 0.3-0.1 0.3 0.1 0.2 0.1 0.5 0.3 0.3 0.1z m-61.1-4.4l-0.1 0.1-0.1-0.2-0.3-0.3-0.1-0.5-0.2-0.4-0.1-0.2 0.1-0.3 0.3 0 0.2 0.1 0.1 0.2 0.1 0.3 0.1 0.7 0 0.3 0 0.2z m56.5-2.4l0 0.1-0.3-0.1-0.3-0.2-0.3-0.3-0.4-0.2-0.2-0.2 0-0.1 0.5-0.3 0.4-0.3 0.3-0.3 0.1-0.3 0.1-0.2 0.1-0.3 0.3-0.7 0.5 0 0.4 0.5-0.3 0.6 0 0.3 0.2 0.8-0.1 0.3-0.1 0.1-0.5 0.2-0.1 0.1-0.1 0.1-0.2 0.4z m-23.3-2.8l-0.3 0-0.3-0.1 0.2-0.7 0.5-0.2 0.5 0 0.2 0.2 0.1 0.4 0 0.2-0.9 0.2z m-43.3 0l0.2 0 0.1-0.1 0.1-0.3 0.2 0 0.2 0 0.7 0.2 0.2 0.1-0.2 0.3-0.1 0 0-0.2-0.2 0-0.4 1.6-0.2 0.1-0.3-0.2-0.2 0.1-0.1 0.1-1 0.4 0.2 0.3 0.3 0 0.2 0.1 0.1 0.1-0.1 0.3-0.6 0.1-0.2 0-0.3-0.1-0.2-0.1-0.1-0.3 0-0.2-0.1-0.3 0.1-0.2 0.2-0.6 0.1-0.5 0.2-0.5 0.1-0.2-0.2-0.3-0.5-0.2-0.2-0.2 0.2-0.2 0-0.3 0-0.3-0.1-0.3 0.3-0.1 0.2 0.4 0.1 0.1 0.4 0.2 0.1 0.4-0.1 0.3 0.1 0.3 0.5 0.1 0.3 0.1z m10-5.4l0.5 0.2 0.4 0.4 0.2 0.4 0 2-0.2 0-0.4-0.6-0.4 0.2-0.2-0.2-0.1-0.2-0.4-0.1 0.1-0.1 0.1-0.5-0.3-1.1 0.1-0.4 0.3 0 0.3 0z m1.2-2l0 0.8 0 0.2-0.1 0.2-0.1-0.1-0.1-0.5 0-0.1-0.2 0-0.1 0.3 0.2 0.6 0.2 0.3-0.1 0.2-1-0.6 0.1-0.2 0-0.4 0.2-0.5 0.1-0.4 0.1-0.4 0.3-0.3 0.5-0.2 0.1 0.2-0.1 0.9z m43.7-16.7l1.3 1.5 0.6 0.4 0.1 0.1 0 0.4 0 0.5 0.1 0.3-0.2 0.3-0.3 0.2-0.3 0.2-0.1 0.4 0.3-0.1 0.1 0 0.4 0.4 0.2-0.2 0 0.2-0.4 1.1-0.1 0.3-0.9 1.2-0.2 0.3-0.1 0.4-0.1 0.6-0.1 0.2-0.4 0.2-0.3 0-0.7 0-0.3 0-0.4 0.1-0.6 0.4-0.2 0.1-0.2-0.1-0.7-0.5-0.8-0.3-0.3-0.1 0.5-0.7 0.2-0.5 0.2-0.1 0.3 0.1 0.4-0.2 0.1-0.3 0.1-0.3 0.2-0.1 0.4 0 0.2 0 0.3 0.1 0.3 0.3 0.6 0.7 0.3 0.2-0.1-0.3-0.3-1-0.1-0.1-0.3-0.4-0.2 0-0.6 0-0.6-0.1-1.7-0.6-0.7-0.1-0.2-0.1-0.2-0.2-0.1-0.3-0.4-0.7 0-0.5-0.1-0.2-0.3-0.2-0.1-0.1 0-0.2 0-0.5-0.1-0.2-0.3-0.2-0.1-0.1 0.1-0.2 0.2-0.3 0.6-0.6 0.2-0.2 0.4 0 0.2-0.1 0.1-0.1 0.3-0.4 0.3-0.1 1.7-1.7 0.2-0.5 0.3-0.4 0.4-0.3 0.3-0.2 0.3 0.3 0.2 0.4 0.1 1.2 0.1 0.6 0.3 0.4 0.7 0.6z m-6.8-13.2l-0.2 0.2-0.5-0.1-0.3 0-0.2-0.1 0-0.2 0.1-0.2 0.2-0.2 0.4-0.2 0.2-0.2 0.2-0.4 0.1-0.2 0.1-0.1 0.2-0.1 0.2 0.1-0.1 0.2-0.1 0.3-0.1 0.8-0.2 0.4z",    IDN1185: "M512.9 79.5l0.7 0.4 0.3 0.3-0.1 0.3-0.3-0.2-0.7-0.5-0.2 0 0.2 0.3 0.3 0.7 0.6 0.7 0.3 0.3 0.3 0.2 0 0.2-0.5-0.1-0.4-0.3-0.5-0.5-0.2-0.3-0.3-0.4-0.2-0.7 0-0.5 0.5-0.2 0.2 0.3z m-23-21.7l-0.1 0.3-0.1 0-0.4-0.1-0.7 0-0.2 0-0.2 0.1-0.2 0.2-0.2 0-0.4-0.2 0-0.3 0.1-0.4 0.3-0.3 0.4-0.2 0.4 0 0.4 0.1 0.7 0.3 0.2 0.2 0 0.3z m2.8 1.1l-0.2 0.2-0.3-0.1-0.1-0.4-0.1-0.4-1.2-0.6-0.3-0.4-0.3-0.5-0.2-0.5-0.1-0.6 0.3-0.5 0.5-0.2 1.3 0 0.3 0 0.4 0.1 0.3 0.1 0.2 0.3 0 0.3 0 0.5-0.1 0.5-0.3 0.5 0.1 1.3-0.2 0.4z m5.1-4.7l-0.1 0.3-0.3-0.1-1.1-0.7-0.1-0.4-0.8-0.6-0.1-0.4 0.1-0.6 0.4-0.2 0.5 0.1 0.5 0.3 0.3 0.3 0.3 0.5 0.3 0.4 0.1 0.5 0 0.2 0 0.4z m-8.4-0.7l0.2 0.1 0 0.2 0 0.2-0.4 0.5-0.9-0.2-1.8-0.7-1.9 0-0.3-0.1-0.4-0.1-0.3-0.2-0.2-0.2-0.2-0.2-0.1-0.3 0-0.3 0.2-0.2 0.4-0.4 0.3-0.1 0.2 0 0.2 0.1 0.4 0.3 0.3 0 1.8 0.2 0.4 0.2 0.5 0.7 0.4 0.1 0.2 0.1 0.5 0.2 0.5 0.1z m5.6-8.1l0.5 0.2 0.4 0.2 0.5 0.3 0.3 0.3 0.2 0.3-0.1 0.3-0.4 0-0.4-0.1-0.6-0.3-0.3-0.3-0.5-0.6-0.2-0.2 0.4-0.1 0.2 0z m-1.3-2.5l-0.9 0.1-0.9-0.7-0.6-1 0.4-1 0.7-0.7 0.3-0.2 0.3 0.2 0.6 0.6 0.9 0.5 0.2 0.2 0 0.6-0.2 0.6-0.8 0.8z m0-3.8l0.7 0.1 2.5 0 1.2 0 0.1 0.3 0.1 1 0.4 0.8-0.7 0.5-0.3 0.2-0.4 0-0.7-0.2-0.4-0.6-1.2-0.7-0.6-0.7-0.7-0.7z m-24.6 141.8l-0.1 0-2.2-0.7-1.6-0.3-5.1-0.3-0.6-0.2-1.9-0.1-0.4-0.1-0.6-0.3-0.3 0.1-0.2 0.1-0.4 0.4-0.3 0.1-0.4 0.2-0.2 0.1 0 0.3-0.1 0.2-0.3 0.1-0.5 0.2-0.1-0.1-0.1-0.1-0.3-0.5-0.2-1.4-0.6-1.6 0-0.4 0.1-1.6 0.3-0.9-0.2-0.3-0.2-0.1-0.7-0.1-0.4-0.2-0.3-0.3-0.2-0.6 0-0.5 0-0.3 0.1-0.3 0.1-0.4-0.1-2.6-1-2.3-0.1-0.5-0.1-0.5-0.1-0.2-0.4-0.4-0.2-0.3 0-0.3-0.1-0.7-0.2-0.3-0.2-0.2-0.4 0-1-0.1 0.8-1.1 0.5-0.5 0.3-0.2 0.2-0.2 0.6 0 0.3 0 0.3 0.1 0.3-0.1 0.3-0.3 0.4-0.6 1.1-2 0.1-0.5 0.1-1.1 0.1-0.3-0.3-2.6-0.4 0.1-0.3 0.1-0.3 0.2-0.2 0-0.2 0-0.3-0.4-0.2-0.3-0.5-0.4-0.1-0.2-0.2-0.4-0.1-0.3-0.4-0.4-0.3-0.2-0.3-0.2-0.5-0.1-0.7-0.3-0.7-0.2-0.3-0.1-0.2-0.1-1.1-0.9-0.1-0.3-0.1-0.3 0.1-0.2-0.1-0.4-0.1-0.3-0.7-0.9-0.1-0.3-0.5-2.6-0.1-0.8 0-0.4-0.2-0.4-1.1-1.5-0.4-0.8-0.2-0.8-0.1-0.4-0.1-1.1-0.1-0.4-0.3-0.8 0-0.4 0.1-1.6 0.1-0.8 0.2-0.4 0.6-1 0.1-0.5 0.3-1.5 0.1-0.4 0.1-0.2 0-0.2-0.2-0.2-0.7-0.1-0.7-0.2-0.2 0-0.3 0.1-0.5 0.1-0.3 0-0.6 0.4-1.7 2-0.2 0.3-0.3 0.4-0.2 0.1-0.6 0.3-0.2 0.1-0.8 0.8-0.3 0-0.2-0.3-0.1-0.2 0.1-0.3 0-0.3 0-0.2-0.2-0.3 0-0.2 0-0.2 0-0.4 0.4-1.1 0.7-1.7 0-0.2 0-0.3-0.1-0.3-0.1-0.3-0.2-0.4-0.5-0.8-0.1-0.2 0-0.2 0-0.6 0-0.3-0.1-0.2-0.2-0.5-0.1-0.3-0.1-0.3 0-0.6 0.1-0.3 0.3-0.8 1.2-2.5 0.2-0.2 0.5-0.5 0.3-0.2 0.1-0.3 0.1-0.3-0.1-0.2-0.2-0.5-0.1-0.3-0.1-0.9-0.1-0.2-0.2-0.3-0.2-0.4-0.1-0.2-0.2-0.2-0.5-0.2-0.1-0.2-0.2-0.3-0.1-0.2-0.3 0-0.4-0.1-1.2 0.1-0.3 0.1-0.1 0.1-0.1 0.3-0.2 0.2-0.6 0.1-1 0.2-1.1 0.4-0.6 0.4-0.5 0.4-0.4 0.3-6.2 0.7-0.4 0-0.4-0.2-1.6-0.2-0.4-0.1-0.3-0.2-0.5-0.4-0.3-0.1-0.4-0.1-1-0.1-0.9 0.1-0.9 0-0.4 0-0.4 0.2-0.2 0.2-0.3 0.3-0.2 0.2-0.3 0.1-0.9 0.1-0.4 0.1-0.9 0.4-0.3 0-1.1 0.2-0.6 0.2 0.3-0.8 0.1-0.2 0.3-0.4 0.2-0.1 0.5-0.2 0.2-0.2 0.5-0.8 0.8-0.8 0.2-0.4 0.1-0.5 0-0.5 0.1-0.4 0.1-0.4 0.2-0.5 0.1-0.4 0-0.4-0.1-0.3-0.2-0.2-0.2-0.1-0.2 0-0.2 0.1-0.5 0.1-0.2 0-0.2-0.1-0.1-0.2 0-0.2 0.1-0.5 0-0.4 0-0.3 0.1-0.2 0.4-0.4 0.3-0.2 1-0.5 0.7-0.5 0.6-0.3 0.2-0.1 2.1-1.8 0.2-0.2 0.5-0.2 0.6-0.5 0.4-0.3 0.2-0.2 0.1-0.3 0.1-0.5 0-0.4-0.1-0.3-0.3-0.4 0-0.4 0-0.3 0.3-1.7 0.1-0.4 3.2-1.3 0.4-0.1 0.5 0 0.5 0.3 1.7 1.2 0.5 0.2 0.5-0.2 0.4-0.3 0.1-0.4 0-0.5-0.1-0.4 0-0.6 0.2-0.3 0.8-0.7 0.3-0.3 0.6-1 0.4-1.1 0.2-1.5 0-0.7-0.2-0.6 0.1-0.2 0.1-0.2 0.2-0.2 0.2-0.2 0.3 0 1.1-0.2 1.2-0.5 0.3-0.2 0.1-0.4-0.1-0.5 0-0.4 0.1-0.3 0.1-0.5 0.1-0.3 0-0.3-0.1-0.3-0.2-0.1-0.5 0-0.3 0.2-0.3 0-0.2-0.5 0-0.2 0-0.7-0.1-0.2-0.2-0.4-0.1-0.2 0-0.4 0.2-1.2 0.4-0.8 0.6-0.4 1.7-0.2 0.6-0.2 0.1-0.3 0-0.3-0.1-0.5 0.2-0.4 0.2-0.2 0.9 0.1 0.4-0.3 0.9-0.8 0.4-0.1 0.3-0.2 0.8-1 0.5-0.3 1-0.1 0.5-0.1 0.2-0.4 0-0.4-0.3-0.5-0.3-0.5-0.3-0.4-0.2-0.1-0.3-0.2-0.3 0-0.2-0.1-0.3 0.1-0.4 0.2-0.3 0-0.3-0.3 0-0.4 0.2-0.5 0.1-0.5 0-0.2-0.3-0.4 0-0.2 0.1-0.3 0.5-0.1 0.2-0.2 0.2-0.5-0.1-0.4-0.6-0.8-0.1-0.3 0.1-0.1 0.2 0 0.2-0.3 0.2-0.2 0.2-0.7 0.3-0.5 0.4-0.3 1.2-0.9 0.3-0.3 0.4-0.7 0.3-0.6 0.3 0.1 0.6 0.8 0.6 0.3 0.7-0.1 1.4-0.6 0.9-0.1 0.3-0.2 0.2-0.4 0.1-0.9 0.1-0.4 0.8-1-0.1-0.2-0.3-0.1-0.3-0.4 0-0.4 0.7-3.3 0.4-1 0.5-0.4 0.2 0 0.4 0.1 0.2 0 0.1-0.3 0-0.2-0.2-0.4-0.3-0.7-0.1-0.3 0-0.2 0-0.4 0-0.2-0.5-1.4-0.1-0.5 0-0.8 0.1-0.9 0.9-2.5-0.1-0.8-0.3-0.3-0.4-0.2-0.3-0.3 0-0.5 0.1-0.2 0.8-0.4 0.2-0.2 0.4-0.9 0.3-0.9 0.2-2 0.3-0.8 0.2-0.2 0.4-0.2 0.3-0.3 1-0.9 0.1 0.1 0.2 0.2 0.2 0.1 0.3-0.1 0.2-0.5 0.8-0.7 0.1-0.6 0-0.8 0.2-0.6 0.3-0.3 0.3-0.1 0.1 0.2 0.1 0.4 0.3 0.3 0.4 0.1 0.9 0 0.5 0.2 0.3 0.2 0.1 0.1 0.1 0.4 0.1 0.4 0.3 0.2 0.3 0.1 0.3-0.1 1-1 0.4-0.3 0.3-0.2 0.1-0.2 0.2-0.5 0.2 0.1 0.3 0.1 0.5 0 0.9 0.3 0.3 0 0.7-0.2 0.6-0.3 0.5-0.1 0.6 0.6 0.3 0 0.2 0 0 0.1 0.1 0.3 0.6 0.9 0.2 0.1 0.2 0.1 0.2-0.1 0.6-0.6 0.2 0 0.2 0.1 0.4-0.1 0.2-0.1-0.1-0.3-0.1-0.2 0.2-0.4 0.5-0.4 0.1-0.3 0.3 0 0.9 1.4 0.3 0 0.5-0.2 0.6 0.2 0.4 0 0.4-0.2 0.7-0.5 0.4 0 0.8 0.6 0.8 0.2 1.8-0.4 0.8 0 1.3 0.4 4-0.1 0.2-0.1 0.3-0.3 0.3-0.1 0.3 0.1 0.2 0.1 0.3 0.4 0.8 0.6 1.7 0.9 1.3 1.3 0.5 0.3 0.6 0.2 0.7 0.1 0.4 0 0.6 0 0.3 0.1 0.2 0.2-0.2 0.1-0.6 0.6-0.2 0.1-0.3 0-2.9-1 0.1 0.4 0.2 0.1 0.4 0.2 0 0.2-0.2 0.4 0 0.2 0.3 0.1 0.5 0 0.4 0.1 0.3 0.2 0.2 0.3-0.1 0.3 0 0.2 0.2 0.1 0.2-0.1 0.2-0.1 0.3-0.1 0.2 0.1 2 2 0.3 0.2 0.8 0.2 0.3 0.1 0.3 0.3-0.1 0.2-0.3 0.3-0.5 0-0.5-0.1-0.8-0.5-0.4-0.2-1-0.1 0 0.2 0.6 0 0.6 0.3 0.5 0.4 0.4 0.4 0.3 0.1 0.4 0 0.3-0.1 0.3-0.1 0.2 0.1 0.6 0.4 0.1 0.2 1.2 1.1 0.1 0.3 0 0.2-0.1 0.1-0.4 0-1.3-0.1 0.3 0.3 0.4 0.2 1 0.4 0.9 0.1 0.2 0.2-0.1 0.4-0.2 0.2-0.6 0.3-0.2 0.3-0.4 0.5-0.3 0.2-2.1 0.1-0.5 0-0.8-0.5-0.5 0-0.4-0.2-0.3-0.5-0.2-0.5-0.4-0.6 0-0.2-0.1-0.5-0.1-0.2-0.2-0.1-0.4-0.2 0.3 0.6 0.2 1.2 0.1 0.3 0.3 0.4 0.3 0.6 0 0.5-0.3 0.4-0.4 0-0.9-0.5-0.5-0.1-2.7 0-1.8-0.3-2.8 0.1-0.8 0.3-0.5 0.8 0.5-0.3 0.6-0.2 0.7-0.1 1.2 0 0.6 0.1 0.4 0.3-0.2 0.6-0.2 0.4 0.3 0.6 0.3 0.5 0.4 0.3 0.2 0.1 0.8 0.2 0.3 0.2 0.2 0.2 0.3 0.5 0.4-0.2 0.6-0.1 0.7 0.1 0.5 0.2 0.2 0.1 0.2 0 0 0.1 0 0.6 0 0.3-0.1 0.3-0.2 0.2-0.4 0.2-0.2 0.2-0.3 0.4-0.5 0.5-0.1 0.2 0 0.9-0.1 0.2-0.3 0.3-0.3 0-0.4-0.5-0.7-0.2-0.2-0.1-0.2 0.1 0 0.2 0.2 0.4 0.2 0.3 1.6 0.8 0.3 0.2 0.5 0 0.8 0 0.5 0.1 0.1 0.2 0 0.4 0 0.3 0.6 0.6 0.8 0.1 0.9-0.1 0.9 0.2 0.3 0.1 0.1 0.3 0.2 0.2 0.1 0.3-0.1 0.2-0.3 0.2-0.2 0-0.2 0.2-0.5 0.7-0.2 0.2 0.3 0.1 0.5-0.1 0.4-0.1 0.3-0.2 0.4 0 0.5 0.2 0.2 0.3 0 0.2-0.4 0.1-0.8 0.4-0.4 0.1-1.5 0.2 0 0.1 0.5 0 1.6 0.3 2.1 0.1-0.3 0.4-0.4 0.1-0.5 0.2-0.4 0.2-0.8 0.6-0.2 0.2 0.3 0.3 0.9 0.3 0.9 0.1 0.8 0.2 0.7 0.6 0.2 0.3 0.1 0.4 0.1 1.5 0.1 0.4 0.2 0.3 0.2 0.3 0.9 0.8 0.3 0.5 2.1 1.8 0.2 0.2 0.3 0.5 0.2 0.2 0.3 0.9 0.3 0.4 0.2-0.3 0.4 0.3 0.4 0.6 0.3 0.7 0.1 0.6-0.2 0.4-0.7 0.9-0.3 0.2-1.5 0.4-0.5 0.2-0.3 0.4 0 0.4-0.1 0.5-0.4 0.3 0 0.3-0.7 0-1.3-0.3 0.4 0.4 0.8 0.5 0.4 0.4-0.8 0.2-0.8 0.1-0.7-0.1-0.8-0.2-0.3 0.1 0.2 0.3 0.3 0.1 0.8 0.1 0.4 0.1 0.3 0.2 0.2 0.3 0.3 0.2 0.2-0.1 0.2 0 0 0.9-0.1 0.5-0.2 0.2-0.1 0.1 0 0.3 0.1 0.2 0.2 0.1 0.3 0 0.2 0.2 0.2 0.4 0.2 0.4 0.3 0.4 0.4 0.1 0.5 0.1 0.3 0.2 0.3 0.2 0.3 0.1 0.6 0 0.2 0.1 0.1 0.2-0.1 0.4 0 0.2 0.2 0.2 1.6 1.8 1.2 0.5 1.9 1.5 0.9 0.4 0.9 0.2 0.3 0.2 0.6 0.6 0.5 0.1 0.1 0.1-0.1 0.3-0.3 0.2-0.1 0.2 0.1 0.2 0.2 0.1 0.5 0 0.3 0.1 0 0.2 0.1 0.5 0 0.2 0.2 0 0.2-0.2 0.4 0.2 0.7 0.5 0.2 0 1 0.1 0.7 0.3 1.4 1.6 0.8 0.3 0.3 0.3 0.6 0.5 0.5 0.6 0.1 0.4 0 0.1-0.3 0.1-0.1 0.2 0.7 0.3 0.3 0.2 0.3 0.5 0.7 1.3 0.5 0.1 0.2-0.1 0.1-0.1 0.3-0.3 0.2 0 0.4 0 1.1 0.4 0.3 0.2 0.1 0.3-0.1 0.5 0 0.2 0.3 0.3 0 0.3-0.2 0.3-0.7 0.6-0.3 0.5-0.4 0.2-1.6 0.7-0.3 0.3-0.2 0.6-0.3 0.2-0.3 0.2-0.4 0.1-0.5 0-0.2-0.1-0.5-0.3-0.5-0.1-0.3-0.2-0.4-0.2-0.5 0-0.5 0.1-1.2 0.6-0.4 0.2-0.3 0-0.2-0.2-0.2-0.1-0.4-0.1-0.9-0.3-1 0-0.2 0-0.2 0.4-0.2 0.1-0.2 0.2-0.2 0-0.3-0.1-0.3-0.3-0.2-0.3-0.3-0.3-0.3-0.2-2.8-0.3-1.3-0.4-0.7-0.3-0.6-0.5-0.5-0.5-0.4-0.7-0.5-1.4-0.3-0.6-0.3-0.2-0.9-0.5-0.1-0.2-0.1-0.1-0.3 0-0.2 0.1-0.2 0.1-0.1 0.2 0.1 0.2 0.2 0.4 0.7 0.8 0.1 0.2 0.8 1 0.1 0.4 0.1 0.9 0.4 0.7 0.3 0.2 0.1 0.2 0.2 0.3 0 0.4 0.1 0.5-0.1 0.4-0.2 0.2-0.4 0.1-0.2 0-0.3-0.1-0.2-0.1-0.2-0.4-0.2-0.2-0.3-0.2-0.3-0.1-0.3 0-0.2 0-0.4 0.3-0.7 0-0.5 0.1-0.4 0.2-0.5 0.4-1 1.1-0.3 0.6-0.1 1.3-0.1 0.4-0.5 0.4-0.2 0.2 0 0.2-0.2 0.5-0.1 0.2-1.1 1.4-0.2 0.5 0.1 0.2 0.2 0.6 0 0.2-0.2 0.2-0.2 0.1-0.5 0.3-0.3 0.4-0.4 0.8-0.8 1.3 0 0.2 0.2 0.4 0 0.4 0 0.4-0.2 0.3-0.5 0.5-0.2 0.2-0.1 0.3 0.1 0.3 0.1 0 0.4 0.1 0.2 0.2-0.2 0.1-0.5 0.2-0.2 0.1-0.1 0.2 0.1 0.5 0 0.5 0 0.2 0.2 0 0.2 0 0.1 0.1-0.2 0.3 0.2 0.1 0.2 0.1 0.2 0.3 0.2 0.2 0.1 0.5 0 0.3-0.1 0.2-0.3 0.4-0.1 0.2-0.4 0.4-0.1 0.1-0.3 0.8-0.1 0.3-0.1 0.9-0.1 0.5-0.5 0.7 0 0.5 0.2 0.4 0.3 0.6 0.4 0.5 0.2 0.1 0.2 0 0.1 0.3-0.1 0.5-0.1 0.3-0.5 0.5-0.2 0.4 0 0.2 0.2 0.4-0.1 0.5-0.2 0.5-0.2 0.3 0 0.2 0.7-0.3 2.6-1.9 0.5-0.2 0.3 0.1 0.2 0.4-0.2 0.2-0.3 0.2-0.3 0.4-0.7 0.2-0.3 0.2-0.1 0.2 0.8 0.2 0.2 0.2 0 0.9-0.1 0.3-0.3 0.5-0.1 0-0.7 0.1-0.3 0.1 0 0.1 0.4 0.2 0.4 0 0.2 0.2-0.1 0.4-0.3 0.2-0.2 0.2-0.2 0.2 0.3 0.3-0.3 0.1-0.3 0-0.6-0.1-0.3 0.1 0 0.1 0.1 0.1 0.2 0.1 0.5 0.1 1.2 0.3 0.6 0.1 0.2 0 0.2 0.2 0.1 0.3 0 0.3-0.1 0.3-0.2 0.1-0.6 0.1-0.4 0-0.2 0.1-0.3 0.3-0.1 0.1-1.1-0.3 0.1 0.6-0.8-0.2-0.2 0.5 0.1 0.5-0.1 0.3-0.4 0-0.3-0.1-0.5-0.6-0.3-0.2-0.1 0.4-0.2 0.5-0.3 0.4-0.2 0.1-0.2-0.2 0-0.3 0-0.6-0.1-0.2-0.6-0.6-0.4-0.1-0.3 0.4-0.2 0.6 0 0.6-0.2 0.6-0.3 0.3-0.9 0.5-0.6 0.7-2.2 3.1-0.6 0.3-0.1 0.5-0.1 0.5-0.1 0.4-0.3 0.3-0.6 0.3-0.5 0.2-2.3 0.6-0.5 0-0.2-0.1-0.1-0.3 0-0.6 0.3-0.3 0-0.2-0.3-0.2-0.1 0.1-0.1 0.2-0.2 0.3-0.1-0.3 0-0.7-0.1-0.2-0.9-1.1-0.1-0.5 0.3-1.4-0.3 0.1-0.3 0.4-0.2 0.6-0.1 1.1 0.1 0.3 0.7 0.7 0.1 0.3 0 0.1-0.1 0.3-0.3 0.3 0 0.1 0.9 0.3 0.2 0.1 0.1 0.1-0.1 0.3-0.2 0.4-0.3 0.3-0.1 0.2 0.1 1-0.1 0.5-0.5 0.2-0.4 0-2.4 1-0.9 0.5-0.6 0.8-0.1 0.9 0.2 0.4 0.2 0.2 0.2 0.3 0 0.4-0.1 0.5-0.4 0.4-0.5 0.2-1.9 0.6-0.8 0.5-1 0.2-0.5 0.2-1.1 1-0.2 0.3-0.7 0.3-0.2 0.3 0.5 0.3 0.3 0.1 0.6 0 0.5-0.2 0.3-0.4 0.1-0.1 0.5-0.1 0.1 0 0.2 0.1 0.2 0 0.1-0.2 0.5-0.1 0.5 0.1 0.4 0.2 0.1 0.4-0.3 0.6-0.4 0.5 0.8 0.8 0.3 0.5-0.3 1.1 0.2 1.4-0.1 0.5-0.4 0.5-0.2 0.2-1.5 0.4-0.5 0.3-0.5 0.5-0.5 0.4-0.2 0.4 0.2 0 1-0.5 0.7-0.2 0.4 0.4 0.1 0.8 0.4 0.3 0.6-0.1 1.4-0.7 0.3 0 0.3 0 0.1 0.6 0.2 0.3 0.2 0 0.3-0.2 0.3-0.3 0.4-0.1 0.1 0.3 0 0.6-0.7 3z",    IDN1933: "M837.9 221.6l1.1 1.3 0.4 0.2-0.5 0-0.5-0.5-0.6-0.6-0.4-0.2-0.3 0-0.5 0.1-0.2 0-0.4 0-0.2 0-0.2-0.2-0.3-0.2-0.3-0.2-0.5-0.2-0.3-0.1-0.2-0.2-0.2-0.3-0.2-0.2-0.3 0-0.3-0.1-0.2-0.3-0.1-0.3 0-0.3 0.1-0.4 0.3 0 1.5 1.1 0.3 0.1 0 0.1 0.2 0.4 0.4 0.2 0.2 0.2 0.2 0 0.6 0.1 0.6 0.1 0.4 0.2 0.4 0.2z m-19-17.6l0.4 0.7 0.2 0.3 0.1 0.4 0 0.4-0.3 0.3-0.2-0.2-0.3-0.3-0.2-0.4-0.1-0.5-0.1-0.1-0.3 0-0.2-0.1-0.4-0.5 0.2-0.1 0.3-0.2 0.2-0.1 0.3 0.1 0.4 0.3z m-23.5-16.7l-0.5 0-0.1-0.1 0.1-0.1 0.5-0.2 0.6-0.4 0.3-0.1 0.3 0-0.3 0.3-0.4 0.3-0.5 0.3z m42.1-4.7l0.3 0.2 0-0.1 0.2 0 0.5 0.3 0.4 0.2 0 0.5-0.4 0.5-0.5 0-0.1-0.2-0.8-0.3-0.2-0.3-0.1-0.3-0.2-0.3-0.2-0.4 0.4-0.1 0.7 0.3z m22.3 0.2l-0.4 0.1-0.2-0.2-0.1-0.2 0.3-0.3-0.6-0.3 0.1-0.3 0.6-0.6 0.2-0.3 0.1-0.5 0-0.8 0.2 0.1 0.1 0.2 0 0.3 0 0.3 0 1.8 0.1 0.5-0.1 0.1-0.3 0.1z m-4.1-6.5l-0.4 0.1-0.4-0.4-0.2-0.5 0-0.6 0.2-0.6 0.2-0.5 0.3-0.4 0.2-0.2 0.3-0.1 0.2 0.1 0.3 0.1 0.3 0.2 0.1 0.3-0.1 0.3-0.6 1-0.1 0.8-0.3 0.4z m-4-5l-0.4 0.5-0.3-1 0-0.4 0.2-1 1.2-1.9 0.2-0.1 0.3 0.1 0 0.4-0.1 0.7-0.2 0.1-0.3 0.3-0.3 0.3 0.4 0.5-0.3 0.7-0.4 0.8z m-83.3-4.9l-0.1 1 1.2 0.9 0.2 0.3 0.3 0.4 0.2 0.5 0 0.3-0.3 0.1-0.2 0.1-0.1 0.5-0.1 0.1-0.5 0-0.6 0.5-0.3 0.4 2 0.8 0 0.2-0.1 0.1-0.3 0-0.2 0.1-0.2 0.1-0.3 0.4-0.2 0.1-0.2-0.1-0.2-0.1-0.4-0.2 0-0.2 0.1-0.3-0.1-0.4-0.2 0.2-0.4 0.7-0.2 0.1-0.3 0.2-0.3 0.3-0.2 0.3-0.2 0.2-0.7 0.3-1.5 0-0.6 0.2-0.3-0.3-0.3-0.2 0.3-0.1-0.6-0.3-0.4-0.1-1.2 0.1-0.9-0.4-1-0.1-0.2 0-0.2-0.2-0.7-0.2-0.4-0.3-0.3-0.1-0.1-0.1-0.4-0.4-0.2-0.1-0.9-0.4-0.5-0.2-0.2-0.1-0.4-0.5 0.6-0.4 2.8-1 0.1 0 0-0.3 0.4-0.2 0.2 0 0.7-0.1 0.5-0.2 1.1-0.7 0.4-0.1 0.5-0.1 0.9-0.1 0.9-0.2 0.5 0 1.3 0.2 0.3 0 0.3-0.4 0.5-0.3 0.4-0.2 0.7-0.3 0.3-0.1 0.2 0 0.2 0.1 0.1 0.3z m-8.6-11.2l-0.2 0.2-0.5 0.5-0.2-0.3 0-0.2-0.8 0.7-0.5 0.3-0.6 0.1 0.9-0.6 0.1-0.2-0.1-0.1-0.2 0.1-0.4 0.2-0.3 0-1.5 0-0.4-0.2 0.1-0.3 0.4-0.3 2-0.7 0.4 0 0.4 0.3 0.4 0 0.5 0 0.4 0.2 0.1 0.3z m21.2-5.5l0.1 0.2 0.1 0 0.3-0.2 0.4-0.2 1 0 0.2 0 0.4 0.4 0.5 0.7 0 0.2-0.3 0.3-0.1 0.2 0.3 0.5 0 0.2 0 1-0.7 3.2-0.5 1-0.1 0.4-0.1 0.5-0.2 0.4-0.3 0.4-0.5 0.1-0.3-0.1-0.3-0.5-0.3-0.1-0.2 0-0.3 0.2-0.4 0.2-0.3-0.1-0.2-0.1-0.6-0.8-0.1-0.3-0.5-0.3-0.6-0.4-0.3-0.2-0.2-0.3 0-0.2 0-0.4 0-0.1-0.3-0.2-0.1-0.7-0.2-0.2-0.5-0.5-0.2-0.2 0.5-0.4 0-0.5-0.2-0.5-0.3-0.4-0.8-0.8 0-0.3 0.6-0.4 2.4-0.6 0.9-0.5 0.8-0.3 0.5-0.1 0.5 0.1 0.3 0.4 0.2 0.3z m-2.1-3.4l0.3 0 0.4-0.1 0.4 0.1 0.3 0.2 0.4 0.1-0.1 0.1-0.6 0.2-0.3 0.1-0.1 0.2 0.1 0.2 0.3 0 0.1 0.2-0.1 0.1-0.2 0.1-0.2 0.1-0.5 0.2-0.7 0.4-0.4 0.1-0.8 0-3.1 0.7-1.6 0.2-0.8 0.1 0-0.1 0.3-0.2-0.4 0-0.4-0.1-0.2 0.1-0.2 0.3-0.1 0-0.2-0.2-0.4 0-0.8 0.4 0.2-0.4 0.4-0.2 0.3-0.2-0.1-0.4 0.3-0.3 0-0.9 0.3-0.3 0 0.3 0.1 0 0.1-0.3 0.1-0.1 0.3 0 0.3 0.1-0.2 0.5 0.5 0.2 0.7-0.1 0.3-0.6 0.2 0.1 0.2 0.1 0 0.2 0.1 0.2 0.6-0.5 0.4-0.1 0.3 0.2-0.1 0.1 0.3 0.1 0.2-0.1 0.1-0.1 0.2 0 0.3 0 0.6 0.2 0.3 0.1 0.5-0.2 0.5-0.3 0.4-0.1 0.4 0.4 0-0.2-0.1-0.2 0.1-0.3-0.4-0.4 0.1-0.2 0.2 0.1 0.2 0.1 0.4 0z m-3.3-6.6l-0.1 0.3-0.6 0.8-0.3 0.3-1 0.2-0.3 0-0.2-0.1 0.2-0.2 0.3-0.7 0-0.6-0.7 0.3-0.1 0.4-0.1 0.1-0.2 0.1-0.3 0.1-0.1 0.1-0.2 0-1.2 0.2 0.2-0.2 0.4-0.3 0.1-0.2-0.3 0.1-0.3-0.1-0.1-0.3-0.2-0.3 0.3 0.1 0.2 0.2 0.1-0.3 0.3-0.3 0.2-0.2 0.1 0.1 0.1 0.3 0.2 0.2 0.3 0 0.3-0.1 0.2-0.2 0.2-0.3 0.3-0.2 0.5-0.1 0.3-0.3 0.1-0.1 0.2 0 0.3 0.2 0.5 0.2 0.2 0.2 0.2 0.3 0 0.3z m-17.4 0.6l-0.2 0.2-0.3-0.1-0.3-0.3-0.1-0.5 0-0.3 0.1-0.3 0.1-0.1 0.4-0.3 0.4-0.1 0.2 0 0.2 0.1 0.1 0.3 0 0.3-0.3 0.4-0.1 0.4-0.2 0.3z m103.8 51l-4 3.2-0.3 0.2-0.3 0.2-0.2 0.2 0 0.2 0.1 0.9 0 0.3-0.6 0.8-2 1.6-0.6 0.7-0.5 0.8-0.6 1.1-0.3 1-0.1 0.6 0.5 0.4 21.9 7.8-8.5 10.8-0.3 0-0.8 0.1-0.3-0.1-0.4-0.3-1.1-0.8-0.2-0.1 0-0.3-0.1-0.8-0.1-0.1-0.4-0.2-0.5 0-0.5 0-0.2-0.4 0.1-0.4 0.7-0.5 0.2-0.5 0-0.2-0.3-0.2-0.1-0.2-0.1-0.2 0.1-1.2 0.2-0.3 0.4-0.1 0.4-0.1 0.4 0 0.9 0.3 1.8 0 0.4 0.1 0.5 0.4 0.2 0.1 0.2-0.1 0.3-0.2 0.2 0 0.4-0.3 0.1-0.1-0.1-0.2-0.1 0-0.2 0.2-0.2 0.1-0.3-0.1-0.2-0.2 0-0.2-0.1-0.1-0.2 0-0.4 0.2-1-0.1-1.6-0.2-1.7-0.1-0.3-0.1-0.2 0.1-0.1 0.4-0.6 0.3-0.3 0.2-0.2 0.3 0 0.4-0.2 0.3-0.4 0.1-1.1 0.3-0.2 0.1-0.3-0.2-0.6-0.5-0.4-0.3 0.3-0.4-0.3-0.4-0.4-0.3-0.4-0.4-0.3-0.1-0.5-0.1-0.4 0-0.9-0.7 0.4 0.7 0.2 0.5-0.2 0.4-1 0 0 0.2 0.3 0.1 0.3 0.3 0.1 0.2 0.1 0.4-0.3 0.5-0.3 0-0.2-0.2-0.2-0.2-0.2-0.3-0.3-0.4-0.4-0.1-0.4-0.1-0.5-0.1-0.4-0.3-0.2-0.3-0.1-0.2-0.1-0.6-0.1-0.1-0.2 0.1-0.4 0.2-0.2-0.2 0.2-0.4 0.9-0.7 0.2-0.1-0.1-0.2-0.3-0.9-0.3-0.3-0.3-0.3-0.4-0.3-0.1 0.2 0 0.3 0.1 0.3-0.1 0.4 0 0.1-0.3 0.3-0.4 0.1-0.4-0.2-0.4-0.3-0.3-0.1-0.4 0.2-0.5 0.9-0.3 0.2-0.3-0.1-0.3-0.3-1-2.3-0.4-0.6-0.9-1.1-0.2-0.3-0.1-0.5 0-0.4 0-0.2-0.2 0-0.2 0-0.3 0.3-0.2 0.1 0 0.5 0.1 0.5 0.3 0.5 0.2 0.6 0.1 0.2 0 0.2-0.3 0.1-0.1-0.1-0.3-0.7-0.2-0.2-0.2-0.2-0.3-0.2-0.4-0.1-0.3 0.1-0.4 0.2-0.2 0-0.2-0.5 0.2-0.4 0.1-0.2 0-0.2-0.2-0.5-0.2-0.5-0.9-1.3-0.2-0.5 0-0.5 0.3-0.3 0.5-0.2 0.4-0.2 0.1-0.5 0-0.6-0.4-1.6 0-1.5 0.2-0.4 0.4 0.3 0.1-0.1 0-0.2 0-0.5 0.2-0.2 0.3 0 0.4 0.1 0.3-0.3 0.3-0.9 0.4-0.2 0.4-0.2 0.6-0.6 0.3-0.2 0.5 0.3 0.3 0.5 0.3 0.2 0.4-0.2-0.2-0.2-0.1-0.3-0.1-0.2-0.5-0.2-0.2-0.2-0.2-0.2-0.2-0.3 0-0.3 0-0.4 0.3-0.7 0.1-0.3 0-0.2-0.1-0.3-0.3-0.4-0.4 0.1-0.4 0-0.2 0.2 0.3 0.4 0 0.1-0.3 0.5-0.1 0.6-0.2 0.2-1.5 0.7-0.3 0.3-0.6 0.6-0.5 0.7-0.3 1.4 0.2 3.8-0.8 1.2-0.3 0.1-1.2 0.2-0.1 0-0.2-0.2-0.3-0.8-0.1-0.1-0.3-0.1 0 0.2 0.1 0.4 0.1 0.6-0.2 0.1-0.5 0 0 0.2 0.5 0.2 0.8 0.3 0.4 0.3 0.3 0.4 0.2 0.5 0 0.5-0.1 0.4-0.2 0.3-0.4 0.4-0.4 0.3-0.4 0.1-0.3 0.1-2.1 2.2-0.3 0.7 0.3 1 0.6 0.6 0.4 0.4-0.1 0.4-0.2 0.2-0.5 0.2-0.2 0.1-0.2 0.2-0.3 0.6-2.6 2.8-0.4 0.3-0.8 0.3-1.1-0.1-1.8-0.3-0.6 0-0.3 0.2-0.6 0.7-0.4 0.2-0.5 0-1.1-0.5-0.2 0-0.1-0.2-0.2-0.2 0.1-0.5-0.2-0.2-0.2-0.2-0.5-0.3-0.2-0.1-0.2-0.3-0.2-0.5-0.1-0.2-0.4-0.3-0.2-0.2-0.1-0.3 0.1-0.2 0.2 0.1 0.4 0.3 0-0.2 0-0.3-0.5-1.2-0.3-0.3-0.1-0.2 0-0.7 0-0.2-1.2-2.5 0-0.7 0.6-0.5 0.9 0.2 1 0.3 0.8-0.1 0.2-0.2 0-0.2 0-0.4 0-0.3 0.1-0.1 0.4-0.4 0.3-0.2 0.1-0.1-0.1-0.3-0.6-0.4-0.1-0.3-0.3-0.8-0.2 0-0.5-0.1-0.4-0.2-0.2-0.5-0.2-1 0-0.5 0.2-1.4-0.2-0.5-0.4-0.2-0.4 0-0.7 0.1-0.2 0.1-0.1 0.1 0 0.3 0.2 0.5-0.1 0.2-0.4 0.2-0.5 0-0.5-0.3-0.3-0.3-0.1-0.2-0.4-0.7-0.1-0.2-0.5-0.4 0-0.3 0.3-0.1 0.3-0.2-0.1-0.4-0.1-0.1-0.6-0.3-0.1-0.1-0.2-0.1-0.2-0.6-0.2-0.3-0.1-0.2-0.1-0.3-0.4-0.2-0.4-0.4-0.2-0.1-0.3-0.1-0.1-0.1-0.3-0.4-2.4-1.3-0.5-0.2 0-0.4-0.4-0.3-1-0.2-0.2 0-0.8 0-0.2 0-0.7-0.4-0.1 0.4-0.4 0.2-0.3 0-0.3-0.2-0.2 0.1-0.1 0-0.4-0.1 0.1 0.4-0.2 0.1-0.6 0 0-0.2-0.4-0.7-0.4 0.2-0.9-0.3-0.3 0.4-0.1 0 0-0.4 0.1-0.1 0.5-0.3 0.3-0.3 0.1-0.6-0.4 0-0.3-0.1 0-0.2 0.3 0 0.4-0.2 0.3-0.3 0.1-0.3-0.2-0.2-0.4-0.1-1.1 0.1-0.1-0.1 0.3-0.3 0.8-0.3 0.4 0 0.3 0 0.3-0.1 0.2-0.3 0.2 0.3 0.1 0 0.1-0.1-0.1-0.3 0.2-0.1 0.9 0.1 0.6-0.1 0.5-0.2-0.4-0.2-1.1 0.1 0-0.3 0.2-0.2 0.9-0.3 0.4 0 0.5-0.1 2.3 0 0.3 0 0.9 0.4 0.4 0.1 0.7-0.1 0.3 0-0.1 0.3 0.1 0.2 0.1 0.3-0.3 0.2 0.4 0.1 0.5-0.3 0.3-0.1 0-0.1-0.1-0.4 0.3-0.1 0.5-0.1 0.2 0.1 0.2 0.2 0.4 0.1 0.5 0 0.4 0.1 0.8 0.5 1.2 1.3 0.8 0.3 0.3-0.1 0.2 0 0.4-0.3 0.2-0.3 0.2-0.1 1.3-0.9 0.4-0.4 1.1-1.6 0.5-0.4 0.5-1 1.3-1.5 0.2-0.4 0.3-0.3 1.7-0.8 0.6-0.2 0.3 0 0.4-0.3 0.4 0.1 0.2 0.1 0.3-0.1 0.6-0.2 0.4 0 1.2 0.6 0.1 0.3 0 0.7 0.2 0.3 0.2-0.2 0.4 0 0.3 0.2 0.3 0.2 0.2 0.3 0 0.3-0.1 0.6 0 1.8-0.1 0.6 0.4-0.1 0.1-0.3-0.1-1 0.1-0.5 0.1-0.5 0.6-1.4 0.2-0.2 0.2 0.1 0 0.2 0 0.8 0.1 1.1 0 0.5-0.2 0.5 0.3-0.1 0.2-0.5 0-0.9-0.1-0.6 0-0.3 0.1-0.2 0.2-0.1 0.2 0.1 0.1 0.3 0.2 0.3 0.1 0.5 0.2 0.4 0.4-0.1 0-0.4 0.1-0.1 0.1-0.1 0.4 0 0.4-0.1 0.2-0.2 0.3-0.3 0.1 0.2 0.2 0 0.3 0 0.1 0.1 0.6 0.4 0.1 0.2 0.1 0.3 0 1.4-0.2 0.4 0.3 1.1 0.2-0.3 0-0.3 0-0.3 0-0.5 0-0.4 0.3-0.9 0.1-0.4 0-1.2 0.1-0.2 0.4 0.1 0.3 0.3 0.4 0.8 0.4 0.6 0.3 1 0.3 0.3 0.1-0.1 0.1-0.4 0-0.5 0.2-1.3-0.2-0.3-0.3-0.4-0.1-0.2 0.1-0.2 0.1-0.2 0.2-0.3-0.4-0.1-0.8 0-0.3-0.2-0.2-0.4 0.1-0.1 0.4-0.1 0.4 0 0.9-0.2 0.5 0 0.3 0.2 0.1 0.2 0.6 0.5 0.2 0.2 0.1 0-0.2-0.4-0.5-0.5-0.2-0.5 0.4-0.2 1.5 0.1 0.7 0 0.4-0.4-1.2 0-0.6 0-0.5-0.2-0.1-0.3 1.1-0.5 0.4-0.4-0.5 0.1-1 0.2-0.6 0.1 0-0.2 1-0.3 0.5-0.2 0.3-0.4 0.2-0.4 0-0.6 0-0.5-0.2-0.4-0.2 1.1-0.2 0.4-0.5-0.3-0.1 0-0.5 0.4 0 0-0.1 0.1-0.5 0.2-0.3 0.2-0.3-0.1-0.4-0.6-0.2-0.1-0.1-0.1 0.1-0.2 0.3-0.3 0.8-0.2 0.3-0.2 0.3-0.3 0.1-0.3 0.5 0.2 0.3-0.2 0.3-0.3 0.4-0.2-0.1-0.1-0.3 0.1-0.4 0.2-0.3 0-0.1-0.3 0.1-0.1 0.5-0.1 0.2-0.1 0-0.2 0.1-0.3 0.1-0.2 0-0.2-0.4-0.1-0.5 0.1-0.3 0.1-0.6-0.1-0.1 0.1-0.3 0.5-0.1 0.1-0.2 0.1-0.4 0-0.2 0.1-0.5 0.3-0.2 0.1-0.8 0.1-0.4 0.1-0.1 0.4-0.2 0.1-0.4 0.1-0.3 0.2-0.3 0.4-0.1 0.1-0.2-0.1-0.1-0.1-0.2-0.1-0.2 0.1-0.4 0.2 0-0.9 0-0.3-0.4 0.8-0.3 0.4-0.3 0.2-0.3-0.2-0.3-0.6-0.4-0.1 0 0.1 0.3 0.4-0.4 0.1-0.5 0-0.6 0.1-0.9-0.3-0.4-0.1-1 0.1-0.5 0-0.3-0.2-0.2-0.2-0.5 0-0.9 0.3-0.8-0.1-0.5 0.1-0.8 0.4-0.5 0.1-1 0.1-1 0.2-0.8 0.4-0.8 0.2-0.9-0.1-1.4-0.6-0.5-0.1-0.5 0.1-0.5 0.2-1.6 1-0.2 0-0.1-0.1-0.3-0.3-0.2 0-0.5-0.2-0.2-0.5-0.1-0.5-0.2-0.5-0.2-0.2-0.5-0.2-0.5-0.1-0.4 0.2-0.4 0.2-1.4 0.3-1.6 0.8-0.8 0.3-0.9-0.1-0.5-0.3-0.4-0.5-0.3-0.5-0.3-0.5-0.5-0.3-3-1.4-0.6-0.4-0.1-0.6 0.2-0.1 0.6-0.3 0.1-0.2 0.1-0.3 0.3-0.2 0.5-0.2-0.6 0.1-1 0.3-0.5 0.1-0.5-0.8-0.5-0.2-0.2-0.2-0.1-0.3 0.1-0.4 0.1-0.2-0.1-0.3-0.5-0.1-0.2-0.2-0.1-0.3 0.1-0.7 0-0.3-0.1-0.2-0.2-0.5 0.5-0.2 0.3-0.4 0.2-0.4 0.4-0.3 0.3-0.3 0.3-0.2 0.1-0.3-0.1-0.5 0.1-0.2-0.5 0.1-0.7 0.4-0.9 0.2-0.2 0-0.2-0.1-0.2-0.3 0-0.1 0.2-0.3-0.2-0.1-0.2-0.2-0.1-0.1 0.2-0.9 0-0.2 0.3-0.3 0.1-0.1 0.2-0.1 0.6-0.1 0.1-0.1 0.5-0.5 0.1-0.2-0.4 0-1.3 0.6-0.5 0.2 0.2-0.4-0.2-0.1-0.2 0-0.3 0.2-0.8 0.8-0.4 0.2-0.1-0.6 0.2-0.6 0.1-0.7-0.5-0.5 0 0.6-0.1 0.5-0.3 0.4-0.4 0.2-0.6 0-0.4-0.4 0-0.5 0.4-0.3-0.5-0.2-0.4 0.1-0.4 0.2-0.4 0-0.4-0.1-0.3-0.2-0.6-0.5-0.3-0.1-0.4-0.1-0.7 0-0.5-0.2-0.2 0-0.3 0.1-0.2 0.1 0 0.2 0 0.2-0.2 0.1-0.2 0.1-0.5-0.2-0.4-0.6-0.2-0.2-0.2-0.1 0-0.1 0.2-0.2 0.1-0.3-0.2-0.3-0.2-0.2-0.2-0.2-0.7 0.2-0.4-0.1-1-0.5-0.1 0.3 0.4 0.4 0.9 0.7 0.1 0.3-0.3 0.3-0.4 0.3-0.3 0.2-0.7 0.1-0.7 0.4-0.5 0.2-0.1-0.1-0.1-0.5-0.2-0.2-0.4-0.4-0.9-0.3-0.9-0.1-1.8 0.1-0.5 0-0.4-0.2-0.2-0.3-0.1-0.4 0.1-0.2 0.8-0.3 0.3-0.2 0.1-0.2 0.5-1.6 0-0.3 0-0.2 0.2-0.1 0.1-0.1 0.3-0.4 0.4-0.2 1.7-0.3 0.6-0.2 0.2-0.2 0.3-0.9 0.6-0.8 0.1-0.2 0.1-0.3 0.3-0.5 0.1-0.4-0.1-0.8 0-0.3 0.3-0.2-0.1-0.3 0.2-0.9-0.2-0.4 0.1-0.1 0.5-0.2-0.9-0.9-0.3-0.6 0.1-0.6 2-0.6 0.9-0.1 0.3-0.1 0.2-0.4 0.6-0.1 0.3-0.1 0.2-0.1 0.9-0.1 0.3-0.3 0.3 0 0.4 0 0.2 0.1-0.5 0.6-0.1 0.2 0 0.3 0.3-0.1 0.5-0.1 0.4-0.2 0.1-0.2 0.3-0.1 4.1-0.8 1.8-0.6 0.3 0 0.2-0.2 0.5-1 0.9-1 0.6-0.5 0.6-0.3 1.1-0.4 0.3 0 0.1-0.2 0.4-0.9 0.1-0.3 1.2-0.7 0.3-0.1 0.7-0.4 0.8-0.3 0.7-0.3 0.4-0.1 0.6-0.1 1.8-0.5 0.9-0.2 5.2 0.5 0.7-0.2 4.2 2 0.5 0.1 0.2 0 0.5-0.3 0.3 0.1 0.1 0.1 0 0.2 0.1 0.2 0.4 0.2 0.7 0.4 0.3 0.2 0.2 0.1 0.3 0 0.4 0 0.2 0.1 0.2 0.3 0.1 0.1 0.3 0 0.4-0.1 0.2 0.1 3 2.1 0.5 0.5 0.3 0.5 0.2 0.3 0.9 0.6 0.3 0.1 3.6 0.5 0.3 0.1 0.2 0 0.1-0.3 0.3-0.2 0.1 0 0.3 0.1 0.3 0.2 0.5 0.1 2 0.1 0.3-0.1-0.2-0.3 0.2-0.2 0.3-0.1 0.3 0 0.4 0.1 0.1 0.1 0.4 0.4 0.2-0.1 0.3 0 1.2-0.2 0.9 0 0.3 0 0.3-0.2 0.4 0.2 1.3 1.4 0.2 0.1 0.5 0.1 0.3 0.2 0.2 0.1 0.3 0.4 0.2 0.2 0.7 0.2 0.1 0.2 0 0.2-0.4 0.2-1.4 0.1-0.3 0.1-0.1 0.3-0.1 0.6-0.1 0.3-0.3 0.1-0.2 0.1 0.9 1.9 0.3 0.4 0.1 0.2 0 0.5 0.2 0.2 0.1 0.2 0.4 0.7 0.3 0.4 0.4 0.4 0.4 0.3 0.3 0.1 0.2 0.2 1.4 2.6 0.3 0.4-0.9 1.5-0.2 0.4 0 0.9-0.2 1.4-0.1 0.4-0.2 0.3-1.1 1.2-0.4 0.2-0.3 0.3-0.4 0.1-0.2 0.1-0.1 0.2-0.1 0.3 0 0.3 0.3 0.9 0.9 4.3 0.1 1.7 0 0.2 0.2 0.3-0.1 0.2-0.3-0.1-0.1 0.1-0.3 1.4 0 0.5 0.1 0.2 0.4 0.2 0.1 0.2 0.1 0.3-0.1 0.7 0.1 0.4 0.3 0.7 0.1 0.4-0.2 0.5 0 0.2 0.1 0.2 0.3 0.3 0.1 0.2 0 0.4 0.2 0.4 0.2 0.3 0.3 0.3 0.9 0.7 0.3 0.6 0.3 0.3 0.3 0.2 0.3 0.2 0.1 0.1 0.3 0.4 0.1 0.4 0.2 0.8 0.4 0.9-0.1 0.4 0.5 0.4 0.2 0.6 0.2 1.3 0.2 0.3 0.2 0.2 0.3 0.3 0.2 0.6 0.5 1 0 0.2 0.5 0 0.4-0.2 0.6-0.4-0.2-0.3-0.1-0.9-0.1-0.2-0.3-0.4-0.1-0.3 0-0.3 0.1-0.6-0.1-0.3-0.1-0.3-0.2-0.5-0.1-0.2-0.1-0.7 0-0.5 0.1-0.5 0.1-0.4 0.3-0.5 0.3-0.2 0.9-0.4-0.2-0.1-0.2-0.1 0-0.2 0.3-0.2 0.2 0.1 0.4 0.3 0.2 0.1 0.4 0.1 0.4 0.2 0.4 0.3 0.2 0.3 0.2 0.8 0.2 5.7 0 0.3z m-98.1-59.8l-0.5 0.2-0.7-0.3-0.6-0.1 0.3-0.3 0.7-0.6 0.3 0 0.4 0.2 0.2 0.4-0.1 0.5z m14.7-1.8l2.9 0.9 0.3 0.2 0.1 0 0.3-0.2 0.6-0.2 0.5 0 0.3 0.1 0 0.2-0.3 0.3 0.4 0 0.5 0.2 0.6 0 0.3 0.1 0.6 0.2 0.2 0.1 0.4 0.4 0.2 0.1 0.1 0.1 0.1 0.2 0.3 0.2 0.3-0.1 0.2 0.1 0.4 0.1 0.2 0 0.2 0.2 0.5 0.2 0.2 0.2 0.3 0.7-0.3 0.3-0.1 0.2-0.1 0.3 0.2 0.3 0.7 0.5 0.2 0.3-0.2 0.1-0.5 0.1-0.1 0.2-0.1 0.3-0.4 0.3-0.1 0.4-0.4-0.2 0 0.5-0.2 0.4-0.4 0.1-0.4-0.3-0.8-0.7-0.5-0.3-0.2 0.1-0.1-0.1-0.7 0-0.2-0.1-0.1-0.1-0.3 0.1-0.3 0.1-1 0.8-0.1-0.3-0.1-0.1-0.4 0.1-0.1 0.1-0.3 0-0.2 0-0.2-0.2-0.2-0.1-0.4-0.6-0.6-0.4-0.1-0.2 0.1-0.1-0.3-0.5-0.3-0.2-0.3-0.1-0.6 0-0.4-0.1-0.2 0-0.2-0.1-0.1-0.2 0.1-0.5-0.1-0.4-0.2-0.2-1.2-1.1-0.2-0.3-0.1-0.5-0.3 0.1-0.3-0.1 0.2-0.3-0.4 0-0.6 0-0.6 0.1-0.2 0.2 0.5 0.1 0.2 0.2 0.2 0.2-0.4 0-0.3 0.2 0.1 0.4 0.8 0.3 0.4 0.3 0.7 1 0.5 0.9 0.1 0.4 0.2 0.2 0.9 0.5 0.4 0.2 0.1-0.3 0.1-0.2 0.1-0.1 1 0.1 0.3 0 0.2 0.2 0 0.2 0.2 0.1 0.3 0.2 0.2 0.2 0.3 0.4 0.1 0.3-0.1 0.1-0.2 0.1-0.2 0.2-0.1 0.4-0.3 0.2-0.9 0.3-1.8 0.4-0.5 0-0.5-0.1-0.4-0.3-0.2-0.4-0.6-1.5 0.3-0.2 0.1-0.3-0.1-0.3-0.1-0.3-1.7 0.5-0.7 0.5-0.3 0.8 0.2 0 0.2-0.1-0.1 0.3-0.4 1-0.1 0.1-0.2 0.1 0-0.1 0-0.3 0.3-0.7-0.4-0.1 0-0.3 0.1-0.4 0-0.5-0.2-0.2-0.3-0.3-0.1-0.3 0-0.2 0.2-0.3-0.1-0.2-0.3-0.2-0.5 0.1-0.7 0.4-0.2 0.3-0.2-0.1-0.1-0.2-0.1 0-0.4 0-0.3-0.2-0.3 0.3-0.1 0-0.2-0.3-0.6 0-0.5-0.1-0.1 0-0.1-0.1-0.1-0.4-0.2-0.1-0.6-0.1-0.7-0.3-0.3-0.2 0.5-0.1 0.2 0 0.4 0.2 0.2 0 0.6 0 0.7-0.1 0.4 0 0.3 0.1 0.3 0.2 0.3 0 0.3-0.2 0.3-0.2 0.1-0.3-0.3 0-0.4 0-0.3-0.2 0.4-0.1 0.2-0.3 0-0.3-0.1-0.3-0.2 0.4-0.3 0.2-0.2 0-0.1-0.5-0.1 0-0.1 0.2-0.1 0.1-0.2 0-0.2-0.1 0.1 0.3 0.1 0.3 0.1 0.2-0.2 0.2-0.2 0-0.4-0.1-0.3-0.2-0.1-0.2-0.1-0.3-0.3-0.4 0-0.4 0-0.2 0.3-0.1 0.3 0 0.2 0.1 0.3-0.2 0.2-0.4 0.1 0.3 0 0.4 0.1 0.2 0.2 0.2 0.3-0.2 0-0.2-0.1-0.4-0.2-0.3 0.5-0.1 0.3 0.2 0.3 0.3 0.4 0.2-0.1-0.4 0.1-0.2 0.2 0.3 0.9-0.4 0.5-0.2 0.2-0.4 0.2 0.1 0.2 0.1 0.4 0.4 0.1-0.3 0.2 0.3 0-0.2 0.3-0.4 0.3 0.3 0.2-0.3 0.6 0.1 0.4-0.1 0.4 0 0.7-0.2 0.5-0.1 0.1 0.4 0.3-0.1 0.7 0.1 0.4-0.1-0.2-0.2-0.2-0.1-0.2 0-0.2 0 0.3-0.3 0.4-0.2 0.4-0.1 0.6 0z m76.3-16.1l-0.4 0.1-0.4 0-0.1-0.2 0.2-0.3 0.4-0.2 0.3 0 0.1 0.3-0.1 0.3z m-66.8-6.9l-0.2 0.2 0-0.2 0-0.3 0.2-0.2 0.2 0.1-0.1 0.3-0.1 0.1z",    IDN1931: "M449.7 160.6l0.2-1 0-0.3-0.2-0.1-0.3 0-0.5 0.1-1.9 0.8-1 0.2-0.6 0.1-0.1 0-1.1 0.4-0.2 0.2-0.1 0.2-0.2 0.4-1.4 6.4-0.1 0.7 0.2 0.6 0.2 0.6 0.2 0.5-0.1 0.6-0.3 0.7-0.4 0.5-0.3 0.4 0 0.3 0.4 1-3.1 2.9-0.7 0.5-0.5 0.3-2.3 0.6-2.6 0.6-0.5 0.2-0.1 0.1 0 1 0.1 0.3 0.2 0.3 0.1 0.2 0.2 0.3 0 0.2 0.1 0.8-0.1 0.2-0.1 0.2-0.3 0.7-0.3 0.8-0.1 0.1-1 1.1-0.3 0.4-0.1 0.4-0.2 0.5-0.1 0.5 0 0.4-0.1 0.5-0.2 0.4-0.4 0.4-0.3 0.2-1.5 0.6-0.2 0.1-0.1 0.1 0 0.3-0.1 0.3-0.3 0.3-0.2 0.2-0.5 0.2-1.5 0.3-0.3 0.1-0.5 0.7-0.1 0.3-0.1 0.3-0.5 2.1-3.5 9.3-0.5-0.2-0.3-0.2-0.2-0.4 0-0.4 0.2-0.3 0.4-0.2 0.2-0.2 0.5-1.4 0.6-0.7 0.2-0.3 0.1-0.5-0.9 0.8-0.8 1.3-0.9 1.1-1.3 0.5-0.7-0.1-0.6-0.2-0.4-0.4-0.1-0.8 0.4-2.1-0.1-0.6-0.1 0.2-0.1 0.2-0.2 1 0 0.5-0.1 0.1-0.3 0.2-0.8 1.4-1.4 0.7-0.7 0.2-1.3 0.8-1.6 0.5-2.2 0.4-1.7-0.4-0.2-1.6 0.3-0.9 0.1-0.9 0-0.9-0.5-1.6-0.2-0.2-0.4-0.1-1.8 0-0.5 0.1-0.4 0.2-0.3 0.3-0.2 0.5-0.1 0.4-0.4 0.2-1.2 0.1-0.3-0.1-0.1-0.2-0.1-0.5-0.1-0.3-0.2-0.4-0.3-0.3-0.3-0.2 0.9 1.9 0.2 0.5-1.2-1.2-0.3-0.3-0.6-0.3-0.3-0.3-0.3-0.2-0.1-0.3-0.2-0.4-0.1-0.6-0.2-0.3-0.4-0.3-0.5-0.3-0.7-0.2-0.6-0.3-1.4-2.6 0 1.5-0.1 0.4-0.1 0.2-0.2 0.4-0.2 0.2-0.4 0-0.6 0.5-0.3 0.4-0.1 0.4 0.1 0.4 0.5 0.4 0.2 0.1 0.2 0.1 0.5 0 0.2 0.1 0 0.1-7.6 4.9-0.7 0.7-0.4 0.1-0.8-0.2-0.2 0.1 0 0.3-0.2 0.1-0.2 0.1-0.2 0.1-0.5-0.2-2.9-2.1-0.9-0.4-1-0.2-2.2 0.4-1.8 1.1-3.2 3.1-0.9 0.8-0.5 0.2-0.4 0-0.4-0.2-1-0.3-0.3-0.3 0-0.5 0.4-0.9 0.2-0.5 0.1-1.3 0-0.5-0.6-3.8 0.1-1 0.3-1.8-0.2-0.9-1.4-2.4-0.1-0.9 0-0.9-0.1-0.1-0.3-0.2-0.1-0.2 0.1-0.4 0.4-0.6 0-0.4-0.3 0.2-0.4 0.3-0.2 0.3-0.2 0.3 0.2 1 0 0.3-0.1 0.2-0.4 0.4-0.4 0.4 0 0.2 0.1 0.2 0.2 0.1 0.2 0.2 0.2 0.1 0 0.2 0 0.1-0.2 0-0.1 0-0.9 0.4-1.4 1-0.3 0.1-0.4 0.1-0.4-0.1-0.2-0.4-0.1-0.4-0.1-0.3-0.6-0.5-0.9-0.2-1.8-0.2-0.8 0.1-0.7 0.2-5.1 2.7-1.6 0.6-0.9 0.1-0.8-0.2-1.8-1-0.4-0.1-0.8 0-0.3-0.1 0-0.3 0.2-0.4 0.2-0.2 0.7-0.6 0.7-0.3 0.7-0.2 1.9-0.8 0.2 0-0.2-0.3 0.9-0.3 0.1-0.1 0.2-0.2 0.3-0.5 0.3-0.9 0.3-0.4 0.3-0.2 1.2-0.5 0.3-0.2 0.2-0.2 0.2-0.3 0.1-0.3 0-0.3 0-0.3-0.2-0.5-0.2-0.2-0.1-0.3-0.1-0.3-0.1-0.7 0-2 0.1-0.5 0.2-0.8-0.1-0.4-2.7-6.1-0.2-0.6-0.2-0.6 0-1.5 0-0.4 0.7-2.5 0-0.8 0-0.4 0-0.4 0.2-0.8 0-0.3-0.2-0.3-0.3-0.3 0-0.1 0.2-0.6 0-0.3-0.1-0.2-0.1-0.2-0.2 0-0.3 0-0.2 0.2-0.4 0.1-0.3 0-0.2-0.2-0.2-0.3-0.2-0.3 0-0.2 0-0.2 0.3-0.4 0.5-0.6 0.4-0.3 0.8-0.5 0.5-0.2 0.4 0 0.2 0.1 0.5 0 0.2 0.1 0.3 0.2 0.2 0 0.3-0.2 0.8-0.7 0.4-0.3 0.7-0.9 0.5-0.4 0.6-0.4 0.5-0.2 0.7-0.5 0.5-0.9 0.3-0.4 0.2-0.1 0.4-0.4 0.6-0.4 1.2-0.6 0.4-0.4 1.1-0.4 0.8-0.4 0.2-0.3 0.2-0.3 0-0.4-0.2-0.6 0-0.3 0.1-0.3 0.1-0.2 0.7-0.9 0.5-0.4 2.1-1.5 1.2-0.6 0.3-0.1 0.9-0.5 2.4-1.5 1.9-0.6 0.6-0.5 0.1-0.5 0.1-0.2 0.2-0.1 0.3 0 2.6 0 1.1 0.2 0.6 0 0.3 0.1 0.5 0.1 0.3 0 0.3 0 2-0.8 0.5-0.3 0.3-0.1 0.3 0 0.6 0.2 0.3 0 0.3-0.1 3.8-1.5 0.8-0.5 2.2-0.8 0.7-0.3 0.6-0.4 1.1-0.5 0.5-0.1 0.5 0.1 0.2 0.1 0.6-0.1 0.1-0.2 0.3-0.4 0.1-0.1 0.3-0.1 0.5-0.2 0.2-0.1 0.1 0 0.2 0.1 0.2 0.2 0.4 0.8 0.4 0.4 0.3 0.2 0.2 0.1 0.4 0 0.2-0.2 0.4-1.2 0.4-0.9 0-0.2 0-0.3-0.3-0.5-0.1-0.2-0.2-0.2-0.4-0.1-0.1-0.2 0-0.2 0-0.3 0-0.1 0.4-0.7 1.2-1.2 0.3-0.2 0.4-0.1 0.3-0.1 0.3-0.2 0.2-0.3 0.2-0.1 0.3-0.1 0.2-0.1 0.1-0.2 0-0.5 0.4-0.8 0.6-1.1 0.1-0.1 0-0.2-0.1-0.4-0.4-1.5 0-0.6-0.1-0.3-0.5-1.1-0.3-0.4-0.8-0.6-0.3-0.2-0.3-0.8-0.6-0.8 0.7-0.3 0.9-0.2 0.4-0.2 0.4 0 0.2 0 0.7 0.3 0.3 0 0.4 0 0.5 0 0.2 0 0.3-0.2 0.7-0.6 0.3-0.1 0.2-0.1 0.3-0.1 0.1-0.2 0.2-0.5-0.1-0.7 0.1-0.4 0.2-0.3 0.3-0.4 0.3-0.3 0.3-0.4 0.3-0.8 0.2-0.2 0.5-0.3 0.4-0.5 0.5-0.3 0.6-0.2 1.1-0.2 0.3 0 0.9-0.4 0.4-0.1 0.9-0.1 0.3-0.1 0.2-0.2 0.3-0.3 0.2-0.2 0.4-0.2 0.4 0 0.9 0 0.9-0.1 1 0.1 0.4 0.1 0.3 0.1 0.5 0.4 0.3 0.2 0.4 0.1 1.6 0.2 0.4 0.2 0.4 0 6.2-0.7 0.4-0.3 0.5-0.4 0.6-0.4 1.1-0.4 1-0.2 0.6-0.1 0.2-0.2 0.1-0.3 0.1-0.1 0.3-0.1 1.2-0.1 0.4 0.1 0.3 0 0.1 0.2 0.2 0.3 0.1 0.2 0.5 0.2 0.2 0.2 0.1 0.2 0.2 0.4 0.2 0.3 0.1 0.2 0.1 0.9 0.1 0.3 0.2 0.5 0.1 0.2-0.1 0.3-0.1 0.3-0.3 0.2-0.5 0.5-0.2 0.2-1.2 2.5-0.3 0.8-0.1 0.3 0 0.6 0.1 0.3 0.1 0.3 0.2 0.5 0.1 0.2 0 0.3 0 0.6 0 0.2 0.1 0.2 0.5 0.8 0.2 0.4 0.1 0.3 0.1 0.3 0 0.3 0 0.2-0.7 1.7-0.4 1.1 0 0.4 0 0.2 0 0.2 0.2 0.3 0 0.2 0 0.3-0.1 0.3 0.1 0.2 0.2 0.3 0.3 0 0.8-0.8 0.2-0.1 0.6-0.3 0.2-0.1 0.3-0.4 0.2-0.3 1.7-2 0.6-0.4 0.3 0 0.5-0.1 0.3-0.1 0.2 0 0.7 0.2 0.7 0.1 0.2 0.2 0 0.2-0.1 0.2-0.1 0.4-0.3 1.5-0.1 0.5-0.6 1-0.2 0.4-0.1 0.8-0.1 1.6 0 0.4 0.3 0.8 0.1 0.4 0.1 1.1 0.1 0.4 0.2 0.8 0.4 0.8 1.1 1.5 0.2 0.4 0 0.4 0.1 0.8 0.5 2.6 0.1 0.3 0.7 0.9 0.1 0.3 0.1 0.4-0.1 0.2 0.1 0.3 0.1 0.3 1.1 0.9 0.2 0.1 0.3 0.1 0.7 0.2 0.7 0.3 0.5 0.1 0.3 0.2 0.3 0.2 0.4 0.4 0.1 0.3 0.2 0.4 0.1 0.2 0.5 0.4 0.2 0.3 0.3 0.4 0.2 0 0.2 0 0.3-0.2 0.3-0.1 0.4-0.1 0.3 2.6-0.1 0.3-0.1 1.1-0.1 0.5-1.1 2-0.4 0.6-0.3 0.3-0.3 0.1-0.3-0.1-0.3 0z",    IDN1930: "M207.7 167.3l-0.4 0.1-0.4 0-0.2-0.2-0.7-0.4-0.6-0.4-0.3-0.1-0.3 0-0.4 0.3-0.1 0.2-0.6 1.5-0.2 0.2-0.4 0.3-1.8 0.5-1.4 0.2-1-0.1-3.7-0.9-0.8 0-0.7 0.1-7.7 3.8-0.3 0.2 0.2 0.4-0.2 2.7 0.1 0.6 0.2 0.5 0.1 0.2 0.3 0.3 0 0.2-0.1 0.1-0.2 0.2-0.3 0.1-0.4 0.1-0.8 0.1-0.2 0.1-0.1 0.2-0.1 0.3 0 0.4 0.2 1 0.1 0.6-0.1 0.3 0 0.2 0 0.3-0.1 0.3-0.1 0-0.3 0-0.4-0.2-2.5-2.4-0.2-0.3-0.1-0.5-0.4-0.8-0.3-0.3-0.2-0.2-0.3-0.1-0.4 0.1-0.5 0.9-0.3 0.5-0.2 0.4 0 0.4 0.2 0.2 0.2 0.2 0.2 0.3 0.1 0.3 0.1 0.3 0 0.3-0.2 0.2-0.2 0.2-1 0.3-0.4 0.1-0.6-0.2-1.1-0.4-0.6 0.3-0.7-0.1-0.7-0.2-0.7-0.1-0.6-0.2-0.4-0.1-0.3 0-0.2 0.3-0.2 0.3-0.1 0.4 0.1 0.3 0.1 0.2 0.2 0.2 0.2 0.2 0 0.2 0 0.3-1.6 2.3-0.3 0.3-0.3 0.3-0.4 0.2-0.3 0.1-0.2-0.2-0.1 0-0.4 0.4-0.4 0.3-1 0.6-0.4 0.3-0.1 0.3-0.1 0.3-0.2 0.2-0.4 0.1-1.4 0.1-0.3 0.1-0.3 0.1-0.4 0-0.5 0-0.6-0.2-0.5-0.2-1-0.7-1.1-0.2-0.8-0.6-0.6 0.9-1.2 0.8-0.4 0.1-0.9 0.2-0.3 0.2-0.8 0.9-0.2-0.2-0.6-0.1-0.3-0.1-0.5-0.4-0.7-0.3-0.3 0-0.2 0.1-0.4 0.1-0.2 0.1-0.3-0.2-0.4-0.5-0.3-0.2-0.5-0.2-0.3-0.1-1.2-0.6-0.8-0.6-0.7-0.8-0.5-0.7-0.8-0.7-0.1-0.6-0.2-0.2-0.3-0.3-0.7-0.2-0.3-0.2-0.2-0.4-0.5-2.1-0.4-0.6-0.1-0.4-0.1-0.2-0.2-0.1-0.4-0.2-0.5-0.5-0.2-0.2-0.3-0.3-0.4 0-1.8 1.3-0.8-2.5-0.9-2.2-0.3-0.5-0.2-0.3-0.7-0.5-0.3-0.4-0.4-0.6-0.6-1.2-0.3-1.2-0.2-1.2-0.1-2.3 0.8 0.2 0.4-0.1 0.3 0.2 0.4 0.2 0.5 0.1 3.8-0.6 0.3 0.2 0.7 0.1 0.3-0.1 0.3-0.2 0.6-0.8 0.4-0.6 0.8-0.7 1.8-1.4 0.5-0.5 0.3-0.4 0.2-0.7 0-0.2-0.2-0.3-0.1-0.2 0.3-0.6 0-0.3-0.4-1.3 0.1-0.6 0.1-0.4 0.2-0.2 0.2-0.1 0.4 0 0.7-0.2 0.6-0.2 0.4-0.4 0.6-0.6 0.3-0.5 0.2-0.5 0-0.2 0-0.2-0.2 0-0.2 0.1-0.2 0-0.4-0.2-0.3-0.2 0.1-0.5 0-0.5-0.1-0.5-0.3-0.5 2.4-0.9 0.2-0.1 0.4-0.3 0.3-0.7 0.3-0.5 0.4-0.4 0.5-0.3 0.4-0.2 0.4-0.1 1.2 0.1 1.1-0.2 0.4-0.1 0.6-0.2 0.5-0.1 0.3 0 0.9 0.3 0.2 0.1 0.2 0.1 0.1 0.3 0.2 0.5 0.1 0.2 1.1 1 0.2 0.3 0.1 0.2 0.1 0.2 0.1 0.1 0.6 0.2 0.2 0.1 0.4 0.3 0.2 0.4 0.2 0.1 0.5 0.2 2 0.4 0.4-0.1 0.3-0.4 0.4-1.1 0.2-0.3 0.6-0.4 0.3-0.3 0.2-0.2 0.3-0.7 0.3-0.5 0.2-0.1 0.6-0.5 0.2-0.1 0.8-1 0.4-0.3 0.2-0.2 0.3-0.2 2.4-0.6 0.9-0.1 3.1 0.3 7.1-0.5 0.2-0.1 0.3 0.1 0.3 0.2 0.1 0.2-0.1 0.3-0.4 0.4-0.1 0.3 1-0.2 0.4 0 0.5 0.2 0.2 0.3 0.3 0.7 0.3 0.3 0.1 0 0.3 0 0.1 0.2 0.4 0.4 0.1 0.2 0.5 0.2 0.2 0.4 0.1 0.1 0.9 0.1 0.3 0.3 0.5 0.5 0.3 0.1 0.5 0.1 0.4 0.1 0.3 0.2 0.2 0.4 0.3 0.8 0.2 0.2 0.2-0.9 0.4-0.4 0.5-0.3 0.5-0.2 0.9-0.2 0.3-0.1 1.4 0.7 0.4 0.3 0.4 0.1 1.1 0.1 0.4 0 1.3 0.8 0.5 0.1 0.9-0.4 0.2-0.1 1.3-0.3 1.2-0.1 0.1 0.2 0.6 1.9-0.2 1.4 0 0.8 0.3 0.7 0 0.2 0.7 0.7 0.1 0.3 0.1 1.4 0 3.3 0.2 0.9 0.3 0.9 0.9 1.6 0.3 1z",    IDN1837: "M610.8 109.4l0 0.2 0.5 0.9 0.6 0.3 0.2 0.1 1 0.5 0.3 0.2 0.1 0.2 0 0.2 0.1 0.6 0.4 1.1 0.2 0.2 0.4 0.2 0.6 0.4 0.5 0.7 2.5 1.1 0.5 0.6 0.4 0.6 0.3 1.4 0.1 0.7 0 0.7-0.1 0.7-0.5 1.3-0.3 0.5-0.3 0.1-0.8 0.2-0.4 0-2.1-0.2-0.7-0.3-0.3 0-0.1 0-0.3-0.4-0.3-0.3-0.5-0.8-0.1-0.1-0.4 0.1-0.1-0.2-0.7-1-0.9-1-0.3-0.5-0.2 0-0.3 0.3-0.4 0.2-1.2 0.2-3.2-0.2-2 0.2-1 0-0.2-0.1-0.5-0.6-0.2-0.2 0.1 0.7-0.1 0.3-0.3 0.1-0.3 0-0.3-0.1-0.3-0.2-0.3-0.1-0.4-0.1-5.2 0-0.3 0.1-0.4 0.2-0.2 0-1.6 0-0.3 0-0.2 0.1-0.3 0.2-0.1 0-0.5 0-0.9-0.2-1.4-0.1-0.4 0.1-0.4 0.5-0.4 0.2-2 0.2-1.1 0.1-0.9 0.1-0.3 0-0.1-0.1-1.1-1.5-0.3-0.3-0.6-0.2-0.3 0-0.7 0.2-0.1 0-0.3-0.1-0.3-0.5-0.2-0.2-0.1 0.3-0.2 0.1-0.3 0.1-0.4 0-0.2-0.1-0.2-0.1-0.2 0-0.2 0.3-0.1 0.3 0 0.3-0.1 0.2-0.3 0.1-0.4 0-0.3 0.1-0.2 0.1-0.2 0.1-0.4-0.3-0.3 0-0.3 0.1-0.8 0.1-0.4 0.2-0.2 0.1 0.2-0.5 0-0.3-0.1-1.2 0-0.3-0.1-0.2-0.2-0.1-0.3 0.1-0.3 0-0.4-0.1-0.5-0.1-0.2-0.2-0.4-0.3-0.3-0.4-1.2-1.3 1.2-0.5 0.5-0.3 0.1-0.3 0.2-0.6 0.2-0.3 0.4-0.5 0.3-0.3 0.2-0.2 0.9-0.6 0.3-0.1 0.5-0.1 0.3 0 0.6 0 0.9 0.2 0.5 0.1 0.2 0.1 0.3-0.1 0.9-0.3 1.3-0.4 0.4-0.1 0.6-0.3 1.4-0.5 2.6-1.1 0.3-0.1 0.4 0 0.4 0.1 2.2 0.8 1.1-0.2 2.1-0.9 1.2-0.8 0-0.1 0.6 0.3 0.3 0.1 0.2-0.1 0.4-0.1 0.3 0 0.3 0.1 0.1 0.1 0.2-0.3 0.2 0 0.3 0 1 0.3 0.4-0.1 1-0.2 0.3 0 0.7 0.6 0.8 0.3 0.9 0.2 1.3 0.1 0.5 0.2 0.3 0.2 0.2 0.4 0.2 0.2 0.5 0.3 0.8 0.3 0.4 0.4 0.3 0 0.2 0.1 0 0.3 0.6 0.2 0.5 0.5 0.4 0.1 0.9-0.6 0.3-0.1 0.3-0.2 0.4-1 0.4-0.3 0.1-0.2 0-0.3 0-0.3 0.2-0.1 0.5 0 0.3 0.1 1.4 0.5 0.6 0.1z",    IDN1230: "M207.7 167.3l0.1 0.6 0 0.2-0.1 0.2-0.3 0.6-0.1 0.3-0.5 0.8-0.2 0.5 0 0.3 0.1 0.3 0.2 0.6 0.4-0.4 0.3-1.1 0.2-0.3 0.6 0.1 0.5 0.4 0.4 0.5 0.4 0.2 0.3 0.2-0.2 0.6-0.3 0.7-0.3 0.3-0.3 0.4 0 0.2 0.4 0 0.3-0.2 0.5-0.6 0.2-0.3 0.2 0.4 0 0.5 0 0.4 0.4 0.2 0.1 0.1 0.2 0 0.1-0.2 0.3-0.1 0.4-0.4 0.9-0.3 0.9 0.2 0.8 0.7 0.5 0.9 0.2 1-0.1 0.8-0.4 0.8-0.7 1-1.5 1.8-0.3 0.3-0.4 0-0.9 0.1-0.3 0.1-0.3 0.3-0.7 0.5-0.4 0.3 1.5-0.7 0.7 0 0.5 0.8 0 1-0.1 0.5-0.3 0.8 0 1-0.1 0.3-0.2 0.2-0.4 0.2-0.4 0.1-0.4 0.1-0.2 0.1-0.7 0.5-0.7 0.6-0.5 0.6-0.2 0.8 0 0.9-0.1 0 0 0.3 0.3-0.3 0.4-0.5 0.2-0.5 0.1-0.5 0.1-0.3 0.4-0.3 0.7-0.5 1.5-0.7 0.6-0.4 0.4-0.7 0.4-1.4 0.1-0.4-0.1-1 0.1-0.3 0.3-0.5 0.7-0.6 0.3-0.4 0.3-1 0.4-0.3 0.4-0.1 0.4 0.2 0.2 0.4 0 0.6 0 0.5 0.4 0.3 0-0.5 0.3-0.3 0.3-0.2 0.5-0.1 0.5 0.2 0.3 0.2 0.3 0.3 0.3 0.2 0.2 0 0.5-0.1 0.2 0 0.3 0.1 0.3 0.3 0.1 0 0.5-0.1 1.3-0.6 0.5-0.1 0.5 0 0.5 0.1 0.8 0.5 0.5 0.1 1.1 0 1.9 0.3 0.9 0 0.6 0.1 0.3 0.2 0 0.1-0.3 0 0.3 0.3 0.3-0.1 0.3-0.3 0.3-0.2 0.4 0.1 0.3 0.1 0.2 0.3 0 0.6-0.1 0.5-0.4 0.9-0.1 0.4 0.1 0.6 0 0.4 0.2 0.5 0.2 0.4 0.2 0.4 0.4 0.4 0.4 0.3 0.6 0.1 0.4 0.3 0.3 0 0.5 0 0.2 0 0.2 0.2 0.4 0.7-0.1 3 0.4 0.8 0.7 0.7 0.8 0.4 1 0.2 0.2-0.1 0.4-0.1 0.3 0 0.2 0.1 0.4 0.2 0.2 0 0.3 0.1 0.3 0.3 0.3 0.7 0.2 0.7 0 1.8 0.1 0.9 0.1 0.2 0.3 0.5 0.1 0.2 0 0.3-0.1 0.4-0.1 0.3-0.2 0.2-1.4 0.7-0.8 0.6-0.7 0.8-0.6 1-0.4 0.9-1.4 4.8 0.2 0.9 0.5 0.7 1.8 1.3 0.4 0.6 0 0.8-0.3 0.9-1.5 2-0.2 0.8-0.1 0.7-0.5 1.5-0.1 0.4-0.8-0.5-0.5 0.1-0.4 0.2-0.9 0-0.1-0.2-0.2-0.4-0.2-0.2-0.2-0.2-0.4 0-0.2-0.1 0-0.6-0.2-0.2-0.1-0.1-0.2 0-0.4 0-0.1-0.1 0-0.1 0.2-0.4 0-0.2 0-0.2-0.1-0.2-0.2-0.4-0.1-0.3-0.2-0.3-0.2-0.2-0.2-0.3-0.3-0.4-0.2-0.1-0.2 0-0.2-0.2-0.1-0.4-0.1-0.3-0.2-0.2-0.7-0.3-0.7-0.1-0.2-0.2-0.4-0.6-0.2-0.2-0.3 0-0.2 0-0.3 0.1-0.2 0-0.2-0.1-0.2-0.2-0.2-0.5-0.2-0.2-0.1 0-0.1 0-0.1 0.2-0.1 0.4 0 0.2-0.1 0.3-0.2 0.1-0.1 0.2 0 0.4 0 0.2-0.3 0.7-0.1 0.2-0.3 0.3-0.2 0.1-0.3 0.1-0.3 0-0.3-0.1-0.2 0-0.2 0.1-0.3 0.4-0.2 0.1-0.4 0.2-0.1 0.1-0.2 0.2 0 0.7-0.1 0.2-0.3 0.5-0.1 0.1 0.1 0.3 0.2 0.2 0 0.1-0.1 0.2-0.7 0.3-0.2 0.2-0.2 0.3-0.1 0.3-0.1 0.3-0.2 0.2-0.3 0.3-0.3 0.2-0.2 0.2-0.7 0.4-1.1 0.2-0.9 0.3-0.9 0.3-3.6 1.6-1.6 0.4-1.1 0-0.5 0.1-1.4 0.6-0.5 0.4-0.7 0.6-0.2 0.3-2 0.7-0.2 0.6-0.1 0.6 0.1 0.7 0.2 1.5 0.1 0.4-0.1 0.3-0.1 0.4-0.3 0.3-0.4 0.2 0 0.1-0.1 0.4 0 0.2 0 0.2 0.1 0.2 0.3 0.1 0 0.1 0.1 0.6 0.1 0.4 0.4 0.3 0.1 0.2 0.4 0.4 0.1 0.1-0.1 0.5-0.3 0.6-0.5 0.5-0.4 0.1-0.7-0.1-0.8 0-1.2 0.8-1.6 0.4-0.6 0-0.7-0.1-0.8 0-1.2-0.2-0.9 0-0.3-0.1-0.2-0.1-0.1-0.3-0.1-0.4 0-0.4 0-0.3 0-0.1-0.2-0.2-0.2-0.1-0.3-0.1-1.3-0.7-0.1-0.4-0.2-0.2-0.4-0.3-0.2-0.1-0.1-0.3 0-0.3-0.5-2-0.1-0.3-0.2-0.2-0.3-0.7-0.6-0.8-0.2-0.4-0.2-0.5-0.1-1.9-0.1-0.4-0.2-0.2-0.2-0.2-0.3 0-0.9-0.1-0.4 0-0.6-0.2-0.9-0.7-1.3-0.1-0.7-0.2-1-0.6-0.9-0.2-0.6-0.3-0.4-0.2-0.2 0-0.4 0-0.2-0.5-0.1-1.7-0.2-0.5-0.6-1.3-0.1-0.7-0.3-0.3-0.1-0.1-0.3-0.2-0.4 0-0.2 0-0.6 0.1-0.4 0-0.3 0-0.5 0-0.4 0.2-1-0.7-0.2-0.1-0.4-0.1-0.7 0.2-0.4 0-0.2 0-1-0.4-0.4-0.2-0.3-0.3-0.5-0.8-0.3-0.3-0.8-0.5-0.2-0.3-0.3-0.3-0.2-0.3-0.6-0.4-0.1-0.3 1.2-0.3 0.3-0.2 2.7-2.4 0.4-0.3 0.5-0.2 0.4-0.3 0.3-0.3 0-0.3-0.1-0.3-0.2-0.3-0.1-0.2 0.1-0.1 0.2 0 0.5 0.2 0.3 0.1 0.6-0.1 0.2-0.1 0.6 0.1 0.3-0.4 0.2-1.7 0-0.6-0.1-0.6-0.2-0.4-0.1-0.1-0.2-0.2-0.3-0.1-0.6-0.1-0.4-0.1-1.3-0.2-0.3-0.1-1.2-0.8-0.2-0.3-0.2-0.7-0.2-0.2-0.2 0-0.4 0.1-0.4 0.3-0.9 0.7-0.8 0.7-0.2 0.1-0.2 0.1-0.4-0.1-0.7-0.4-0.1 0-0.3-0.1-0.2-0.2-0.3-0.3-0.3-0.4-0.3-0.2-0.2-0.3-0.2-0.3-0.3-0.1-0.2-0.1-0.2-0.2 0-0.1 0-0.2 0.3-0.3 0-0.2 0.1-0.7 0.2-0.4 0-0.2 0-0.2-0.1-0.2-0.2-0.2-0.4-0.3-0.5-0.5-1.4-0.5-0.2 0-0.2 0-0.5 0.4-0.2 0-0.3-0.1-0.5-0.2-0.5 0-0.1-0.1-0.3-0.1-0.6-0.8-0.1-0.3 0.2 0 0.4-0.1 0.1-0.1-0.1-0.5-0.1-0.3-0.1-0.2-0.4-0.3-1-0.8-0.3-0.4-0.3-0.7-0.2-0.3-0.2-0.2-0.6-0.4-0.4-0.6 0.8-0.9 0.3-0.2 0.9-0.2 0.4-0.1 1.2-0.8 0.6-0.9 0.8 0.6 1.1 0.2 1 0.7 0.5 0.2 0.6 0.2 0.5 0 0.4 0 0.3-0.1 0.3-0.1 1.4-0.1 0.4-0.1 0.2-0.2 0.1-0.3 0.1-0.3 0.4-0.3 1-0.6 0.4-0.3 0.4-0.4 0.1 0 0.2 0.2 0.3-0.1 0.4-0.2 0.3-0.3 0.3-0.3 1.6-2.3 0-0.3 0-0.2-0.2-0.2-0.2-0.2-0.1-0.2-0.1-0.3 0.1-0.4 0.2-0.3 0.2-0.3 0.3 0 0.4 0.1 0.6 0.2 0.7 0.1 0.7 0.2 0.7 0.1 0.6-0.3 1.1 0.4 0.6 0.2 0.4-0.1 1-0.3 0.2-0.2 0.2-0.2 0-0.3-0.1-0.3-0.1-0.3-0.2-0.3-0.2-0.2-0.2-0.2 0-0.4 0.2-0.4 0.3-0.5 0.5-0.9 0.4-0.1 0.3 0.1 0.2 0.2 0.3 0.3 0.4 0.8 0.1 0.5 0.2 0.3 2.5 2.4 0.4 0.2 0.3 0 0.1 0 0.1-0.3 0-0.3 0-0.2 0.1-0.3-0.1-0.6-0.2-1 0-0.4 0.1-0.3 0.1-0.2 0.2-0.1 0.8-0.1 0.4-0.1 0.3-0.1 0.2-0.2 0.1-0.1 0-0.2-0.3-0.3-0.1-0.2-0.2-0.5-0.1-0.6 0.2-2.7-0.2-0.4 0.3-0.2 7.7-3.8 0.7-0.1 0.8 0 3.7 0.9 1 0.1 1.4-0.2 1.8-0.5 0.4-0.3 0.2-0.2 0.6-1.5 0.1-0.2 0.4-0.3 0.3 0 0.3 0.1 0.6 0.4 0.7 0.4 0.2 0.2 0.4 0 0.4-0.1z",    IDN1231: "M258.4 195.4l-0.1 0-1-0.2-0.4-0.2-0.9-0.7-0.8-0.2 0.1-0.3 0.3-0.2 0.1-0.4 0.1-0.1 0.5-0.3 0.5-0.3 0.4 0 0.3 0.2 0.4 0.2 1 0.2 0.4 0.2 0.1 0.4-0.5 1 0.1 0.5-0.6 0.2z m4.8-2.7l-0.1 0.1-0.3 0-0.2-0.1-0.4-0.1-0.2-0.2-0.4-0.2 0.7-0.9 0.3-0.2 0.1-0.2 0.2 0 0.1 0.1 0.1 0.3 0.3 0.4 0 0.6-0.2 0.4z m8.8-0.6l-0.3 0.5-0.4 0.4-0.7 0.2-0.4 0.5-0.3-0.2-0.6-0.8-0.6-0.4 0.1-0.2 0.4 0.1 0.6-0.3 0.2-0.4 0.5-0.3 0.7-0.2 0.6-0.1 0.2 0.1 0 0.3 0.2 0.3-0.2 0.5z m7.7-7.1l0.8 0.3 0.7 0.1 0.4-0.1 1.1 0.2 0.4 0.2 0.2 0.2 0.4 1.1 0.1 0 0.2-0.6 0.1-0.2 0.3-0.2 0.7 0.3 0.1 0.1 0.3 0.4 0.1 0.1 0.3 0.1 0.3 0.2 0.2 0.3 0.1 0.4 0.5-0.2 0.3 0.1 1.5 1.7 0.2 0.8 0.3 0.8 0.1 0.4-0.1 0.4-0.5 0.5 0 0.2-0.2 0.6-0.9 1.1-0.3 0.6 0 0.2 0.1 0.4 0.1 0.2-0.1 0.2-0.2 0.4 0 0.2-0.3 0.4 0 0.2 0.1 0.1 0.3 0.3 0.2 0.3-0.5 0-0.8 0.3-0.4 0.1-0.6 0-0.3 0.1-0.3 0.2-0.1 0.4 0 0.8-0.2 0.1-0.6 0-0.6 0.1-0.3 0.2-0.3-0.1-0.2-0.5-0.1-1-0.1-0.4-0.5-0.4-1.1-1 0-0.2 0-0.2-0.2-0.2-0.2-0.2-0.3 0.1-0.3 0.1-0.4 0.1 0 0.3 0.3 0.6 0 0.9-0.5 0.4-1.4 0.7-1.4 0-0.6 0.8-0.6 0.1-0.6-0.2-0.2-0.5 0.2-0.7 0.8-0.9 0-0.3-0.2-0.1-0.2-0.2-0.5-0.5-0.1-0.2 0-0.7-0.1-0.3-0.2-0.4 0-0.2 0.1-0.3 0.4-0.5 0.1-0.2 0-0.8-0.1-0.1-0.4 0.1-0.5 0.2-0.2 0-0.1-0.2 0-0.3 0.2-0.2 0.3-0.2 0.3-0.1 0.4-0.2 0.1-0.6-0.1-0.7-0.2-0.6 0.3-0.1 0.3-0.2 0.3-0.3 0.1-0.2-0.1-1.4 0.4-2.1 0.3-0.5 0.9-0.2 0.4 0 0.6 0.1 0.4 0 0.3-0.1 0.6-0.5 0.4-0.1 0.3 0.5z m-42.8-23l0.4 0 0.4 0.1 0.2 0.2 0.1 0.3 0.2 0.4 0.2 0 0.3 0.1 0.4-0.1 0.2 0.1 1 0.7 0.2 0.2 0 0.2 0 0.2-0.2 0.2 0 0.3 0 0.9 0 0.3 0.2 0.1 0.3 0.3 0.1 0.1 0.2 0.4 0 0.2 0.4 0.3 0.1 0.5 0.1 0.2 0.2 0.1 0.2 0.1 0.2 0.1 0 0.2-0.1 0.4 1.1 1.3 0.2 0.2-0.1 0.2-0.3 1.5 0 0.9 0.8 3.7 1.4 3.8 0.5 0.9 0.7 0.8 0.7 0.7 0.4 0.2 0.6 0.2 0.5 0.1 0.2-0.2 0.2-0.1 2.5 0.8 2.8 0.5 1.4 0.6 0.5 0 1 0 0.4 0.2 0 0.3-0.2 0.1-0.4 0-0.2 0-0.7 0.4-0.2 0.1-0.4 0.1-0.4 0.3-1 1.6-1.4 3.7-0.1 0.8 0.2 0.7 0.7 0.5 0.6 0.1 0.2 0.1 0.2 0.1 0.1 0.2 0.2 0.2 0.3 0.1 0.4 0.1 0.2 0.3-0.1 0.4-0.1 0.4 0.3 0.4-0.2 0.1-0.2 0-0.3 0.3-0.3 0-0.4-0.1-0.4 0.2-0.1-0.1-0.2-0.3-1.2-0.2-0.6 0.2-0.1 0.5-0.3-0.2-0.5 0.3-0.3-0.2-0.2-0.5-0.1-0.5-0.1-0.3-0.2-0.2-0.5-0.3-0.2-0.2-0.2-0.5-0.3-0.2-0.4-0.2-1 0.1-0.4-0.2-1.1-1-4.5-1.6-0.4-0.1-1.6-0.1-0.3-0.2-1.4-2.3-0.3-0.9-0.2-1 0.3-0.9 0.4-1 0.3-0.9-0.4-0.9-0.7-0.5-0.8-0.3-0.7-0.6-0.2-1 0.2-0.6 0-0.3-0.1-0.2-0.2-0.3-0.1-0.4-0.2-0.4 0-0.2 0-0.8-0.1-0.6-0.1-0.3-0.2-0.2-0.4-0.2-0.3-0.1-1.3-0.2-0.3-0.2-0.3 0-0.3 0.1-0.7-0.1-0.2-0.1-0.3-0.2-0.3-0.6-0.3-0.2-0.5 0.3-1.1 0.4-0.4 0.2-0.5 0.3-0.2 0-0.4 0-1.4 0-1.1 0.3-0.2-0.1-0.1-0.1-0.5-0.7 0-0.1-0.9-0.4-0.3-0.1-0.8 0.1-0.4 0.1-0.3 0.1-0.4-0.8 0-0.9 0.2-0.8 0.4-0.6 0.6-0.5 2.5-0.9 1.7-1.1 0.6-0.9-0.2-0.9-0.8-0.5-0.5-0.4 0.2-0.2 0.2-0.1 0-0.1-0.1-0.5 0-0.2 0.2-0.1 0.3-0.1 0.2-0.1 0.1-0.1 0.1-0.3 0.1-0.2 0.1 0 0.3 0 0.1 0 0.9-0.9 0.3-0.1 1 0 0.4-0.1 0.2-0.1 0.2-0.2 0.2-0.2 0.6-0.2 0.4 0.4 0.2 0.5 0 0.5 0.2 0.6 0.4 0.4 0.6 0.3 0.6 0.2-0.2 0.3-0.9 0.8 0 0.3 0.2 0.4 0.4 0.3 0.3 0.3 0.5 0.1 0.3 0 0.2-0.1 0.5 0 0.1 0 0.1 0.4 0.1 0.1 0.2 0.1 0.6-0.1-0.2-0.4-0.3-0.4-0.6-0.7-0.2-0.4-0.1-0.4 0.2-0.9-0.1 0-0.4-0.6 0-0.2-0.1-0.6-0.1-0.3-0.2-0.3-0.2-0.2-0.3-0.2 0.6-0.2 1.9 0 0.6-0.1 0.9-0.6z",    IDN1232: "M447.4 318.7l0.4 0.5 0.1 0.5 0.4 0.5 0.2 0.6-0.4 0.4-0.3 0.5-0.7-0.2-1.2-0.9-0.3-0.4-0.3-0.1-0.2-0.1 0.1-0.2 0.8-1 0.2-0.1 0.4 0 0.3-0.1 0.5 0.1z m-1.5-11l0.7 0.5 0.6 0.6 1.2 1.5 0.7 0.6 0.9 0.6 0.5 0.7-0.3 0.9-0.2 0.3-0.7 0.5-0.4 0.3-0.6 0.5-0.2 0.2-1.5 0.2-0.3 0.1-0.1 0.5-0.4 0.3-2.9 1-0.9 0.6-0.7 0.8-0.5 0.9-0.3 0.3-0.5 0.2-0.4 0.1-0.2 0.4 0 0.5 0.4 0.5 0.1-0.2-0.1-0.1-0.2-0.3 0.4-0.2 0.1 0.4 0 1-0.2 0.3-0.3 0.2-0.4 0.1-0.3 0.1-0.5 0-0.5 0-0.5-0.1-0.4-0.3 0-0.3 0.5-0.3 0.9-0.5 0.3-0.3 0.2-0.5 0.1-0.5-0.2-0.4-0.1-0.2-0.3-0.7-0.6-0.2-0.6-0.5-0.3-0.4-0.1-0.3-0.2-0.3-0.4-0.3-0.7-0.5-1.5-1.4-0.6-0.4-2.8-1.4-0.9-0.1-2.6 0-0.7-0.3-0.7-0.5-0.5-0.6-1.8-2.6-0.4-2.1 0.1-0.6 0.6-0.1 0.5 0 0.3 0.2 0.2 0.3 0.3 0.3 0.3 0.2 0.4-0.1 0.5-0.4 0.4 0.2 0.4 0.1 0.9 0.1 0.4 0.1 3.6 1.3 0.7-0.3 2 0 0.9-0.2 0.8-0.6 1.6-1.6 0.8-0.3 0.5-0.1 0.4 0.1 0.5 0.2 0.3 0.3 0.4 0.2 1.5 0.3 3.6 1.5z",    IDN1233: "M399.6 314.8l-1.7 0-0.2-0.1-0.1-0.4 0.1-0.3 0.3-0.3-0.2-0.3 1.1 0.3 1.2 0 0.3 0.2 0.1 0.3 0 0.3-0.1 0.1-0.2 0.1-0.6 0.1z m27.2-29.5l0 0.3-0.1 0.1-1.9-0.2-0.4 0-0.3 0-0.1-0.1 0-0.2 0.1-0.2 0.1 0 0.8-0.4 0.2 0 0.2 0 0.5 0.2 0.2 0.1 0.5 0 0.2 0.1 0 0.3z m27.6-0.5l0 0.8-0.4 0.5-0.8 0.2-1-0.1-0.8-0.5-0.3-0.4 0.2-0.2 0.2 0 0.2 0 0.2-0.5 0.1 0 0.1 0.2 0.1 0.2 0.2 0.2 0.1 0.1 0.3 0 0.5 0.2 0.6 0 0.2 0-0.3-0.2 0-0.3 0.1-0.2 0.1-0.1 0.2 0.1 0.1-0.3 0.1 0 0 0.3z m-32.5 0.1l-0.1 0.6 0 0.4-0.3 0-0.5-0.2-0.5-0.2-0.2-0.2-0.4 0-0.3-0.1-0.4-1-0.1-0.4 0.6-0.6 0.6-0.1 0.4 0.1 0.3 0.3 0.6 1 0.3 0.4z m-8.9-5.5l0.5 0.2 0.4 0.2 0.3 0.4 0.5 0.1 0.6 0.3 0.3 0.3 0.4 0.7-0.6 0.1-1 0.6-1.6 0.2-0.5 0.5-0.4 0.1-0.6 0-0.4 0.2-0.5 0.8 0.4 0.1 0.2 0.2 0 0.3-0.5 0.1-0.9 0.1-1.2-0.1-1.5-0.3-0.4 0-0.5-0.1-0.4 0.5-0.8 0-0.4 0.2-0.2 0.3-0.1 0.3-0.2 0.3-0.2 0.7-0.2 0.4-0.8 0.4-0.1-0.2-0.3-0.2-0.5-0.2-1.1 0.1-3.3-0.2-0.4-0.2-0.4 0-1 0.3-0.5-0.1-0.1-0.7-0.3-0.3 0-0.1 0.3-0.2 0-0.2-0.3 0-0.5-0.2-0.2 0-0.1 0.2 0 0.5-0.1 0.1 0.3 0.3 0.4 0.3 0.3 0.2-0.1 0.3-0.4 0.1-6.7-1.5-0.9-0.1-0.7 0.1-0.4-0.1-0.1-0.2-0.1-0.7 0-0.3 0.2-0.3-0.1-0.2-0.3 0.4-0.1-0.2-0.2-0.3 0-0.4 0-0.4 0.2-0.1 0.2-0.1 0.5-0.1 0.6-0.3 0.6-0.6 1.2-1.3-0.1-0.4 0.7-0.2 0.9-0.1 0.6-0.1 0.8 0.1 1.9-0.3 1.7 0.3 2.8 0 3.7-0.2 1.8 0.3 3.1-0.4 2.7 0.1 2.8-0.4 1 0.1 0.4 0.2z m30.2-1l1.8 0.2 0.5 0.2 1.5 0.8 0.4 0.3 0 0.6-0.3 0.2-1 0-0.2-0.1-0.4-0.2-0.4 0-0.3-0.2-0.2-0.1-0.1 0-0.1 0.1-0.2 0.1-0.1 0.1-0.3-0.1-0.3-0.2-0.2 0-0.7 0.3-0.1 0.1 0 0.2 0.2 0.1 0.3 0.1 0.2 0.1 0.3 0.2 0.2 0.2-0.5 0.4-0.5-0.2-0.8-0.6-0.3 0.3-0.1 0.2 0.1 0.2 0.1 0.2 0 0.1-0.2 0.2-0.2 0-0.1-0.1-0.5-0.4 0-0.2 0.3-0.8-0.9 0.1-0.3-0.1-0.2-0.2 0.1-0.6 0.2-0.2 0.3-0.3 0.3-0.4-0.2-0.3 0.2-0.2 0.5-0.1 0.4 0 1.8 0z m-96.3 30.5l0-0.2 0.4-1 0-0.3-0.1-0.5 0.2-0.4 0.3-0.4 0.4-0.3 0.8-0.5 1.4-1.2 1.1-0.6 0.6-0.3 0.3-0.2 0.5-0.4 0.3 0 0.5 0.3 0.2 0 0.4-0.3 0.1-0.8 0.4-0.9 0.1-0.5 0.1-0.9-0.1-0.3-0.1-0.2-0.3-0.3-0.5-0.6-0.3-0.2-0.2-0.1-0.8-0.1-0.3-0.2-0.1-0.3 0-0.4-0.1-0.4 0-0.1 0.1-0.2 0.5-0.4 0.1-0.2-0.2-0.3-0.2-0.4-0.3-1.2 0.4-2.7 0-0.4-0.1-0.7 0-1 0.1-0.9 0.4-0.4 0.6 0.1 0.3 0.2 0.4 0.1 0.2 0 0.4-0.1 0.1 0.1 0.3 0.1 0.3 0.2 1.4 0.5 0.9 0.1 0-0.2 0-0.2 0.3-0.4 0.3-0.2 0.4-0.3 0.6-0.4 0.4-0.3 0.3-0.4 0.9-0.8 0.3-0.2 0.1-0.2-0.1-0.2-0.2-0.9 0-0.3 0.1-0.7-0.1-1.9 0.5-2.6 0-0.4 0.2-0.5 0.8-1.4 0.1-0.1 0.5 0.5 0.5 0.3 0.5 0.3 1.4 0.3 1 0.1 0.3 0.1 0.4 0 0.5-0.1 0.7-0.4 0.4-0.1 0.4 0.1 0.7 0.8 1.3 1.6 0.4 0.3 0.5 0.1 0.9 0 0.9-0.2 0.8-0.2 0.2-0.1 0.9 0 0.4 0 0.9-0.3 0.5-0.1 0.8 0.1 0.3 0.2 0.5-0.3 0.4 0.1 0.4 0.3 0.3 0.3 0.3 0.2 0.5 0.1 0.4 0 0.3-0.2 0.2-0.4-0.1-0.5 0.2 0 0.3 0.1 0.1 0.1 0.2 0.2 0.1 0.4 0 0.5-0.3 0.9-0.1 0.5 0.1 0.2 0.5 0.8 0.2 0.1 0.2 0.1 0.3-0.1 0.3 0 0.2 0.3-0.7 0.2-0.4 0.2-0.1 0.2 0.1 0.2 0.1 0.4 0.3 0.3 0.2 0.2 0.3 0.1 0.4 0.4 0.2 0.5-0.1 0.3-0.3 0.2-1.4-0.2 0.4 0.5 0.5 0.4 1.2 0.5 0.4-0.3 0.3-0.4 0.3-0.4 0.5-0.1 0.4 0.1 0.3 0.3 0.2 0.4 0.3 0.6 0.1 0.3 0 0.3-0.2 0.8 0 0.4 0 0.9-0.2 0.4-0.8 0.6-0.2 0.4 0 1.8 1.8 1.3 2.7 1.2 0.4 0.1 0.6 0 0.4 0.1 0.5 0.1 0.4 0.4 0.8 0.7 0.4 0.4 0.7 0.1 0.5 0.2 0.3 0.1 0.2 0 0.4-0.1 0.3 0 0.4 0.2 0.5 0.7 0.3 0.1 0.6-0.1 0.4-0.1 0.7-0.5 0.8-0.4 0.5-0.2 0.5-0.1 0.3-0.1 0.7-0.4 0.5 0 2.9 0.4 0.2 0 0.4-0.2 0.2-0.1 0.5 0 0.9 0.4 0.5 0 0.4-0.1 0.3-0.2 0.4-0.5 0.4-0.2 0.3 0 0.4 0.1 0.5 0.1 0.4-0.1 0.4-0.1 1.5-1.3 0.6-0.2 0.7 0.4 0.9 1.1 0.5 0.5 0.7 0.3 0.5 0 0.9-0.3 0.5 0 0.3 0.1 0.8 0.8 0.3 0.2 0.2 0 0.3 0.1 0.5-0.1 0.2 0 0.2 0.1 0.4 0.4 0.8 0.4 0.3 0.4 0.2 0.4 0 0.5-0.2 0.9 0 0.2-0.3 0.4-0.1 0.3 0 0.2 0.2 0.5 0 1.1-1 3.1-0.8 4.4-0.1 0.6-0.1 0.5 0 0.2 0.1 0.3 0.2 0.5 0.1 1 0 0.4 0.3 0.2 0.3-0.2 0.1-0.6 0-1 0.3 0.4 0.1 0.7 0 1.5 0.2 0.4 0.2 0.5 0.4 0.3 0.3 0.1 0.5 0.1 0.2 0 0.6 0.4 1.1 0.4 0.2 0.3 0.2 0.2 0.2 0.3 0.2 0.4 0 0.5-0.6 0.8-0.9 0-1.9-0.6-0.5-0.1-1.2 0.1-0.5-0.2 0.1-0.3 0.5-0.6-0.2-0.8-0.8-0.7-1-0.4-0.9-0.1-0.8 0.6-0.6 0.2-0.2-0.2-0.2-0.4-0.6 0.1-1 0.3-0.2 0-0.8-0.1-0.1-0.1-0.2-0.4-0.2-0.1-0.5 0.1-0.4 0.2-0.3 0.1-0.2-0.4 0-0.2 0.1-0.3 0-0.3-0.2-0.1-0.2 0-0.5 0.2-0.2 0.1-0.4-0.1-0.6-0.1-0.5-0.3-0.4-0.3-0.2 0.2-0.2-0.2-0.1-0.7-0.2-0.2-0.3 0.1-0.4 0.1-0.3 0.2-0.2 0.2-0.2 0-0.3 0-0.1 0 0-0.4 0-0.2-0.3-0.2-0.4 0.1-0.4 0-0.3-0.2-0.4-0.6-0.2-0.1-0.7-0.2-0.1-0.1-0.3-0.3-0.1 0-0.7 0.1-0.3 0-0.8-0.5-0.3-0.3-0.1-0.3-0.1-0.1-0.5 0-0.3 0.2-0.4 0.1-0.4-0.2-1-1.2-0.5-0.4-0.9-0.4-0.9-0.2-1-0.1-2.7 0.4-1 0.2-0.8 0.4-1.1 1.3-0.8 0.5-0.7-0.3-0.3 0.1-0.5-0.4-0.1 0.3-0.2 0.1-0.2 0.1-0.2-0.1-0.2-0.1-0.1-0.1-0.4 0.2-0.3 0.3-0.1 0.1-0.3 0.1-0.4 0-0.3 0.1-0.3 0.2-0.4 0.3-0.3-0.2-1-0.4-0.8-0.2-1.2-0.4-1.7 0-0.3-0.1-0.3-0.1-0.3-0.2-0.5 0 0.2-0.3-0.4-0.4-0.6-0.2-0.5 0-0.5 0-0.2 0-0.6 0.3-0.3-0.1-0.1 0-0.2-0.2-0.4-0.2-4-0.4-0.5-0.1-0.7-0.5-0.2 0-0.6 0.4-0.1 0.2-0.2 0-0.5-0.2-0.5-0.5-0.3-0.1-0.6 0.1-0.2-0.1-0.5-0.2-0.2 0-0.2 0.1-0.2 0.4 0 0.5-0.1 0.3-0.4 0.1-0.1-0.1-0.1-0.2-0.1-0.3-0.2-0.1-0.2 0.1-0.1 0.2-0.2 0.4-0.2 0.3 0 0.2 0.3 0.2 0.1 0.2-0.1 0.1-0.3 0.1-0.5-0.1-0.4-0.2-0.3-0.3-0.2-0.5-0.1 0-0.3 0.3-0.3 0-0.8-0.4-0.3 0-0.3 0.2-0.3 0.1-1.5-0.4-0.2-0.3 0-0.3 0-0.2-0.4-0.2-0.1 0-0.4 0.2-0.2 0-0.1-0.1-0.3-0.2-0.2 0-1.1 0-0.3 0-0.1 0-0.2-0.2-0.2-0.1-0.2 0-0.2 0.1-0.1 0.1-1.8 0.5-0.2 0-0.1-0.4-0.2-0.2-0.2-0.1-0.2 0-0.3-0.2-0.1-0.2 0-0.3-0.1-0.2-0.2 0-0.2 0.4-0.3 0.5-0.1 0.1-0.2 0-0.9 0-0.4-0.1-1.2-0.5z m38.4-54.5l0.3 0.3 0.2 0.3 0.1 0.5 0 0.5-0.2 0.4-0.3 0.3-0.4 0.2-0.2 0-0.6 0-0.1-0.1-0.1-0.2-0.1 0.1-0.4 0.2-0.5-0.1-0.2-0.2-0.1-0.4-0.2-0.5 0.1-0.2 0.7-0.5 0-0.1 0.5-0.6 0.3 0.1 0.3-0.1 0.3-0.1 0.3 0 0.3 0.2z",    IDN1234: "M452.5 234.5l-0.5 0.1-0.2-0.3 0.4-0.6 1.3-1 0 0.1-0.2 0.4 0.1 0.2 0.2 0.1-1.1 1z m12.7-25.9l-0.1 0.1-0.4-0.4-0.8-1.3-0.2-0.3 0-0.3 0.2-0.5 0.5-1.1 0.1-0.4 0.1-0.3 0.6-0.5 0.1-0.3 0.2-0.4 0.2 0.2 0.4 0.6-0.1 0.8-0.4 1.6-0.1 1.2-0.2 0.8-0.1 0.5z m-5.8 8.6l-0.2 0.2-0.4 0.5-0.1 0.1-0.1-0.3-0.1-0.3-0.3-0.1-0.3 0.1-0.1-0.4 0-0.5 0.2-0.5 0.1-0.4 0.1-0.1 0.4-0.2 0.1-0.2-0.1-0.2-0.4-0.5 0-0.3 0.2-1.4-0.1-0.5-0.2-0.3-0.5-0.4-0.4-0.6-0.1-0.3-0.1-1.7 0-0.4 0.6-1.4 0.1-1.5 0.1-0.4 1-1.7 0.4-1.4 0.1-0.3 0.1-0.1 0.7-0.3 0.3-0.1 1.3-1.2 0.3-0.1 0.2-0.1 0.2-0.3 0.1 0 0.2 0.2 0 0.3-0.1 0.5-0.3 2.2 0.1 0.8 0.6 0.9 0.3 0.3 0.3 0.4 0.1 0.4-1 0.4-0.1 0.4 0.2 0.4 0.2 0.3 0.1 0.4 0.1 0.4-0.1 1 0.2 0.5 0 0.2 0 0.8 0.1 0.2 0.3 0.1 0.2 0.2 0 0.2-0.2 0.2-0.3 0.6-0.2 0.3-0.2 0.3 0 0.6 0.1 0.3 0.3 0.5 0 0.3-0.1 0.3-0.2 0.1-0.4 0-0.2 0.2-0.2 0.3-0.3 0.1-0.5 0-0.1 0.1-0.2 0.2 0 0.1 0 0.3-0.1 0.1-0.4 0.3-0.3 0.3-0.4 0.4-0.2 0.1-0.4 0.1z m9.7-36.3l-0.7 3.3-0.5 0.9-0.7 0.1-0.2-0.2-0.2-0.5-0.1-0.4-0.4-0.2-0.5-0.1-0.3 0.1-0.3 0.2-0.3 0.1-0.3-0.2-0.7 0.2-0.2 0-0.3 0.1-0.1 0.2 0 0.2 0 0.1 0.4 0.2-0.1 0.4-0.5 0.9 0.3 0.1 0.7-1 0.5-0.2 0.4 0 0.2 0.3 0 0.4-0.5 0.9-0.1 0.4 0.1 3.8-0.1 0.8-0.3 0.7-0.4 0.7-1 1.3-0.5 0.4-0.4 0.1-0.4-0.2-0.2-0.3-0.1-1-0.1-0.4-0.2-0.1-0.3-0.2-0.2-0.1-0.2-0.3-0.2-0.5-0.1-0.5 0-0.4 0-0.2-0.2 0-0.1 0.2-0.1 0.2 0.1 0.5 0 0.2-0.2 0.5-0.3 0.4-0.1 0.5 0.2 0.5 0.1 0.3-0.1 0.2-0.2 0.2-0.1 0.3 0.1 0.1 0.1 0 0.4-0.1 0.6 0.1 0.1 0.2 0 0.4 0.2 0.4 0.4 0.3 1.3 1 0.3 0.3-0.1 0.3-1 0.2-0.8 0.3-0.3-0.1-0.1 0.4 0.5 0.7 0.1 0.5-0.2 0.6-0.3 0.2-0.4 0.1-0.5 0.2 0.1-0.3 0.1-0.3 0.2 0 0.2 0.1 0.3-0.3 0.1-0.4-0.3 0-0.8 0.3-0.2 0.2-0.2 0.4-0.4 0.9-1.3 2.3-0.3 0.8-0.2 1.9-0.2 1-0.5 0.5-0.4 0.2-1.5 0-0.5 0.1-0.5 0.3-0.8 0.8-0.9 0.6-3.8 1.8-5.8 2.2-5.5 2.2-4 1.9-3.6 2.2-1 0.3-0.9-0.3-0.4-0.9 0.1-0.9 0.5-1.7-0.5-1.8-0.1-1.6 0.1-3.7-0.3-1-1.3-1.6-0.3-1 0-1 0.6-2.7-0.5 0.2-0.3 0.2-0.3 0.3-0.2 2.3-0.3 0.3-0.5-0.1-0.9-0.2-1-0.6-1.2-0.6 3.5-9.3 0.5-2.1 0.1-0.3 0.1-0.3 0.5-0.7 0.3-0.1 1.5-0.3 0.5-0.2 0.2-0.2 0.3-0.3 0.1-0.3 0-0.3 0.1-0.1 0.2-0.1 1.5-0.6 0.3-0.2 0.4-0.4 0.2-0.4 0.1-0.5 0-0.4 0.1-0.5 0.2-0.5 0.1-0.4 0.3-0.4 1-1.1 0.1-0.1 0.3-0.8 0.3-0.7 0.1-0.2 0.1-0.2-0.1-0.8 0-0.2-0.2-0.3-0.1-0.2-0.2-0.3-0.1-0.3 0-1 0.1-0.1 0.5-0.2 2.6-0.6 2.3-0.6 0.5-0.3 0.7-0.5 3.1-2.9-0.4-1 0-0.3 0.3-0.4 0.4-0.5 0.3-0.7 0.1-0.6-0.2-0.5-0.2-0.6-0.2-0.6 0.1-0.7 1.4-6.4 0.2-0.4 0.1-0.2 0.2-0.2 1.1-0.4 0.1 0 0.6-0.1 1-0.2 1.9-0.8 0.5-0.1 0.3 0 0.2 0.1 0 0.3-0.2 1-0.6 0-0.2 0.2-0.3 0.2-0.5 0.5-0.8 1.1 1 0.1 0.4 0 0.2 0.2 0.2 0.3 0.1 0.7 0 0.3 0.2 0.3 0.4 0.4 0.1 0.2 0.1 0.5 0.1 0.5 1 2.3 0.1 2.6-0.1 0.4-0.1 0.3 0 0.3 0 0.5 0.2 0.6 0.3 0.3 0.4 0.2 0.7 0.1 0.2 0.1 0.2 0.3-0.3 0.9-0.1 1.6 0 0.4 0.6 1.6 0.2 1.4 0.3 0.5 0.1 0.1 0.1 0.1 0.5-0.2 0.3-0.1 0.1-0.2 0-0.3 0.2-0.1 0.4-0.2 0.3-0.1 0.4-0.4 0.2-0.1 0.3-0.1 0.6 0.3 0.4 0.1 1.9 0.1 0.6 0.2 5.1 0.3 1.6 0.3 2.2 0.7 0.1 0z",    IDN1235: "M578.2 361.2l0.4 0 0.1 0 0.3 0.1-0.1 0.2-0.3 0.3-0.4 0.1-0.5 0.2-0.5 0-0.4-0.1-0.1-0.2 0.3-0.3 0.5-0.2 0.7-0.1z m38.5-0.7l-0.2 0.2-0.1 0.1 0.1 0.2 0.1 0 0.3 0 0.2 0 0.5 0.3 0.2 0.3-0.1 1-0.1 0.3-0.5 0-0.5-0.1-0.4 0-0.3 0.2-1.2 0.9-0.2 0.1-0.5 0.2-0.1 0.2-0.1 0.5-0.1 0.5-0.5 0.5-0.7 0.1-0.8 0.1-3.3 0.9-0.4 0.3-0.3 0.2 0.4 0.3 0 0.1-2 0.4-0.9 0-0.4-0.6-0.2-2-0.1-0.4 0.1-0.2 0.4-0.1 0.5-0.4 1.4-0.4 0.5 0 0.5 0 0.2 0 0.4-0.3 0.3 0 0.4 0 0.5-0.3 1.1-1 0.5-0.3 0.9-0.4 0.3-0.3 0.1-0.2 0.1-0.5 0.1-0.2 0.2-0.1 0.2 0 0.1 0 0.1-0.3 0.2-0.4 0.3-0.3 0.9-0.4 1.1-0.5 0.4-0.2 0.5-0.8 0.3-0.2 0.2 0.3 0 0.4-0.1 0.2-0.4 0.5 0.4 0.3-0.1 0.4-0.3 0.4 0 0.2 0.1 0.1-0.2 0.2z m-31-3.1l0.4 0.2 0.4 0 0.4 0.1 0.2 0.6-0.2 0.9-0.1 0.2-0.9 0.7-0.5 0.3-0.3 0.3-0.3 0-0.2 0-0.2 0.4-0.5 0.2-1.4-0.2-0.9 0.1-0.5-0.1-0.4-0.3-0.4-0.3-0.1-0.1 0.4-0.3 2.6-1.3 0.7-1.2 0.4-0.2 0.5-0.2 0.5 0 0.4 0.2z m32.9-4.7l-0.1 0.2-0.1 0.3-0.3 0.1-0.3-0.2-0.2-0.3-0.3 0.2 0.5 0.9 0.1 0.6-0.3 0.3 0.1 0.3-0.1 0.2-0.2 0-0.3-0.1 0-0.1-0.2-0.3-0.3-0.2-0.1 0.1-0.1 0.3-0.4 0.4-0.3 0-0.2-0.6 0-0.6 0.1-0.4 0.3-0.3 0.5-0.4 0.3-0.4 0.4-0.9 0.3-0.4 0.3-0.2 0.5-0.2 0.4 0 0.2 0.2 0.2 0.3 0.6 0.2 0.1 0.3-0.3 0.3-0.8 0.4z m-74.8-18.9l1.3 1.8 0.5 0.4 0.3 0.3 0.4 0.1 0.4 0.1 0.4-0.2 0.4-0.1 0.5 0.2 0.5 0.3 0.3 0.4 0 0.9 0.2 0.6 0 0.8 0.2 0.4 0.2 0.2 1.3 0.6 0.4 0.1 0.1-0.4 0.2-0.2 0.6-0.2 1-0.1 0.5 0 0.4 0.2 0.3 0.4 0.1 0.5 0.3 0.3 1.5 0.9 0.6 0.7 0.9 1.9 0.5 0.7 0.6 0.4 1.4 0.8 0.6 0.5 0.5 0.5 0.4 0.6 0.2 0.9-0.3 0.8-0.2 0.3-0.7 0.5-1 1-0.3 0.6-0.3 0.2-1.3 0.4-0.2 0.1-0.3 0.1-1.4-0.1-0.4 0.1-1 0.5-0.2 0.2 0 0.4-0.2 0.4-0.3 0.2-0.4 0-0.4-0.3-0.5-0.6-0.4-0.2-3.2-0.4-0.3 0-0.2-0.1-1.4-0.4-0.1-0.1-0.2-0.5-0.1-0.2-0.9-0.4-0.2-0.1-0.6-1-0.2-0.1-0.2 0.1-0.1-0.1-0.2-1-0.2-0.5-0.9-1.1-0.2-0.2-0.2-0.2-0.2 0-0.4-0.1-0.2 0-0.2-0.2-0.1-0.3-0.2 0.1-0.1-0.1-0.1-0.2-0.2-0.1-0.4-0.3-0.2 0-0.9-0.1-0.3-0.1-0.8-0.6-1.3-0.7-0.2-0.3-0.1-0.6-0.2-0.3-0.9-0.2 0-0.5-0.1 0-0.4 0.2-0.5-0.1-1.1-0.1-0.8-0.3-0.5-0.1-0.4 0-0.4 0.1-0.4 0.2-0.2 0.2-0.2 0.4-0.4-0.2-0.9-0.6-0.1 0-0.3 0.2-0.2 0-0.1-0.1-0.6-0.4-0.5 0.1-0.9 0-0.9-0.1-0.9-0.4-0.9-0.1-0.3-0.2-1-0.7-0.2-0.4-0.4-0.7-0.2-0.2-0.3-0.3-0.6-0.4-0.4-0.3-0.1-0.4 0.2-0.6 0.3-0.6 0.5-0.5 1-0.9 0.5-0.3 0.6-0.2 0.7 0 0.3-0.1 0.6-0.4 0.4-0.1 0.8-0.2 0.7 0 0.2 0 0.3-0.2 0.1-0.1 0.8 0 1.8 0.3 0.2 0 0.3-0.2 1-0.2 0.5 0 0.8 0.4 0.3 0 0.4-0.3 0.5-0.2 1.3-0.3 0.4 0 0.3 0.2 0.1 0.2 0.3 0.3 2.6 0.2 0.4-0.1 2.8-2 0.2 0.1 0.1 0.5 0.2 0.2 0.9 0.8z m111.6-4.1l0 0.1 0 0.2-0.2 0.1-0.5-0.1-0.3 0-0.3 0.2-0.2 0.2-0.2 0.1-0.3 0-0.2-0.1-0.2-0.2-0.2-0.2-0.1 0-0.5 0-0.7 0.1-0.3 0.5-0.1 0.6 0.1 0.8 0.2 0.4 0.1 0.2 0.5 0.5 0.5 0.3 0.1 0.1 0 0.1 0 0.4 0 0.1 0.5 0.8 0.1 0.3 0.2 1.4-0.6 0.5-0.7 0.6-0.3 0.9-0.1 1.6-0.2 0.3-2.1 1.4-0.6 0.5-2 2.2-0.2 0.8-0.3 0.3-1.2 0.7-0.8 0.6-0.7 0.6-1.1 0.7-0.4 0.4-0.3 1.1-0.3 0.2-0.3 0.4-1 0.8-0.7 0.3-0.9 0.2-2.3-0.1-1.6 0.2-0.7 0.1-0.3 0-0.4-0.2-0.3 0-0.3 0.3-0.4 0.9-0.2 0.2-0.5 0.1-0.2 0.2-0.1 0.3-0.2 0.3-0.3 0.1-1.9 0.3-2.3 1.6-0.6 0.2-0.2-0.1-0.2-0.3-0.5 0.1-0.8 0.2-0.5-0.1-0.4-0.2-0.4-0.2-0.4 0.2-0.5 0.2-0.4-0.1-0.6-0.5-0.3-0.1-0.5-0.1-0.4 0.1-0.3 0.4-0.2 0.2-0.3 0.1-0.2 0-0.1-0.2 0.1-0.3 0.3-0.4 0.2-0.5 0-0.4 0-0.9 0.1-0.3 0.4-0.4 0.6-0.6 1.1-0.4 0.4-0.2 0.1-0.1 0.8-0.1 0.2-0.1 1.8-1 0.4-0.5-0.4-0.6-0.5-0.2-0.4-0.2-0.5-0.1-0.5-0.1-0.5 0.2-0.7 0.5-0.4-0.1-0.2-0.3 0-0.5 0.1-1.5 0.2-0.3 0.8-0.5 0.5-0.4 0.2-0.4 0.1-0.5 0-0.5-0.1-0.2-0.3-0.5-0.1-0.3 0.1-0.1 0.3-0.2 0.1-0.1 0.1-0.5 0-2 0.2-0.4 0.2-0.4 0.5-0.5 0.8-0.4 0.2-0.1 0.6-0.9 0.2-0.2 0.6-0.2 0.1-0.1 0.2-0.3 0.2-0.1 0.4 0 0.7-1 0.3-0.2 0.1-0.1 1-0.9 0.4-0.6 0.3-0.2 0.4-0.1 0.4-0.1 0.7 1.3 0.6 0.5 0.7 0.1 0.3-0.2 0.4-0.6 0.3-0.2 0.4-0.2 0.3 0 0.3 0.1 0.3 0.3 0.2 0.3 0.2 0.4 0.2 0.4 0.1 0.3-0.1 0.6 0 0.4 0.4-0.1 0.4 0 0.4-0.1 0.3-0.2 0.2-0.3 0-0.2-0.1-0.4 0-0.2 0.1-0.1 0.2-0.3 0.1-0.2 0-0.7 0.2-0.2 0.4-0.1 0.6-0.6 0.4-0.5 0.2-0.2 0.1-0.2 0.1-0.8 0.3-1.2 0-0.4 1.4-0.1 1-0.1 0.9-0.4 1.4-0.9 0.3-0.9 0.2-0.1 1.4-0.4 0.2-0.2 0.5-0.5 0.8-0.2 0.3-0.2 0.7-0.1 0.6-0.5 0.4-0.2 0.1 0.5-0.3 0.7 0 0.4 0.1 0.4 0.2 0.2 0.2 0.2 0.4 0.1 0.3 0 0.3-0.1 0.6-0.4 1-0.4 0.3-0.3 0.1-0.1 0.1-0.5 0.1-0.1 0.2-0.1 0.3 0.3 0.4 0.3 0.4 0.2 0.3 0.4 0.2 0.4 0 0.5-0.4 1.4 0.1 0.2 0.1 0.4z m-118.9-11.3l0.4 0.2 0.3-0.2 0.2-0.4 0.1-0.4 0.3-0.1 0.7 0 0.5 0.1-0.1 0.4-0.6 0.5-0.3 0.2 0.1 0.3-0.3 0.1-0.3 0-0.3 0.1-0.1 0.2 0 0.4 0.4 0.4 0 0.5-0.1 0.2-0.3 0.4-0.1 0.2-0.2 0-0.2-0.2-0.3-0.2-0.1-0.2-0.1-0.1-0.3 0.1-0.2 0.1-0.2 0.1-0.2-0.1-0.2-0.2 0.2-0.6 0.1-0.2 0.3-0.1-0.2-0.3 0.4-0.2 0.3-0.2 0.1-0.2-0.5-0.2 0.2-0.4-0.5-0.9 0.2-0.5 0.4 0.4 0.2 0.1 0.1 0.2 0 0.5 0.2 0.2z m59.3-3.8l-0.7 0.4-0.5-0.5-0.2-0.7 0.4-0.4 0.6 0.1 0.5 0.2 0.2 0.3-0.3 0.6z m-63.8-0.1l0.2 0.1 1.1-0.1 0.4 0 0.3 0.1 0.2 0.3 0.1 0.2-0.1 0.1-0.2 0.1 0 0.3 0.4 0.4 0.2 0.3-0.4 0.1 0 0.2 0 0.2 0 0.1-0.7 0.1-0.3-0.1-0.2-0.4-0.2-0.1-0.3 0.1-0.3 0.4-0.2 0.1-0.3 0 0.2 0.3 0.1 0.1 0.2 0 0.1-0.2 0.2 0.1-0.3 0.6-0.1 0.2-0.2 0.1-0.2-0.1-0.2 0.2-0.1 0.5 0 0.3 0.2 0.4 0.1 0.4 0.3 0.3-0.5 0.1-1-0.4-0.4 0.3 0-0.1-0.1-0.3 0.1-0.3 0.4-0.7 0-0.2 0-0.6 0-0.1-0.3-0.1-0.1-0.1 0-0.6-0.1-0.6 0.1-0.1 0.1-0.3 0.2 0 0.3 0.1 0.1-0.1 0.2-0.4 0-0.2-0.1-0.7 0.2-0.2-0.1-0.3-0.2-0.6 0.2-0.1 0.7-0.3 0.1 0.3 0.1 0.5 0.1 0.4z m80.4-1.1l0.2 0.3-0.1 0.3-0.3 0.3-0.9 0.3-1.8 0.1-0.7 0.4-1.1 1.7-0.5 0.4-0.4 0.1-0.2-0.1-0.5-0.5 0.6-1.5 2-1.4 0.2 0 0.4 0.1 0.3-0.1 0.7-0.2 0.2 0 0.4 0 0.3 0 0.5-0.3 0.1 0 0.6 0.1z m-31.3-1.8l-0.5 0.1-0.3-0.2-0.4-0.8 0.2-0.1 0.3-0.2 0.3-0.1 0.5 0.1 0.2 0.4 0 0.5-0.3 0.3z m33.8-2.3l0.6 0.4 0.1-0.2 0.2 0 0.3 0.1 0.1 0.2 0.1 0.3-0.4 0.4-0.1 1.5-0.2 0.4-0.7 0.4-0.9 0-1.8-0.3-1.8 0.4-0.8 0.1-0.5-0.5 0-0.7 0.4-0.6 1.9-1.6 0.3-0.2 0.4-0.1 0.7-0.2 0.3 0 0.7 0 0.6 0.1 0.5 0.1z m14.2 0l-0.1 0.5-0.1 0.1-0.2 0.1-1 0.2-1.4 0.1-0.5 0.1-0.3 0.2-0.2 0.4-0.3 0.8-0.5 0.8-0.9 0.9-0.2 0.1-0.2-0.3-0.1-0.3-0.2-0.2-0.3 0.2-0.4 0.3-0.3 0.4-0.2 0.3-0.1 0.1-0.5 0.2-0.1 0.2 0.1 0.2 0.8 1-0.3 0.4-0.3 0.3-0.4 0-0.4 0-0.2-0.1-0.5-0.7-0.3-0.2-1 1-0.2 0.1-0.3 0.3-0.2 0.1-0.3 0-0.2-0.1-0.3-0.4-0.8-0.5-0.5-0.2-0.3 0.3-0.2 0.1-0.4 0-0.1 0-0.5-0.3-0.2 0.2-0.1 0-0.3-0.5 0.6-0.7 1.3-0.9 0.9-0.9 0.4-0.2 0.3 0 1.7-0.8 0.3-0.2 0.1-0.2 0-0.4-0.3-0.2-0.7-0.1-1.5 0-0.1-0.3 0.3-0.3 0.4-0.4 0.4-0.1 0.2 0.1 0.4 0.1 0.3 0.1 0.2-0.3 0.3 0 0.5-0.5 0.3-0.1 0.5 0.1 0.6 0.1-0.1 0.1 0 0.4-0.1 0.2-0.1 0.2-0.6 0.6-0.2 0.4 0 0.4 0.2 0.2 0.4 0.2 0.5 0.1 0.5-0.1 0.3-0.2 0.1-0.4-0.2-0.3-0.3-0.3-0.1-0.2 0.4-0.3 0.3 0.3 0.3 0 0.2-0.3 0.1-0.4-0.1-0.3-0.3-0.4 0.1-0.2 0.3-0.3 0.2 0 0.1 0 0.2 0.1 0.1 0.3 0 0.2 0.3 0.1 0.4 0 0.2-0.2-0.1-0.2 0-0.2 0.5-0.1 0.5-0.3 0.3-0.3 0.7-0.3 0.3 0 0.1 0.2 0.1 0.1 0.4 0.3 0.2 0.1 0.3 0.1 0.5 0.1 0.9 0.1 0.2 0.1 0.1 0.3z m6.3 3l-0.3 0.5-0.2 0.4-0.2 1-0.2 0.5-0.2 0.5-0.3 0.3-0.4 0.3-0.4 0.2-0.5 0.1-0.5 0-0.5-0.1-0.2-0.2 0.1-0.9-0.1-0.4-0.4-0.5-0.1-0.3-0.2-0.3-0.4 0-0.5 0.1-0.8 0.5-0.4 0-0.3-0.1 0.1-0.3 0.4-0.3 0.8-1.4 0.4-0.5 0.8-0.6 0.4-0.2 0.3 0.1 0.4 0.3 0.2 0.6 0 0.1 0.3 0.5 0.3 0.2 0-0.5 0.2-0.3 0.6-0.4 0.8-1.3 0.4-0.4 0.6-1 0.3-0.3 0.3-0.3 0.2 0 0.4 0.1 0.2 0.2 0.3 0.6-0.3 0.8-0.1 0.5 0.1 0.4 0.1 0.4-0.4 0.5-0.8 0.5-0.3 0.4z m7.3-5.5l0.4 0.3 0.1 1 0.3 0.4 0.8-0.6 0.5-0.2 0.5-0.1 1.9-0.2 2.7 0.2 0.8-0.2 0.4-0.2 0.3 0.1 0.3 0.2 0.3 0.1 1.1-0.2 0.7 0 0.3 0.1 0.2 0.2 0.5 0.8 0.2 0.2 0.1 0.4 0 1.9-0.1 0.4-0.2 0.3-0.5 0.1-0.5 0-1.2 0.3-2 0.1-3.6 0.7-0.9 0-1.2-0.1-0.4 0-0.2 0.1-0.5 0.3-0.5 0.1-0.4 0.2-0.4 0.1-0.3 0.1-0.1 0-0.3-0.2-0.1-0.1-0.4 0-0.4 0-0.8 0.4-0.2 0.3-0.2 0.1-0.2-0.1-0.3-0.3-0.2-0.1-0.1 0.1-0.5 0.2-0.3 0-0.1-0.2-0.1-0.2-0.2-0.2-0.1-0.4 0.3-0.4 0.7-0.5 0.2-0.3 0.4-0.8 0.1-0.3 1.3-0.9 0.7-0.1 0.2 0 0.5-0.4 0.2-0.1 0.1-0.2 0-0.2-0.2 0-0.5 0.1-0.5 0.2-1.6 0.7-0.6 0 0.1-1 0.2-0.2 0.3-0.2 0.3-0.3 0.1-0.3 0.1-0.3 0.2-0.3 0.2-0.2 0.3-0.2 0.5 0.2 1-0.2 0.5 0z m-34.4 0.7l-0.1 0.7 0.6 1.5 0.3 0.4 0.1 0.2 0.1 0.2-0.1 0.5-0.1 0.3-0.4 0.1-1.3 0.1-0.4 0.1-0.4 0.3-0.2 0.6 0.2 0.8 0 0.4-0.2 0.3-0.4 0.1-0.5-0.2-0.5-0.2-0.2-0.2-0.1-0.2-0.1 0-0.2 0.2-0.1 0.3 0 0.4 0.2 0.4 0.9 1.5 0 0.6-0.9 0.6-0.2 0.1-1.1 0.1-0.2 0.1-0.2 0.3-0.2 0-0.7-0.1-0.2 0-0.5 0.3-0.1 0.2-0.3 0-1.6 0.3-0.2 0.2-0.6 0.6-0.3 0.2-1.4 0.5-0.9 0.1-2.2 0-0.4 0-0.5 0.2-0.3 0-0.5-0.3-1.4-0.2-1.1 0.1-0.8 0.5-0.7 0.6-0.8 0.4-2.8 0.8-0.9 0.5-0.9 0.5-0.3 0.1-0.2 0-0.5-0.1-0.3 0-0.4-0.2-0.4-0.3-0.2-0.2-0.3 0.3-0.3 0.8-0.3 0.1-0.1-0.2-0.3-0.9-0.2-0.4-0.8-0.4-0.9-0.1-0.9 0.1-0.9-0.2-0.8-0.2-0.6-0.1-0.3 0.1-0.3 0.4 0.1 0.5 0.1 0.5 0 0.4-0.8 0.8-0.9 0-1.9-0.6-1 0.1-0.8 0.3-1.3 0.7-0.4 0.1-1.2-0.1-0.6-0.2-0.2-0.1-0.5 0-0.2 0-0.4-0.3-0.9-1-0.2-0.3-0.2-0.5-0.3-0.3-0.4-0.1-0.5 0.2-0.2 0.3-0.2 0.4-0.2 0.2-0.3 0.2-0.5-0.1-0.3-0.2-0.3-0.2-0.3-0.1-0.3 0-0.4 0-0.2 0-0.4-0.4-0.2-0.1-0.3-0.5-0.2-0.1-0.3-0.1-0.5 0-0.5 0-0.9 0.2-0.5 0-0.7-0.1-0.2 0-0.5 0.1-0.2 0-0.3-0.1-1.3 0.8-0.9-0.1-0.8-0.1-0.4-0.2-0.9-0.8-0.4-0.2-0.4 0-0.3 0.1-0.8 0.4-0.8 0.2-1.8 0.3-0.6 0.4-0.2 0-0.1 0.2 0.2 0.3 0 0.1-0.2 0.1-0.3 0.2-0.3 0-0.1-0.2-0.2-1.2-0.2-0.1-0.5-0.1-0.5-0.2-0.3-0.2-0.2-0.4-0.2-0.5 0-3.2 0.1-0.6 0.2-0.5 1.1-1.1 0.1-0.5-0.1-0.5-0.1-0.8 0.7 0.7 0.5 0.4 0.3-0.2 0.6-0.3 0.3-0.1 0.2 0.1 0.1 0.1 0.3-0.1 0.1-0.3 0.2-0.5 0.2-0.4 0.2 0 0.4 0.1 0.3-0.1 0.2 0 0.2 0 0 0.3 0.2 0 0.3-0.2 0.1-0.2 0-0.3 0.2-0.4 0.3 0.3 0.1 0.2 0.2 0 0.2-0.5 0.8-0.7 0.1-0.4 0.3-0.1 1.3-0.6 2.2 0.2 0.3-0.2 0.5-0.7 0.2-0.2 0.3 0.1 0.2 0.4 0.1 0.3 0.2 0.3 0.5 0.1 0.9-0.6 0.4 0.3 0.2 0.1 0.4 0.2 0.3 0.1 0.2-0.1 0.2-0.2 0-0.3-0.2-0.5 0.9 0.3 0.4 0.3 0.2 0.3 0.2 0.4 1.2 0.6 0.4 0.2 1.5-0.2 0.4 0.1 0.3 0.2 0.5 0.1 0.9 0.1 1-0.2 0.4 0 0.4 0.3 0.5 0.6 0.3 0.4 0.5 0.2 1.1 0.4 0.5 0.1 0.4 0 0.3 0.1 0.1 0.1 0.2 0.1 0.6 0 0.2 0 0.2 0.1 0.2 0.3 0.9 0.1 0.2 0.1 0.2 0.2 0.6 0.8 0.5 0.3 0.9 1 0.6 0.2 0.4 0 0.2-0.2 0.3-0.1 0.5 0 0.4 0.2 0.1 0.1 0.1 0.4 0.2 0.1 0.3-0.2 0.1-0.1 0.8-0.5 0.2 0 0-0.4 0-0.3 0.2 0 0.5 0.1-0.1-0.4 0-0.6 0.2-0.4 0.3-0.2 0.3 0.1 0.9 0.9 0.4-0.1 1.2-0.4 0.4-0.1 0.3 0.1 0.2 0.1 0.3 0 0.1-0.1 0.5-0.4 0.3 0.3 0.5 0.1 0.4 0.1 0.9-0.5 0.2-0.1 0-0.2 0.1-0.1 0.8-0.2 0.2-0.1 0.3-0.3 0.3 0 0.2 0.1 0.2 0.2 0 0.2-0.3 0.3-0.1 0.4 0.1 0.4 0.3 0.3 0.2 0.1 0.5-0.1 0.2 0 0.3 0.1 0.4 0.3 0.3 0.1 0.3 0.1 1.9 1.7 0.7 0.3 0.6 0.1 3.5-0.7 0.6-0.2 0.5-0.4 0.3-0.5 0-0.6-0.2-0.1-0.3-0.1-0.1-0.1-0.1-0.2 0.1-0.4 0.2-0.2 1.1-0.5 0.3-0.3 0.8-1 0.4-0.2 0.8 0 0.4-0.2 0.4 0.2 0.3-0.1 0.4-0.3 0.3-0.1 0.5 0 0.3-0.2 0.5-0.7 0.6-0.4 1.3-0.4 1.4-1.5 0.1-0.3-0.2-0.2-0.5-0.1-0.9-0.1-0.5 0.1-0.5 0.3-0.5 0.3-0.4 0.3-0.1 0-0.8 0.1-0.1-0.1-0.1-0.2 0.1-0.3 0.7-1 0.1-0.3 0.1-0.5 0.2-0.3 0.9-0.5 0.4-0.3 0.2-0.1 0.3 0 0.2 0.1 0.2 0.4 0.1 0.1 0.4 0.1 0.4 0.2 0.6 0.4 0.3 0.4 0.1 0.3z",    IDN1236: "M582.8 290.9l-0.7 0.3-0.4-0.1-0.1-0.4 0-0.4 0.1-0.3 0.2-0.3 0.3-0.2 0.8-0.2 0.4 0.5 0 0.7-0.6 0.4z m-20.4-2.9l2 0.2 1.3 0 0.6 0.1 0.4 0.4-0.2 0.4-0.7 0.2-0.7 0-0.3-0.1-0.3-0.3-1.4-0.2-0.4-0.2-0.4 0.1-0.5 0.1-0.5-0.1-0.4-0.1-0.1-0.2-0.1-0.2 0.1-0.1 0.1-0.2 0.3-0.1 0.5 0 0.7 0.3z m-2.7-4.3l0.3 0 0.3-0.4 0.2 0 0.1 0.3-0.1 0.4-0.2 0.6 0 0.3-0.7 0.1-0.8-0.1-0.4-0.2-0.1 0.4-0.2 0.2-0.8-0.4-0.3-0.5 0.1-0.3-0.6 0.1-0.4-0.2-0.3 0.1-0.2-0.5 0.2-0.1 0.6 0.3 0.5-0.2 0.1-0.6-0.1-0.5 0.1-0.5 0.3 0.2 0.4 0.1 0.5 0.7 1.2 0.5 0.3 0.2z m-5.5-13.2l-0.2 0.1-0.2-0.9-0.2-0.7 0-0.4 0.2-2.4-0.1-0.3-0.2-0.1-0.2 0-0.1-0.2 0-0.5-0.3-0.7 0-0.2 0-0.2 0.3-0.5 0.1-0.3 0-1.3-0.2-2.2 0.2-2.9 0.2-1 0.2-0.7 0.3-0.1 0.1 0.1 0.2 0.1 0 0.2 0 0.5 0.2 0.4 0.2 0.3 0.1 0.3 0.1 0.5 0.5 1.4 0.2 0.9 0.1 1 0 0.9-0.2 1-0.5 1.3 0 0.5 0.1 1.2-0.1 0.8-0.1 1.1-0.2 0.4-0.3 0.4 0 0.4 0.1 0.9-0.1 0.4-0.2 0.5z m24-76.3l-1.3 0.8-0.5 0.2-0.3 0.1-0.3 0-0.2-0.1-1-0.5-1.8-1.5-1.5-1-0.4-0.2-0.4-0.1-0.3 0-0.5 0-0.9 0.1-0.8 0.3-0.9 0.5 0-0.1-0.1-0.7-0.2-0.4-0.3 0.2-0.1 0-0.1-0.2-0.2-0.6-0.1-0.2-0.2 0.1-0.2 0.5-0.1 0.1-0.2 0-0.2-0.1-0.1-0.2-0.1-0.2 0.1-0.3 0.3-0.1 0.4-0.1 0.1-0.5 0.3 0.1 0.3-0.1 0.3-0.6 0.3 0.2-0.7-1.4-0.3-0.1 0-0.1-0.1-0.2-0.3-0.3-0.2-0.1-2.7-0.4-0.4 0.1-0.2 0-0.3-0.2-0.2-0.2-0.2-0.1-0.5-0.2-0.5 0-0.3 0.2-0.3 0.2-0.3 0.1-0.5 0-0.4 0.1-1.1 0.6-0.4 0.1-0.4 0.1-0.5 0.1-0.2 0.3-0.1 0.4-0.2 0.3-0.4 0.4-5.4 3.4-0.9 0.7-0.4 0.3-0.7 0.2 0.2 0.3 0.3 0.3 0.1 0.3 0 0.3 0.1 0.3 0.1 0.2 0.2 0.1 0.3 0.2 0.3 1.1 0.2 0.5-0.1 0-0.3 0.4 0.4 0.4 0.5 0.3 1 0.3 0.6 0.4 0.2 0.2 0.1 0.5 0.1 0.3 0.2 0.1 0.4 0-0.1 0.2-0.3 0.4-0.1 0.3 0.1 0.7-0.1 0.3-0.2 0.8 0.1 0.2 0.2 0.5 0 0.2 0 0.2-0.1 0.4-0.1 1.1 0 0.4 0.4 1 0.1 0.4 0 1.8 0.1 0.1 0.4 0.4 0 0.9-0.3 0.8-0.9 1.3-0.4 0.7-0.3 0.8-0.1 0.8 0 3.6 0.1 0.4 0.4 0.8 0.1 0.3 0 0.9 0 0.2-0.1 0.4 0 0.3 0 0.3 0.3 0.7-0.1 0.7-0.5 1.3 0.1 0.8 0.5 0.6 0.3 0.4-0.1 0.4-0.1 0.4 0 0.5 0.1 0.6 0.1 0.4 0.2 0.4 0.7 0.7 0.1 0.4-0.1 0.3-0.2 0.1-0.4 0.4 0 0.2-0.5 2.1 0 0.5-0.2 0.4-0.4 0.2-0.5 0-0.4 0.1-0.4 0.6 0 2.7-0.5 2.6-0.2 0.5-0.2 0.3 0.9 1.4 0.2 0.3 0.3 0.9 0.1 0.3 1 1.2 0.2 0.3 0 0.5 0.9 3.4 0.1 0.8 0.1 0.2 0.4 0.6 0.1 0.4-0.1 0.1-0.6-0.3-0.3 0.1-0.8-0.9-0.1-0.2-0.1-0.3-0.4-0.7-0.1-0.2-0.6 0-0.5 0.2-0.5 0.3-0.5 0.1-1 0.2-0.1 0.1-0.6 0.4-0.4 0.1-0.8 0.3-0.4 0.1-0.1-0.1-0.5 0-1.3-0.2-0.3-0.2-0.3-0.1-0.5-0.1-0.6 0.1-0.4 0.1-0.4 0.2-0.9 0.9-0.1 0.2-0.1 0.5-0.1 0.2-0.4 0.4-0.4 0.3-0.7 0.1-1.1 0.1-1-0.1-0.6-0.4-0.1-0.5 0-0.5-0.2-0.4-0.5-0.2-0.5 0.3-0.2 0.5-0.2 0.3-0.4-0.3-0.1-0.3 0-0.5 0-0.3-0.2-0.2-0.2-0.1-0.2-0.2 0-0.3-0.4 0-0.6 0.1-0.4 0.3 0.3 0.4-0.5 0-0.3-0.1-0.2-0.3 0-0.5 0.1-0.2 0.1-0.2 0.1-0.3-0.1-0.2-0.2-0.2-0.2-0.4-0.7-1.1-0.5-0.8-0.1-0.9 0.1-1 0.2-0.7 0.2-1.4 0.1-0.5 0.3-0.7 0.2-0.7 0.1-0.2 0.2-0.2 0.4-0.2 0.2-0.1 0.3-0.5 0.1-0.3 0.1-0.8 0.3-0.8 0.8-1.5 0.1-0.7-0.7-2.8 0.1-0.8 0.1-0.1 0.4-0.2 0.1-0.1 0.3-0.7 0.1-0.3 0.9-1.6 0.2-0.4 0.3-3.1 0.4-1.5 0-0.8 0-0.2-0.2-0.9-0.3-0.3-0.1-0.2 0.1-0.4 0.5-0.8 0-0.5-0.2-0.9-0.2-0.4 0-0.2 0.2-0.4 0.1-0.2 0-0.2-0.1-0.4 0.1-0.3 0.5-0.7 0.1-0.3-0.4-0.2-0.5 0.1-0.1 0.3-0.1 0.3-0.1 0.5-0.1-0.3-0.1-0.9-0.4-0.7-1-2.4-0.5-0.7-0.2-0.9-0.7-0.9 0-0.3 0.3-0.6 0.3-1.2 0.2-0.4 0.4-0.4 0.1-0.4-0.1-0.3-0.3-1.1-0.1-0.2-0.2-1.3-0.4-1.3-0.1-0.3 0-0.8-0.1-0.8-0.3-0.3-0.5-0.7-0.1-0.2 0-0.2 0-0.3 0.2-0.2 0.2-0.1 0.2-0.1 0.2 0.1 0.3 0.1 0.2 0 0.3-0.1 0.4-0.2 0.8-0.5 0.4-0.2 0.5-0.2 0.9-0.2 0.3-0.2 0-0.2-0.1-0.3-0.6-0.8-1.4-3.3-0.1-0.4 0-0.5 0-0.4 0.1-0.5 0-0.2 0-0.3-0.6-1 0.4-0.1 0.6-0.1 0.4 0 0.4 0 0.8 0.2 0.6 0 1.4-0.4 0.9-0.4 0.2-0.3 0.2-0.2 0-0.2-0.1-0.2-0.3-0.3 0-0.2 0-0.2 0.1-0.5 0-0.2-0.7-1.1-0.1-0.8 0-0.5 0-0.4-0.2-0.2-0.2-0.3 0-0.3 0-0.2 0.2-0.6 0.1-0.3-0.1-0.3-0.1-0.3-0.3-0.4-0.8-0.6-0.2-0.1-0.5-0.2-0.3-0.2 0-0.2 0-0.3 0-0.4 0.1-1 0.1-0.4 0.2-0.4 2.4-2.1 0.3-0.1 0.2 0.1 0.3-0.1 0.2-0.1 0.3-0.2 0.2-0.3 1.1-2 0.8-0.4 1.2-0.8 1.8-0.9 0.4-0.1 0.7 0 1.2 0.1 3 0.9 0.7 0.1 0.4-0.1 0.2-0.2 0.1-0.2 0.2-0.5 0.1-0.2 0.3-0.2 0.4-0.1 0.5 0.2 0.4 0.4 2.3 3.5 0.8 0.9 0.8 0.8 3 2.5 0.9 0.4 11.8 2.4 1.1 0.4 1.1 0.5 0.5 0.3 0.4 0.3 1.2 1.5 1.3 1.2 0.7 0.4 2.3 1.1 0.4 0.4 0.3 0.4 0.2 0.5 0.2 0.6 0 0.4 0 0.5-0.1 0.4-0.1 0.4-0.3 0.6-3.4 3.4-0.4 0.3z",    IDN1237: "M540.8 172.1l-1.1 2-0.2 0.3-0.3 0.2-0.2 0.1-0.3 0.1-0.2-0.1-0.3 0.1-2.4 2.1-0.2 0.4-0.1 0.4-0.1 1 0 0.4 0 0.3 0 0.2 0.3 0.2 0.5 0.2 0.2 0.1 0.8 0.6 0.3 0.4 0.1 0.3 0.1 0.3-0.1 0.3-0.2 0.6 0 0.2 0 0.3 0.2 0.3 0.2 0.2 0 0.4 0 0.5 0.1 0.8 0.7 1.1 0 0.2-0.1 0.5 0 0.2 0 0.2 0.3 0.3 0.1 0.2 0 0.2-0.2 0.2-0.2 0.3-0.9 0.4-1.4 0.4-0.6 0-0.8-0.2-0.4 0-0.4 0-0.6 0.1-0.4 0.1 0.6 1 0 0.3 0 0.2-0.1 0.5 0 0.4 0 0.5 0.1 0.4 1.4 3.3 0.6 0.8 0.1 0.3 0 0.2-0.3 0.2-0.9 0.2-0.5 0.2-0.4 0.2-0.8 0.5-0.4 0.2-0.3 0.1-0.2 0-0.3-0.1-0.2-0.1-0.2 0.1-0.2 0.1-0.2 0.2 0 0.3 0 0.2 0.1 0.2 0.5 0.7 0.3 0.3 0.1 0.8 0 0.8 0.1 0.3 0.4 1.3 0.2 1.3-0.1-0.1-0.5-0.1-0.2-0.2-0.5 0.1-0.6-0.3-0.7-0.4-0.6-0.2-0.7-0.1-0.3 0-0.1 0.1-0.2 0.3-0.9 0.7-0.3 0.2-0.4 0.1-0.4-0.1-0.4-0.1-0.4-0.1-0.3 0.1-0.5 0.4-0.4 0.1-1.6 0.1-0.6 0.3 0.1 0.8-0.2-0.1-0.3-0.3-0.2-0.1-0.2 0.2-0.3 0.5-0.2 0.1-0.3-0.2-0.2-0.4-0.8-2.3-0.4-0.7-0.3-0.4-0.1-0.5-0.1-0.4 0.1-0.4 0.2-0.4 0-0.4-0.4-0.8-0.2-1.4-0.2-0.5-0.1-0.2-0.1-0.1-0.3-0.1-0.2-0.2-0.2-0.4-0.2-0.5 0-0.2 0.1-0.2 0.3-0.4 0.2-0.1 0.2 0 0.5 0.2 0.3 0.1 0.2-0.1 0.1-0.3 0.1-1.8 0.2-0.6 0.4-0.5 0-0.3 0.1-0.6-0.1-0.2-0.1-0.2-0.2-0.2-0.2-0.1-0.6-0.2-0.4 0.1-0.9 0.4-0.1-0.5-0.2-0.9-0.1-0.5 0.1-0.2 0.3-0.4 0.1-0.3 0-0.9 0.1-0.4 0.2-0.5 0.3-0.5 0.4-0.1 0.4 0.1 0.3 0.3 0.3 0.3 0.5 0 0.5-0.2 0.9-0.6 0.5-0.5 0.5-0.2 0.2-0.2 0.2-0.2 0.2-0.8 0.3-0.4 0.4-0.2 0.4-0.2 1.2-0.9 0.1-0.2-0.1-1.4-0.2-0.5 0-2.2 0.1-0.2 0.1-0.3 0.1-0.3-0.2-0.3 0.8-1.2 0.3-0.6 0.7-2.4 0.4-0.6 0.7-0.4 0.5-0.2 0.3 0.1 0.3 0.1 0.4 0.1 0.3-0.2 0.1-0.6 0.3-1.9 0-0.3-0.1-0.1-0.3-0.2-0.3-0.4-0.1-0.4-0.5-1.9-0.1-0.9 0.1-0.5 0.5-0.8 0.1-0.4-0.6-1.5-0.1-0.2-0.1-1.8-0.1-0.3 0.1-0.2 0.2-0.2 0.4-0.4 0.2-0.3-0.1-0.4-0.4-1 0-0.8 0.3-0.7 0.5-0.6 0.5-0.4 0.4-0.5 0.2-0.3 0.3-0.1 0.3-0.1 0.3-0.2 0.3-0.4 0.1-0.8 0.3-0.8 0.2-1.3 0.2-0.3 0.2-0.3 0.2-0.3 0.2-1 0.1-0.3 0.3-0.2 0.6-0.4 0.1 1-0.1 2.5 0.1 0.7 0 0.6 0.5 1.4 0.2 0.7-0.1 0.4-0.2 0.3-1.4 0.9-0.3 0.3-0.3 0.4-0.2 0.7 0 0.5 0.2 0.4 0.2 0.2 0.4 0.2 2.5 1 0.4 0.2 0.3 0.3 0.2 0.3 0.3 0.6 0.3 2.3 0.1 0.6 0.3 0.4 0.9 1.3 0.6 0.5 0.6 0.8 0.3 0.6 0.2 0.4 0 0.3-0.5 1.8 0 0.3 0 0.5 0.1 0.3 0.2 0.3 0.2 0.2 0.2 0.1 0.4 0.1z",    IDN1136: "M47.3 84.1l0.1 0.4 0 0.4-0.1 0.1-0.5 0.3 0 0.1 0 0.3-0.2 0.1-0.2 0-0.8-1.5 0.2 0 0.2-0.3 0.2-0.1 0.1-0.2 0.5 0 0.3 0.1 0.2 0.3z m-10.9 0.4l-0.4 0.1-0.3-0.2 0-0.6 0.1-0.2 0.1-0.2 0.2-0.1 0.3 0.1 0.3 0.1 0.2 0.2 0.1 0.2-0.1 0.3-0.5 0.3z m11.9-2.9l0.4 0 0.2-0.1 0.3-0.2 0.3-0.2 0.4 0 0.4 0.1 0.1 0.1-0.1 0.3 0.5 0.5 0.3 0.2 0.1 0.2 0.1 0.4 0.1 0.5 0.2 0.5 0 0.4 0 0.6-0.2 0.3-0.3 0.3 0-0.4 0-0.2-0.3 0-0.2-0.3-0.2-0.3-0.2-0.4-1-0.9-0.1-0.3-0.4-0.4-2.3-0.8 0.1-0.1 0.4-0.1 0.9-0.2 0.2 0 0.1 0.1 0.2 0.4z m-27.8-15.2l0 0.8-0.4-0.4-0.2 0.1 0 0.9 0.7-0.4 0.3 0.4 0.8 0.4 0.3 0.8 0.5 0.3 0.6 0.1 1.3 0.3 0.4 0.2 0.4 0.3 0.1 0.4-0.7 0.9 0.1 0.4 0.3-0.2 0.3 0 0.1 0.1 0.4 0.3 0.2 0 0-0.2-0.1-0.1-0.3-0.2 0-0.2 0.3 0 1.9 1.7 0.2 0.2 0.7 0.3 0.3 0.1 0.4 0.1 0.3 0.3 0.5 0.7 0.1 0.3 0.1 0.4 0.2 0.4 0.3 0 0.1-0.1 0.1-0.4-0.1-0.7 0.4 0.4 0.1 0 0.1 0 0.5 0.4 0.4 1.1 0.3 0.5 0 0.4 0.1 0.4 0 0.3-0.3 0.1-0.8 0.3-0.2 0.1-0.2 0-0.9-0.5-0.4 0.2-0.4 0-0.3-0.1-0.3-0.3 0.5-0.4-0.5-0.3-0.5-0.6-1-0.3-3.7-2.8-0.5-0.3-0.5-0.2-0.2 0-0.6 0-0.1-0.1-0.2-0.2-0.1 0-0.2 0.3-0.4 0.1-0.2 0-0.4-0.3-0.4-0.1-0.2-0.1-0.1-0.2 0-0.2-0.1-0.2-0.2-0.2-1.6 0-0.1-0.1 0-0.3 0.2-0.5-0.1-0.2-0.7-0.4 0.1-0.3-0.3-0.3-0.3-0.1 0-0.2 0.1-0.3-0.3 0-0.4 0-0.2 0-0.1-0.3 0-0.4 0.1-0.4 0.3-0.2 1.2 0 0.3-0.1 0-0.2-0.1-0.2-0.2-0.1 0-0.2 0.1-0.4 0-0.2 0.3-0.5 0.1-0.3 0.2 0.1 0.3 0.3 1.5 0.1 0.6 0.2z m51.2-30l-1.7-0.2-0.3 0.1-0.6 0.1-0.2 0.1-0.3 0.3-0.2 0.2-0.3 0.1-0.6 0-0.2 0.1-0.1 0.2 0.3 0.4 0 0.2-0.1 0.2-0.2 0.3-0.1 0.2-0.3 1-0.2 0.7-0.2 0.9 0 0.2-0.1 0.5-0.2 0.3-0.1 0.4-0.1 0.4-0.3 0.3-0.7 0.5-0.2 0.3-0.2 0.2 0 0.2-0.1 0.2-0.2 0-0.3 0-0.4-0.3-0.1 0.6 0 0.5 0.1 0.4-0.3 0.5-2 1.7-0.2 0.2 0 0.2 0.2 0.3 0.5 0.9 0.3 0.5 0.3 1.2 0.2 0.3 0.2 0.2 0.3 0.2 0.2 0.2 0.1 0.2 0.1 0.5 0.2 0.3 0.3 0.3 0.1 0.2-0.1 0.2-0.1 0.4 0 0.2 0 0.3 0.2 0.3 0.1 0.3 0.2 0.2 0.9 0.6 0.1 0.2 0.3 0.6-0.3 0.7-0.5 0.3-1.4 0.3-0.3 0.2-0.2 0.1 0.2 0.3 0.3 0.3 0.2 0.2 0.2 0.4 0 0.4 0.1 0.2 0.6 0.8 0.1 0.2 0 0.3-0.1 0.6-0.2 0.2-0.2 0-0.4-0.1-0.1 0-0.1 0.3 0.1 0.3 0.4 1.7-0.1 0.9 0 0.3 0.1 0.1 0.2 0.2 0.3 0.1 0.4 0.1 0.2 0.1 0.7 0.9 0.2 0.2 0.3 0.2 0.4 0.1 0.2 0.1 0.2 0.3 0.1 0.3-0.3 0.4-0.1 0.4 0.1 0.4 0.2 0.7 0.3 0.4 0 0.1 0 0.2-0.3 0.3-0.4 0.3 0 0.1 0 0.4-0.1 0.2-0.1 0.4-0.1 0.5 0.2 1.1 0.5 1.5 0.1 0.3 0.2 0.1 0.2 0 0.2 0.1 0.2 0.2 0.1 0.5 0.4 0.8 0.1 0.8 0 0.4-0.5 2.7-0.3-0.2-2.3-1.1-0.6-0.6-0.5 0.1-1.1 0.4-0.3 0.1-0.4-0.1-0.4-0.3-0.3 0.1-0.2-0.1-0.1-0.2-0.2-0.1-0.2 0-0.4 0.1-0.2 0-0.3-0.2-0.8-1.4-0.7-0.6-0.2-0.4-0.2-0.4 0.1-2.5-0.4-3.1-0.7-3.9-0.2-0.4-0.2-0.1-0.3-0.1-0.9-0.3-1.1-0.5-0.5-0.1-0.5-0.1-0.4-0.1-0.4-0.4-1.5-1.9-0.4-0.6-0.3-0.7-0.4-1.9-0.3-0.8-0.6-0.5-0.8 0-0.5-0.1-0.2-0.2-0.1-0.3-3.2-5.6-0.5-0.5-1.7-1.3-0.3-0.6-0.3-0.7-0.2-0.3-0.4-0.3-0.5-0.3-0.1-0.1-0.6-0.2-0.7-0.5-0.4-0.1-4.3 0.1-0.9-0.2-0.9-0.5-1-1-3.3-4.4-1.5-1.5-0.2-0.5-0.1-0.1-0.1-0.1-0.4-0.1-0.1-0.2-0.2 0-0.3-0.1-0.2 0.1-0.2 0.1-0.3-0.3-1-1.2-0.4-0.2-0.4-0.1-0.4-0.2-2.4-2.6-1.9-1.9-0.2-0.3-1-0.8-0.7-1-1.5-1.1-0.9-1-0.4-0.2-0.5 0-0.2 0-0.1-0.2 0.1-0.1 0.2-0.2 0-0.2 0-0.1-0.4-0.1-0.6-0.4-0.3-0.4-0.6-1.1-0.4-0.6-0.2-0.1-0.4-0.3-0.3-0.4-0.1-0.4-0.1-0.3-0.3-0.6-0.1-0.5-0.3-0.5-0.1-0.6-0.7-1.7-0.2-0.3-0.3-0.4-0.3-0.3-0.1-0.4-0.2-0.3-0.4-0.1 0.4-0.6 0.1-0.5-0.3-0.4-0.3-0.4-0.4-0.3-0.2-0.2 0-0.2-0.1-0.3-0.1-0.3-0.1-0.3-0.3-0.1-0.5-0.1 0.2-0.3 0.3-0.5 0.3-0.4 0-0.3 0.2-0.4 0.2-0.4 0-0.3-0.1-0.3-0.3-0.6 0.3-0.2-0.2-0.3-0.3-0.3 0-0.4-0.5-0.6-0.1-0.3 0.3-0.5 0.3-0.2 0.3 0.1 0.3-0.1 0.4 0.1 0.2 0 0.2-0.1 0.3-0.3 0.3-0.1 0.4-0.3 0.2-0.1 0.3 0 0.2-0.1 1-0.6 0.4-0.1 0.4 0.1 0.6 0.6 0.4 0.2 0.1 0.2 0.2 0 0.2-0.1 0.3-0.3 0.9-0.2 0.8 0.1 3.3 1.1 1.7 1 0.3 0.2 0.4 0 0.3 0.2 0.1 0.4 0.2 0.9 0.6 0.8 2.7 2.2 0.7 0.4 0.9 0.3 3.5 0.5 0.3 0.1 0.9 0.5 0.4 0.1 1 0.2 0.5 0 0.4-0.2 0.4-0.2 0.4 0.2 0.4 0.2 0.5 0.2 0.9 0 1.8-0.2 0.7-0.2 2.2-0.7 0.9-0.5 0.5 0.1 1 0.3 0.2 0 0.4-0.1 1.1-0.1 1.2 0.5 1 0.3 0.7 0.5 0.9 0.3 0.4 0.6 0.2 0.2 0.4 0.1 0.7 0.3 0.9-0.2 4.9-2.1 0.7 0.2 3 3.7 3.6 2.9 0.9 0.4 0.5 0.3 0.3 0.4 1 1.7 0.2 0.4 0.2 1.9 0.2 0.6 0.5 0.9 0.1 0.3-0.1 0.5-0.2 0.6-0.1 0.4 0.1 0.1 0.6-0.1 0.3 0 0.2 0.3 0.1-0.3 0.2 0 0.3 0.1 0.2 0.3 0.1 0 0.5-0.1 0.6 0.1 0.4 0.3 0.4 0.4 0.2 0.4 0.1 0 0.1-0.1 0.2-0.2 0.3 0.3 0.5 0.6 0.3 0.3 0.4 0.4 0.1 0.2 0.1 1.1-0.3 1.6 0 0.1z m-67.1-29.2l0.3 0.4-0.3 0-0.2 0-0.1 0.1-0.2 0.2-0.2-0.2-0.5-0.1-0.3-0.1 0-0.2 0.2-0.2 0.2-0.2 0.2-0.1 0.1-0.4 0.3 0.1 0.5 0.7z m-2.1-2.5l0.4 0.4 0.5 0.4 0.1 0 0.1 0.3 0 0.2-0.2 0.3-0.6-0.4-0.8 0.6 0-0.2 0-0.4-0.2 0 0-0.1 0.2-0.2 0-0.2-0.2-0.2 0.2-0.1 0-0.2-0.2-0.1-0.2 0-0.4 0.1-0.2-0.1 0-0.2 0.2-0.2 0.3-0.1 0.5 0 0.5 0.4z m4.1-2.8l0.3 0.3 0.3-0.1 0.2-0.3 0.2-0.3 0.2-0.2 0.3 0 0.3 0.2 0.6 1 0 0.8-0.1 0-0.2-0.3-0.3-0.2 0 0.7-0.1 0.3-0.2 0.1-0.4-0.1-0.4-0.1-0.4-0.2-0.2-0.2-0.2-0.4-0.1-0.4-0.2-0.3-0.5-0.3-0.2-0.4-0.1-0.3 0-0.2 0.5 0 0.2 0.1 0.3 0.2 0.2 0.6z",    IDN492: "M190.8 137.1l-0.1 0.1-0.8-0.1-0.3 0.1-0.6 0.3-0.5 0.1-0.5 0.3-0.3 0.1-0.4-0.2-0.3-0.1-0.2 0.1-0.5 0.1-1.2-0.4-0.7 0.1 0-0.7 0.6-1.1 0.8-0.9 0.7-0.4 0.4 0 1.2 0.2 0.2 0.1 0.2 0.3 0.5 0.2 0.9 0.2 0.5 0.2 0.4 0.4 0.3 0.6-0.3 0.4z m-19.1-13.7l-0.6 0.2-0.2-0.3 0.4-0.3 0.6-0.2 0.7-0.2 0.2 0.3-0.4 0.2-0.7 0.3z m4.5-6.4l-0.1 0.1-0.1 0-0.2-0.2-0.1-0.3-0.3-0.6 0-0.3-0.2-0.3 0-0.1 0.2-0.1 0.2 0.1 0.2 0.2 0.2 0.3 0.2 0.2 0.1 0.4 0 0.3-0.1 0.3z m2.2 1.4l-0.3 0-0.4-0.2-0.2-0.3-0.1-0.4 0-0.4 0.5-1.9 0.4-0.7 0.7-0.3 0.4 0.1 0.4 0.2 0.3 0.3 0.3 0.3 0.2 0.5 0.2 0.4 0.1 0.5 0 0.6-0.1 0.6-0.3 0.2-1.8 0.4-0.3 0.1z m-1.7-4.8l-0.3 0.3-0.1 0-0.1-0.2-0.1-0.5 0-0.1 0.2-0.3 0.2-0.3 0.2-0.1 0.2 0 0.1 0.3-0.1 0.4-0.2 0.5z m-10-5.7l0.4 0.1 0.3-0.1 0.6-0.3 0.3-0.1 0.5 0 0.5 0.1 0.4 0.2 1.1 0.9 1.6 0.8 2.5 1.7 0.3 0.4 0.1 0.2 0.3 0.9 0.1 0-0.2 0.4-0.1 0.8-0.2 0.4-0.4 0.2-0.2 0-0.2-0.1-0.4-0.5-1.1-1-0.8-0.5-0.9-0.1-1.8 0.1-0.5 0-0.9-0.3-0.5 0-1.8 0.4-0.9 0.2-0.9-0.3-1-0.8-0.2-0.1-1.2-0.9 0.1-0.4 0.3-0.5 0.5-0.3 0.9-0.2 0.3-0.3 0-0.4-0.7-2.1 0-0.8 0.4-0.6 0.9-0.2 0.6 0.3 1.1 1.3 0.2 0.2 0 0.3-0.2 0.4 0 0.3 0.3 0.2 0.5 0.1z m8.5-1l0.9 0.9 1.1 1.6 0.8 0.7 0.2 0.3-0.1 0.5-0.9 0.6-0.9-0.2-2.9-1.8 0-0.1-1-0.8-0.3-0.2-0.7-0.3-0.4 0-0.4-0.1-0.3-0.3-0.2-0.3-0.2-0.2-0.4-0.1-1.3 0.1-0.5 0.1-0.4 0.3-0.5 0.1-0.5 0 0-0.3 0.2-0.4 0.8-0.8 0.3-0.4 0.3-0.9 0.3-0.4 0.9-0.3 1 0.1 1.9 0.7 1.7 0.9 1.5 1z m-12.4 1.8l-0.4 0-0.2 0.1-0.6 0.5-0.2 0.1-0.7-0.1-0.7-0.6-1.5-1.6-0.3-0.7-0.3-0.3-0.1-0.4 0-0.5 0.2-1 0-0.8 0-0.3-0.5-0.4-0.2-0.4-0.2-0.5 0-0.4 0-0.2 0.2-0.4 0.1-0.2-0.2-0.9 0.1-0.5 0.1-0.2 0.3-0.1 0.5 0 0.8 0.2 0.7 0.5 1.2 1.3 1.6 1.2 0.4 0.3 0.1 0.2 0.1 0.5-0.1 0.6-0.6 2 0 0.5 0 0.6 0.4 1.2 0.1 0.5-0.1 0.2z m-4.9-13.2l1.3 0.2 0.6 0 0.3 0 0.2 0.1 0.4 0.3 0.2 0.1 1.9 0.5 0.6 0.5 0.1 1.1 0 1.7 0.3 1.5 0 0.4-0.7 0.1-1-0.6-1.3-1.3-0.9-1.2-0.4-0.2-0.2 0-0.4-0.2-3.3-0.5-0.8-0.4-0.9-0.8-0.6-0.8-0.5-0.8 0.1-0.7 1-0.3 0.4 0.1 1 0.5 0.4 0.3 0.3 0.2 0.5 0.1 1.4 0.1z m-11.2-10.6l0.8 1 0.2 0.6 0.1 0.8-0.1 0.5-0.7 0.8-0.2 0.5 0.1 1-0.1 0.4-0.3 0.5-1 0.7-0.2 0.2-0.2 0.3-0.5 0.2-0.6 0.1-0.5 0-1-0.2-0.8-0.4-0.7-0.7-0.4-0.8-0.3-1-0.1-0.5-0.6-0.8-0.1-0.4 0.3-1.8 0.3-0.7 0.5-0.5 0.8-0.1 0.4 0.1 0.7 0.2 0.5 0 0.3-0.2 1.1-1.1 0.7-0.2 0.7 0.4 0.6 0.6 0.3 0.5z m37.2 60.9l-0.2 0.1-7.1 0.5-3.1-0.3-0.9 0.1-2.4 0.6-0.3 0.2-0.2 0.2-0.4 0.3-0.8 1-0.2 0.1-0.6 0.5-0.2 0.1-0.3 0.5-0.3 0.7-0.2 0.2-0.3 0.3-0.6 0.4-0.2 0.3-0.4 1.1-0.3 0.4-0.4 0.1-2-0.4-0.5-0.2-0.2-0.1-0.2-0.4-0.4-0.3-0.2-0.1-0.6-0.2-0.1-0.1-0.1-0.2-0.1-0.2-0.2-0.3-1.1-1-0.1-0.2-0.2-0.5-0.1-0.3-0.2-0.1-0.2-0.1-0.9-0.3-0.3 0-0.5 0.1-0.6 0.2-0.4 0.1-1.1 0.2-1.2-0.1-0.4 0.1-0.4 0.2-0.5 0.3-0.4 0.4-0.3 0.5-0.3 0.7-0.4 0.3-0.2 0.1-2.4 0.9-0.2-0.5-0.2-0.2-0.4-0.4-0.2-0.1-1.1-0.4-2-0.4-1.2-0.4-0.7-0.4-1.3-1.4-2.2-1.3-2.1-1.8-4.2-5-0.9-1.6-0.5-0.1-0.8-0.3-1.8-1.3-0.8-1.3-0.4-0.6-0.1-0.3-0.2-0.3-0.1-0.8-0.1-0.3-0.6-1.1-0.1-0.5 0-0.2 0-0.2 0.3-0.2 0.2 0 1-0.1 0.3 0 0.2-0.1 0.1-0.2 0-0.1-0.1-1.4 0-0.5 0.3-1.9 0-0.4 0-0.2-0.1-0.3-0.2-0.3-0.2-0.3-0.6-0.6-0.3-0.4-0.1-0.1-0.2 0-0.4 0.2-0.1-0.1-0.9-0.9-0.5-0.4-0.9-0.6-1.6-0.7-0.9-1.1-0.4-0.3-0.4-0.1-0.4-0.1-0.7 0.1-0.3 0.1-0.2 0.1-0.3 0.4-0.1 0.2-0.7 0-2.3-0.9-0.8-1.6-0.2-0.2-0.4-0.5-0.2-0.3-0.6-1.7 0-0.2 0.1-0.2 0.2-0.2 0.4-0.4 0.3-0.3 0-0.3-0.2-0.4-0.5-0.4-0.1-0.6 0-0.4 0.1-0.3 0.2-0.4 0.1-0.2 0.4-0.4 0.1-0.2 0-0.3 0-0.9 0.1-1.4 0-0.5 0-0.3-0.2-0.5 0-0.3 0.1-0.2 0.2-1 0.1-0.5-0.1-0.3-0.1-0.3-0.1-0.2-0.2-0.2-0.3-0.2-0.9-0.5-0.2-0.2-0.1-0.2 0-0.2 0-0.8-0.1-0.2-0.1-0.3-0.2-0.2-1-0.8-0.1-0.3 0-0.2 0.3-0.3 0.2-0.2 0.4-0.2 5.3-2.4 1.4-0.8 0.2-0.2 0.2-0.3 0.2-0.3 0-0.4 0-0.5-0.2-0.6-0.8-1.8-0.5-1.4-0.2-0.4-0.2-0.2-0.9-0.7-0.2-0.2-0.2-0.3-0.1-0.5 0.1-0.9 0.2-0.8 0.3-1 0.1-0.7-0.2-2.2-0.3-1.4-0.4-1 0-0.7-0.1-0.8 0.4-3 0.4-1.3 1.5 4.3 0.5 1 0.6 0.8 1.6 1.6 1.2 0.9 1.2 0.6 1-0.1 2.7 1.9 0.5 0.2 0.5 0.5 0.1 0.1 0.4 0.3 0.3 0.6 0.3 0.6 0.2 0.5 0 0.7 0.3 0.7 0.3 0.4 0.6 0.2-0.2-0.3 0.1-0.4 0.1-0.5-0.3-0.5-0.3-0.4-0.1-0.4-0.2-1-0.5-1-1.3-1.8-0.5-1 0-1 0.2-0.9 0.6-0.7 1-0.3 0.5-0.1 3.1 0.2 0.2 0.3-0.1 0.8 0.3 0.5 2.4 1.6 2.6 2.1 0.4 0.5 0.2 0.5 0 0.5-0.1 0.9 0.1 0.5 0.5 1.2 0.6 1.9 0.4 0.8 0.7 0.6 1.4 0.6 0.8 0.2 0.8 0.3 0.5 0.1 1.8-0.4 0.8 0 0.9 0.2 0.6 0.4 5.3 4.5 2.1 1.1 0.5 0.6 0.2 1-0.1 0.8 0 0.6 0.2 0.2 0.4 0.2 0.3 0.3 0.2 0.3 0.1 0.4-0.2 1.7 0 0.8 0.3 1 0.7 0.9 1.8 1.4 2.2 2.4 0.9 0.7 1 0.5 0.5 0.2 0.4 0.1 0.9 0 0.5 0 0.7-0.2 0.4-0.1 2.5 0.4 2.1 0.1 0.8 0.4 0.8 0.7 2.2 2.6 0.6 0.9 0.2 1-0.4 0.6-0.8 0.5-1.6 0.7-0.9 0.6-0.5 0.3-0.8 0.2-2.5 1.3-0.3 0.2-0.4 0.2-1.5 0.3-0.4 0.2-0.3 0.3-0.4 0.8-0.3 0.1-0.5-0.1-0.4-0.3-0.8-0.8-0.3-0.2-0.6-0.1-0.5 0-0.1 0.1 0.2 0.1 0.2 0.1 0.5 0 0.1 0 0.2 0.1 0.2 0.3 0.5 0.5 0.6 0.5 0.7 0.3 0.7-0.4 0.1-0.1 0.4-0.5 0.2-0.1 0.5-0.3 0.2-0.1 0.4-0.1 1 0.1 0.5-0.1 1.2-0.5 1.4-0.2 0.4-0.1 1.5-1 0.5-0.1 0.3-0.1 1.1-1.1 0.4-0.2 0.5-0.2 0.5-0.1 0.4-0.1 0.5-0.2 0.4-0.4 0.4-0.9 0.5-0.4 1.2-0.2 0.6-0.3 0.6-0.4 0.6-0.1 0.6 0.1 0.7 0.3 1.3 0.7 1.3 1.1 1 1.2 0.4 1.5 0.2-0.5 0.2-0.2 0.2-0.1 0.2 0 0.5 0.2 0.5 0.2 0.5 0.3 0.4 0.4 0.3 0.4 0.3 0.8 0.9 4.5 0.2 0.2 0.1 0.1-0.1 0.2-0.2 0.4-0.2 0.1-0.3 0-0.5-0.1-1.8 0.2-0.2 0.1 0 0.4-0.1 0.1-0.6 0.1-0.2-0.1-0.2-0.2-0.2-0.4-0.2-0.2-0.4 0.1-0.1 0.1-0.1 0.1 0 0.3 0.3 0 0.1 0.2-0.1 0.6 0.2 0.5-0.3 0.2-0.4 0.1-0.3 0.1-0.7 0-0.3 0.1-0.2 0.2-0.1 0.7-0.3 0.5-0.6 0.4-0.6 0.3-2.4 0.5-0.7 0.4 0.4 0 0.6 0.1 0.3 0 0.4 0 0.7-0.3 0.3-0.1 0.6-0.2 0.8-0.4 0.6-0.1 0.3 0.4-0.1 0.5-0.9 0.8-0.2 0.6-0.2 0.4-0.6 0.3-1.4 0.2 0 0.2 0.8 0.3 0.4 0.1 0.4-0.2 0.2-0.1 1.2 0 0.4 0.1 0.2 0.1 0.2 0.2 0.2 0.1 0.5 0.1 0.8 0.5 0.2 0.3-0.1 0.4-0.4 0.4-0.6 0.3-0.7 0.3-2.1 0.3-0.4-0.1-0.2-0.4-0.4-0.9 0.2 1.4 0.1 0.2 0.4 0.3 0.2 0.3 0.1 0.5-0.2 0.6-0.3 0.6-0.5 0.4 0 0.1 0.4 0.3-0.1 0.3-0.4 0.3-0.5 0 0.3 0.4 0.4 0.3 0.5 0.3 0.8 0.1z",    IDN539: "M120.9 198.6l-0.1 0.2-0.5-0.1-0.3-0.4 0-0.5 0.3-0.3 0 0.4 0.2 0.2 0.4 0.5z m-1.5-2.3l0.2 0.4 0 0.6-0.2 0.4-0.4-0.1-0.2 0.1-0.3 0.1-0.2-0.1-0.2-0.1-0.4 0.3-0.1 0.2 0.1 0.1 0.3 0.1 0 0.1 0 0.2-0.1 0.2 0.3 0.6 0.3 0.6 0.9 1 0.3 0.7-0.4 0.4-0.3-0.2-0.4-0.5-0.2-0.2-0.3-0.2-0.4-0.2-0.2-0.1 0-0.1 0-0.4 0-0.2-0.4 0-0.5-0.4-0.1-0.2 0-0.3 0.1 0 0.1 0.2 0.3 0.1 0.1-0.1-0.1-0.2-0.2-0.3-0.2-0.5 0-0.2 0.1-0.3 0.1-0.3-1.2-1-0.3-0.1-0.4 0-0.2-0.1 0.1-0.3-0.2-0.2-0.7-0.9-0.1-0.2-0.1-0.3-0.3-0.3-0.1-0.3 0.1-0.3 0.2-0.2 0-0.2 0-0.6-0.4-1.5 0-0.5 0.2-0.2 0.8-0.4 0.3 0.1 0.2 0.1 0.1 0.2 0.5 0.6 0.1 0.1 0.3 0.2 1.3 1.3 0.6 0.4 0.7 1.2 1.1 1 0.1 0.5 0 0.3-0.1 0.4z m-5.7-6.7l-0.7 0.1-0.3 0.2-0.1 0.2-0.2 0.6-0.1 0.2-0.5 0.2-0.6-0.1-0.5-0.2-0.3-0.2-0.1 0.3-0.2 0.3-0.2 0.1-0.3-0.1-0.1-0.3-0.1-0.8-0.1-0.4-0.3 0 0-0.5 0.3-1.2 0-0.6-0.1-0.5-0.2-0.3-0.4-0.2 0.2-0.2 0-0.2-0.2-0.3-0.2-0.5 0-0.1 0.2-0.9 0.1-0.4 0.2-0.2 0.4 0.1 0.3 0.3 0.2 0.3 0.2 0.2 1.2 1.1 0.4 0.5 0.2 0.2 0.8 0.2 0.3 0.2 0.1 0.4 0.1 0.2 0.6 0.5 0.1 0.3 0 0.3 0.2 0.4 0 0.3 0 0.3-0.3 0.2z m-10.8-13.8l0.3 0.7 1.2 1.7 0 0.4 0.1 0.1 0.1 0.1 0.7 0.4 0.1 0.2 0.6 0.9 0.2 0.5 0 0.2-0.1 0.3-0.2 0-0.1-0.1-0.1-0.5-0.2-0.1-0.6 0-0.2-0.1-0.4-0.3-0.2-0.2-0.2 0-0.6-0.1-0.2 0-0.3-0.3-0.3-0.4-0.3-0.3-0.5-0.1-0.9 0.1-0.1-0.1 0-0.2 0.2-0.3 0.1-0.2-0.3-0.2-0.2 0.1-0.1-0.4-0.2 0-0.1 0.3-0.2-0.2-0.3-0.7-0.5-0.6-0.1-0.2 0.1-0.2 0.2-0.1 0.3 0.1 0.2-0.1 0-0.2-0.3-0.4 0-0.9 0.3-0.7 0.7-0.3 0.8 0.1 0.2 0.2 0.2 0.3 0.3 0.2 0.4 0.1 0.2 0.2 0.2 0.5 0.1 0.8z m-17.1-25.8l0.4 0.5 0.2 0.5-0.1 0.4-0.2-0.1-0.2-0.1-0.2-0.1-0.2 0 0.2 0.4 0.2 0.2 0.1 0.3 0.1 0.4 0.1 0.3 0.3 0.3 0.4 0.1 0.2 0.3 0.2 0.3 0.3 0.8 0.2 0.3 0.4 0.3 0.1 0.2 0.1 0.5 0.2 0.2 0.4 0.4 0.1 0.4-0.1 0-0.2 0.2-0.1 0.2 0.2 0.2 0.4 0.1 0.2 0.3 0.2 0.8 0.4 0.7 0.6 0.5 0.4 0.5 0.1 0.9-0.2-0.1-0.6-0.5-0.1 0 0.1 0.5 0.3 0.4 0.8 0.8 0.2 0.1 0.2 0.1 0.1 0.1 0.1 0.2 0 0.6 0 0.4 0.2 0.1 0.3 0 0.4 0 0.3 0.2 0.2 0.3 0.1 0.4-0.1 0.3 0.3 0.4 0.2 0.7-0.1 0.7-0.4 0.5-0.2-1.5-0.2-0.4-0.6-0.8-0.3 0.2-0.3 0.1 0.2 0.2 0.8 1.7 0.2 0.9 0 0.3-0.2 0.2-0.3-0.1-0.5-0.1-0.6 0-0.4 0.1-0.3 0.2-0.3 0.2-0.4 0.2-0.3-0.1-2.5-1.3-0.6-0.6-1.3-0.5-0.3-0.2-0.9-1.3-0.4-0.2-0.1-0.1 0.2-0.8-0.4-0.9-3.5-5-0.3-0.2-0.2-0.2 0.1-0.3-0.4-0.8-0.2-0.2-0.2-0.5 0-0.4 0.6-0.9 0.4-0.9 0.2-0.5 0-0.5 0-1 0-0.5 0.2-0.4 0.2-0.2 0.3-0.1 0.4-0.1 0.5 0 0.3 0 0.7 0.3 0.4 0 0.3-0.2 0.5-0.5 0.3-0.1 0.9-0.2 0.4 0.1-0.2 0.4 0.6 0.1z m27.3-36.9l0.5 0.4 0.2 0.4 0 0.3-0.3 0.3-0.4 0.4-0.2 0.2-0.1 0.2 0 0.2 0.6 1.7 0.2 0.3 0.4 0.5 0.2 0.2 0.8 1.6 2.3 0.9 0.7 0 0.1-0.2 0.3-0.4 0.2-0.1 0.3-0.1 0.7-0.1 0.4 0.1 0.4 0.1 0.4 0.3 0.9 1.1 1.6 0.7 0.9 0.6 0.5 0.4 0.9 0.9 0.1 0.1 0.4-0.2 0.2 0 0.1 0.1 0.3 0.4 0.6 0.6 0.2 0.3 0.2 0.3 0.1 0.3 0 0.2 0 0.4-0.3 1.9 0 0.5 0.1 1.4 0 0.1-0.1 0.2-0.2 0.1-0.3 0-1 0.1-0.2 0-0.3 0.2 0 0.2 0 0.2 0.1 0.5 0.6 1.1 0.1 0.3 0.1 0.8 0.2 0.3 0.1 0.3 0.4 0.6 0.8 1.3 1.8 1.3 0.8 0.3 0.5 0.1 0.9 1.6 4.2 5 2.1 1.8 2.2 1.3 1.3 1.4 0.7 0.4 1.2 0.4 2 0.4 1.1 0.4 0.2 0.1 0.4 0.4 0.2 0.2 0.2 0.5 0.3 0.5 0.1 0.5 0 0.5-0.1 0.5 0.3 0.2 0.4 0.2 0.2 0 0.2-0.1 0.2 0 0 0.2 0 0.2-0.2 0.5-0.3 0.5-0.6 0.6-0.4 0.4-0.6 0.2-0.7 0.2-0.4 0-0.2 0.1-0.2 0.2-0.1 0.4-0.1 0.6 0.4 1.3 0 0.3-0.3 0.6 0.1 0.2 0.2 0.3 0 0.2-0.2 0.7-0.3 0.4-0.5 0.5-1.8 1.4-0.8 0.7-0.4 0.6-0.6 0.8-0.3 0.2-0.3 0.1-0.7-0.1-0.3-0.2-3.8 0.6-0.5-0.1-0.4-0.2-0.3-0.2-0.4 0.1-0.8-0.2 0.1 2.3 0.2 1.2 0.3 1.2 0.6 1.2 0.4 0.6 0.3 0.4 0.7 0.5 0.2 0.3 0.3 0.5 0.9 2.2 0.8 2.5-0.7 0.2-1 0.7-0.4 0.2-1.1 0.3-0.4 0.1-2 1.5-1.1 1-0.2-0.3-2.1-2.9-1.8-3.6-0.1-0.2-0.1-0.4 0.3-0.5 0.8-0.8 0.1-0.9-0.1-1-0.2-0.9-0.1-0.9-0.2-0.4-0.4-0.5-1.2-1.2-0.2-0.2-0.1-0.2-0.1-0.5-1-1.6-1.1-1.3-0.3-0.5-0.2-0.5-0.2-0.9-0.1-0.9-0.2-0.3-0.8-0.8-0.3-0.4 0.2-0.2 0-0.3-0.2-0.3 0.2-0.2 0.1 0-0.2-0.8-0.2-0.6-0.2-0.2-0.4-0.1-0.9-0.6-0.4-0.1-0.3-0.3-0.2-0.1-0.1 0.1-0.6 0.1-0.2 0-0.2-0.2 0.1-0.2 0.3-0.3 0.2-0.3 0-0.5-0.1-0.3-1-0.8-0.3 0.1-0.1-0.2 0.1-0.4 0-0.2 0.3-0.3 0-0.1 0-0.2-0.3-0.5 0.3-0.1 0.2 0 0.2 0 0.2 0.1 0.2-0.4-0.2-0.3-0.4 0-0.3-0.2-0.5-1.2-0.2-1.5-0.4-1-0.6-1-3-3.2-0.6-0.7-0.9-1.7-1.3-1.5-0.7-0.7-1.5-1-0.3-0.3-0.2-0.4-0.4-0.4-1-0.6-0.4-0.4-0.3-0.4 0-0.5 0-0.5-0.1-0.4-0.2-0.3-0.3-0.2-0.2-0.2-0.2-0.4-0.1-0.2-0.1-0.3 0-0.4 0-0.5 0.2-0.4 0-0.5-0.1-0.5-0.3-0.4-1.3-1.1-1.2-1.4-0.5-0.3-1.6-0.9-1-0.4-0.9-0.1-0.5 0-0.4-0.1-0.3-0.1-0.3-0.4-0.5-0.8-0.3-0.3-0.6-0.1-0.4 0.1-0.8 0.4-0.3 0.1-0.3 0-0.2-0.1-0.2-0.1-0.4-0.4-0.1 0-0.5 0-0.3-0.2 2.5-2.7 1.6-2.1 0.3-0.2 0.2-0.1 0.6-0.2 0.7 0 0.4-0.1 0.5-0.3 1.6-0.8 0.5-0.2 0.5 0 0.3 0.1 0.6 0.3 0.2 0.1 0.4 0 0.1 0.1 0.4 0.5 0.2 0.2 0.2 0.1 0.2 0.1 1.3 0 0.2 0.1 0.3 0.2 0.5 0.2 0.4 0 0.3-0.1 0.9-0.3 0.3-0.1 0.2-0.2 0.2-0.5 0-0.5 0-0.3-0.1-0.1-0.5-1.1-0.3-0.4-0.2-0.4-0.1-0.2-1-1-0.1-0.3-0.2-0.8-0.1-0.3-0.1-0.1-0.3-0.2-0.5-0.2-0.2-0.1-0.3-0.5-0.3-0.3-0.2-0.2-0.2-0.5 0-0.2 0.1-0.2 0.3 0.1 0.7 0.4 0.2 0.1 0.3 0.1 0.4 0 0.5-0.1 0.2-0.2 0.6 0.1 1 0.5 0.9 0.1 0.3 0.2 0.4 0.2 0.7 0.2 0.8 0.3 0.4 0.1 0.2 0.2 0.4 0.4 0.4 0.2 0.3 0.2 0.3 0 0.3 0 0.3-0.1 0.3-0.2z",    IDN538: "M675.4 183.1l-0.6 0.3-0.7-0.4-0.6-0.6-0.4-0.6-0.2-0.7-0.1-1.5-0.2-0.6-0.2-0.3-0.5-0.4-0.2-0.2-0.1-0.3 0-1.1-0.2-0.6-0.3-0.5-0.3-0.7 0-0.7 0.2-0.4 0.2-0.3 0.5-0.7 0.3-0.3 0.4-0.2 0.2 0 0.2 0.1 0.7 0.5 0.2 0.2 0.1 0.3 0 0.3-0.1 0.6-0.4 1.1-0.1 0.6 0.1 1 1.9 4 0.1 0.4 0.1 0.5 0.2 0.4 0.1 0.3-0.3 0.5z m-36.9-10.2l-0.1 1-0.2-0.1-0.6-0.6-0.2-0.1-0.2-0.1-0.2 0-0.1-0.2 0.1-0.3 0.3-0.2 0.3-0.1 0.4 0 0.3 0.2 0.2 0.5z m22.8-4.3l0.1 0.1 0.2 0 0.5-0.2 0.3-0.2 0.2-0.1 0.1 0.1 0 0.4 0.2 0.1 1.3-0.1 0.7 0 0.4 0.3 0.4-0.1 1.7 0.2 0.2 0 0.4-0.2 0.5-0.3 0.2 0 0.5 0.1 0.9 0 2.5-0.3 1.1 0 2.6 0.4 3.8 0.2 0.8 0.1 0.3 0 0.1 0.3-0.2 0.1-1.4 0.7-0.3 0-0.7 0-0.5 0-0.3 0.1-0.2 0.2-0.3 0.1-0.5-0.1-1.8 0.1-0.2 0.1-0.6 0.2-0.7 0-0.2 0-0.7 0.5-0.5 0.2-0.4-0.2-0.4-0.3-0.4-0.2-0.3 0.1-1.5 0.3-3.6-0.1-0.5 0.1-1 0.3-0.5 0.1-1 0-0.3 0-0.8 0.3 0.1-0.4 0-0.4 0-0.4-0.1-0.3-0.2-0.2-0.9-0.4-0.2 0.1-0.2 0.4-0.2 0.1-0.1-0.1-0.2-0.2-0.1-0.2 0-0.2 0-0.5 0.2-0.4 0.4-0.1 0.3-0.1 0-0.2 0.1-0.2 0.2-0.1 0.2 0 0.2 0.1 0.3 0.3z m-19.4-3.5l-0.1 0.5 0.7-0.3 0.7-0.2 0.9-0.1 1.2 0.2 0.9 0.3 0.3 0.1 0.3 0.2 1.3 0.1 1.2 0.5 1.4 0.2 0.3-0.1 0.2 0 0.2 0.2 0.1 0.1 0.6 0.1 0.2 0 0.3 0.1 0.2 0.7 0.3 0.3 0.2-0.3 0.3 0.1 0.3 0.1 0.3 0 0.3-0.1-0.3-0.1 0.1-0.4 0.3-0.9 0.1-0.2 0.2 0 0.3 0.2 0.2 0.1 0.7 0.1 0.2 0.4 0.1 0.5-0.2 0.8 0.2 0.2 0.2 0 0.3 0 0.1-0.2 0.1-0.4 0.2-0.4 0.3-0.3 0.3-0.1 0.4 0.1 0.3 0.2 0 0.2-0.3 0.5-0.1 0.2 0.1 0.1 0.4-0.2 0.2 0.1 0.1 0.3 0.1 1.5-0.1 0.4-0.2 0.1-0.8-0.3-0.5 0-1.3 0.2-0.2 0-0.5-0.2-0.2 0-0.2 0.1-0.4 0.3-0.2 0.1-0.4-0.1-0.5-0.1-0.4 0-0.4 0.2-0.2 0.4 0 0.4-0.2 0.2-0.6 0-0.6-0.4-0.3-0.1-0.7 0.1-0.5-0.1-0.8-0.5-0.5 0-1 0.3-1.6 0.9-0.8 0.4-2 0.5-0.4 0.2-0.4 0.1-0.7 0-1.3 0.1-0.5 0-0.5-0.2-0.2-0.2-0.1-0.4-1.2-1.9-0.2-0.4 0.1-0.9 0.1-0.4 0.3-0.4 0.4-0.9 0.1-1 0.2-0.8 0.9-0.2 0.4-0.1 1-0.1 0.3-0.2 0.3-0.3 0.2 0 0.1 0.2z m60.9-6.1l0.2 0.3 0.4-0.1 0.2 0.1 0.2 0.7-0.1 0.1-0.3 0.1-0.3 0.1-0.5 0.4-0.2 0.1-0.7-0.2 0-0.6 0.4-0.5 0.4 0 0.2-0.3 0-0.2 0.1 0z m10.8 1.7l0.4 0.1 0.2 0 0.3-0.3 0.2 0 0.3 0.1 0.5 0.4 0.2 0.1 1.7 1.2 0.4 0.5 0.2 0.2 0.2 0.2 0.6 0.2 0.4 0.3 0.2-0.1 0.3-0.1 0.3 0.1 0.1 0.2 0.3 0.4 0.3 1-0.2 0.7-0.5 0.5-0.8 0.4-0.9 0-2.5-0.6-0.5 0-0.7 0.2-0.5 0.1-3.3-0.2-0.4 0.1-0.3 0.3-0.3 0.2-0.2 0.2-1.7 0.1-0.8 0-0.9-0.3-1.3-0.7-1.2-1.1 0.1-0.5 0.4-0.8 0-0.4-0.1-0.3 0.1-0.3 0.3-0.4-0.2-0.4 0.1-0.4 0.2-0.4 0.2-0.3 0-0.6 0.2 0 0.5 0.3 0.5 0.5 0.1 0 0.1-0.1 0.4-0.5 0.1-0.2 0.1-0.3 2.3-1.5 0.2 0 1.7 0.3 0.6 0.2 0.5 0.3 0.3 0.4 0.2 0.4 0.4 0.3 0.6 0.3z m-2.9-4.4l-0.1 0.4-0.3 0.4-0.3 0.1-0.5 0-1.2-0.6-0.8-0.1-0.4 0-0.2 0.2-0.2 0.3-0.4 0-0.4-0.3-0.3-0.1-0.1-0.2 0.3-0.3 0.6-0.7 0.3-0.2 0.4-0.1 0.3-0.1 1.4 0.5 0.3 0.3 1.1 0.1 0.3 0.1 0.2 0.3z m15.1-4.2l-0.5 0-0.2 0-0.4-0.1-0.3-0.2-0.1-0.3 0.1-0.4 0-0.2-0.5-0.4-0.1-0.1 0.1-0.3 0.1-0.1 0.3 0.1 0.1 0.1 0.1 0.3 0.1 0.2 0.4 0.2 0.2 0.2 0.8 0.1 0.2 0.3-0.1 0.4-0.3 0.2z m-23.4-5.6l0.1 0.3-0.9 0.3-0.2 0-0.5-0.4-0.7-0.1-0.8 0-0.5-0.2 0.1-0.9 0.2-0.5 0.2-0.3 0.2-0.4 0.1-0.9 0.2-0.3 0.3-0.1 0.6-0.1 0.3 0.1 0.1 0.1-0.3 0.4 0.2 0.2 0.2 0.3 0.5 0.7 0.1 0.2 0.1 0.2-0.1 0.4 0 0.3 0.5 0.7z m6.8-7.9l0.5 0 0.1 0.3 0.2 0.2 0.3 0.5 0.2 0.4-0.3 0.5-1.3 1.6-0.2 0.4-0.1 0.5 0.1 0.3 0.1 0.1 0.2 0.1 0.3 0 0.3 0.1 0.1 0.2 0 0.7-0.1 0.2 0.1 0.3 0.3 0.2 0.2 0 0.3-0.1 0.4-0.3 0.4-0.1 1.4-0.1 0.3 0.1 0.9 0.4 0.2 0.1 0.1 0.2 0.3 0.4 0.1 0.4 0.4 0.1 0 0.1-0.1 0.3-0.1 0.3-0.3 0.4-0.9 0.9-0.2 0.1-0.2 0-0.3 0-0.3 0.1-0.5 0.3-0.2 0.1-0.1-0.1-0.5-0.4-0.2-0.1-0.5-0.1-0.3-0.1-0.2-0.3-0.2-0.1-0.2-0.1 0-0.3 0.1-0.5-0.1-0.2-0.2-0.4-0.1-0.1-0.3-0.2-0.2 0.2-0.2 0.1-0.4 0.1-1.2 0.7-1.4 0.4-0.2-0.1-0.2-0.5-0.2-0.4-0.1-1 0.1-0.2 0.6-1.4 0-0.3-0.7-0.2-0.2-0.1-0.4 0-0.2-0.1-0.1-0.4-0.1-0.1-0.4-0.1-0.4-0.7-0.1-0.1-0.1-0.3-0.7-0.5-0.2-0.2-0.2-0.4-0.1-0.3 0.1-0.4 0.1-0.3 0.3-0.3 0.2-0.3 0.2-0.5 0-0.5-0.1-0.2-0.2-0.5 0.3 0 0.4-0.3 0.3 0 0.2 0 0.2 0.2 0.4 0.4 0.2 0.2 0.2 0.1 0 0.5 0.2 0.2 0.2 0.2 0.2 0.1 0.3-0.2 0.2-0.4 0.1-0.5 0.1-0.4 0.2-0.1 0.4-0.1 0-0.2 0.1-0.4 0.1-0.1 0.2-0.1 0.2 0.1 0.7 0.3 0.3 0.2 0.1 0.4 0.1 0.1 0.5 0.4 0.1 0.2 0.1 0.2 0 0.3 0.2 0.3z m-9-3.6l0.1 0.2 0.2-0.1 0.1 0 0.3 0.2 0.1 0.3 0.2 0.1 0.7-0.1 0.1 0.1-0.1 0.2-0.1 0.3-0.1 0.1-0.4 0-0.2 0-0.1 0.3 0 0.4 0.2 0.3 0.2 0.2 0.1 0.2 0.1 0.3 0 0.3-0.4 0.3 0 0.3 0.2 0.6-0.1 0.2-0.2 0.3-0.1 0.4-0.1 0-0.3-0.1-0.5 0.5-0.3 0.1-0.4 0.1-1.3 0 0.1-0.3-0.3-0.2 0.1-0.2 0.4-0.2 0-0.3-0.1-0.3-0.2-0.2-0.1-0.1-0.3-0.1 0-0.2 0.2-0.5 0-0.6 0.1-0.2 0.2-0.2 0-0.5-0.2-0.6-0.1-0.4 0.2-0.3 0.2 0 0.6-0.2 0.4-0.2 0.6 0 0.3-0.2z m50.7-0.7l-0.2 0-0.3 0-0.2-0.2-0.4-0.4-0.9-1.6-1.9-0.8 0-0.3 0-0.3 0-0.3-0.2-0.1-0.5-0.8-0.1-0.1-0.5-0.3-0.5-0.4 0.1-0.1 0.2-0.1 0.2 0.1 3.2 2.7 1.2 0.8 0.5 0.4 0.4 0.6 0.3 0.3 0 0.4 0 0.1-0.2 0.2-0.2 0.2z m-46.5-7.9l0.6 0.2 0.3 0-0.2 0.4 0.4 2.7 0 0.4 0 0.3-0.2 0.1-0.3-0.3-0.1-0.1 0-0.6-0.4-0.4-0.1 0.3-0.2 0.1-0.2-0.5 0-0.5 0.2-1.2 0.2-0.9z m0.2-3.6l-0.5 0.7-0.8-0.1-0.2-0.2-0.2-0.4 0-0.5-0.1-0.3 0.2-0.2 0.3-0.3 0.4-0.1 0.5 0 0.4 0.5 0 0.9z m0.3-9.5l0.2 0.2 0.1 0.3 0 0.5 0.1 0.4-0.1 0.4-0.3 0.3-0.5 0.5-0.4 0.3-0.3-0.1-0.1-0.3-0.2-0.3-0.1-0.4 0.4-0.7 0.2-1.2 0.4 0.1 0.2 0 0.1-0.1 0.3 0.1z m-1.9-0.1l-0.3 0-0.4 0-0.2-0.2-0.2-0.4-0.2-0.4-0.1-0.3 0.2-0.5 0.3-0.4 0.5-0.1 0.8 0.4 0.2 0.4 0.1 0.4-0.1 0.5-0.3 0.4-0.3 0.2z m-20.8-11.5l-0.1 0-0.5-0.7-0.2 0-0.1-0.1 0.2-0.3 0.2-0.2 0.1-0.1 0.2 0 0.2 0.1 0.2 0.1 0.1 0.2-0.2 0.4 0 0.2-0.1 0.4z m36.3-19.7l0 0.5-0.2 0.4-0.4 0.9-0.3 0.3-0.4 0.3-0.2 0.4-0.5 0.2-0.2 0.2-0.1 0.6-0.2 0.8-0.2 0.4-0.2 0.1-0.4 0.1-0.4 0.1-0.3 0.2-0.2 0.2-0.2 0.4-0.1 0.6-0.1 0.7 0.1 0.5 0.5 0.4 1.4 0.2 0.3 0.3 0.2 0.3 0.9 0.7 0.3 0.5-0.2 1.6-0.1 0.2-0.2 0.1 0.2 0.3 0.3 0.3 0.1 0.2 0.1 0.3 0.2 0.9-0.1 0.4-0.3 1.2 0 0.6 0 0.7 0 0.2-0.1 0.1-0.3 0.2-0.1 0.2 0.1 0.4 0.4 0.8 0 0.2-0.2 0.2-0.5 0-0.2 0-0.1 0.2-0.3 0.5-0.1 0.3-0.5 0.4-0.2 0.4-0.5 0.9-0.1 0.4 0 0.1-0.3 0.1-0.3 0-0.5 0-0.2 0.1-1.7 1.4-1.8 1-0.7 0.7-0.3 1 0 0.3 0.2 0.4 0.2 0.4 0.2 0.3 0.4 0.2 0.7 0.3 0.4 0.3 0.1 0.1 0.2 0.5 0.1 0.1 0.2 0.1 0.4 0 0.6 0.3 0.4 0 0.5-0.1 0.3-0.1 0.5-0.3 0.7-0.6 0.4-0.4 0.1-0.3 0.1-1.9 0-0.4 0-0.4 1.3-1.6 0.5-0.4 0.4-0.3 0.4-0.1 0.5-0.1 1.5 0 0.3-0.2 0.4-0.5 0.3-0.5 0.1-0.4-0.1-0.4-0.3-0.4-0.5-0.2-0.9 0.2-0.4-0.1-0.1-0.4 0.4-0.4 0.7-0.6 0.3-0.4 0.4-0.8 0.3-0.3 0.4-0.4 0.9-0.6 0.4-0.3 0.4-0.2 0.9-0.3 0.4-0.3 0.1-0.2 0.2-0.4 0.2-0.2 0.1 0 0.5-0.2 0.5-0.3 0.4-0.2 0.5-0.2 0.5 0 0.1 0.1 0.3 0.2 0.2 0 0.2-0.1 0.2-0.1 0.2-0.4 0.3-0.2 1.2-0.2 0.9 0 1.5 0.2 0.2 0.1 0 0.4 0 0.1-0.6 0.4-0.2 0.4-0.1 0.5 0 0.8 0.1 0.2 0.1 0.1 0.4 0.4 0.3 0.1 0.3 0.1 0.1 0.1-0.1 0.3 0.1 0.4 0.1 0.5-0.1 0.5-0.1 0.2-0.4 0.2-0.1 0.4-0.1 0.9-0.2 1.1-0.1 0.5 0.2 1.4 0 0.4-0.1 0.3-0.4 0.2-0.5 0-0.2 0-0.2 0.2-1.7 1-0.4 0.3-0.1 0.2-0.2 0.1-1.3 0.4-0.4 0.5-0.3 0.2-0.4 0-0.4 0.1-1.9 0.5-0.3 0.2-0.2 0.3-0.1 0.5 0.2 0.4 0 0.3-0.1 0.1-0.3 0-0.4-0.2-0.3-0.1-0.3 0.2-0.3 0.2-0.1 0.4 0 0.5 0.1 0.3 0.3 0.4 0.8 0.6 0.5 0.6 0.4 0.4 0.7 0.2 0.4 0.3 0.3 0.1 0.7 0 0.6 0 0.1 0.1 0.2 0.1 0.4 0.4 0.2 0.2 0.2 0.1 0.7 0.1 0.4 0.1 0.7 0.4 0.3 0.1 0.4-0.1 0.3 0 0.3 0.1 0.3 0.1 0.2 0.1 0.3-0.2 0.3 0.3 0.1 0.2-0.1 0.7-0.2 0.4 0.2 0.3 0.1 0.4 0 1.7 0.1 0.8 0.3 0.3 1.3 0.2 0.2 0.1 1.1 0.2 0.6 0.4 0.6 0.7 0.5 0.8 0 0.3-0.9-0.8-0.3-0.1-0.3-0.1-2.9-0.8-0.4 0.1-0.5-0.2-0.6-0.3-0.7-0.2-0.7 0-0.6-0.2-0.5-0.4-0.9-0.9-0.3-0.2-0.2 0-0.7 0.1-0.3 0-0.6-0.2-0.3 0-1.5 0.3-0.7-0.1-0.6-0.5-0.5 0.2-0.5-0.3-0.4-0.5-0.4-0.3-1.7-0.2-0.4 0.1-0.5-0.2-1.1-0.1-0.4-0.2-0.5 0.4-0.3 0.3-0.3 0.3-0.3 1.8-0.3 0.4-0.1 0.3 0 0.4 0.6 0.6 0.1 0.5 0.2 2.3 0 0.3-0.2 0.3-0.3 0.4-0.2 0.3-0.1 0.4 0 1 0.2 0.9 0.2 0.7 0.7 1.2 0.4 1.3 0.4 0.7 0.1 1 0.1 0.4 0.2 0.4 0.6 0.7 0.1 0.3 0.1 0.5 0.2 1 0.2 0.4 0.9 1.4 0.2 0.8 0.7 0.6 0.2 0.3 2 3.3 1.1 1.2 1.3 1.1 0.2 0.2 0.4 0.6 0.4 0.3 0.8 0.4 0.3 0.2 0.1 0.3-0.2 0-0.6-0.3-0.7-0.2-1.9-0.1-0.4-0.1-0.3-0.2-0.3-0.2-0.2-0.4 0.1-0.2 0.3-0.1 0.3 0.2 0.2 0-0.5-0.8-0.9-0.6-3.4-1.2-0.4-0.3-0.2-0.4-1.2-2.6-1.2-1.8-0.6-1.6-0.3-0.3-0.4-0.6-0.4-0.1-1.2-0.7-0.8-0.5-0.4-0.1-0.3-0.3-0.4-0.5-0.4-0.7-0.1-0.5 0-0.5 0.3-0.8 0.1-0.5 0-2.5 0.1-0.5 0.2-0.5 0-0.2 0-0.5-0.3-0.7-0.1-0.4 0-0.9 0.7-2.5 0.1-0.4 0-0.4-0.2-0.3-0.3-0.3-0.2-0.1-0.5 0.1-0.2 0-0.9-0.8-0.2-0.3-0.4-0.3-0.3-0.4 0-0.2 0-0.7-0.2-1-0.1-0.3-0.5-0.4-0.1-0.2 0-0.2 0-1 0.3-1.3 0.1-1 0.2-0.6 0.7-0.4 0.3-0.6 0.3-0.6 0.2-0.4-0.3-0.5-0.7-0.3-0.9-0.1-0.7-0.2-0.2-0.5 0-0.3 0.3-0.4 0.1-0.4-0.1-0.2-0.2-0.6-0.2 0-0.1-0.1 0-0.8 0.1-0.2 0-0.2-0.3-0.2-0.1 0-0.5 0.3-0.4 0.1-0.3 0.1-0.3 0-0.1-0.5 0-0.3 0.1-0.2 0.3-0.4 0.2-0.3 0-0.2 0-0.5-0.2-0.3-0.2-0.2-0.2-0.3 0-0.5 0.1-0.4 0.7-1 0.6-0.8 0.5-1.5 0.8-1.2 0.4-0.9-0.2-0.6-0.3-0.6 0.1-0.5 0.7-1-0.2-0.3-0.1-0.3 0.1-0.3 0.2-0.1 0.3-0.1 0.1-0.5-0.1-0.2-0.2-0.1-0.1-0.1 0.1-0.1 0.2-0.4 0.2-0.8 1.1-1.8 0.5-0.6 0.5-0.9 0.3-0.4 1.2-1.1 0.5-0.7 2-2.1 0.7-0.6 0.1-0.1 0.1-0.4 0.3-0.4 0.4-0.3 0.4-0.2 0.4 0.1 0.4 0.1 0.3 0.1 1-0.5 0.2 0.3z m-6.5-1.7l0.6 0.1 0.3 0 0.2 0 0.1 0.2 0 0.5-0.2 0.4-0.5 0.1-0.5-0.3-0.2-0.5 0-0.4 0.2-0.1z m8.9-0.6l-0.3 0.2-0.3-0.2-0.2-0.4-0.2-0.4 0-0.3 0.1-0.2 0.3-0.5 0.3-0.5 0.1 0 0.3 0 0.4 0.8 0 0.2-0.5 1.3z m9.3-6.8l0.5 1.1 0.2 0.3 0.3 0.2 0.9 1.1 0.2 1-0.3 0.9-0.4 0.8-0.4 0.8 0 1.4-1.3 2.3-0.2 0.7-0.2 0.3-1.2 1-0.4 0.2-3.2 0.3-0.3 0.1-0.3 0.3-0.6 0.4-0.4 0.2 0.1-0.5 0.3-0.5-0.1-0.4-0.7-0.7-0.1-0.4 0-1.5-0.1-1-0.2-0.5-0.4-0.2-0.4-0.2 0.2-0.5 0.9-0.8 0.6-1 1-1.9 0.8-0.9 0.9-0.4 0.4-0.3 0.3-0.8 0.1-0.2 0.5-0.3 0.2-0.1 0.1 0.1 0.3 0.3 0.6 0.1 0.2-0.2 0.2-0.4 0.3-0.5 0.4-0.2 0.4 0.2 0.3 0.3z"  },  names: {    IDN555: "Nusa Tenggara Barat",    IDN554: "Maluku",    IDN557: "Sulawesi Tengah",    IDN556: "Sulawesi Tenggara",    IDN381: "Sumatera Utara",    IDN513: "Sulawesi Utara",    IDN558: "Papua",    IDN1223: "Jawa Barat",    IDN1227: "Jakarta Raya",    IDN1226: "Banten",    IDN1225: "Bengkulu",    IDN1224: "Jawa Tengah",    IDN1229: "Lampung",    IDN1228: "Kalimantan Barat",    IDN540: "Yogyakarta",    IDN1796: "Kepulauan Riau",    IDN1185: "Kalimantan Timur",    IDN1933: "Irian Jaya Barat",    IDN1931: "Kalimantan Tengah",    IDN1930: "Jambi",    IDN1837: "Gorontalo",    IDN1230: "Sumatera Selatan",    IDN1231: "Bangka-Belitung",    IDN1232: "Bali",    IDN1233: "Jawa Timur",    IDN1234: "Kalimantan Selatan",    IDN1235: "Nusa Tenggara Timur",    IDN1236: "Sulawesi Selatan",    IDN1237: "Sulawesi Barat",    IDN1136: "Aceh",    IDN492: "Riau",    IDN539: "Sumatera Barat",    IDN538: "Maluku Utara"  },  default_regions: {},  proj: "mercator",  default_labels: {},  proj_coordinates: [    {      lat: -2.0204,      x: 156.3,      lng: 102.1676,      y: 173.5    },    {      lat: -2.0268,      x: 154.4,      lng: 102.0797,      y: 173.6    },    {      lat: -7.0994,      x: 318.7,      lng: 109.6433,      y: 284.2    }  ],  initial_view: {    x2: 1008.99,    x: 0.99,    y2: 438.33500000000004,    y: -65.665  }}//Map logic - do not editeval((function(x){var d="";var p=0;while(p<x.length){if(x.charAt(p)!="`")d+=x.charAt(p++);else{var l=x.charCodeAt(p+3)-28;if(l>4)d+=d.substr(d.length-x.charCodeAt(p+1)*96-x.charCodeAt(p+2)+3104-l,l);else d+="`";p+=4}}return d})("(function (plugin_name) {` .') ` \"(funcName, baseObj) {` ,$ = ` \"%|| \"docReady\";` E# =` N$ || window;var readyList = []` )&Fired = false` -&EventHandlersInstall` ='`!e%` H!() {if (!` h&) {` r)true;for (var i = 0; i <`!N&.length; i++` V$List[i].fn.call(`\"*\",` K&[i].ctx);}`\"1+}}`!U*StateChange`!f$document.` 7& === \"complete\"`!?$();}}`#P#[`#x$]`$%#`$O\"callback, context` ~#`\"e)setTimeout`%/*` U$(` T$;}, 1);return;} else`\"h'.push({fn:`!,'tx:` X#});}`!{B || !` >%attach`%5! && ` F5interactiv`\"~!`\"+'` E!`!v!`!m#`%L&`%{2`#{,add` D!Listener) {` #5(\"DOMContentLoaded\"`%S#,`' \");`%j\"` G/loa` <.`#`$`\"]0(\"on` I!statec`&$!` Y$`&1'`!)&` M*`!$(`'%$`(j5`(G!}};})(`*7&,`*&#);` +$`%v*Raphael.fn.print_path`&v)x, y, string, font, size) {var ` P\"text = this` b\"` >5, \"middle\")`+2!actual`!/$` d&.attrs.path.toS` c!(` M\"bb = `!q$pathBBox(` ^');` ]'remove` T#dx = x - bb.x ` \"!width / 2` ;\"y = y` 4\"y` ;\"height` 9%transforma`\"{!= \"t\" + dx + \",` &!y`-J#sult`!`'` Q%Path`!d(,` f+`){$` \\#`\"T(};});`$X'console, Object, Array`(9#typeof ` =#`)@\"undefined`*!!` 4*.log` 6,) {` W% {};` >)`%\\') {}`+:\"` m#`!K\".create !== \"` F$\") {` 1*` ^(o`1r#` )!F` t!F.prototype = o`\"w$new F;`!0#!`\"U!` ?&.forEach) {` #3`!))fn, scope) {`1#*, len`'U$`1%% < len; ++i) {`1\"$` ]!,` F![i], i` &\")`)S!})`1C#.`$M%` )#`$U$` (#`$^\"`*l$`!x\"min`!c)a`%!#`\"d#Math.min.apply(M`&1!` >\";}` [+ax` H>ax` T2})`(c#helper = `+B*`34'placeAll(str, find,` .$`!$&str.` .#(new RegExp(` H\"\"g\")` J&;`42&`.r$(obj,`'@!, fn`'o#obj`-|() {obj[\"e\" +` F! + fn`4\"!n;obj[` &*`\"!(` D0`$[$e` w!;};`! +(\"on` J$, ` r*`0B&` P!`0o,`\" $`0p&`\"H&line`+2!startX, ` #!Y, endX, endY`.j#` 4! = {x:` D$y` $\"Y}`$U!end` 9\"` U\"y:endY}`(l$\"M\" +` _\".`,n! ` &&y` +!L\" + end` 4'end.y`$5'clone(src`1[!n`%,!`*p'` .' != \"o`'z!`,,!` /(=== null`%c'` 4&;}var new` E&` 3(`(~!tructor();`*''i` Z)) {` Y'[i] =`!l.[i]`3y!`+m$`!6*isMobi`-Z\"Android:`%z)` Q$avigator.userAgent.match(/` P#/i);}, BlackBerry` 8L` P&` d#iOS` 4LiPhone|iPad|iPo`!M$Opera` <L` P! Mini` _#W`(X!s` 8LIE`#]\"` _#an`\"d2`$\"$.`#I#() ||` ,&`\"t&` *+iOS` #+`!t!` %+`!u#(`/H!`!6%isF` $#`-@%ToCheck`)I#getT`1r\"{`(|%` ;+ &&` ?$.toString`0j\"` b-`49![`(K\" `!2$]\"`)1'findPos(obj`.d(getStyle`-m\"styleProp`-i'curren` @\"`!u#y = ` +,[` S%]`,g$if `-O$getComputed` Y,` +3`!K\"`*C!` n)`#$#`+K(scrollDist(` q#html = document.getElementsByTagName(\"html\")[0];if (html.` e\"Top &&` U&` `$` ]#` <&`&:&[` T'Left,`!?!` @&`\"h)` |+||` NY +` ?<`!=0` 4>`!f,` F%body`!D1` .0`!6\"` E3`$f&[0, 0]`-t\"curtop`1P!curleft =` .# = 0, scr`&\\\", fixed =`2u\";while ((` ;\"scr.parentNode) &&` U!!`%N'body) {` $-` O\"`#Q'|| 0;`!5#` 1)`$R#0`%w!`(]%scr, \"position\") == \"`!_!\") {`!e$true;}}if (` -\"&& !`(!#opera`4L$crDist`\"%\"`'Z%;`!f$+` 3!Dist[0]`!]$` *'1];}do`\"4&+`)p\"offsetLeft` I'` /&Top;} `#C#obj`*E#` 7\"P`#J!)`,I$[` t#,`$8#]`)K'di`2h\"(xy0, xy1`\".#x0 = xy0.x`$}!y` '$y` *!x1` *!1` 6$` '$` 8\"dx = x1 - x0` +\"y = y1 - y0`!M$Math.sqrt(dy * dy + dx * dx)`!U'rotate_bbox(bbox, transform`-U(` A\"(point` 5*`!j! = ` 6![0]`!k\"` (%1` +\"str = Raphael.` W%Path(\"M\" + x + \",\" + y` u(`/j%()` d!re = /M(-?\\d+.?\\d*),(` \"'/` A!m = re.exec(str`$@&m[1], m[2]`(#a = [bbox.x, ` #!y`!l\"b` /&2` ,*c` A.2` 4\"d` A/` 4#a2 =`#>$a`\"5(`!'\"` 3'b` --c` 3'c` --d` 3'd` --x_array = [a2[0], b2` \"!c` (\"d2[0]`$N#` >)1` E\"1` E\"1` E\"1` D#x_min = Array.min(`!!#`!-$max` 5&ax` 1*y` M-`!4#` 6%` O+` 6%`$`#{x:`!=!, y:` h!, x2:`!1!, y2:` ]!, width` 1\" -`!n\", height` =\" -`!F\"}`.X%{addEvent:a` \"#, isMobile:i` \"#, linePath:l` \"#, clone:clone, isF`(S#:i` \"%, findPos:f` \"\", replaceAll:r` \"%,`)I(:`)V',`+E%:`+O$};})`(3#mapdata = `-~\"[plugin_name + \"_` :#\"] ? ` \"=:`0e#` s#info` ]9info` [;` <#` k+` =!= ` E'.subs`*N\"0,` ,)length - 3).`#)#(\"simplemaps_\", \"\"`(/#emo`0|$`(}!rand`2y'`)O!utoload`'n&`'X\"hooks_object = {over_state:` X!, ` -!region` &)loca`%1!` -$ut` J+ut` H,ut` F-click` K*` -\"` M*` .\"` K.ose_popup` +$zoomable_` f/` -+` s+omple` C&refresh_` (,zooming` '-back` &\"}`#U!`$f#`#\\!`#K+[]`#I*` '%`\"7%` -!`#H%` &$` C(`#?([]`#:*` &&` G'`#3+` -\"`#5&[]`#%3` &/` j(`\"^$[]`# /` T$`##)[]`#&#[]`#$\"api`&W'`)Q#:`)Y#,`)K$:`(p#, load:load,`'9\":helper.`,,!(`'F()`(k%` 6/` .(), copy:f`,Y# () {var new_` C\"`!P(` [)this.` 3#)`!e&` /1info)`!%n` z!copy`\"r'};`*F*.push(`\"&&`0y%` )&;}, cre`(M!`\"CB`.<?`!p)` 0<)`-k$`#>&`.E?` \\C` J\"` x'`#%~`#NUm`3y!_device`!2$`4-$.any() ?`/n!`\"'$};`$K%load`$P$`(p)this`32+` 6&`'<$`2Y+` 3*info;if (!` [$|| !`'R$ {console.log(\"The`!!%o` j&`!H#is missing or corrupted.\"`\"k$;}`1O/`!D'` 5!`.80` 9'` .(`2w\"ack_image, ` \"!s_directory, di` \"%`-9!_specific, main_settings, normalizing_factor`#v&pre`#{$` X* =`\"h$.` +*;` q)` <'` +)`!|!scripts = document.getElementsByTagName(\"` C\"\")`$j\"ysrc =` V$[` _#.length - 1].src;`\"u&`!@!`!2'.` 0'!= \"no\" ?` )6`&o#;`#T,` f-` 0-!= \"default` p.` =-`! $` u(` 4-?`$z- :`\"m\".substring(0,` ,#lastIndexOf(\"/countrymap.js\") + 1) + \"map`\"E\"s/\"`'$\"ignore_pos, rotat`,a!nual_zoom, responsive, div, initi` 6%` \"(_solo, tooltip_` a\", last`3\"ed` 4&up`&R&get_`!V!nfo() {div`#b-` /!== undefined ?`\"+!\" :` 8.;`!K(`$L.` 0)` e+-1` `-` D(` m)`\"L!` b9` ;#= \"yes\" &&`#$) != -1`-E+;`#h&` j-width` j!` ;&\"` O-`$b!` K-` 0#`&m,` 0#`'r%f (` Y$= \"0\") {` h%` =\"}zooming_on` t-`#L#`)\"$` L! :`![!;`&,'` G-` /)`#&$`\"g-gion`+b#info.`)+#_` 2$&& `!Q'?` /5`\"A(`,M$` 5#) {` {)` 0(;}` E(labels) {` #\"` D'` +\";}`'{*`#7%`($(` ,%`(-&` *%`)Q&`#q&var`\">!_time, popup_centered` ($orientation, order_number,` V\"percent`0i\"`&h#back, link_text` D\"`#C\", fade`!+#hide_eastern_`\"C\", `\"K\",`+E$`#g$`\"a#var adjacent_opacity` 0!op` \"&incr`0)!al` +!` W!_size` $'color` %'` U(new_tab` '!`!8%oc`\"a!` <)`3L'`\"v\"` |%`#G#` |%` *\"max`)2!` ('` c(` ,\"shadow` Y)rner`!\"\"` ,\"nocs` $(font`-5*refreshable`-B%`!$#`2$1ground_transparent`(P(0 : 1;`#>&` R-` 0'`*e,` 0': 22` _#`\"u!` P3` 6\"` R2` 6\": \"#ffffff\";`$F#` [-url_` 3%`*P3`$e4`!G.` 1,`!M-` 1,: 1;`%Z!` [-js_` 2#`!?3`&!'`$:.` 1'`!4,` 0(: 1.5;`&['` Y-` 0(` Z,` 0(`#`(`*c-` _3` 6(` f2` 6(: \"auto` w$`+{$`!Z4` 7$`!^3` 7$` g+`$b4` 0*`!V3`$k%0.9` i#`)`\"` X3` 6#>`4,\"` '7: 1`$<%`*@!`$.5` 8\"`$14` 8\": `%+$`*|!` U3` 5#`&F3`,;*` L3` 6%`!:2` 6%` g*font` Z3` 6!` W2` 6!: \"12px/1.5 Verdana, Arial, Helvetica, sans-serif\";`/{'`!$-`1v!out_` :'ly`\"o!no\" ?`!q\" :`\"v!;`1!,` ^-` 0-`!z,` 0-: 0.3;`3u%`!K2` 5!` [,` 0&: 0.5;`3G%` S-` 0&` T,` 0&* 1000 : 200`.t\"`%p\"pdata`.M\"s;initial_back` u-` 0)&&` \"8!`#V%` *7`%k$hide_eastern_`!O'` M(` /1`'A3link_tex`&P.` 0&`/D-` 1%: \"Visit Link\";back_imag`.n/` 1&`\"84` 8'`!V$`/4\"numbe`.x.` 0)` ],` 0)` g$`%`!percent`!Q0` 0,`&01` 5'`-4!9;}func`/.!is_onclick(`)a!s) {if ` &#`$ !on_` <!\") {return`(h\"} else ` ?+detect\" && touch` ?2` ,$`\"@\"}`!B*ff`!26ff`!03` b,var vml;var tough` %!ie` ,!ios` #!`\"3$` (!`0<#ff =` _#var reload` &)`\"3!` I&s;`!u%get_client_info() {vml = Raphael.type`\"$!VML`'I-ie = document.all` 0-os = helper.isMobile.iOS()` ;,`!_!` :/any` ;.`#Y$`/%._up`1W1` 3!:`/S0s;`#M$`#+%`#M(`$r*;`$B!map_outer`#O!map_inn` $&div` 0%holder`#g&create_dom_structure() {` Q\"`#C(getEl`0=!ById(div);` h&` ,: + \"` B#\") ?` Y8` =*`$P%f (`!#&`!W%.removeChild` 4(`&@\"t_to_del`!A7\"tt_sm_\" + `\",!if (` O%) {` #%.parentNode`!()` C&;}}`\"Y2`#]\"`!/#(\"div\"`#4\"`$N!` %Azoom` $A`%3!` sF.id = `#n$` .!\"`!(%` /*zoom` 6\"` !` /*` .!` 8\"`\"Z\"` 1*`$h#` 4(style.posi`&b!= \"relative` y(` &<`!\"` 4.absolut` 3/left = \"3px`\"?'` B<` :'top = \"40` N/` a8zIndex = \"1`!D.` -,div.append`'I.`#:'` 3,zoom` $9`!/!` %9`#s!`+P#center_x`(i!` &#y` (!widt`/;\"height` &!scal`/Z\"original_` >&` *%` F'initial_view` ,!normalizing_facto`,]\"ratio`,A.imensions(res` P!`*n&`#Q\"`!:! = \"`&H/` 1'if (responsive) {` 4$` f#offsetW`\"'!if (` 9\"< 1` 9.`*{'` J(`*o'`!0+` \"\"+ \"px\"`4!%` k&`02(` /#== undefined ? 800`0W-`#q\"`\"V1`!\"*` (** 1`.A$info.calibrate) {`$@( = {};` &(.x = -1 * ` K-.x_adjust` C*y` 76y` <1x2 =`%e).x +` K/`\"V\"` ~*2 = (` ^,-` _+) /` \\/`&V\"`$1$`\"W+` G$`'<)}`'p*`!e-`!(.;`(.+` C,y` B-y;` w!_to` I&`!(+/`)\"-` A%` 9$` U+;`)-.` c01000`%b!!`),'`*W!` p'`*S+`#A! = 1;`+L$ = 0.5 *`$&.+`$(,` L$y` =3y` C-y);transform = rotate ? \"s\" +`,B\" + \",\" ` \"(0,0 r\" +` H$` :$`!j%` \"+y :` P>\"`!@&_` 4!_only =` 6@}`.a!pape`-B\"everything` *!all_visible_states` 2!location_label` .\"` ?(` ,'`!R%` @!`!U0` 4!background` d%pil` p'`!3'all_region` &&`!J$` ''`!9'op` '$`/R,canvas() {`\"_! = Raphael`1`&,`&L\",`1A#);`!b& =`#5\".rect`&7+ -`'H,* 2,`%v+` 9(`(U#` A!` I-5` )'` @%5`!@(.`#S%(`#R0` >)hide();`#N&`\" %set` 2#`%)*` ./`#|#` '/`$$%` (0`$#!` *+`&!+`!37` ,1`$v&` G/`&\"!` )+`'\\&` B+` /&.push(`\"x&,`&9*,`'''` 4#`!<!);`(l!trial_`(m&map_` /! = false`&X-` L\"text() {`-7!demo) {return;}if (`!8$.hostname.match(\"simplemaps.com\")) {demo`!&%` Y(`!D%) {`*X\"rent`1&\"` 3\".` -\"Node;` %\".removeChild` V';`\"'.}` '(document.`\"@\"Element(\"div\"` R'.style.cssText = \"display:inline !important\"` E-posi`#E!= \"absolute\"`0Y!branded`\"@#h = 20`$*!w = 140`3k%` 7$3` 5&200`\" '`!$#lef`23&- w + \"px`!A.top =`+)# - h` 04zIndex = \"1` 7\"`+l!.append`#[-`&*'`,9+` 5!, w, h)`\"G/t`#O\"` U'.`&D!w - 5, h * 0.5, \"S`%w+;text.attr({'text-anchor':\"end\", 'font-size':14` ($w`\"T!':\"bold\", cursor:\"pointer` O%family':\"a`!{!sans-serif\", title:\"Built with `!W\"Maps\"})`$N)`!iS Trial`!vL8`!\\f});}`!7!node.setAttribute(\"href\", \"http://`*0,`!n\"click(`+B%() {window.`*&ref =` P4;}`,J#`#1!_back`4&%_arrow`,8-` 6!button() {` @&`-|+`(a$35` &!`(z!5`&w\"ack_image`&y#` '!`.3% = directory +`!E\"` =!` c!img = new I` /!img.onload = `\"\\* = img.`)i!;h` '#`)O\";make`!q\"();}` a!src` ?!`!@(`&>%` B*` %` +( {`#;&`)Q+outer`)S)`\"S,`#=&`#?*` i!.` E!(`!M*, 0, 0` m$` P,`'H#`&d,}` 7/reg_num = -1` 3'`2[\"` >,` T(`&X#` ,!` &!_handler`)P*` X\"path = \"m503.7,743.8c190.3-96.6 132.9-417.05-155.6-409.71v-128.7l-228.1,195.0 ` &\"205.8v-131.6c240.9-5.5 229.9,202.8 ` e!,269.3z\"`%|!`!I\"color`2N!in_settings.` 0(? ` \"6: \"#cecece` c-_bord`.|!` F5` ;$` g7` ;$: \"#808080` }(size = 0.0`(v\"`$:'box`%m*rect(`%_'`%R#fill:\"black\", opacity:0`,T.}`*$\"`&b:path(`$~&` }$stroke:`\"&., '` 6\"-`)X!':2` (&`!E#':1, `!a!` T', 'fill` 7)`!_..scale`!I#size,`#-', -2, -6`'_F_box`'jW` 2,box);}if (!initial`#?!`-~).hide();}}`.x!zoom_in`$$!` '!out` #&`/0!`.v,` 4\"`/!!s(`+]#`.\\.` W%`,A+zoom`%k!80`%9\"`!;#`)|& 64,13.787 0,100.426 m -50.213,` \"\"2001 ` 6#,`';#` b$`'#\"`!8%`&j:`)%$`&'.7`3^0`&K#\"gray\"`&5-1`'F#`!<$v`1 !`!:)`'E!`\"B(`'=+` c33`'%7`(}%`&qG0.3, 0.3`''#2)`$E\"in`3V+` /#`&?\"`#P',`\"5+`\"M'out`$\\'`$^\",64.000999`$:1out`$754`#O~`!;'`$59`\"2$`#Q~`$1>55`$6#out`$@0out`$J'`#Z#`$O#`\"?&)`*.&move_bbox(dire` /!`*,'last_destination.sm.bbox.`\"H! / ` L%;if (w > `+u$view` @#- 1) {return` 3);`,\"!h` m8height` })var x` 88x + (`!\\;- w) / 2` i!y` R8y` Q9`!Y#- h` i\"`\"?#{x:x, y:y, `!+!:w, ` E\":h};}`#q*zooming_dimensions`#dE` I..w`\"|-`#I4` J/`$f*`#N8` J/`#_5`!Q1`#]A` G/`#w5`!z1`$0%var r = w / (original_`%G\"* `)'!)`$J0`$U!:h, r:r`$N(`!&$allowed`#dj` =$`*@\"` 3% < 1 ? true : false`)3!`(l$zoom != -1 &&`!)1type == \"manual\"`!f#` Y$`\"i\"= region_array[` r(]`!k4`!r!outside_` K#`#i!`*h&`*d%`!o!`\"7(&&` K,`!O%` a+is_` .\"`%1-,`!Z7)`\"#` `)||`!Q%`-Z!solo) {` '!to(` R8`%`#`#{\"}}}`!}/w >`!C*-1`##5`-Z#if (!`!*E-1]);}`!<*` '#true`&{+_about`&x)`!*!`',6`/)%`.\"`#_' = {sm:{type:`&!$, zp:1}}`$s%_tween) {`$9,` A:`(-B = current`0c!box` D1bbox = {x:` ?+.x /`*N\", y` ,-y` 3&`/7\"` 1,w` 7&`/N#` 2,h` :$}`#9\"new`!q*`/W>`#E!!` K*`$*'`\"`@` O*;`& $` P')`%X,in_click(`&P$`%s\"2` 8-out` 510.5);}` e#.` <\"` m))`!B\"out` 2(` f%` 8#in.touchend` F5` 3*` W'`#n!cattr, la` \"!r` (\"`(\\#map, label_attributes, loc`\"q!s, set_state` %\"` G!;`\"Y%set` N'() {` R% = mapdata.` +%;`!G! = [];`!K!` %\"`!C&` 3$`!C*` ?#` G&var`!6!`*a$` >(`!S%(`-u#defaul` E$ = {};` &*.color =`+8#` .+hover_` &9opacity`\"N!in_settings.`!Y#` 7$? ` \"9: 1`!&2` `;` 7*` n3` 7*: 0.6` },url`\")4descrip`,P#` #<_mobile` 24inactiv` '5zoomab` [!`/=!` 0+popup`\"T4` 8!s`\"M4` 7#: ` #\"`%6-ascade` d4` 8#_all == \"yes\" ?`!_! :`!q6_percentage =`+.\"` (&` A,x`\"]4y`\"v4x2` :5` 0&if `3/#s) {for (var`*_# in` ##` 0)i = 0; i <` 6$[` \"\"].`*l!s.length; i++`)%#` 4! =` :3[i`*@([` 0!]` E%;}}}`!3&d`!H*`*X![id] = Object.create(`\"G*`0H\"`!7$id].url` T(`&2(`\"v\"`!+&prop`!,'[id]) {` b+[prop] != \"`!4#\"` t(` 8#`\"Y&` +%;}` T2`&#$` Q1`'|!` >7no` B2`\"4#}}}`-d%`#j!`-Q7` ;%` ,)id`-x+` ;$`-{'` .!`-|%`(N*`!0\"` 7!` A+`.**` B0` 7'` M+image_sourc`+5.` =\"`,E*` k0` 7'` M+`-D\"` @0url`!;,`,d&` C*all` =\"s_` :&`*x;`\"s#i`+r/` d'hidden` BG`4Q\"`\"r3bord`#p5` 0)`.&,` 0): \"#ffffff\"` k2`$t8` 0/` v3` 7(`\";2` <)siz`#9.` 0.` p9` =!` v2`/6F` F&`+v#`$e5` :&`$[A`2Y2`'(\"`2W3` 0)`2\\-` q\"opacity` b3` 6$` d2` 6$: 1`*?1` ^:` 6*` l2` 6*` v.`*0'_mobi`#_/`*S-` A$?`2 \"` '0`#z$`32&_id`/c%`20!id] ?` 5$` )$` P$`/>&_id && `/3\"` *%].cascade`1/$` .-olor) {`.D2` 92`0X#` ,,`(^'` `-`)]*` ?8` f3`#1'` l-`.k*` ?8` f3url` d-`/,\"` 70` N3`.k$` Y-`/E'` <5`#;4i`$U!`/81` 81;}}c`4S$ = Object.create(` Z))`%w!mapnam`*t\"us\" && (id` *!GU\" || ` '#PR` \"(VI` \"(MP` \"(AS\")) {`!>%`!h$`+u!`\"B\"`!#0`0q!eastern`0x\"s)`!C(VT` y(NJ` \"(DE` 0(DC` =)H`!^)A` \"(C` g)R`\"'*D`!t/`2N%`\"&#for (var prop in`*B#specific[id]`)2#` '.[prop] != \"`$2#\"`!$(` 8#=` `/` 5\"`#E\"` _5`/d$` _1tru`&L#` C9no` I2`+v\"}` \\!`-s6`*G#= \"off` \\)`*`+` .&`*[#};`#P%id in mapinfo.paths) {se`'?#(id);}}`-{!set`$:\"_attributes = func`*v!() {var `'$`$d${}`/c%` .!.font_famil`0`.` {\"font`0X-` 0': \"arial,sans-serif\"` v+`\"U$` P0` 6\"` j2` 6\": \"white` f,`#K*` L0` 6(` l2` 6(:`# *`$:#` &*size = ` W\"size`!D,`*Z\"` }*`(d&s`'\"% ?`&t!`24%` Y*line`&S%` ).`\"89` 6'`\">2` 6': \"black`#K,parent_typ`,i!`&Z!` -3`4^!`!U0anch`!L5` 6#`!K2` 6#: \"middl`!(.ill` ~3width`!#-pill_` 5\"`!\",` 0'`#u2x` s3y`!+3`/f\" \"Not Named`!n,displa`(v4` 6$`\"d2` 6$: \"all` j,`#r5preset` 4%`*h-s`!H!`+q\"` +*` G!apply_`+;,`+b&id) {`+~,`3y9` H!);` @0`!c&`/4!`1%-`!R*`1+'` '.`1 2`!!0`/e%` M4`0[\"` j5`16'` b9`1B&` N9`1F\"` M9`1O$`0)\"`$<\"mapdata`$*4if (!` a0`$'S}`$+-`$#-`#OY`#n2`#9_`#2^`4D+`$_*) {`(?/`4X\"` J+` B+`$T)` K\"se`(y5` m4` S5;`%g\"` n!ocation`\"@'` t)) {`*y)` H# = {}`+S&` /#`3$\"`,_.` |$`163` 1*: \"#FF0067`,l'` y$`4;(` n5` 9(` t5` 9(`/`-`!'$borde` o7` 9#` l5` 9#: 1.5` f4`!n<` 9)` k;`#6)FFFF`#*5`!z<` 9)`#&;`\"=%2` |.size` l6siz`#c/descrip`&A#` D3` :'` E9_mobil`!)7` 9/? ` \"8`%U5url` m6url` @.inactiv`!L.all` =%s_` =&`,|# ?`,a!`!16typ`\"87typ` A/image_sourc` A7` 9)`%@5` 9): \"`&T0id`\"8<` >!` t,` 0/:`/1!,`,5-.opacity`4d(`!Z$` 4#`((4` P&`'^9` ?$`(#;` ?$`$75`#*\"`%d9` 9&`#W;url` o6popup` k6` :!s` h6` 9#: ` #\"` n.x`2v%` *-y`31%`)^.ispla`#S7` 9$`!@5` 9$: \"all`%vUden`(l5if (`(r3= undefined) {`)64\"square\";}for (var id in`+e%s) {lattr[id] = Object.create`!+-);` ^%prop` \\)[id]) {if (` 7!== \"overwrite`%a#` E$\"`!*(`&])` b)[prop];continue;}` p)reg` Z-`$l&` 7$` O\"` d/ != \"`\":#` X)` 8#`!62` U5`$[$` U1tr`!v$` C4no` D2`%B\"}` W!!`\">&`*7)`\"U)`+<,` 0&`+w$` V2`4b!` W/` 3!` [)` -!;}}};set_`#a\"_attributes()` 3!state` %.label` $/`(m$` -)}var currently_zooming`\"m%var max_width` )!` B&pann` @(function `'T\"_tooltip() {var find_pos = helper.findPos(map_inner)` }!x0_page =` J%[0]` 5!y` (.1` 4\"x0 = 0` >#` \"%h` ,%w` +%u` +!l` P\"_mid` O\"_` \"$id = \"tt\"` )!top = 5` N\"eft` $%maxw = 40` p\"speed = 10` *#timer = 2` )\"endalpha`!>%al` \"(tt, t, c, b, h;return {`#C\":`#P%() {tt = documen`+=$Element(\"div\");tt.setA`$$(\"id\", \"tt_sm_\" + div` @\"tyle.posi` z!= \"absolute\"` 5&`*E'none\";`$F%.appendChild(tt)` /'onmousemove = this.pos;tt` \"4}, show`\"A'e`\"/\"`-($opup_off) {`\"y\";}ignore`&-#`/D&tt == null) {`&^#`.F$);}`\"%0block`\"I'zIndex = 2` *&maxWidth`1*!`(+# + \"px` T!`\"S!HTML = `!t#.sm.content;`!@$updat`!o!`\"8%;}, reset_pos`\"V'x, y,` d$`\"`#`\"6\"`1K(`\"./` +#` k#(y0 + y, x0 + x` h&;}, `!E&`#e1` [,u, l` S*` K+, manual`!h#` $%u`#1!nual.u;l` #&l;} else` <\"ie ? ev`'T!lientY +`'b&`'m$`'g#.scrollTop : e.pageY` v!` U-X` D>Left` ^%X;}u = u -`+j$` s!l -`,4$`&C!`&j% || `###_`\"2\" || `&s'` 5'up && on_click`'B'`#W0`#]!`%G.`#x* {`,b! =`${\"0.5 * `/*\"`,q! = `%=!` 3\"height`!{!l >`-<\" && u >`-?\") {quad = 4`$4$` G\"<` 093` ?*` m)<` =,2`%-%var ` .#1`1E#enter`.(!`\";# &&`(f(`#4$ &&`#|$` J&= \"yes\" || ` (/auto\" &&`\"y\" < 401) ? true :`+8'` N$`.K!`*Y#`0%\"\"-100`*L#` 2\"`00#` '.bottom`.1!uto` .'righ` N!` 2\"h = parseInt(tt.offsetH`$D!, 10);w` -1`,)!` ;\"`1>!ide =`\"4#- w > 0 ?`%0#(` .%) :`1.#bar`4'!`!I!- h` C*` .&` L\"`\"Y+bar`-2'`\"])`!D!` ,,`\"E+`\"l5`%Q$`(v'rienta`1\\\"= \"below\"`+Z#`%v\"= 3`&3&1;}` .(4`&J)`&z'` h2above` n,1`'[)` .(2`(B)` .)1`%q(`%35`#H\"u + 5`#84l + ` &!` 00`#I+`\"5'`!W(` jZ` |$`%|$l`!R8`!/63`!41`&?%`!&2`)/#`!_+`\"h.3`\"SC` Zd`\"?Q}}, hide`/A'`&C#tt != undefin`+j*display = \"none\";}find`0s!= helper.findPos(map_inner)`,b!` A$) {`1r# = ` -$[0];`28#` *(1];}}};}`!Z%getxy(lat, lng`!i#mapinfo.proj`(S!lambert\")`/N\"` 2\" ` /#`%B(` I-xy\") {alert(\"This map only supports x/y loc`)b!s.  These can be added to the mapdata.js file.\")`! 9robinson_pacific`!q+` /,` O9mercator` U+` /$`2G)` q+`2U\"initial = {lat:`#k$:lng};`$'%interse` (!(x0, y0, r0, x1, y1, r1`!:#a, dx, dy, d, h, rx, ry`/x!x2, y2` &!dx = x1 - x`03\"dy = y1 - y` *# = Math.sqrt(dy * dy + dx * dx`1:\"a = (r0 * r0 - r1 * r1 + d * d) / (2` %!`!9# = x0` ]$a / d` 4!y2 = y` 4!y` ,)h`!8)` &a * a` o\"rx = -` S\"(h /`!%$ry =`!\"\"` *(xi = x2 + rx` *#_prime` 1\"-` /$yi = y` C!`#6\"y` >&y` C!y;return {opt1:{x:xi, y:yi}, opt2` -\"` P\"` 3\"` &\"`(|)`(F#(lat`)#\"`!v!adian = 0.017453293`!@!pi`\"h$PI` +\"hi`)-!tlng.lat *` V#` 9!lam` 3'ng` 0*phi0 = 45` D-0 = 9`#g!` A)1 = 33` &-2` R/n`!`$log(` $!cos(phi1) * (1 /` 9\"` /#2)))` +$` I%tan(0.25 * pi + 0.` &!hi2` V*` /51))`%/\"F`!F$`!9(` ,!pow` n;1), n) / `\"3\"rho = F` T(`!'>` ^!` W$0` .N0` [\"`&H$x:rho` Z$sin(n * (lam -`$Y!)), y:`!&!-`!l!` D#cos` 9.`&a(`,2$`&`*earthRadius = 1`\"\"\"`&YEroundToNearest = `2]&` 4#, value) {`\":#` Z!floor(` 5! /` ^$) *` #$;}` z!getSign` k)` `+` ^\"< 0 ? -1 : 1` U#lng` U#` _#`\"Q#.lng`$I\"la` v$` 2,at` ;#ng`\"I$abs` M0` +0` U%ow`0,!`\"w((5,` R!- 1e-10);` ?\"` e!=`\" !0 : low`-[\"igh =` d!+ 5` m$Index` 0#/` 0#high` 0$` Q!` 1$ratio = (`!0\"low)` 3%AA = [0.8487, 0.84751182` &\"479598` &\"0213` %!3359314` '!257851` &!1475` Q\"0006949, 0.7821619` 3!7606049` T!7365867` l!7086645, 0.67777`!7#6447573` b!609875` 2\"5713448` b!5272973`!<!485626`!R\"45167814]`\"?!BB`\"?!, 0.0838426, 0.16768`!l\"251527`\"C!335370` _\"19`\"L#503055` Q!58689`!Z#718226`\"*\"533663`\"z#51804` j!915371`#U\"99339958, 1.06872269, 1.14066505, 1.2084152` ?!27035062, 1.31998003` '!523`\"3\"adj`$[!(AA[`%5%] - AA[`%]$]`(n!`%=!+` +)` Z$`\"y!(BB` T*BB` L2` ,(`,E'`!D\"*`(I!`0@$` )\"`(z!*`+X(, y:`!2\"*`)7%` 4)`,>0_pacific`,L*`)W\"`2U'- 150;if (lng < -180) {` A#ng + 360;}`!s#`-G%{lat:`)s&, lng:lng})`!A'mercator`!6*y`2Y-tan(`*_' / 90 + `2t\"`-t# / 4))`2B\"80`09$PI`/y(`\".&, y:y};}var calibrate = mapinfo.proj_coordinates;`!k%find_point(initial, pt1, pt2, pt3`!#` ]!` ;# =` *!` I$`,d\"pt1_proj` 5$pt1` 1$2` *+2` 1$3` *+3` 2#roj_r_pt1 = helper.distance(`!=(`!f!` _!` J+2` 6?`!P\"` S\"dist`!D$` G-` |#` ?1act` =2` I!` C\"scale =` z'/` T%`.Z\"`\"D#`\"M'/` P\"` 6%2` 3(2` 2)opts = interse`$q!(pt1.x`\"y!.y,` z\"`!L!` /\"2` -$`!Z#`!H!third`\"t?`$N\")`!T*emnan`!!`2A%` X,opts.o`!B#3) -`!,'`!A\"` _#2` B@`&t$` X*if (`!C%<` h%) {`(K&`!?%.x, y` $'y};} else` :0`#5!` D&2` I!`)*!rules`({,` 0!`!I\"ules) {for (var i in` O\"`(s#ru`%Y!` .![i`.Q\"condition_stri`,8!rule.` /%;try` Y\"` *% = eval`!-!` ?&);} catch (e) {console`,'!\"The` T'\" +`!&.+ \" is not valid JavaScript\");}if (`!!&`+##oin`&m!`!D!` (\"`,M$`+Z0`,G%[` F\"[0]]` #/1]` \"02]]);}}`/($` b:0` U)1` c)2])`-y\"tt_css_set = false`-c&set_` :\"() {if (` D&`&<%`0&'newStyle(str`\"v$a = document.getElementsByTagName(\"head\")[0`%F\"el` F(create` N#(\"style\");el.type = \"text/css\";el.media = \"screen\"`&o!el.` S!She`!s!` #).cssText = str`(*%el.appendChild(`!A+TextNod`\"C\");}pa` A)el`1n%el`\"u'getsupportedprop(proparray`(4$oot`\"R(`!/$`\"Y#;`(k'= 0; i < ` [%.length; i++`$H#` 3%[i]`)C!oot`\"V\"`!*#answer`.G\"` A%;` -%` #\".replace(\"borderRadius\", ` )#-r` +\")` ?6MozB` M+-moz-` 8EWebkit` S-w` 2!` =FboxShadow`!x\"x-s` (\"`![<` K'`!q#` 7@`!m$` R(`!i%` V'`%e#` Y\";}`.B#ound`\"3\"prop =`%m.[`$ -`#U/`#'/]`1:#cs`,S!` z+?`!*-+ \":`-k!popup_corners + \"px;\" : \"\"` l!min = width / 2 > 250 ?` '': 250;max_` .\"=` l#max` +\"?` }#` (%: min` y!`#)\"`\"P8`#]'`$F,`#{,`\"\\#s`\"]\"` p'?` |(`\"P%3 *`!R#` 8\"`\"V\"`\"o!3 ` \"54` %2rgba(0,0,0,.5)`#9$`)k!` A(< 0.01) {`!^#\"\"`/,\"m` (#.tt_mobile_sm{margin-top: 5px;} .tt_sm{\" +`%$\"+`\"H\"+ \"z-index: 1000000; backg`%2!-color`%!*lor + \"; padding: 7px; opacity:` A&` +#` G\"font` \\(font` 4\"` |#black`!b#nam`\"\"!float: left` \\\"-weight: bold` F\"custom_sm{overflow: hidden;}\";`\"z!+= \".btn_simplemaps{`!))text-decoration: none;`\"]&: #ffffff;display: inline-block;`\"a%5px`#k!`#z\": 0;`'i\"`#X!%; `*D)iz` O!`,H#box; `+E&` */` =4`!D!h`\"r#1.43`\"*\"align: center;white-space: nowrap;vertical` C$middle;-ms-touch-a`1e!: manipul`\"x!;to` \"5cursor: poi`!0!`\"G$user-select`#U#`\"D!` #0s` #/` 6.`\"Y\": 1px solid` +#`/n#: 4`'p!   `%)+:hover{  `%\"-underline;}`,Z\"xml_`&\\! = vml ? \"left`)\\!right`&2(xmark`'('\" +` V'`'c!`)M#left`)O\" `\",`$\\*0px;}\";newStyle(mcss);tt_css_set = true;}fun`$(! get_zooming_dimensions(element) {var bbox = helper.rotate_bbox` @$.sm.bbox, transform`-Y\"gotoX =` ]!.x` *%Y` +$y` *%W` +$`'x!` .%H` /$`\"=\"`11\"atio` %!zp = `!9'zp` 2!paperW`09#original`0J#* scale` >&H` t!` =(`!%\"` A%`!|$` \"\"- (`!i\"/ zp -`!v\") * 0.5` F!Y` D#Y` C$H` ?(H` ?(W` D#` g\"` .!H` ,#` O\"`/O!` :$` 1\">`*x\"_to`!a#) {`\"l!` a'`\"V&`!K#-= (`\"A(*`#>\"`!J&/ 2`!2)W /` x,;} else`! *H`!&$` s\"`#%#`!&%`#~\"`! *W`!$&`\"X$H *` |.return {x:` p!, y` $!Y, w` $!W, h` $!H, r:` }!}`'N'reset_s`'&!attributes(destin`){!) {for (var i = 0; i < ` 7'.sm.` ]!s.length; ++i`(.#` 4! =` \"\"_array[` G1[i]];` &!.attr(` %\"sm` )!`!Q\");highlight_labels` @\", \"`\"#!\", false,`)z!);}`\"8,las`\"F#() {if (` -!`!E' && ` $,.sm.type == \"` Y!\"` /4`!a'` z\"!` 20ignore_`-l!) {` 2-`\"[!` `;;}`\"[-` B,, \"out\"`\"U/region`%%(` ,\"`!n#` $%` #\".stop();` '#`!Y!` 2$`!F*`%U0` @&`%7I` G,`%Z!`% ;);}`\":-all`\"</) {` /&s.forEach(` S%`\"\\0`$U!d != -1`\"w!`#-9;}})`(}'loc`$/!_corre` /!`(y(, initial`\"k#`&I\"`(u,typ`.j$`//!mapinfo.paths`(f,id]` G!`2(\"`1(# + \"s\" +`06#all_`!R$s.hide(`1K\"zoom_r`$0\"` '!time * 1000` G+`#*.lc`2j$display = lc`15!` *#`/,!!` -#hide`#b#` G%= \"all\") {` @!how()`.2$` 9,out`)K!`)Z%`'p!` 6@`$E\"` O*` -#`!J#Raphael.isPointInsideBBox`$Q(.sm.bbox,`\">$x,` \"$y)`!:+`!33`+L&`+Z+`!,8Path(path` tA}var new`4P$`$+%size`15$`%8!new_`1#!` .2 *` .$iwh` H%x` C&x -` Y'/ 2` <%`%?'y` >#`!G#/ 2;` 3#bbox = {x:` s!, y` $!y, x2` -\" +` v&, y` 0\"y` /#` k\"}`&>!`!v$hape_`#Q%circl`#R%!vml && !touch` %!`)B&lct.animate({r`!#!`!j#* 0.5},`(@&)`!%)calable`,B\"`$#$` (,` q&`)X%:t` f*`%i$`!D\"ttr`!21` ='`!eJ` `\"` f', `#Q!` -!`#Y#`#x,`!R+`!O-` ?Q);}}`\"mO`!,!`#1(`.H,hide_reveal`0L$`)o'`-`j`2S'in `!)!`2'\"`! #lbl =` ,([i`.}\"`-\\'bl`-[(` O#_se`)k!` U!`20!` Y!` F#`/a$paren` C!` 2\"` *\"`&p\"` ,\"`.C#` k#`/h$`, /!=`\"n\"&&`!S%!`.h'` ?=`,e*!`,==`!Y\"x,` \"$`,X\"` bA`/9'` r2`.s7` lG`(s!` @#line`$k$ine_`%Y#get_` '%(lbl);` F'`'%#path:` =%});}`!($`.&`'/*and_show_before`!(, `*-&`'%?last`-?#` &\"` 50back_arrow`\"Z$loc` >!_corre`!U!`!/2;`(n;`&f!`3V/reset_`%k!_attribute` L+`*w\"`!w&` N/` 9!` a!(` |+`&`'`\"D+` ^\"` Z%` )\"`!9(`\"x,`&[)`!25` 0Tout` 6K` ['`\"p*`\"N\"`\"Z?`(V'`,c- !`%T2`\"v=` *$`,B\"` I5]`\"Q2`#uW` [Z`#y#highlight`'>$` Y,,` D#`1n#` [!!` Y#`!r!manual_zoom) {all`#v\"s.stop();all_pill` $)` <#`+#\"'fill-opacity':adjacent_` +#}` X(` *D`\"^)`!2\"` '(` R11` H,m.`\"o\".forEach(`,F%(`4E$`&h\"be`1A\"il`4\\!` $(`!6$` '*`!'5}`!5+animate({'stroke-width':`/V,order_hover_size * (` F! / original_` ,!) * normalizing_factor * 1.25}, zoom_time * 1000`0.&`$9<1`$(>1});`'J\"all`'A/);}` z(`\"F3`\"G#`!Wm`173after`.w)`%2\"`0&#`'v!_solo &&`0:$` 0!`(D!-1`+]0`-}/` g(back) {`1W'`3,$`$%#return`-H)` j4`+\\#||`!$< ||`!v%`!!<if (`*O'`\"*4`+\"$` U2}var end`+d(`4Z!`$6\"wee` )\"current_viewbox;`$?%` B\"o`4/1, call`\"!#`0L%`&,#d`)b!` %'`)]&` *' = false;}` 2!click` +'`!k+ =`\"W(;tooltip.hide()` '$_up` W%`\"0#ly`#>!ing = true`1p!`/,` <#_dimensions) {` #= = get` x$` .'`'B);`$$!to`'D\"` Q)` a=`$<!to = {x:` Q..x, y` $0y, w` $0w, h` $0h}`!%!from`!T/`2K0`!U3from`!h\"` X0`!j\"` %1`!m!` %1`!o!` %1h};ratio =`#L/.r;`+[*before`'91)`'k&updateZoom(`(1$`*>!) {`(:+ =`(R%` =!;paper.setViewBox` S*.x,` B*.y,` \"+w` 2,h,`'G\"`-r(whenDone() {`-k;`\"5'`$S,`(`+`(90`(a\"on`)T\"` (%`\"{\"`#h\"level();trigg`2}!ok(\"`%S$complete\", [])`)3!helper.isF`\"(#(`+>%) {` $$`,Y!`)b!vml && !touch` %!`\"*$ {`,]!able = new T` ($;`,w& = ` >%.` %!({from`&+!, to:to, du`&\"!n:`1f,, easing:\"easeOutQuad\", step:`$)%`%X-`%k5;}, finish` S') {`$k%to);}}`1?&`&A.to`&6.to.x, to.y, to.w` '!`%r&`%h&;}`%~&create_bbox`!X\"(auto) {var pri`!p!r`%E\"\"simplemaps_\" + map_name + \"map_mapinfo.` c!` m\"array={\"`*q!` (, = {};for (` 6% in ` `$paths`!C$ath_to_add =` 4*[` T!];` 5*Raphael._pathToAbsolute(` ;')`!Q!bt` C'pathBBox` 5.x = Math.round(bt.x` 3\"y` (-y` 2#2` (.2` f#` ).x2);`#c)+= \"'\" +`\"q#+` '#\":{x: \" + x + \",y:\" + y` '!x2` (!x2` 4\"` (\"y` )!},\";`#p,`#2# = bt;}`$~+` #(.sub` $\"(0,` ,*length - 1`!l/};\"`3b\"`&-#prompt(\"Copy the following ` O#and add it to` >!end of your`\"Q!`&F+.js file.\"`!K*);}return`&E-`-z'`'v#content(element`&K#` /# = ` 1#.sm.descrip`-i!var embedded_im`(=!data:image/svg+xml,%3Csvg%20`+z\"-backg`%2!%3D%22new%200%200%20256%20256%22%20height` C\"256px` 1\"i` U#Layer_1` /\"version` 4\"1.` .$`*x\"` 0\"` o3width` t-xml%3Aspace` 6\"preserve` 6%ns` 3\"http%3A%2F%2Fwww.w3.org%2F2000%2F`\"\\!` J'Axlink` =<1999%2F` F\"22%3E%3Cpath%20`\"Z#M137.051%2C128l75.475-7` \"!c2.5-2.5%2C2.5-6.5` C!0-9.051s` +\"-2.5` +\"%2C0L128%2C118.949L52.525%2C43.475%`#;!c` N!` i%` S*s`!*#`!$%%2C` 8!L` m#`!b#`!\\#%2C`!e#`!^'` K3`!7#1.`!M!1.` \"!2.88`!m!.8` i!4`!j#` +!s3.275-0.6`!\".525-` 5!`\"@$`#7\"`#0#`!C&` YG`!P\"` p6`#g:L`$R)z`%_!F`%\"\"`%o#3E`0V\"xmark_modern = \"<img id=\\\"xpic_sm`-W!`1R!div + \"\\\"src=\\\"\" +`)Y*` 7! style=\\\"`'w!: 18px;\\\" alt=\\\"Close\\\" border=\\\"0\\\" />`!?(vml`!C!a` a%line-`)k\": 1.5\\\"`!A<>X</a` j( = vml ?` y':`\"N)` F!url`,(*url ?`,;(url : \"` t\"url_sub = url` -!js_` ^\"` 4#`/R*11) == \"java`-(\":\" ? true : false` a!tab_click = \"(`.-$(){window.open(`#z\"url`\"L\",\\\"_newtab\\\")})()`!]\"reg` b%`!V#?` _1location.href`$v#` t%` k! :` D1top` :?`\"s'_clean = helper.replaceAll(`#/#, \"'\", \"\\\"\")` Q$`\"[1\" +` g*+ `!$'upon` O%new_tab ?`#S':`\"u&`3I!` e\") {` M)`!5$;}var mobile_par`1g6_` ?\"`%l*` -/: \"<div class=\\\"tt` 3#_sm\\\"><a` 1%btn_simplemaps\\\" onClick='`#f!`!e&+ \"'>\" + link_text + \"</a></div>\"`\"D!!`!M'` S$) {`(B$\"\";`\"9*\"\";}if `4`$`(!$== \"\" && ` d(`\"6.) {` ].var content` /$` (#` p#? (` 1+\"\")`\"0custom`#.!; /`\"X!` b$`\"V!`\"Q\"return` L.`#d\"div>` *,nam`$\"#`-$!`\"8&name` q&` J)`+L\"` L%`#K\"` =*`,m$clear: both;\\\"`$8#`!g#`!y&`\"V\"+`&J)` f&`\"5#}`(+$ is_forgery() {if (map`!k!!= \"continent\") {`\"j#`+p\"`$*!i = 0;for (` *!d in mapinfo.paths) {i++`%F\"i > 8` ^&true;} else` l,`!R)inside(small_`#N#, big` %$) {var ` <! =` \"\"` 4$.sm.zooming_dimensions`'N!` C!.w >` `(` :2.w`\"J1bb =` M,bbox`+G!big = {x:bb.x * scale, y:bb.y` &&x2` <!2` 7'` -!y` )%};`\",\"xbar`\"7$.x +` ##w / 2` <#y` 7(y` :%h` >!`\"K%` d\"`\"R!.x &&`#+#` X!` 0\"y`%D#` D'<` I\"2` A+` 1\"y2`$g,}`\"|.state_bbox_array =`1v'make_` =!, ` >!storage,` P#` M!;`%N%creat` J#s(refresh`!n#!` %&` ^( = {};` c'` +\"}`!D/`':$` +,`!e!`$/!d_border_size = ` \"(`$P# * normalizing_factor * 1.25;`\"E& = `\"-%(id`'E#brand_new =`\"U([id] ?`#1\" :`#e\"`#R% =` L'? paper`)@!(`)E)[id]) :` g,`/`\"vml) {` 6!.node.setAttribute(\"`,P!\", \"sm`!x\"_\" + id)`$|\"attrs = cattr` p!` .$` [!s = {fill:` D!.color, opacity` .#` '#, stroke` /#`#Y#` K#cursor:\"pointer\", '` H\"-` W#':1` *&width':`$F.` 9&linejoin':\"round\"}`\"j!`!6\"inactive) {`\"!&.`!>\" = \"default`1[#` y#hov`!h$ =`\"s\"`!}$` /(?`#.\"` '0: main_setting`\"U*`+[\"` H(`&a#` [/` 5!` s1` 5!:`'0(`'N/` r)` \".`'I@var ` M!`%<*`%**` n\"`%5%`%\\'`\"j'`%M%`\"~.`$q;`!i&`$u\"`(A%`'f%sm`*j#`%/'mage_source` ='.ignore` n\" =`)A\"`%P'fi`1C!\"url(\" + directory +`$ #` m( + \")\"`!+(`%:/||`$I4`!L(emphasizable`!P$`3Y$` -4`.z#` 6%`$rA`.!\".attr`!o!`\"S\")` 0#transform(t` \"$` 3$sm` P!`%<%` #&` 7&`%Y.` #+` A&descrip`-x!`'u$` )'`!*'djacent`&T+'fill`++&` =%` +#`0H#.sm.hid`(v&hid`\"[$` 4#_label` 4)` -\"`&45.reg`!q\"`#r,nam`!!&` (!`)v$` (!:`1V%name`/J!`/6\"` T)` ~(` j#id` z'ur`!d&url`\"$&`-&$` 5%` )$`$6'n_click = is_on` (!`'5#popup`%#'` +!_off` F#ff` 23`#)!s = []` +&zp`!>%zoom_percentag`!C'zoom`'E#` @&abl` 8'`%H'_mobi` B'` ).` M&type = \"` ,!\"`\"x'd`#H\"`%//`'L$`%6)` ?%content = create_` *#(` =!)`.X\"ba =`46#bbox`42,sba) {` @\"Raphael.pathBBox(`%R$path`%U!`42#bbox = {x:sba.x, x2` $\"2, y` %!y, y` .\"y2`'l'` R#bbox` '*.`.A!` 4#.x2 -` ##` 8+height` @$y` ?%y`\")!`#5)`'*%hide()`,Q%`(R,all_visible_` L!s.push`#=$}`.%!`)\"-`#>&`#W$;all` K2;for (var id in`)(%`#R!) {mak`!4#(id);}` ^'`!t$func`,2!style_background() {` $&`-}\"{`2I!main_settings.` :&`27%`,?*`3\"%`2l#\"none\"}`%+#`+X\"`\"O\", last_destination, ` \"';`!c%`&o#` V\"s(refresh)`#}\"!` %&` q(`3.#`'6!`3e)`0N*` )!*` =\" * normalizing_factor * 1.25`'!default`!B#`/%+`\"H#`\"+`! \"`###cursor:\"pointer\", '` P\"`#4&1` *&`'E!':`!l.` 9&linejoin':\"`$.!\"}`':!`#\"#) {`%b+` /&var`*k\" = rattr`*%!`$7'object =` L$` 1+` 4!`#s! ?`$h)`'E!: paper.set()`*z\"`$6,.sm`$=\"` &%.`'%\"`.E\"`!}&` m&) {console.log(\"Duplicate R`!^\"\");continue`%4\"x1`1%` *!2` \")y` 0*y` 4&`#-& = 0; i <`\"j*`!e#.length; i++`#N#`*/\"`.f!` >0[i`#@\"` )!`.(%`\"=\"` S$`3,(`\"E+` u%+ \" does not exist`\"P)`,X)`!B\"` V0`3}%+ \" already assigned to a`!~#` p)` j+`1/\"`!n!(vml &&`\"0\"`1N!gnore_hover && `3^#`(+! ||`1L$ov`(=$))`%X&`-0)`0D'`/=)`$s\"1_curr`1~\"`/i#`%+\"` '-2`%4#` ),y`%=#` '-2`\"5\"x1) {`&+!`!#&;`&,!` {&;`&-!` r&;`&.!` j&`0R%` Y+ <= x1 ?` '(: x1` p, >= x2 ?` '(: x2`!(, <= y1 ?` '(: y1`!@, >= y2 ?` '(: y2;}`)E,`$!'_`0v!if`$d$x &&`$a#y ` \"%x2` ,'2`#3$` 5#`!j\"` 6#`\"?\"` N$`!]\"` P$`!=(`%6#`+%)`$m\"`#G!` &,y`\"m!` &,`./!`#O! -` B/height`\"! -` L/`$)#` {-`#Q\"`&\"`0(*`2n+`\"3\"`2z%`0!,}`&`!`()!` D?`(Q\"` .#`/t\"`(t') {` Z&.fill`#P%` ;!`$X(`)5( {`!1+` N*` @'` V(inactive`!(*`\":\" = \"`34#\"`$f(`\"6)` #&`#S'`,7!`-y,name` 9'descript`,$\"`!H\"` )'` 42_mobile` =0` 4#` M'ur`\"U&url` /'labels =`2B)` 5&on_click = is_on` (!`#*#popup` A(cont`+r\"create_` *#`2`#` k)`%P-` #+` A'adjacent`%r;` >$`&%%` X&zoomab`#\"'` )$` 9'`\")!_off`\"D#ff`\"/4zp` [)_percentag` c(`&&$` B%` )$` 9'type = \"`1Z#` R(d`1H'refresh) {all_` ?\"`,h#`#K*`3~#id]`&I%`'!(zooming_dimensions = get_` '.` p%}`(<!`!8'` })-1]`,j\"`*O!ut`'_&` 7%;out.sm` A\"` &\"`\"O%out\"` ,$`#P!1` d!`-`#JSON.parse(` &!stringify(initial_view));`-J)`,}$-`3=$`-H*`-%$` 8#y`!7$`!-#`4*!`!J$`\"dGout);last_destina`*%#out;}}func` ,!`1D\"_to_bbox`1G\"s) {var `0y!false`\"`!`/#!` %&`1*!` $'` 4&for (var i = 0; i <`!!#.length; i++` ~#`2W$ =` =#[i]` l!` )!` .$`$W#` E$]`&a\"` *!) {console.log`3F% + \" does not exist\");continue`0p\"`#\\#` N!`#k$`\"E\"1`4R%`$X$`\"\\#` '-2`\"f#` ),y`\"o#` '-2`!v\"x1`4X$`!#&`4P\"` {&;`#_!` r&`4b\"` j&;} else` W- <= x1 ?` '(: x1` p, >`4P!?` '(: x2`!(, <= y1 ?` '(: y1`!@, >= y2 ?` '(:`4_!`#c({}`'|\"x`!o!` &\"y`!+!`(J*`(N!` 9$`(F%`(E!` C$`\")#` ]#`!G\";return`(S\"`!3!all_external_borders`'#&`(\"$`0:#` 9#() {`$C!mapdata.` 1#`+k!turn`#s%` g3`1q(}`(-!i in ` ].`\"u!` )! =` /,`($$b` h%path(` 8\"` '!);b.transform(t` \"$);b.attr({stroke:` L#color, fill:\"none\", cursor:\"pointer\", '` O\"-dash`)4!':[` Z#dash]` 8&`$G!'` v$size` 2&linejoin':\"round` n'miterlimit':4});`#00`0i\"b)`%v#label`*a\"`\"n!` *\"set` )'make_` 4!`$f-` 1!`$q!all` '#.forEach(` D%(lbl) {lbl.remove();`!X#` L#splice(0,`&1!` .#`,p\");`!Y'`'b\"pil` #)`!f+` /\"` d!oc`.|!s.toFront(` e%ttributes =`\"]$` *%.reverse();`\"R& = `\"'&id`&<#over` ~%`'u%`'^!` e-hasOwnProperty(id)`'l'`&k!rand_new`!J&`.{!id] ?` u\" : tru`06\"`\"N%`()+`)X!tt`(K!`!5,[id`'v\"pa`-x#`!h&` O!.` 3\"_`4U\"= \"`/B!\") {` I%`0O(` G)id]`)x$` V6region` d)` -\"` 9U`#w$` g)` -$` ]5`$?!` 1\"x && ` %#y &&`\"v#`,E#` '\".sm.` }1` [$=` O#.sm.x;` e$` *(y;`%^,`$f!}`!E\"`!+%`3k(\"The following object`3q+: \" + id)`.|#`\"5\"`!;\"nam`!l\"Not Named\"`\"3)` :(`!_'id` _\"`&h%`\"d#`!s)`'{#`&<\"pa`0x!`.'#rint` .!`!@#x,`&k\".y,` \"#name,` H#getFont(\"FreeSans\")` ?$size`'K\"`)<$`/%'`!0&)`0N%` 9.text`!*9);}` J0`)2+;}` ,!.sm`+i'.sm.hide =` i#hid`(f\"`&a#&&`%t(hid`+E$||`#d'hide)) {` d,`%Y\"` -%`'S%` #\";` W&`-j#`/V!` '!)`!:'.sm.`(|\"`+j!`) '` 0,]` U3`,8!`-e){`1[+0`2V#`\"`\"`2h#'font-size'` 2#`2##` 3!weight':\"bold`2z2` C!family` Z$font_` -\", 'text-anchor` 9$` (\"}`%o!`'*!`!j*`!['h` :!`!g!` H#ut` 46` A#`#I*inactive`(c#`/a#`\"$\" = \"default\"`$]$attr`&g!` D\"`1F#.sm` 5!`!/%` #&` 7&`!z.` #+` @'`!x,` #*` ?&`,j\" \"` ,!\"` .&id = id`\"H!`*C,`\"S&scalabl`2u&` #!`'$(re`1W\"`.V#` *!` |&x` 1%x` +&y` ,%y` +&line`1G?`0p&` Q%display = \"out\"`*~%` ./` n\"` )#`!#`3u'`\"7$`!5&`!Q!`.$% &&`\"@$`1D7if `(o\"`!/)= \"all\"`/l,L`)E! with lines cannot be shown at \\\"all\\\" zoom levels\"`-E&`!#%bbox`!|$.getBBox(tru`.6$ine`/<$get_` '%`*[$` =$`.S+` ?$).transform(t` \"$` p'`(i*`+6\":\"#000000`*G2`+S*2};line`(\\\"` d+)` 5\"`.q%` '\"`-^-` 0$`!?)` \\+` <%`(#4pill`&b%` E$`(H$` ($`%}4`'A,line` /\"_set`.L#in`1M!`+[*`&$%state`4_!`&F#ill`3|)`$|)`%1$?`%2#` ($:`%41if (vml`(X$` f!`)Z( - 0.5 *` '.`$:!`!}#` ,!`)v'` J\"` B+h`/r!` F(x2`3e%`!+#+` d:` A+y` B*` z#`1o!p = 0.15`&d!calculated_` o!` X*` -\"* (1 + p * 3`'9\"` C$`\".\"` (\"?`\";#` (\":` i-` T!`#}%`\".$`#6$(` Q\"-`!--`!+\"y`\".,`#c/`\">\" * p` N!` (#` K)` :%`\"+\"` v\"r =` E$/ 5`2'\"il`,|'`&$#`'_#` .*`+L%` 6(`*g!rect(x, y,`#)\",` ~#, r);pill`*j0_scale_only` ?\"`.@)pill;}` W!`*N!`(!&`*L(` ;!`*P$` &#`*G-`/(&`.E(`(b#||`)V*`.a(`!*&`(!%` \"->`$v+`)##` '$:` A-;` S,2` d/2 <` j*2` j+2` g/2` k,y` h.y`!b+y` j*y` e.y` e-`!^/y`!a,y`!b+y`!^/y`!`-`)$$`\"].-`#'=`'{%`!I.` L-y;`.:!`%C/region`%:9&&` d'` J\"`(O#` '\"`.Z$` '#`'O\"` B,]`!D$;` J'`&=!` \"*`%~=` B)` _*2` ^,`%qA` D*` e)y` b+`%j?` B)` _*`!O,`%^B` D*` e)`%v$`\"E+-`\"i7`%l%`!:+` F*y;}`36%`-O';all_pills`4T\"`4&!`4_,`4;!` %,` *!)`.'%` '3if ` &\".sm`&_%!= \"out\" &&`4]#` .+all`':!` 4%hide)` y(hide(`!4&all_visible_` @!`\"(#` H%`!D#!`\"Z&reset) {top` 69` H&`'v%type`(h!locat`)'!&& ` r&lin`!i!` 7#` f5all` $4` \"%`0d)` -%`$\"'`16<`\"R!vml`#7$.node.setA`1<$(\"class\", \"sm`!K\"_\" + id);}};for (var id in`!=#`1v' {mak`#p#(` O!`\"-'`$@$function get_line_pat`%_$`+t\"`(<&`\"B$`+W%` :!`#F$` 2,`-J*` >*points = [];` &+`#m\"{x:0.5 * (` s).x +`!$*.x2), y:` '*y})` \"r2` ^7` Q+, y` v2y` {-y2)` NF2` HM`$\\&`#k)` ''`!\"&`/%)+ `! )`.S(+`-p*`!{!` Q< -` .^` J.`$V!`!k(`$R\"` q(- `$S!` (d`\"t!`#Q#winner = {`)G'k`)G&`!)\") {` 4%j` 8!`$~*`)$#current`)_\"`+O%` =\"[k]`!,!` ;%` [# =` ],[j` D\"distance_between = helper.` 2$(`!$),` k-`,@\"k == 0 && j` $\"||` j.<`\"c#` s%) {` +#`\"&$`! );` 5$`!}&`!.,` ;$` j$ =`!&-;}}}return`\"3$linePath(`!1(.x,`!W$` *\"y` &&`!&#` 7(` +$y);}`,J)`/o!;`-k%create`!g%s(refresh)`2S\"` /%.forEach(` Q%(lct) {lct.remov`.g!);` H*splice(0, ` **length`+%'`!R!`&T+`0.#` M$`0%%` *#`0+\"`!G%` +-`&j\"iwh = 1`&)!attrs`&o!ttr[id]`%W!` 1!`3s\"!= \"image\"` W#`1B& = {'stroke-width':` S\"border * `2u! * normalizing_factor, ` S\"` E)_color, fill` 2#` +#opacity` .#` '#`'U!sor:\"`(=!er\"}`\"/!over`3('`!N5h` D!`!\"g` k\"`!^1` 5\"`!^7} else`#O0`!|E` b/`$c&inactive) {` L&.` M\" = \"default\"`(6\"shape_`%<!`%Q'`%M!`!9!size =`%x\".` (!`#$0`&!'x &&` H#y`&\"#`!b!`'Z\"` &!.x` i%x,` 8\".y` *%y`\"u)` T$getxy` |#lat,` F#lng)`\"W\"`!}(= \"squar`'B%new_height =`\"-\"* ratio`\"?!new_`%k! =` >(* iwh` 8%x =`!d#x -` H'/ 2` ;%y` ;%y` =#` d#/ 2`!Q1circl`!]%`.!'paper.` 9\"(`!0#`#\"%,`!v) * 0.5`2(\"bbox = {x:`!a&` E#`3#\"` M!, y` 9#y` )3x2` X%+` K2` 9$y` ,1`']%`\"A/`+W)` (!`2`(`'=#` 2!url ?`%\"#` (&: directory +` 1)sourc`'1\"`#:-` =!(`!!*, 0, 0`#-)false`08&` H$aded() {`0r%sm.`.7\"this.`%B$` (!`%-\"`%K%`&$O` w+`%yf` p%attr({` 4\":` ;&, ` l!` -!` %!, x` (!x, y` $!y}`1n&.sm.`&G&` 9*`%~!`!n\"+`!`&`%s!`!`\"` 0\"`!1\"}`,%\"img`\"d\" Image;img.onload =`#})` 5!src` ,'`!L\"`+-)`%2-rect(`!`#`!^#`!O'`!E&`([,`!iM`\"-%`\"'`-9\"`%n.iwh` ))`/\\)` #&`$L+` /&`$$'transform(t` \"$`$?*original_` 7% = ` #%` =*`1$-` #+`!}*`$=!d` ')nam`0O&name` 1)url` 4%url` /)`1F#\"` ,$\"` 1)`1d)` #&` 7)descrip`+F)` )'` 44_mobil`!l&` ).`\"H*`3b#`,L&` *#`#<*n_click = is_on` (!`2\"#popup`$6*` .!_off` I#ff` 26`*e'` +)`*Y'`)Y0bbo` B*labels = []`#]*iz`#`!iz`\"%*hid`\"K&hid`#n+ispla`4f&` )#;if (` 31= \"region\" ||`-0)` 7(state` =!`!.&`.f(hide()`)').content = create_` *#`!?%);all`+6%s.push` 2'` \"$_array[id] =`!X%`\",!!vml`!:(node.setA`(A$(\"class\", \"sm`!!%_\" + id);}}}`1$%`\"=!_or_`\"h\"(` +!`3!#current_destin`,p$` /#ly_zooming ? end` 9): las` L)`!t!` x!`)$&`)#() {retur`!K#;}` C)`!W\" && (` %\"`\"v#` 2+].sm.`!O#_dimens`#]!r <`!y0` 55||` 74`!p%out\")`!k&`!99`0:$if (` X<`&m$&&` V: !`$!%`#m)&&`#;\"` A&` ro`(0#` z.`!,/`!R3` ^~`!H4!` bh`'&+`(n&is_adjacent(element) {`,*!`(++`%'4` O#` +0`![&true`\"n(` AX`#,&(!` 5'`#3#||` I(`$r&` ~0id`(0'`!6I`!:&`!mn` ^:` --`\")0`!$2` ,$fals`%8)highlight_`2H\"`%B$, type, `%Z$, skip_check`%_#`#v(` W\"`!3%`!.%var `3>%` ?-;}` \"\".forEach(`!N%(` 4!`/^#par`1h\"`!9& ?` q\".sm.` 8#:`08-` 3+)`/\\!`-U&ver\"`'h%` B$il`1s!` $(.stop(` X\"!` e\"`%}!gnore_hover` B-attr(` B&over_a`2T$s);}`\"T\"` s$` '\"` P!` _%` B.`%{&`&D'set\"`!6%` S+ut` T)`\"(>`!h+` M,`%E$` 7=` A#`\"D+`%M$`!e#nimate`!W4, fade_time`!d2`#bI`!%#`\"'0` |)}`\"):` U.`\"8.` b*}}});`)%&`'j\"_inactive`.I+`'p~`!\"#` M'`!C$`%v*{cursor:\"default\"}`&W%` 21pointer` B!});}var inserting =`+q#`!D%emphasiz`\"Q,`-&,!`--%`\"^'`\"z,` e$able` ;(`!4'`-F!` K$` 3\"Before(all_visible_`!%!s);setTimeout`#4') {`!.}, 1`\"G#`4L#ly_over` 9%`$I\"st_`%u#d` -)`4Z#click` D#bel` %'` 0&over` #\"ut` #!background` O-` C%` (#` G'` A'` %&_handler`$7&create_event` 6$s(`%\\$`\":%`\"q)f (this`.F' {over.call` +,;}}`-0\"_out` EBut` K;`\"'!` _)e` U4` F!` [0, `)q!;`\"*4!` J!id && ` &\"`45&`.d\"`&{(`%h&|| no_tooltip`*+(var`4f%=`1r-thi`.U#`'f'`%j$) {` #$`'\\$}popup_off`*p*` .%` g!`'\"&pann`!X#` +&zoom` .#`!j#_up && `!.'`\":(`'m*`$?(` ++;}`(5-this`3T\"`*`&` t$`-U4`\"`,`,X'` S$`+O.`$m!_hook` Z*!`\"*'`\"G#.show` <&`!!%`4F\"if (vml &&`#U(`%=%location\"` 2+shape_` >%imag`,Y9`2!+` 2$`.R!`%@(ver`3Y*highlight_`#:\"` F$, \"over\"`/?&`'J\"`$y%` {'`!I~`\"'@`3g#`\"46`.X\"`\".?}}`.H#set_appearance`*~*` N$callba`%D)hide`\"i#is_adjacent`1s&&& `(M$== \"`)w\"\"`++$`!vQ`\":(fade_time, whenDone);}` A8`![#`\")` Q1`#!8ut\",`+R!`%e*`$S{ || `#('`%3a`#+>`\"I;);}`%a%` N$`0+$helper.isF` ;#(`%y%) {` $$(`&a\"`2>,force`&G)`.$*`.c%`0H3`)r.`0('false`.B/` 2\"`1aJ`1@D`/5/`.m>out`.TC`)'?!manual`#6!`#84`!3%`\"|$`%Mk`)#X`(S~`.'|`\"[4`(c>`1D3 || `(E! ==`\"W\" {`/=,`/./;last_`!Z#d =`\"V$`)E!`(<%`/x&`)$6| ` +&pann`%w(`'rF`'f;`)o&`2G(` /#` \\!` :%&& `*H)`(7$update_pos`(>#`$U(`(d'popup_`(f#`+!-over.call`)A+` a'zoomabl`!t(}}` p\"off`!u*` .%`\"U,` ]$ &&` +)`&k%`3B# || `$f!destin`'I! !` {% ||`'d1`&/!) {` $`\"@\"`+\\), e);`+M+`&L'`-_(`!<!` ]!ed) {out`\"}\"` +);setTimeout(`&/&`!=#_to`#G&}`(-*`'q#` 5.` 3#`-@,`!t3var lin`%u+url`!}\"ink != \"\") {var js_url =` O!.substring(0, 10)`#@!javascript\" ?`)7! :`0U(new_tab ||` g#`(^#` $%window.`+~$.href`!+#`\"N%` =#top` 13`&<$` B*open`\"0!, \"_newtab\"`$^-`&u&`+Q'`$I(`%~(&&`&C\"`$~&`+V-`%\"*}`#r3`'e!`)N'pos(e);}` ($show`$|&`&F)true`/f9ver\"` |\"`/+g`.M)`/S?ttr`)g(over`2$');}}`#W)`.R&var close_`!7! = docu` c!getE` @\"ById(\"xpic_sm\" + \"_\" + div`\"S\"` V'`((!` %%.on`/G.`#}'`**6`)z3`-L-trigger`%-\"\"`!5\"`,}!\", []);}`0y!back` O&`!A%`1R%`#c\"typeof`1h% === \"undefined\") {` 1&`!8#}`!2*back`!2#if (`!w\"`-\\'`-@-`-x0`.?1&& initial`2b!_solo)` *(`\"!#`*)3`+.':\" +` I)`* $if (incr`%.!a`'F!`!>9`3U!`!U!` 30`!s\"`#S#`&P)`2~,`$v1,`)4!,`%i*`.h$` v\"_array[`!#6]);}`/;.` 5D,`$}\",`%G%`/u&`/)!inside = is_` &\"`$~-, `! )`$U(]`08\"` :\" =`#L:manual`%>#`!1!?` _7 :` /*-1]`3\"-`#<e`#H7`#,1`)@(_handler`*n,` 8&(`)|!` 4%setup_panning` B$ground`*+/`&U#`4<'`+h+`\"e,`0]?`,60`,#,}};`!<%get_new_viewbox`1@!`%3!atio`.W\"oords =` F!` (!inate`1[!var newX =` @#.x` ,$Y` *&y;dX = (startX -` N!) * ` ,!.r;dY` 6%Y` 9\"Y` 3(var pan_threshold = 5` 5'if (Math.abs(dX) >` @+|| ` 6&Y` /-) {currently`$U$`3Q$}return {x:`!)\"x + dX, y` )#y + dY, w` )#w, h` $#h, r` $#r};}var mousedown`$$%var`\"#\"`\"B!`\"}\"` +&Y`$<*`#q*`%y\"e.touches`$S#` )!_obj = e.changedT` =\" ?` \"-[0] : ` \\%[0];`\"I&` c%.client`\"S!` %,Y}`(w%var y = ie`!$\"` :\" +`4J&`4U$`4R#.scrollTop`!@!pageY`\"Y!x` V,X` D>Left` ^%X`!|'x, y:y};}`)_'tart_pan`#?%`+a)` U#`(I#e.preventDefault`!R!` %*() : (e.` S\"Value`${$);`!(! = {x:`&B#`)($.`!V!` %,y, w` $-`&4!` %,`&>!` 9- / original_width / scale};`&U(`'\\!`*#<`)n#`*6'`)a#`*4'`,H+` '$pos(e, {l`'\"X, u` $\"Y})`-j'during`#)`&f% &&`&r&.length > 1`$:%;}if (!`\".%` .'var v`\".#`,u*;paper.setViewBox(v.x, v.y, v.w, v.h`!V(finish`!U)`!(& || !`+/-`+=3`&+\"`*T.`!,d`%<+ = v;`4J, = {sm:{}}` *-.sm.zooming_dimensions = ` i+` D1type = \"manual\"`\"3/setTimeout(`2Y)`\"p6}, 1)`4,\"arrow.show();}helper.addEvent(mapdiv, \"`!-%\",`*;&);` 2:move\",`&_'` 1<up\",`%L'` /<lea` |!` -A`'i!`!v!`!\\C` L!`!WH`(j\"nd`!C+`'g&order() {all_states.toBack(`$(\"ground` *&if (all_external_b` ^!s` \\#` ',.toFront();}all_label` *(top` #.` E!oc`&L!` ,(` ,$` @.`/e'et_`/+!s(refresh`*!$` %&`\"B'hover(over, out`!6\"` 5#click(click`\"`)` 2\"` '&_` 1.` q\"reset_`-_#, ` \")`'`)` h&` f\"_handler`#j\"responsive) {set_` '&` A$()`-Z\"`)M\"_zoom`$e,`%D\"`\"#(`!6#` 2%`!6&);setup`)^$();}`$Y\"`$,%`##1` 5&`#.)`%.'` Q\"` (!_` W\"` %#` Z%` B\"` Z\"` 6\"` _#`\")2`%[(`\"4*`&B)` 4#` d)}`.`!detec`#N!ize;`%z)`#S0 {` :%` M\"(`1D!size_`/4!()`/W\"` .\"Timer;` w) = `-F*lear`-f$` K');` \"' = `.)'` 3\", 300);}`\"u!window`*Z%Listener) {` #3(\"` `\"\",`\"U*,`.k\");` ?5orient`#q!chang` I6} else`!9&ttach`,=\"` vD` G(` nGif (vml) {document.body.on`#o2`$d$;};}`+B&`$j*`+A\"`.6\".offsetWidth < 1` ^!turn;}create`3K'(true);` a!.setSize(width, height);var scaled`-s#_`!_#` \"(* ` Q\" / original_` ,!) * normalizing_factor * 1.25`/*%`*d\" && `(L)`*z*forEach`4L'` 4!) {` #!.attr({'stroke-`!9!':`!h.});` J\"sm` N!ibutes[` J*] =`\"B/` O&over_` @:` C$` Y#`+Z!`\"PY}`,Z,`\"_.` 4$`%J#lattr[` -$.sm.id].type != \"image\") {` 6(`!x9` [2`\"<\"`!_T` b(`#5>`!,2`#W\"` ac`%s1`\"]B});}}`.?#adjusted_ratio = `!?2;`)N#trial_text(`).\"min` J'2 > 250 ?` '': 250;max` d\" = popup_max` +\"? ` \"+: min;`+:(veal_map(refresh) {`0=\"gion =` \"#_array[initi`2>#]`)x!!` +$back) {`4Q'hid`,Q!` B!` t&zoom_to(` s\", `+|\"` A!` s(_solo && ` )( != -1`! #ground.show(`3}\"`!*?for (var i = 0; i <`\"<#.sm.`+b#length; i++`\"h#id`\"b%` >&[i]`-W\"tate`*J$`#\"$d`\"y#`*^%hid`,A&`!n#}`!D(in label` \\\"`!2#` -!`'r!` 1%[i` u\"` .!.sm.parent`*J%` )).sm`*J\"== \"`!7!\"` /6`%.#!`\"?(id || !` 55) {` 3%hide =`$m!;` /\"`#o$}}}`1<$`$I.all_visible`/c$` '/` l!` 1%`'7(`&5!`'?!) {get_` ,#able_info();set`+M'()`).$`!*\"`2`#` -#`\"3\"` &+`.M%` (+`!Q!();style`&T!`\"7\"();hide_and_show_before(last_destin` k!, false);`,W!`!c#event`!\"$resize_`4?!();`)h'` :\"` y*after` u-);upd`&y!pi();trigg`1O!ok(\"`#:$complete\", []`,^#tooltip;`#f%load`#d$mapdata = api_object.` .#;mapinfo` ,-info`';!map_inner) {delete `\"?!;}expand`!e#preload();get_client`$n$get_` a\"` *!`+?!s_forgery()) {alert(\"The continent map can't be used with other data.\");`'($`%z3`%9#dom_structure` ,'imens`%j!` +%canva` %'`/d)`+'!`/'\"nocss) {set_tt_css();}`$\"# = ` W$` +\"` f&`-)!button` j#manu`-s#) {` @#`.8!` A\"` t!`()-`'7/`(?*`(8-`!9&`'@!` `!etTimeout(`%r%(`!;&`(d&`(X.re`!N!ll` y#`!P*`(?$` O#`(E!_handl`!0%`(W$`(?));`#*#.` T\"(`'v9`'{,, 1`(*#get_xy_from_map = `\"3)everything.mousedown`\"W'e, a, b`/U$ = ie ? `!l!.`'V\"X + document.d` \"#Ele` +!scrollLeft : e.pageX`1?!u` W0Y` I>Top` a%Y` e!find_pos = helper.findPos`)f'` D!x0 =` E%[0`2f\"y` ()1` /\"go`1}!`,%*.sm.zooming`(D'` K!this_width = go.r * ` )\"/ scale` <&height` =&` )#` <(x` 8\"x` -$ +` u(* (l - x0) /` \"`\"\"\"` O\"y` E,` y#* (u - y` Q!` .\";x = Math.`(P\"x.toPrecision(8));y` 3*y` 0-var print_string = \"x: \" + x + \",\" + \"\\ny` .\"y` .\";prompt(\"Below are your x/y coordinates\",` o)`,w&);}`/U&`'z)name, args`'*#fn = hooks`/J#[name]`+h!fn) {fn.apply(null` T#`(R\"plugin_array =` '$` g!` ^#for (var i = 0; i <` I).length; i++`!D(` 8([i`!,=}`!J!ov`\">#`)t)e`(6\"` w#type = ` .#.sm.type` {!` 5\"= \"`-N!\") {`+2*` z!` 6\", [` W'id]);}` V)`-D$` O3` 6%` H=`-i\"` P3` 6#` Q0}`&T!out`!uxut`\"-_ut`\"+`ut`\"L>click`\"W5, e`\"1^` }\"`\"_2, e`!gE` b\"`!{3` U0`#G6` e\"`#J5` f#`\"|\"zoomable_`\")~\"` }+`\"R^` b+`\":`-T'` C\"_zoom(id, callback`\"<#` 9\" =` @$`,-#d];zoom_to(` 3\", false` U';}` {%`\"9!` j5` 9! =` ?#` o.` 3!` c9`$w$` y&zp` z)if (!manual` ?!) {console.log(\"L` Z#`%>! only works when the map is in ` \\' mode.\"`1/&`$B$of zp === \"undefined\") {zp = 4` ;)`!^$` ;/` 1&`\"W\"`11\"destin`!i\"= {sm:{type:\"`!S\"\", zp:zp`'M#`\"s$ =`\"|&`#Y&var w` 0'.sm.size * scale * zp` A!h = w * original_height /` (&width` H!x` d+x` g%-` `!0.5` C!y` 9+y` ='h` ='r`!8!/ (` ~*` F$);`\"i'.sm.zooming_dimensions = {x:x, y:y, w:w, h:h, r:r}`&@%` ['`&29reset_tooltip(`&8#currently_over) {out.call` *,`%8\"!` X#_`$P\") {`%|$ else {` 2*`%9&if (on`*@\"` K'` H#.hide();setTimeout(`,V&) {}, 100`\"!(popup`&h!, id`\"&#`,L.var`- $`)X/`!n#`,23` N*`+8-`\"J$` 9*`&{/`#3\"`4W&`)w(`!2!+ \" \" + id` &!does not exist`)^%`(a(`#B$`/8*` .$`&X!bo`'J!ast_`&&=`/q&!`1G+` e!b` y*bbox`(G%(bb.x + bb.x2)`(6+(bb.y` 7\"y` 4%x = `(q%;y = `(W%`#G)x`!(*`!-\"y` '*y` P:var `'@#_`!h!x - box.x) / ratio` q!` <$`!o!y` =#y` :&`(>'_x > `)$1.1 ||` T'> `+Y#` 7!`.,Not in this`&(#`$l-`(8+` #!`)I\"`%x$`\"{%over` +,`)--true;`(}$`*[\"pos`\"#&,`!s&,`#Q$);ignore_pos` T+`*',`!v#` >!`)M+_`*-\"`*i%`*;$` b$up` ]%`\"F+`+y%`'8!` 1!ed`\"M'`,(5`,(fresh_`*L!(`*{!set` %&`%1!`4I4`1;!abels` 5$.sm.` ,\";make` ]'for (var i = 0; i <` U#.length; i++`(b#` 4!_id`)S!bels[i].sm.id;set_` /!(` =$)`!%\"` %,}`'P!no`/@$s`#=%`\"T%disable_`$\"!s() {` A*`%G)`$/#` T>en` X9`'9#` F%go_back(`1@% {back`$i\"` ,&` G'expand_api() {api_objec`%(!ibr`$F\"create_bbox`$ \";` >'get_xy = ` #\"_from_map` 8(loa`#{!oad` +,`/[#zoom`/f&zoom` 9(`%g\"` =#` #&` u*`/|#` ?#` #)` =(ba`/=!`#$#` .(`#a! =`(d\"` (-`(v!` 6$` (!` 7(zoom_level = \"out\"` 2(`%O* =`%_+` ?(`%%) =`%4*`#+*`))!`#0!`)2\"`#I-`)D'` <'`$\\\"`%9&upd`#I$`!|\"`%;+`\".)`2'0typ` ]/`&!.`!4!`*6%`*V\"`%9.s`%=&` 1-`'t# = ` ##;}`'5(;`&9$();}window[plugin_name] = (`!^%() {`.##` x&;})();docReady` ?*`+b0auto`!0!`!f!`+k/`!9\" =` ;+[i`-,\"ready_to_`(;#` H#&&` ##.mapdata &` \",.main_settings.au` ]$!= \"no\" ?`+n! :`/d'`!!)) {`\"5'` w\"`/,\"Timeout`\"P*`!7#load();}, 1);})` P$;}}});`\"_+push(`#R&` K!\"simplemaps_countrymap\");"))
/*!
 * Modernizr v2.8.2
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.2',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedDB
    // For speed, we don't test the legacy (and beta-only) indexedDB
    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    // documentMode logic from YUI to filter out IE8 Compat Mode
    //   which false positives.
    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    // Per 1.6:
    // This used to be Modernizr.historymanagement but the longer
    // name has been deprecated in favor of a shorter and property-matching one.
    // The old API is still available in 1.6, but as of 2.0 will throw a warning,
    // and in the first release thereafter disappear entirely.
    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF10
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17.
    // FF10 still uses prefixes, so check for it until then.
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq/
    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    // css-tricks.com/rgba-browser-support/
    tests['rgba'] = function() {
        // Set an rgba() color and check the returned value

        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally,
        //   except IE9 who retains it as hsla

        setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
        // Setting multiple images AND a color on the background shorthand property
        //  and then querying the style.background property value for the number of
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

        setCss('background:url(https://),url(https://),red url(https://)');

        // If the UA supports multiple backgrounds, there should be three occurrences
        //   of the string "url(" in the return value for elemStyle.background

        return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };



    // this will false positive in Opera Mini
    //   github.com/Modernizr/Modernizr/issues/396

    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };


    // Super comprehensive table about all the unique implementations of
    // border-radius: muddledramblings.com/table-of-css3-border-radius-compliance

    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    // WebOS unfortunately false positives on this test.
    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    // FF3.0 will false positive on this test
    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
        // Browsers that actually have CSS Opacity implemented have done so
        //  according to spec, which means their return values are within the
        //  range of [0.0,1.0] - including the leading zero.

        setCssAll('opacity:.55');

        // The non-literal . in this regex is intentional:
        //   German Chrome returns this value as 0,55
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/516632
        return (/^0.55$/).test(mStyle.opacity);
    };


    // Note, Android < 4 will pass this test, but can only animate
    //   a single property at a time
    //   goo.gl/v3V4Gp
    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        /**
         * For CSS Gradients syntax, please see:
         * webkit.org/blog/175/introducing-css-gradients/
         * developer.mozilla.org/en/CSS/-moz-linear-gradient
         * developer.mozilla.org/en/CSS/-moz-radial-gradient
         * dev.w3.org/csswg/css3-images/#gradients-
         */

        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore)
              (str1 + '-webkit- '.split(' ').join(str2 + str1) +
             // standard syntax             // trailing 'background-image:'
              prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer.
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome in
        //   some conditions. As a result, Webkit typically recognizes the syntax but
        //   will sometimes throw a false positive, thus we must do a more thorough check:
        if ( ret && 'webkitPerspective' in docElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-webkit-transform-3d){ ... }`
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };


    /*>>fontface*/
    // @font-face detection routine by Diego Perini
    // javascript.nwbox.com/CSSSupport/

    // false positives:
    //   WebOS github.com/Modernizr/Modernizr/issues/342
    //   WP7   github.com/Modernizr/Modernizr/issues/538
    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };
    /*>>fontface*/

    // CSS generated content detection
    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };



    // These tests evaluate support of the video/audio elements, as well as
    // testing what types of content they support.
    //
    // We're using the Boolean constructor here, so that we can extend the value
    // e.g.  Modernizr.video     // true
    //       Modernizr.video.ogg // 'probably'
    //
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
    //                     thx to NielsLeenheer and zcorpan

    // Note: in some older browsers, "no" was a return value instead of empty string.
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                // Mimetypes accepted:
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
                //   bit.ly/iphoneoscodecs
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    // In FF4, if disabled, window.localStorage should === null.

    // Normally, we could not test that directly and need to do a
    //   `('localStorage' in window) && ` test first because otherwise Firefox will
    //   throw bugzil.la/365772 if cookies are disabled

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
    // will throw the exception:
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22.
    // Peculiarly, getItem and removeItem calls do not throw.

    // Because we are forced to try/catch this, we'll go aggressive.

    // Just FWIW: IE8 Compat mode supports these features completely:
    //   www.quirksmode.org/dom/html5.html
    // But IE8 doesn't support either with local files

    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    // Thanks to Erik Dahlstrom
    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    // specifically for SVG inline in HTML, not within XHTML
    // test page: paulirish.com/demo/inline-svg
    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    // SVG SMIL animation
    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };

    // This test is only for clip paths in SVG proper, not clip paths on HTML content
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg

    // However read the comments to dig into applying SVG clippaths to HTML content here:
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-1149491
    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    /*>>webforms*/
    // input features and input types go directly onto the ret object, bypassing the tests loop.
    // Hold this guy to execute in a moment.
    function webforms() {
        /*>>input*/
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types:
        //   miketaylr.com/code/input-type-attr.html
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary

        // Only input placeholder is tested while textarea's placeholder is not.
        // Currently Safari 4 and Opera 11 have support only for the input placeholder
        // Both tests are available in feature-detects/forms-placeholder.js
        Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
              // safari false positive's on datalist: webk.it/74252
              // see also github.com/Modernizr/Modernizr/issues/146
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
        /*>>input*/

        /*>>inputtypes*/
        // Run through HTML5's new input types to see if the UA understands any.
        //   This is put behind the tests runloop because it doesn't return a
        //   true/false like all the other tests; instead, it returns an object
        //   containing each input type with its corresponding true/false value

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
        Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                // We first check to see if the type we give it sticks..
                // If the type does, we feed it a textual value, which shouldn't be valid.
                // If the value doesn't stick, we know there's input sanitization which infers a custom UI
                if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                      // Safari 2-4 allows the smiley as a value, despite making a slider
                      bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                              // Mobile android web browser has false positive, so must
                              // check the height to see if the widget is actually there.
                              (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                      // Spec doesn't define any special parsing or detectable UI
                      //   behaviors so we pass these through as true

                      // Interestingly, opera fails the earlier test, so it doesn't
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);

/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.isLoading=!1};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",f.resetText||d.data("resetText",d[e]()),d[e](f[b]||this.options[b]),setTimeout(a.proxy(function(){"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},b.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}a&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}if(e.hasClass("active"))return this.sliding=!1;var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});return this.$element.trigger(j),j.isDefaultPrevented()?void 0:(this.sliding=!0,f&&this.pause(),this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")?(e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(1e3*d.css("transition-duration").slice(0,-1))):(d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")),f&&this.cycle(),this)};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?void this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);!e&&f.toggle&&"show"==c&&(c=!c),e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(b){a(d).remove(),a(e).each(function(){var d=c(a(this)),e={relatedTarget:this};d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown",e)),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown",e))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown",h),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=" li:not(.divider):visible a",i=f.find("[role=menu]"+h+", [role=listbox]"+h);if(i.length){var j=i.index(i.filter(":focus"));38==b.keyCode&&j>0&&j--,40==b.keyCode&&j<i.length-1&&j++,~j||(j=0),i.eq(j).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu], [role=listbox]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show().scrollTop(0),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());c.is("a")&&b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this,d=this.tip();this.setContent(),this.options.animation&&d.addClass("fade");var e="function"==typeof this.options.placement?this.options.placement.call(this,d[0],this.$element[0]):this.options.placement,f=/\s?auto?\s?/i,g=f.test(e);g&&(e=e.replace(f,"")||"top"),d.detach().css({top:0,left:0,display:"block"}).addClass(e),this.options.container?d.appendTo(this.options.container):d.insertAfter(this.$element);var h=this.getPosition(),i=d[0].offsetWidth,j=d[0].offsetHeight;if(g){var k=this.$element.parent(),l=e,m=document.documentElement.scrollTop||document.body.scrollTop,n="body"==this.options.container?window.innerWidth:k.outerWidth(),o="body"==this.options.container?window.innerHeight:k.outerHeight(),p="body"==this.options.container?0:k.offset().left;e="bottom"==e&&h.top+h.height+j-m>o?"top":"top"==e&&h.top-m-j<0?"bottom":"right"==e&&h.right+i>n?"left":"left"==e&&h.left-i<p?"right":e,d.removeClass(l).addClass(e)}var q=this.getCalculatedOffset(e,h,i,j);this.applyPlacement(q,e),this.hoverState=null;var r=function(){c.$element.trigger("shown.bs."+c.type)};a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,r).emulateTransitionEnd(150):r()}},b.prototype.applyPlacement=function(b,c){var d,e=this.tip(),f=e[0].offsetWidth,g=e[0].offsetHeight,h=parseInt(e.css("margin-top"),10),i=parseInt(e.css("margin-left"),10);isNaN(h)&&(h=0),isNaN(i)&&(i=0),b.top=b.top+h,b.left=b.left+i,a.offset.setOffset(e[0],a.extend({using:function(a){e.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),e.addClass("in");var j=e[0].offsetWidth,k=e[0].offsetHeight;if("top"==c&&k!=g&&(d=!0,b.top=b.top+g-k),/bottom|top/.test(c)){var l=0;b.left<0&&(l=-2*b.left,b.left=0,e.offset(b),j=e[0].offsetWidth,k=e[0].offsetHeight),this.replaceArrow(l-f+j,j,"left")}else this.replaceArrow(k-g,k,"top");d&&e.offset(b)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach(),c.$element.trigger("hidden.bs."+c.type)}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.hoverState=null,this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){clearTimeout(this.timeout),this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;(e||"destroy"!=c)&&(e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]())})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(a(c).is("body")?window:c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(b.RESET).addClass("affix");var a=this.$window.scrollTop(),c=this.$element.offset();return this.pinnedOffset=c.top-a},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"top"==this.affixed&&(e.top+=d),"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.$element)),"function"==typeof h&&(h=f.bottom(this.$element));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;if(this.affixed!==i){this.unpin&&this.$element.css("top","");var j="affix"+(i?"-"+i:""),k=a.Event(j+".bs.affix");this.$element.trigger(k),k.isDefaultPrevented()||(this.affixed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.$element.removeClass(b.RESET).addClass(j).trigger(a.Event(j.replace("affix","affixed"))),"bottom"==i&&this.$element.offset({top:c-h-this.$element.height()}))}}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);

jQuery("document").ready(function($){
	
	var nav = $('#navigation-menu');
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			nav.addClass("f-nav");
		} else {
			nav.removeClass("f-nav");
		}
	});
 
});
/*! Respond.js v1.4.2: min/max-width media query polyfill
 * Copyright 2014 Scott Jehl
 * Licensed under MIT
 * http://j.mp/respondjs */

!function(a){"use strict";a.matchMedia=a.matchMedia||function(a){var b,c=a.documentElement,d=c.firstElementChild||c.firstChild,e=a.createElement("body"),f=a.createElement("div");return f.id="mq-test-1",f.style.cssText="position:absolute;top:-100em",e.style.background="none",e.appendChild(f),function(a){return f.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>',c.insertBefore(e,d),b=42===f.offsetWidth,c.removeChild(e),{matches:b,media:a}}}(a.document)}(this),function(a){"use strict";function b(){v(!0)}var c={};a.respond=c,c.update=function(){};var d=[],e=function(){var b=!1;try{b=new a.XMLHttpRequest}catch(c){b=new a.ActiveXObject("Microsoft.XMLHTTP")}return function(){return b}}(),f=function(a,b){var c=e();c&&(c.open("GET",a,!0),c.onreadystatechange=function(){4!==c.readyState||200!==c.status&&304!==c.status||b(c.responseText)},4!==c.readyState&&c.send(null))},g=function(a){return a.replace(c.regex.minmaxwh,"").match(c.regex.other)};if(c.ajax=f,c.queue=d,c.unsupportedmq=g,c.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g},c.mediaQueriesSupported=a.matchMedia&&null!==a.matchMedia("only all")&&a.matchMedia("only all").matches,!c.mediaQueriesSupported){var h,i,j,k=a.document,l=k.documentElement,m=[],n=[],o=[],p={},q=30,r=k.getElementsByTagName("head")[0]||l,s=k.getElementsByTagName("base")[0],t=r.getElementsByTagName("link"),u=function(){var a,b=k.createElement("div"),c=k.body,d=l.style.fontSize,e=c&&c.style.fontSize,f=!1;return b.style.cssText="position:absolute;font-size:1em;width:1em",c||(c=f=k.createElement("body"),c.style.background="none"),l.style.fontSize="100%",c.style.fontSize="100%",c.appendChild(b),f&&l.insertBefore(c,l.firstChild),a=b.offsetWidth,f?l.removeChild(c):c.removeChild(b),l.style.fontSize=d,e&&(c.style.fontSize=e),a=j=parseFloat(a)},v=function(b){var c="clientWidth",d=l[c],e="CSS1Compat"===k.compatMode&&d||k.body[c]||d,f={},g=t[t.length-1],p=(new Date).getTime();if(b&&h&&q>p-h)return a.clearTimeout(i),i=a.setTimeout(v,q),void 0;h=p;for(var s in m)if(m.hasOwnProperty(s)){var w=m[s],x=w.minw,y=w.maxw,z=null===x,A=null===y,B="em";x&&(x=parseFloat(x)*(x.indexOf(B)>-1?j||u():1)),y&&(y=parseFloat(y)*(y.indexOf(B)>-1?j||u():1)),w.hasquery&&(z&&A||!(z||e>=x)||!(A||y>=e))||(f[w.media]||(f[w.media]=[]),f[w.media].push(n[w.rules]))}for(var C in o)o.hasOwnProperty(C)&&o[C]&&o[C].parentNode===r&&r.removeChild(o[C]);o.length=0;for(var D in f)if(f.hasOwnProperty(D)){var E=k.createElement("style"),F=f[D].join("\n");E.type="text/css",E.media=D,r.insertBefore(E,g.nextSibling),E.styleSheet?E.styleSheet.cssText=F:E.appendChild(k.createTextNode(F)),o.push(E)}},w=function(a,b,d){var e=a.replace(c.regex.comments,"").replace(c.regex.keyframes,"").match(c.regex.media),f=e&&e.length||0;b=b.substring(0,b.lastIndexOf("/"));var h=function(a){return a.replace(c.regex.urls,"$1"+b+"$2$3")},i=!f&&d;b.length&&(b+="/"),i&&(f=1);for(var j=0;f>j;j++){var k,l,o,p;i?(k=d,n.push(h(a))):(k=e[j].match(c.regex.findStyles)&&RegExp.$1,n.push(RegExp.$2&&h(RegExp.$2))),o=k.split(","),p=o.length;for(var q=0;p>q;q++)l=o[q],g(l)||m.push({media:l.split("(")[0].match(c.regex.only)&&RegExp.$2||"all",rules:n.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(c.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(c.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}v()},x=function(){if(d.length){var b=d.shift();f(b.href,function(c){w(c,b.href,b.media),p[b.href]=!0,a.setTimeout(function(){x()},0)})}},y=function(){for(var b=0;b<t.length;b++){var c=t[b],e=c.href,f=c.media,g=c.rel&&"stylesheet"===c.rel.toLowerCase();e&&g&&!p[e]&&(c.styleSheet&&c.styleSheet.rawCssText?(w(c.styleSheet.rawCssText,e,f),p[e]=!0):(!/^([a-zA-Z:]*\/\/)/.test(e)&&!s||e.replace(RegExp.$1,"").split("/")[0]===a.location.host)&&("//"===e.substring(0,2)&&(e=a.location.protocol+e),d.push({href:e,media:f})))}x()};y(),c.update=y,c.getEmValue=u,a.addEventListener?a.addEventListener("resize",b,!1):a.attachEvent&&a.attachEvent("onresize",b)}}(this);
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

if ($.cookie("theme_csspath")) {
    $('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
}

$(function() {

    animations();
    productDetailGallery(4000);
    utils();
    demo();
});


$(window).load(function() {
    $(this).alignElementsSameHeight();
});

$(window).resize(function() {
    setTimeout(function() {
	$(this).alignElementsSameHeight();
    }, 150);
});

/* for demo purpose only - can be deleted */

function demo() {

    if ($.cookie("theme_csspath")) {
	$('link#theme-stylesheet').attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function() {

	if ($(this).val() !== '') {

	    var theme_csspath = 'css/style.' + $(this).val() + '.css';

	    $('link#theme-stylesheet').attr("href", theme_csspath);

	    $.cookie("theme_csspath", theme_csspath, {expires: 365, path: '/'});
	}

	return false;
    });
}

/* product detail gallery */

function productDetailGallery(confDetailSwitch) {
    $('.thumb:first').addClass('active');
    timer = setInterval(autoSwitch, confDetailSwitch);
    $(".thumb").click(function(e) {

	switchImage($(this));
	clearInterval(timer);
	timer = setInterval(autoSwitch, confDetailSwitch);
	e.preventDefault();
    }
    );
    $('#mainImage').hover(function() {
	clearInterval(timer);
    }, function() {
	timer = setInterval(autoSwitch, confDetailSwitch);
    });

    function autoSwitch() {
	var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
	if (nextThumb.length == 0) {
	    nextThumb = $('.thumb:first');
	}
	switchImage(nextThumb);
    }

    function switchImage(thumb) {

	$('.thumb').removeClass('active');
	var bigUrl = thumb.attr('href');
	thumb.addClass('active');
	$('#mainImage img').attr('src', bigUrl);
    }
}

function utils() {


    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function(e) {
	var radio = $(this).find(':radio');
	radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function(e) {

	window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function(e) {

	e.preventDefault();
	window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function(event) {

	var full_url = this.href;
	var parts = full_url.split("#");
	if (parts.length > 1) {

	    scrollTo(full_url);
	    event.preventDefault();
	}
    });
    function scrollTo(full_url) {
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#" + trgt).offset();
	var target_top = target_offset.top - 100;
	if (target_top < 0) {
	    target_top = 0;
	}

	$('html, body').animate({
	    scrollTop: target_top
	}, 1000);
    }
}


/* animations */

function animations() {
    delayTime = 0;
    $('[data-animate]').css({opacity: '0'});
    $('[data-animate]').waypoint(function(direction) {
	delayTime += 150;
	$(this).delay(delayTime).queue(function(next) {
	    $(this).toggleClass('animated');
	    $(this).toggleClass($(this).data('animate'));
	    delayTime = 0;
	    next();
	    //$(this).removeClass('animated');
	    //$(this).toggleClass($(this).data('animate'));
	});
    },
	    {
		offset: '90%',
		triggerOnce: true
	    });

    $('[data-animate-hover]').hover(function() {
	$(this).css({opacity: 1});
	$(this).addClass('animated');
	$(this).removeClass($(this).data('animate'));
	$(this).addClass($(this).data('animate-hover'));
    }, function() {
	$(this).removeClass('animated');
	$(this).removeClass($(this).data('animate-hover'));
    });

}

$.fn.alignElementsSameHeight = function() {
    $('.same-height-row').each(function() {

	var maxHeight = 0;

	var children = $(this).find('.same-height');

	children.height('auto');

	if ($(document).width() > 768) {
	    children.each(function() {
		if ($(this).innerHeight() > maxHeight) {
		    maxHeight = $(this).innerHeight();
		}
	    });

	    children.innerHeight(maxHeight);
	}

	maxHeight = 0;
	children = $(this).find('.same-height-always');

	children.height('auto');

	children.each(function() {
	    if ($(this).innerHeight() > maxHeight) {
		maxHeight = $(this).innerHeight();
	    }
	});

	children.innerHeight(maxHeight);

    });



}
var fixed_menu = true;
window.jQuery = window.$ = jQuery;
var height_content = jQuery(window).height() - 200

/*-----------------------------------------------------------------------------------*/
/*	PRELOADER
/*-----------------------------------------------------------------------------------*/
/*jQuery(window).load(function () {
	//Preloader
	setTimeout("jQuery('#preloader').animate({'opacity' : '0'},300,function(){jQuery('#preloader').hide()})",7000);
	setTimeout("jQuery('.preloader_hide, .selector_open').animate({'opacity' : '1'},500)",7000);
	setTimeout("jQuery('footer').animate({'opacity' : '1'},500)",2000);

});*/

/* 
 _____   _           _         _                        _                  
|_   _| | |         | |       | |                      | |                 
  | |   | |__   __ _| |_ ___  | |_ ___  _ __ ___   __ _| |_ ___   ___  ___ 
  | |   | '_ \ / _` | __/ _ \ | __/ _ \| '_ ` _ \ / _` | __/ _ \ / _ \/ __|
 _| |_  | | | | (_| | ||  __/ | || (_) | | | | | | (_| | || (_) |  __/\__ \
 \___/  |_| |_|\__,_|\__\___|  \__\___/|_| |_| |_|\__,_|\__\___/ \___||___/

Oh nice, welcome to the js file of dreams.
Enjoy responsibly!
@ihatetomatoes

*/

$(document).ready(function() {
	
	setTimeout(function(){
		$('body').addClass('loaded');
	}, 3000);

	var window_heigh = jQuery(window).height() - 150;

	$(document).scroll(function() {
	  	var y = $(this).scrollTop();
  		if (y > window_heigh) {
    		$('.ac-container').fadeIn();
    	}else {
    		$('.ac-container').fadeOut();
  		}
	});
	
    $('.count__number').each(function () {
        
        var data = $(this).prop('Counter',0).animate({
            Counter: $(this).text()
            
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

	setTimeout(function(){
		$('.manic-image-container img').css('opacity','1')
	}, 3000);

	//MobileMenu
	if ($(window).width() < 768){
		jQuery('.menu_block .container').prepend('<a href="javascript:void(0)" class="menu_toggler"><span class="fa fa-align-justify"></span></a>');
		jQuery('header .navmenu').hide();
		jQuery('.menu_toggler, .navmenu ul li a').click(function(){
			jQuery('header .navmenu').slideToggle(300);
		});
	}
		
	// if single_page
	if (jQuery("#page").hasClass("single_page")) {			
	}
	else {
		$(window).scroll(function(event) {
			calculateScroll();
		});
		$('.navmenu ul li a, .mobile_menu ul li a, .btn_down').click(function() {  
			$('html, body').animate({scrollTop: $(this.hash).offset().top - 80}, 1000);
			return false;
		});
	};

	// Accordion For Mobile Content

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        var panel = this.nextElementSibling;
	        if (panel.style.display === "block") {
	            panel.style.display = "none";
	        } else {
	            panel.style.display = "block";
	        }
	    }
	}
	
})

/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
function calculateScroll() {
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu').find('.scroll_btn a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scroll_btn')
			.removeClass('active')
			.eq(i).addClass('active');			
		}
	})
};

jQuery(window).resize(function(){
	homeHeight();
	
});

jQuery(document).ready(function(){
	homeHeight();
	
});

function homeHeight(){
	var wh = jQuery(window).height() - 80;
	jQuery('.top_slider, .top_slider .slides li').css('height', wh);
}

/*-----------------------------------------------------------------------------------*/
/*	IFRAME TRANSPARENT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
});


/*-----------------------------------------------------------------------------------*/
/*	BLOG MIN HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	blogHeight();
});

jQuery(window).resize(function(){
	blogHeight();
});

function blogHeight(){
	if ($(window).width() > 991){
		var wh = jQuery(window).height() - 80;
		jQuery('#blog').css('min-height', wh);
	}
	
}


/*-----------------------------------------------------------------------------------*/
/*	FOOTER HEIGHT
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	contactHeight();
});

jQuery(window).resize(function(){
	contactHeight();
});

function contactHeight(){
	if ($(window).width() > 991){
		var wh = jQuery('footer').height() + 70;
		jQuery('#contacts').css('min-height', wh);
	}
	

}


/*-----------------------------------------------------------------------------------*/
/*	FOOTER MAP
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery('.map_show').click(function(){
		jQuery('#map').addClass('showed');
	});
	
	jQuery('.map_hide').click(function(){
		jQuery('#map').removeClass('showed');
	});
});


jQuery(document).ready(function($){
    var tabs = $('.cd-tabs');
    
    tabs.each(function(){
        var tab = $(this),
            tabItems = tab.find('ul.cd-tabs-navigation'),
            tabContentWrapper = tab.children('ul.cd-tabs-content'),
            tabNavigation = tab.find('nav');

        tabItems.on('click', 'a', function(event){
            event.preventDefault();
            var selectedItem = $(this);
            if( !selectedItem.hasClass('selected') ) {
                var selectedTab = selectedItem.data('content'),
                    selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
                    slectedContentHeight = selectedContent.innerHeight();
                
                tabItems.find('a.selected').removeClass('selected');
                selectedItem.addClass('selected');
                selectedContent.addClass('selected').siblings('li').removeClass('selected');
                //animate tabContentWrapper height when content changes 
                tabContentWrapper.animate({
                    'height': slectedContentHeight
                }, 200);
            }
        });

        //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
        checkScrolling(tabNavigation);
        tabNavigation.on('scroll', function(){ 
            checkScrolling($(this));
        });
    });
    
    $(window).on('resize', function(){
        tabs.each(function(){
            var tab = $(this);
            checkScrolling(tab.find('nav'));
            tab.find('.cd-tabs-content').css('height', 'auto');
        });
    });

    function checkScrolling(tabs){
        var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
            tabsViewport = parseInt(tabs.width());
        if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
            tabs.parent('.cd-tabs').addClass('is-ended');
        } else {
            tabs.parent('.cd-tabs').removeClass('is-ended');
        }
    }
});


/*-----------------------------------------------------------------------------------*/
/*	GREEN PAGES SORTIR JS
/*-----------------------------------------------------------------------------------*/

$(document).ready(function() {

	$(function () {

		var data_target = $('.filter').find('data-filter').val()
		console.log(data_target)
		var filterList = {
		
			init: function () {
			
				// MixItUp plugin
				// http://mixitup.io
				$('#green__pages__list').mixItUp({
					selectors: {
		  			  	target: '.green__pages',
		  			  	filter: '.filter',
		  		  	},
		  		  	load: {
		    		  	filter: this.data_target // show app tab on first load
		    		}     
				});								
			
			}

		};
		
		// Run the show!
		filterList.init();
		
	});
});
(function($) {
    $.fn.menumaker = function(options) {  

      var cssmenu = $(this), settings = $.extend({
        format: "dropdown",
        sticky: false
      }, options);

      return this.each(function() {
        $(this).find(".button").on('click', function(){
          $(this).toggleClass('menu-opened');
          var mainmenu = $(this).next('ul');
          if (mainmenu.hasClass('open')) { 
            mainmenu.slideToggle().removeClass('open');
          } 
          else {
            mainmenu.slideToggle().addClass('open');
            if (settings.format === "dropdown") {
              mainmenu.find('ul').show();
            }
          }
        });

        cssmenu.find('li ul').parent().addClass('has-sub');
        multiTg = function() {
        cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');

        cssmenu.find('.submenu-button').on('click', function() {
          $(this).toggleClass('submenu-opened');
          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').slideToggle();
          }
          else {
            $(this).siblings('ul').addClass('open').slideToggle();
          }
        });

      };

      if (settings.format === 'multitoggle') multiTg();
      else cssmenu.addClass('dropdown');

      if (settings.sticky === true) cssmenu.css('position', 'fixed');
        resizeFix = function() {
        var mediasize = 1080;
        if ($( window ).width() > mediasize) {
          cssmenu.find('ul').show();
        }
        if ($(window).width() <= mediasize) {
          cssmenu.find('ul').hide().addClass('open');
        }
      };

      resizeFix();
      return $(window).on('resize', resizeFix);

    });
  };
})(jQuery);

(function($){
    $(document).ready(function(){
        $("#cssmenu").menumaker({
            format: "multitoggle"
        });
    });
})(jQuery);
