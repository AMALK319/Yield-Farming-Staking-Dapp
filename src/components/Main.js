import React from 'react';
import { useState } from 'react';
import '../styles/Main.css'

const Main = (props) => {
    const [amount, setAmount] = useState(0);
    return (
        <>
            <br />
            <span className="middle-title">Welcome To</span>
            <span className='middle-parag'>Our yield farming decentralized application. </span>
            <div className='card-section'>

                <div className="card card-main">

                    <span >Stake USDT Tokens </span>
                    <br />
                    {/* <span>My Balance: {props.balance} </span> */}
                    <input type="text" className='input-card' placeholder='0' onChange={(e) => setAmount(e.target.value)} />
                    <br />
                    <div className="buttons">
                        <button className='button-card button-stake' onClick={() => {
                            setAmount(window.web3.utils.toWei(amount.toString(), 'Ether'))
                            props.stakeTokens(amount)
                        }}>Stake</button>
                        <button className='button-card button-rwd'>Unstake</button>
                    </div>

                </div>

                <div className="card card-main">
                    <div className="card card-stake">
                        <span >Staking Balance</span>
                        <span className='stake'>{props.stackingBalance} USDT</span>
                    </div>
                    <br />
                    <div className="card card-rwd">
                        <span >Reward Balance</span>
                        <span className='rwd'>{props.rewardBalance} RWD</span>

                    </div>
                </div>


            </div>
        </>
    );
};

export default Main;