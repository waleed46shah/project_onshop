import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { client, urlFor } from '../../client';
import { TiHomeOutline, TiChartAreaOutline, TiEjectOutline, TiDropbox, TiUserOutline } from 'react-icons/ti'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import './Seller.scss'

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

    }, []);


    const deleteProduct = async (productId) => {
        // Delete a product from Sanity using GROQ query
        console.log(productId)
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

    const renderSalesChart = () => {
        return (

            <BarChart width={600} height={300} data={salesData} >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="sales" barSize={30} fill='#8884d8' />
                {/* <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
            </BarChart>
        );
    };


    return (
        <Container className='app__seller app__section'>
            <div className='app__sideNav'>



                <div className="upper-panel">
                    <h2 className='head-text'>Hi! Seller</h2>
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
                        <TiDropbox /> Manage Products
                    </button>
                </div>

                <div className="lower-panel">
                <button className='app__sideNav-btn' style={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}>
                    <TiUserOutline /> Logout
                </button>
                </div>
                

            </div>
            <div className="app__seller-main">
                <h1>Seller Panel</h1>
                
                <Row>
                    <Col>
                        <h2>Total Sales: {filteredSalesData.reduce((total, sale) => total + sale.sales, 0)}</h2>
                        <div className="filter-buttons" style={{ display: 'flex', gap: '1rem' }}>
                            <Button
                                variant={selectedFilter === 'all' ? 'btn-primary' : 'outline-primary'}
                                onClick={() => applyFilter('all')}
                            >
                                All
                            </Button>
                            <Button
                                variant={selectedFilter === 'month' ? 'primary' : 'outline-primary'}
                                onClick={() => applyFilter('month')}
                            >
                                Month
                            </Button>
                            <Button
                                variant={selectedFilter === '15days' ? 'primary' : 'outline-primary'}
                                onClick={() => applyFilter('15days')}
                            >
                                15 Days
                            </Button>
                            <Button
                                variant={selectedFilter === '1week' ? 'primary' : 'outline-primary'}
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
                    </Col>
                    <Col>
                        <h2>Products</h2>
                        {renderProductsTable()}
                    </Col>
                </Row>
            </div>

        </Container>
    );
}
export default Seller;