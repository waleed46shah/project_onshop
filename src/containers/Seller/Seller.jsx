import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

import { client, urlFor } from '../../client';
import { TiHomeOutline, TiChartAreaOutline, TiEjectOutline, TiDropbox, TiUserOutline } from 'react-icons/ti'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './Seller.scss'
import ProductTable from './ProductTable';



const formattedDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formattedTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

function getParsedDate(date) {
    date = String(date).split(' ');
    const days = String(date[0]).split('-');
    const hours = String(date[1]).split(':');
    return [
        parseInt(days[0]),
        parseInt(days[1]) - 1,
        parseInt(days[2]),
        parseInt(hours[0]),
        parseInt(hours[1]),
        parseInt(hours[2]),
    ];
}
const Seller = () => {
    const [products, setProduct] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const query = '*[_type == "product"]';
                await client.fetch(query).then((data) => {
                    setProduct(data);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        const fetchOrders = async () => {
            try {
                const query = '*[_type == "order"] | order(date desc)[0...9]';
                await client.fetch(query).then((data) => {
                  setOrders(data);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        const fetchSalesData = async () => {
            try {
                const query = '*[_type == "order"]';
                await client.fetch(query).then((data) => {
                    const chartData = {};

                    // Accumulate sales for existing dates
                    data.forEach((sale) => {

                        const date = new Date(sale.orderTime).toLocaleDateString();
                        if (chartData[date]) {
                            chartData[date].sales += sale.total;
                        } else {
                            chartData[date] = { date, sales: sale.total };
                        }
                    });

                    // Convert the accumulated data into an array
                    const chartDataArray = Object.values(chartData);

                    setSalesData(chartDataArray);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
        fetchSalesData();
        fetchOrders();
    }, []);


    const deleteProduct = async (productId) => {
        // Delete a product from Sanity using GROQ query

        const query = `*[_type == "product" && _id == "${productId}"][0]._id`;

        await client.delete(productId)
        setProduct(products.filter((product) => product._id !== productId));
    };

    const renderProductRow = (product) => {
        return (
            <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                    <Button variant="primary" href={`/item/${product._id}`}>
                        Edit
                    </Button>{' '}
                    <Button variant="danger" onClick={() => deleteProduct(product._id)}>
                        Delete
                    </Button>
                </td>
            </tr>
        );
    };

    const renderProductsTable = () => {
        return (

            <Table striped bordered hover className='products-table'>
                <thead style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{products.map((product) => renderProductRow(product))}</tbody>
            </Table>

        );
    };
    const applyFilter = (filter) => {
        setSelectedFilter(filter);

        // Logic to filter sales data based on the selected filter
        let filteredData = [];

        if (filter === 'all') {
            filteredData = salesData;
        } else if (filter === 'month') {
            filteredData = salesData.filter((sale) => {
                const saleDate = new Date(sale.date);
                const currentDate = new Date();
                const monthAgo = new Date().setMonth(currentDate.getMonth() - 1);
                return saleDate >= monthAgo && saleDate <= currentDate;
            });
        } else if (filter === '15days') {
            filteredData = salesData.filter((sale) => {
                const saleDate = new Date(sale.date);
                const currentDate = new Date();
                const daysAgo = new Date().setDate(currentDate.getDate() - 15);
                return saleDate >= daysAgo && saleDate <= currentDate;
            });
        } else if (filter === '1week') {
            filteredData = salesData.filter((sale) => {
                const saleDate = new Date(sale.date);
                const currentDate = new Date();
                const weekAgo = new Date().setDate(currentDate.getDate() - 7);
                return saleDate >= weekAgo && saleDate <= currentDate;
            });
        } else if (filter === 'singleDay') {
            filteredData = salesData.filter((sale) => {
                const saleDate = new Date(sale.date);
                const currentDate = new Date();
                return (
                    saleDate.getFullYear() === currentDate.getFullYear() &&
                    saleDate.getMonth() === currentDate.getMonth() &&
                    saleDate.getDate() === currentDate.getDate()
                );
            });
        }

        setFilteredSalesData(filteredData);
    };



    return (
        <Container className='app__seller app__section'>
            <div className='app__sideNav'>
            <h2 className='head-text'>Hi! Seller</h2>
                <div className="upper-panel">
                    
                    <button className='app__sideNav-btn'>
                        <TiHomeOutline /> Home
                    </button>
                    <button className='app__sideNav-btn'>
                        <TiEjectOutline />Orders
                    </button>
                    <button className='app__sideNav-btn'>
                        <TiChartAreaOutline /> Sales
                    </button>
                    <button className='app__sideNav-btn'>
                        <TiDropbox /> Products
                    </button>
                    <button className='app__sideNav-btn' style={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}>
                        <TiUserOutline /> Logout
                    </button>
                </div>






            </div>
            <div className="app__seller-main" style={{ width: '100%' }}>
                <h1>Seller Panel</h1>

                <Row>
                    <Col>
                        <div className='app__seller-main-chart-container'>
                            <div className='charts'>
                                <div className="charts-upper-section">
                                    <h2>Total Sales: Rs.{filteredSalesData.reduce((total, sale) => total + sale.sales, 0)}</h2>
                                    <button className='filter-btn-outline'>See Details</button>
                                </div>

                                <div className="filter-buttons" style={{ display: 'flex', gap: '1rem' }}>
                                    <Button
                                        className='filter-btn'
                                        onClick={() => applyFilter('all')}
                                    >
                                        All
                                    </Button>
                                    <Button
                                        className='filter-btn'
                                        onClick={() => applyFilter('month')}
                                    >
                                        Month
                                    </Button>
                                    <Button
                                        className='filter-btn'
                                        onClick={() => applyFilter('15days')}
                                    >
                                        15 Days
                                    </Button>
                                    <Button
                                        className='filter-btn'
                                        onClick={() => applyFilter('1week')}
                                    >
                                        1 Week
                                    </Button>

                                </div>

                                <BarChart width={600} height={300} data={filteredSalesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" bar
                                        Size={30} fill='#8884d8' />
                                </BarChart>
                            </div>
                            <div className="recent-orders">
                                <div className='charts-upper-section'>
                                    <h2>Recent Orders</h2>
                                    <button className='filter-btn-outline'>See All</button>
                                </div>
                                <div className="orders">

                                    {orders.map((order) => {
                                        return (
                                            <div className='order-item' key={order._id}>
                                                <div className="name-id" style={{ display: "flex", flexDirection: "column" }}>
                                                    <h4>{order.orderName}</h4>
                                                    <p>{order.productID}</p>
                                                </div>
                                                <p>{order.quantity}</p>
                                                <p>{order.orderTime}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <ProductTable />
                    </Col>
                </Row>
            </div>

        </Container>
    );
}
export default Seller;