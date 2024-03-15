import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaLevelDownAlt, FaLevelUpAlt, FaRegChartBar, FaCaretUp, FaCaretDown } from "react-icons/fa";
import axios from 'axios';
import './Investo.css'

function Investo() {
    const [table, setTable] = useState(null);

    const fetchdata = async () => {
        try {
            const response = await axios.get("https://intradayscreener.com/api/openhighlow/cash");
            console.log(response);
            console.log(response.data);
            setTable(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const handleCheckboxChange = (symbol) => {
        // Implement your logic here to handle checkbox change
        console.log(`Checkbox for symbol ${symbol} clicked`);
    };

    const calculateLTPPercentage = (ltp, open) => {
        return ((ltp - open) / open) * 100;
    };

    const getLTPPercentageColor = (ltpPercentage) => {
        if (ltpPercentage >= 0) {
            return 'green';
        } else {
            return 'red';
        }
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>SYMBOL</th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>LTP <FaInfoCircle /></th>
                        <th style={{ padding: '1rem', fontSize: '1rem', textAlign: 'center' }}>MOMENTUM <FaInfoCircle /></th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>OPEN <FaInfoCircle /></th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>Deviation from Pivots <FaInfoCircle /></th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>TODAYS RANGE <FaInfoCircle /></th>
                        <th style={{ padding: '1rem', textAlign: 'center' }}>OHL <FaInfoCircle /></th>
                    </tr>
                </thead>
                <tbody>
                    {table && table.map((values) => (
                        <tr key={values.symbol}>
                            <td style={{ padding: "10px" }}>
                                <input type="checkbox" style={{ marginRight: '5px' }} />
                                <span style={{ color: 'blue' }}>{values.symbol} </span><FaRegChartBar style={{ marginLeft: '3rem', color: 'lightash' }} size={23} />


                            </td>


                    <span style={{color:'red'}}> {values.allScans.intradayScans[0].scanShortcode} </span>

    


                            <td style={{ padding: "10px", textAlign: 'center' }}>{values.ltp}
                                <div style={{ textAlign: 'center', color: getLTPPercentageColor(calculateLTPPercentage(values.ltp, values.open)) }}>
                                    {calculateLTPPercentage(values.ltp, values.open) >= 0 ? <FaCaretUp style={{ color: 'green', marginTop: '10px' }} /> : <FaCaretDown style={{ color: 'red', marginTop: '10px' }} size={16} />}
                                    {calculateLTPPercentage(values.ltp, values.open).toFixed(2)}%
                                </div>
                            </td>
                            <td style={{ padding: "10px", textAlign: 'center' }}>
                                <span style={{ color: 'green', padding: '10px', marginRight: '5px', borderRadius: '10px', backgroundColor: '#cefad0' }}>{values.stockOutperformanceRank}</span>
                                <span style={{ color: 'green', padding: '10px', marginRight: '5px', borderRadius: '10px', backgroundColor: '#cefad0' }}>{values.stockMomentumRank}</span>
                                <span style={{ color: 'green', padding: '10px', marginRight: '5px', borderRadius: '10px', backgroundColor: '#cefad0' }}>{values.sectorMomentumRank}</span>
                            </td>
                            <td style={{ padding: "10px", textAlign: 'center' }}>{values.open}</td>
                            <td style={{ padding: "10px", textAlign: 'center' }}>{values.pctChange}</td>
                            <td style={{ padding: "10px",textAlign:'center'}}>
                                {values.low} <span style={{ margin: '0 2px' }}><input type="text" style={{ width: '90px', borderRadius: '20px',textAlign:'center' }} /></span> {values.high}
                            </td>
                            <td style={{ padding: "10px", fontSize: '13px', textAlign: 'center' }}>
                                <span style={{ backgroundColor: values.openHighLowSignal === 'Open=Low' ? '#cefad0' : values.openHighLowSignal === 'Open=High' ? '#FF8A8A' : 'inherit', borderRadius: '80px', padding: '5px' }}>
                                    {values.openHighLowSignal === 'Open=Low' && <FaLevelUpAlt style={{ color: 'green' }} />}
                                    {values.openHighLowSignal === 'Open=High' && <FaLevelDownAlt style={{ color: 'red' }} />}
                                    {values.openHighLowSignal}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Investo;
