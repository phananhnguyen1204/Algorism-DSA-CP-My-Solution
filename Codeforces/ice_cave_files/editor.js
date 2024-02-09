function createNewEvent(e){var n=null;return"function"==typeof Event?n=new Event(e):(n=document.createEvent("Event")).initEvent(e,!0,!0),n}function getModeForFileName(e,n){var t=null;switch(e.substr(e.lastIndexOf(".")+1).toLowerCase()){case"c":case"cc":case"h":case"hpp":case"cpp":t="ace/mode/c_cpp";break;case"py":t="ace/mode/python";break;case"java":t="ace/mode/java";break;case"go":t="ace/mode/golang";break;case"rs":t="ace/mode/rust";break;case"cs":t="ace/mode/csharp";break;case"ml":t="ace/mode/ocaml";break;case"vb":t="ace/mode/vbscript";break;case"php":t="ace/mode/php";break;case"rb":t="ace/mode/ruby";break;case"swift":t="ace/mode/swift";break;case"bash":t="ace/mode/sh";break;case"r":t="ace/mode/r";break;case"pl":t="ace/mode/perl",n.indexOf("prolog")>-1&&(t="ace/mode/prolog");break;case"js":t="ace/mode/javascript";break;case"sql":t="ace/mode/sql";break;case"pas":t="ace/mode/pascal";break;case"kt":t="ace/mode/kotlin";break;case"cob":t="ace/mode/cobol";break;case"f95":t="ace/mode/fortran";break;case"hs":t="ace/mode/haskell";break;case"m":t="ace/mode/objectivec";break;case"S":t="ace/mode/assembly_x86";break;case"html":t="ace/mode/html";break;case"js":t="ace/mode/javascript";break;case"css":t="ace/mode/css";break;case"xml":t="ace/mode/xml"}return null==t&&(t=n),t}function get_os(){var e="Unknown OS";return-1!=navigator.appVersion.indexOf("Win")?e="Windows":-1!=navigator.appVersion.indexOf("Mac")?e="MacOS":-1!=navigator.appVersion.indexOf("X11")?e="UNIX":-1!=navigator.appVersion.indexOf("Linux")&&(e="Linux"),e}function is_mac_os(){return"MacOS"==get_os()}function print_range(e,n){console.log(e,n.start.row,n.start.column,n.end.row,n.end.column)}function editor_freeze_selection(){console.log("editor_freeze_selection");var e=this.getSelectionRange(),n=this.getSession();if(print_range("current_range:",e),console.log("is_empty:",e.isEmpty()),!e.isEmpty()){var t=this.read_only_segments;console.log("before:read_only_segments:",t);for(var a=!1,o=0;o<t.length;o++){var i=(d=t[o]).range;console.log("segment[",o,"]",i.start.row,i.start.column,i.end.row,i.end.column);var r=i.intersects(e),s=e.intersects(i);if(console.log("int1:",r,"int2:",s),r){var c=!1;if(e.containsRange(i))console.log("delete_segment",o),c=!0;else{if(i.containsRange(e))return void console.log("nothing_to_do");i.contains(e.start.row,e.start.column)?(console.log("sel_range_start_inside_segment"),c=!0,e.setStart(i.start.row,i.start.column)):e.contains(i.start.row,i.start.column)?(console.log("sel_range_end_inside_segment"),c=!0,e.setEnd(i.end.row,i.end.column)):console.error("unknown_intersection")}c&&(d.delete_this=!0,n.removeMarker(d.markerId),d.range.start.detach(),d.range.end.detach(),a=!0)}}if(a){var l=t,d=null;for(t=[];d=l.pop();)d.delete_this||t.push(d);this.read_only_segments=t}this.add_readonly_segment(e),console.log("After:read_only_segments:",t)}}function add_readonly_segment(e){var n=this.getSession(),t=n.addMarker(e,"readonly-highlight");e.start=n.doc.createAnchor(e.start),e.end=n.doc.createAnchor(e.end),e.end.$insertRight=!0,this.read_only_segments.push({range:e,markerId:t})}function editor_unfreeze_selection(){console.log("editor_unfreeze_selection");for(var e=this.getSession(),n=null;n=this.read_only_segments.pop();)e.removeMarker(n.markerId),n.range.start.detach(),n.range.end.detach()}function getReadOnlyRanges(){var e=this.read_only_segments,n=[];for(var t in e){var a=e[t].range;n.push({start:{row:a.start.row,col:a.start.column},end:{row:a.end.row,col:a.end.column}})}return n}function init_read_only_segment(e){var n=e.container.id,t=$("#"+n).attr("data-readonly-ranges");try{t=JSON.parse(t)}catch(e){t=[]}console.log("readonly_ranges:",t),e.keyBinding.addKeyboardHandler({handleKeyboard:function(e,n,t,a,o){return!(-1===n||a<=40&&a>=37)&&(c()?{command:"null",passEvent:!1}:void 0)}}),e.read_only_segments=[],e.freeze_selection=editor_freeze_selection.bind(e),e.unfreeze_selection=editor_unfreeze_selection.bind(e),e.getReadOnlyRanges=getReadOnlyRanges.bind(e),e.add_readonly_segment=add_readonly_segment.bind(e);var a=ace.require("ace/range").Range;for(var o in t){var i=t[o];e.add_readonly_segment(new a(i.start.row,i.start.col,i.end.row,i.end.col))}function r(e,n,t){var a=e[n];return e[n]=function(){var n=Array.prototype.slice.call(arguments);return t.call(this,function(){return a.apply(e,n)},n)},e[n]}function s(n){for(var t in print_range("current_sel_range:",n),e.read_only_segments){var a=e.read_only_segments[t];if(n.intersects(a.range))return!0}return!1}function c(){return s(e.getSelectionRange())}function l(e,n){c()||e()}r(e,"onPaste",l),r(e,"onCut",l);var d=e.getSession(),f=d.remove;d.remove=function(e){return!s(e)&&f.apply(this,arguments)}}function get_ace_mode_for_lang(e){var n="ace/mode/c_cpp";switch(e||(e=""),e.toLowerCase()){case"python":n="ace/mode/python";break;case"java":n="ace/mode/java";break;case"c#":n="ace/mode/csharp";break;case"ocaml":n="ace/mode/ocaml";break;case"vb":n="ace/mode/vbscript";break;case"php":n="ace/mode/php";break;case"ruby":n="ace/mode/ruby";break;case"perl":n="ace/mode/perl";break;case"r":n="ace/mode/r";break;case"bash":n="ace/mode/sh";break;case"swift":n="ace/mode/swift";break;case"prolog":n="ace/mode/prolog";break;case"js_rhino":n="ace/mode/javascript";break;case"sqlite3":n="ace/mode/sql";break;case"pascal":n="ace/mode/pascal";break;case"kotlin":n="ace/mode/kotlin";break;case"cobol":n="ace/mode/cobol";break;case"fortran":n="ace/mode/fotran";break;case"haskell":n="ace/mode/haskell";break;case"objc":n="ace/mode/objectivec";break;case"asm_gcc":n="ace/mode/assembly_x86";break;case"html":n="ace/mode/html";break;case"rust":n="ace/mode/rust";break;case"go":n="ace/mode/golang"}return n}function FileLine(){this.filename="",this.line=-1}function FileLine(e,n){return this.filename=e,this.line=n,this}function Breakpoint(){return FileLine.call(this),this}function Breakpoint(e,n){return FileLine.call(this,e,n),this}!function(e){"use strict";var n=ace.require("ace/range").Range;function t(t){var a=t.target,o=[],i=[],r=null,s=t.theme?t.theme:"ace/theme/idle_fingers",c=t.fontsize?t.fontsize:"medium",l=t.langmode?t.langmode:"ace/mode/c_cpp",d=t.tabsize?t.tabsize:4,f=void 0===t.autocomplete||t.autocomplete,u=void 0!==t.wordwrap&&t.wordwrap,m=(t.socket&&t.socket,function(n){var t=e(n.target).attr("href");console.log(t),t.indexOf("editor")>-1&&(console.log("editor focused:",t),ide.editor.resizeAndFocus(t.split("#")[1],1))});function h(n){var t=ace.edit(n);t.getSession().setTabSize(d),t.setFontSize(c),t.setTheme(s),t.getSession().setMode(getModeForFileName(E(n),l)),is_mac_os()&&t.commands.bindKey("Ctrl-P","golineup"),t.setOptions({useWrapMode:u,wrap:u,enableBasicAutocompletion:f,enableSnippets:!0,enableLiveAutocompletion:f}),_(n),t.on("guttermousedown",function(n){!function(n){var t=n.domEvent.target;if(-1==t.className.indexOf("ace_gutter-cell"))return;if(n.clientX>25+t.getBoundingClientRect().left)return;var a=n.getDocumentPosition().row,i=t,r=null;console.log(t);for(;e(i)&&-1==e(i).attr("class").indexOf("editor");)i=e(i).parent();e(i)&&e(i).attr("class").indexOf("editor")&&(r=e(i).attr("id"));if(!r)throw"Couldn't find editor DOM through ace_gutter";if(-1==t.className.indexOf("ace_breakpoint")){o[r].getSession().setBreakpoint(a);var s=E(r),c=createNewEvent("breakpoint_set");c.breakpoint=new Breakpoint(s,a+1),dispatchEvent(c)}else{o[r].getSession().clearBreakpoint(a);var s=E(r),c=createNewEvent("breakpoint_unset");c.breakpoint=new Breakpoint(s,a+1),dispatchEvent(c)}n.stop()}(n)}),t.on("change",function(e){A(e)}),o[n]=t,r&&r(t),init_read_only_segment(t)}var g=function(){return a.find(".editor_file_tabs")},p=function(){return a.find(".editor_text_panes")},_=function(e){g().find('a[href="#'+e+'"]').parent().find(".menu_item_rename").on("click",function(){b(e)}),g().find('a[href="#'+e+'"]').parent().find(".menu_item_delete").on("click",function(){k(e)})},v=function(e,n){console.log("handle_edit_file_input:",n);var t=g_renamefilemodal_get_edit_filename(),a=L(t,n);a?g_renamefilemodal_error_message(a):(F(n,t),g_renamefilemodal_hide())},b=function(e){g_renamefilemodal_popup({default_name:E(e),title:"Rename File"},v,e)},k=function(n){e("#delete_file_name").text(E(n)),e("#deleteFileModal .modal-body .btn-ok").off("click").on("click",function(e){w(e,n)}),e("#deleteFileModal").modal("show")},w=function(n,t){y(t),e("#deleteFileModal").modal("hide")};function y(e){delete o[e];var n=null,t=g().find('a[href="#'+e+'"]').parent().prev(),a=g().find('a[href="#'+e+'"]').parent().next();n=a.length?a:t,g().find('a[href="#'+e+'"]').parent().remove(),p().find("#"+e).remove(),n&&n.find("a").tab("show"),A()}var E=function(e){return g().find('a[href="#'+e+'"] .filename').text()},F=function(e,n){g().find('a[href="#'+e+'"] .filename').text(n)},x=function(e){for(var n in o)if(E(n)==e)return o[n];return null},S=function(e){if(e instanceof FileLine)return x(e.filename);throw"Not an instance of FileLine"},M=function(e){return!(e.indexOf("/")>-1)},O=function(e){if("string"!=typeof e)throw"Invalid filename";var n,t="_editor_"+Math.ceil(999999999*Math.random())+1;return function(e,n){var t='<li><a href="#'+e+'" data-toggle="tab"><span class="filename">'+(n=(n=n||"untitled").trim())+'</a><div class="dropdown"><span class="dropbtn glyphicon glyphicon-option-vertical"></span><div class="dropdown-content" style="left:-50px;"><a href="#" class="menu_item menu_item_rename">Rename</a><a href="#" class="menu_item menu_item_delete">Delete</a></div></div></li>';g().append(t)}(t,e),n='<div class="tab-pane active editor"             style="position: absolute;   width:100%;    top: 52px;    bottom: 0px;"            id="'+t+'"></div>',p().append(n),h(t),g().find('a[href="#'+t+'"]').tab("show"),g().find('a[data-toggle="tab"]').on("shown.bs.tab",function(e){m(e)}),A({change:"new_file",editor:o[t]}),t};function L(e,n){if(""==e)return"Please enter a filename.";if(""==e.trim())return"Filename shouldn't contain only whitespace.";if(!M(e))return"'/' isn't allowed in filename.";if(I(e))return"File already exists. Please choose different name";if(n&&n==q()&&"ace/mode/java"==o[n].getSession().getMode().$id){if(/\s+/.test(e))return"Invalid filename. It shouldn't contain white space.";if(!/^.+\.java$/.test(e))return"Invalid filename. It should end with .java"}return!1}function B(n){var t=e("#new_file_name").val(),a=L(t);a?e("#newFileModal .error_message").text(a):(e("#newFileModal").modal("hide"),O(t))}var z=function(n){var t=null;return"string"==typeof n&&(t=n),t?O(t):(e("#new_file_name").off("keypress").keypress(function(e){if(13==e.which)return e.preventDefault(),B(),!1}),e("#newFileModal .modal-body .btn-ok").off("click").on("click",function(e){B()}),e("#newFileModal .error_message").text(""),e("#new_file_name").val("untitled"),e("#newFileModal").modal("show"),e("#newFileModal").off("shown.bs.modal").on("shown.bs.modal",function(){e("#new_file_name").focus(),e("#new_file_name").select()}),null)},R=function(e){var n={};return n.name=E(e),n.content=function(e){return o[e].getValue()}(e),n.readonly_ranges=function(e){return o[e].getReadOnlyRanges()}(e),n},j=function(e){var n=x(e.name);if(!n){var t=z(e.name);n=o[t]}n.setValue(e.content),n.gotoLine(1,0,!1)},N=function(e){for(var n in o)if(E(n)==e)return n},I=function(e){for(var n in o)if(E(n)==e)return!0;return!1};function A(e){dispatchEvent(new CustomEvent("change",{detail:e}))}function V(){var e=g().find("li.active a").attr("href").split("#")[1];return console.log("Active editor:",e),E(e)}function C(){var e=g().find("li.active a").attr("href").split("#")[1];return o[e]}function P(e){var n=S(e);console.log("gotoFileLine:",JSON.stringify(e)),n&&(!function(e){if(console.log("focus_file:",e),e!=V()){console.log("focus_file:prev:",V());var n=N(e);g().find('a[href="#'+n+'"]').tab("show")}}(e.filename),n.gotoLine(e.line,0,!1))}this.addEventListener=function(e,n,t){t=t||!1,addEventListener(e,n,t)},this.new_editor=function(){return z()},this.compare_file=function(e){var n=this.get_file_by_name(e.name);return!!n&&n.content==e.content},this.get_file_by_name=function(e){var n=N(e);return n?R(n):null},this.get_files=function(){var e=[];for(var n in o)e.push(R(n));return e},this.clear_all_editors=function(){g().html(""),p().html("")},this.set_files=function(e){for(var n=0;n<e.length;n++)j(e[n])},this.delete_file=function(e){var n=N(e);n&&y(n)},this.setReadOnly=function(e){for(var n in o)o[n].setReadOnly(e)},this.getBreakpoints=function(){var e=[];for(var n in o){var t={};t.eid=n,t.filename=E(n),t.breakpoints=o[n].getSession().getBreakpoints(),e[t.filename]=t}return e},this.if_file_exists=function(e){return I(e)},this.setBreakpoint=function(e){if(!(e instanceof Breakpoint))throw"Not a Breakpoint instance";x(e.filename).getSession().setBreakpoint(e.line-1)},this.clearBreakpoint=function(e){if(!(e instanceof Breakpoint))throw"Not a Breakpoint instance";x(e.filename).getSession().clearBreakpoint(e.line-1)},this.forEachBreakpoint=function(e){if(e&&"function"==typeof e){var n=this.getBreakpoints();for(var t in n){var a=n[t].breakpoints;for(var o in a){e(new Breakpoint(t,parseInt(o)+1))}}}},this.forEachEditor=function(e,n){var t=!1;if(void 0!==n&&(t=n),"function"==typeof e){for(var a in o)e(o[a],a);t&&(r=e)}},this.setModeForLang=function(e){e||(e="");var n=get_ace_mode_for_lang(e);l=n,this.forEachEditor(function(e,n){var t=E(n);e.getSession().setMode(getModeForFileName(t,l))},!1)},this.setTheme=function(e){s=e,this.forEachEditor(function(n){n.setTheme(e)},!1)},this.setKeyboardHandler=function(e){this.forEachEditor(function(n){n.setKeyboardHandler(e)},!1)},this.setFontSize=function(e){c=e,this.forEachEditor(function(n){n.setFontSize(e)},!1)},this.setTabSize=function(e){d=e,this.forEachEditor(function(n){n.getSession().setTabSize(e)},!1)},this.setAutocomplete=function(e){f=e,this.forEachEditor(function(n){n.setOptions({enableBasicAutocompletion:e,enableLiveAutocompletion:e})})},this.setWordWrap=function(e){u=e,this.forEachEditor(function(n){n.setOptions({useWrapMode:e,wrap:e})})},this.resize=function(){this.forEachEditor(function(e){e.resize()},!1)},this.getBreakpointsList=function(){var e=[],n=[];for(var t in o)n[E(t)]=o[t].getSession().getLength();return this.forEachBreakpoint(function(t){t.line<=n[t.filename]&&e.push(t)}),e},this.gotoFileLine=function(e){P(e)},this.addMarker=function(e,t,a){var o=S(e);if(console.log("Addmarker:",JSON.stringify(e),t,a),o){var r=e.line,s=t||"",c=a||"fullLine",l=function(e,n,t){return e.filename+":"+e.line+"_"+n+"_"+t}(e,s,c),d=o.session.addMarker(new n(r-1,0,r-1,1),s,c);return i[l]={eid:N(e.filename),id:d},console.log("Addmarker:",l),l}},this.removeMarkerById=function(e){if(void 0!==e&&e in i){var n=i[e].eid,t=o[n];if(t){var a=i[e].id;t.getSession().removeMarker(a)}delete i[e]}},this.focus=function(e){o[e].focus()},this.resizeAndFocus=function(e){this.resize(e),this.focus(e)},this.gotoLineInEditor=function(e,n){o[e].gotoLine(n,0,!1)},this.getValue=function(){return C().getValue()},this.setValue=function(e){C().setValue(e)},this.gotoLine=function(e){C().gotoLine(e,0,!1)},this.focus=function(){C().focus()},this.getCursorPosition=function(){return C().getCursorPosition()},this.getFile=function(){var e={};return e.filename=V(),e.content=C().getValue(),e},this.setOptions=function(e){for(var n in o)o[n].setOptions(e)},this.hideCursor=function(){for(var e in o)o[e].renderer.$cursorLayer.element.style.display="none"};var q=function(){return"editor_1"};this.setFileName=function(e,n){n=n.trim(),g().find('a[href="#'+e+'"] .filename').text(n)},this.set_default_editor_filename=function(e){if("string"!=typeof e)throw"Invalid filename";this.setFileName(q(),e)},this.set_default_editor_content=function(e){if("string"!=typeof e)throw"Invalid content";var n=o[q()];n.setValue(e),n.gotoLine(1,0,!1)},this.setDefaultEditorContextMenu=function(e){var n=q();if(g().find('a[href="#'+n+'"]').parent().find(".dropdown").remove(),e){g().find('a[href="#'+n+'"]').after('<div class="dropdown"><span class="dropbtn glyphicon glyphicon-option-vertical"></span><div class="dropdown-content" style="left:-50px;"><a href="#" class="menu_item menu_item_rename">Rename</a></div></div>'),_(n)}},a.find(".editor").each(function(){h(this.id)}),g().find('a[data-toggle="tab"]').on("shown.bs.tab",function(e){m(e)})}jQuery.fn.editor=function(){return new t({target:e(this[0])})}}(jQuery);