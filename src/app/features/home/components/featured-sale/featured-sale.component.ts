import {Component, input} from '@angular/core';
import {Sale} from '../../../../core/models/sale.model';
import {SaleThumbnailComponent} from '../../../../shared/components/sale-thumbnail/sale-thumbnail.component';
import {LikesComponent} from '../../../../shared/components/likes-layout/likes.component';
import {PriceLayoutComponent} from '../../../../shared/components/price-layout/price-layout.component';
import {environment} from '../../../../../environments/environment';
import {UserLinkComponent} from '../../../../shared/components/user-link/user-link.component';
import {SLIDE_UP} from '../../../../shared/utils/motion';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {SaleCtaComponent} from '../../../../shared/components/sale-cta/sale-cta.component';
import {ParagraphComponent} from '../../../../shared/components/paragraph/paragraph.component';
import {FEATURED_SALE} from '../../../../core/types/constants';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {BidsPreviewComponent} from '../../../../shared/components/bids-preview/bids-preview.component';

@Component({
  selector: 'app-featured-sale',
  imports: [
    SaleThumbnailComponent,
    LikesComponent,
    PriceLayoutComponent,
    UserLinkComponent,
    NgmMotionDirective,
    BidsPreviewComponent,
    SaleCtaComponent,
    ParagraphComponent,
    BlocTitleComponent
  ],
  templateUrl: './featured-sale.component.html',
})
export class FeaturedSaleComponent {
  sale = input<Sale>(FEATURED_SALE);
  protected readonly environment = environment;
  protected readonly itemVariants = SLIDE_UP;
}
