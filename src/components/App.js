import React from 'react';
import { useEffect, useState } from 'react';

import Web3 from 'web3';
import Token from '../truffle_abis/Token.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';

import Main from './Main'

import Navbar from './navbar/Navbar';
import '../styles/App.css';

const App = () => {

    const [address, setAddress] = useState('0x0');
    const [token, setToken] = useState({});
    const [decentralBank, setDecentralBank] = useState({});
    const [tokenBalance, setTokenBalance] = useState(0);
    const [stackingBalance, setStackingBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWeb3 = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            }
            else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            }
            else {
                window.alert('No ethereum browser detected! You can check out MetaMask.')
            }
        }
        const loadBlockchainData = async () => {
            const web3 = window.web3;
            try {
                const accounts = await web3.eth.getAccounts();
                const networkID = await web3.eth.net.getId();
                setAddress(accounts[0]);
                //load token contract
                const token = loadContract(Token, networkID, web3);
                setToken(token);
                console.log(token);

                let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
                setTokenBalance(tokenBalance);

                //load decentralBank contract
                const decentralBank = loadContract(DecentralBank, networkID, web3);
                setDecentralBank(decentralBank);
                console.log(decentralBank);
                let stackingBalance = await decentralBank.methods.etherBalanceOf(accounts[0]).call();
                setStackingBalance(stackingBalance);
                console.log(stackingBalance);

            } catch (error) {
                console.log(error);
            }



            setLoading(false)

        }
        loadWeb3();
        loadBlockchainData();
    }, []);



    const loadContract = (contract, networkId, web3) => {
        const contractData = contract.networks[networkId];
        try {
            const result = new web3.eth.Contract(contract.abi, contractData.address)
            return result;
        } catch (error) {
            window.alert(contract + ' not deployed to the network ')
        }
    }

    const deposit = (amount) => {
        setLoading(true);
        //console.log(amount);

        decentralBank.methods.deposit().send({value: amount.toString(), from: address }).on('transactionHash', (hash) => {

            setLoading(false);
            window.location.reload();

        })

    }

    const withdraw = () => {

        decentralBank.methods.withDraw().send({from: address }).on('transactionHash', (hash) => {

            setLoading(false);
            window.location.reload();

        })

    }





    return (
        <div className='main'>
            <Navbar address={address} />
            {loading ? <span style={{ color: 'white' }}>Loading...</span> :
                <Main stackingBalance={stackingBalance} balance={tokenBalance} deposit={deposit} withdraw={withdraw} />
            }
        </div>
    );
};

export default App;
