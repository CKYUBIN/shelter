import React from 'react';
import { Table, Card } from 'react-bootstrap';

function Home() {
    return (
        <>
            <Card>
                <Card.Header><b>실시간 지진정보서비스 바로가기 ▼ ▼ ▼ (아래 이미지를 클릭하세요)</b></Card.Header>
            </Card>
            <Table>
                <tbody>
                    <tr>
                        <td align="center">
                            <a href="https://www.weather.go.kr/pews/" target="_blank" rel="noreferrer">
                                <img
                                    src="https://cdn-icons-gif.flaticon.com/12749/12749355.gif"
                                    alt="Flood"
                                    width={200}
                                    height={200}
                                />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}


export default Home;