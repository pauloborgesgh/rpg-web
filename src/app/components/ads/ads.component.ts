import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isBrowser) {
      <div class="ads-container" [class.ads-top]="position === 'top'" [class.ads-middle]="position === 'middle'">
        <div class="ad-slot">
          <ins class="adsbygoogle"
               [attr.data-ad-client]="adClient"
               [attr.data-ad-slot]="adSlot"
               [attr.data-ad-format]="adFormat"
               data-ad-format="auto"
               data-full-width-responsive="true">
          </ins>
        </div>
        <p class="ads-label" *ngIf="showLabel">{{ getAdLabel() }}</p>
      </div>
    }
  `,
  styles: [`
    .ads-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 16px 0;
      min-height: 90px;
    }

    .ads-top {
      margin-top: 0;
      margin-bottom: 24px;
    }

    .ads-middle {
      margin: 24px 0;
    }

    .ad-slot {
      min-width: 300px;
      min-height: 250px;
      background: #1f2937;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .ads-top .ad-slot {
      min-width: 728px;
      min-height: 90px;
    }

    .ads-label {
      font-size: 10px;
      color: #6b7280;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .ad-slot {
        min-width: 320px;
        min-height: 50px;
      }

      .ads-top .ad-slot {
        min-width: 320px;
        min-height: 50px;
      }
    }
  `]
})
export class AdsComponent implements OnInit {
  @Input() position: 'top' | 'middle' = 'top';
  @Input() showLabel = true;

  isBrowser = false;

  adClient = 'ca-pub-YOUR_AD_CLIENT_ID';
  adSlot = 'YOUR_AD_SLOT_ID';
  adFormat = 'auto';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && window.adsbygoogle) {
      this.loadAd();
    }
  }

  private loadAd() {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Erro ao carregar anúncio:', e);
    }
  }

  getAdLabel(): string {
    return 'Publicidade';
  }
}

@Component({
  selector: 'app-ads-bottom',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isBrowser) {
      <div class="ads-bottom-container">
        <ins class="adsbygoogle"
             [attr.data-ad-client]="adClient"
             [attr.data-ad-slot]="adSlotBottom"
             data-ad-format="fluid"
             data-fluid="true">
        </ins>
      </div>
    }
  `,
  styles: [`
    .ads-bottom-container {
      width: 100%;
      min-height: 50px;
      background: #1f2937;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class AdsBottomComponent implements OnInit {
  isBrowser = false;

  adClient = 'ca-pub-YOUR_AD_CLIENT_ID';
  adSlotBottom = 'YOUR_BOTTOM_SLOT_ID';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Erro ao carregar anúncio:', e);
      }
    }
  }
}