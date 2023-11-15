import { Table, Card } from 'react-bootstrap';

export default function Manual() {
  return (
    <>
    <Card>
      <Card.Header><b><cite title="Source Title">재난대피요령</cite></b></Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}대피소 안내해드려요 팀은 정부에서 지정한 재난 대피 요령 메뉴얼을 
           사용자에게 제공하고 있습니다. {' '}
          </p>
          <footer className="blockquote-footer">
            아래의 이미지를 클릭하면 국민재난안전포털 홈페이지로 이동합니다.
          </footer>
        </blockquote>
      </Card.Body>
    </Card>

    <Table striped>
      <tbody>
        {/* 첫번째 줄 */}
        <tr>
          <td align="center">
          <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent21.html?menuSeq=126" target="_blank" rel="noreferrer">
            <img
              src="https://economist.co.kr/data/ecn/image/2022/08/14/ecn57937b94-b8b3-42fc-991a-0e3b100b3243.jpg"
              alt="Flood"
              width={200}
              height={150}
            />
          </a>
          <br/>침수
          </td>
          <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent02.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTnEAq1QPaCQQGNvvmeEnWJrA7U5tCWPf0Y0jvEnegS3INnPoJnCDxKRr3BLqv3SeRGkFdqdWZXuSpKrbSUUgQ"
                alt=" Typhoon"
                width={200}
                height={150}
              />
            </a>
            <br/>태풍
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent18.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://thumb.mt.co.kr/06/2023/07/2023071411541314074_1.jpg/dims/optimize/"
                alt=" Downpour"
                width={200}
                height={150}
              />
            </a>
            <br/>호우
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent03.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://img.hani.co.kr/imgdb/resize/2013/0807/00478777601_20130807.JPG"
                alt=" Thunder"
                width={200}
                height={150}
              />
            </a>
            <br/>낙뢰
            </td>
            <td align="center">
            <a href="https://safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent04.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://www.busan.com/nas/data/content/image/2016/05/03/20160503000113_0.jpg"
                alt=" Gale"
                width={200}
                height={150}
              />
            </a>
            <br/>강풍
            </td>
        </tr>
        {/* 두번째 줄 */}
        <tr>
          <td align="center">
          <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent19.html?menuSeq=126" target="_blank" rel="noreferrer">
            <img
              src="https://www.tvseoul.kr/data/photos/20220938/art_16635460486857_185f84.jpg"
              alt="Storm"
              width={200}
              height={150}
            />
          </a>
          <br/>풍랑
          </td>
          <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent05.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://image.ytn.co.kr/general/jpg/2023/0115/202301150034067338_h.jpg"
                alt=" Snow"
                width={200}
                height={150}
              />
            </a>
            <br/>대설
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent06.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQcmkX6_cOBom819inCWYa3hatcxoARxzz-zMVzxPZRLb1Q7oN4qqKw3jDuYFh512K-hmXUxlcywnT-xWvkFZ4"
                alt="Cold Wave"
                width={200}
                height={150}
              />
            </a>
            <br/>한파
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent07.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://img.etoday.co.kr/pto_db/2021/07/600/20210712183315_1643231_1000_667.jpg"
                alt="Heat Wave"
                width={200}
                height={150}
              />
            </a>
            <br/>폭염
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent08.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://health.chosun.com/site/data/img_dir/2014/04/04/2014040401243_0.jpg"
                alt="dust storm"
                width={200}
                height={150}
              />
            </a>
            <br/>황사
            </td>
        </tr>
        {/* 세번째 줄 */}
        <tr>
          <td align="center">
          <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent09.html?menuSeq=126" target="_blank" rel="noreferrer">
            <img
              src="https://www.ekn.kr/mnt/file/202304/2023042001001144200053391.jpg"
              alt="Earthquake"
              width={200}
              height={150}
            />
          </a>
          <br/>지진
          </td>
          <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent10.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://image.ajunews.com/content/image/2016/07/07/20160707104430113356.jpg"
                alt="Tsunami"
                width={200}
                height={150}
              />
            </a>
            <br/>해일
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent16.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://image.newdaily.co.kr/site/data/img/2016/03/23/2016032300091_0.jpg"
                alt="Earthquake Tsunami"
                width={200}
                height={150}
              />
            </a>
            <br/>지진해일
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent11.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.aitimes.com/news/photo/202207/145975_153535_5629.jpg"
                alt="volcanic eruption"
                width={200}
                height={150}
              />
            </a>
            <br/>화산폭발
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent12.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://img.seoul.co.kr//img/upload/2023/03/30/SSC_20230330164503.jpg"
                alt="drought"
                width={200}
                height={150}
              />
            </a>
            <br/>가뭄
            </td>
        </tr>
        {/* 네번째 줄 */}
        <tr>
          <td align="center">
          <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent13.html?menuSeq=126" target="_blank" rel="noreferrer">
            <img
              src="https://newsimg-hams.hankookilbo.com/2023/07/16/3cbf55ff-d524-461d-bf40-fa489285474d.jpg"
              alt="flood"
              width={200}
              height={150}
            />
          </a>
          <br/>홍수
          </td>
          <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent17.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://t1.daumcdn.net/cfile/tistory/11689A37510A0A4B2E"
                alt="SeaLevel rise"
                width={200}
                height={150}
              />
            </a>
            <br/>해수면상승
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent20.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://img.khan.co.kr/news/2023/06/28/news-p.v1.20230628.609b5f93c99d44cf95ae0a977e7ff915_P1.jpg"
                alt="LandSlide"
                width={200}
                height={150}
              />
            </a>
            <br/>산사태
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent22.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://img.seoul.co.kr/img/upload/2020/12/14/SSI_20201214210135_O2.jpg"
                alt="natural space object crash"
                width={200}
                height={150}
              />
            </a>
            <br/>자연우주물체추락
            </td>
            <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent23.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://imgnn.seoul.co.kr/img/upload/2016/03/04/SSI_20160304182450_V.jpg"
                alt="space radiocommunication"
                width={200}
                height={150}
              />
            </a>
            <br/>우주전파재난
            </td>
        </tr>
        {/* 다섯번째 줄 */}
        <tr>
          <td align="center">
          <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent24.html?menuSeq=126" target="_blank" rel="noreferrer">
            <img
              src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202211/10/f3ecd566-47b5-4f33-a968-edae86e26daf.jpg"
              alt="green algae"
              width={200}
              height={150}
            />
          </a>
          <br/>조류대발생(녹조)
          </td>
          <td align="center">
            <a href="https://www.safekorea.go.kr/idsiSFK/neo/sfk/cs/contents/prevent/prevent25.html?menuSeq=126" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.aitimes.com/news/photo/201904/48215_3785_0952.jpg"
                alt="red tide"
                width={200}
                height={150}
              />
            </a>
            <br/>적조
            </td>
            <td align="center"></td>
            <td align="center"></td>
            <td align="center"></td>
        </tr>
      </tbody>
    </Table>
    </>
  );
}
