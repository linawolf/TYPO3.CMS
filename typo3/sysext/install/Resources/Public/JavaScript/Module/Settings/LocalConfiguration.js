/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","../AbstractInteractableModule","jquery","../../Router","TYPO3/CMS/Backend/Modal","TYPO3/CMS/Backend/Notification","bootstrap","../../Renderable/Clearable"],function(e,t,r,a,s,o,i){"use strict";return new class extends r.AbstractInteractableModule{constructor(){super(...arguments),this.selectorToggleAllTrigger=".t3js-localConfiguration-toggleAll",this.selectorWriteTrigger=".t3js-localConfiguration-write",this.selectorSearchTrigger=".t3js-localConfiguration-search"}initialize(e){this.currentModal=e,this.getContent(),e.on("click",this.selectorWriteTrigger,()=>{this.write()}),e.on("click",this.selectorToggleAllTrigger,()=>{const e=this.getModalBody().find(".panel-collapse"),t=e.eq(0).hasClass("in")?"hide":"show";e.collapse(t)}),jQuery.expr[":"].contains=jQuery.expr.createPseudo(e=>t=>jQuery(t).text().toUpperCase().includes(e.toUpperCase())),e.on("keydown",t=>{const r=e.find(this.selectorSearchTrigger);t.ctrlKey||t.metaKey?"f"===String.fromCharCode(t.which).toLowerCase()&&(t.preventDefault(),r.focus()):27===t.keyCode&&(t.preventDefault(),r.val("").focus())}),e.on("keyup",this.selectorSearchTrigger,t=>{const r=a(t.target).val(),s=e.find(this.selectorSearchTrigger);e.find("div.item").each((e,t)=>{const s=a(t);a(":contains("+r+")",s).length>0||a('input[value*="'+r+'"]',s).length>0?s.removeClass("hidden").addClass("searchhit"):s.removeClass("searchhit").addClass("hidden")}),e.find(".searchhit").parent().collapse("show");const o=s.get(0);o.clearable(),o.focus()})}getContent(){const e=this.getModalBody();a.ajax({url:s.getUrl("localConfigurationGetContent"),cache:!1,success:t=>{!0===t.success&&(Array.isArray(t.status)&&t.status.forEach(e=>{i.success(e.title,e.message)}),e.html(t.html),o.setButtons(t.buttons))},error:t=>{s.handleAjaxError(t,e)}})}write(){const e=this.getModalBody(),t=this.getModuleContent().data("local-configuration-write-token"),r={};this.findInModal(".t3js-localConfiguration-pathValue").each((e,t)=>{const s=a(t);"checkbox"===s.attr("type")?t.checked?r[s.data("path")]="1":r[s.data("path")]="0":r[s.data("path")]=s.val()}),a.ajax({url:s.getUrl(),method:"POST",data:{install:{action:"localConfigurationWrite",token:t,configurationValues:r}},cache:!1,success:e=>{!0===e.success&&Array.isArray(e.status)?e.status.forEach(e=>{i.showMessage(e.title,e.message,e.severity)}):i.error("Something went wrong")},error:t=>{s.handleAjaxError(t,e)}})}}});