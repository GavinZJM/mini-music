<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
  @font-face {font-family: "iconfont";
    src: url('//at.alicdn.com/t/font_2444432_mcg2xmerm5.eot?t=1616654807583'); /* IE9 */
    src: url('//at.alicdn.com/t/font_2444432_mcg2xmerm5.eot?t=1616654807583#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAM4AAsAAAAAB0QAAALsAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCKIIgATYCJAMMCwgABCAFhG0HOhtqBsgusG3kM4XBqTMUgR9wA84AKIL6vW7vvfsloRUHqlSVwXcPKoNCohAKFWEoRmIcyqC7EX9j6dIxZYVKh+yWVWOx1PQ/kv+dv3xY57kKA0ajFBIJwuE/zuVLfw5hUxQl5iYcokMLXFBjOeGYNLAsuju2A1TNhUjoIuH1eS7Hd5WH4fxAOc2xqXfUC6gXBxTQ3hhFViCdIDeMXXkRjwmMbRurXB9v7qEtGasC8RgFDrRTUSlZoRfakoOJeINHXxakV/Dqfz/+MQk/FE2F8dTtw8GH9RcrjZHsyuiqMuTx3GDHqDgBkrgv9d6phdkTNWNFXVc7QSuFMlbCdfGlqro1//Aogmhh1M+DA5QrfDFbGuvGoPys6aygRYcp8DzCBFKdD0ciYWPi9E+xWS80maUWqxzQpjcZRrNltZpm39I2pNnW4g4jZTeUCI+aZku1uNGgrve0vqyp+VNON31sVNL6piDZ4ULUHdMshNMVl9yc8bc3DlVnVAyVuCRwcrz3aJtHZ+w9T1KtbCtUlrYom6Utk5PNbHF3JsNRaya7dT1POzvkqGRqmpewOGbLNF/6qv2vPVY94mes1ZiIrUAADG8URX/Eb7zfHO/1xuq+2zjgU22w/AODzFFngF6htey1y1r2pKowbDVlqS3VfdUkEVaAYh4wwAiu+utv3Lg1d+hTMoais4Wqt0Mk6wSNOado9c4wdux0fM4aVRMZAEfeAcKyLxSLPlAt+yaS9YvGpn+0loMwNo3UhXP2YrBbr+QY+ei+YeRJzpbDukHjLQVPqaNJhc99JC2jBC6m82zhRDnpGFvK52BpxsgqGR7Bc5SmgoVKTJ5NQ7NiNZtx2ZumnmTQdUURhyE+5HqDIh6RY3e46eY+f4sEnqQcWkOpiD4iqhSNjxam5i2IkzZvRbmWV0rPAkvGMMSUyKAjcJPUzApUlM+LEY+ZCnukCysz1I/baqfz67PnOwJjxrQaEiPG0T05l1GaB80BYcezAAA=') format('woff2'),
    url('//at.alicdn.com/t/font_2444432_mcg2xmerm5.woff?t=1616654807583') format('woff'),
    url('//at.alicdn.com/t/font_2444432_mcg2xmerm5.ttf?t=1616654807583') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('//at.alicdn.com/t/font_2444432_mcg2xmerm5.svg?t=1616654807583#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-zanting:before {
    content: "\e676";
  }

  .icon-bofang:before {
    content: "\e601";
  }
</style>
<style lang="scss">
  body,html{height:100%}
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }
  body {
  	line-height: 1;
  }
  ol, ul {
  	list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }
  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
