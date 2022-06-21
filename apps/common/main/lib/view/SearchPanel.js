/*
 *
 * (c) Copyright Ascensio System SIA 2010-2019
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-12 Ernesta Birznieka-Upisha
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
*/
/**
 * User: Julia.Svinareva
 * Date: 11.02.2022
 */

define([
    'text!common/main/lib/template/SearchPanel.template',
    'common/main/lib/util/utils',
    'common/main/lib/component/BaseView',
    'common/main/lib/component/Layout'
], function (template) {
    'use strict';

    Common.Views.SearchPanel = Common.UI.BaseView.extend(_.extend({
        el: '#left-panel-search',
        template: _.template(template),

        initialize: function(options) {
            _.extend(this, options);
            Common.UI.BaseView.prototype.initialize.call(this, arguments);

            this.mode = false;
            this.resizeResults = {
                events: {
                    mousemove: _.bind(this.resultsResizeMove, this),
                    mouseup: _.bind(this.resultsResizeStop, this)
                }
            };

            window.SSE && (this.extendedOptions = Common.localStorage.getBool('sse-search-options-extended', true));
        },

        render: function(el) {
            var me = this;
            if (!this.rendered) {
                el = el || this.el;
                $(el).html(this.template({
                    scope: this
                }));
                this.$el = $(el);

                this.inputText = new Common.UI.InputField({
                    el: $('#search-adv-text'),
                    placeHolder: this.textFind,
                    allowBlank: true,
                    validateOnBlur: false,
                    style: 'width: 100%;',
                    dataHint: '1',
                    dataHintDirection: 'left',
                    dataHintOffset: 'small'
                });
                this.inputText._input.on('input', _.bind(function () {
                    this.fireEvent('search:input', [this.inputText._input.val()]);
                }, this)).on('keydown', _.bind(function (e) {
                    this.fireEvent('search:keydown', [this.inputText._input.val(), e]);
                }, this));

                this.inputReplace = new Common.UI.InputField({
                    el: $('#search-adv-replace-text'),
                    placeHolder: this.textReplaceWith,
                    allowBlank: true,
                    validateOnBlur: false,
                    style: 'width: 100%;',
                    dataHint: '1',
                    dataHintDirection: 'left',
                    dataHintOffset: 'small'
                });

                this.btnBack = new Common.UI.Button({
                    parentEl: $('#search-adv-back'),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-arrow-up',
                    hint: this.tipPreviousResult,
                    dataHint: '1',
                    dataHintDirection: 'bottom'
                });
                this.btnBack.on('click', _.bind(this.onBtnNextClick, this, 'back'));

                this.btnNext = new Common.UI.Button({
                    parentEl: $('#search-adv-next'),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-arrow-down',
                    hint: this.tipNextResult,
                    dataHint: '1',
                    dataHintDirection: 'bottom'
                });
                this.btnNext.on('click', _.bind(this.onBtnNextClick, this, 'next'));

                this.btnReplace = new Common.UI.Button({
                    el: $('#search-adv-replace')
                });
                this.btnReplace.on('click', _.bind(this.onReplaceClick, this, 'replace'));

                this.btnReplaceAll = new Common.UI.Button({
                    el: $('#search-adv-replace-all')
                });
                this.btnReplaceAll.on('click', _.bind(this.onReplaceClick, this, 'replaceall'));

                this.$reaultsNumber = $('#search-adv-results-number');
                this.updateResultsNumber('no-results');

                this.chCaseSensitive = new Common.UI.CheckBox({
                    el: $('#search-adv-case-sensitive'),
                    labelText: this.textCaseSensitive,
                    value: false,
                    dataHint: '1',
                    dataHintDirection: 'left',
                    dataHintOffset: 'small'
                }).on('change', function(field) {
                    me.fireEvent('search:options', ['case-sensitive', field.getValue() === 'checked']);
                });

                /*this.chUseRegExp = new Common.UI.CheckBox({
                    el: $('#search-adv-use-regexp'),
                    labelText: this.textMatchUsingRegExp,
                    dataHint: '1',
                    dataHintDirection: 'left',
                    dataHintOffset: 'small'
                }).on('change', function(field) {
                    me.fireEvent('search:options', ['regexp', field.getValue() === 'checked']);
                });*/

                this.chMatchWord = new Common.UI.CheckBox({
                    el: $('#search-adv-match-word'),
                    labelText: window.SSE ? this.textItemEntireCell : this.textWholeWords,
                    value: false,
                    dataHint: '1',
                    dataHintDirection: 'left',
                    dataHintOffset: 'small'
                }).on('change', function(field) {
                    me.fireEvent('search:options', ['match-word', field.getValue() === 'checked']);
                });

                this.buttonClose = new Common.UI.Button({
                    parentEl: $('#search-btn-close', this.$el),
                    cls: 'btn-toolbar',
                    iconCls: 'toolbar__icon btn-close',
                    hint: this.textCloseSearch,
                    dataHint: '1',
                    dataHintDirection: 'bottom',
                    dataHintOffset: 'medium'
                });
                this.buttonClose.on('click', _.bind(this.onClickClosePanel, this));

                this.$resultsContainer = $('#search-results');
                this.$resultsContainer.hide();

                Common.NotificationCenter.on('search:updateresults', _.bind(this.disableNavButtons, this));
                if (window.SSE) {
                    this.cmbWithin = new Common.UI.ComboBox({
                        el: $('#search-adv-cmb-within'),
                        menuStyle: 'min-width: 100%;',
                        style: "width: 219px;",
                        editable: false,
                        cls: 'input-group-nr',
                        data: [
                            { value: 0, displayValue: this.textSheet },
                            { value: 1, displayValue: this.textWorkbook },
                            { value: 2, displayValue: this.textSpecificRange}
                        ],
                        dataHint: '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'big'
                    }).on('selected', function(combo, record) {
                        me.fireEvent('search:options', ['within', record.value]);
                    });

                    this.inputSelectRange = new Common.UI.InputFieldBtn({
                        el: $('#search-adv-select-range'),
                        placeHolder: this.textSelectDataRange,
                        allowBlank: true,
                        validateOnChange: true,
                        validateOnBlur: true,
                        style: "width: 219px; margin-top: 8px",
                        disabled: true,
                        dataHint: '1',
                        dataHintDirection: 'left',
                        dataHintOffset: 'small'
                    }).on('keyup:after', function(input, e) {
                        me.fireEvent('search:options', ['range', input.getValue(), e.keyCode !== Common.UI.Keys.RETURN]);
                    });

                    this.cmbSearch = new Common.UI.ComboBox({
                        el: $('#search-adv-cmb-search'),
                        menuStyle: 'min-width: 100%;',
                        style: "width: 219px;",
                        editable: false,
                        cls: 'input-group-nr',
                        data: [
                            { value: 0, displayValue: this.textByRows },
                            { value: 1, displayValue: this.textByColumns }
                        ],
                        dataHint: '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'big'
                    }).on('selected', function(combo, record) {
                        me.fireEvent('search:options', ['search', !record.value]);
                    });

                    this.cmbLookIn = new Common.UI.ComboBox({
                        el: $('#search-adv-cmb-look-in'),
                        menuStyle: 'min-width: 100%;',
                        style: "width: 219px;",
                        editable: false,
                        cls: 'input-group-nr',
                        data: [
                            { value: 0, displayValue: this.textFormulas },
                            { value: 1, displayValue: this.textValues }
                        ],
                        dataHint: '1',
                        dataHintDirection: 'bottom',
                        dataHintOffset: 'big'
                    }).on('selected', function(combo, record) {
                        me.fireEvent('search:options', ['lookIn', !record.value]);
                    });

                    this.$searchOptionsBlock = $('.search-options-block');
                    this.$searchOptionsBlock.show();
                    $('#open-search-options').on('click', _.bind(this.expandSearchOptions, this));

                    if (!this.extendedOptions) {
                        this.$searchOptionsBlock.addClass('no-expand');
                    }

                    this.cmbWithin.setValue(0);
                    this.cmbSearch.setValue(0);
                    this.cmbLookIn.setValue(0);

                    var tableTemplate = '<div class="search-header">' +
                            '<div class="header-item" data-col="sheet">' + this.textSheet + '</div>' +
                            '<div class="header-resizer" data-resizer="name" data-index="0"></div>' +
                            '<div class="header-item" data-col="name">' + this.textName + '</div>' +
                            '<div class="header-resizer" data-resizer="cell" data-index="1"></div>' +
                            '<div class="header-item" data-col="cell">' + this.textCell + '</div>' +
                            '<div class="header-resizer" data-resizer="value" data-index="2"></div>' +
                            '<div class="header-item" data-col="value">' + this.textValue + '</div>' +
                            '<div class="header-resizer" data-resizer="formula" data-index="3"></div>' +
                            '<div class="header-item" data-col="formula">' + this.textFormula + '</div>' +
                        '</div>' +
                        '<div class="search-table">' +
                            '<div class="ps-container oo search-items"></div>' +
                        '</div>',
                        $resultTable = $(tableTemplate).appendTo(this.$resultsContainer);
                    this.$resultsContainer.scroller = new Common.UI.Scroller({
                        el: $resultTable.find('.search-items'),
                        includePadding: true,
                        useKeyboard: true,
                        minScrollbarLength: 40,
                        alwaysVisibleY: true
                    });
                    this.$resultsContainer.scrollerX = new Common.UI.Scroller({
                        el: this.$resultsContainer,
                        includePadding: true,
                        useKeyboard: true,
                        minScrollbarLength: 40,
                        alwaysVisibleX: true
                    });
                    var resizers = $resultTable.find('.header-resizer');
                    _.each(resizers, _.bind(function (item) {
                        var $el = $(item),
                            data = $el.data('resizer'),
                            $col = $resultTable.find('[data-col=' + data + ']');
                        $el.on('mousedown', {col: $col, resizer: $el, data: data}, _.bind(this.resultsResizeStart, this));
                    }, this));
                    Common.NotificationCenter.on('layout:resizestop', _.bind(this.onLayoutResize, this));
                } else {
                    this.$resultsContainer.scroller = new Common.UI.Scroller({
                        el: this.$resultsContainer,
                        includePadding: true,
                        useKeyboard: true,
                        minScrollbarLength: 40,
                        alwaysVisibleY: true
                    });
                }
                Common.NotificationCenter.on('window:resize', function() {
                    me.$resultsContainer.outerHeight($('#search-box').outerHeight() - $('#search-header').outerHeight() - $('#search-adv-settings').outerHeight());

                    me.$resultsContainer.scroller.update({alwaysVisibleY: true});
                    window.SSE && me.$resultsContainer.scrollerX.update({alwaysVisibleX: true});
                });
            }

            this.rendered = true;
            this.trigger('render:after', this);
            return this;
        },

        show: function () {
            Common.UI.BaseView.prototype.show.call(this,arguments);
            this.fireEvent('show', this );

            this.$resultsContainer.outerHeight($('#search-box').outerHeight() - $('#search-header').outerHeight() - $('#search-adv-settings').outerHeight());
            this.$resultsContainer.scroller.update({alwaysVisibleY: true});
        },

        hide: function () {
            Common.UI.BaseView.prototype.hide.call(this,arguments);
            this.fireEvent('hide', this );
        },

        focus: function(type) {
            var me  = this,
                el = type === 'replace' ? me.inputReplace.$el : (type === 'range' ? me.inputSelectRange.$el : me.inputText.$el);
            setTimeout(function(){
                el.find('input').focus();
                el.find('input').select();
            }, 10);
        },

        setSearchMode: function (mode) {
            if (this.mode !== mode) {
                this.$el.find('.edit-setting')[mode !== 'no-replace' ? 'show' : 'hide']();
                this.$el.find('#search-adv-title').text(mode !== 'no-replace' ? this.textFindAndReplace : this.textFind);
                this.mode = mode;
            }
        },

        ChangeSettings: function(props) {
        },

        updateResultsNumber: function (current, count) {
            var text;
            if (count > 300) {
                text = this.textTooManyResults;
            } else {
                text = current === 'no-results' ? this.textNoSearchResults : (!count ? this.textNoMatches : Common.Utils.String.format(this.textSearchResults, current + 1, count));
            }
            this.$reaultsNumber.text(text);
            this.disableReplaceButtons(!count);
        },

        onClickClosePanel: function() {
            Common.NotificationCenter.trigger('leftmenu:change', 'hide');
            this.fireEvent('hide', this );
        },

        onBtnNextClick: function (action) {
            this.fireEvent('search:'+action, [this.inputText.getValue(), true]);
        },

        onReplaceClick: function (action) {
            this.fireEvent('search:'+action, [this.inputText.getValue(), this.inputReplace.getValue()]);
        },

        getSettings: function() {
            return {
                textsearch: this.inputText.getValue(),
                matchcase: this.chCaseSensitive.checked,
                matchword: this.chMatchWord.checked
            };
        },

        expandSearchOptions: function () {
            this.extendedOptions = !this.extendedOptions;
            this.$searchOptionsBlock[this.extendedOptions ? 'removeClass' : 'addClass']('no-expand');
            Common.localStorage.setBool('sse-search-options-extended', this.extendedOptions);

            this.$resultsContainer.outerHeight($('#search-box').outerHeight() - $('#search-header').outerHeight() - $('#search-adv-settings').outerHeight());
            this.$resultsContainer.scroller.update({alwaysVisibleY: true});
        },

        setFindText: function (val) {
            this.inputText.setValue(val);
        },

        clearResultsNumber: function () {
            this.updateResultsNumber('no-results');
        },

        disableNavButtons: function (resultNumber, allResults) {
            var disable = this.inputText._input.val() === '';
            this.btnBack.setDisabled(disable || !allResults || resultNumber === 0);
            this.btnNext.setDisabled(disable || !allResults || resultNumber + 1 === allResults);
        },

        disableReplaceButtons: function (disable) {
            this.btnReplace.setDisabled(disable);
            this.btnReplaceAll.setDisabled(disable);
        },

        fillResultColsSize: function () {
            this.resizeResults.currentWidths = [];
            this.resizeResults.currentResizersPosition = [];

            var headerCols = this.$resultsContainer.find('.header-item'),
                resizers = this.$resultsContainer.find('.header-resizer');
            _.each(headerCols, _.bind(function (item) {
                var data = $(item).data('col'),
                    resCol = this.$resultsContainer.find('.search-items [data-col=' + data + ']')[0];
                this.resizeResults.currentWidths.push({
                    name: data,
                    headerWidth: $(item).outerWidth(),
                    resultWidth: $(resCol).outerWidth()
                });
            }, this));
            _.each(resizers, _.bind(function (item) {
                this.resizeResults.currentResizersPosition.push($(item).position().left);
            }, this));

            console.log('this.resizeResults.currentWidths', this.resizeResults.currentWidths);
            console.log('this.resizeResults.currentResizersPosition', this.resizeResults.currentResizersPosition);
        },

        applyResultColsSize: function () {
            if (this.resizeResults.isChanged) {
                var headerCols = this.$resultsContainer.find('.header-item'),
                    resizers = this.$resultsContainer.find('.header-resizer');
                _.each(headerCols, _.bind(function (item, index) {
                    var currentWidth = this.resizeResults.currentWidths[index];
                    $(item).width(currentWidth.headerWidth);
                    this.$resultsContainer.find('.search-items [data-col=' + currentWidth.name + ']').width(currentWidth.resultWidth);
                }, this));
                _.each(resizers, _.bind(function (item, index) {
                    $(item).position({left: this.resizeResults.currentResizersPosition[index]});
                }, this));
            }
        },

        resultsResizeStart: function (e) {
            $(document).on('mousemove', this.resizeResults.events.mousemove)
                .on('mouseup', this.resizeResults.events.mouseup);

            e.data.resizer.addClass('move');

            this.resizeResults.$resizer = e.data.resizer;
            this.resizeResults.$col = e.data.col;
            this.resizeResults.data = e.data.data;

            this.resizeResults.currentIndex = parseInt(this.resizeResults.$resizer.data('index'));
            this.resizeResults.containerLeft = $('#search-results').offset().left;
            this.resizeResults.min = this.resizeResults.currentIndex === 0 ? 0 :
                this.$resultsContainer.find('.header-resizer[data-index=' + (this.resizeResults.currentIndex - 1) + ']').offset().left - this.resizeResults.containerLeft; // left border
            this.resizeResults.max = Common.Utils.innerWidth(); // document width
            this.resizeResults.initX = e.pageX*Common.Utils.zoom() - this.resizeResults.containerLeft; // start position

            console.log('current index ', this.resizeResults.currentIndex);
            console.log('initX ', this.resizeResults.initX);
            console.log('max/doc width ', this.resizeResults.max);
            console.log('min 0/header resizer left - container left border ', this.resizeResults.min);

            this.fillResultColsSize();
            this.resizeResults.isChanged = true;
        },

        resultsResizeMove: function (e) {
            var zoom = (e instanceof jQuery.Event) ? Common.Utils.zoom() : 1,
                value = e.pageX*zoom - this.resizeResults.containerLeft;
            this.resizeResults.currentX = Math.min(Math.max(this.resizeResults.min, value), this.resizeResults.max);
            this.resizeResults.$resizer.css('left', this.resizeResults.currentX + this.$resultsContainer.scrollLeft() + 'px');

            console.log('current x ', this.resizeResults.currentX);
            console.log('resizer position (+scroll) ', this.resizeResults.currentX + this.$resultsContainer.scrollLeft());
        },

        resultsResizeStop: function (e) {
            this.resizeResults.$resizer.removeClass('move');
            $(document).off('mousemove', this.resizeResults.events.mousemove)
                .off('mouseup', this.resizeResults.events.mouseup);

            var delta = this.resizeResults.currentX - this.resizeResults.initX,
                cols = this.$resultsContainer.find('.header-item'),
                col = $(cols[this.resizeResults.currentIndex]),
                newWidth = (col.hasClass('zero-width') ? 0 : col.outerWidth()) + delta,
                resizers = this.$resultsContainer.find('.header-resizer');
            col.width(newWidth < 0.1 ? 0 : newWidth - 4 - 1 + 2); // change width in header, 4 - padding, 1 - border, 2 - half of width of resizer
            col[newWidth < 0.1 ? 'addClass' : 'removeClass']('zero-width');
            console.log('cols ', cols);
            console.log('new col width', newWidth);
            console.log('new col width without padding', newWidth - 4 - 1 + 2);

            var resTable = this.$resultsContainer.find('.search-table');
            resTable.css('min-width', (resTable.outerWidth() + delta) + 'px');
            console.log('new table width ', resTable.outerWidth() + delta);
            //resTable.css('min-width', '100%');

            var resCols = resTable.find('.item [data-index=' + this.resizeResults.currentIndex + ']'), // change col width in table
                resColWidth = newWidth < 0.1 ? 0 : newWidth - 4 + 2; // 4 - padding, 2 - half of width of resizer
            _.each(resCols, function (item) {
                $(item).width(resColWidth);
                $(item)[resColWidth < 0.1 ? 'addClass' : 'removeClass']('zero-width');
            });
            console.log('current resCols', resCols);
            console.log('new width current resCols', resColWidth);

            // change left positions of resizers on right side
            for(var i = this.resizeResults.currentIndex + 1; i < 5; i++) {
                var el = $(cols[i]),
                    elLeft = el.offset().left - this.resizeResults.containerLeft + this.$resultsContainer.scrollLeft() + delta + 2;
                el.css('left', elLeft + 'px');
                console.log('el ', el);
                console.log('el left ', elLeft);
                var resizer = resizers[i];
                console.log(resizer);
                if (resizer) {
                    var resizerLeft = $(resizer).offset().left - this.resizeResults.containerLeft + this.$resultsContainer.scrollLeft() + delta + 2;
                    $(resizer).css('left', resizerLeft + 'px');
                    console.log('resizer left ', resizerLeft);
                }
            }

            this.updateFormulaColWidth();
            this.$resultsContainer.scrollerX.update({alwaysVisibleX: true});

            this.fillResultColsSize();
        },

        onLayoutResize: function () {
            this.$resultsContainer.find('.search-table').width(this.$resultsContainer.outerWidth() + this.$resultsContainer.scrollLeft() + 'px');

            this.updateFormulaColWidth();
            this.$resultsContainer.scrollerX.update({alwaysVisibleX: true});
        },

        updateFormulaColWidth: function () {
            var formulaCol = this.$resultsContainer.find('[data-col="formula"]'),
                formulaLeftBorder = window.getComputedStyle(formulaCol[0],null).getPropertyValue("left"),
                newWidth = this.$resultsContainer.find('.search-table').outerWidth() - parseInt(formulaLeftBorder) - 4;
            formulaCol.width(newWidth + 'px');

            console.log('update formula width ', newWidth);
        },

        textFind: 'Find',
        textFindAndReplace: 'Find and replace',
        textCloseSearch: 'Close search',
        textReplace: 'Replace',
        textReplaceAll: 'Replace All',
        textSearchResults: 'Search results: {0}/{1}',
        textReplaceWith: 'Replace with',
        textCaseSensitive: 'Case sensitive',
        textMatchUsingRegExp: 'Match using regular expressions',
        textWholeWords: 'Whole words only',
        textWithin: 'Within',
        textSelectDataRange: 'Select Data range',
        textSearch: 'Search',
        textLookIn: 'Look in',
        textSheet: 'Sheet',
        textWorkbook: 'Workbook',
        textSpecificRange: 'Specific range',
        textByRows: 'By rows',
        textByColumns: 'By columns',
        textFormulas: 'Formulas',
        textValues: 'Values',
        textSearchOptions: 'Search options',
        textNoMatches: 'No matches',
        textNoSearchResults: 'No search results',
        textItemEntireCell: 'Entire cell contents',
        textTooManyResults: 'There are too many results to show here',
        tipPreviousResult: 'Previous result',
        tipNextResult: 'Next result',
        textName: 'Name',
        textCell: 'Cell',
        textValue: 'Value',
        textFormula: 'Formula'

    }, Common.Views.SearchPanel || {}));
});