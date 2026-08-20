import {
  Component,
  computed,
  inject,
} from '@angular/core';
import {NgxEchartsDirective, provideEchartsCore} from 'ngx-echarts';
import {BidService} from '../../../../core/api/bid.service';
import {ConditionPipe} from '../../../../shared/pipes/condition.pipe';
import {TimeAgoPipe} from '../../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-bid-chart',
  imports: [NgxEchartsDirective],
  providers: [provideEchartsCore({echarts: () => import('echarts')})],
  template: `
    <div class="view-container">
      @if (bidService.bidsLoaded()) {
        <div
          echarts
          [options]="chartOptions()"
          class="chart-slot"
        ></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .view-container {
      width: 100%;
      height: 450px;
    }

    .chart-slot {
      width: 100%;
      height: 100%;
    }
  `],
})
export class BidChartComponent {
  readonly bidService = inject(BidService);

  readonly chartOptions = computed(() => {
    const data = this.bidService.bidPoints()
      .slice()
      .reverse()
      .map(bid => ({
        value: [new Date(bid.time).getTime(), Number(bid.amount ?? 0)] as [number, number],
        user: new ConditionPipe().transform(bid.user),
      }));

    return {
      animation: true,
      animationDuration: 1000,
      animationDurationUpdate: 400,
      grid: { top: 48, right: 0, bottom: 45, left: 65 },
      xAxis: {
        type: 'time',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#262626',
            width: 1,
          },
        },
        axisTick: { show: false, },
        axisLabel: {
          color: '#6f6f6f',
          fontSize: 10,
          fontFamily: 'Nohemi, sans-serif',
          fontWeight: '600',
          margin: 20,
          formatter: (val: number) => {
            return new TimeAgoPipe().transform(new Date(val))
          },
        },
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
        axisTick: { show: false },
        axisLabel: {
          color: '#6f6f6f',
          fontSize: 10,
          fontFamily: 'Nohemi, sans-serif',
          fontWeight: '600',
          margin: 20,
          formatter: (val: number) => `${val}`,
        },
        splitLine: {
          lineStyle: {
            color: '#262626',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0A0A0A',
        borderColor: '#262626',
        borderWidth: 1,

        textStyle: {
          color: '#fff',
          fontSize: 12,
          fontFamily: 'Nohemi, sans-serif',
        },

        formatter: (params: { value: [number, number]; data: { user: string } }[]) => {
          if (!params?.length) {
            return '';
          }
          const [ts, amount] = params[0].value;
          const user = params[0].data.user;
          const time = new Date(ts).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: '2-digit',
            minute: '2-digit',
          }).replace(',', '');
          return `
            <span class="opacity-60 text-xs font-light">
                <small>
                    ${time}
                </small>
            </span>
            <br />
            ${user}
            <br />
            <span class="flex items-center font-medium text-neutral-300 mt-0.5">
               <span class="text-box-trim">${amount}</span>
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path d='M12.918 12.083h-1.836L12 9.636z'/><path d='M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928m2.137 5.162a.75.75 0 0 0-1.404 0l-3 8a.75.75 0 1 0 1.404.526l.818-2.18h2.96l.818 2.18a.75.75 0 1 0 1.404-.526z'/>
             </svg>
            </span>
          `;
        },
      },
      series: [
        {
          type: 'line',
          data,
          smooth: .5,
          animation: true,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: {
            color: '#ffffff',
          },
          lineStyle: {
            width: 2,
            color: '#ffffff',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0,   color: 'rgb(149, 149, 149)' },
                { offset: 0.8, color: 'rgba(89, 89, 89, 0)' },
              ],
              global: false,
            },
          },
          emphasis: {
            scale: 2,
            focus: 'none',
            lineStyle: {
              width: 2,
              color: '#ffffff',
            },
            areaStyle: {
              opacity: 0.3,
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0,   color: 'rgb(149, 149, 149)' },
                  { offset: 0.8, color: 'rgba(89, 89, 89, 0)' },
                ],
                global: false,
              },
            },
            itemStyle: {
              color: '#ffffff',
            },
          },
        },
      ],
    };
  });
}
