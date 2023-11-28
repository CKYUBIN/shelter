import { createGlobalStyle } from "styled-components";

const CustomOverlayStyle = createGlobalStyle`
.overlaybox {
    position: absolute;
    left: 0;
    bottom: 25px;
    width: 288px;
    height: 132px;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    line-height: 1.4;  
}

.overlaybox * {
    padding: 0;
    margin: 0;
}

.overlaybox .info {
    width: 300px;
    height: 120px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #ffffff;
}

.overlaybox .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
}

.info .title {
    padding: 5px 0 0 0;
    height: 30px;
    background: #FEAC5E;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-bottom: 1px solid #ddd;
    font-size: 18px;
    font-weight: bold;
}
.info .close {
    position: absolute;
    top: 7px;
    right: 5px;
    color: #888;
    width: 17px;
    height: 17px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}
.info .close:hover {
    cursor: pointer;
}

.info .body {
    position: relative;
    overflow: hidden;
    background

}
.info .desc {
    position: relative;
    margin-left: 13px 0 0 90px;
    height: 75px;
}

.info .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    white-space: nowrap;
    font-size: 12px;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    line-height: 5;  

}
`


export default CustomOverlayStyle;