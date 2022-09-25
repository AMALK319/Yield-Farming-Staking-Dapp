import React from 'react';
import { useState } from 'react';
import '../styles/Main.css'

const Main = (props) => {
    const [amount, setAmount] = useState(0);
    return (
        <>
            <br />
            <span className="middle-title">Welcome To</span>
            <span className='middle-parag'>Our yield farming platform EtherFarm. </span>
            <div className='card-section'>

                <div className="card card-main">

                    <span >Stake USDT Tokens </span>
                    <br />
                    {/* <span>My Balance: {props.balance} </span> */}
                    <input type="number" step="0.01" id='amount' className='input-card' placeholder='0' onChange={(e) => setAmount(e.target.value)} />
                    <br />
                    <div className="buttons">
                        <button className='button-card button-stake' onClick={(e) => {
                            e.preventDefault();
                            setAmount(amount * 10**18);
                            props.deposit(amount * 10**18)
                        }}>Stake</button>
                        <button className='button-card button-rwd' onClick={(e) => {
                            e.preventDefault();
                            props.withdraw()
                        }}>Withdraw</button>
                    </div>

                </div>

                <div className="card card-main">
                    <div className="card card-stake">
                        <span >Staking Balance</span>
                        <span className='stake'>{ window.web3.utils.fromWei(props.stackingBalance)} ETH</span>
                    </div>
                    <br />
                    <div className="card card-rwd">
                        <span >Reward Balance</span>
                        <span className='rwd'>{ window.web3.utils.fromWei(props.balance, 'mwei')} mWei</span>

                    </div>
                </div>


            </div>
        </>
    );
};

export default Main;