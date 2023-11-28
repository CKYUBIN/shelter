import { createGlobalStyle } from "styled-components";

const CalculatePolylineDistanceStyle = createGlobalStyle`
    .dot {overflow:hidden;float:left;width:12px;height:12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/mini_circle.png');}
    .dotOverlay {color:#000;position:relative;bottom:10px;border-radius:6px;border: 1px solid #ccc;border-bottom:2px solid #ddd;float:left;font-size:12px;padding:5px;background:#fff;}
    .dotOverlay li {display:block;}
    .dotOverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
    .number {font-weight:bold;color:#ee6152;}
    .dotOverlay:after {content:'position:absolute;margin-left:-6px;left:50%;bottom:-8px;width:11px;height:8px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white_small.png')}
    .distanceInfo {position:relative;list-style:none;margin:0;}
    .distanceInfo .label {display:inline-block;width:50px;}
    .distanceInfo:after {content:none;}

`

export default CalculatePolylineDistanceStyle;