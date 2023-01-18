import { useContext, useEffect, useRef } from 'react';
import { FullDiv } from '../../common/FullDiv';
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { MASimple } from './studies/MASimple';
import { RSI } from './studies/RSI';
import { MACD } from './studies/MACD';

let tvScriptLoadingPromise;

export default function TradingViewWidget(props) {
	const symbol = props.symbol;

  const onLoadScriptRef = useRef();
	const { theme} = useContext(ThemeContext);

  const studies = [
		MASimple(50),
		MASimple(100),
		MASimple(200),
		RSI(14),
		MACD()
	];

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_f4e96') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: theme,
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            studies: studies,
						hide_side_toolbar: false,
            container_id: "tradingview_f4e96"
          });
        }
      }
    },
    []
  );

	return (
		<FullDiv className='tradingview-widget-container'>
			<FullDiv id='tradingview_f4e96' />
			<div className="tradingview-widget-copyright">
				<a href="https://www.tradingview.com/symbols/OMXHEX-OUT1V/" rel="noopener" target="_blank"><span className="blue-text">OUT1V stock chart</span></a> by TradingView
			</div>
		</FullDiv>
	);
}
