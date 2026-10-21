import { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';
import { businessTrend } from '../../data/page3';
import styles from './BusinessDashboardPage.module.css';

// Source marker heights are drawing geometry, not measured daily amounts.
const ticks = [0, 36.6, 73, 109.4, 145.9, 182.3, 218.7];
const tickLabels = ['0', '100', '150', '200', '250', '300', '350k'];
const rows = businessTrend.flatMap((point) => [
  { day: point.day, height: 248 - point.valueY, series: 'Transaction Value' },
  { day: point.day, height: 248 - point.volumeY, series: 'Transaction Volume' },
]);

export default function BusinessTrendChart() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const style = getComputedStyle(container);
    const primary = style.getPropertyValue('--primary-6').trim();
    const purple = style.getPropertyValue('--purple-6').trim();
    const orange = style.getPropertyValue('--orange-6').trim();
    const textColor = style.getPropertyValue('--color-text-3').trim();
    const borderColor = style.getPropertyValue('--color-border-1').trim();
    const height = container.getBoundingClientRect().height;
    const chart = new Chart({ container, autoFit: true, height, padding: [12, 16, 36, 44], defaultInteractions: [] });
    chart.theme({ styleSheet: { fontFamily: style.fontFamily, axisLabelFillColor: textColor, axisLabelFontSize: 12 } });
    chart.data(rows);
    chart.scale({
      day: { type: 'cat', values: businessTrend.map((point) => point.day), range: [0, 1] },
      height: { min: 0, max: 248, nice: false, ticks },
    });
    chart.axis('day', { title: null, line: null, tickLine: null, label: { style: { fill: textColor } },
      grid: { line: { style: { stroke: borderColor, lineWidth: 1 } } } });
    chart.axis('height', { title: null, line: null, tickLine: null,
      label: { formatter: (text) => tickLabels[ticks.findIndex((tick) => Math.abs(tick - Number(text)) < 0.01)] ?? '', style: { fill: textColor } },
      grid: { line: { style: { stroke: borderColor, lineDash: [4, 4], lineWidth: 1 } } } });
    chart.legend(false);
    chart.tooltip(false);
    chart.animate(false);
    chart.area().position('day*height').shape('smooth')
      .color('series', (series) => `l(90) 0:rgba(${series === 'Transaction Value' ? primary : orange},0.18) 1:rgba(${series === 'Transaction Value' ? primary : orange},0)`)
      .style({ fillOpacity: 1 });
    chart.line().position('day*height').shape('smooth').size(3)
      .color('series', (series) => series === 'Transaction Value' ? `l(0) 0:rgb(${primary}) 1:rgb(${purple})` : `rgb(${orange})`);
    chart.render();
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) chart.changeSize(entry.contentRect.width, height);
    });
    observer.observe(container);
    return () => { observer.disconnect(); chart.destroy(); };
  }, []);
  return <div ref={ref} className={styles.chart} role="img" aria-label="Transaction Value and Transaction Volume" />;
}
