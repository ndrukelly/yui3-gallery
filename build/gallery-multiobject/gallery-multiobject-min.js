YUI.add("gallery-multiobject",function(F){function C(G,H){this.items=F.Array(G);var I=this.items[0];for(var J in I){if(F.Lang.isFunction(I[J])&&!this[J]){this[J]=D.call(this,J);}}this.args_adjuster={};H=H||{};this.primary_item_index=H.primary_item_index||0;this.return_all_results=H.return_all_results;F.Array.each(this.items,B,this);H.prefix=this.items[0].name;C.superclass.constructor.call(this,H);}function D(G){return function(){var H=arguments;var I=[];F.Array.each(this.items,function(L,K){var M=H;if(this.args_adjuster[G]){M=this.args_adjuster[G].call(L,K,F.Array(H,0,true));}var J=L[G].apply(L,M);if(!F.Lang.isUndefined(J)&&J!==L){I.push(J);}},this);if(I.length===0){return this;}else{if(this.return_all_results){return I;}else{return I[this.primary_item_index];}}};}function E(I,G,H){F.Array.each(this.items,function(K,J){if(J!==G){K.set(H,I.newVal);}});}function B(H,G){if(!H){return;}F.Object.each(H.getAttrs(),function(J,I){H.after(I+"Change",E,this,G,I);},this);H.addTarget(this);}function A(H,G){if(!H){return;}F.Object.each(H.getAttrs(),function(J,I){H.detach(I+"Change",E,this);},this);H.removeTarget(this);}F.extend(C,F.EventTarget,{multi_destroy:function(){F.Array.each(this.items,A,this);},multi_get_primary_item_index:function(){return this.primary_item_index;},multi_set_primary_item_index:function(G){this.primary_item_index=G;},multi_get_return_all_results:function(){return this.return_all_results;},multi_set_return_all_results:function(G){this.return_all_results=G;},multi_get_all:function(J){var G=F.Array(arguments,0,true);G.shift();var I=this.return_all_results;this.return_all_results=true;var H=this[J].apply(this,G);this.return_all_results=I;return H;}});F.MultiObject=C;},"@VERSION@",{requires:["event-custom"]});