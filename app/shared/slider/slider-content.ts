/**
 * Highly Inspired by google material tab component
 */


import {Directionality} from '@angular/cdk/bidi';
import {ViewportRuler} from '@angular/cdk/scrolling';
import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  NgZone,
  OnDestroy,
  Optional,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  Input,
  Inject,
  Directive,
} from '@angular/core';
import {ANIMATION_MODULE_TYPE} from '@angular/platform-browser/animations';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MatTabLabelWrapper} from './content-wrapper';
import {Platform} from '@angular/cdk/platform';
import {MatPaginatedSliderContent} from './paginated-slider-content';

/**
 * Base class with all of the `MatSliderContent` functionality.
 * @docs-private
 */
@Directive({
  // TODO(crisbeto): this selector can be removed when we update to Angular 9.0.
  selector: 'do-not-use-abstract-mat-slider-content-base'
})
// tslint:disable-next-line:class-name
export abstract class _MatSliderContentBase extends MatPaginatedSliderContent implements
  AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {

  constructor(elementRef: ElementRef,
              changeDetectorRef: ChangeDetectorRef,
              viewportRuler: ViewportRuler,
              @Optional() dir: Directionality,
              ngZone: NgZone,
              platform: Platform,
              // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
  }

  protected _itemSelected(event: KeyboardEvent) {
    event.preventDefault();
  }
}

/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * @docs-private
 */
@Component({
  selector: 'mat-slider-content',
  templateUrl: 'slider-content.html',
  styleUrls: ['slider-content.scss'],
  inputs: ['selectedIndex'],
  outputs: ['selectFocusedIndex', 'indexFocused'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:validate-decorators
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    'class': 'mat-slider-content',
    '[class.mat-slider-content-pagination-controls-enabled]': '_showPaginationControls',
    '[class.mat-slider-content-rtl]': "_getLayoutDirection() == 'rtl'",
  },
})
export class MatSliderContent extends _MatSliderContentBase {
  @ContentChildren(MatTabLabelWrapper) _items: QueryList<MatTabLabelWrapper>;
  @ViewChild('tabListContainer', {static: true}) _tabListContainer: ElementRef;
  @ViewChild('tabList', {static: true}) _tabList: ElementRef;
  @ViewChild('nextPaginator', {static: false}) _nextPaginator: ElementRef<HTMLElement>;
  @ViewChild('previousPaginator', {static: false}) _previousPaginator: ElementRef<HTMLElement>;

  constructor(elementRef: ElementRef,
              changeDetectorRef: ChangeDetectorRef,
              viewportRuler: ViewportRuler,
              @Optional() dir: Directionality,
              ngZone: NgZone,
              platform: Platform,
              // @breaking-change 9.0.0 `_animationMode` parameter to be made required.
              @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string) {
    super(elementRef, changeDetectorRef, viewportRuler, dir, ngZone, platform, animationMode);
  }
}
