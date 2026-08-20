import {Component, signal} from '@angular/core';
import {ParagraphComponent} from '../../../../shared/components/paragraph/paragraph.component';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {ArrowIcon} from '../../../../shared/icons/arrow.icon';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How does the bidding system work?',
    answer: 'Each bid must exceed the previous one by at least 1 credit. Bids are processed in real time and immediately visible to all participants. If a bid is placed in the last 2 minutes, the timer is automatically extended by 2 minutes to ensure every participant has a fair chance to respond. This extension can repeat indefinitely until no new bids are placed within the final window.'
  },
  {
    id: 2,
    question: 'How are shipping costs handled?',
    answer: 'Shipping costs are entirely the buyer\'s responsibility and are not included in the final auction price. Once the auction ends, the buyer and seller are connected through our messaging system to agree on a shipping method, carrier, and cost. We recommend requesting tracking and insurance for high-value instruments. Any dispute arising from shipping damage is handled between the two parties.'
  },
  {
    id: 3,
    question: 'What happens if the instrument doesn\'t match the description?',
    answer: 'If the item you receive does not match the seller\'s description — in terms of condition, specifications, or included accessories — you can open a dispute within 48 hours of delivery. You will be asked to provide photographic evidence and a written statement. Our moderation team reviews all submitted evidence, contacts both parties, and issues a ruling within 5 business days. If the claim is validated, a full or partial refund may be issued depending on the severity of the discrepancy.'
  },
  {
    id: 4,
    question: 'Can I cancel a bid?',
    answer: 'Bids are binding and cannot be cancelled once confirmed. Before placing a bid, you are shown a confirmation screen detailing the amount, the item, and the terms. We strongly encourage you to review the listing thoroughly — including photos, specs, and seller history — before committing. Repeated bid abandonment (winning an auction and not completing payment) may result in account suspension.'
  },
  {
    id: 5,
    question: 'How are sellers verified?',
    answer: 'All sellers go through a basic verification process that includes email and phone number confirmation. Sellers who have completed multiple successful transactions without disputes are awarded a "Verified Seller" badge, visible on their profile and listings. This badge reflects a track record of accurate descriptions, timely shipping, and positive buyer feedback. We continuously monitor seller activity and can revoke verified status in the event of repeated issues.'
  }
];

@Component({
  selector: 'app-accordion',
  imports: [
    ParagraphComponent,
    NgmMotionDirective,
    NgmPresenceDirective,
    ArrowIcon,
  ],
  template: `
    <div class="grid grid-cols-10 w-full  min-h-85">
      <div class="col-start-3 col-end-9 py-1.5 border-neutral-800">
        <div
          class="grid grid-cols-5 items-start">
          <div class="col-span-2 py-3">
            <h3 class="text-2xl/7 text-box-trim uppercase tracking-tighter text-neutral-200 text-left">
              Frequently Ask <br>Questions
            </h3>
          </div>
          <div class="col-span-3 flex flex-col justify-end gap-1.5">
            @for (item of faqItems; track item.id) {
              <button
                (click)="toggle(item.id)"
                class="group relative cursor-pointer transition-all duration-400 flex flex-col border-b last:border-0 border-neutral-800 py-3 overflow-hidden">
                <div
                  ngmMotion
                  [layout]="true"
                  [layoutDependency]="expanded() === item.id"
                  [transition]="demoSpring"
                  [class.mb-5.text-white]="expanded() === item.id"
                  class="transition-all text-start text-neutral-300 text-sm tracking-tighter flex justify-between">
                  + {{ item.question }}
                </div>
                <span class=" absolute inset-0 text-white flex justify-end py-3">
                  <div class="size-4 flex items-center justify-center transition-all duration-600 opacity-30 group-hover:opacity-100"
                    [class.rotate-630]="expanded() === item.id"
                       [class.opacity-100]="expanded() === item.id"
                  >
                    <app-arrow-icon [size]="16" [strokeWidth]="2"/>
                  </div>
                </span>
                <div
                  ngmMotion
                  *ngmPresence="expanded()===item.id"
                  [initial]="{ opacity: 0, height: 0 }"
                  [animate]="{ opacity: 1, height: 'auto' }"
                  [exit]="{ opacity: 0, height: 0 }"
                  [transition]="demoSpring"
                  class="text-white/60 overflow-hidden w-full gap-4 text-start">
                  <div class="flex gap-3 ps-3 justify-start">
                    <span class="text-sm/3">•</span>
                    <app-paragraph [content]="item.answer" class="w-full"/>
                  </div>
                </div>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccordionComponent {
  readonly faqItems = FAQ_ITEMS;
  readonly expanded = signal<number | null>(null);

  toggle(id: number) {
    this.expanded.update(current => current === id ? null : id);
  }
  demoSpring = { type: 'spring', stiffness: 420, damping: 34 } as const;
}
