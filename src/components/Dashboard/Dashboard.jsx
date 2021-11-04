
import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = ({ totalSale, totalVolumn, averagePrice, recentSoldNFT }) => {
  return (
        <Row className="justify-content-md-center">
            <Col >
                totalSale : {totalSale}
            </Col>
            <Col>
                totalVolumn : {totalVolumn}
            </Col>
            <Col>
                average : {averagePrice}
            </Col>
        </Row>
  )
};

export default Dashboard;
{/* <Dashboard
totalSale = {this.state.totalSale}
totalVolumn = {this.state.totalVolumn}
averagePrice = {this.state.averagePrice}
recentSoldNFT = {this.state.recentSoldNFTs}
/> */}

