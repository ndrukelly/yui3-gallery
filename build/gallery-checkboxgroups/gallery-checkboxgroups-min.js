YUI.add("gallery-checkboxgroups",function(F){var E={SLIDE_UP:0,SLIDE_DOWN:1};function H(I){if(arguments.length===0){return;}this.cb_list=[];this.ev_list=[];this.splice(0,0,I);this.direction=E.SLIDE_UP;this.ignore_change=false;}function C(J,I){this.checkboxChanged(J.target);}H.prototype={getCheckboxList:function(){return this.cb_list;},splice:function(O,N,J){for(var L=O;L<N;L++){this.ev_list[L].detach();}if(F.Lang.isString(J)){var M=F.all(J);J=[];M.each(function(P){this.push(P);},J);}if(J instanceof Array||(J&&J.length)){for(L=0;L<J.length;L++){var K=O+L,I=(L===0?N:0);this.cb_list.splice(K,I,F.one(J[L]));this.ev_list.splice(K,I,this.cb_list[K].on("click",C,this));}}else{this.cb_list.splice(O,N);this.ev_list.splice(O,N);}},checkboxChanged:function(I){if(this.ignore_change||!this.cb_list.length||this.allDisabled()){return;}I=F.one(I);var K=this.cb_list.length;for(var J=0;J<K;J++){if(I==this.cb_list[J]){this.enforceConstraints(this.cb_list,J);}}},enforceConstraints:function(I,J){},allChecked:function(){var J=this.cb_list.length;for(var I=0;I<J;I++){if(!this.cb_list[I].get("checked")){return false;}}return true;},allUnchecked:function(){var J=this.cb_list.length;for(var I=0;I<J;I++){if(this.cb_list[I].get("checked")){return false;}}return true;},allDisabled:function(){var J=this.cb_list.length;for(var I=0;I<J;I++){if(!this.cb_list[I].get("disabled")){return false;}}return true;}};F.CheckboxGroup=H;function B(I){B.superclass.constructor.call(this,I);}function G(J,K){if(J.length<2){return K;}var I=K;do{if(I===0){this.direction=E.SLIDE_DOWN;}else{if(I==J.length-1){this.direction=E.SLIDE_UP;}}if(this.direction==E.SLIDE_UP){I=Math.max(0,I-1);}else{I=Math.min(J.length-1,I+1);}}while(J[I].get("disabled"));return I;}F.extend(B,H,{enforceConstraints:function(J,K){if(J[K].get("checked")||!this.allUnchecked()){this.direction=E.SLIDE_UP;return;}var I=G.call(this,J,K);if(I==K){I=G.call(this,J,K);}this.ignore_change=true;J[I].set("checked",true);this.ignore_change=false;}});F.AtLeastOneCheckboxGroup=B;function D(I){D.superclass.constructor.call(this,I);}F.extend(D,H,{enforceConstraints:function(I,J){if(!I[J].get("checked")){return;}var L=I.length;for(var K=0;K<L;K++){if(K!=J){I[K].set("checked",false);}}}});F.AtMostOneCheckboxGroup=D;function A(J,I){this.select_all_cb=F.one(J);this.select_all_cb.on("click",this.toggleSelectAll,this);A.superclass.constructor.call(this,I);}F.extend(A,H,{getSelectAllCheckbox:function(){return this.select_all_cb;},toggleSelectAll:function(){var J=this.select_all_cb.get("checked");for(var I=0;I<this.cb_list.length;I++){this.cb_list[I].set("checked",J);}},enforceConstraints:function(I,J){this.select_all_cb.set("checked",this.allChecked());}});F.SelectAllCheckboxGroup=A;},"@VERSION@",{requires:["node"]});