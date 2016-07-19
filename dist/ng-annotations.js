/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "64f80efe4dbd3ee57b8a"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var STRUCT_KEYS = exports.STRUCT_KEYS = {
		private: '$private',
		transform: '$transform',
		inject: '$inject',
		name: '$name',
		type: '$type',
		component: '$component',
		autodeclare: 'autodeclare'
	};
	
	var NG_ELEMENTS = exports.NG_ELEMENTS = {
		config: 'config',
		run: 'run',
		value: 'value',
		constant: 'constant',
		animation: 'animation',
		controller: 'controller',
		directive: 'directive',
		factory: 'factory',
		provider: 'provider',
		service: 'service',
		filter: 'filter'
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.defineStructure = defineStructure;
	exports.defineAutodeclareMethod = defineAutodeclareMethod;
	exports.applyTransformations = applyTransformations;
	exports.getNgStructure = getNgStructure;
	
	var _angularElements = __webpack_require__(8);
	
	var _identifier = __webpack_require__(5);
	
	var _util = __webpack_require__(3);
	
	var _enums = __webpack_require__(1);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function defineStructure(target, name, type, coreFn) {
		var _Object$definePropert;
	
		if (!~_angularElements.ANGULAR_ELEMENTS.indexOf(type)) throw Error('The given type must be a valid angular component');
	
		Object.defineProperties(target, (_Object$definePropert = {}, _defineProperty(_Object$definePropert, _enums.STRUCT_KEYS.name, {
			value: name !== undefined ? name : target.name,
			enumerable: true,
			configurable: true
		}), _defineProperty(_Object$definePropert, _enums.STRUCT_KEYS.type, {
			value: type,
			enumerable: true,
			writable: false
		}), _defineProperty(_Object$definePropert, _enums.STRUCT_KEYS.component, {
			value: coreFn,
			enumerable: true,
			configurable: true
		}), _Object$definePropert));
	
		if (target[_enums.STRUCT_KEYS.component] instanceof Object) Object.defineProperty(target[_enums.STRUCT_KEYS.component], _enums.STRUCT_KEYS.inject, {
			get: function get() {
				return target[_enums.STRUCT_KEYS.inject] || [];
			},
			set: function set(val) {
				return target[_enums.STRUCT_KEYS.inject] = val;
			}
		});
	}
	
	function defineAutodeclareMethod(target) {
	
		Object.defineProperty(target, _enums.STRUCT_KEYS.autodeclare, {
			configurable: true,
			enumerable: false,
			value: function value(ngModule) {
				var _ngModule;
	
				var component = this[_enums.STRUCT_KEYS.component],
				    injectKey = (0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.inject),
				    type = this[_enums.STRUCT_KEYS.type];
	
				if (this[_enums.STRUCT_KEYS.component] instanceof Object && injectKey in this[_enums.STRUCT_KEYS.component]) component = [].concat(_toConsumableArray(this[_enums.STRUCT_KEYS.component][injectKey]), [this[_enums.STRUCT_KEYS.component]]);
	
				var params = !!this.$name ? [this.$name, component] : [component];
	
				if (typeof ngModule === 'string') ngModule = angular.module(ngModule);
	
				return (_ngModule = ngModule)[type].apply(_ngModule, params);
			}
		});
	}
	
	function applyTransformations(target) {
		var instance = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
		var injections = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
		var $transformKey = (0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.transform),
		    transformations = target.prototype[$transformKey] || [];
		transformations.forEach(function (transformation) {
			return transformation(instance, target, injections);
		});
	}
	
	function getNgStructure(target, instance) {
	
		var $privateKey = (0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.private),
		    privateProperties = target.prototype[$privateKey] || [];
	
		if (privateProperties.length === 0) return instance;
	
		privateProperties.push('constructor');
		var prototypeProperties = Object.getOwnPropertyNames(target.prototype),
		    instanceProperties = Object.getOwnPropertyNames(instance);
	
		var properties = (0, _util.arrayUnique)(prototypeProperties.concat(instanceProperties)),
		    publicProperties = properties.filter(function (property) {
			return !~privateProperties.indexOf(property);
		}),
		    exposed = {};
	
		publicProperties.forEach(function (property) {
			if (instance[property] instanceof Function) {
				exposed[property] = function () {
					return instance[property].apply(instance, arguments);
				};
				Object.defineProperties(exposed[property], {
					call: {
						value: function value() {
							for (var _len = arguments.length, parameters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
								parameters[_key - 1] = arguments[_key];
							}
	
							var scope = arguments.length <= 0 || arguments[0] === undefined ? instance : arguments[0];
							return instance[property].apply(scope, parameters);
						},
						writable: false,
						enumerable: false
					},
					apply: {
						value: function value() {
							var scope = arguments.length <= 0 || arguments[0] === undefined ? instance : arguments[0];
							var parameters = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
							return instance[property].apply(scope, parameters);
						},
						writable: false,
						enumerable: false
					}
				});
			} else Object.defineProperty(exposed, property, {
				get: function get() {
					return instance[property];
				},
				set: function set(val) {
					return instance[property] = val;
				},
				enumerable: false
			});
		});
	
		return exposed;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.uuid = uuid;
	exports.arrayUnique = arrayUnique;
	exports.extractParamsFromFunction = extractParamsFromFunction;
	
	var _regex = __webpack_require__(9);
	
	function uuid() {
		var pattern = arguments.length <= 0 || arguments[0] === undefined ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : arguments[0];
	
		return pattern.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
			    v = c == 'x' ? r : r & 0x3 | 0x8;
			return v.toString(16);
		});
	}
	
	function arrayUnique() {
		var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
		var noDuplicateArray = [];
	
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var element = _step.value;
	
				if (!~noDuplicateArray.indexOf(element)) noDuplicateArray.push(element);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	
		return noDuplicateArray;
	}
	
	function extractParamsFromFunction(fn) {
		var fnText = fn.toString().replace(_regex.REGEX_STRIP_COMMENT, ''),
		    args = fnText.match(_regex.REGEX_NG_ARGS);
		return args && args[1].length > 0 ? args[1].split(',') : [];
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.inject = inject;
	
	var _injection = __webpack_require__(6);
	
	var _enums = __webpack_require__(1);
	
	/**
	 * @decorator: @inject
	 * @type: function
	 *
	 * replaces the angular dependency injection system
	 *
	 * @param toInject  string|Array
	 * @param more (optional)  string[]
	 */
	function inject(toInject) {
		if (!(toInject instanceof Array)) {
			toInject = [toInject];
	
			for (var _len = arguments.length, more = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				more[_key - 1] = arguments[_key];
			}
	
			if (more.length > 0) toInject = toInject.concat(more);
		}
	
		toInject.forEach(function (component, index) {
			if (component instanceof Object && '$name' in component) toInject[index] = component.$name;
		});
	
		return (0, _injection.injectTo)(_enums.STRUCT_KEYS.inject, toInject);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getIdentifier = getIdentifier;
	
	var _util = __webpack_require__(3);
	
	var ID_BANK = {};
	
	function getIdentifier(key) {
		if (ID_BANK[key] === undefined) ID_BANK[key] = global.Symbol ? Symbol(key) : (0, _util.uuid)();
		return ID_BANK[key];
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.injectTo = injectTo;
	function injectTo(targetField, toInject) {
		return function (target) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}
	
			if (args.length > 0) {
				var name = args[0];
				var definition = args[1];
	
	
				if (!definition) {
					definition = { enumerable: true, configurable: true, value: target.prototype[name] };
					Object.defineProperty(target.prototype, name, definition);
				}
	
				target = definition.value;
			}
	
			Object.defineProperty(target, targetField, {
				value: toInject,
				enumerable: true,
				configurable: true
			});
		};
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.autobind = exports.Autobind = exports.conceal = exports.Conceal = exports.Attach = exports.attach = exports.Inject = exports.inject = exports.Value = exports.value = exports.Constant = exports.constant = exports.Service = exports.service = exports.Run = exports.run = exports.Provider = exports.provider = exports.Filter = exports.filter = exports.Factory = exports.factory = exports.Directive = exports.directive = exports.Decorator = exports.decorator = exports.Controller = exports.controller = exports.Config = exports.config = exports.Animation = exports.animation = undefined;
	
	var _animation = __webpack_require__(13);
	
	var _config = __webpack_require__(14);
	
	var _controller = __webpack_require__(15);
	
	var _decorator = __webpack_require__(16);
	
	var _directive = __webpack_require__(17);
	
	var _factory = __webpack_require__(18);
	
	var _filter = __webpack_require__(19);
	
	var _provider = __webpack_require__(20);
	
	var _run = __webpack_require__(21);
	
	var _service = __webpack_require__(22);
	
	var _constant = __webpack_require__(23);
	
	var _value = __webpack_require__(24);
	
	var _inject = __webpack_require__(4);
	
	var _conceal = __webpack_require__(12);
	
	var _attach = __webpack_require__(10);
	
	var _autobind = __webpack_require__(11);
	
	var NG_ANNOTATIONS = {};
	
	var animation = exports.animation = NG_ANNOTATIONS.animation = _animation.NgAnimation;
	var Animation = exports.Animation = NG_ANNOTATIONS.Animation = _animation.NgAnimation;
	
	var config = exports.config = NG_ANNOTATIONS.config = _config.NgConfig;
	var Config = exports.Config = NG_ANNOTATIONS.Config = _config.NgConfig;
	
	var controller = exports.controller = NG_ANNOTATIONS.controller = _controller.NgController;
	var Controller = exports.Controller = NG_ANNOTATIONS.Controller = _controller.NgController;
	
	var decorator = exports.decorator = NG_ANNOTATIONS.decorator = _decorator.NgDecorator;
	var Decorator = exports.Decorator = NG_ANNOTATIONS.Decorator = _decorator.NgDecorator;
	
	var directive = exports.directive = NG_ANNOTATIONS.directive = _directive.NgDirective;
	var Directive = exports.Directive = NG_ANNOTATIONS.Directive = _directive.NgDirective;
	
	var factory = exports.factory = NG_ANNOTATIONS.factory = _factory.NgFactory;
	var Factory = exports.Factory = NG_ANNOTATIONS.Factory = _factory.NgFactory;
	
	var filter = exports.filter = NG_ANNOTATIONS.filter = _filter.NgFilter;
	var Filter = exports.Filter = NG_ANNOTATIONS.Filter = _filter.NgFilter;
	
	var provider = exports.provider = NG_ANNOTATIONS.provider = _provider.NgProvider;
	var Provider = exports.Provider = NG_ANNOTATIONS.Provider = _provider.NgProvider;
	
	var run = exports.run = NG_ANNOTATIONS.run = _run.NgRun;
	var Run = exports.Run = NG_ANNOTATIONS.Run = _run.NgRun;
	
	var service = exports.service = NG_ANNOTATIONS.service = _service.NgService;
	var Service = exports.Service = NG_ANNOTATIONS.Service = _service.NgService;
	
	var constant = exports.constant = NG_ANNOTATIONS.constant = _constant.NgConstant;
	var Constant = exports.Constant = NG_ANNOTATIONS.Constant = _constant.NgConstant;
	
	var value = exports.value = NG_ANNOTATIONS.value = _value.NgValue;
	var Value = exports.Value = NG_ANNOTATIONS.Value = _value.NgValue;
	
	var inject = exports.inject = NG_ANNOTATIONS.inject = _inject.inject;
	var Inject = exports.Inject = NG_ANNOTATIONS.Inject = _inject.inject;
	
	var attach = exports.attach = NG_ANNOTATIONS.attach = _attach.attach;
	var Attach = exports.Attach = NG_ANNOTATIONS.Attach = _attach.attach;
	
	var Conceal = exports.Conceal = NG_ANNOTATIONS.Conceal = _conceal.conceal;
	var conceal = exports.conceal = NG_ANNOTATIONS.conceal = _conceal.conceal;
	
	var Autobind = exports.Autobind = NG_ANNOTATIONS.Autobind = _autobind.autobind;
	var autobind = exports.autobind = NG_ANNOTATIONS.autobind = _autobind.autobind;
	
	global.ngAnnotations = NG_ANNOTATIONS;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ANGULAR_ELEMENTS = undefined;
	
	var _enums = __webpack_require__(1);
	
	var ANGULAR_ELEMENTS = exports.ANGULAR_ELEMENTS = [_enums.NG_ELEMENTS.config, _enums.NG_ELEMENTS.run, _enums.NG_ELEMENTS.value, _enums.NG_ELEMENTS.constant, _enums.NG_ELEMENTS.animation, _enums.NG_ELEMENTS.controller, _enums.NG_ELEMENTS.directive, _enums.NG_ELEMENTS.factory, _enums.NG_ELEMENTS.provider, _enums.NG_ELEMENTS.service, _enums.NG_ELEMENTS.filter];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var REGEX_NG_ARGS = exports.REGEX_NG_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
	var REGEX_STRIP_COMMENT = exports.REGEX_STRIP_COMMENT = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.attach = attach;
	exports.createAttachTransformation = createAttachTransformation;
	exports.setAccessors = setAccessors;
	exports.getSrc = getSrc;
	
	var _enums = __webpack_require__(1);
	
	var _identifier = __webpack_require__(5);
	
	function attach() {
		var source = arguments.length <= 0 || arguments[0] === undefined ? 'this' : arguments[0];
		var path = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	
	
		if (typeof source !== 'string' && !(source instanceof Object && '$name' in source)) throw Error('the source param of @attach must be a string or an annotated component, ' + (typeof source === 'undefined' ? 'undefined' : _typeof(source)) + ' given');
	
		if (typeof path !== 'string') throw Error('the path param of @attach must be a string, ' + (typeof path === 'undefined' ? 'undefined' : _typeof(path)) + ' given');
	
		return function (prototype, name, descriptor) {
	
			var descriptorDefined = true;
			if (name && !descriptor) {
				descriptorDefined = false;
				descriptor = {};
			}
	
			if (descriptor instanceof Object && (descriptor.set !== undefined || descriptor.get !== undefined)) throw Error('@attach decorator cannot be applied to an accessor');
	
			if (name === undefined) throw Error('@attach decorator can only be applied to methods or attributes');
	
			descriptor.configurable = true;
	
			if (source instanceof Object) source = source.$name;
	
			var $transformKey = (0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.transform);
	
			if (prototype[$transformKey] === undefined || !(prototype[$transformKey] instanceof Array)) prototype[$transformKey] = [];
	
			var steps = path.split('.'),
			    propertyName = steps.pop();
	
			if (source === 'this') {
				delete descriptor.initializer;
				delete descriptor.value;
				setAccessors(steps, propertyName, descriptor);
			} else prototype[$transformKey].push(createAttachTransformation(source, steps, propertyName, name));
	
			if (!descriptorDefined) Object.defineProperty(prototype, name, descriptor);
		};
	}
	
	function createAttachTransformation(sourceName, steps, propertyName, targetName) {
		return function attachTransformation(context, component, injections) {
	
			var $inject = component[_enums.STRUCT_KEYS.inject] || [],
			    index = $inject.indexOf(sourceName);
			if (!~index) throw Error('unable to attach the property ' + propertyName + ', the component ' + sourceName + ' isn\'t loaded');
	
			var _Object$getOwnPropert = Object.getOwnPropertyDescriptor(context, targetName);
	
			var configurable = _Object$getOwnPropert.configurable;
			var enumerable = _Object$getOwnPropert.enumerable;
	
			var descriptor = { configurable: configurable, enumerable: enumerable };
			setAccessors(steps, propertyName, descriptor, injections[index]);
			delete context[targetName];
			Object.defineProperty(context, targetName, descriptor);
		};
	}
	
	function setAccessors(steps, property, descriptor) {
		var context = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];
	
		descriptor.get = function () {
			if (context === undefined) context = this;
			if (!property) return context;
			var src = getSrc(context, steps);
			return src[property] instanceof Function ? src[property].bind(src) : src[property];
		};
		descriptor.set = function (val) {
			if (context === undefined) context = this;
			if (!property) return context;
			var src = getSrc(context, steps);
			src[property] = val;
		};
	}
	
	function getSrc(source) {
		var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
		if (path.length > 0) for (var i = 0; i < path.length; i++) {
			if (!(source instanceof Object)) throw Error('unable to acces to the given property, invalid path');
			source = source[path[i]];
			if (!source) throw Error('unable to acces to the given property');
		}
		return source;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.autobind = autobind;
	function autobind(prototype, name, descriptor) {
	
		var fn = descriptor.value;
	
		if (typeof fn !== 'function') throw Error('@autobind decorator can only be applied to methods not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	
		return {
			configurable: true,
			get: function get() {
				var boundFn = fn.bind(this);
				Object.defineProperty(this, name, {
					value: boundFn,
					configurable: true,
					writable: true
				});
				return boundFn;
			}
		};
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.conceal = conceal;
	
	var _identifier = __webpack_require__(5);
	
	var _enums = __webpack_require__(1);
	
	function conceal(prototype, name, descriptor) {
		if (name === undefined) throw Error('@conceal decorator can only be applied to methods or attributes');
	
		var descriptorDefined = true;
		if (name && !descriptor) {
			descriptorDefined = false;
			descriptor = {};
		}
	
		if (descriptor !== undefined) descriptor.writable = true;
	
		var $private = (0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.private);
	
		if (prototype[$private] === undefined || !(prototype[$private] instanceof Array)) prototype[$private] = [];
	
		prototype[$private].push(name);
	
		if (!descriptorDefined) Object.defineProperty(prototype, name, { value: prototype[name] });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgAnimation = NgAnimation;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgAnimation() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return (0, _structure.getNgStructure)(target, instance);
			}
	
			if (!(target[_enums.STRUCT_KEYS] instanceof Array) || target[_enums.STRUCT_KEYS].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.animation, core);
		};
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgConfig = NgConfig;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgConfig() {
		return function (target) {
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return instance;
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, null, _enums.NG_ELEMENTS.config, core);
		};
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgController = NgController;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgController() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
	
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return (0, _structure.getNgStructure)(target, instance);
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.controller, core);
		};
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgDecorator = NgDecorator;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _injection = __webpack_require__(6);
	
	var _identifier = __webpack_require__(5);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function NgDecorator() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			var $delegatefn = function $delegatefn() {
				var $inject = target[_enums.STRUCT_KEYS.inject] || ['$delegate'];
				var delegateIndex = $inject.indexOf('$delegate');
	
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
	
				var exposed = (0, _structure.getNgStructure)(target, instance);
				return exposed.$decorate instanceof Function ? exposed.$decorate() : injections[delegateIndex];
			};
	
			function core($provide) {
				var injections = target[_enums.STRUCT_KEYS.inject] || [];
				if (!~injections.indexOf('$delegate')) injections.push('$delegate');
				$provide.decorator(name, [].concat(_toConsumableArray(injections), [$delegatefn]));
			}
	
			(0, _injection.injectTo)((0, _identifier.getIdentifier)(_enums.STRUCT_KEYS.inject), ['$provide'])(core);
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(target);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, null, _enums.NG_ELEMENTS.config, core);
		};
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgDirective = NgDirective;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgDirective() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return instance;
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.directive, core);
		};
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgFactory = NgFactory;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgFactory() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
	
				var exposed = (0, _structure.getNgStructure)(target, instance);
				return exposed.$expose instanceof Function ? exposed.$expose() : exposed;
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.factory, core);
		};
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgFilter = NgFilter;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgFilter() {
		var filterProps = arguments.length <= 0 || arguments[0] === undefined ? { name: '', stateful: false } : arguments[0];
	
	
		return function (target) {
	
			var name = '',
			    stateful = false;
			if (filterProps instanceof Object) {
				name = filterProps.name || target.name;
				stateful = !!filterProps.stateful;
			} else name = filterProps || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
	
				if (!(instance.$filter instanceof Function)) throw Error('an annotated "filter" must implement the "$filter" method');
				(0, _structure.applyTransformations)(target, instance, injections);
	
				if (stateful) filter.$stateful = stateful;
	
				return filter;
	
				function filter() {
					return instance.$filter.apply(instance, arguments);
				}
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.filter, core);
		};
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgProvider = NgProvider;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgProvider() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return (0, _structure.getNgStructure)(target, instance);
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.provider, core);
		};
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgRun = NgRun;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgRun() {
		return function (target) {
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return instance;
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(core);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, null, _enums.NG_ELEMENTS.run, core);
		};
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgService = NgService;
	
	var _inject = __webpack_require__(4);
	
	var _enums = __webpack_require__(1);
	
	var _util = __webpack_require__(3);
	
	var _structure = __webpack_require__(2);
	
	function NgService() {
		var name = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
		return function (target) {
			name = name || target.name;
	
			function core() {
				for (var _len = arguments.length, injections = Array(_len), _key = 0; _key < _len; _key++) {
					injections[_key] = arguments[_key];
				}
	
				var instance = new (Function.prototype.bind.apply(target, [null].concat(injections)))();
				(0, _structure.applyTransformations)(target, instance, injections);
				return (0, _structure.getNgStructure)(target, instance);
			}
	
			if (!(target[_enums.STRUCT_KEYS.inject] instanceof Array) || target[_enums.STRUCT_KEYS.inject].length === 0) {
				var parameters = (0, _util.extractParamsFromFunction)(target);
				if (parameters.length > 0) (0, _inject.inject)(parameters)(target);
			}
	
			(0, _structure.defineAutodeclareMethod)(target);
			(0, _structure.defineStructure)(target, name, _enums.NG_ELEMENTS.service, core);
		};
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgConstant = NgConstant;
	
	var _structure = __webpack_require__(2);
	
	var _enums = __webpack_require__(1);
	
	function NgConstant(name, value) {
		var core = {};
		(0, _structure.defineAutodeclareMethod)(core);
		(0, _structure.defineStructure)(core, name, _enums.NG_ELEMENTS.constant, value);
		return core;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.NgValue = NgValue;
	
	var _structure = __webpack_require__(2);
	
	var _enums = __webpack_require__(1);
	
	function NgValue(name, value) {
		var core = {};
		(0, _structure.defineAutodeclareMethod)(core);
		(0, _structure.defineStructure)(core, name, _enums.NG_ELEMENTS.value, value);
		return core;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=ng-annotations.js.map